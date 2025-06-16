file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Supplier.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -play/api/libs/json/address.
	 -play/api/libs/json/address#
	 -play/api/libs/json/address().
	 -address.
	 -address#
	 -address().
	 -scala/Predef.address.
	 -scala/Predef.address#
	 -scala/Predef.address().
offset: 181
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Supplier.scala
text:
```scala
package models

import play.api.libs.json._

case class Supplier(
  name: String,
  email: String,
            "phone" -> supplier.number,
          "address" -> supplier.ad@@dress,
          "supply" -> supplier.supply
  )

object Supplier {
  implicit val format: OFormat[Supplier] = Json.format[Supplier]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 