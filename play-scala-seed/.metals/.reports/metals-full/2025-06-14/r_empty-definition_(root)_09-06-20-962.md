error id: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Ordenes.scala:OFormat
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Ordenes.scala
empty definition using pc, found symbol in pc: 
semanticdb not found

found definition using fallback; symbol OFormat
offset: 146
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Ordenes.scala
text:
```scala
package models

import play.api.libs.json._

case class Orden(nombre: String, fecha: DateTime,)

object Supplier {
  implicit val format: O@@Format[Orden] = Json.format[Orden]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 