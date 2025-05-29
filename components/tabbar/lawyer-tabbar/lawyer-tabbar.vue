<template>
  <view class="custom-tabbar">
    <uv-tabbar :value="current" @change="onChange">
      <uv-tabbar-item text="首页">
        <template v-slot:active-icon>
          <uv-icon name="home" color="#4893FF" size="48rpx"></uv-icon>
        </template>
        <template v-slot:inactive-icon>
          <uv-icon name="home" color="#999999" size="48rpx"></uv-icon>
        </template>
      </uv-tabbar-item>
      <uv-tabbar-item text="消息">
        <template v-slot:active-icon>
          <uv-icon name="chat" color="#4893FF" size="48rpx"></uv-icon>
        </template>
        <template v-slot:inactive-icon>
          <uv-icon name="chat" color="#999999" size="48rpx"></uv-icon>
        </template>
      </uv-tabbar-item>
      <uv-tabbar-item text="我的">
        <template v-slot:active-icon>
          <uv-icon name="account" color="#4893FF" size="48rpx"></uv-icon>
        </template>
        <template v-slot:inactive-icon>
          <uv-icon name="account" color="#999999" size="48rpx"></uv-icon>
        </template>
      </uv-tabbar-item>
    </uv-tabbar>
  </view>
</template>

<script>
export default {
  name: 'LawyerTabbar',
  data() {
    return {
      current: 0
    }
  },
  created() {
    // 根据当前路由设置 current 值
    const routes = [
      '/pages/lawyer/index/dashboard/index',
      '/pages/lawyer/index/consultation-message/index', 
      '/pages/lawyer/index/profile/index'
    ]
    
    // 获取当前页面完整路径
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const currentRoute = '/' + currentPage.route
    
    console.log('当前路由:', currentRoute)
    console.log('路由数组:', routes)
    
    // 使用精确匹配
    this.current = routes.findIndex(route => route === currentRoute)
    console.log('匹配结果索引:', this.current)
    
    if (this.current === -1) {
      this.current = 0 // 默认选中首页
      console.log('未找到匹配路由，默认选中首页')
    }
  },
  methods: {
    onChange(index) {
      this.current = index
      console.log(index);
      
      const routes = [
        '/pages/lawyer/index/dashboard/index',
        '/pages/lawyer/index/consultation-message/index',
        '/pages/lawyer/index/profile/index'
      ]
      uni.reLaunch({
        url: routes[index]
      })
    }
  }
}
</script>

<style scoped>
.custom-tabbar {
  width: 100%;
}
</style>