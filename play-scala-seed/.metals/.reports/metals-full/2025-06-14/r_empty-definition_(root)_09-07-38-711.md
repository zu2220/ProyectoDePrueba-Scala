file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Ordenes.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:

offset: 149
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Ordenes.scala
text:
```scala
package models

import play.api.libs.json._
import java.util.Date

case class Orden(nombre: String, fecha: Date)

object Orden {
  implicit v@@al format: OFormat[Orden] = Json.format[Orden]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 