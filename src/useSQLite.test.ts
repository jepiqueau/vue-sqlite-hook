import { Plugins, Capacitor } from '@capacitor/core';
import { availableFeatures, useSQLite } from './useSQLite';

jest.mock('@capacitor/core', () => {
    let mDatabases: any = {};
    let curDatabase: string = "";
    let curEncrypted: boolean = false;
    let curMode: string = "no-encryption";
    var platform: string = "ios";
    var listeners: string[] = [];
    return {
        Plugins: {
            CapacitorSQLite: {
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
                },
                /* TODO other methods */
            }
        },
        Capacitor: {
            isPluginAvailable: () => true,
            getPlatform: () => platform,
            setPlatform: (_platform: string) => {
                platform = _platform;
            },
            platform: platform,

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
    const {openDB, isAvailable} = useSQLite();
    expect(availableFeatures.useSQLite).toBe(true);
    expect(isAvailable).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('ios');
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(true);
});
it('Check CapacitorSQLite available for android platform', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('android');
    const {openDB, isAvailable} = useSQLite();
    expect(availableFeatures.useSQLite).toBe(true);
    expect(isAvailable).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('android');
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(true);

});
it('Check CapacitorSQLite available for electron platform', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('electron');
    const {openDB, isAvailable} = useSQLite();
    expect(capacitorMock.isPluginAvailable()).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('electron');
    expect(isAvailable).toBe(true);
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(true);
});
it('Check CapacitorSQLite not available for web platform', async () => {
    const capacitorMock = (Capacitor as any);
    capacitorMock.setPlatform('web');
    const {openDB, isAvailable} = useSQLite();
    expect(capacitorMock.isPluginAvailable()).toBe(true);
    expect(capacitorMock.getPlatform()).toBe('web');
    expect(isAvailable).toBe(true);
    let res:any = await openDB("test-sqlite");
    expect(res.result).toBe(false);
    expect(res.message).toEqual("Not implemented on Web Platform");
});
    
