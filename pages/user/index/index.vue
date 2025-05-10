<template>
  <view class="container">
    <!-- 页面内容 -->
    
    <!-- 引入用户 TabBar -->
    <user-tabbar></user-tabbar>
  </view>
</template>

<script>
import UserTabbar from '@/components/tabbar/user-tabbar/user-tabbar.vue'

export default {
  components: {
    UserTabbar
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.container {
  min-height: 100vh;
  padding-bottom: 100rpx; /* 为 TabBar 预留空间 */
  background-image: $bg-image;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>