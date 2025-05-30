<template>
  <view class="info-page">
    <view class="content">
      信息
    </view>
    <user-tabbar></user-tabbar>
  </view>
</template>

<script>
import UserTabbar from '@/components/tabbar/user-tabbar/user-tabbar.vue'

export default {
  name: 'InfoPage',
  components: {
    UserTabbar
  }
}
</script>

<style lang="scss" scoped>
.info-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  
  .content {
    padding: 20rpx;
    padding-bottom: 120rpx;
  }
}
</style> 