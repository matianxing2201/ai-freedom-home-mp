<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <view class="af-shell">
    <view class="af-shell__head">
      <text class="af-shell__title">{{ title }}</text>
      <text v-if="subtitle" class="af-shell__subtitle">{{ subtitle }}</text>
    </view>
    <view class="af-shell__content">
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.af-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #f3f7ea 0%, #c8f0de 100%);
}

.af-shell__head {
  padding: calc(env(safe-area-inset-top) + 24rpx) 32rpx 24rpx;
}

.af-shell__title {
  display: block;
  font-size: 48rpx;
  line-height: 1.2;
  font-weight: 700;
  color: #1f2329;
}

.af-shell__subtitle {
  margin-top: 12rpx;
  display: block;
  font-size: 30rpx;
  color: #404040;
}

.af-shell__content {
  padding: 0 24rpx 40rpx;
}
</style>
