package supplies.repositories

import db.MongoConnection
import org.mongodb.scala._
import org.mongodb.scala.bson.ObjectId
import org.mongodb.scala.model.Filters.equal
import supplies.models.Supply

import javax.inject._
import scala.concurrent.{ExecutionContext, Future}


@Singleton
class SupplyRepository @Inject()(implicit ec: ExecutionContext) {
  private val collection: MongoCollection[Document] = MongoConnection.database.getCollection("supplies")

  def getSupplies: Future[Seq[Supply]] = {
    collection.find().toFuture().map { docs =>
      docs.map { doc =>
        Supply(
          doc.get("_id").map(_.asObjectId().getValue.toHexString),
          doc.getString("name"),
          doc.getDouble("calories"),
          doc.getDouble("fat"),
          doc.getDouble("carbohydrates"),
          doc.getDouble("protein"),
          doc.getString("unit"),
          doc.getString("supplier")
        )
      }
    }
  }

  def createSupply(supply: Supply): Future[Unit] = {
    val newSupply: Document = Document(
      "_id" -> new ObjectId(),
      "name" -> supply.name,
      "calories" -> supply.calories,
      "fat" -> supply.fat,
      "carbohydrates" -> supply.carbohydrates,
      "protein" -> supply.protein,
      "unit" -> supply.unit,
      "supplier" -> supply.supplier
    )

    collection.insertOne(newSupply).toFuture().map(_ => ())
  }

  def editSupply(supply: Supply): Future[Boolean] = {
    val filter = equal("_id", new ObjectId(supply._id.get))
    val update = Document(
      "$set" -> Document(
        "name" -> supply.name,
        "calories" -> supply.calories,
        "fat" -> supply.fat,
        "carbohydrates" -> supply.carbohydrates,
        "protein" -> supply.protein,
        "unit" -> supply.unit,
        "supplier" -> supply.supplier
      )
    )
    collection.updateOne(filter, update).toFuture().map{result =>
      if(result.getModifiedCount > 0) {
        true
      } else {
        false
      }
    }
  }

  def deleteSupply(id: String): Future[Boolean] = {
    val filter = equal("_id", new ObjectId(id))
    collection.deleteOne(filter).toFuture().map{result =>
      if(result.getDeletedCount > 0) {
        true
      } else {
        false
      }
    }
  }
}
