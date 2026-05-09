export function useTypeSelectLogic() {
  const typeList = [
    {
      key: 0,
      title: '空房设计',
      image: '/static/aifreedom-assets/images/aifreedom/free_kfsj.png',
    },
    {
      key: 1,
      title: '现房改造',
      image: '/static/aifreedom-assets/images/aifreedom/free_xfgz.png',
    },
    {
      key: 2,
      title: '软装换搭',
      image: '/static/aifreedom-assets/images/aifreedom/free_rzhd.png',
    },
  ]

  const openUpload = (taskType: number) => {
    uni.navigateTo({
      url: `/pages/ai-renovation/upload/index?taskType=${taskType}`,
    })
  }

  return {
    typeList,
    openUpload,
  }
}
