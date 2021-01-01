import { Capacitor, Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import '@capacitor-community/sqlite';
import { SQLiteDBConnection, SQLiteConnection, capEchoResult,
         capSQLiteChanges } from '@capacitor-community/sqlite';

export { SQLiteDBConnection }

/**
 * SQLite Hook Interface
 */
export interface SQLiteHook extends  AvailableResult {
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
     * Add an Upgrade Statement to Update Database Version
     * @param dbName database name
     * @param upgrade upgrade statement
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    addUpgradeStatement(dbName: string, upgrade: VersionUpgrade): Promise<Result>;
    /**
     * Create a connection to a database
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     * @returns Promise<SQLiteDBConnection | Result | null>
     * @since 1.0.0 refactor
     */
    createConnection(database: string, encrypted?: boolean, mode?: string,
                     version?: number,): Promise<SQLiteDBConnection | Result | null>;
    /**
     * Retrieve an existing database connection
     * @param database
     * @returns Promise<SQLiteDBConnection | Result | null>
     * @since 1.0.0 refactor
     */
    retrieveConnection(database: string): Promise<SQLiteDBConnection | Result | null>;
    /**
     * Retrieve all database connections
     * @returns Promise<capSQLiteResult>
     * @since 1.0.0 refactor
     */
    retrieveAllConnections(): Promise<any  | Result | null>;
    /**
     * Close a database connection
     * @param database
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    closeConnection(database: string): Promise<Result>;
    /**
     * Close all database connections
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    closeAllConnections(): Promise<Result>;
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
     * Request Permissions
     * @returns Promise<Result>
     * @since 1.0.0 refactor
     */
    requestPermissions(): Promise<Result>;
}

export interface MySet {
    statement?: string;
    values?: any[];
}

export interface VersionUpgrade {
    fromVersion: number;
    toVersion: number;
    statement: string;
    set?: MySet[]; 
}

export interface Result {
    result?: boolean;
    message?: string
}

export const isPermissions = {
    granted: true
}
export let availableFeatures: any;
/**
 * useSQLite Hook
 */

export function useSQLite(): SQLiteHook {
    const { CapacitorSQLite } = Plugins;
    const platform = Capacitor.getPlatform();
    const sqlitePlugin: any = CapacitorSQLite;
    const mSQLite = new SQLiteConnection(sqlitePlugin);
    isPermissions.granted = platform != "android" ? true : false;

    availableFeatures = {
        useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
    }
    
    /**
     * Request Permissions
     */
    const requestPermissions = async (): Promise<Result> => {
        return new Promise(async (resolve) => {
            if(platform === "android") { 
                const androidPermissions = async () => {
                    console.log("$$$$ going to ask for permissions " + platform)
                    try {
                        await sqlitePlugin.requestPermissions();
                        console.log("$$$$ after ask for permissions " + platform)
                        return { result: true };
                    } catch (e) {
                        console.log("Error requesting permissions " + e);
                        return { result: false,
                            message: "Error requesting permissions " + e};
                    }   
                }
                let permissionsListener: any = null;
                permissionsListener = sqlitePlugin.addListener(
                        'androidPermissionsRequest',async (e: any) => {
                            console.log(`$$$$ in addListener ${JSON.stringify(e)}`)
                    if(e.permissionGranted === 0) {
                        isPermissions.granted = false;
                        permissionsListener.remove();
                        resolve({result: false, message:
                            "Error Permissions not granted"});
                    } else {
                        isPermissions.granted = true;
                        permissionsListener.remove();
                        resolve({result: true});
                    }
                });
                await androidPermissions();
            } else {
                resolve({result: false, message:
                    "Error Permissions not required for this platform"});
            }
        });

    };
    /**
     * Echo value
     * @param value 
     */
    const echo = async (value: string): Promise<capEchoResult> => {
        const ret: capEchoResult = {value: ""};
        if(!isPermissions.granted) {
            ret.value = 'Error: Permissions not granted'; 
            return ret;       
        }
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
        if(!isPermissions.granted) {
            return {platform: 'Error: Permissions not granted'};       
        }
        return {platform: platform};
    };
    /**
     * Create a Connection to Database
     * @param dbName string
     * @param _encrypted boolean optional 
     * @param _mode string optional
     * @param version number optional
     */  
    const createConnection = async (dbName: string, encrypted?: boolean,
                                    mode?: string, version?: number):
                                    Promise<SQLiteDBConnection| Result> => {
        if (dbName == null || dbName.length === 0) {
            return { result: false,
            message: 'Must provide a database name'};
        } 
        if(!isPermissions.granted) {
            return { result: false,
                message: 'Error: Permissions not granted'};        
        }
        const mDatabase: string = dbName;
        const mVersion: number = version ? version : 1;
        const mEncrypted: boolean = encrypted ? encrypted : false;
        const mMode: string = mode ? mode : "no-encryption";
        const r = await mSQLite.createConnection(
                        mDatabase, mEncrypted, mMode, mVersion);

        if(r) {
            return r;
        }
        return { result: false, message: 'Create Connection failed'};
    }
    /**
     * Close the Connection to the Database
     * @param dbName string
     */
    const closeConnection = async (dbName: string): Promise<Result> => {
        if(!isPermissions.granted) {
            return { result: false,
                message: 'Error: Permissions not granted'};        
        }
        if(dbName.length > 0) {
            const r = await mSQLite.closeConnection(dbName);
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in closeConnection"};  
        }
        return {result: false, message: "Must provide a database name"};
    };
    /**
     * Retrieve a Connection to the Database
     * @param dbName string
     */
    const retrieveConnection = async (dbName: string):
                                      Promise<SQLiteDBConnection | Result | null> => {
        if(!isPermissions.granted) {
            return { result: false,
                message: 'Error: Permissions not granted'};        
        }
        if(dbName.length > 0) {
            const r = await mSQLite.retrieveConnection(dbName);
            if(r) {
                return r;
            } 
            return null;  
        }
        return {result: false, message: "Must provide a database name"};
    };
    /**
     * Retrieve all Connections to Databases
     * 
     */
    const retrieveAllConnections = async (): Promise<any  | Result | null> => {
        if(!isPermissions.granted) {
            return { result: false,
                message: 'Error: Permissions not granted'};        
        }
        const r = await mSQLite.retrieveAllConnections();
        if(r) {
            return r;
        } 
        return null;  
    };
    /**
     * Close All Connections to Databases
     * @param dbName string
     */
    const closeAllConnections = async (): Promise<Result> => {
        if(!isPermissions.granted) {
            return { result: false,
                message: 'Error: Permissions not granted'};        
        }
        const r = await mSQLite.closeAllConnections();
        if(r) {
            if( typeof r.result != 'undefined') {
                return r;
            }
        } 
        return {result: false, message: "Error in closeConnection"};  
    };

    /**
     * Import from Json 
     * @param jsonstring string
     */
    const importFromJson = async (jsonstring: string): Promise<capSQLiteChanges> => {
        if(!isPermissions.granted) {
            return { changes: {changes: -1, lastId: -1},
                message: 'Error: Permissions not granted'};        
        }
        const r = await mSQLite.importFromJson(jsonstring);
        if(r) {
            if( typeof r.changes != 'undefined') {
                return r;
            }
        } 
        return {changes: {changes: -1, lastId: -1}, message: "Error in importFromJson"};  
    };
    /**
     * IIs Json Valid
     * @param jsonstring string
     */
    const isJsonValid = async (jsonstring: string): Promise<Result> => {
        if(!isPermissions.granted) {
            return { result: false,
                message: 'Error: Permissions not granted'};        
        }
        const r = await mSQLite.isJsonValid(jsonstring);
        if(r) {
            if( typeof r.result != 'undefined') {
                return r;
            }
        } 
        return {result: false, message: "Error in isJsonValid"};  
    };
    /**
     * Add the upgrade Statement for database version upgrading
     * @param dbName string 
     * @param upgrade VersionUpgrade
     */
    const addUpgradeStatement = async (dbName:string, upgrade: VersionUpgrade): 
                                                      Promise<Result> => {
        if(upgrade === null) {
            return {result: false,
                    message:"Must provide an upgrade statement"};
        }
        if(upgrade.fromVersion === null || upgrade.toVersion === null
            || upgrade.statement === null) {
                let msg = "Must provide an upgrade statement with ";
                msg += "fromVersion & toVersion & statement"
                return {result: false,
                    message: msg};
        }
        if(!isPermissions.granted) {
            return { result: false,
                message: 'Error: Permissions not granted'};        
        }

        if(dbName.length > 0) {
            const r = await mSQLite
                .addUpgradeStatement(dbName, upgrade.fromVersion,
                                    upgrade.toVersion, upgrade.statement,
                                    upgrade.set)
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false,
                    message:"addUpgradeStatement failed"};
        } else {
            return {result: false,
                    message:"Must provide a database name"};
        }
    };
    if (!availableFeatures.useSQLite) {
        return {
            echo: featureNotAvailableError,
            getPlatform: featureNotAvailableError,
            createConnection: featureNotAvailableError,
            closeConnection: featureNotAvailableError,
            retrieveConnection: featureNotAvailableError,
            retrieveAllConnections: featureNotAvailableError,
            closeAllConnections: featureNotAvailableError,
            addUpgradeStatement: featureNotAvailableError,
            importFromJson: featureNotAvailableError,
            isJsonValid: featureNotAvailableError,
            requestPermissions: featureNotAvailableError,
            ...notAvailable
        };
    } else {
        return {echo, getPlatform, createConnection, closeConnection,
            retrieveConnection, retrieveAllConnections, closeAllConnections,
            addUpgradeStatement, importFromJson, isJsonValid,
            requestPermissions, isAvailable: true};
    }
}
