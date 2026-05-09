export function useIndexLogic() {
  const splashImage = computed(() => '/static/aifreedom-assets/images/aifreedom/free_top_bg.png')

  const routeToHome = () => {
    // 启动页短停留，避免白屏感。
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/aifreedom/home/index',
      })
    }, 300)
  }

  onLoad(() => {
    routeToHome()
  })

  return {
    splashImage,
  }
}
