name := """play-scala-seed"""
organization := "com.lenguajes"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.16"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % Test
libraryDependencies ++= Seq(
  guice,
  "org.mongodb.scala" %% "mongo-scala-driver" % "4.11.0",
  "com.typesafe.play" %% "play-json" % "2.9.4"
)
// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.lenguajes.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.lenguajes.binders._"
