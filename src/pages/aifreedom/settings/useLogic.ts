export function useLogic() {
  const title = ref('设置')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
