error id: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/SupplierController.scala:`<none>`.
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/SupplierController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject.
	 -javax/inject#
	 -javax/inject().
	 -play/api/mvc.
	 -play/api/mvc#
	 -play/api/mvc().
	 -play/api/libs/json.
	 -play/api/libs/json#
	 -play/api/libs/json().
	 -org/mongodb/scala.
	 -org/mongodb/scala#
	 -org/mongodb/scala().
	 -.
	 -#
	 -().
	 -scala/Predef.
	 -scala/Predef#
	 -scala/Predef().
offset: 578
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

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("supplier")

  def getSupplier: Action[AnyContent] = Action.async {
    collection.find().toFuture().m@@ap { docs =>
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
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid supplier format"))),
      supplier => {
        val doc = Document("name" -> user.name, "email" -> user.email)
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(supplier)))
      }
    )
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.