export function useLogic() {
  const title = ref('帮助反馈')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
