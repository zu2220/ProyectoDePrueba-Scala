package models

import play.api.libs.json._
import java.util.Date

case class Client(
  _id: Option[String],
  name: String,
  email: String,
  phone: String,
  address: String,
  birthdate: Date
)
object Client {
  implicit val clientFormat: Format[Client] = Json.format[Client]
} 