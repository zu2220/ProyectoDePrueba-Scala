// app/models/Supply.scala
package models

import play.api.libs.json._

case class Supply(
  _id: Option[Int],
  name: String,
  calories: Double,
  fat: Double,
  carbohydrates: Double,
  protein: Double,
  unit: String,
  supplier: Option[String] 
)

object Supply {
  implicit val format: OFormat[Supply] = Json.format[Supply]
}