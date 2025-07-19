package suppliers.controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import suppliers.models.Supplier
import suppliers.services.SupplierService

@Singleton
class SupplierController @Inject()(val controllerComponents: ControllerComponents, supplierService: SupplierService)(implicit ec: ExecutionContext)
  extends BaseController {
  def getSuppliers: Action[AnyContent] = Action.async {
    supplierService.getSuppliers.map{ Suppliers =>
      Ok(Json.toJson(Suppliers))
    }
  }

  def createSupplier: Action[JsValue] = Action.async(parse.json) { request =>
    request.body.validate[Supplier].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Supplier format"))),
      Supplier => supplierService.createSupplier(Supplier).map(_=>Created(Json.toJson(Supplier)))
    )
  }

  def editSupplier: Action[JsValue] = Action.async(parse.json) {request =>
    request.body.validate[Supplier].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Supplier format"))),
      Supplier => supplierService.editSupplier(Supplier).map{result =>
        if(result){
          Ok(Json.obj("message" -> "Supplier updated successfully"))
        } else {
          NotFound(Json.obj("error" -> "Supplier wasn't found"))
        }
      }
    )
  }

  def deleteSupplier(id: String): Action[AnyContent] = Action.async {
    supplierService.deleteSupplier(id).map{result=>
      if(result){
        Ok(Json.obj("message" -> "Supplier deleted successfully"))
      } else {
        NotFound(Json.obj("error" -> "Supplier wasn't found"))
      }
    }
  }
}
