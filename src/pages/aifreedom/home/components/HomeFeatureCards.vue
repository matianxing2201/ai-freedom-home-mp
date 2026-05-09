<script setup lang="ts">
interface FeatureItem {
  key: number
  title: string
  subtitle: string
  image: string
  goImage: string
}

interface Props {
  leftCard: FeatureItem
  rightCards: FeatureItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  open: [taskType: number]
}>()
</script>

<template>
  <view class="cards-wrap">
    <view class="left-card" @tap="emit('open', leftCard.key)">
      <image class="card-bg" :src="leftCard.image" mode="aspectFill" />
      <view class="card-content">
        <text class="card-title">{{ leftCard.title }}</text>
        <text class="card-subtitle">{{ leftCard.subtitle }}</text>
        <image class="card-go" :src="leftCard.goImage" mode="aspectFit" />
      </view>
    </view>

    <view class="right-col">
      <view v-for="item in rightCards" :key="item.key" class="right-card" @tap="emit('open', item.key)">
        <image class="card-bg" :src="item.image" mode="aspectFill" />
        <view class="card-content card-content--small">
          <text class="card-title card-title--small">{{ item.title }}</text>
          <text class="card-subtitle card-subtitle--small">{{ item.subtitle }}</text>
          <image class="card-go" :src="item.goImage" mode="aspectFit" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.cards-wrap {
  background: #f2f3f5;
  padding: 18rpx 22rpx calc(env(safe-area-inset-bottom) + 28rpx);
  margin-top: -6rpx;
  border-radius: 22rpx 22rpx 0 0;
  display: flex;
  gap: 12rpx;
}

.left-card {
  flex: 1;
  height: 400rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
}

.right-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.right-card {
  height: 190rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
}

.card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
}

.card-content--small {
  padding: 16rpx 24rpx;
}

.card-title {
  color: #212121;
  font-size: 32rpx;
  font-weight: 600;
}

.card-title--small {
  font-size: 28rpx;
}

.card-subtitle {
  margin-top: 10rpx;
  color: #4f5965;
  font-size: 24rpx;
}

.card-subtitle--small {
  margin-top: 4rpx;
  font-size: 20rpx;
}

.card-go {
  margin-top: auto;
  width: 84rpx;
  height: 100rpx;
}
</style>
