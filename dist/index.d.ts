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
    getBiTablePage: ({ appToken, tableId, viewId, pageToken, mergeText, }: {
        appToken: string;
        tableId: string;
        viewId?: string | undefined;
        pageToken?: string | undefined;
        mergeText?: boolean | undefined;
    }) => Promise<any>;
    getBiTableAllData: ({ appToken, tableId, viewId, mergeText, }: {
        appToken: string;
        tableId: string;
        viewId?: string | undefined;
        mergeText?: boolean | undefined;
    }) => Promise<any[]>;
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