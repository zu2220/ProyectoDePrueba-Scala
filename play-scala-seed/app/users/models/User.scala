package users.models

import play.api.libs.json._

case class User(
  _id: Option[String],
  name: String,
  lastName: String,
  birthday: String,
  email: String,
  password: String,
  phone: String,
  role: String
)

object User {
  implicit val userformat: Format[User] = Json.format[User]
}
