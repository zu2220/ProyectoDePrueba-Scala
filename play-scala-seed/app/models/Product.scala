package models

import play.api.libs.json._

case class Product(
  _id: Option[String],
  name: String,
  price: Double,
  stock: Int,
  rate: Int,
  category: String
)
object Product {
  implicit val productFormat: Format[Product] = Json.format[Product]
}