import { useAifreedomAuthStore } from '@/store'

export function useRequireAuth() {
  const authStore = useAifreedomAuthStore()

  /**
   * 检查登录状态，未登录则跳转登录页
   * @param callback 已登录时的回调函数
   * @param redirectUrl 登录成功后要跳转的目标页面路径
   */
  const checkAuth = (callback?: () => void, redirectUrl?: string): boolean => {
    if (!authStore.token) {
      if (redirectUrl) {
        uni.setStorageSync('aifreedom_login_redirect', redirectUrl)
      }
      uni.navigateTo({
        url: '/pages/aifreedom/login/index',
      })
      return false
    }

    if (callback) {
      callback()
    }
    return true
  }

  /**
   * 检查登录状态并执行跳转
   * @param url 登录成功后要跳转的页面地址
   */
  const navigateIfAuth = (url: string): boolean => {
    return checkAuth(() => {
      uni.navigateTo({ url })
    }, url)
  }

  return {
    checkAuth,
    navigateIfAuth,
    isLogin: () => !!authStore.token,
  }
}
