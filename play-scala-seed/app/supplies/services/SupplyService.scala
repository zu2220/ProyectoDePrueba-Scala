package supplies.services

import supplies.models.Supply
import supplies.repositories.SupplyRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SupplyService @Inject()(supplyRepository: SupplyRepository)(implicit ec: ExecutionContext) {
  def getSupplies: Future[Seq[Supply]] = {
    supplyRepository.getSupplies
  }

  def createSupply(supply: Supply): Future[Unit] = {
    supplyRepository.createSupply(supply)
  }

  def editSupply(supply: Supply): Future[Boolean] = {
    supplyRepository.editSupply(supply)
  }

  def deleteSupply(id: String): Future[Boolean] = {
    supplyRepository.deleteSupply(id)
  }
}
