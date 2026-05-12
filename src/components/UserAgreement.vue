<script setup lang="ts">
interface Props {
  agreed: boolean
}

withDefaults(defineProps<Props>(), {
  agreed: false,
})

const emit = defineEmits<{
  toggle: []
  openUserProtocol: []
  openPrivacyProtocol: []
}>()
</script>

<template>
  <view class="user-agreement">
    <view class="checkbox-wrap" @tap="emit('toggle')">
      <view class="checkbox" :class="{ checked: agreed }">
        <text v-if="agreed" class="check-icon">✓</text>
      </view>
    </view>
    <view class="agreement-text">
      <text class="text">我已阅读并同意</text>
      <text class="link" @tap="emit('openUserProtocol')">《用户手册》</text>
      <text class="text">和</text>
      <text class="link" @tap="emit('openPrivacyProtocol')">《隐私政策》</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.user-agreement {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0;
}

.checkbox-wrap {
  display: flex;
  align-items: center;
  margin-right: 12rpx;
}

.checkbox {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.checkbox.checked {
  background: #4cd964;
  border-color: #4cd964;
}

.check-icon {
  font-size: 20rpx;
  color: #ffffff;
  font-weight: bold;
}

.agreement-text {
  font-size: 26rpx;
  line-height: 1.5;
}

.text {
  color: #666666;
}

.link {
  color: #4cd964;
}
</style>
