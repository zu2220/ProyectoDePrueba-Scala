error id: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/ProductController.scala:`<none>`.
file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/ProductController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject/Action.
	 -play/api/mvc/Action.
	 -play/api/libs/json/Action.
	 -org/mongodb/scala/Action.
	 -Action.
	 -scala/Predef.Action.
offset: 518
uri: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/ProductController.scala
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

    def getProducts: Action[AnyContent] = Action@@.async {
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
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.