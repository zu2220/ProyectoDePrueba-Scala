package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Product
import db.MongoConnection

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
extends BaseController {
    val collection : MongoCollection[Document] = MongoConnection.database.getCollection("products")

    def getProducts: Action[AnyContent] = Action.async {
        collection.find().toFuture().map { docs =>
            val products = docs.map { doc =>
                Product(
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
                    "name" -> product.name,
                    "price" -> product.price,
                    "stock" -> product.stock,
                    "rate" -> product.rate,
                    "category" -> product.category
                )
                collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(product)))
            }
        )
    }
}