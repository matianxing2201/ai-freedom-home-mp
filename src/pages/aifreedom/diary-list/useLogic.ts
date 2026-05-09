export function useLogic() {
  const title = ref('装修日记')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
