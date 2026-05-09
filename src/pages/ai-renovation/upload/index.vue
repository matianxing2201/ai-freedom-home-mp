<script setup lang="ts">
import { useUploadLogic } from './useUploadLogic'

defineOptions({ name: 'AiRenovationUpload' })

definePage({
  style: {
    navigationBarTitleText: '上传图片',
    navigationStyle: 'default',
  },
})

const {
  taskTitle,
  imagePath,
  roomType,
  roomOptions,
  canNext,
  chooseImage,
  goNext,
} = useUploadLogic()
</script>

<template>
  <view class="upload-page">
    <view class="head">{{ taskTitle }}</view>

    <view class="image-box" @tap="chooseImage">
      <image v-if="imagePath" :src="imagePath" mode="aspectFill" class="preview" />
      <view v-else class="empty">上传一张房间照片</view>
    </view>

    <view class="section-title">请选择上传照片所在空间</view>
    <view class="room-list">
      <view
        v-for="item in roomOptions"
        :key="item.value"
        class="room-item"
        :class="{ active: roomType === item.value }"
        @tap="roomType = item.value"
      >
        {{ item.label }}
      </view>
    </view>

    <button class="next-btn" :disabled="!canNext" @tap="goNext">下一步</button>
  </view>
</template>

<style lang="scss" scoped>
.upload-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding: 24rpx;
}

.head {
  font-size: 40rpx;
  font-weight: 700;
  color: #1f2329;
  margin-bottom: 24rpx;
}

.image-box {
  height: 420rpx;
  border-radius: 16rpx;
  background: #ffffff;
  border: 2rpx dashed #d5dae0;
  overflow: hidden;
}

.preview {
  width: 100%;
  height: 100%;
}

.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8a929d;
  font-size: 28rpx;
}

.section-title {
  margin: 28rpx 0 18rpx;
  font-size: 30rpx;
  color: #333;
}

.room-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
}

.room-item {
  padding: 14rpx 24rpx;
  border-radius: 999rpx;
  background: #ffffff;
  color: #4d5660;
  font-size: 24rpx;
}

.room-item.active {
  background: #00ca4c;
  color: #fff;
}

.next-btn {
  margin-top: 40rpx;
  border-radius: 999rpx;
  background: #00ca4c;
  color: #fff;
  font-size: 30rpx;
}

.next-btn[disabled] {
  opacity: 0.45;
}
</style>
