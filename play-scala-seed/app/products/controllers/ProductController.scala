package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Product
import db.MongoConnection
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters._

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
extends BaseController {
    val collection : MongoCollection[Document] = MongoConnection.database.getCollection("products")

    def getProducts: Action[AnyContent] = Action.async {
        collection.find().toFuture().map { docs =>
            val products = docs.map { doc =>
                Product(
                    doc.get("_id").map(_.asObjectId().getValue.toHexString),
                    doc.getString("name"),
                    doc.getDouble("price"),
                    doc.getInteger("stock"),
                    doc.getInteger("rate"),
                    doc.getString("category")
                )
            }
            Ok(Json.toJson(products))
        }
    }
    def createProduct: Action[JsValue] = Action(parse.json).async { request =>
        request.body.validate[Product].fold(
            errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid product format"))),
            product => {
                val doc = Document(
                    "_id" -> new ObjectId(),
                    "name" -> product.name,
                    "price" -> product.price,
                    "stock" -> product.stock,
                    "rate" -> product.rate,
                    "category" -> product.category
                )
                collection.insertOne(doc).toFuture().map(_=> {
                    val productWithId = product.copy(_id = doc.get("_id").map(_.asObjectId().getValue.toHexString))
                    Created(Json.toJson(productWithId))
                })
            }
        )
    }

    def editProduct(id: String): Action[JsValue] = Action(parse.json).async { request =>
        request.body.validate[Product].fold(
            errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Product format"))),
            product =>{
                val filter = equal("_id", new ObjectId(id))
                val update = Document(
                    "$set" -> Document(
                        "name" -> product.name,
                        "price" -> product.price,
                        "stock" -> product.stock,
                        "rate" -> product.rate,
                        "category" -> product.category
                    )
                )
                
                collection.updateOne(filter, update).toFuture().map(result =>{
                    if(result.getModifiedCount > 0){
                        Ok(Json.toJson(product))
                    } else{
                        NotFound(Json.obj("error" -> "The product wasn't found"))
                    }
                })
            }
        )
    }

    def deleteProduct(id: String) : Action[AnyContent] = Action.async {
        val filter = equal("_id", new ObjectId(id))

        collection.deleteOne(filter).toFuture().map(result => {
            if(result.getDeletedCount > 0){
                Ok(Json.obj("message" -> "The product was deleted succesfully"))
            } else {
                NotFound(Json.obj("error" -> "The product wasn't found"))
            }
        })
    }
}