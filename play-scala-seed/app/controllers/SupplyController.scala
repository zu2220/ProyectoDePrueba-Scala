// app/controllers/SupplyController.scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import org.mongodb.scala.model.Filters._ 
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.model.FindOneAndUpdateOptions 
import models.Supply
import db.MongoConnection

@Singleton
class SupplyController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("supplies")
  val countersCollection: MongoCollection[Document] = MongoConnection.database.getCollection("counters") 

  private def getNextSequence(name: String): Future[Int] = {
    val filter = equal("_id", name)
    val update = inc("seq", 1)
    val options = FindOneAndUpdateOptions().upsert(true) 

    countersCollection.findOneAndUpdate(filter, update, options).toFuture()
      .map { doc =>
        doc.getInteger("seq").intValue()
      }
      .recover {
        case e: Exception =>
          throw new RuntimeException(s"Error getting next sequence for $name: ${e.getMessage}", e)
      }
  }

  def getSupplies: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val supplies = docs.map { doc =>
        Supply(
          _id = Option(doc.getInteger("_id").intValue()), 
          name = doc.getString("name"),
          calories = doc.getDouble("calories"),
          fat = doc.getDouble("fat"),
          carbohydrates = doc.getDouble("carbohydrates"),
          protein = doc.getDouble("protein"),
          unit = doc.getString("unit"),
          supplier = Option(doc.getString("supplier")) 
        )
      }
      Ok(Json.toJson(supplies))
    }.recover {
      case e: Exception =>
        InternalServerError(Json.obj("error" -> s"Error al obtener insumos: ${e.getMessage}"))
    }
  }

  def createSupply: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[Supply].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("error" -> "Invalid supply format", "details" -> JsError.toJson(errors))))
      },
      supply => {
        getNextSequence("supplyId").flatMap { nextId =>
          val doc = Document(
            "_id" -> nextId,
            "name" -> supply.name,
            "calories" -> supply.calories,
            "fat" -> supply.fat,
            "carbohydrates" -> supply.carbohydrates,
            "protein" -> supply.protein,
            "unit" -> supply.unit,
            "supplier" -> supply.supplier.orNull 
          )
          collection.insertOne(doc).toFuture().map { _ =>
            Created(Json.toJson(supply.copy(_id = Some(nextId))))
          }.recover {
            case e: Exception =>
              InternalServerError(Json.obj("error" -> s"Error al crear insumo: ${e.getMessage}"))
          }
        }
      }
    )
  }
}