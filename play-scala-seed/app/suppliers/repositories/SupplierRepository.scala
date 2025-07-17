package suppliers.repositories

import db.MongoConnection
import org.mongodb.scala._
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters.equal
import suppliers.models.Supplier

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SupplierRepository @Inject()(implicit ec: ExecutionContext) {

  private val collection: MongoCollection[Document] = MongoConnection.database.getCollection("suppliers")

  def getSuppliers: Future[Seq[Supplier]] = {
    collection.find().toFuture().map { docs =>
      docs.map { doc =>
        Supplier(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString("name"),
          doc.getString("email"),
          doc.getString("phone"),
          doc.getString("address"),
          doc.getString("supply")
        )
      }
    }
  }

  def createSupplier(supplier: Supplier): Future[Unit] = {
    val newSupplier: Document = Document(
      "_id" -> supplier._id,
      "name" -> supplier.name,
      "email" -> supplier.email,
      "phone" -> supplier.phone,
      "address" -> supplier.address,
      "supply" -> supplier.supply
    )

    collection.insertOne(newSupplier).toFuture().map(_ => ())
  }

  def editSupplier(supplier: Supplier): Future[Boolean] = {
    val filter = equal("_id", new ObjectId(supplier._id.get))
    val update = Document(
      "$set" -> Document(
        "name" -> supplier.name,
        "email" -> supplier.email,
        "phone" -> supplier.phone,
        "address" -> supplier.address,
        "supply" -> supplier.supply
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

  def deleteSupplier(id: String): Future[Boolean] = {
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
