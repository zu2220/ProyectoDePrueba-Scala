package models

import play.api.libs.json._
import java.util.Date

case class User(
  nombre: String,
  apellido: String,
  fecha_nacimiento: Date,
  correo: String,
  contrasena: String,
  celular: String,
  rol: String
)

object User {
  implicit val format: OFormat[User] = Json.format[User]
}
