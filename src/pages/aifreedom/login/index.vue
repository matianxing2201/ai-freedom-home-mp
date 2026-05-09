<script setup lang="ts">
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
  password,
  accountType,
  loginType,
  loading,
  canSubmit,
  canSendCode,
  sendCodeText,
  switchAccountType,
  switchLoginType,
  sendCode,
  submit,
} = useLoginLogic()
</script>

<template>
  <view class="login-page">
    <image class="login-bg" src="/static/aifreedom-assets/images/login/login_top_bg.png" mode="aspectFill" />

    <view class="login-form-wrap">
      <view class="login-tabs">
        <view class="tab" :class="{ active: accountType === 'mobile' }" @tap="switchAccountType('mobile')">
          手机号
        </view>
        <view class="tab" :class="{ active: accountType === 'email' }" @tap="switchAccountType('email')">
          邮箱
        </view>
      </view>

      <input v-model="account" class="login-input" :placeholder="accountType === 'mobile' ? '请输入手机号' : '请输入邮箱'" />

      <view class="login-tabs login-tabs--mode">
        <view class="tab" :class="{ active: loginType === 'code' }" @tap="switchLoginType('code')">
          验证码登录
        </view>
        <view class="tab" :class="{ active: loginType === 'password' }" @tap="switchLoginType('password')">
          密码登录
        </view>
      </view>

      <template v-if="loginType === 'code'">
        <view class="code-row">
          <input v-model="code" class="login-input" placeholder="请输入验证码" />
          <button class="code-btn" :disabled="!canSendCode" @tap="sendCode">
            {{ sendCodeText }}
          </button>
        </view>
      </template>
      <template v-else>
        <input v-model="password" password class="login-input" placeholder="请输入密码" />
      </template>

      <button class="submit-btn" :disabled="!canSubmit || loading" @tap="submit">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  background: #1f3a26;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.login-form-wrap {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  bottom: 0;
  z-index: 2;
  padding: 20rpx 24rpx calc(24rpx + env(safe-area-inset-bottom));
  border-radius: 24rpx 24rpx 0 0;
  background: rgba(245, 246, 247, 0.94);
  backdrop-filter: blur(6rpx);
}

.login-tabs {
  display: flex;
  margin-bottom: 16rpx;
  gap: 12rpx;
}

.login-tabs--mode {
  margin-top: 6rpx;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 14rpx 0;
  border-radius: 12rpx;
  background: #e7e7e9;
  color: #64666a;
  font-size: 34rpx;
  line-height: 1.2;
  font-weight: 600;
}

.tab.active {
  background: #cfe9dc;
  color: #00b24f;
}

.login-input {
  width: 100%;
  box-sizing: border-box;
  background: #e9eaec;
  border-radius: 12rpx;
  height: 82rpx;
  padding: 0 24rpx;
  margin-bottom: 16rpx;
  font-size: 40rpx;
  color: #3a3d42;
}

.code-row {
  display: flex;
  gap: 12rpx;
}

.code-row .login-input {
  flex: 1;
  margin-bottom: 0;
}

.code-btn {
  width: 160rpx;
  border-radius: 12rpx;
  height: 82rpx;
  line-height: 82rpx;
  padding: 0;
  background: #cfe9dc;
  color: #00b24f;
  font-size: 40rpx;
  font-weight: 600;
}

.code-btn[disabled] {
  opacity: 0.65;
}

.submit-btn {
  margin-top: 18rpx;
  border-radius: 999rpx;
  height: 84rpx;
  line-height: 84rpx;
  background: #00ca4c;
  color: #fff;
  font-size: 42rpx;
  font-weight: 600;
}

.submit-btn[disabled] {
  background: #dbdcde;
  color: #a4a7ad;
}

button::after {
  border: none;
}
</style>
