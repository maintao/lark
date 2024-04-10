export declare class Lark {
    #private;
    appId: string;
    appSecret: string;
    accessToken: {
        value: string;
        expireAt: number;
    };
    constructor({ appId, appSecret }: {
        appId: string;
        appSecret: string;
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
//# sourceMappingURL=index.d.ts.map