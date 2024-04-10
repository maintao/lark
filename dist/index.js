"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Lark_instances, _Lark_takeN;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lark = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_rate_limit_1 = __importDefault(require("axios-rate-limit"));
class Lark {
    constructor({ appId, appSecret }) {
        _Lark_instances.add(this);
        this.accessToken = {
            value: "",
            expireAt: Date.now(),
        };
        this.getAccessToken = async () => {
            if (this.accessToken.value && this.accessToken.expireAt - Date.now() > 60 * 1000) {
                // 还差60秒以上过期
                return this.accessToken.value;
            }
            const response = await (0, axios_1.default)({
                method: "post",
                url: "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
                data: {
                    app_id: this.appId,
                    app_secret: this.appSecret,
                },
            });
            // console.log("getAccessToken", response.data);
            if (response.data.code !== 0) {
                throw new Error("获取飞书 tenant_access_token 失败");
            }
            this.accessToken.value = response.data.tenant_access_token;
            this.accessToken.expireAt = Date.now() + response.data.expire * 1000; // 秒变成毫秒
            return this.accessToken.value;
        };
        this.getBiTablePage = async ({ appToken, tableId, pageToken, }) => {
            const response = await axios_1.default.get(`https://open.feishu.cn/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`, {
                params: {
                    page_size: 500,
                    pageToken,
                },
                headers: {
                    Authorization: `Bearer ${await this.getAccessToken()}`,
                },
            });
            // console.log("getBiTableData", response.data);
            if (response.data.code !== 0) {
                throw new Error("获取飞书多维表格数据失败");
            }
            return response.data.data;
        };
        this.getBiTableAllData = async ({ appToken, tableId, }) => {
            const ret = [];
            let pageToken;
            let hasMore = true;
            do {
                const result = await this.getBiTablePage({
                    appToken,
                    tableId,
                    pageToken,
                });
                hasMore = result.has_more;
                pageToken = result.page_token;
                ret.push(...result.items);
            } while (hasMore);
            return ret;
        };
        this.batchGetTempDownloadUrl = async (fileTokens) => {
            const ret = [];
            const takeFive = __classPrivateFieldGet(this, _Lark_instances, "m", _Lark_takeN).call(this, fileTokens, 5);
            let buf;
            const http = (0, axios_rate_limit_1.default)(axios_1.default.create(), { maxRPS: 1 });
            // const http = axios.create();
            while ((buf = takeFive())) {
                const params = buf.map((fileToken) => `file_tokens=${fileToken}`).join("&");
                const apiUrl = `https://open.feishu.cn/open-apis/drive/v1/medias/batch_get_tmp_download_url?${params}`;
                const response = await http.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${await this.getAccessToken()}`,
                    },
                });
                console.log("------", new Date());
                if (response.data.code !== 0) {
                    throw new Error("获取飞书多维表格数据失败");
                }
                let items = response.data.data.tmp_download_urls.map((item) => ({
                    fileToken: item.file_token,
                    url: item.tmp_download_url,
                }));
                ret.push(...items);
            }
            return ret;
        };
        this.appId = appId;
        this.appSecret = appSecret;
    }
}
exports.Lark = Lark;
_Lark_instances = new WeakSet(), _Lark_takeN = function _Lark_takeN(list, N) {
    let index = 0;
    return function () {
        if (index >= list.length) {
            return null;
        }
        const items = list.slice(index, index + N);
        index += N;
        return items;
    };
};
//# sourceMappingURL=index.js.map