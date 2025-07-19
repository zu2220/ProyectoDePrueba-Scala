package products.repositories

import db.MongoConnection
import org.mongodb.scala._
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters.equal
import products.models.Product

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductRepository @Inject()(implicit ec: ExecutionContext) {

  private val collection: MongoCollection[Document] = MongoConnection.database.getCollection("products")

  def getProducts: Future[Seq[Product]] = {
    collection.find().toFuture().map { docs =>
      docs.map { doc =>
        Product(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString("name"),
          doc.getDouble("price"),
          doc.getInteger("stock"),
          doc.getInteger("rate"),
          doc.getString("category")
        )
      }
    }
  }

  def createProduct(product: Product): Future[Unit] = {
    val newProduct: Document = Document(
      "_id" -> new ObjectId(),
      "name" -> product.name,
      "price" -> product.price,
      "stock" -> product.stock,
      "rate" -> product.rate,
      "category" -> product.category
    )

    collection.insertOne(newProduct).toFuture().map(_ => ())
  }

  def editProduct(product: Product): Future[Boolean] = {
    val filter = equal("_id", new ObjectId(product._id.get))
    val update = Document(
      "$set" -> Document(
        "name" -> product.name,
        "price" -> product.price,
        "stock" -> product.stock,
        "rate" -> product.rate,
        "category" -> product.category
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

  def deleteProduct(id: String): Future[Boolean] = {
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
