package orders.repositories

import db.MongoConnection
import org.mongodb.scala._
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters.equal
import orders.models.Order

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderRepository @Inject()(implicit ec: ExecutionContext) {

  private val collection: MongoCollection[Document] = MongoConnection.database.getCollection("orders")

  def getOrders: Future[Seq[Order]] = {
    collection.find().toFuture().map { docs =>
      docs.map { doc =>
        Order(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString("product_name"),
          doc.getDate("order_date"),
          doc.getDouble("total_amount"),
          doc.getString("customer_name"),
          doc.getString("status"),
          doc.getString("payment_method"),
          doc.getString("notes")
        )
      }
    }
  }

  def createOrder(order: Order): Future[Unit] = {
    val newOrder: Document = Document(
      "_id" -> order._id,
      "product_name" -> order.product_name,
      "order_date" -> order.order_date,
      "total_amount" -> order.total_amount,
      "customer_name" -> order.customer_name,
      "status" -> order.status,
      "payment_method" -> order.payment_method,
      "notes" -> order.notes
    )

    collection.insertOne(newOrder).toFuture().map(_ => ())
  }

  def editOrder(order: Order): Future[Boolean] = {
    val filter = equal("_id", new ObjectId(order._id.get))
    val update = Document(
      "$set" -> Document(
        "product_name" -> order.product_name,
        "order_date" -> order.order_date,
        "total_amount" -> order.total_amount,
        "customer_name" -> order.customer_name,
        "status" -> order.status,
        "payment_method" -> order.payment_method,
        "notes" -> order.notes
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

  def deleteOrder(id: String): Future[Boolean] = {
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
