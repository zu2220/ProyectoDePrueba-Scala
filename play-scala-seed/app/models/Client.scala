package models

import play.api.libs.json._
import java.util.Date

case class Client(
  name: String,
  email: String,
  phone: String,
  address: String,
  birthdate: Date
)
object Client {
  implicit val format: OFormat[Client] = Json.format[Client]
} 