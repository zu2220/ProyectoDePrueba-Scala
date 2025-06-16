file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/SupplierController.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -javax/inject/BadRequest.
	 -javax/inject/BadRequest#
	 -javax/inject/BadRequest().
	 -play/api/mvc/BadRequest.
	 -play/api/mvc/BadRequest#
	 -play/api/mvc/BadRequest().
	 -play/api/libs/json/BadRequest.
	 -play/api/libs/json/BadRequest#
	 -play/api/libs/json/BadRequest().
	 -org/mongodb/scala/BadRequest.
	 -org/mongodb/scala/BadRequest#
	 -org/mongodb/scala/BadRequest().
	 -BadRequest.
	 -BadRequest#
	 -BadRequest().
	 -scala/Predef.BadRequest.
	 -scala/Predef.BadRequest#
	 -scala/Predef.BadRequest().
offset: 947
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/SupplierController.scala
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

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("suppliers")

  def getSupplier: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val suppliers = docs.map { doc =>
        Supplier(
          doc.getString("name"),
          doc.getString("email")
        )
      }
      Ok(Json.toJson(suppliers))
    }
  }

  def createSupplier: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[Supplier].fold(
      errors => Future.successful(Ba@@dRequest(Json.obj("error" -> "Invalid supplier format"))),
      supplier => {
        val doc = Document(
          "name" -> supplier.name,
          "email" -> supplier.email,
          "phone" -> supplier.number,
          "address" -> supplier.address,
          "supply" -> supplier.supply
          )
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(supplier)))
      }
    )
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 