export function useLogic() {
  const title = ref('账号设置')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
