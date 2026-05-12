import type { CustomRequestOptions, IResponse } from "@/http/types";
import { useAifreedomAuthStore } from "@/store";
import { toLoginPage } from "@/utils/toLoginPage";
import { ResultEnum } from "./tools/enum";

function httpRequest<T>(options: CustomRequestOptions) {
  // 1. 返回 Promise 对象
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: "json",
      // #ifndef MP-WEIXIN
      responseType: "json",
      // #endif
      // 响应成功
      success: async (res) => {
        const responseData = res.data as IResponse<T>;
        const { code } = responseData;

        // 检查是否是401错误（包括HTTP状态码401或业务码401）
        const isTokenExpired = res.statusCode === 401 || code === 401;

        if (isTokenExpired) {
          const authStore = useAifreedomAuthStore();
          // token 过期，清理用户信息，跳转到登录页
          await authStore.logout();
          toLoginPage();
          return reject(res);
        }

        // 处理其他成功状态（HTTP状态码200-299）
        if (code === ResultEnum.Success00000) {
          return resolve(responseData.data);
        }

        // 处理其他错误
        !options.hideErrorToast &&
        uni.showToast({
            icon: "none",
            title: (res.data as any).msg || "请求错误",
          });
        reject(res);
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: "none",
          title: "网络错误，换个网络试试",
        });
        reject(err);
      },
    });
  });
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
function httpGet<T>(
  url: string,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) {
  return httpRequest<T>({
    url,
    query,
    method: "GET",
    header,
    ...options,
  });
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @param header 请求头，默认为json格式
 * @returns
 */
function httpPost<T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) {
  return httpRequest<T>({
    url,
    query,
    data,
    method: "POST",
    header,
    ...options,
  });
}

/**
 * PUT 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
function httpPut<T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) {
  return httpRequest<T>({
    url,
    query,
    data,
    method: "PUT",
    header,
    ...options,
  });
}

/**
 * DELETE 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
function httpDelete<T>(
  url: string,
  query?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) {
  return httpRequest<T>({
    url,
    query,
    method: "DELETE",
    header,
    ...options,
  });
}

/**
 * 上传文件
 * @param url 后台地址
 * @param filePath 文件路径
 * @param name 文件字段名
 * @param formData 其他表单数据
 * @param header 请求头
 * @returns
 */
function httpUpload<T>(
  url: string,
  filePath: string,
  name: string = "file",
  formData?: Record<string, any>,
  header?: Record<string, any>,
  options?: Partial<CustomRequestOptions>,
) {
  return new Promise<T>((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath,
      name,
      formData,
      header,
      success: (res) => {
        const data = JSON.parse(res.data) as IResponse<T>;
        if (data.code === ResultEnum.Success00000) {
          resolve(data.data);
        } else {
          uni.showToast({
            icon: "none",
            title: data.msg || "上传失败",
          });
          reject(data);
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: "none",
          title: "上传失败，请重试",
        });
        reject(err);
      },
      ...options,
    });
  });
}

// 导出 http 对象，包含 get/post/put/delete/upload 方法
export const http = {
  request: httpRequest,
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
  upload: httpUpload,
};

// 兼容旧代码的单独导出
export { httpRequest };
export { httpGet };
export { httpPost };
export { httpPut };
export { httpDelete };
export { httpUpload };
