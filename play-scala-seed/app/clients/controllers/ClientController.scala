package clients.controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import clients.models.Client
import clients.services.ClientService

@Singleton
class ClientController @Inject()(val controllerComponents: ControllerComponents, clientService: ClientService)(implicit ec: ExecutionContext)
  extends BaseController {
    def getClients: Action[AnyContent] = Action.async {
        clientService.getClients.map{ Clients =>
            Ok(Json.toJson(Clients))
        }
    }

    def createClient: Action[JsValue] = Action.async(parse.json) { request =>
        request.body.validate[Client].fold(
            errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Client format"))),
            Client => clientService.createClient(Client).map(_=>Created(Json.toJson(Client)))
        )
    }

    def editClient: Action[JsValue] = Action.async(parse.json) {request =>
        request.body.validate[Client].fold(
            errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid Client format"))),
            Client => clientService.editClient(Client).map{result =>
                if(result){
                    Ok(Json.obj("message" -> "Client updated successfully"))
                } else {
                    NotFound(Json.obj("error" -> "Client wasn't found"))
                }
            }
        )
    }

    def deleteClient(id: String): Action[AnyContent] = Action.async {
        clientService.deleteClient(id).map{result=>
            if(result){
                Ok(Json.obj("message" -> "Client deleted successfully"))
            } else {
                NotFound(Json.obj("error" -> "Client wasn't found"))
            }
        }
    }
}
