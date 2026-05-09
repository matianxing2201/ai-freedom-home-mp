export function useLogic() {
  const title = ref('个人资料')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
