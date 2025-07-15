package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Order
import db.MongoConnection
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters._

@Singleton
class OrderController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("orders")

  def getOrders: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val orders = docs.map { doc =>
        Order(
            doc.get("_id").map(_.asObjectId().getValue.toHexString),
            doc.getString("product_name"),
            doc.getDate("order_date"),
            doc.getDouble("total_amount"),
            doc.getString("customer_name"),
            doc.getString("status"),
            doc.getString("payment_method")
        )
      }
      Ok(Json.toJson(orders))
    }
  }

  def createOrder: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[Order].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid order format"))),
      order => {
        val doc = Document(
            "_id" -> new ObjectId(),
            "product_name" -> order.product_name,
            "order_date" -> order.order_date,
            "total_amount" -> order.total_amount,
            "customer_name" -> order.customer_name,
            "status" -> order.status,
            "payment_method" -> order.payment_method
        )
        collection.insertOne(doc).toFuture().map(_ => {
          val orderWithId = order.copy(_id = doc.get("_id").map(_.asObjectId().getValue.toHexString))
          Created(Json.toJson(orderWithId))
        })
      }
    )
  }

  def editOrder(id: String): Action[JsValue] = Action(parse.json).async {request =>
    request.body.validate[Order].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Order format"))),
      order => {
        val filter = equal("_id", new ObjectId(id))
        val update = Document(
          "$set" -> Document(
              "product_name" -> order.product_name,
              "order_date" -> order.order_date,
              "total_amount" -> order.total_amount,
              "customer_name" -> order.customer_name,
              "status" -> order.status,
              "payment_method" -> order.payment_method
          )
        )

        collection.updateOne(filter, update).toFuture().map(result => {
          if(result.getModifiedCount > 0) {
            Ok(Json.toJson(order))
          } else{
            NotFound(Json.obj("error" -> "The order wasn't found"))
          }
        })
      }
    )
  }

  def deleteOrder(id: String) : Action[AnyContent] = Action.async {
    val filter = equal("_id", new ObjectId(id))

    collection.deleteOne(filter).toFuture().map(result => {
      if(result.getDeletedCount > 0) {
        Ok(Json.obj("message" -> "The order was deleted successfully"))
      } else{
        NotFound(Json.obj("error" -> "The order wasn't found"))
      }
    })
  }
}