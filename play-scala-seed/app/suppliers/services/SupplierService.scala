package suppliers.services

import suppliers.models.Supplier
import suppliers.repositories.SupplierRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SupplierService @Inject()(supplierRepository: SupplierRepository)(implicit ec: ExecutionContext) {
  def getSuppliers: Future[Seq[Supplier]] = {
    supplierRepository.getSuppliers
  }

  def createSupplier(supplier: Supplier): Future[Unit] = {
    supplierRepository.createSupplier(supplier)
  }

  def editSupplier(supplier: Supplier): Future[Boolean] = {
    supplierRepository.editSupplier(supplier)
  }

  def deleteSupplier(id: String): Future[Boolean] = {
    supplierRepository.deleteSupplier(id)
  }
}
