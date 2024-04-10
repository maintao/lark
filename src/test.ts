import { Feishu } from "./index";
require("dotenv").config();

const appId = process.env.LARK_APP_ID as string;
const appSecret = process.env.LARK_APP_SECRET as string;
console.log(appId, appSecret);

const feishu = new Feishu({ appId, appSecret });

const appToken = "MropbG4s1aCWW5sb7yFcSx9FnTg"; // 多维表格网址 base 后的路径部分
const tableId = "tbl89w73Li2MFBc9"; // 多维表格网址 table 参数的值

(async () => {
  let result;
  result = await feishu.getBiTableAllData({ appToken, tableId });
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

  console.log(JSON.stringify(result, null, 2));
  console.log(result.length);
})();
