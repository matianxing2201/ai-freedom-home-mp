<script setup lang="ts">
import AFPageScaffold from '@/components/aifreedom/AFPageScaffold.vue'
import { useLogic } from './useLogic'

defineOptions({ name: 'AiRenovationTaskList' })

definePage({
  style: {
    navigationBarTitleText: 'AI任务列表',
  },
})

const { title, goBack } = useLogic()
</script>

<template>
  <AFPageScaffold :title="title">
    <view class="placeholder">
      <text class="desc">AI任务列表 页面开发中，当前已创建组件与逻辑分层骨架。</text>
      <button class="back" @tap="goBack">返回</button>
    </view>
  </AFPageScaffold>
</template>

<style lang="scss" scoped>
.placeholder {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 28rpx;
}

.desc {
  font-size: 28rpx;
  color: #3e4650;
  line-height: 1.6;
}

.back {
  margin-top: 24rpx;
  border-radius: 999rpx;
  background: #00ca4c;
  color: #fff;
  font-size: 28rpx;
}
</style>
