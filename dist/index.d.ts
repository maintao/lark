declare class Core {
    #private;
    appId: string;
    appSecret: string;
    apiDomain: string;
    accessToken: {
        value: string;
        expireAt: number;
    };
    constructor({ appId, appSecret, apiDomain, }: {
        appId: string;
        appSecret: string;
        apiDomain: string;
    });
    getAccessToken: () => Promise<string>;
    getBiTablePage: ({ appToken, tableId, pageToken, }: {
        appToken: string;
        tableId: string;
        pageToken?: string | undefined;
    }) => Promise<any>;
    getBiTableAllData: ({ appToken, tableId, }: {
        appToken: string;
        tableId: string;
    }) => Promise<any>;
    batchGetTempDownloadUrl: (fileTokens: string[]) => Promise<{
        fileToken: string;
        url: string;
    }[]>;
}
export declare class Feishu extends Core {
    constructor({ appId, appSecret }: {
        appId: string;
        appSecret: string;
    });
}
export declare class Lark extends Core {
    constructor({ appId, appSecret }: {
        appId: string;
        appSecret: string;
    });
}
export {};
//# sourceMappingURL=index.d.ts.map