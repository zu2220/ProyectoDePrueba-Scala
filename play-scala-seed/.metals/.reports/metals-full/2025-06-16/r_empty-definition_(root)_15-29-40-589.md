error id: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Order.scala:models/Orden#
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Order.scala
empty definition using pc, found symbol in pc: models/Orden#
semanticdb not found

found definition using fallback; symbol Orden
offset: 185
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Order.scala
text:
```scala
package models

import play.api.libs.json._
import java.util.Date

case class Order(name: String, date: Date)

object Orden{
  implicit val format: OFormat[Order] = Json.format[@@Order]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: models/Orden#