error id: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v3/ProyectoDePrueba-Scala/app/controllers/SupplierController.scala:`<none>`.
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v3/ProyectoDePrueba-Scala/app/controllers/SupplierController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject/proveedor.
	 -play/api/mvc/proveedor.
	 -play/api/libs/json/proveedor.
	 -org/mongodb/scala/proveedor.
	 -proveedor.
	 -scala/Predef.proveedor.
offset: 1471
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v3/ProyectoDePrueba-Scala/app/controllers/SupplierController.scala
text:
```scala
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

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("supplier")

  def getSuppliers: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val suppliers = docs.map { doc =>
        Proveedor(
          doc.getString("nombreProveedor"),
          doc.getString("nombreProducto"),
          doc.getInteger("calorias"),
          doc.getDouble("grasas"),
          doc.getDouble("carbohidratos"),
          doc.getDouble("proteinas")
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
          "nombreProveedor" -> proveedor.nombreProveedor,
          "nombreProducto" -> proveedor.nombreProducto,
          "calorias" -> proveedor.calorias,
          "grasas" -> proveedor.grasas,
          "carbohidratos" -> prove@@edor.carbohidratos,
          "proteinas" -> proveedor.proteinas
        )
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(supplier)))
      }
    )
  }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.