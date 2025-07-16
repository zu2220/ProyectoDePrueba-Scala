package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Client
import db.MongoConnection
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters._

@Singleton
class ClientController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
    extends BaseController {
        val collection: MongoCollection[Document] = MongoConnection.database.getCollection("clients")
        
        def getClients: Action[AnyContent] = Action.async {
            collection.find().toFuture().map { docs =>
                val clients = docs.map { doc =>
                    Client(
                        doc.get("_id").map(_.asObjectId().getValue.toHexString),
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
                        "_id" -> new ObjectId(),
                        "name" -> client.name,
                        "email" -> client.email,
                        "phone" -> client.phone,
                        "address" -> client.address,
                        "birthdate" -> client.birthdate
                    )
                    collection.insertOne(doc).toFuture().map(result =>{
                        val clientWithId = client.copy(_id = doc.get("_id").map(_.asObjectId().getValue.toHexString))
                        Created(Json.toJson(clientWithId))
                    })
                }
            )
        }

        def editClient(id: String): Action[JsValue] = Action(parse.json).async {request =>
            request.body.validate[Client].fold(
                errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid clien format"))),
                client => {
                    val filter = equal("_id", new ObjectId(id))
                    val update = Document(
                        "$set" -> Document(
                        "name" -> client.name,
                        "email" -> client.email,
                        "phone" -> client.phone,
                        "address" -> client.address,
                        "birthdate" -> client.birthdate
                        )
                    )
                    collection.updateOne(filter, update).toFuture().map(result =>{
                        if(result.getModifiedCount > 0){
                            Ok(Json.toJson(client))
                        } else{
                            NotFound(Json.obj("error" -> "The client wasn't found"))
                        }
                    })
                }
            )
        }

        def deleteClient(id: String): Action[AnyContent] = Action.async {
            val filter = equal("_id", new ObjectId(id))

            collection.deleteOne(filter).toFuture.map(result =>{
                if(result.getDeletedCount > 0){
                    Ok(Json.obj("message" -> "The client was deleted succesfully"))
                } else {
                    NotFound(Json.obj("error" -> "The client wasn't found"))
                }
            })
        }
    }