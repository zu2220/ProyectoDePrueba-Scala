package models

import play.api.libs.json._

case class Product(
  name: String,
  price: Double,
  stock: Int,
  rate: Int,
  category: String
)
object Product {
  implicit val format: OFormat[Product] = Json.format[Product]
}