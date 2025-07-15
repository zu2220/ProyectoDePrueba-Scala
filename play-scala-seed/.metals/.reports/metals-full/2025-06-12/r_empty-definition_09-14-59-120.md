error id: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala:`<none>`.
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject/MongoConnection.
	 -javax/inject/MongoConnection#
	 -javax/inject/MongoConnection().
	 -play/api/mvc/MongoConnection.
	 -play/api/mvc/MongoConnection#
	 -play/api/mvc/MongoConnection().
	 -play/api/libs/json/MongoConnection.
	 -play/api/libs/json/MongoConnection#
	 -play/api/libs/json/MongoConnection().
	 -org/mongodb/scala/MongoConnection.
	 -org/mongodb/scala/MongoConnection#
	 -org/mongodb/scala/MongoConnection().
	 -db/MongoConnection.
	 -db/MongoConnection#
	 -db/MongoConnection().
	 -MongoConnection.
	 -MongoConnection#
	 -MongoConnection().
	 -scala/Predef.MongoConnection.
	 -scala/Predef.MongoConnection#
	 -scala/Predef.MongoConnection().
offset: 215
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala
text:
```scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.User
import db.MongoCo@@nnection

@Singleton
class UserController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("users")

  def getUsers: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val users = docs.map { doc =>
        User(
          doc.getString("name"),
          doc.getString("email")
        )
      }
      Ok(Json.toJson(users))
    }
  }

  def createUser: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[User].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid user format"))),
      user => {
        val doc = Document("name" -> user.name, "email" -> user.email)
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(user)))
      }
    )
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.