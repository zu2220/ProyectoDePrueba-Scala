package clients.services

import clients.models.Client
import clients.repositories.ClientRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ClientService @Inject()(clientRepository: ClientRepository)(implicit ec: ExecutionContext) {
  def getClients: Future[Seq[Client]] = {
    clientRepository.getClients
  }

  def createClient(client: Client): Future[Unit] = {
    clientRepository.createClient(client)
  }

  def editClient(client: Client): Future[Boolean] = {
    clientRepository.editClient(client)
  }

  def deleteClient(id: String): Future[Boolean] = {
    clientRepository.deleteClient(id)
  }
}
