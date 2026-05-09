export function useLogic() {
  const title = ref('生成结果')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
