import type { AiLoginParams, AiUserInfoResp } from "@/api/types/aifreedom";
import { defineStore } from "pinia";
import { aiLoginIn, aiLogout, aiUserInfoQuery } from "@/api/aifreedom";

interface AifreedomAuthState {
  token: string;
  uid: string;
  userInfo: AiUserInfoResp | null;
}

export const useAifreedomAuthStore = defineStore("aifreedom-auth", {
  state: (): AifreedomAuthState => ({
    token: uni.getStorageSync("aifreedom_token") || "",
    uid: uni.getStorageSync("aifreedom_uid") || "",
    userInfo: null,
  }),
  getters: {
    hasLogin: (state) => !!state.token,
  },
  actions: {
    async login(params: AiLoginParams) {
      const res = await aiLoginIn(params);
      // 使用新的 token 结构
      this.token = res.tokenInfoVO?.accessToken || "";
      this.uid = res.uid || "";
      uni.setStorageSync("aifreedom_token", this.token);
      uni.setStorageSync("aifreedom_uid", this.uid);
      await this.fetchUserInfo();
      return res;
    },
    async fetchUserInfo() {
      const info = await aiUserInfoQuery();
      this.userInfo = info;
      return info;
    },
    async logout() {
      try {
        await aiLogout();
      } finally {
        this.token = "";
        this.uid = "";
        this.userInfo = null;
        uni.removeStorageSync("aifreedom_token");
        uni.removeStorageSync("aifreedom_uid");
      }
    },
    // 设置 token（用于外部登录后保存）
    setToken(token: string, uid?: string) {
      this.token = token;
      if (uid) {
        this.uid = uid;
        uni.setStorageSync("aifreedom_uid", uid);
      }
      uni.setStorageSync("aifreedom_token", token);
    },
    // 设置用户信息
    setUserInfo(userInfo: Partial<AiUserInfoResp>) {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...userInfo };
      } else {
        this.userInfo = userInfo as AiUserInfoResp;
      }
    },
  },
});
