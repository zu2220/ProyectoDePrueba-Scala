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
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString("nombre"),
          doc.getString("apellido"),
          doc.getString("nacimiento"),
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
          "_id" -> new ObjectId(),
          "nombre" -> user.nombre,
           "apellido" -> user.apellido,
           "nacimiento" -> user.nacimiento,
           "correo" -> user.correo,
           "contrasena" -> user.contrasena,
           "celular" -> user.celular,
           "rol" -> user.rol
        )
        collection.insertOne(doc).toFuture().map(result => {
          val userWithId = user.copy(_id = doc.get("_id").map(_.asObjectId().getValue.toHexString))
          Created(Json.toJson(userWithId))
        })
      }
    )
  }

  def editUser(id: String): Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[User].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid user format"))),
      user => {
        val filter = equal("_id", new ObjectId(id))
        val update = Document(
          "$set" -> Document(
            "nombre" -> user.nombre,
            "apellido" -> user.apellido,
            "nacimiento" -> user.nacimiento,
            "correo" -> user.correo,
            "contrasena" -> user.contrasena,
            "celular" -> user.celular,
            "rol" -> user.rol
          )
        )
        collection.updateOne(filter, update).toFuture().map { result =>
          if (result.getModifiedCount > 0) {
            Ok(Json.obj("status" -> "User updated successfully"))
          } else {
            NotFound(Json.obj("error" -> "User not found"))
          }
        }
      }
    )
  }

  def deleteUser(id: String): Action[AnyContent] = Action.async {
    val filter = equal("_id", new ObjectId(id))
    collection.deleteOne(filter).toFuture().map { result =>
      if (result.getDeletedCount > 0) {
        Ok(Json.obj("status" -> "User deleted successfully"))
      } else {
        NotFound(Json.obj("error" -> "User not found"))
      }
    }
}
}