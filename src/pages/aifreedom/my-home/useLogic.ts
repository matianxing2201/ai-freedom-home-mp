export function useLogic() {
  const title = ref('我的家')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
