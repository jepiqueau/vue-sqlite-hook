import { Plugins, Capacitor } from '@capacitor/core';
import { availableFeatures, useSQLite } from './useSQLite';

jest.mock('@capacitor/core', () => {
    let mDatabases: any = {};
    let curDatabase: string = "";
    let curEncrypted: boolean = false;
    let curMode: string = "no-encryption";
    let curTable: string = "";
    var mIsPluginAvailable: boolean = true;
    var platform: string = "ios";
    var permissions: boolean = false;
    return {
        Plugins: {
            CapacitorSQLite: {
                requestPermissions: async () => {
                    if(!permissions) {
                        throw new Error("Permission not granted");
                    } else {
                        return;
                    }
                },
                open: async (options: any) => {
                    const database = options.database ? options.database : "storage"; 
                    const encrypted: boolean = options.encrypted ? options.encrypted : false;
                    const mode:string = options.mode ? options.mode : "no-encryption";
                    if (!Object.keys(mDatabases).toString().includes(database)) {
                        let mTables: any = {};
                        mDatabases[database] = mTables; 
                    }
                    if(platform != "web") {
                        curDatabase = database;
                        curEncrypted = encrypted;
                        curMode = mode;
                        return {result: true};             
                    } else {
                        return {
                            result: false,
                            message: `Not implemented on Web Platform`,
                          }    
                    }
                }
                /* TODO other methods */
            }
        },
        Capacitor: {
            isPluginAvailable: () => true,
            getPlatform: () => platform,
            setPlatform: (_platform: string) => {
                platform = _platform;
            },
            grantPermissions: async () => {
                permissions = true;
            },
            platform: platform
        }

    }
});
jest.mock('@capacitor-community/sqlite', () => {
    return {
    }
});

it('Check CapacitorSQLite available for ios platform', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('ios');
//    capacitorMock.__init('ios');
    const {openDB, createSyncTable, close, execute, executeSet, run,
        query, isDBExists, deleteDB, isJsonValid, importFromJson,
        exportToJson, setSyncDate, addUpgradeStatement,
        isAvailable} = useSQLite();
    expect(availableFeatures.useSQLite).toBe(true);
    expect(isAvailable).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('ios');
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(true);
});
it('Check CapacitorSQLite available for android platform without permissions', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('android');
    const {openDB, createSyncTable, close, execute, executeSet, run,
        query, isDBExists, deleteDB, isJsonValid, importFromJson,
        exportToJson, setSyncDate, addUpgradeStatement,
        isAvailable} = useSQLite();
    expect(availableFeatures.useSQLite).toBe(true);
    expect(isAvailable).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('android');
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(false); // no permissions
    let msg = "Error requesting permissions ";
    msg += "Error: Permission not granted";
    expect(res.message).toEqual(msg);

});
it('Check CapacitorSQLite available for android platform with permissions', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('android');
    capacitorMock.grantPermissions();
    const {openDB, createSyncTable, close, execute, executeSet, run,
        query, isDBExists, deleteDB, isJsonValid, importFromJson,
        exportToJson, setSyncDate, addUpgradeStatement,
        isAvailable} = useSQLite();
    expect(availableFeatures.useSQLite).toBe(true);
    expect(isAvailable).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('android');
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(true);
});

it('Check CapacitorSQLite available for electron platform', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('electron');
    const {openDB, createSyncTable, close, execute, executeSet, run,
        query, isDBExists, deleteDB, isJsonValid, importFromJson,
        exportToJson, setSyncDate, addUpgradeStatement,
        isAvailable} = useSQLite();
    expect(capacitorMock.isPluginAvailable()).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('electron');
    expect(isAvailable).toBe(true);
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(true);
});
it('Check CapacitorSQLite not available for web platform', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('web');
    const {openDB, createSyncTable, close, execute, executeSet, run,
        query, isDBExists, deleteDB, isJsonValid, importFromJson,
        exportToJson, setSyncDate, addUpgradeStatement,
        isAvailable} = useSQLite();
    expect(capacitorMock.isPluginAvailable()).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('web');
    expect(isAvailable).toBe(true);
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(false);
    expect(res.message).toEqual("Not implemented on Web Platform");
});
    
