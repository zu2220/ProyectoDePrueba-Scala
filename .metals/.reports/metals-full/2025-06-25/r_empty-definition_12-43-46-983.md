error id: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/User.scala:`<none>`.
file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/User.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -play/api/libs/json/Json.format.
	 -play/api/libs/json/Json.format#
	 -play/api/libs/json/Json.format().
	 -Json.format.
	 -Json.format#
	 -Json.format().
	 -scala/Predef.Json.format.
	 -scala/Predef.Json.format#
	 -scala/Predef.Json.format().
offset: 278
uri: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/User.scala
text:
```scala
package models

import play.api.libs.json._
import java.util.Date

case class User(
  nombre: String,
  apellido: String,
  nacimiento: String,
  correo: String,
  contrasena: String,
  celular: String,
  rol: String
)

object User {
  implicit val format: OFormat[User] = Json.@@format[User]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.