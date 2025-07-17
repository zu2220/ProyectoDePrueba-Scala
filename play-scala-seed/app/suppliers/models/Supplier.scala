package suppliers.models

import play.api.libs.json._

case class Supplier(
  _id: Option[String],
  name: String,
  email: String,
  phone: String,
  address: String,
  supply: String
  )

object Supplier {
  implicit val supplierformat: Format[Supplier] = Json.format[Supplier]
}
