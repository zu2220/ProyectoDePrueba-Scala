error id: file:///C:/Users/oscar/GitHub/ProyectoDePrueba-Scala/play-scala-seed/app/controllers/ProductController.scala:`<none>`.
file:///C:/Users/oscar/GitHub/ProyectoDePrueba-Scala/play-scala-seed/app/controllers/ProductController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject/product.
	 -play/api/mvc/product.
	 -play/api/libs/json/product.
	 -org/mongodb/scala/product.
	 -product.
	 -scala/Predef.product.
offset: 1400
uri: file:///C:/Users/oscar/GitHub/ProyectoDePrueba-Scala/play-scala-seed/app/controllers/ProductController.scala
text:
```scala
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
                    "stock" -> pr@@oduct.stock,
                    "rate" -> product.rate,
                    "category" -> product.category
                )
                collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(product)))
            }
        )
    }

    def editProduct(id: String): Action[JsValue] = Action(parse.json).async { request =>
        request.body.validate[Product].fold(
            errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Product format"))),
            product =>{
                val filter = equal("_id", new Object(id))
                val update = Document(
                    "$set" -> Document(
                        
                    )
                )
            }
        )
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.