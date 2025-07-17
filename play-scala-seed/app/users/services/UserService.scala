package users.services

import users.models.User
import users.repositories.UserRepository

import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserService @Inject()(userRepository: UserRepository)(implicit ec: ExecutionContext) {

  def getUsers: Future[Seq[User]] = {
    userRepository.getUsers
  }

  def createUser(user: User): Future[Unit] = {
    userRepository.createUser(user)
  }

  def editUser(user: User): Future[Boolean] = {
    userRepository.editUser(user)
  }

  def deleteUser(id: String): Future[Boolean] = {
    userRepository.deleteUser(id)
  }
}
