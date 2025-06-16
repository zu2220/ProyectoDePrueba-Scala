error id: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala:MongoConnection
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala
empty definition using pc, found symbol in pc: 
semanticdb not found

found definition using fallback; symbol MongoConnection
offset: 477
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala
text:
```scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import org.mongodb.scala.model.Filters._

import models.User
import db.MongoConnection

@Singleton
class UserController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoCo@@nnection.database.getCollection("users")

  def getUsers: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val users = docs.map { doc =>
        User(
          doc.getString("nombre"),
          doc.getString("apellido"),
          doc.getDate("fecha_nacimiento"),
          doc.getString("correo"),
          doc.getString("contrasena"),
          doc.getString("celular"),
          doc.getString("rol")
        )
      }
      Ok(Json.toJson(users))
    }
  }

  def createUser: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[User].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid user format"))),
      user => {
        val doc = Document(
          "nombre" -> user.nombre,
           "email" -> user.apellido,
           "fecha_nacimiento" -> user.fecha_nacimiento,
           "correo" -> user.correo,
           "contrasena" -> user.contrasena,
           "celular" -> user.celular,
           "rol" -> user.rol
        )
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(user)))
      }
    )
  }

  def getUserByID: Action[AnyContent] = Action.async {
    val filter = equal("_id","684d87bf7d81ec0a30106f4f")
    collection.find(filter).toFuture().map { doc =>
      val user = User(
        doc.getString("nombre"),
        doc.getString("apellido"),
        doc.getDate("fecha_nacimiento"),
        doc.getString("correo"),
        doc.getString("contrasena"),
        doc.getString("celular"),
        doc.getString("rol")
        )
        Ok(Json.toJson(user))
    }
  }
} 
  // def updateUser: Action[JsValue] = Action(parse.json).async { request =>
  //     request.body.validate[User].fold(
  //       error => Future.successful(BadRequest(Json.obj("error" -> "Invalid user format"))),
  //       user => {
  //         val user_id = user._id;
          
  //       }
  //     )
  //   }


```


#### Short summary: 

empty definition using pc, found symbol in pc: 