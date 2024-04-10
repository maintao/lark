import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

class Core {
  appId: string;
  appSecret: string;
  apiDomain: string;
  accessToken = {
    value: "",
    expireAt: Date.now(),
  };

  constructor({
    appId,
    appSecret,
    apiDomain,
  }: {
    appId: string;
    appSecret: string;
    apiDomain: string;
  }) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.apiDomain = apiDomain;
  }

  getAccessToken = async (): Promise<string> => {
    if (this.accessToken.value && this.accessToken.expireAt - Date.now() > 60 * 1000) {
      // 还差60秒以上过期
      return this.accessToken.value;
    }

    const response = await axios({
      method: "post",
      url: `${this.apiDomain}/open-apis/auth/v3/tenant_access_token/internal`,
      data: {
        app_id: this.appId,
        app_secret: this.appSecret,
      },
    });

    if (response.data.code !== 0) {
      throw new Error("获取飞书 tenant_access_token 失败");
    }

    this.accessToken.value = response.data.tenant_access_token as string;
    this.accessToken.expireAt = Date.now() + response.data.expire * 1000; // 秒变成毫秒

    return this.accessToken.value;
  };

  getBiTablePage = async ({
    appToken,
    tableId,
    pageToken,
  }: {
    appToken: string;
    tableId: string;
    pageToken?: string;
  }): Promise<any> => {
    const response = await axios.get(
      `${this.apiDomain}/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`,
      {
        params: {
          page_size: 500, // 支持最大 page_size = 500
          pageToken,
        },
        headers: {
          Authorization: `Bearer ${await this.getAccessToken()}`,
        },
      }
    );

    if (response.data.code !== 0) {
      throw new Error("获取飞书多维表格数据失败");
    }

    return response.data.data;
  };

  getBiTableAllData = async ({
    appToken,
    tableId,
  }: {
    appToken: string;
    tableId: string;
  }): Promise<any> => {
    const ret = [];
    let pageToken;
    let hasMore = true;

    do {
      const result: any = await this.getBiTablePage({
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

  #takeN(list: string[], N: number) {
    let index = 0;
    return function () {
      if (index >= list.length) {
        return null;
      }

      const items = list.slice(index, index + N);
      index += N;
      return items;
    };
  }

  batchGetTempDownloadUrl = async (
    fileTokens: string[]
  ): Promise<{ fileToken: string; url: string }[]> => {
    const ret = [];
    const takeFive = this.#takeN(fileTokens, 5);
    let buf;
    const http = axiosRateLimit(axios.create(), { maxRPS: 5 });

    while ((buf = takeFive())) {
      const params = buf.map((fileToken) => `file_tokens=${fileToken}`).join("&");
      const apiUrl = `${this.apiDomain}/open-apis/drive/v1/medias/batch_get_tmp_download_url?${params}`;

      const response = await http.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${await this.getAccessToken()}`,
        },
      });

      if (response.data.code !== 0) {
        throw new Error("获取飞书多维表格数据失败");
      }

      let items = response.data.data.tmp_download_urls.map((item: any) => ({
        fileToken: item.file_token,
        url: item.tmp_download_url,
      }));

      ret.push(...items);
    }

    return ret;
  };
}

export class Feishu extends Core {
  constructor({ appId, appSecret }: { appId: string; appSecret: string }) {
    super({ appId, appSecret, apiDomain: "https://open.feishu.cn" });
  }
}

export class Lark extends Core {
  constructor({ appId, appSecret }: { appId: string; appSecret: string }) {
    super({ appId, appSecret, apiDomain: "https://open.larksuite.com" });
  }
}
