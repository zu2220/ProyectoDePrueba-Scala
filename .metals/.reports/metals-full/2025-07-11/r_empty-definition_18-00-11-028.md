error id: file:///C:/Users/oscar/GitHub/ProyectoDePrueba-Scala/play-scala-seed/app/controllers/ClientController.scala:`<none>`.
file:///C:/Users/oscar/GitHub/ProyectoDePrueba-Scala/play-scala-seed/app/controllers/ClientController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 1938
uri: file:///C:/Users/oscar/GitHub/ProyectoDePrueba-Scala/play-scala-seed/app/controllers/ClientController.scala
text:
```scala
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
                    collection.insertOne(doc).toFuture().map{
                        @@val clientWithId = client.copy(_id = doc.get("_id").map(_.asObjectId().getValue.toHexString))
                        Created(Json.toJson(clientWithId))
                    }
                }
            )
        }
    }
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.