package products.services

import products.models.Product
import products.repositories.ProductRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductService @Inject()(productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  def getProducts: Future[Seq[Product]] = {
    productRepository.getProducts
  }

  def createProduct(product: Product): Future[Unit] = {
    productRepository.createProduct(product)
  }

  def editProduct(product: Product): Future[Boolean] = {
    productRepository.editProduct(product)
  }

  def deleteProduct(id: String): Future[Boolean] = {
    productRepository.deleteProduct(id)
  }
}
