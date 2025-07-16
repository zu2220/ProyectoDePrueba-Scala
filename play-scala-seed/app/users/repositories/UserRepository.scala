package users.repositories

import db.MongoConnection
import org.mongodb.scala._
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters.equal
import users.models.User

import javax.inject._
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepository @Inject()(implicit ec: ExecutionContext) {
  private val collection : MongoCollection[Document] = MongoConnection.database.getCollection("users")

  def getUsers: Future[Seq[User]] = {
    collection.find().toFuture().map{ docs =>
      docs.map{ doc =>
        User(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString(("name")),
          doc.getString("lastName"),
          doc.getString("birthday"),
          doc.getString("email"),
          doc.getString("password"),
          doc.getString("phone"),
          doc.getString("role")
        )
      }
    }
  }

  def createUser(user: User): Future[Unit] = {
    val newUser: Document = Document(
      "_id" -> new ObjectId(),
      "name" -> user.name,
      "lastName" -> user.lastName,
      "birthday" -> user.birthday,
      "email" -> user.email,
      "password" -> user.password,
      "phone" -> user.phone,
      "role" -> user.role
    )

    collection.insertOne(newUser).toFuture().map(_=>())
  }

  def editUser(user: User): Future[Unit] = {
    val filter = equal("_id", user._id)
    val update = Document(
      "$set" -> Document(
        "name" -> user.name,
        "lastName" -> user.lastName,
        "birthday" -> user.birthday,
        "email" -> user.email,
        "password" -> user.password,
        "phone" -> user.phone,
        "role" -> user.role
      )
    )
    collection.updateOne(filter, update).toFuture().map{_=>()}
  }
}
