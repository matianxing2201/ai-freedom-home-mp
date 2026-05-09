<script setup lang="ts">
import HomeFeatureCards from './components/HomeFeatureCards.vue'
import HomeHero from './components/HomeHero.vue'
import { useHomeLogic } from './useHomeLogic'

defineOptions({ name: 'AifreedomHome' })

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'AI自由家',
  },
})

const {
  poster,
  title,
  subtitle,
  enableVideo,
  videoUrls,
  leftCard,
  rightCards,
  openTask,
  tryNow,
  openSettings,
  onHeroIndexChange,
  onVideoError,
} = useHomeLogic()
</script>

<template>
  <view class="home-page">
    <HomeHero
      :poster="poster"
      :enable-video="enableVideo"
      :video-urls="videoUrls"
      :title="title"
      :subtitle="subtitle"
      @setting-tap="openSettings"
      @try-tap="tryNow"
      @index-change="onHeroIndexChange"
      @error="onVideoError"
    />

    <HomeFeatureCards :left-card="leftCard" :right-cards="rightCards" @open="openTask" />
  </view>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: #f2f3f5;
}
</style>
