import { aiIndexMaterialList } from '@/api/aifreedom'

interface FeatureItem {
  key: number
  title: string
  subtitle: string
  image: string
  goImage: string
}

const TITLE_MAP = [
  '空房设计',
  '现房改造',
  '软装换搭',
]

const SUBTITLE_MAP = [
  '一键生成效果图',
  '定制我的百变风格',
  '精选家具随心换',
]

function normalizeMediaUrl(url: string) {
  if (!url)
    return ''
  if (url.startsWith('http'))
    return url
  if (url.startsWith('/'))
    return `${import.meta.env.VITE_OSS_BASEURL}${url}`
  return `${import.meta.env.VITE_OSS_BASEURL}/${url}`
}

export function useHomeLogic() {
  const poster = ref('/static/aifreedom-assets/images/aifreedom/free_video_cover.png')

  const videoUrls = ref<string[]>([])
  const currentMediaIndex = ref(0)
  const isLoadingVideos = ref(false)
  const enableVideo = ref(false)

  const title = computed(() => TITLE_MAP[currentMediaIndex.value] || '房屋设计')
  const subtitle = computed(() => SUBTITLE_MAP[currentMediaIndex.value] || '定制百变风格  一键生成效果图')

  const leftCard = computed<FeatureItem>(() => ({
    key: 0,
    title: '空房设计',
    subtitle: '一键生成效果图',
    image: '/static/aifreedom-assets/images/aifreedom/free_kfsj.png',
    goImage: '/static/aifreedom-assets/images/aifreedom/free_kfsj_go.png',
  }))

  const rightCards = computed<FeatureItem[]>(() => [
    {
      key: 1,
      title: '现房改造',
      subtitle: '定制我的百变风格',
      image: '/static/aifreedom-assets/images/aifreedom/free_xfgz.png',
      goImage: '/static/aifreedom-assets/images/aifreedom/free_xfgz_go.png',
    },
    {
      key: 2,
      title: '软装换搭',
      subtitle: '精选家具随心换',
      image: '/static/aifreedom-assets/images/aifreedom/free_rzhd.png',
      goImage: '/static/aifreedom-assets/images/aifreedom/free_rzhd_go.png',
    },
  ])

  const openTask = (taskType: number) => {
    uni.navigateTo({
      url: `/pages/ai-renovation/upload/index?taskType=${taskType}`,
    })
  }

  const tryNow = () => {
    openTask(currentMediaIndex.value)
  }

  const openSettings = () => {
    uni.navigateTo({
      url: '/pages/aifreedom/settings/index',
    })
  }

  const onHeroIndexChange = (index: number) => {
    if (!videoUrls.value.length)
      return
    currentMediaIndex.value = index % videoUrls.value.length
  }

  const onVideoError = () => {
    // 子组件内部会自动切下一个视频，这里只做日志兜底。
    console.warn('首页视频播放异常，已尝试自动切换')
  }

  const loadVideoUrls = async () => {
    if (isLoadingVideos.value)
      return

    isLoadingVideos.value = true
    try {
      const data = await aiIndexMaterialList()
      const urls = [
        normalizeMediaUrl(data.emptyRoomDesignUrl),
        normalizeMediaUrl(data.existingRoomDesignUrl),
        normalizeMediaUrl(data.softFurnishingStyingUrl),
      ].filter(Boolean)
      if (urls.length) {
        videoUrls.value = urls
        enableVideo.value = true
      }
    }
    catch (error) {
      console.error('首页视频素材获取失败', error)
    }
    finally {
      isLoadingVideos.value = false
    }
  }

  onLoad(() => {
    loadVideoUrls()
  })

  return {
    poster,
    videoUrls,
    title,
    subtitle,
    enableVideo,
    leftCard,
    rightCards,
    openTask,
    tryNow,
    openSettings,
    onHeroIndexChange,
    onVideoError,
  }
}
