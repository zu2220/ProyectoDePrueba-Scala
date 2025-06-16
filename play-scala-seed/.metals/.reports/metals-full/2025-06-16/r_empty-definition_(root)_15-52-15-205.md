file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/ProductController.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -javax/inject/MongoConnection#
	 -play/api/mvc/MongoConnection#
	 -play/api/libs/json/MongoConnection#
	 -org/mongodb/scala/MongoConnection#
	 -db/MongoConnection#
	 -MongoConnection#
	 -scala/Predef.MongoConnection#
offset: 418
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/ProductController.scala
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
    val mongoConnection = new MongoC@@onnection[Document] = MongoConnection.database.getCollection("products")

    def getProducts: Action[AnyContent] = Action.async {
        mongoConnection.find().toFuture().map { docs =>
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
                mongoConnection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(product)))
            }
        )
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: 