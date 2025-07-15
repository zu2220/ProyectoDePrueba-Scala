package models

import play.api.libs.json._
import java.util.Date

case class Order(
  _id : Option[String],
  product_name: String,
  order_date: Date,
  total_amount: Double,
  customer_name: String,
  status: String,
  payment_method: String
  )

object Order{
  implicit val orderFormat: Format[Order] = Json.format[Order]
}
