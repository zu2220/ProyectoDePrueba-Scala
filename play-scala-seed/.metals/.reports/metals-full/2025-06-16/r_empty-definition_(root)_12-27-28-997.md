file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:

offset: 1989
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
import db.MongoConnection
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters._

@Singleton
class UserController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("users")

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
           "apellido" -> user.apellido,
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

  def getUserByID(id: String): Action[AnyContent] = Action.async {
    if(!ObjectId.isValid(id)){
      Future.successful(BadRequest("Invalid user ID"))
    } else {
      val filter = equal("_id", new ObjectId(id))
      collection.find(filter).first().toFuture().map { docOpt =>
        i@@f (docOpt == null){
          NotFound(Json.obj("error" -> "Usuario no encontrado"))
        }
      }
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