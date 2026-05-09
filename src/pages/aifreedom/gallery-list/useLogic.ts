export function useLogic() {
  const title = ref('画廊')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
