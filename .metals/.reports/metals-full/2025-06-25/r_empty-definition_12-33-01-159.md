error id: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/OrderController.scala:`<none>`.
file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/OrderController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject/org/mongodb/scala.
	 -play/api/mvc/org/mongodb/scala.
	 -play/api/libs/json/org/mongodb/scala.
	 -org/mongodb/scala/org/mongodb/scala.
	 -org/mongodb/scala.
	 -scala/Predef.org.mongodb.scala.
offset: 164
uri: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/OrderController.scala
text:
```scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.s@@cala._
import models.Order
import db.MongoConnection

@Singleton
class OrderController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("orders")

  def getOrders: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val orders = docs.map { doc =>
        Order(
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
            "product_name" -> order.product_name,
            "order_date" -> order.order_date,
            "total_amount" -> order.total_amount,
            "customer_name" -> order.customer_name,
            "status" -> order.status,
            "payment_method" -> order.payment_method
        )
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(order)))
      }
    )
  }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.