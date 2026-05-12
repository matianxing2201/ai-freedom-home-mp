<script setup lang="ts">
import UserAgreement from '@/components/UserAgreement.vue'
import { useLoginLogic } from './useLoginLogic'

defineOptions({ name: 'AifreedomLogin' })

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
})

const {
  account,
  code,
  accountType,
  loading,
  agreed,
  canSubmit,
  canSendCode,
  sendCodeText,
  switchAccountType,
  sendCode,
  submit,
  toggleAgree,
  openUserProtocol,
  openPrivacyProtocol,
} = useLoginLogic()
</script>

<template>
  <view class="login-page">
    <!-- 顶部背景 -->
    <image class="login-bg" src="/static/aifreedom-assets/images/login/login_top_bg.jpg" mode="aspectFill" />

    <view class="login-content">
      <!-- 标题区域 -->
      <view class="login-header">
        <text class="hello">
          您好！
        </text>
        <text class="welcome">
          欢迎使用,
        </text>
        <text class="app-name">
          AI自由家
        </text>
      </view>

      <!-- 登录表单卡片 -->
      <view class="login-card">
        <!-- 账号类型切换 -->
        <view class="account-type-tabs">
          <view class="tab" :class="{ active: accountType === 'mobile' }" @tap="switchAccountType('mobile')">
            手机号登录
          </view>
          <view class="tab" :class="{ active: accountType === 'email' }" @tap="switchAccountType('email')">
            邮箱登录
          </view>
        </view>

        <!-- 手机号登录 -->
        <template v-if="accountType === 'mobile'">
          <!-- 手机号输入 -->
          <view class="input-box">
            <input
v-model="account" class="login-input" type="number" placeholder="请输入手机号"
              placeholder-class="input-placeholder"
>
          </view>

          <!-- 验证码输入 -->
          <view class="input-box">
            <input
v-model="code" class="login-input" type="number" placeholder="验证码"
              placeholder-class="input-placeholder"
>
            <button class="code-btn" :disabled="!canSendCode" @tap="sendCode">
              {{ sendCodeText }}
            </button>
          </view>
        </template>

        <!-- 邮箱登录 -->
        <template v-else>
          <!-- 邮箱输入 -->
          <view class="input-box">
            <input v-model="account" class="login-input" placeholder="邮箱号" placeholder-class="input-placeholder">
          </view>

          <!-- 验证码输入 -->
          <view class="input-box">
            <input
v-model="code" class="login-input" type="number" placeholder="验证码"
              placeholder-class="input-placeholder"
>
            <button class="code-btn" :disabled="!canSendCode" @tap="sendCode">
              {{ sendCodeText }}
            </button>
          </view>
        </template>

        <!-- 登录按钮 -->
        <button class="login-btn" :disabled="!canSubmit || loading" @tap="submit">
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <!-- 用户协议 -->
        <UserAgreement
:agreed="agreed" @toggle="toggleAgree" @open-user-protocol="openUserProtocol"
          @open-privacy-protocol="openPrivacyProtocol"
/>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55vh;
  // background 渐进增强，图片加载失败时使用纯色
  background: #f0ebe3;
}

.login-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.login-header {
  padding: 120rpx 48rpx 40rpx;
  height: 800rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  box-sizing: border-box;
}

.hello {
  font-size: 72rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8rpx;
}

.welcome {
  font-size: 32rpx;
  color: #666666;
  margin-bottom: 4rpx;
}

.app-name {
  font-size: 32rpx;
  color: #666666;
}

.login-card {
  flex: 1;
  background: #ffffff;
  border-radius: 48rpx 48rpx 0 0;
  padding: 48rpx 40rpx;
  margin-top: auto;
}

.account-type-tabs {
  display: flex;
  justify-content: center;
  gap: 40rpx;
  margin-bottom: 48rpx;
  background: #f5f5f5;
  border-radius: 40rpx;
  padding: 8rpx;
}

.tab {
  font-size: 30rpx;
  color: #999999;
  padding: 20rpx 48rpx;
  border-radius: 32rpx;
  transition: all 0.3s ease;
  flex: 1;
  text-align: center;
}

.tab.active {
  color: #333333;
  background: #ffffff;
  font-weight: 500;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.input-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 16rpx;
  padding: 24rpx 32rpx;
  margin-bottom: 24rpx;
}

.login-input {
  flex: 1;
  font-size: 30rpx;
  color: #333333;
}

:deep(.input-placeholder) {
  color: #999999;
  font-size: 30rpx;
}

.code-btn {
  font-size: 28rpx;
  color: #4cd964;
  background: transparent;
  border: none;
  padding: 0;
  margin-left: 16rpx;
  white-space: nowrap;
}

.code-btn::after {
  border: none;
}

.code-btn[disabled] {
  color: #cccccc;
}

.login-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background: #4cd964;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 48rpx;
  border: none;
  margin-top: 48rpx;
  margin-bottom: 32rpx;
}

.login-btn::after {
  border: none;
}

.login-btn[disabled] {
  background: #a8e6b8;
  color: #ffffff;
}
</style>
