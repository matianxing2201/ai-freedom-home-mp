export function useLogic() {
  const title = ref('图片详情')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
