error id: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/Product.scala:`<none>`.
file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/Product.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -play/api/libs/json/String#
	 -String#
	 -scala/Predef.String#
offset: 139
uri: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/Product.scala
text:
```scala
package models

import play.api.libs.json._

case class Product(
  name: String,
  price: Double,
  stock: Int,
  rate: Int,
  category: St@@ring
)
object Product {
  implicit val format: OFormat[Product] = Json.format[Product]
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.