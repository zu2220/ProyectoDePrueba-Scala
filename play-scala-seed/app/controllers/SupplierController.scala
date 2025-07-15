package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Supplier
import db.MongoConnection
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters._

@Singleton
class SupplierController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("suppliers")

  def getSupplier: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val suppliers = docs.map { doc =>
        Supplier(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
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
          "_id" -> new ObjectId(),
          "name" -> supplier.name,
          "email" -> supplier.email,
          "phone" -> supplier.phone,
          "address" -> supplier.address,
          "supply" -> supplier.supply
          )
        collection.insertOne(doc).toFuture().map(result => {
          val supplierWithId = supplier.copy(_id = doc.get("_id").map(_.asObjectId().getValue.toHexString))
          Created(Json.toJson(supplier))
        })
      }
    )
  }

  def editSupplier(id: String): Action[JsValue] = Action(parse.json).async {request =>
    request.body.validate[Supplier].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Supplier format"))),
      supplier =>{
        val filter = equal("_id", new ObjectId(id))
        val update = Document(
          "$set" -> Document(
            "name" -> supplier.name,
            "email" -> supplier.email,
            "phone" -> supplier.phone,
            "address" -> supplier.address,
            "supply" -> supplier.supply
          )
        )
        collection.updateOne(filter, update).toFuture.map(result=>{
          if(result.getModifiedCount > 0){
            Ok(Json.toJson(supplier))
          } else{
            NotFound(Json.obj("error" -> "The supplier wasn't found"))
          }
        })
      }
    )  
  } 

  def deleteSupplier(id: String): Action[AnyContent] = Action.async {
    val filter = equal("_id", new ObjectId(id))

    collection.deleteOne(filter).toFuture.map(result =>{
      if(result.getDeletedCount > 0){
        Ok(Json.obj("message" -> "The supplier was deleted succesfully"))
      } else{
        NotFound(Json.obj("error" -> "The supplier wasn't found"))
      }
    })
  }
}
