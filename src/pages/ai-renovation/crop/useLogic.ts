export function useLogic() {
  const title = ref('图片裁剪')
  const goBack = () => uni.navigateBack({ delta: 1 })
  return { title, goBack }
}
