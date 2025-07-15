package models

import play.api.libs.json._
import java.util.Date

case class User(
  _id: Option[String],
  nombre: String,
  apellido: String,
  nacimiento: String,
  correo: String,
  contrasena: String,
  celular: String,
  rol: String
)

object User {
  implicit val Userformat: Format[User] = Json.format[User]
}
