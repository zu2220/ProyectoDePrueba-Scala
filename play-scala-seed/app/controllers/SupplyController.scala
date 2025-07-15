// app/controllers/SupplyController.scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import org.mongodb.scala.model.Filters._ 
import org.mongodb.scala.bson.ObjectId
import models.Supply
import db.MongoConnection

@Singleton
class SupplyController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("supplies")

  def getSupplies: Action[AnyContent] = Action.async{
    collection.find().toFuture().map{docs =>
      val supplies = docs.map{doc =>
        Supply(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString("name"),
          doc.getDouble("calories"),
          doc.getDouble("fat"),
          doc.getDouble("carbohydrates"),
          doc.getDouble("protein"),
          doc.getString("unit"),
          doc.getString("supplier")
        )
      }
      Ok(Json.toJson(supplies))
    }
  }

  def createSupply: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[Supply].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Supply format"))),
      supply => {
        val doc = Document(
          "_id" -> new ObjectId(),
          "name" -> supply.name,
          "calories" -> supply.calories,
          "fat" -> supply.fat,
          "carbohydrates" -> supply.carbohydrates,
          "protein" -> supply.protein,
          "unit" -> supply.unit,
          "supplier" -> supply.supplier
        )

        collection.insertOne(doc).toFuture.map{_ =>
          val supplyWithId = supply.copy(_id = doc.get("_id").map(_.asObjectId().getValue.toHexString))
          Created(Json.toJson(supplyWithId))
        }
      }
    )
  }

  def editSupply(id: String): Action[JsValue] = Action(parse.json).async {request => 
    request.body.validate[Supply].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Supply formar"))),
      supply => {

        val filter = equal("_id", new ObjectId(id))
        val update = Document(
          "$set" -> Document(
            "name" -> supply.name,
            "calories" -> supply.calories,
            "fat" -> supply.fat,
            "carbohydrates" -> supply.carbohydrates,
            "protein" -> supply.protein,
            "unit" -> supply.unit,
            "supplier" -> supply.supplier
          )
        )

        collection.updateOne(filter, update).toFuture().map{result =>
          
          if(result.getModifiedCount > 0) {
            Ok(Json.toJson(supply))
          } else {
            NotFound(Json.obj("error" -> "The supply wasn't found"))
          }
        }
      }
    )
  }

  def deleteSupply(id: String): Action[AnyContent] = Action.async{

    val filter = equal("_id", new ObjectId(id))

    collection.deleteOne(filter).toFuture().map{result => 
      if(result.getDeletedCount > 0) {
        Ok(Json.obj("message" -> "The supply was deleted succesfully"))
      } else {
        NotFound(Json.obj("error" -> "The supply wasn't found"))
      }
    }
  } 
}