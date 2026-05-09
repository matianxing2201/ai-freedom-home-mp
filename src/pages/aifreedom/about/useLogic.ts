export function useLogic() {
  const title = ref('关于我们')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
