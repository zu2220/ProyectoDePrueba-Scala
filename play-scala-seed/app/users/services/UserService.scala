package users.services

import users.models.User

import javax.inject.{Inject, Singleton}
import users.repositories.UserRepository

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserService @Inject()(userRepository: UserRepository)(implicit ec: ExecutionContext) {

  def getUsers: Future[Seq[User]] = {
    userRepository.getUsers
  }

  def createUser(user: User): Future[Unit] = {
    userRepository.createUser(user)
  }
}
