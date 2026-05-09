<script setup lang="ts">
import { useTypeSelectLogic } from './useTypeSelectLogic'

defineOptions({ name: 'AiRenovationTypeSelect' })

definePage({
  style: {
    navigationBarTitleText: 'AI自由家',
  },
})

const { typeList, openUpload } = useTypeSelectLogic()
</script>

<template>
  <view class="type-page">
    <view class="title">请选择AI装修类型</view>
    <view class="type-list">
      <view v-for="item in typeList" :key="item.key" class="type-card" @tap="openUpload(item.key)">
        <image class="card-bg" :src="item.image" mode="aspectFill" />
        <view class="mask" />
        <text class="card-title">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.type-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding: 24rpx;
}

.title {
  font-size: 38rpx;
  font-weight: 700;
  color: #1f2329;
  margin-bottom: 22rpx;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.type-card {
  height: 220rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
}

.card-bg {
  width: 100%;
  height: 100%;
}

.mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.48), transparent);
}

.card-title {
  position: absolute;
  left: 22rpx;
  bottom: 24rpx;
  color: #fff;
  font-size: 34rpx;
  font-weight: 700;
}
</style>
