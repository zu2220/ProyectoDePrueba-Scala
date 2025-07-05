file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Client.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -play/api/libs/json/Date#
	 -Date#
	 -scala/Predef.Date#
offset: 158
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Client.scala
text:
```scala
package models

import play.api.libs.json._

case class Client(
  name: String,
  email: String,
  phone: String,
  address: String,
  birthdate: Dat@@e
)
object Client {
  implicit val format: OFormat[Client] = Json.format[Client]
} 
```


#### Short summary: 

empty definition using pc, found symbol in pc: 