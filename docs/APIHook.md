<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h2 align="center">API HOOK DOCUMENTATION</h2>
<p align="center"><strong><code>vue-sqlite-hook@next</code></strong></p>
<p align="center">
  A Vue Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite@next</code></strong> plugin in Vue or Ionic/Vue applications</p>


## Methods Index

<docgen-index>

* [`echo(...)`](#echo)
* [`getPlatform()`](#getplatform)
* [`addUpgradeStatement(...)`](#addupgradestatement)
* [`createConnection(...)`](#createconnection)
* [`retrieveConnection(...)`](#retrieveconnection)
* [`retrieveAllConnections()`](#retrieveallconnections)
* [`closeConnection(...)`](#closeconnection)
* [`closeAllConnections()`](#closeallconnections)
* [`importFromJson(...)`](#importfromjson)
* [`isJsonValid(...)`](#isjsonvalid)
* [`copyFromAssets()`](#copyfromassets)
* [Interfaces](#interfaces)

</docgen-index>

## API Hook

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

SQLite Hook Interface

### echo(...)

```typescript
echo(value: string) => Promise<capEchoResult>
```

Echo a value

| Param       | Type                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#capechoresult">capEchoResult</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### getPlatform()

```typescript
getPlatform() => Promise<{ platform: string; }>
```

Get platform

**Returns:** <code>Promise&lt;{ platform: string; }&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### addUpgradeStatement(...)

```typescript
addUpgradeStatement(dbName: string, upgrade: VersionUpgrade) => Promise<void>
```

Add an Upgrade Statement to Update Database Version

| Param         | Type                                                      | Description       |
| ------------- | --------------------------------------------------------- | ----------------- |
| **`dbName`**  | <code>string</code>                                       | database name     |
| **`upgrade`** | <code><a href="#versionupgrade">VersionUpgrade</a></code> | upgrade statement |

**Since:** 2.0.0

--------------------


### createConnection(...)

```typescript
createConnection(database: string, encrypted?: boolean | undefined, mode?: string | undefined, version?: number | undefined) => Promise<SQLiteDBConnection>
```

Create a connection to a database

| Param           | Type                 |
| --------------- | -------------------- |
| **`database`**  | <code>string</code>  |
| **`encrypted`** | <code>boolean</code> |
| **`mode`**      | <code>string</code>  |
| **`version`**   | <code>number</code>  |

**Returns:** <code>Promise&lt;SQLiteDBConnection&gt;</code>

**Since:** 2.0.0

--------------------


### retrieveConnection(...)

```typescript
retrieveConnection(database: string) => Promise<SQLiteDBConnection>
```

Retrieve an existing database connection

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Returns:** <code>Promise&lt;SQLiteDBConnection&gt;</code>

**Since:** 2.0.0

--------------------


### retrieveAllConnections()

```typescript
retrieveAllConnections() => Promise<Map<string, SQLiteDBConnection>>
```

Retrieve all database connections

**Returns:** <code>Promise&lt;<a href="#map">Map</a>&lt;string, SQLiteDBConnection&gt;&gt;</code>

**Since:** 2.0.0

--------------------


### closeConnection(...)

```typescript
closeConnection(database: string) => Promise<void>
```

Close a database connection

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Since:** 2.0.0

--------------------


### closeAllConnections()

```typescript
closeAllConnections() => Promise<void>
```

Close all database connections

**Since:** 2.0.0

--------------------


### importFromJson(...)

```typescript
importFromJson(jsonstring: string) => Promise<capSQLiteChanges>
```

Import a database From a JSON

| Param            | Type                | Description |
| ---------------- | ------------------- | ----------- |
| **`jsonstring`** | <code>string</code> | string      |

**Returns:** <code>Promise&lt;<a href="#capsqlitechanges">capSQLiteChanges</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### isJsonValid(...)

```typescript
isJsonValid(jsonstring: string) => Promise<Result>
```

Check the validity of a JSON Object

| Param            | Type                | Description |
| ---------------- | ------------------- | ----------- |
| **`jsonstring`** | <code>string</code> | string      |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### copyFromAssets()

```typescript
copyFromAssets() => Promise<void>
```

Copy databases from assets to application database folder

**Since:** 2.0.0

--------------------


### Interfaces


#### capEchoResult

| Prop        | Type                | Description     |
| ----------- | ------------------- | --------------- |
| **`value`** | <code>string</code> | String returned |


#### VersionUpgrade

| Prop              | Type                 |
| ----------------- | -------------------- |
| **`fromVersion`** | <code>number</code>  |
| **`toVersion`**   | <code>number</code>  |
| **`statement`**   | <code>string</code>  |
| **`set`**         | <code>MySet[]</code> |


#### MySet

| Prop            | Type                |
| --------------- | ------------------- |
| **`statement`** | <code>string</code> |
| **`values`**    | <code>any[]</code>  |


#### Map

| Prop       | Type                |
| ---------- | ------------------- |
| **`size`** | <code>number</code> |

| Method      | Signature                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| **clear**   | () =&gt; void                                                                                                  |
| **delete**  | (key: K) =&gt; boolean                                                                                         |
| **forEach** | (callbackfn: (value: V, key: K, map: <a href="#map">Map</a>&lt;K, V&gt;) =&gt; void, thisArg?: any) =&gt; void |
| **get**     | (key: K) =&gt; V \| undefined                                                                                  |
| **has**     | (key: K) =&gt; boolean                                                                                         |
| **set**     | (key: K, value: V) =&gt; this                                                                                  |


#### capSQLiteChanges

| Prop          | Type                                        | Description                               |
| ------------- | ------------------------------------------- | ----------------------------------------- |
| **`changes`** | <code><a href="#changes">Changes</a></code> | a returned <a href="#changes">Changes</a> |


#### Changes

| Prop          | Type                | Description                                          |
| ------------- | ------------------- | ---------------------------------------------------- |
| **`changes`** | <code>number</code> | the number of changes from an execute or run command |
| **`lastId`**  | <code>number</code> | the lastId created from a run command                |


#### Result

| Prop          | Type                 |
| ------------- | -------------------- |
| **`result`**  | <code>boolean</code> |
| **`message`** | <code>string</code>  |

</docgen-api>

