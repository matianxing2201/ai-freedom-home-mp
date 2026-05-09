export function useLogic() {
  const title = ref('国家码选择')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
