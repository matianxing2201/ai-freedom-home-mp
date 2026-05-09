<script setup lang="ts">
interface Props {
  poster: string
  enableVideo: boolean
  videoUrls: string[]
  title: string
  subtitle: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  settingTap: []
  tryTap: []
  indexChange: [index: number]
  error: []
}>()

const slotUrls = ref(['', ''])
const slotReady = ref([false, false])
const activeSlot = ref(0)
const currentIndex = ref(0)
const pendingSwitch = ref<{ slot: number, index: number } | null>(null)
const instance = getCurrentInstance()

function getVideoContext(slot: number) {
  return uni.createVideoContext(`hero-video-${slot}`, instance?.proxy)
}

function playSlot(slot: number) {
  nextTick(() => {
    getVideoContext(slot).play()
  })
}

function pauseSlot(slot: number) {
  getVideoContext(slot).pause()
}

function inactiveSlot() {
  return activeSlot.value === 0 ? 1 : 0
}

function setSlot(slot: number, url: string) {
  if (slotUrls.value[slot] !== url) {
    slotUrls.value[slot] = url
    slotReady.value[slot] = false
  }
}

function preloadIntoSlot(slot: number, urlIndex: number) {
  const url = props.videoUrls[urlIndex]
  if (url)
    setSlot(slot, url)
}

watch(() => props.videoUrls, (urls) => {
  if (!urls.length)
    return
  currentIndex.value = 0
  activeSlot.value = 0
  pendingSwitch.value = null
  setSlot(0, urls[0])
  if (urls.length > 1)
    setSlot(1, urls[1])
}, { immediate: true })

function applySwitch(slot: number, index: number) {
  const oldActiveSlot = activeSlot.value
  pauseSlot(oldActiveSlot)
  activeSlot.value = slot
  currentIndex.value = index
  pendingSwitch.value = null
  emit('indexChange', index)
  playSlot(slot)

  const nextNextIdx = (index + 1) % props.videoUrls.length
  preloadIntoSlot(oldActiveSlot, nextNextIdx)
}

function requestSkipToNext() {
  if (props.videoUrls.length <= 1)
    return

  const nextIdx = (currentIndex.value + 1) % props.videoUrls.length
  const targetSlot = inactiveSlot()

  preloadIntoSlot(targetSlot, nextIdx)

  if (slotReady.value[targetSlot]) {
    applySwitch(targetSlot, nextIdx)
    return
  }

  pendingSwitch.value = { slot: targetSlot, index: nextIdx }
}

function onSlotLoaded(slot: number) {
  slotReady.value[slot] = true
  if (pendingSwitch.value?.slot === slot)
    applySwitch(slot, pendingSwitch.value.index)
}

function onSlotEnded(slot: number) {
  if (slot !== activeSlot.value)
    return
  requestSkipToNext()
}

function onSlotError(slot: number) {
  if (slot !== activeSlot.value)
    return
  emit('error')
  requestSkipToNext()
}
</script>

<template>
  <view class="hero">
    <image class="hero-cover" :src="poster" mode="aspectFill" />

    <template v-if="enableVideo && slotUrls[0]">
      <video
        v-if="slotUrls[0]"
        id="hero-video-0"
        class="hero-video"
        :class="{
          'is-visible': activeSlot === 0 && slotReady[0],
        }"
        :src="slotUrls[0]"
        :autoplay="activeSlot === 0"
        :loop="videoUrls.length <= 1"
        :muted="true"
        :controls="false"
        playsinline
        :show-center-play-btn="false"
        :show-fullscreen-btn="false"
        :show-play-btn="false"
        :enable-progress-gesture="false"
        object-fit="cover"
        @loadedmetadata="onSlotLoaded(0)"
        @ended="onSlotEnded(0)"
        @error="onSlotError(0)"
      />
      <video
        v-if="slotUrls[1]"
        id="hero-video-1"
        class="hero-video"
        :class="{
          'is-visible': activeSlot === 1 && slotReady[1],
        }"
        :src="slotUrls[1]"
        :autoplay="activeSlot === 1"
        :loop="videoUrls.length <= 1"
        :muted="true"
        :controls="false"
        playsinline
        :show-center-play-btn="false"
        :show-fullscreen-btn="false"
        :show-play-btn="false"
        :enable-progress-gesture="false"
        object-fit="cover"
        @loadedmetadata="onSlotLoaded(1)"
        @ended="onSlotEnded(1)"
        @error="onSlotError(1)"
      />
    </template>

    <view class="hero-top">
      <view class="setting-btn" @tap="emit('settingTap')">
        <image class="setting-icon" src="/static/aifreedom-assets/images/aifreedom/free_icon_set.png" mode="aspectFit" />
        <text class="setting-text">设置</text>
      </view>
    </view>

    <view class="hero-bottom">
      <image class="hero-title-bg" src="/static/aifreedom-assets/images/aifreedom/free_title_bg.png" mode="scaleToFill" />
      <view class="hero-text">
        <text class="hero-title">{{ title }}</text>
        <text class="hero-subtitle">{{ subtitle }}</text>
        <button class="hero-try" @tap="emit('tryTap')">
          <image class="hero-try-icon" src="/static/aifreedom-assets/images/aifreedom/free_mfb_icon.png" mode="aspectFit" />
          去试试
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 1180rpx;
  overflow: hidden;
}

.hero-cover,
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-video {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-video.is-visible {
  opacity: 1;
}

.hero-top {
  position: absolute;
  top: calc(20rpx + env(safe-area-inset-top));
  right: 30rpx;
  z-index: 3;
}

.setting-btn {
  height: 64rpx;
  padding: 0 20rpx;
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.setting-icon {
  width: 28rpx;
  height: 28rpx;
}

.setting-text {
  color: #202020;
  font-size: 24rpx;
  font-weight: 400;
}

.hero-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1rpx;
  height: 330rpx;
}

.hero-title-bg {
  width: 100%;
  height: 100%;
  opacity: 0.92;
}

.hero-text {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 46rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-title {
  color: #fff;
  font-size: 52rpx;
  font-weight: 600;
  line-height: 72rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  margin-top: 8rpx;
  color: rgba(255, 255, 255, 0.9);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 40rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.hero-try {
  margin-top: 24rpx;
  height: 72rpx;
  padding: 0 32rpx;
  border-radius: 36rpx;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
  border: none;
}

.hero-try::after {
  display: none;
}

.hero-try-icon {
  width: 32rpx;
  height: 32rpx;
}
</style>
