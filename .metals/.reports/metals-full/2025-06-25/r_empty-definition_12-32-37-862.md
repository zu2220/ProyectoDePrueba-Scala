error id: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/Order.scala:`<none>`.
file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/Order.scala
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
offset: 290
uri: file:///C:/Users/guill/OneDrive/Documentos/Lenguaje%20de%20Programacion/ProyectoDePrueba-Scala-rama-prueba2/play-scala-seed/app/models/Order.scala
text:
```scala
package models

import play.api.libs.json._
import java.util.Date

case class Order(
  product_name: String,
  order_date: Date,
  total_amount: Double,
  customer_name: String,
  status: String,
  payment_method: String
  )

object Order{
  implicit val format: OFormat[Order] = Json.forma@@t[Order]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.