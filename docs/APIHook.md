<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h2 align="center">API HOOK DOCUMENTATION</h2>
<p align="center"><strong><code>vue-sqlite-hook</code></strong></p>
<p align="center">
  A Vue Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite</code></strong> plugin in Vue or Ionic/Vue applications</p>


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
* [`requestPermissions()`](#requestpermissions)
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
addUpgradeStatement(dbName: string, upgrade: VersionUpgrade) => Promise<Result>
```

Add an Upgrade Statement to Update Database Version

| Param         | Type                                                      | Description       |
| ------------- | --------------------------------------------------------- | ----------------- |
| **`dbName`**  | <code>string</code>                                       | database name     |
| **`upgrade`** | <code><a href="#versionupgrade">VersionUpgrade</a></code> | upgrade statement |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### createConnection(...)

```typescript
createConnection(database: string, encrypted?: boolean | undefined, mode?: string | undefined, version?: number | undefined) => Promise<SQLiteDBConnection | Result | null>
```

Create a connection to a database

| Param           | Type                 |
| --------------- | -------------------- |
| **`database`**  | <code>string</code>  |
| **`encrypted`** | <code>boolean</code> |
| **`mode`**      | <code>string</code>  |
| **`version`**   | <code>number</code>  |

**Returns:** <code>Promise&lt;SQLiteDBConnection | <a href="#result">Result</a> | null&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### retrieveConnection(...)

```typescript
retrieveConnection(database: string) => Promise<SQLiteDBConnection | Result | null>
```

Retrieve an existing database connection

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Returns:** <code>Promise&lt;SQLiteDBConnection | <a href="#result">Result</a> | null&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### retrieveAllConnections()

```typescript
retrieveAllConnections() => Promise<any | Result | null>
```

Retrieve all database connections

**Returns:** <code>Promise&lt;any&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### closeConnection(...)

```typescript
closeConnection(database: string) => Promise<Result>
```

Close a database connection

| Param          | Type                |
| -------------- | ------------------- |
| **`database`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### closeAllConnections()

```typescript
closeAllConnections() => Promise<Result>
```

Close all database connections

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

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


### requestPermissions()

```typescript
requestPermissions() => Promise<Result>
```

Request Permissions

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 1.0.0 refactor

--------------------


### Interfaces


#### capEchoResult

| Prop        | Type                | Description     |
| ----------- | ------------------- | --------------- |
| **`value`** | <code>string</code> | String returned |


#### Result

| Prop          | Type                 |
| ------------- | -------------------- |
| **`result`**  | <code>boolean</code> |
| **`message`** | <code>string</code>  |


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


#### capSQLiteChanges

| Prop          | Type                                        | Description                               |
| ------------- | ------------------------------------------- | ----------------------------------------- |
| **`changes`** | <code><a href="#changes">Changes</a></code> | a returned <a href="#changes">Changes</a> |
| **`message`** | <code>string</code>                         | a returned message                        |


#### Changes

| Prop          | Type                | Description                                          |
| ------------- | ------------------- | ---------------------------------------------------- |
| **`changes`** | <code>number</code> | the number of changes from an execute or run command |
| **`lastId`**  | <code>number</code> | the lastId created from a run command                |

</docgen-api>
