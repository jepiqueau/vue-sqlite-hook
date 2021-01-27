<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">Vue Hook for @capacitor-community/sqlite plugin</h3>
<p align="center"><strong><code>vue-sqlite-hook@initial</code></strong></p>
<p align="center">
  A Vue Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite@initial</code></strong> plugin in Vue or Ionic/Vue applications
</p>
<br>
<p align="center">
    <img src="https://img.shields.io/maintenance/no/2021?style=flat-square" />
    <a href="https://www.npmjs.com/package/vue-sqlite-hook"><img src="https://img.shields.io/npm/l/vue-sqlite-hook?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/vue-sqlite-hook"><img src="https://img.shields.io/npm/dw/vue-sqlite-hook?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-sqlite-hook"><img src="https://img.shields.io/npm/v/vue-sqlite-hook/initial?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>
<br>

## @NEXT For Capacitor 3 🚧 (Master)

The `Capacitor3`vue-sqlite-hook interfacing the `@capacitor-community/sqlite@next`

## @LATEST REFACTOR 🚀 (Move to branch 2.9.x)

The `refactor` vue-sqlite-hook interfacing the `@capacitor-community/sqlite@latest`

## @INITIAL 🛑 (Move to branch 2.4.x)

The `initial` vue-sqlite-hook interfacing the `@capacitor-community/sqlite@initial`. !!! The MAINTAINANCE is now STOPPED !!!
<br>


## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

```bash
npm install --save @capacitor-community/sqlite@initial
npm install --save-dev vue-sqlite-hook@initial
```

## Applications demonstrating the use of the plugin and the vue hook

### Vue 3
 - [vue-sqlite-app] (https://github.com/jepiqueau/vue-sqlite-app/tree/2.4.x)

### Ionic/Vue
 - [vue-sqlite-app-starter] (https://github.com/jepiqueau/vue-sqlite-app-starter/tree/2.4.x)


## Usage
Import the hook from its own path:

```js
 import { useSQLite } from 'vue-sqlite-hook/dist';
```

Then use the hook inside a component (to come)

```js
<template>
  <div id="no-encryption-container">
    <div id="log">
        <pre>
          <p>{{log}}</p>
        </pre>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue';
import { useSQLite } from 'vue-sqlite-hook/dist';

export default defineComponent({
  name: 'NoEncryptionTest',
  async setup() {
    const log = ref("");
    const { openDB, /*createSyncTable,*/ close, execute, /*executeSet,*/
            run, query/*, isDBExists, deleteDB, isJsonValid,
            importFromJson, exportToJson, setSyncDate,
            addUpgradeStatement*/} = useSQLite();
    const retNoEncryption = noEncryptionTest(log, openDB, close,
                                             execute, run, query);
    if(!retNoEncryption) {
      log.value = log.value
                .concat("* testDatabaseNoEncryption failed*\n"); 
      log.value = log.value.concat("\n* The set of tests failed *\n");
    } else {
      log.value = log.value
                  .concat("\n* The set of tests was successful *\n");
    }
    return { log };
  }

});
async function noEncryptionTest(log, openDB, close, execute, run,
                                query) {
  const createTablesNoEncryption =  `
    BEGIN TRANSACTION;
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    size FLOAT,
    age INTEGER,
    last_modified INTEGER DEFAULT (strftime('%s', 'now'))
    );
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY NOT NULL,
    userid INTEGER,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    last_modified INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE SET DEFAULT
    );
    CREATE INDEX IF NOT EXISTS users_index_name ON users (name);
    CREATE INDEX IF NOT EXISTS users_index_last_modified ON users (last_modified);
    CREATE INDEX IF NOT EXISTS messages_index_last_modified ON messages (last_modified);
    CREATE TRIGGER IF NOT EXISTS users_trigger_last_modified 
    AFTER UPDATE ON users
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE users SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END;      
    CREATE TRIGGER IF NOT EXISTS messages_trigger_last_modified AFTER UPDATE ON messages
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE messages SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END;      
    PRAGMA user_version = 1;
    COMMIT TRANSACTION;
  `;
  const importTwoUsers = `
    BEGIN TRANSACTION;
    DELETE FROM users;
    INSERT INTO users (name,email,age) VALUES ("Whiteley","Whiteley.com",30);
    INSERT INTO users (name,email,age) VALUES ("Jones","Jones.com",44);
    COMMIT TRANSACTION;
  `;
  const importThreeMessages = `
    BEGIN TRANSACTION;
    DELETE FROM messages;
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 1","content test post 1");
    INSERT INTO messages (userid,title,body) VALUES (2,"test post 2","content test post 2");
    INSERT INTO messages (userid,title,body) VALUES (1,"test post 3","content test post 3");
    COMMIT TRANSACTION;
  `;
  const dropTablesTablesNoEncryption = `
    PRAGMA foreign_keys = OFF;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS messages;
    PRAGMA foreign_keys = ON;
  `;  
  log.value = log.value
                .concat("* Starting testDatabaseNoEncryption *\n"); 
  // open the database
  let result = await openDB("test-sqlite"); 
  if(!result.result) {
      log.value = log.value.concat(" Failed to open the database\n");
      return false;
  }
  // Drop tables if exists
  result = await execute(dropTablesTablesNoEncryption);
  if(result.changes.changes !== 0 && result.changes.changes !== 1) {
    log.value = log.value.concat(" Execute1 failed\n");
    return false;
  }
  // Create tables
  result = await execute(createTablesNoEncryption);
  if(result.changes.changes !== 0 && result.changes.changes !== 1) {
    log.value = log.value.concat(" Execute2 failed\n");
    return false;
  }
  // Insert two users with execute method
  result = await execute(importTwoUsers);
  if(result.changes.changes !== 2) {
    log.value = log.value.concat(" Execute3 failed\n");
    return false;
  }
  // Select all Users
  result = await query("SELECT * FROM users");
  if(result.values.length !== 2 ||
  result.values[0].name !== "Whiteley" ||
                              result.values[1].name !== "Jones") {
    log.value = log.value.concat(" Select1 failed\n");
    return false;
  }
  // add one user with statement and values              
  let sqlcmd = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
  let values  = ["Simpson","Simpson@example.com",69];
  result = await run(sqlcmd,values);
  if(result.changes.changes !== 1 ||result.changes.lastId !== 3) {
    log.value = log.value.concat(" Run1 failed\n");
    return false;
  }
  // add one user with statement              
  sqlcmd = `INSERT INTO users (name,email,age) VALUES `;
  sqlcmd += `("Brown","Brown@example.com",15)`;
  result = await run(sqlcmd);
  if(result.changes.changes !== 1 || result.changes.lastId !== 4) {
    log.value = log.value.concat(" Run2 failed\n");
    return false;
  }
  // Select all Users
  result = await query("SELECT * FROM users");
  if(result.values.length !== 4) {
    log.value = log.value.concat(" Select2 failed\n");
    return false;
  }
  // Select Users with age > 35
  sqlcmd = "SELECT name,email,age FROM users WHERE age > ?";
  values = ["35"];
  result = await query(sqlcmd,values);
  if(result.values.length !== 2) {
    log.value = log.value.concat(" Select with filter on age failed\n");
    return false;
  }
  // Import three messages
  result = await execute(importThreeMessages);
  if(result.changes.changes !== 3) {
    log.value = log.value.concat(" Insert messages failed\n");
    return false;
  }
  // Select all Messages
  result = await query("SELECT * FROM messages");
  if(result.values.length !== 3 ||
      result.values[0].title !== "test post 1" 
                    || result.values[1].title !== "test post 2" 
                    || result.values[2].title !== "test post 3") {
    log.value = log.value.concat(" Select messages failed\n");
    return false;    
  }
  // Close the Database
  result = await close("test-sqlite")
  if(!result.result) {
    log.value = log.value.concat(" Failed to close the database\n");
    return false;    
  }       
  log.value = log.value.concat("* Ending testDatabaseNoEncryption *\n");     
  return true;
}
</script>
  
```

and then call the component from a view

```js
<template>
  <Suspense>
    <template #default>
      <NoEncryptionTest />
    </template>
    <template #feedback>
      <div> Loading ... </div>
    </template>
  </Suspense>
</template>
<script>
import NoEncryptionTest from '@/components/NoEncryptionTest.vue';
export default {
  name: 'DatabaseNoEncryption',
  components: { NoEncryptionTest }
};
</script>
<style>
h1 {
    text-align: center;
}
</style>
```


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/vue-sqlite-hook/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

