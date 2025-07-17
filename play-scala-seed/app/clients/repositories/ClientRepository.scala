package clients.repositories

import db.MongoConnection
import org.mongodb.scala._
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters.equal
import clients.models.Client

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ClientRepository @Inject()(implicit ec: ExecutionContext) {

  private val collection: MongoCollection[Document] = MongoConnection.database.getCollection("clients")

  def getClients: Future[Seq[Client]] = {
    collection.find().toFuture().map { docs =>
      docs.map { doc =>
        Client(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString("name"),
          doc.getString("email"),
          doc.getString("phone"),
          doc.getString("address"),
          doc.getDate("birthdate")
        )
      }
    }
  }

  def createClient(client: Client): Future[Unit] = {
    val newClient: Document = Document(
      "_id" -> client._id,
      "name" -> client.name,
      "email" -> client.email,
      "phone" -> client.phone,
      "address" -> client.address,
      "birthdate" -> client.birthdate
    )

    collection.insertOne(newClient).toFuture().map(_ => ())
  }

  def editClient(client: Client): Future[Boolean] = {
    val filter = equal("_id", new ObjectId(client._id.get))
    val update = Document(
      "$set" -> Document(
        "name" -> client.name,
        "email" -> client.email,
        "phone" -> client.phone,
        "address" -> client.address,
        "birthdate" -> client.birthdate
      )
    )
    collection.updateOne(filter, update).toFuture().map { result =>
      if (result.getModifiedCount > 0) {
        true
      } else {
        false
      }
    }
  }

  def deleteClient(id: String): Future[Boolean] = {
    val filter = equal("_id", new ObjectId(id))
    collection.deleteOne(filter).toFuture().map { result =>
      if (result.getDeletedCount > 0) {
        true
      } else {
        false
      }
    }
  }

}
