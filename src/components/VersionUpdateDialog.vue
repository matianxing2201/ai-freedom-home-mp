<script setup lang="ts">
export interface VersionUpdateInfo {
  id?: number
  type: number // 1-Android, 2-iOS
  downloadType: number // 1-下载apk, 2-打开商店
  version: string
  link: string
  enforce: number // 1-强制更新, 0-非强制
  content: string
  createTime?: string
  updateTime?: string
}

interface Props {
  visible: boolean
  updateInfo: VersionUpdateInfo | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const isForceUpdate = computed(() => props.updateInfo?.enforce === 1)

const updateContent = computed(() => {
  if (!props.updateInfo?.content)
    return ''
  // 尝试解析 JSON 格式内容
  try {
    const contentObj = JSON.parse(props.updateInfo.content)
    return contentObj.zh || contentObj.en || props.updateInfo.content
  }
  catch {
    return props.updateInfo.content
  }
})

function handleClose() {
  if (isForceUpdate.value)
    return
  emit('close')
}

function handleConfirm() {
  if (!props.updateInfo?.link)
    return

  // downloadType: 1-下载apk, 2-打开商店
  if (props.updateInfo.downloadType === 1) {
    // 下载 APK
    // #ifdef APP-PLUS
    plus.runtime.openURL(props.updateInfo.link)
    // #endif
    // #ifndef APP-PLUS
    uni.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(props.updateInfo.link)}&title=下载更新`,
    })
    // #endif
  }
  else {
    // 打开应用商店
    // #ifdef APP-PLUS
    plus.runtime.openURL(props.updateInfo.link)
    // #endif
    // #ifndef APP-PLUS
    uni.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(props.updateInfo.link)}&title=应用商店`,
    })
    // #endif
  }

  emit('confirm')
}
</script>

<template>
  <view v-if="visible" class="version-update-mask" @tap="handleClose">
    <view class="version-update-dialog" @tap.stop>
      <!-- 关闭按钮（非强制更新显示） -->
      <view v-if="!isForceUpdate" class="close-btn" @tap="handleClose">
        <text class="close-icon">×</text>
      </view>

      <!-- 标题区域 -->
      <view class="dialog-header">
        <view class="update-icon-wrap">
          <text class="update-icon-text">🔄</text>
        </view>
        <text class="dialog-title">版本更新</text>
        <text class="dialog-subtitle">发现新版本 v{{ updateInfo?.version }}</text>
      </view>

      <!-- 内容区域 -->
      <view class="dialog-body">
        <text class="content-label">更新内容：</text>
        <scroll-view class="content-scroll" scroll-y>
          <text class="content-text">{{ updateContent }}</text>
        </scroll-view>
      </view>

      <!-- 按钮区域 -->
      <view class="dialog-footer">
        <button v-if="!isForceUpdate" class="btn btn-cancel" @tap="handleClose">
          暂不更新
        </button>
        <button class="btn btn-confirm" :class="{ 'btn-full': isForceUpdate }" @tap="handleConfirm">
          立即更新
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.version-update-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.version-update-dialog {
  position: relative;
  width: 560rpx;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 48rpx 40rpx 40rpx;
}

.close-btn {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-icon {
  font-size: 40rpx;
  color: #999999;
  line-height: 1;
}

.dialog-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32rpx;
}

.update-icon-wrap {
  width: 120rpx;
  height: 120rpx;
  background: rgba(194, 152, 110, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.update-icon {
  width: 64rpx;
  height: 64rpx;
}

.update-icon-text {
  font-size: 48rpx;
  line-height: 1;
}

.dialog-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #222222;
  margin-bottom: 12rpx;
}

.dialog-subtitle {
  font-size: 28rpx;
  color: #666666;
}

.dialog-body {
  margin-bottom: 40rpx;
}

.content-label {
  display: block;
  font-size: 28rpx;
  font-weight: 500;
  color: #222222;
  margin-bottom: 16rpx;
}

.content-scroll {
  max-height: 300rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  padding: 20rpx;
}

.content-text {
  font-size: 26rpx;
  color: #666666;
  line-height: 1.6;
  white-space: pre-wrap;
}

.dialog-footer {
  display: flex;
  gap: 24rpx;
}

.btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  font-size: 30rpx;
  font-weight: 500;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn::after {
  border: none;
}

.btn-cancel {
  background: #f2f3f5;
  color: #666666;
}

.btn-confirm {
  background: #c2986e;
  color: #ffffff;
}

.btn-full {
  width: 100%;
}
</style>
