file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Order.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -play/api/libs/json/total_amount.
	 -play/api/libs/json/total_amount#
	 -play/api/libs/json/total_amount().
	 -total_amount.
	 -total_amount#
	 -total_amount().
	 -scala/Predef.total_amount.
	 -scala/Predef.total_amount#
	 -scala/Predef.total_amount().
offset: 151
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/models/Order.scala
text:
```scala
package models

import play.api.libs.json._
import java.util.Date

case class Order(
  product_name: String,
  order_date: Date,
  total_amount@@: Double,
  customer_name: String,
  status: String,
  payment_method: String
  )

object Order{
  implicit val format: OFormat[Order] = Json.format[Order]
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 