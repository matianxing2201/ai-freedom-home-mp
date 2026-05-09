const TASK_MAP = {
  0: '空房设计',
  1: '现房改造',
  2: '软装换搭',
}

const ROOM_OPTIONS = [
  { label: '客厅', value: 1 },
  { label: '卧室', value: 2 },
  { label: '卫生间', value: 3 },
  { label: '厨房', value: 4 },
  { label: '儿童房', value: 5 },
  { label: '书房', value: 6 },
  { label: '餐厅', value: 7 },
]

export function useUploadLogic() {
  const taskType = ref(0)
  const taskTitle = computed(() => TASK_MAP[taskType.value as keyof typeof TASK_MAP] || '空房设计')

  const imagePath = ref('')
  const roomType = ref<number | null>(null)

  const canNext = computed(() => !!imagePath.value && !!roomType.value)

  const chooseImage = async () => {
    const res = await uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    })

    imagePath.value = res.tempFilePaths[0] || ''
  }

  const goNext = () => {
    if (!canNext.value) {
      uni.showToast({ title: '请先上传图片并选择空间', icon: 'none' })
      return
    }

    const query = `taskType=${taskType.value}&roomType=${roomType.value}`
    if (taskType.value === 2) {
      uni.navigateTo({ url: `/pages/ai-renovation/crop/index?${query}` })
      return
    }
    uni.navigateTo({ url: `/pages/ai-renovation/style-step/index?${query}` })
  }

  onLoad((options) => {
    const value = Number(options?.taskType || 0)
    taskType.value = Number.isNaN(value) ? 0 : value
  })

  return {
    taskType,
    taskTitle,
    imagePath,
    roomType,
    roomOptions: ROOM_OPTIONS,
    canNext,
    chooseImage,
    goNext,
  }
}
