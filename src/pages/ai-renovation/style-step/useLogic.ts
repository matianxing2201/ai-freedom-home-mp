export function useLogic() {
  const title = ref('选择风格')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
