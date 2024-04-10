import { Lark } from "./index";
require("dotenv").config();

const appId = process.env.LARK_APP_ID as string;
const appSecret = process.env.LARK_APP_SECRET as string;
console.log(appId, appSecret);

const lark = new Lark({ appId, appSecret });

const appToken = ""; // 多维表格网址 base 后的路径部分
const tableId = ""; // 多维表格网址 table 参数的值

(async () => {
  // const result = await lark.getBiTableAllData({ appToken, tableId });
  console.log(new Date());
  const result = await lark.batchGetTempDownloadUrl([
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
    "C4ndbj3sUoMC5AxfAYkct1EPnVf",
    "Sno0bGUuNoz3RNxUOhLcYAHdntg",
    "DmMMbBVKLo6T30xnqGwcUltFnpb",
    "TAUGbQDjTob55axCDIccJh2hnte",
    "MzpSbdH78ob4dfxxMTgc5te0nTd",
  ]);

  console.log(JSON.stringify(result, null, 2));
  console.log(result.length);
})();
