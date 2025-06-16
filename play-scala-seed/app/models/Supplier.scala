package models

import play.api.libs.json._

case class Supplier(
  name: String,
  email: String,
  phone: String,
  address: String,
  supply: String
  )

object Supplier {
  implicit val format: OFormat[Supplier] = Json.format[Supplier]
}
