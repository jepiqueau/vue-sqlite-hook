<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h2 align="center">API HOOK DOCUMENTATION</h2>
<p align="center"><strong><code>vue-sqlite-hook</code></strong></p>
<p align="center">
  A Vue Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite</code></strong> plugin in Vue or Ionic/Vue applications</p>


## Methods Index

<docgen-index>

* [`openDB(...)`](#opendb)
* [`createSyncTable()`](#createsynctable)
* [`close(...)`](#close)
* [`execute(...)`](#execute)
* [`executeSet(...)`](#executeset)
* [`run(...)`](#run)
* [`query(...)`](#query)
* [`isDBExists(...)`](#isdbexists)
* [`deleteDB(...)`](#deletedb)
* [`isJsonValid(...)`](#isjsonvalid)
* [`importFromJson(...)`](#importfromjson)
* [`exportToJson(...)`](#exporttojson)
* [`setSyncDate(...)`](#setsyncdate)
* [`addUpgradeStatement(...)`](#addupgradestatement)
* [Interfaces](#interfaces)

</docgen-index>

## API Hook

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

SQLite Hook Interface

### openDB(...)

```typescript
openDB(dbName: string, encrypted?: boolean | undefined, mode?: string | undefined, version?: number | undefined) => Promise<Result>
```

Open a database

| Param           | Type                 |
| --------------- | -------------------- |
| **`dbName`**    | <code>string</code>  |
| **`encrypted`** | <code>boolean</code> |
| **`mode`**      | <code>string</code>  |
| **`version`**   | <code>number</code>  |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 0.0.1

--------------------


### createSyncTable()

```typescript
createSyncTable() => Promise<capSQLiteChanges>
```

Create the synchronization table

**Returns:** <code>Promise&lt;<a href="#capsqlitechanges">capSQLiteChanges</a>&gt;</code>

**Since:** 0.0.1

--------------------


### close(...)

```typescript
close(dbName: string) => Promise<Result>
```

Close a database

| Param        | Type                |
| ------------ | ------------------- |
| **`dbName`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 0.0.1

--------------------


### execute(...)

```typescript
execute(statements: string) => Promise<capSQLiteChanges>
```

Execute multiple raw statements given in a string

| Param            | Type                |
| ---------------- | ------------------- |
| **`statements`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#capsqlitechanges">capSQLiteChanges</a>&gt;</code>

**Since:** 0.0.1

--------------------


### executeSet(...)

```typescript
executeSet(set: Set[]) => Promise<capSQLiteChanges>
```

Execute raw statements given in a set[]

| Param     | Type               |
| --------- | ------------------ |
| **`set`** | <code>Set[]</code> |

**Returns:** <code>Promise&lt;<a href="#capsqlitechanges">capSQLiteChanges</a>&gt;</code>

**Since:** 0.0.1

--------------------


### run(...)

```typescript
run(statement: string, values?: any[] | undefined) => Promise<capSQLiteChanges>
```

Execute a raw statement given in a string

| Param           | Type                | Description |
| --------------- | ------------------- | ----------- |
| **`statement`** | <code>string</code> |             |
| **`values`**    | <code>any[]</code>  | (optional)  |

**Returns:** <code>Promise&lt;<a href="#capsqlitechanges">capSQLiteChanges</a>&gt;</code>

**Since:** 0.0.1

--------------------


### query(...)

```typescript
query(statement: string, values?: string[] | undefined) => Promise<capSQLiteValues>
```

Execute a query

| Param           | Type                  | Description |
| --------------- | --------------------- | ----------- |
| **`statement`** | <code>string</code>   |             |
| **`values`**    | <code>string[]</code> | (Optional)  |

**Returns:** <code>Promise&lt;<a href="#capsqlitevalues">capSQLiteValues</a>&gt;</code>

**Since:** 0.0.1

--------------------


### isDBExists(...)

```typescript
isDBExists(dbName: string) => Promise<Result>
```

Check if a database exists

| Param        | Type                |
| ------------ | ------------------- |
| **`dbName`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 0.0.1

--------------------


### deleteDB(...)

```typescript
deleteDB(dbName: string) => Promise<Result>
```

Delete a database

| Param        | Type                |
| ------------ | ------------------- |
| **`dbName`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 0.0.1

--------------------


### isJsonValid(...)

```typescript
isJsonValid(jsonstring: string) => Promise<Result>
```

Check if a Json Object is valid

| Param            | Type                |
| ---------------- | ------------------- |
| **`jsonstring`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 0.0.1

--------------------


### importFromJson(...)

```typescript
importFromJson(jsonstring: string) => Promise<capSQLiteChanges>
```

Import a Json Object into a database

| Param            | Type                |
| ---------------- | ------------------- |
| **`jsonstring`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#capsqlitechanges">capSQLiteChanges</a>&gt;</code>

**Since:** 0.0.1

--------------------


### exportToJson(...)

```typescript
exportToJson(mode: string) => Promise<capSQLiteJson>
```

Export a Json Object from a database

| Param      | Type                |
| ---------- | ------------------- |
| **`mode`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#capsqlitejson">capSQLiteJson</a>&gt;</code>

**Since:** 0.0.1

--------------------


### setSyncDate(...)

```typescript
setSyncDate(syncDate: string) => Promise<Result>
```

<a href="#set">Set</a> the synchronization date

| Param          | Type                | Description                       |
| -------------- | ------------------- | --------------------------------- |
| **`syncDate`** | <code>string</code> | Format yyyy-MM-dd'T'HH:mm:ss.SSSZ |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 0.0.1

--------------------


### addUpgradeStatement(...)

```typescript
addUpgradeStatement(dbName: string, upgrade: VersionUpgrade) => Promise<Result>
```

Add upgrade version statement

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`dbName`**  | <code>string</code>                                       |
| **`upgrade`** | <code><a href="#versionupgrade">VersionUpgrade</a></code> |

**Returns:** <code>Promise&lt;<a href="#result">Result</a>&gt;</code>

**Since:** 0.0.1

--------------------


### Interfaces


#### Result

| Prop          | Type                 |
| ------------- | -------------------- |
| **`result`**  | <code>boolean</code> |
| **`message`** | <code>string</code>  |


#### capSQLiteChanges

| Prop          | Type                                        | Description                               |
| ------------- | ------------------------------------------- | ----------------------------------------- |
| **`changes`** | <code><a href="#changes">Changes</a></code> | a returned <a href="#changes">Changes</a> |


#### Changes

| Prop          | Type                | Description                                          |
| ------------- | ------------------- | ---------------------------------------------------- |
| **`changes`** | <code>number</code> | the number of changes from an execute or run command |
| **`lastId`**  | <code>number</code> | the lastId created from a run command                |


#### Set

| Prop       | Type                |
| ---------- | ------------------- |
| **`size`** | <code>number</code> |

| Method      | Signature                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| **add**     | (value: T) =&gt; this                                                                                          |
| **clear**   | () =&gt; void                                                                                                  |
| **delete**  | (value: T) =&gt; boolean                                                                                       |
| **forEach** | (callbackfn: (value: T, value2: T, set: <a href="#set">Set</a>&lt;T&gt;) =&gt; void, thisArg?: any) =&gt; void |
| **has**     | (value: T) =&gt; boolean                                                                                       |


#### capSQLiteValues

| Prop         | Type               | Description                      |
| ------------ | ------------------ | -------------------------------- |
| **`values`** | <code>any[]</code> | the data values list as an Array |


#### capSQLiteJson

| Prop         | Type                                              | Description           |
| ------------ | ------------------------------------------------- | --------------------- |
| **`export`** | <code><a href="#jsonsqlite">JsonSQLite</a></code> | an export JSON object |


#### JsonSQLite

| Prop            | Type                     | Description                                                  |
| --------------- | ------------------------ | ------------------------------------------------------------ |
| **`database`**  | <code>string</code>      | The database name                                            |
| **`version`**   | <code>number</code>      | The database version                                         |
| **`encrypted`** | <code>boolean</code>     | <a href="#set">Set</a> to true (database encryption) / false |
| **`mode`**      | <code>string</code>      | * Set the mode ["full", "partial"]                           |
| **`tables`**    | <code>JsonTable[]</code> | * Array of Table (<a href="#jsontable">JsonTable</a>)        |


#### JsonTable

| Prop          | Type                      | Description                                              |
| ------------- | ------------------------- | -------------------------------------------------------- |
| **`name`**    | <code>string</code>       | The database name                                        |
| **`schema`**  | <code>JsonColumn[]</code> | * Array of Schema (<a href="#jsoncolumn">JsonColumn</a>) |
| **`indexes`** | <code>JsonIndex[]</code>  | * Array of Index (<a href="#jsonindex">JsonIndex</a>)    |
| **`values`**  | <code>any[][]</code>      | * Array of Table data                                    |


#### JsonColumn

| Prop             | Type                | Description                         |
| ---------------- | ------------------- | ----------------------------------- |
| **`column`**     | <code>string</code> | The column name                     |
| **`value`**      | <code>string</code> | The column data (type, unique, ...) |
| **`foreignkey`** | <code>string</code> | The column foreign key constraints  |


#### JsonIndex

| Prop        | Type                | Description                                                                                                             |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **`name`**  | <code>string</code> | The index name                                                                                                          |
| **`value`** | <code>string</code> | The value of the index can have the following formats: email email ASC email, MobileNumber email ASC, MobileNumber DESC |
| **`mode`**  | <code>string</code> | the mode (Optional) UNIQUE                                                                                              |


#### VersionUpgrade

| Prop              | Type                |
| ----------------- | ------------------- |
| **`fromVersion`** | <code>number</code> |
| **`toVersion`**   | <code>number</code> |
| **`statement`**   | <code>string</code> |
| **`set`**         | <code>Set[]</code>  |

</docgen-api>

