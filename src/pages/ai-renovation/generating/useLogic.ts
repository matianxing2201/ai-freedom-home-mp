export function useLogic() {
  const title = ref('生成中')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
