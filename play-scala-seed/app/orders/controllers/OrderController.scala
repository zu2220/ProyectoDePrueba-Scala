package orders.controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import orders.models.Order
import orders.services.OrderService

@Singleton
class OrderController @Inject()(val controllerComponents: ControllerComponents, orderService: OrderService)(implicit ec: ExecutionContext)
  extends BaseController {
  def getOrders: Action[AnyContent] = Action.async {
    orderService.getOrders.map{ Orders =>
      Ok(Json.toJson(Orders))
    }
  }

  def createOrder: Action[JsValue] = Action.async(parse.json) { request =>
    request.body.validate[Order].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Order format"))),
      Order => orderService.createOrder(Order).map(_=>Created(Json.toJson(Order)))
    )
  }

  def editOrder: Action[JsValue] = Action.async(parse.json) {request =>
    request.body.validate[Order].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Order format"))),
      Order => orderService.editOrder(Order).map{result =>
        if(result){
          Ok(Json.obj("message" -> "Order updated successfully"))
        } else {
          NotFound(Json.obj("error" -> "Order wasn't found"))
        }
      }
    )
  }

  def deleteOrder(id: String): Action[AnyContent] = Action.async {
    orderService.deleteOrder(id).map{result=>
      if(result){
        Ok(Json.obj("message" -> "Order deleted successfully"))
      } else {
        NotFound(Json.obj("error" -> "Order wasn't found"))
      }
    }
  }
}
