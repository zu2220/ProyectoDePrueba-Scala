error id: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v3/Server/app/controllers/ProductController.scala:`<none>`.
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v3/Server/app/controllers/ProductController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject/Action#
	 -play/api/mvc/Action#
	 -play/api/libs/json/Action#
	 -org/mongodb/scala/Action#
	 -Action#
	 -scala/Predef.Action#
offset: 1103
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v3/Server/app/controllers/ProductController.scala
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
extends BaseController{
    val productsCollection: MongoCollection[Document] = MongoConnection.database.getCollection("products")
    def getProducts: Action[AnyContent] = Action.async {
    productsCollection.find().toFuture().map { docs =>
      val products = docs.map { doc =>
        Product(
          doc.getLong("id"),
          doc.getString("nombre"),
          doc.getDouble("precio"),
          doc.getInteger("stock"),
          doc.getString("calificacion"),
          doc.getString("categoria")
        )
      }
      Ok(Json.toJson(products))
    } recover {
      case e: Throwable => InternalServerError(Json.obj("error" -> s"Error al obtener productos: ${e.getMessage}"))
    }
  }

  def createProduct: @@Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[Product].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Formato de producto inválido", "details" -> JsError.toJson(errors)))),
      product => {
        val doc = Document(
          "id" -> product.id,
          "nombre" -> product.nombre,
          "precio" -> product.precio,
          "stock" -> product.stock,
          "calificacion" -> product.calificacion,
          "categoria" -> product.categoria
        )
        productsCollection.insertOne(doc).toFuture().map { _ =>
          Created(Json.toJson(product))
        } recover {
          case e: Throwable => InternalServerError(Json.obj("error" -> s"Error al crear producto: ${e.getMessage}"))
        }
      }
    )
  }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.