<template>
  <view class="custom-tabbar">
    <view 
      v-for="(item, index) in tabbarList" 
      :key="index" 
      class="tabbar-item" 
      @click="switchTab(item.pagePath)"
    >
      <image :src="currentPath === item.pagePath ? item.selectedIconPath : item.iconPath" class="tabbar-icon"></image>
      <text :class="['tabbar-text', currentPath === item.pagePath ? 'active-text' : '']">{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'LawyerTabbar',
  data() {
    return {
      currentPath: '',
      tabbarList: [
        {
          pagePath: '/pages/lawyer/index/dashboard/index',
          text: '首页',
          iconPath: '/static/tabbar/lawyer-home.png',
          selectedIconPath: '/static/tabbar/lawyer-home-active.png'
        },
        {
          pagePath: '/pages/lawyer/index/consultation-info/index',
          text: '消息',
          iconPath: '/static/tabbar/cases.png',
          selectedIconPath: '/static/tabbar/cases-active.png'
        },
        {
          pagePath: '/pages/lawyer/index/profile/index',
          text: '我的',
          iconPath: '/static/tabbar/consultation.png',
          selectedIconPath: '/static/tabbar/consultation-active.png'
        }
      ]
    }
  },
  created() {
    // 获取当前页面路径
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    this.currentPath = '/' + currentPage.route;
  },
  methods: {
    switchTab(path) {
      if (this.currentPath === path) return;
      uni.navigateTo({
        url: path
      });
      this.currentPath = path;
    }
  }
}
</script>

<style scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #FFFFFF;
  display: flex;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tabbar-icon {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 6rpx;
}

.tabbar-text {
  font-size: 24rpx;
  color: #999999;
}

.active-text {
  color: #4893FF;
}
</style>