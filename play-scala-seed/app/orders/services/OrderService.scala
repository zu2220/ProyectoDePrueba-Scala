package orders.services

import orders.models.Order
import orders.repositories.OrderRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class OrderService @Inject()(orderRepository: OrderRepository)(implicit ec: ExecutionContext) {
  def getOrders: Future[Seq[Order]] = {
    orderRepository.getOrders
  }

  def createOrder(order: Order): Future[Unit] = {
    orderRepository.createOrder(order)
  }

  def editOrder(order: Order): Future[Boolean] = {
    orderRepository.editOrder(order)
  }

  def deleteOrder(id: String): Future[Boolean] = {
    orderRepository.deleteOrder(id)
  }
}
