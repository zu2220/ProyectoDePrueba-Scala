error id: 10AEC150A12B77B97634EF61C5DEA2E7
file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala
### java.lang.NullPointerException: Cannot invoke "scala.reflect.internal.Types$Type.memberType(scala.reflect.internal.Symbols$Symbol)" because the return value of "scala.reflect.internal.Trees$Tree.tpe()" is null

occurred in the presentation compiler.



action parameters:
offset: 746
uri: file:///C:/Users/oscar/OneDrive/Documentos/CICLO%20VII/Lengüajes%20de%20Programación/Trabajo%20de%20Referencia/prueba/prueba%20v5/play-scala-seed/app/controllers/UserController.scala
text:
```scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.{ExecutionContext, Future}
import org.mongodb.scala._
import models.User
import db.MongoConnection

@Singleton
class UserController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext)
  extends BaseController {

  val collection: MongoCollection[Document] = MongoConnection.database.getCollection("users")

  def getUsers: Action[AnyContent] = Action.async {
    collection.find().toFuture().map { docs =>
      val users = docs.map { doc =>
        User(
          doc.getString("nombre"),
          doc.getString("apellido"),
          doc.getDate("fecha_nacimiento"),@@
        )
      }
      Ok(Json.toJson(users))
    }
  }

  def createUser: Action[JsValue] = Action(parse.json).async { request =>
    request.body.validate[User].fold(
      errors => Future.successful(BadRequest(Json.obj("error" -> "Invalid user format"))),
      user => {
        val doc = Document("name" -> user.name, "email" -> user.email)
        collection.insertOne(doc).toFuture().map(_ => Created(Json.toJson(user)))
      }
    )
  }
}

```


presentation compiler configuration:
Scala version: 2.13.16
Classpath:
<WORKSPACE>\.bloop\root\bloop-bsp-clients-classes\classes-Metals-SLNChSv1RmmtoXgs_mAJhg== [exists ], <HOME>\AppData\Local\bloop\cache\semanticdb\com.sourcegraph.semanticdb-javac.0.10.4\semanticdb-javac-0.10.4.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala-library\2.13.16\scala-library-2.13.16.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\twirl\twirl-api_2.13\2.0.8\twirl-api_2.13-2.0.8.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-server_2.13\3.0.7\play-server_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-logback_2.13\3.0.7\play-logback_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-pekko-http-server_2.13\3.0.7\play-pekko-http-server_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-filters-helpers_2.13\3.0.7\play-filters-helpers_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-guice_2.13\3.0.7\play-guice_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\mongodb\scala\mongo-scala-driver_2.13\4.11.0\mongo-scala-driver_2.13-4.11.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\typesafe\play\play-json_2.13\2.9.4\play-json_2.13-2.9.4.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\modules\scala-xml_2.13\2.2.0\scala-xml_2.13-2.2.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play_2.13\3.0.7\play_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\ch\qos\logback\logback-classic\1.5.17\logback-classic-1.5.17.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-streams_2.13\3.0.7\play-streams_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-http-core_2.13\1.0.1\pekko-http-core_2.13-1.0.1.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\inject\guice\6.0.0\guice-6.0.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\inject\extensions\guice-assistedinject\6.0.0\guice-assistedinject-6.0.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\scala-reflect\2.13.16\scala-reflect-2.13.16.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\mongodb\scala\mongo-scala-bson_2.13\4.11.0\mongo-scala-bson_2.13-4.11.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\mongodb\mongodb-driver-reactivestreams\4.11.0\mongodb-driver-reactivestreams-4.11.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\typesafe\play\play-functional_2.13\2.9.4\play-functional_2.13-2.9.4.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\core\jackson-core\2.14.3\jackson-core-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\core\jackson-annotations\2.14.3\jackson-annotations-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.14.3\jackson-datatype-jdk8-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.14.3\jackson-datatype-jsr310-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\core\jackson-databind\2.14.3\jackson-databind-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-build-link\3.0.7\play-build-link-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-configuration_2.13\3.0.7\play-configuration_2.13-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\slf4j\slf4j-api\2.0.17\slf4j-api-2.0.17.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\slf4j\jul-to-slf4j\2.0.17\jul-to-slf4j-2.0.17.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\slf4j\jcl-over-slf4j\2.0.17\jcl-over-slf4j-2.0.17.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-actor_2.13\1.0.3\pekko-actor_2.13-1.0.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-actor-typed_2.13\1.0.3\pekko-actor-typed_2.13-1.0.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-slf4j_2.13\1.0.3\pekko-slf4j_2.13-1.0.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-serialization-jackson_2.13\1.0.3\pekko-serialization-jackson_2.13-1.0.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\dataformat\jackson-dataformat-cbor\2.14.3\jackson-dataformat-cbor-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\module\jackson-module-parameter-names\2.14.3\jackson-module-parameter-names-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\fasterxml\jackson\module\jackson-module-scala_2.13\2.14.3\jackson-module-scala_2.13-2.14.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\io\jsonwebtoken\jjwt-api\0.11.5\jjwt-api-0.11.5.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\io\jsonwebtoken\jjwt-impl\0.11.5\jjwt-impl-0.11.5.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\io\jsonwebtoken\jjwt-jackson\0.11.5\jjwt-jackson-0.11.5.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-json_2.13\3.0.4\play-json_2.13-3.0.4.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\guava\guava\32.1.3-jre\guava-32.1.3-jre.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\javax\inject\javax.inject\1\javax.inject-1.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\typesafe\ssl-config-core_2.13\0.6.1\ssl-config-core_2.13-0.6.1.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\scala-lang\modules\scala-parser-combinators_2.13\1.1.2\scala-parser-combinators_2.13-1.1.2.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\ch\qos\logback\logback-core\1.5.17\logback-core-1.5.17.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\reactivestreams\reactive-streams\1.0.4\reactive-streams-1.0.4.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-stream_2.13\1.0.3\pekko-stream_2.13-1.0.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-parsing_2.13\1.0.1\pekko-parsing_2.13-1.0.1.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\parboiled\parboiled_2.13\2.5.0\parboiled_2.13-2.5.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\jakarta\inject\jakarta.inject-api\2.0.1\jakarta.inject-api-2.0.1.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\aopalliance\aopalliance\1.0\aopalliance-1.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\errorprone\error_prone_annotations\2.21.1\error_prone_annotations-2.21.1.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\mongodb\bson\4.11.0\bson-4.11.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\mongodb\mongodb-driver-core\4.11.0\mongodb-driver-core-4.11.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\io\projectreactor\reactor-core\3.5.0\reactor-core-3.5.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-exceptions\3.0.7\play-exceptions-3.0.7.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\typesafe\config\1.4.3\config-1.4.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\lz4\lz4-java\1.8.0\lz4-java-1.8.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\thoughtworks\paranamer\paranamer\2.8\paranamer-2.8.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\playframework\play-functional_2.13\3.0.4\play-functional_2.13-3.0.4.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\guava\failureaccess\1.0.1\failureaccess-1.0.1.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\guava\listenablefuture\9999.0-empty-to-avoid-conflict-with-guava\listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\code\findbugs\jsr305\3.0.2\jsr305-3.0.2.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\checkerframework\checker-qual\3.37.0\checker-qual-3.37.0.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\google\j2objc\j2objc-annotations\2.8\j2objc-annotations-2.8.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\apache\pekko\pekko-protobuf-v3_2.13\1.0.3\pekko-protobuf-v3_2.13-1.0.3.jar [exists ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\org\mongodb\bson-record-codec\4.11.0\bson-record-codec-4.11.0.jar [exists ]
Options:
-deprecation -unchecked -encoding utf8 -Yrangepos -Xplugin-require:semanticdb




#### Error stacktrace:

```
scala.meta.internal.pc.SignatureHelpProvider$MethodCall.$anonfun$alternatives$1(SignatureHelpProvider.scala:164)
	scala.collection.immutable.List.map(List.scala:247)
	scala.meta.internal.pc.SignatureHelpProvider$MethodCall.alternatives(SignatureHelpProvider.scala:164)
	scala.meta.internal.pc.SignatureHelpProvider$MethodCallTraverser.$anonfun$fromTree$2(SignatureHelpProvider.scala:309)
	scala.meta.internal.pc.SignatureHelpProvider$MethodCallTraverser.$anonfun$fromTree$2$adapted(SignatureHelpProvider.scala:308)
	scala.Option$WithFilter.$anonfun$withFilter$1(Option.scala:362)
	scala.Option$WithFilter.$anonfun$withFilter$1$adapted(Option.scala:362)
	scala.Option$WithFilter.map(Option.scala:319)
	scala.meta.internal.pc.SignatureHelpProvider$MethodCallTraverser.fromTree(SignatureHelpProvider.scala:308)
	scala.meta.internal.pc.SignatureHelpProvider.$anonfun$signatureHelp$3(SignatureHelpProvider.scala:31)
	scala.Option.flatMap(Option.scala:283)
	scala.meta.internal.pc.SignatureHelpProvider.$anonfun$signatureHelp$2(SignatureHelpProvider.scala:29)
	scala.Option.flatMap(Option.scala:283)
	scala.meta.internal.pc.SignatureHelpProvider.signatureHelp(SignatureHelpProvider.scala:27)
	scala.meta.internal.pc.ScalaPresentationCompiler.$anonfun$signatureHelp$1(ScalaPresentationCompiler.scala:423)
	scala.meta.internal.pc.CompilerAccess.withSharedCompiler(CompilerAccess.scala:148)
	scala.meta.internal.pc.CompilerAccess.$anonfun$withNonInterruptableCompiler$1(CompilerAccess.scala:132)
	scala.meta.internal.pc.CompilerAccess.$anonfun$onCompilerJobQueue$1(CompilerAccess.scala:209)
	scala.meta.internal.pc.CompilerJobQueue$Job.run(CompilerJobQueue.scala:152)
	java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
	java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
	java.base/java.lang.Thread.run(Thread.java:842)
```
#### Short summary: 

java.lang.NullPointerException: Cannot invoke "scala.reflect.internal.Types$Type.memberType(scala.reflect.internal.Symbols$Symbol)" because the return value of "scala.reflect.internal.Trees$Tree.tpe()" is null