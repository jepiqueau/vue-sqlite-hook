import { Capacitor } from '@capacitor/core';
import { AvailableResult, notAvailable, FeatureNotAvailableError } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capEchoResult,
         capSQLiteChanges, capSQLiteValues, capNCDatabasePathResult } from '@capacitor-community/sqlite';

export { SQLiteDBConnection }

/**
 * SQLite properties
 * @since 2.0.1
 */
export type SQLiteProps = {
    onProgressImport?: (progress: string) => void;
    onProgressExport?: (progress: string) => void;
}

/**
 * SQLite Hook Interface
 */
export interface SQLiteHook extends  AvailableResult {
    /**
     * Init the web store
     * @returns Promise<void>
     * @since 2.1.1
     */
    initWebStore(): Promise<void>;
    /**
        * Save the datbase to the web store
        * @param database
        * @returns Promise<void>
        * @since 2.1.1
        */
    saveToStore(database: string): Promise<void>;
     /**
     * Echo a value
     * @param value
     * @returns Promise<{value: string}>
     * @since 1.0.0 refactor
     */
    echo(value: string): Promise<capEchoResult>;
    /**
     * Get platform
     * @returns Promise<{platform: string}>
     * @since 1.0.0 refactor
     */
    getPlatform(): Promise<{platform: string}>;
    /**
     * Get CapacitorSQLite plugin
     * @returns Promise<{plugin: any}}>
     * @since 2.0.5
     */
    getCapacitorSQLite(): Promise<{plugin: any}>;

    /**
     * Add an Upgrade Statement to Update Database Version
     * @param dbName database name
     * @param upgrade upgrade statement
     * @returns Promise<void>
     * @since 2.0.0
     */
    addUpgradeStatement(dbName: string, upgrade: VersionUpgrade): Promise<void>;
    /**
     * Create a connection to a database
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     * @param readonly since 3.0.2
     * @returns Promise<SQLiteDBConnection>
     * @since 2.0.0
     */
    createConnection(database: string, encrypted?: boolean, mode?: string,
                     version?: number, readonly?: boolean): Promise<SQLiteDBConnection>;
    /**
     * Check if a connection exists
     * @param database
     * @param readonly since 3.0.2
     * @returns Promise<Result>
     * @since 2.0.0
     */
     isConnection(database: string, readonly?: boolean): Promise<Result>;
     /**
     * Retrieve an existing database connection
     * @param database
     * @param readonly since 3.0.2
     * @returns Promise<SQLiteDBConnection>
     * @since 2.0.0
     */
    retrieveConnection(database: string, readonly?: boolean): Promise<SQLiteDBConnection>;
    /**
     * Retrieve all database connections
     * @returns Promise<Map<string, SQLiteDBConnection>>
     * @since 2.0.0
     */
    retrieveAllConnections(): Promise<Map<string, SQLiteDBConnection>>;
    /**
     * Close a database connection
     * @param database
     * @param readonly since 3.0.2
     * @returns Promise<void>
     * @since 2.0.0
     */
    closeConnection(database: string, readonly?: boolean): Promise<void>;
    /**
     * Close all database connections
     * @returns Promise<void>
     * @since 2.0.0
     */
    closeAllConnections(): Promise<void>;
    /**
     * Import a database From a JSON
     * @param jsonstring string
     * @returns Promise<Changes>
     * @since 1.0.0 refactor
     */
    importFromJson(jsonstring: string): Promise<capSQLiteChanges>;
    /**
     * Check the validity of a JSON Object
     * @param jsonstring string
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    isJsonValid(jsonstring: string): Promise<Result>;
    /**
     * Copy databases from assets to application database folder
     * @param overwrite // since 2.1.3
     * @returns Promise<void>
     * @since 2.0.0
     */
    copyFromAssets(overwrite?: boolean): Promise<void>;
    /**
     * Get databases from HTTP request
     * @param url 
     * @param overwrite
     * @since 3.0.3
     */
    getFromHTTPRequest(url: string, overwrite?: boolean): Promise<void>;

    /**
     * Check if a database exists
     * @param database
     * @returns Promise<Result>
     * @since 2.0.0
     */
    isDatabase(database: string): Promise<Result>;
    /**
     * Get a Non-Conformed database path
     * @param databasePath
     * @param version
     * @returns Promise<capNCDatabasePathResult>
     * @since 2.1.5
     */
    getNCDatabasePath(folderPath: string, database: string): Promise<capNCDatabasePathResult>;
    /**
     * Create a Non-Conformed database connection
     * @param databasePath
     * @param version
     * @returns Promise<SQLiteDBConnection>
     * @since 2.1.5
     */
    createNCConnection(databasePath: string, version?: number): Promise<SQLiteDBConnection>;
    /**
     * Retrieve a Non-Conformed database connection
     * @param databasePath
     * @returns Promise<SQLiteDBConnection>
     * @since 2.1.5
     */
    retrieveNCConnection(databasePath: string): Promise<SQLiteDBConnection>;
    /**
     * Close a Non-Conformed database connection
     * @param databasePath
     * @returns Promise<void>
     * @since 2.1.5
     */
    closeNCConnection(databasePath: string): Promise<void>;
    /**
     * Check if Non-Conformed database connection exists
     * @param databasePath
     * @returns Promise<Result>
     * @since 2.1.5
     */
    isNCConnection(databasePath: string): Promise<Result>;
    /**
     * Check if Non-Conformed database exists
     * @param databasePath
     * @returns Promise<Result>
     * @since 2.1.5
     */
    isNCDatabase(databasePath: string): Promise<Result>;
    /**
     * Get the database list
     * @returns Promise<capSQLiteValues>
     * @since 2.0.0
     */
    getDatabaseList(): Promise<capSQLiteValues>;
    /**
     * Get Migratable Cordova database List
     * @param folderPath
     * @returns Promise<capSQLiteValues>
     * @since 2.1.2
     */
    getMigratableDbList(folderPath?: string): Promise<capSQLiteValues>
 
    /**
     * Add SQLIte Suffix to existing Cordova databases
     * @param folderPath
     * @param dbNameList since 2.1.2
     * @returns Promise<void>
     * @since 2.0.0
     */
    addSQLiteSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>;
    /**
     * Delete Old Cordova databases
     * @param folderPath
     * @param dbNameList since 2.1.2
     * @returns Promise<void>
     * @since 2.0.0
     */
    deleteOldDatabases(folderPath?: string, dbNameList?: string[]): Promise<void>;
    /**
     * Check the consistency between Js Connections
     * and Native Connections
     * if inconsistency all connections are removed
     * @returns Promise<Result>
     * @since 2.0.1
     */
    checkConnectionsConsistency(): Promise<Result>;
    /**
     * Check if secure secret has been stored
     * @returns Promise<Result>
     * @since 2.0.2
     */
    isSecretStored(): Promise<Result>; 
    /**
     * Set an encrypted secret to secure storage
     * To run only once
     * Will migrate from GlobalSQLite secret when required
     * @param passphrase 
     * @returns Promise<void>
     * @since 2.0.2
     */
     setEncryptionSecret(passphrase: string): Promise<void>;   
    /**
     * Change encrypted secret from secure storage
     * Not to use to migrate from GlobalSQLite secret (run setEncryptionSecret)
     * @param passphrase 
     * @param oldpassphrase 
     * @returns Promise<void>
     * @since 2.0.2
     */
    changeEncryptionSecret(passphrase: string, oldpassphrase: string): Promise<void>; 
    /**
     * Clear the encrypted secret from secure storage
     * @returns Promise<void>
     * @since 3.0.0
     */ 
     clearEncryptionSecret(): Promise<void>;   
     /**
     * Remove Json Listeners
     * @since 2.0.1
     */
    removeListeners(): Promise<void>;
 
}

export interface MySet {
    statement?: string;
    values?: any[];
}

export interface VersionUpgrade {
    toVersion: number;
    statements: string[];
}

export interface Result {
    result?: boolean;
    message?: string
}

export let availableFeatures: any;
/**
 * useSQLite Hook
 */

export function useSQLite(onProgress? : SQLiteProps): SQLiteHook {
    const platform = Capacitor.getPlatform();
    const sqlitePlugin: any = CapacitorSQLite;
    const mSQLite = new SQLiteConnection(sqlitePlugin);
    // add listeners
    let importListener: any = null;
    let exportListener: any = null;
    if(platform != "electron") { 
        if( onProgress ) { 
            if(onProgress.onProgressImport && sqlitePlugin) importListener =
                sqlitePlugin.addListener('sqliteImportProgressEvent',
                (e: any) => {
                    if(typeof onProgress.onProgressImport !== 'undefined')
                        onProgress.onProgressImport(e.progress);
                });
            if(onProgress.onProgressExport && sqlitePlugin) exportListener =
                sqlitePlugin.addListener('sqliteExportProgressEvent',
                (e: any) => {
                    if(typeof onProgress.onProgressExport !== 'undefined')
                        onProgress.onProgressExport(e.progress);
                });
        }
    }

    availableFeatures = {
        useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
    };
    /**
     * Initialize the Web Store
     */
    const initWebStore = async (): Promise<void> => {
        if(platform != "web") { 
            return Promise.reject(`Not implemented on platform ${platform}`);
        }

        try {
            await mSQLite.initWebStore();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Save the Database to store
     * @param dbName string
     */
    const saveToStore = async (dbName: string): Promise<void> => {
        if(platform != "web") { 
            return Promise.reject(`Not implemented on platform ${platform}`);
        }
        if(dbName.length > 0) {
            try {
                await mSQLite.saveToStore(dbName);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    };    
    /**
     * Remove Json Listeners
     */
    const removeListeners = async (): Promise<void> => {
        if(platform != "electron") {   
            importListener.remove();
            exportListener.remove();
        }
    };
    /**
     * Echo value
     * @param value 
     */
    const echo = async (value: string): Promise<capEchoResult> => {
        const ret: capEchoResult = {value: ""};
        if(value) {
            const r = await mSQLite.echo(value);
            if(r) {
                return r;
            }
            return ret;    
        } else {
            ret.value = "Echo: failed";
            return ret;
        }
    };
    /**
     * Get Platform
     */
    const getPlatform = async (): Promise<any> => {
        return {platform: platform};
    };
    /**
     *  Get CapacitorSQLite plugin
     */
    const getCapacitorSQLite = async (): Promise<any> => {
        return {plugin: sqlitePlugin};
    };
    /**
     * Create a Connection to Database
     * @param dbName string
     * @param encrypted boolean optional 
     * @param mode string optional
     * @param version number optional
     * @param readonly boolean optional since 3.0.2
     */  
    const createConnection = async (dbName: string, encrypted?: boolean,
                                    mode?: string, version?: number,
                                    readonly?: boolean):
                                    Promise<SQLiteDBConnection> => {
        if (dbName == null || dbName.length === 0) {
            return Promise.reject(new Error('Must provide a database name'));
        } 
        const mDatabase: string = dbName;
        const mVersion: number = version ? version : 1;
        const mEncrypted: boolean = encrypted ? encrypted : false;
        const mMode: string = mode ? mode : "no-encryption";
        const mReadonly: boolean = readonly ? readonly : false;

        try {
            const r = await mSQLite.createConnection(
                    mDatabase, mEncrypted, mMode, mVersion, mReadonly);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned connection");
                } 
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Close the Connection to the Database
     * @param dbName string
     * @param readonly boolean optional since 3.0.2
     */
    const closeConnection = async (dbName: string,
                                   readonly?: boolean): Promise<void> => {
        const mReadonly: boolean = readonly ? readonly : false;
        if(dbName.length > 0) {
            try {
                await mSQLite.closeConnection(dbName, mReadonly);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Check if the Connection to the Database exists
     * @param dbName string
     * @param readonly boolean optional since 3.0.2
     */
    const isConnection = async (dbName: string,
                                readonly?: boolean): Promise<Result> => {
            const mReadonly: boolean = readonly ? readonly : false;
            if(dbName.length > 0) {
            try {
                const r = await mSQLite.isConnection(dbName, mReadonly);
                if(r) {
                        return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned isConnection");
                }
            } catch (err) {
                return Promise.reject(err);
            } 
        } else {
            return Promise.reject('Must provide a database name');
        }
    };
        
    /**
     * Retrieve a Connection to the Database
     * @param dbName string
     * @param readonly boolean optional since 3.0.2
     */
    const retrieveConnection = async (dbName: string,
                                      readonly?: boolean): Promise<SQLiteDBConnection> => {
            const mReadonly: boolean = readonly ? readonly : false;
            if(dbName.length > 0) {
            try {
                const r = await mSQLite.retrieveConnection(dbName, mReadonly);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned connection");
                }
            } catch (err) {
                return Promise.reject(err);
            }        
        } else {
            return Promise.reject('Must provide a database name');
        }        
    };
    /**
     * Retrieve all Connections to Databases
     * 
     */
    const retrieveAllConnections = async (): Promise<Map<string, SQLiteDBConnection>> => {
        try {
            const r = await mSQLite.retrieveAllConnections();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("No returned connection");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Close All Connections to Databases
     */
    const closeAllConnections = async (): Promise<void> => {
        try {
            await mSQLite.closeAllConnections();
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * Import from Json 
     * @param jsonstring string
     */
    const importFromJson = async (jsonstring: string): Promise<capSQLiteChanges> => {
        try {
            const r = await mSQLite.importFromJson(jsonstring);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error in importFromJson');
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Is Json Valid
     * @param jsonstring string
     */
    const isJsonValid = async (jsonstring: string): Promise<Result> => {
        try {
            const r = await mSQLite.isJsonValid(jsonstring);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error Json Object not valid');
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Add the upgrade Statement for database version upgrading
     * @param dbName string 
     * @param upgrade VersionUpgrade
     */
    const addUpgradeStatement = async (dbName:string, upgrade: VersionUpgrade): 
                                                      Promise<void> => {

        if(upgrade === null) {
            return Promise.reject(new Error("Must provide an upgrade statement"));
        }
        if( upgrade.toVersion === null
            || upgrade.statements === null) {
                let msg = "Must provide an upgrade statement with ";
                msg += "toVersion & statements"
                return Promise.reject(msg);
            }

        if(dbName.length > 0) {
            try {
                await mSQLite
                .addUpgradeStatement(dbName, upgrade.toVersion, upgrade.statements);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Copy databases from assets folder
     * @param overwrite 
     * @returns 
     */
    const copyFromAssets = async (overwrite?: boolean) : Promise<void> => {
        const mOverwrite = overwrite!= null ? overwrite : true;
        try {
            await mSQLite.copyFromAssets(mOverwrite);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Get databases from HTTP request
     * @param url
     * @param overwrite 
     * @returns 
     */
     const getFromHTTPRequest = async (url: string, overwrite?: boolean) : Promise<void> => {
        const mOverwrite = overwrite!= null ? overwrite : true;
        try {
            await mSQLite.getFromHTTPRequest(url, mOverwrite);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Check if the Database exists
     * @param dbName string
     */
    const isDatabase = async (dbName: string): Promise<Result> => {
        if(dbName.length > 0) {
            try {

                const r = await mSQLite.isDatabase(dbName);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("Error in isDatabase");
                }
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database name');
        }
    };
    /**
     * Get the list of databases
     */
    const getDatabaseList = async (): Promise<capSQLiteValues> => {
        try {
            const r = await mSQLite.getDatabaseList();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("Error in getDatabaseList");
            }
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Get the migratable cordova database list
     * @param folderPath
     * 
     */
    const getMigratableDbList = async (folderPath?: string): Promise<capSQLiteValues> => {
        const path: string = folderPath ? folderPath : "default"
        try {
            const r = await mSQLite.getMigratableDbList(path);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("Error in getMigratableDbList");
            }
        } catch(err) {
            return Promise.reject(err);
        }
    };
    /**
     * Add SQLite suffix to cordova databases
     * @param folderPath 
     * @param dbNameList
     */
    const addSQLiteSuffix = async (folderPath?: string, dbNameList?: string[]): Promise<void> => {
        const path: string = folderPath ? folderPath : "default"
        const dbList: string[] = dbNameList ? dbNameList : []
        try {
            await mSQLite.addSQLiteSuffix(path, dbList);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    };
    /**
     * Delete Cordova databases
     * @param folderPath 
     * @param dbNameList
     */
    const deleteOldDatabases = async (folderPath?: string, dbNameList?: string[]): Promise<void> => {
        const path: string = folderPath ? folderPath : "default"
        const dbList: string[] = dbNameList ? dbNameList : []
        try {
            await mSQLite.deleteOldDatabases(path, dbList);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    };
    /**
     * Check the consistency between Js Connections
     * and Native Connections
     * if inconsistency all connections are removed
     */
    const checkConnectionsConsistency = async () : Promise<Result> => {
        try {
            const r = await mSQLite.checkConnectionsConsistency();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error in checkConnectionsConsistency');
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Check if secure secret has been stored
     * @returns Promise<Result>
     * @since 2.0.2
     */
    const isSecretStored = async (): Promise<Result> => {
        try {
            const r = await mSQLite.isSecretStored();
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject('Error in isSecretStored');
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Set an encrypted secret to secure storage
     * To run only once
     * Will migrate from GlobalSQLite secret when required
     * @param passphrase 
     * @returns Promise<void>
     * @since 2.0.2
     */
    const setEncryptionSecret = async (passphrase: string): Promise<void> => {
        if (passphrase == null || passphrase.length === 0) {
            return Promise.reject(new Error('Must provide a passphrase'));
        } 
        try {
            await mSQLite.setEncryptionSecret(passphrase);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    };
    /**
     * Change encrypted secret from secure storage
     * Not to use to migrate from GlobalSQLite secret (run setEncryptionSecret)
     * @param passphrase 
     * @param oldpassphrase 
     * @returns Promise<void>
     * @since 2.0.2
     */
    const changeEncryptionSecret = async (passphrase: string,
        oldpassphrase: string): Promise<void> => {
        if (passphrase == null || passphrase.length === 0) {
            return Promise.reject(new Error('Must provide a passphrase'));
        } 
        if (oldpassphrase == null || oldpassphrase.length === 0) {
            return Promise.reject(new Error('Must provide the old passphrase'));
        } 
        try {
            await mSQLite.changeEncryptionSecret(passphrase, oldpassphrase);
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    };
    /**
     * Clear the encrypted secret from secure storage
     * @returns Promise<void>
     * @since 3.0.0
     */ 
    const clearEncryptionSecret = async (): Promise<void> => {
        try {
            await mSQLite.clearEncryptionSecret();
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    };   

    /**
     * Get a Non-Conformed database path
     * @param databasePath
     * @param version
     * @returns Promise<capNCDatabasePathResult>
     * @since 2.1.5
     */
    const getNCDatabasePath = async (folderPath: string, database: string): Promise<capNCDatabasePathResult> => {
        if (folderPath == null || folderPath.length === 0) {
            return Promise.reject(new Error('Must provide a folder path'));
        } 
        if (database == null || database.length === 0) {
            return Promise.reject(new Error('Must provide a database name'));
        } 
        const mFolderPath: string = folderPath;
        const mDatabase: string = database;
        try {
            const r = await mSQLite.getNCDatabasePath(
                mFolderPath, mDatabase);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("No returned database path");
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Create a Non-Conformed Database Connection 
     * @param databasePath string
     * @param version number optional
     */  
    const createNCConnection = async (databasePath: string, version?: number)
                                : Promise<SQLiteDBConnection> => {
        if (databasePath == null || databasePath.length === 0) {
            return Promise.reject(new Error('Must provide a database path'));
        } 
        const mDatabasePath: string = databasePath;
        const mVersion: number = version ? version : 1;
        try {
            const r = await mSQLite.createNCConnection(
                mDatabasePath, mVersion);
            if(r) {
                return Promise.resolve(r);
            } else {
                return Promise.reject("No returned NC connection");
            } 
        } catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * Retrieve a Non-Conformed Database Connection 
     * @param databasePath string
     */
    const retrieveNCConnection = async (databasePath: string): Promise<SQLiteDBConnection> => {
        if(databasePath.length > 0) {
            try {
                const r = await mSQLite.retrieveNCConnection(databasePath);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned NC connection");
                }
            } catch (err) {
                return Promise.reject(err);
            }        
        } else {
            return Promise.reject('Must provide a database path');
        }        
    };

    /**
     * Close a Non-Conformed Database Connection 
     * @param databasePath string
     */
    const closeNCConnection = async (databasePath: string): Promise<void> => {
        if(databasePath.length > 0) {
            try {
                await mSQLite.closeNCConnection(databasePath);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database path');
        }
    };
    /**
     * Check if a Non-Conformed Database Connection  exists
     * @param databasePath
     */
    const isNCConnection = async (databasePath: string): Promise<Result> => {
        if(databasePath.length > 0) {
            try {
                const r = await mSQLite.isNCConnection(databasePath);
                if(r) {
                        return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned  NC Connection");
                }
            } catch (err) {
                return Promise.reject(err);
            } 
        } else {
            return Promise.reject('Must provide a database path');
        }

    };
    /**
     * Check if database exists
     * @param databasePath
     */
    const isNCDatabase = async (databasePath: string): Promise<Result> => {
        if(databasePath.length > 0) {
            try {

                const r = await mSQLite.isNCDatabase(databasePath);
                if(r) {
                    return Promise.resolve(r);
                } else {
                    return Promise.reject("No returned  NC Connection");
                }
            } catch (err) {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject('Must provide a database path');
        }

    };

    if (!availableFeatures.useSQLite) {
        return {
            initWebStore: featureNotAvailableError,
            saveToStore: featureNotAvailableError,
            echo: featureNotAvailableError,
            getPlatform: featureNotAvailableError,
            getCapacitorSQLite: featureNotAvailableError,
            createConnection: featureNotAvailableError,
            closeConnection: featureNotAvailableError,
            retrieveConnection: featureNotAvailableError,
            retrieveAllConnections: featureNotAvailableError,
            closeAllConnections: featureNotAvailableError,
            addUpgradeStatement: featureNotAvailableError,
            importFromJson: featureNotAvailableError,
            isJsonValid: featureNotAvailableError,
            copyFromAssets: featureNotAvailableError,
            getFromHTTPRequest: featureNotAvailableError,
            isConnection: featureNotAvailableError,
            isDatabase: featureNotAvailableError,
            getNCDatabasePath: featureNotAvailableError,
            createNCConnection: featureNotAvailableError,
            closeNCConnection: featureNotAvailableError,
            retrieveNCConnection: featureNotAvailableError,
            isNCConnection: featureNotAvailableError,
            isNCDatabase: featureNotAvailableError,
            getDatabaseList: featureNotAvailableError,
            getMigratableDbList: featureNotAvailableError,
            addSQLiteSuffix: featureNotAvailableError,
            deleteOldDatabases: featureNotAvailableError,
            checkConnectionsConsistency: featureNotAvailableError,
            removeListeners: featureNotAvailableError,
            isSecretStored: featureNotAvailableError,
            setEncryptionSecret: featureNotAvailableError,
            changeEncryptionSecret: featureNotAvailableError,             
            clearEncryptionSecret: featureNotAvailableError,             
            ...notAvailable
        };
    } else {
        return {echo, getPlatform, getCapacitorSQLite, createConnection, closeConnection,
            retrieveConnection, retrieveAllConnections, closeAllConnections,
            addUpgradeStatement, importFromJson, isJsonValid, copyFromAssets, getFromHTTPRequest,
            isConnection, isDatabase, getDatabaseList, getMigratableDbList, addSQLiteSuffix,
            deleteOldDatabases, checkConnectionsConsistency, removeListeners,
            isSecretStored, setEncryptionSecret, changeEncryptionSecret, clearEncryptionSecret,
            initWebStore, saveToStore, getNCDatabasePath, createNCConnection,
            closeNCConnection, retrieveNCConnection, isNCConnection, isNCDatabase,
            isAvailable: true};
    }
}
