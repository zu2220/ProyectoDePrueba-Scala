error id: 30968A1BD53DEEBD6AE831D6BED531F2
### scala.meta.internal.mtags.IndexingExceptions$InvalidSymbolException: .

Symbol: .

#### Error stacktrace:

```
scala.meta.internal.mtags.OnDemandSymbolIndex.definition(OnDemandSymbolIndex.scala:52)
	scala.meta.internal.metals.FallbackDefinitionProvider.findInIndex$1(FallbackDefinitionProvider.scala:131)
	scala.meta.internal.metals.FallbackDefinitionProvider.$anonfun$search$15(FallbackDefinitionProvider.scala:140)
	scala.collection.immutable.List.flatMap(List.scala:294)
	scala.meta.internal.metals.FallbackDefinitionProvider.$anonfun$search$3(FallbackDefinitionProvider.scala:140)
	scala.Option.map(Option.scala:242)
	scala.meta.internal.metals.FallbackDefinitionProvider.$anonfun$search$2(FallbackDefinitionProvider.scala:47)
	scala.Option.flatMap(Option.scala:283)
	scala.meta.internal.metals.FallbackDefinitionProvider.$anonfun$search$1(FallbackDefinitionProvider.scala:44)
	scala.Option.flatMap(Option.scala:283)
	scala.meta.internal.metals.FallbackDefinitionProvider.search(FallbackDefinitionProvider.scala:43)
	scala.meta.internal.metals.DefinitionProvider.fromFallback$1(DefinitionProvider.scala:126)
	scala.meta.internal.metals.DefinitionProvider.$anonfun$definition$13(DefinitionProvider.scala:143)
	scala.meta.internal.metals.DefinitionProvider.$anonfun$definition$15(DefinitionProvider.scala:150)
	scala.concurrent.impl.Promise$Transformation.run(Promise.scala:470)
	java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
	java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
	java.base/java.lang.Thread.run(Thread.java:842)
```
#### Short summary: 

scala.meta.internal.mtags.IndexingExceptions$InvalidSymbolException: .