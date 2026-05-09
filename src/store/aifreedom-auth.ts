import { defineStore } from 'pinia'
import { aiLoginIn, aiLogout, aiUserInfoQuery } from '@/api/aifreedom'
import type { AiLoginParams, AiUserInfoResp } from '@/api/types/aifreedom'

interface AifreedomAuthState {
  token: string
  refreshToken: string
  userInfo: AiUserInfoResp | null
}

export const useAifreedomAuthStore = defineStore('aifreedom-auth', {
  state: (): AifreedomAuthState => ({
    token: uni.getStorageSync('aifreedom_token') || '',
    refreshToken: uni.getStorageSync('aifreedom_refresh_token') || '',
    userInfo: null,
  }),
  getters: {
    hasLogin: state => !!state.token,
  },
  actions: {
    async login(params: AiLoginParams) {
      const res = await aiLoginIn(params)
      this.token = res.token || ''
      this.refreshToken = res.refreshToken || ''
      uni.setStorageSync('aifreedom_token', this.token)
      uni.setStorageSync('aifreedom_refresh_token', this.refreshToken)
      await this.fetchUserInfo()
      return res
    },
    async fetchUserInfo() {
      const info = await aiUserInfoQuery()
      this.userInfo = info
      return info
    },
    async logout() {
      try {
        await aiLogout()
      }
      finally {
        this.token = ''
        this.refreshToken = ''
        this.userInfo = null
        uni.removeStorageSync('aifreedom_token')
        uni.removeStorageSync('aifreedom_refresh_token')
      }
    },
  },
})
