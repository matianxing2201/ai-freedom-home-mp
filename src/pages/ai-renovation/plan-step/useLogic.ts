export function useLogic() {
  const title = ref('选择方案')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
