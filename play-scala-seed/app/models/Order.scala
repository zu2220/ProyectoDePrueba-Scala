package models

import play.api.libs.json._
import java.util.Date

case class Order(
  product_name: String,
  order_date: Date,
  total_amount: Double,
  customer_name: String,
  status: String,
  payment_method: String
  )

object Order{
  implicit val format: OFormat[Order] = Json.format[Order]
}
