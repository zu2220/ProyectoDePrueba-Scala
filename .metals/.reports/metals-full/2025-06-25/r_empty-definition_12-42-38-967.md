error id: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/SupplyController.scala:`<none>`.
file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/SupplyController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -javax/inject/Json.
	 -play/api/mvc/Json.
	 -play/api/libs/json/Json.
	 -org/mongodb/scala/Json.
	 -Json.
	 -scala/Predef.Json.
offset: 3424
uri: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/SupplyController.scala
text:
```scala
// app/controllers/SupplyController.scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.Supply // Asegúrate de que este modelo exista y esté bien definido
import db.MongoConnection // Asumo que tienes tu conexión a MongoDB aquí

@Singleton
class SupplyController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  // Define la colección para los insumos en MongoDB
  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("supplies")

  // --- Método para obtener todos los insumos (GET /api/supplies) ---
  def getSupplies: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val supplies = docs.map { doc =>
        // Mapea el Document de MongoDB a tu case class Supply
        // Asegúrate de que los nombres de campo aquí (ej. "name", "calories")
        // coincidan con los nombres en tu MongoDB y con los que esperas en tu frontend
        Supply(
          _id = Option(doc.getObjectId("_id").toHexString), // Mapea el ID de MongoDB a String
          name = doc.getString("name"),
          calories = doc.getDouble("calories"),
          fat = doc.getDouble("fat"),
          carbohydrates = doc.getDouble("carbohydrates"),
          protein = doc.getDouble("protein"),
          unit = doc.getString("unit"),
          supplier = Option(doc.getString("supplier")) // Maneja como Option si es opcional
        )
      }
      Ok(Json.toJson(supplies)) // Convierte la lista de Supplies a JSON
    }.recover { // Manejo básico de errores si falla la consulta a DB
      case e: Exception =>
        InternalServerError(Json.obj("error" -> s"Error al obtener insumos: ${e.getMessage}"))
    }
  }

  // --- Método para crear un nuevo insumo (POST /api/supplies) ---
  def createSupply: Action[JsValue] = Action(parse.json).async { request =>
    // Valida el JSON de la solicitud contra el formato de tu case class Supply
    request.body.validate[Supply].fold(
      errors => {
        // Si la validación falla, devuelve un 400 Bad Request
        Future.successful(BadRequest(Json.obj("error" -> "Invalid supply format", "details" -> JsError.toJson(errors))))
      },
      supply => {
        // Si la validación es exitosa, crea un Document para insertar en MongoDB
        val doc = Document(
          "name" -> supply.name,
          "calories" -> supply.calories,
          "fat" -> supply.fat,
          "carbohydrates" -> supply.carbohydrates,
          "protein" -> supply.protein,
          "unit" -> supply.unit,
          "supplier" -> supply.supplier // Almacena el proveedor
        )
        // Inserta el documento en la colección
        collection.insertOne(doc).toFuture().map { _ =>
          // Si la inserción es exitosa, devuelve un 201 Created con el insumo creado
          // Nota: El 'supply' aquí no tendrá el _id generado por MongoDB aún.
          // Para obtener el _id, tendrías que recuperarlo después de la inserción o modificar la forma en que insertas.
          Created(Json.toJson(supply))
        }.recover { // Manejo básico de errores si falla la inserción en DB
          case e: Exception =>
            InternalServerError(J@@son.obj("error" -> s"Error al crear insumo: ${e.getMessage}"))
        }
      }
    )
  }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.