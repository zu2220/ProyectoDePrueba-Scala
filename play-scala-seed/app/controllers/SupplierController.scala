package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Supplier
import db.MongoConnection

@Singleton
class SupplierController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("suppliers")

  def getSupplier: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val suppliers = docs.map { doc =>
        Supplier(
          doc.getString("name"),
          doc.getString("email"),
          doc.getString("phone"),
          doc.getString("address"),
          doc.getString("supply")
        )
      }
      Ok(Json.toJson(suppliers))
    }
  }

  def createSupplier: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[Supplier].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid supplier format"))),
      supplier => {
        val doc = Document(
          "name" -> supplier.name,
          "email" -> supplier.email,
          "phone" -> supplier.phone,
          "address" -> supplier.address,
          "supply" -> supplier.supply
          )
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(supplier)))
      }
    )
  }
}
