package products.controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import products.models.Product
import products.services.ProductService

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents, productService: ProductService)(implicit ec: ExecutionContext)
  extends BaseController {
    def getProducts: Action[AnyContent] = Action.async {
        productService.getProducts.map{ Products =>
            Ok(Json.toJson(Products))
        }
    }

    def createProduct: Action[JsValue] = Action.async(parse.json) { request =>
        request.body.validate[Product].fold(
            errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Product format"))),
            Product => productService.createProduct(Product).map(_=>Created(Json.toJson(Product)))
        )
    }

    def editProduct: Action[JsValue] = Action.async(parse.json) {request =>
        request.body.validate[Product].fold(
            errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Product format"))),
            Product => productService.editProduct(Product).map{result =>
                if(result){
                    Ok(Json.obj("message" -> "Product updated successfully"))
                } else {
                    NotFound(Json.obj("error" -> "Product wasn't found"))
                }
            }
        )
    }

    def deleteProduct(id: String): Action[AnyContent] = Action.async {
        productService.deleteProduct(id).map{result=>
            if(result){
                Ok(Json.obj("message" -> "Product deleted successfully"))
            } else {
                NotFound(Json.obj("error" -> "Product wasn't found"))
            }
        }
    }
}
