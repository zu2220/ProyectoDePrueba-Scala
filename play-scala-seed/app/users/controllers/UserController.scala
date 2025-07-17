package users.controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import users.models.User
import users.services.UserService

@Singleton
class UserController @Inject()(val controllerComponents: ControllerComponents, userService: UserService)
                              (implicit ec: ExecutionContext)
  extends BaseController {

  def getUsers: Action[AnyContent] = Action.async {
    userService.getUsers.map{ users =>
      Ok(Json.toJson(users))
    }
  }

  def createUser: Action[JsValue] = Action.async(parse.json) { request =>
    request.body.validate[User].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid User format"))),
      user => userService.createUser(user).map(_=>Created(Json.toJson(user)))
    )
  }

  def editUser: Action[JsValue] = Action.async(parse.json) {request =>
    request.body.validate[User].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid User format"))),
      user => userService.editUser(user).map{result =>
        if(result){
          Ok(Json.obj("message" -> "User updated successfully"))
        } else {
          NotFound(Json.obj("error" -> "User wasn't found"))
        }
      }
    )
  }

  def deleteUser(id: String): Action[AnyContent] = Action.async {
    userService.deleteUser(id).map{result=>
      if(result){
        Ok(Json.obj("message" -> "User deleted successfully"))
      } else {
        NotFound(Json.obj("error" -> "User wasn't found"))
      }
    }
  }
}