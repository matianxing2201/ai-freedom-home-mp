<script setup lang="ts">
interface Props {
  poster: string
  enableVideo: boolean
  currentVideoUrl: string
  title: string
  subtitle: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  settingTap: []
  tryTap: []
  ended: []
  loaded: []
  error: []
}>()

const videoReady = ref(false)

watch(() => props.currentVideoUrl, () => {
  videoReady.value = false
})

function onVideoLoaded() {
  videoReady.value = true
  emit('loaded')
}
</script>

<template>
  <view class="hero">
    <image class="hero-cover" :src="poster" mode="aspectFill" />

    <video
      v-if="enableVideo && currentVideoUrl"
      class="hero-video"
      :class="{ 'is-visible': videoReady }"
      :src="currentVideoUrl"
      :autoplay="true"
      :muted="true"
      :controls="false"
      :show-center-play-btn="false"
      :show-fullscreen-btn="false"
      :show-play-btn="false"
      :enable-progress-gesture="false"
      object-fit="cover"
      @loadedmetadata="onVideoLoaded"
      @ended="emit('ended')"
      @error="emit('error')"
    />

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
  transition: opacity 0.2s ease;
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
  color: #111;
  font-size: 48rpx;
  font-weight: 600;
}

.hero-subtitle {
  margin-top: 14rpx;
  color: #1e1e1e;
  font-size: 30rpx;
  font-weight: 500;
}

.hero-try {
  margin-top: 32rpx;
  height: 78rpx;
  min-width: 236rpx;
  padding: 0 36rpx;
  border-radius: 48rpx;
  background: #00ca4c;
  color: #faf4e1;
  font-size: 32rpx;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
}

.hero-try::after {
  border: none;
}

.hero-try-icon {
  width: 36rpx;
  height: 36rpx;
}
</style>
