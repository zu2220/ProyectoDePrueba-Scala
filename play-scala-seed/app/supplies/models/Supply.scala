// app/models/Supply.scala
package models

import play.api.libs.json._

case class Supply(
  //_id: Option[Int],
  _id: Option[String],
  name: String,
  calories: Double,
  fat: Double,
  carbohydrates: Double,
  protein: Double,
  unit: String,
  supplier: String
)

object Supply {
  implicit val supplyFormat: Format[Supply] = Json.format[Supply]
}