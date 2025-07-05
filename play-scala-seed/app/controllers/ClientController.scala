package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Client
import db.MongoConnection

@Singleton
class ClientController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
    extends BaseController {
        val collection: MongoCollection[Document] = MongoConnection.database.getCollection("clients")
        
        def getClients: Action[AnyContent] = Action.async {
            collection.find().toFuture().map { docs =>
                val clients = docs.map { doc =>
                    Client(
                        doc.getString("name"),
                        doc.getString("email"),
                        doc.getString("phone"),
                        doc.getString("address"),
                        doc.getDate("birthdate")
                    )
                }
                Ok(Json.toJson(clients))
            }
        }
        def createClient: Action[JsValue] = Action(parse.json).async { request =>
            request.body.validate[Client].fold(
                errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid client format"))),
                client => {
                    val doc = Document(
                        "name" -> client.name,
                        "email" -> client.email,
                        "phone" -> client.phone,
                        "address" -> client.address,
                        "birthdate" -> client.birthdate
                    )
                    collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(client)))
                }
            )
        }
    }