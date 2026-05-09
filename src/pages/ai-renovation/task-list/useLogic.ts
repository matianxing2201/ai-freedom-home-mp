export function useLogic() {
  const title = ref('AI任务列表')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
