<script setup lang="ts">
import { useIndexLogic } from './useIndexLogic'

defineOptions({
  name: 'IndexEntry',
})

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'AI自由家',
  },
})

const { splashImage } = useIndexLogic()
</script>

<template>
  <view class="entry-page">
    <image class="entry-bg" :src="splashImage" mode="aspectFill" />
  </view>
</template>

<style lang="scss" scoped>
.entry-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
}

.entry-bg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
