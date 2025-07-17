package supplies.controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import supplies.models.Supply
import supplies.services.SupplyService

@Singleton
class SupplyController @Inject()(val controllerComponents: ControllerComponents, supplyService: SupplyService)
                                (implicit ec: ExecutionContext)
  extends BaseController {

  def getSupplies: Action[AnyContent] = Action.async {
    supplyService.getSupplies.map{ supplies =>
      Ok(Json.toJson(supplies))
    }
  }

  def createSupply: Action[JsValue] = Action.async(parse.json) {request =>
    request.body.validate[Supply].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Supply format"))),
      supply => supplyService.createSupply(supply).map(_=>Created(Json.toJson(supply)))
    )
  }

  def editSupply: Action[JsValue] = Action.async(parse.json) {request =>
    request.body.validate[Supply].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Supply format"))),
      supply => supplyService.editSupply(supply).map{result =>
        if(result){
          Ok(Json.obj("message" -> "Supply updated successfully"))
        } else {
          NotFound(Json.obj("error" -> "Supply wasn't found"))
        }
      }
    )
  }

  def deleteSupply(id: String): Action[AnyContent] = Action.async {
    supplyService.deleteSupply(id).map{result =>
      if(result) {
        Ok(Json.obj("message" -> "Supply deleted successfully"))
      } else {
        NotFound(Json.obj("error" -> "Supply wasn't found"))
      }
    }
  }

}