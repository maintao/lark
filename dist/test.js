"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
require("dotenv").config();
const appId = process.env.LARK_APP_ID;
const appSecret = process.env.LARK_APP_SECRET;
console.log(appId, appSecret);
const feishu = new index_1.Feishu({ appId, appSecret });
(async () => {
    const appToken = "FWY4bUoK5a5PoRsfIVmcF2tZnu3"; // 多维表格网址 base 后的路径部分
    const tableId = "tblnxYIS3ryJIXPh"; // 多维表格网址 table 参数的值
    const viewId = "vewFvaePw6"; // 多维表格网址 view 参数的值
    let result;
    result = await feishu.getBiTableAllData({ appToken, tableId, viewId });
    // result = await feishu.getBiTableAllData({ appToken, tableId });
    console.log("getBiTableAllData", JSON.stringify(result, null, 2));
    console.log(new Date());
    result = await feishu.batchGetTempDownloadUrl([
        "C4ndbj3sUoMC5AxfAYkct1EPnVf",
        "Sno0bGUuNoz3RNxUOhLcYAHdntg",
        "DmMMbBVKLo6T30xnqGwcUltFnpb",
        "TAUGbQDjTob55axCDIccJh2hnte",
        "MzpSbdH78ob4dfxxMTgc5te0nTd",
        "H7kPbSCRkotmYXxPQ6icSIXRnHb",
    ]);
    // console.log(JSON.stringify(result, null, 2));
    console.log(result.length);
})();
//# sourceMappingURL=test.js.map