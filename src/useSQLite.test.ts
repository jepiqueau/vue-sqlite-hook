import { Plugins, Capacitor } from '@capacitor/core';
import { availableFeatures, useSQLite, isPermissions } from './useSQLite';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import '@capacitor-community/sqlite';
import { resolveComponent } from 'vue';
const { CapacitorSQLite } = Plugins;

jest.mock('@capacitor/core', () => {
    let mDatabases: any = {};
    let curDatabase: string = "";
    let curEncrypted: boolean = false;
    let curMode: string = "no-encryption";
    let curTable: string = "";
    var mIsPluginAvailable: boolean = true;
    var platform: string = 'ios';
    var listeners: string[] = [];
    var isPermissionGranted: boolean = true;
    return {
        Plugins: {
          CapacitorSQLite: {
            requestPermissions: async (): Promise<any> => {
                console.log(">>> in requestPermissions CapacitorSQLite")
                 return Promise.resolve({result: true});
            },

            open: async (options: any) => {
                const database = options.database ? options.database : "storage"; 
                const encrypted: boolean = options.encrypted ? options.encrypted : false;
                const mode:string = options.mode ? options.mode : "no-encryption";
                if (!Object.keys(mDatabases).toString().includes(database)) {
                    let mTables: any = {};
                    mDatabases[database] = mTables; 
                }
                curDatabase = database;
                curEncrypted = encrypted;
                curMode = mode;
                return {result: true};             
            },
            /* TODO other methods */
  
              
            addListener: (eventName: string) => {
                listeners.push(eventName);
                console.log(`in addListener ${eventName}`);
                if(eventName === "androidPermissionsRequest") {
                    isPermissions.granted = true;
                    return {permissionGranted: 1};
                } else {
                    isPermissions.granted = false;
                    return {permissionGranted: 0};
                }
            },
            removeAllListeners: () => {
                listeners = [];
            }
     
          }
        },
        Capacitor: {
      
            init: (isPluginAvailable: boolean, _platform: string): Promise<void> => {
                mIsPluginAvailable = isPluginAvailable;
                platform = _platform;
                return Promise.resolve();
            },
            isPluginAvailable: () => mIsPluginAvailable,
            getPlatform: () => platform,
            getPermissions: () => isPermissions.granted,
            platform: platform
        }
      }
});
jest.mock('@capacitor-community/sqlite', () => {
    var mIsConnection: boolean = false;
    var connDict: Map<string, SQLiteDBConnection> = new Map();
    return {
        SQLiteConnection : jest.fn().mockImplementation(() => { 
            return {
                constructor: () => {
                    return {};
                },
                echo: async (value: string) => { 
                    return {value: value};
                }, 
                createConnection: async (dbName: string,
                                         encrypted?: boolean,
                                         mode?: string,
                                         version?: number) => {
                        let dbConn: SQLiteDBConnection = new 
                                            SQLiteDBConnection(dbName,CapacitorSQLite)
                        if(dbConn != null) {
                            connDict.set(dbName,dbConn)
                            mIsConnection = true;
                            return dbConn;    
                        }                  
                },
                retrieveConnection: async (dbName: string) => {
                    if(mIsConnection) {
                        if(connDict.has(dbName)) {
                            const conn: any = connDict.get(dbName);
                            return conn;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                },
                closeConnection: async (dbName: string) => {
                    if(mIsConnection) {
                        if(connDict.has(dbName)) {
                            connDict.delete(dbName);
                            return {result: true};
                        } else {
                            return {result: false};
                        }
                    } else {
                        return {result: false};
                    }
                },
                retrieveAllConnections: async () => {
                    if(mIsConnection) {
                        var conns: any = {};
                        let keys = [...connDict.keys()];
                        keys.forEach(key => {
                            conns[key] = connDict.get(key);
                        });
                        return conns
                    } else {
                        return null;
                    }
                },
                closeAllConnections: async () => {
                    if(mIsConnection) {
                        connDict = new Map();
                        return {result: true};
                    } else {
                        return {result: false};
                    }
                },

            } 
        }),
        SQLiteDBConnection : jest.fn().mockImplementation(() => { 
            return {
                constructor: () => {
                    return {};
                },
            }
        }),
    }
});
it('Check CapacitorSQLite available for web platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(false, 'web')
    const { isAvailable } = useSQLite();
    expect(isAvailable).toBe(false);   

});

it('Check CapacitorSQLite available for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'ios');
    const { isAvailable } = useSQLite();
    expect(isAvailable).toBe(true);

});

it('Check CapacitorSQLite available for android platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'android'); 
    const { isAvailable } = useSQLite();
    expect(isAvailable).toBe(true);
});
it('Check CapacitorSQLite available for electron platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true, 'electron');
    const { isAvailable } = useSQLite();
    expect(isAvailable).toBe(true);
});

it('Check CapacitorSQLite echo for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'ios');
    
    const { echo } = useSQLite();
    const res: any = await echo("hello"); 
    expect(res.value).toEqual("hello");
  
});
it('Check CapacitorSQLite createConnection for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'ios');
    
    const { createConnection } = useSQLite();
    const res: any = await createConnection("testDB"); 
    expect(res).not.toBeNull();
  
});
it('Check CapacitorSQLite retrieveConnection for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'ios');
    
    const { createConnection, retrieveConnection } = useSQLite();
    let res: any = await createConnection("testDB"); 
    expect(res).not.toBeNull();
    res = await retrieveConnection("testDB");
    expect(res).not.toBeNull();
  
});
it('Check CapacitorSQLite closeConnection for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'ios');
    
    const { createConnection, closeConnection,
    retrieveConnection } = useSQLite();
    let res: any = await createConnection("testDB"); 
    expect(res).not.toBeNull();
    res = await closeConnection("testDB");
    expect(res.result).toBeTruthy();
    res = await retrieveConnection("testDB");
    expect(res).toBeDefined();
  
});
it('Check CapacitorSQLite create two connections for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'ios');
    
    const { createConnection, retrieveAllConnections } = useSQLite();

    let res: any = await createConnection("testFirstDB"); 
    expect(res).not.toBeNull();
    res = await createConnection("testSecondDB"); 
    expect(res).not.toBeNull();
    res = await retrieveAllConnections();
    let keys = Object.keys(res);
    expect(keys.length).toEqual(2);
    expect(keys[0]).toEqual("testFirstDB");
    expect(keys[1]).toEqual("testSecondDB");
  
});
it('Check CapacitorSQLite close all connections for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    await capacitorMock.init(true,'ios');
    
    const { createConnection, closeAllConnections,
        retrieveAllConnections } = useSQLite();

    let res: any = await createConnection("testFirstDB"); 
    expect(res).not.toBeNull();
    res = await createConnection("testSecondDB"); 
    expect(res).not.toBeNull();
    res = await retrieveAllConnections();
    let keys = Object.keys(res);
    expect(keys.length).toEqual(2);
    expect(keys[0]).toEqual("testFirstDB");
    expect(keys[1]).toEqual("testSecondDB");
    res = await closeAllConnections();
    expect(res.result).toBeTruthy();
    res = await retrieveAllConnections();
    keys = Object.keys(res);
    expect(keys.length).toEqual(0);
});

       
