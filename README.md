<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">Vue Hook for @capacitor-community/sqlite</h3>
<p align="center"><strong><code>vue-sqlite-hook@latest</code></strong></p>
<br>
<p align="center" style="font-size:50px;color:red"><strong>Capacitor 3</strong></p><br>
<p align="center">
  A Vue Hook to help Capacitor developpers to use <strong><code>@capacitor-community/sqlite@next</code></strong> plugin in Vue or Ionic/Vue applications
</p>
<br>
<p align="center">
    <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
    <a href="https://www.npmjs.com/package/vue-sqlite-hook"><img src="https://img.shields.io/npm/l/vue-sqlite-hook?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/vue-sqlite-hook"><img src="https://img.shields.io/npm/dw/vue-sqlite-hook?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/vue-sqlite-hook"><img src="https://img.shields.io/npm/v/vue-sqlite-hook?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>
<br>

## @NEXT For Capacitor 3 (Master)

The `Capacitor3` vue-sqlite-hook interfacing the `@capacitor-community/sqlite@latest`

## @LATEST REFACTOR 🚀 (Move to branch 2.9.x)

The `refactor` vue-sqlite-hook interfacing the `@capacitor-community/sqlite@refactor` !!! The MAINTAINANCE is now STOPPED !!!

## @INITIAL 🛑 (Move to branch 2.4.x)

The `initial` vue-sqlite-hook interfacing the `@capacitor-community/sqlite@initial`. !!! The MAINTAINANCE is now STOPPED !!!
<br>


## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

```bash
npm install --save @capacitor-community/sqlite@next
npm install --save-dev vue-sqlite-hook@next
```

## Supported methods

| Name                        | Android | iOS | Electron | Web |
| :-------------------------- | :------ | :-- | :------- | :-- |
| echo                        | ✅      | ✅   | 🚧       | ❌  |
| getPlatform                 | ✅      | ✅   | 🚧       | ❌  |
| addUpgradeStatement         | ✅      | ✅   | 🚧       | ❌  |
| createConnection            | ✅      | ✅   | 🚧       | ❌  |
| retrieveConnection          | ✅      | ✅   | 🚧       | ❌  |
| retrieveAllConnections      | ✅      | ✅   | 🚧       | ❌  |
| closeConnection             | ✅      | ✅   | 🚧       | ❌  |
| closeAllConnections         | ✅      | ✅   | 🚧       | ❌  |
| isConnection                | ✅      | ✅   | 🚧       | ❌  |
| isDatabase                  | ✅      | ✅   | 🚧       | ❌  |
| getDatabaseList             | ✅      | ✅   | 🚧       | ❌  |
| addSQLiteSuffix             | ✅      | ✅   | 🚧       | ❌  |
| deleteOldDatabases          | ✅      | ✅   | 🚧       | ❌  |
| importFromJson              | ✅      | ✅   | 🚧       | ❌  |
| isJsonValid                 | ✅      | ✅   | 🚧       | ❌  |
| copyFromAssets              | ✅      | ✅   | 🚧       | ❌  |
| checkConnectionsConsistency | ✅      | ✅   | 🚧       | ❌  |
| isSecretStored              | ✅      | ✅   | 🚧       | ❌  |
| setEncryptionSecret         | ✅      | ✅   | 🚧       | ❌  |
| changeEncryptionSecret      | ✅      | ✅   | 🚧       | ❌  |
| removeListeners             | ✅      | ✅   | 🚧       | ❌  |


## Supported listeners

| Name             | Android | iOS | Electron | Web |
| :--------------- | :------ | :-- | :------- | :-- |
| onProgressImport | ✅      | ✅   | 🚧       | ❌  |
| onProgressExport | ✅      | ✅   | 🚧       | ❌  |


## Documentation

- [API Hook](https://github.com/jepiqueau/vue-sqlite-hook/tree/main/docs/APIHook.md)


## Applications demonstrating the use of the plugin and the vue hook

### Vue 3
 - [vue-sqlite-app](https://github.com/jepiqueau/vue-sqlite-app)

### Ionic/Vue
 - [vue-sqlite-app-starter](https://github.com/jepiqueau/vue-sqlite-app-starter)


## Usage

The usage of `vue-sqlite-hook`is demonstrated in

- [Ionic/Vue_Usage_Documentation](https://github.com/capacitor-community/sqlite/blob/master/docs/Ionic-Vue-Usage.md)




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

