error id: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/HomeController.scala:`<none>`.
file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/HomeController.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 330
uri: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/controllers/HomeController.scala
text:
```scala
package controllers

import javax.inject._
import play.api._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  /**
   * Create an Act@@ion to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.