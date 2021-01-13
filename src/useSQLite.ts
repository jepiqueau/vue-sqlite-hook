import { Capacitor, Plugins } from '@capacitor/core';
import { AvailableResult, notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import '@capacitor-community/sqlite';
import { capSQLiteChanges, capSQLiteValues, capSQLiteJson } from '@capacitor-community/sqlite';

/**
 * SQLite Hook Interface
 */
export interface SQLiteHook extends AvailableResult {
    /**
     * Open a database
     * @param dbName 
     * @param encrypted 
     * @param mode 
     * @param version 
     * @returns Promise<Result>
     * @since 0.0.1
     */
    openDB(dbName: string,encrypted?: boolean,mode?: string, version?: number):
                            Promise<Result>;
    /**
     * Create the synchronization table
     * @returns Promise<capSQLiteChanges>
     * @since 0.0.1
     */
    createSyncTable(): Promise<capSQLiteChanges>;
    /**
     * Close a database
     * @param dbName 
     * @returns Promise<Result>
     * @since 0.0.1
     */
    close(dbName: string):Promise<Result>;
    /**
     * Execute multiple raw statements given in a string
     * @param statements 
     * @returns Promise<capSQLiteChanges>
     * @since 0.0.1
     */
    execute(statements: string): Promise<capSQLiteChanges>;
    /**
     * Execute raw statements given in a set[]
     * @param set 
     * @returns Promise<capSQLiteChanges>
     * @since 0.0.1
     */
    executeSet(set: Set[]): Promise<capSQLiteChanges>;
    /**
     * Execute a raw statement given in a string
     * @param statement 
     * @param values (optional) 
     * @returns Promise<capSQLiteChanges>
     * @since 0.0.1
     */
    run(statement: string,values?: any[]): Promise<capSQLiteChanges>;
    /**
     * Execute a query
     * @param statement 
     * @param values (Optional)
     * @returns Promise<capSQLiteValues>
     * @since 0.0.1
     */
    query(statement: string,values?: string[]): Promise<capSQLiteValues>
    /**
     * Check if a database exists
     * @param dbName 
     * @returns Promise<Result>
     * @since 0.0.1
     */
    isDBExists(dbName: string): Promise<Result>;
    /**
     * Delete a database
     * @param dbName 
     * @returns Promise<Result>
     * @since 0.0.1
     */
    deleteDB(dbName: string): Promise<Result>;
    /**
     * Check if a Json Object is valid
     * @param jsonstring 
     * @returns Promise<Result>
     * @since 0.0.1
     */
    isJsonValid(jsonstring: string): Promise<Result>;
    /**
     * Import a Json Object into a database
     * @param jsonstring 
     * @returns Promise<capSQLiteChanges>
     * @since 0.0.1
     */
    importFromJson(jsonstring: string): Promise<capSQLiteChanges>;
    /**
     * Export a Json Object from a database
     * @param mode 
     * @returns Promise<capSQLiteJson>
     * @since 0.0.1
     */
    exportToJson(mode: string): Promise<capSQLiteJson>;
    /**
     * Set the synchronization date
     * @param syncDate Format yyyy-MM-dd'T'HH:mm:ss.SSSZ
     * @returns Promise<Result>
     * @since 0.0.1
     */
    setSyncDate(syncDate: string): Promise<Result>;
    /**
     * Add upgrade version statement
     * @param dbName 
     * @param upgrade
     * @returns Promise<Result>
     * @since 0.0.1
     */
    addUpgradeStatement(dbName: string, upgrade: VersionUpgrade): Promise<Result>;

}
export interface Set {
    statement?: string;
    values?: any[];
}

export interface VersionUpgrade {
    fromVersion: number;
    toVersion: number;
    statement: string;
    set?: Set[]; 
}
export interface Result {
    result?: boolean;
    message?: string
}

export const availableFeatures = {
    useSQLite: isFeatureAvailable('CapacitorSQLite', 'useSQLite')
}

/**
 * useSQLite Hook
 */

export function useSQLite(): SQLiteHook {
    const { CapacitorSQLite } = Plugins;
    const platform = Capacitor.getPlatform();
    const mSQLite:any = CapacitorSQLite;

    if (!availableFeatures.useSQLite) {
        return {
            openDB: featureNotAvailableError,
            createSyncTable: featureNotAvailableError,
            close: featureNotAvailableError,
            execute: featureNotAvailableError,
            executeSet: featureNotAvailableError,
            run: featureNotAvailableError,
            query: featureNotAvailableError,
            isDBExists: featureNotAvailableError,
            deleteDB: featureNotAvailableError,
            isJsonValid: featureNotAvailableError,
            importFromJson: featureNotAvailableError,
            exportToJson: featureNotAvailableError,
            setSyncDate: featureNotAvailableError,
            addUpgradeStatement: featureNotAvailableError,
            ...notAvailable
        };
    }
    /**
     * Open a Database
     * @param dbName string
     * @param _encrypted boolean optional 
     * @param _mode string optional
     * @param version number optional
     */  
    const openDB = async (dbName: string,
                                      encrypted?: boolean,
                                      mode?: string,
                                      version?: number) => {
        if (typeof dbName === 'undefined') {
        return { result: false,
        message: 'Must provide a database name'};
        }      
        const mDatabase: string = dbName;
        const mVersion: number = version ? version : 1;
        const mEncrypted: boolean = encrypted ? encrypted : false;
        const mMode: string = mode ? mode : "no-encryption";
        const r = await mSQLite.open({database: mDatabase,
                encrypted: mEncrypted,
                mode: mMode, version: mVersion});
        if(r) {
            if( typeof r.result != 'undefined') {
                if(r.result) {
                    return r;
                } else {
                    return {result: false, message: r.message};
                }
            }
        }
        return {result: false, message: "Error in openDB"};
    };
    /**
    * Create synchronisation table
    */
    const createSyncTable = async () => {
        const r = await mSQLite.createSyncTable();
        if(r) {
            if( typeof r.changes != 'undefined') {
                return r;
            }
        }
        return {changes:0};
    };
    /**
     * Close the Database
     * @param dbName string
     */
    const close = async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.close({database:dbName});
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in close"};  
        }
        return {result: false, message: "Must provide a database name"};
    };
    /**
     * Execute a set of Raw Statements
     * @param statements string 
     */
    const execute = async (statements: string) => {
        if(statements.length > 0) {
            const r = await mSQLite.execute({statements:statements});
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            } 
            return {changes:{changes:0}, message: "Error in execute"};  
        }
        return {changes:{changes:0},message:"Statements is empty"};
    };
    /**
     * Execute a set of Raw Statements as any[]
     * @param set any[] 
     */
    const executeSet = async (set: Set[]) => {
        if(set.length > 0) {
            const r = await mSQLite.executeSet({set:set});
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            }           
            return {changes:{changes: -1,lastId: -1},
                                message: "Error in executeSet"};
        }
        return {changes:{changes:-1,lastId:-1},message:"Set is empty"};
    };
    /**
     * Execute a Single Raw Statement
     * @param statement string
     * @param values any[] optional
     */
    const run = async (statement: string,
                                  values?: any[]) => {
        if(statement.length > 0) {
            const vals: any[] = values ? values : [];
            const r = await mSQLite.run({statement: statement,
                                         values: vals});
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            } 
            return {changes:{changes:0}, message: "Error in run"};  
        }
        return {changes:{changes:0,lastId:-1},
                                message: "Statement is empty"};
    };
    /**
     * Query a Single Raw Statement
     * @param statement string
     * @param values string[] optional
     */
    const query = async (statement: string,
                                     values?:string[]) => {
        if(statement.length > 0) {
            const vals: Array<any> = values ? values : [];
            const r = await mSQLite.query({statement: statement,
                                           values: vals});
            if(r) {
                if( typeof r.values != 'undefined') {
                    return r;
                }
            } 
            return {values:[], message: "Error in query"};  
        }
        return {values:[],message:"Statement is empty"};
    };
    /**
     * Check if the Database file exists
     * @param dbName string
     */
    const isDBExists = async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.isDBExists({database:dbName});
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in isDBExists"};  
        }
        return {result: false, message: "Must provide a database name"};
    };
    /**
     * Delete the Database file
     * @param dbName string
     */
    const deleteDB = async (dbName: string) => {
        if(dbName.length > 0) {
            const r = await mSQLite.deleteDatabase({database:dbName});
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in deleteDB"};  
        }
        return {result: false, message: "Must provide a database name"};
    };
    /**
     * Check the validity of a JSON Object
     * @param jsonstring string 
     */
    const isJsonValid = async (jsonstring: string) => {
        if(jsonstring.length > 0) {
            const r = await mSQLite.isJsonValid(
                                        {jsonstring:jsonstring});
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message: "Error in isJsonValid"};  
        }
        return {result: false, message: "Must provide a Json string"};
    };
    /**
     * Import a database From a JSON Object
     * @param jsonstring string 
     */
    const importFromJson = async (jsonstring: string) => {
        if(jsonstring.length > 0) {
            const r = await mSQLite.importFromJson (
                                        {jsonstring:jsonstring});
            if(r) {
                if( typeof r.changes != 'undefined') {
                    return r;
                }
            } 
            return {changes:{changes:-1},
                            message: "Error in importFromJson"};  
        }
        return {changes:{changes:-1},
                            message: "Must provide a Json string"};
    };
    /**
     * Export the given database to a JSON Object
     * @param mode string
     */
    const exportToJson = async (mode: string) => {
        if(mode.length > 0) {
            const r = await mSQLite.exportToJson({jsonexportmode:mode});
            if(r) {
                if( typeof r.export != 'undefined') {
                    return r;
                }
            } 
            return {export:{}, message: "Error in exportToJson"};  
        }
        return {export:{},message:"Must provide an export mode"};
    };
    /**
     * Set the synchronization date
     * @param syncDate string 
     */
    const setSyncDate = async (syncDate:string) => {
        if(syncDate.length > 0) {
            const r = await mSQLite.setSyncDate({syncdate:syncDate});
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            } 
            return {result: false, message:"Error in setSyncDate"};
        }
        return {result: false,
                    message:"Must provide a synchronization date"};
    };
    /**
     * Add the upgrade Statement for database version upgrading
     * @param dbName string 
     * @param upgrade VersionUpgrade
     */
    const addUpgradeStatement = async (dbName:string,
        upgrade: VersionUpgrade) => {
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

        if(dbName.length > 0) {
            const r = await mSQLite.addUpgradeStatement(
                {database: dbName, upgrade: [upgrade]});
            if(r) {
                if( typeof r.result != 'undefined') {
                    return r;
                }
            }  
        } else {
            return {result: false,
                message:"Must provide a database name"};
        }
    };

    return { openDB, createSyncTable, close, execute, executeSet, run,
             query, isDBExists, deleteDB, isJsonValid, importFromJson,
             exportToJson, setSyncDate, addUpgradeStatement,
             isAvailable: true };
}
