file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Supplier.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -play/api/libs/json/supply.
	 -play/api/libs/json/supply#
	 -play/api/libs/json/supply().
	 -supply.
	 -supply#
	 -supply().
	 -scala/Predef.supply.
	 -scala/Predef.supply#
	 -scala/Predef.supply().
offset: 224
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Supplier.scala
text:
```scala
package models

import play.api.libs.json._

case class Supplier(
  name: String,
  email: String,
            "phone" -> supplier.number,
          "address" -> supplier.address,
          "supply" -> supplier.supp@@ly
  )

object Supplier {
  implicit val format: OFormat[Supplier] = Json.format[Supplier]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 