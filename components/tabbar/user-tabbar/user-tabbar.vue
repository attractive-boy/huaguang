<template>
  <view class="custom-tabbar">
    <uv-tabbar :value="current" @change="onChange">
      <uv-tabbar-item text="首页">
        <template v-slot:active-icon>
          <image class="icon" :src="`${staticBaseUrl}/home-active.png`"></image>
        </template>
        <template v-slot:inactive-icon>
          <image class="icon" :src="`${staticBaseUrl}/home.png`"></image>
        </template>
      </uv-tabbar-item>
      <uv-tabbar-item text="青年帮扶基金">
        <template v-slot:active-icon>
          <image class="icon" :src="`${staticBaseUrl}/fund-active.png`"></image>
        </template>
        <template v-slot:inactive-icon>
          <image class="icon" :src="`${staticBaseUrl}/fund.png`"></image>
        </template>
      </uv-tabbar-item>
      <uv-tabbar-item text="信息">
        <template v-slot:active-icon>
          <image class="icon" :src="`${staticBaseUrl}/info-active.png`"></image>
        </template>
        <template v-slot:inactive-icon>
          <image class="icon" :src="`${staticBaseUrl}/info.png`"></image>
        </template>
      </uv-tabbar-item>
      <uv-tabbar-item text="我的">
        <template v-slot:active-icon>
          <image class="icon" :src="`${staticBaseUrl}/profile-active.png`"></image>
        </template>
        <template v-slot:inactive-icon>
          <image class="icon" :src="`${staticBaseUrl}/profile.png`"></image>
        </template>
      </uv-tabbar-item>
    </uv-tabbar>
  </view>
</template>

<script>
import { staticBaseUrl } from '@/config/index'

export default {
  name: 'UserTabbar',
  data() {
    return {
      current: 0,
      staticBaseUrl
    }
  },
  created() {
    // 根据当前路由设置 current 值
    const routes = [
      '/pages/user/index/index',
      '/pages/user/fund/index',
      '/pages/user/info/index',
      '/pages/user/profile/index'
    ]
    const currentRoute = getCurrentPages()[getCurrentPages().length - 1].route
    this.current = routes.findIndex(route => route.includes(currentRoute))
  },
  methods: {
    onChange(index) {
      this.current = index
      const routes = [
        '/pages/user/index/index',
        '/pages/user/fund/index',
        '/pages/user/info/index',
        '/pages/user/profile/index'
      ]
      uni.reLaunch({
        url: routes[index]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tabbar {
  width: 100%;
  
  .icon {
    width: 48rpx;
    height: 48rpx;
  }
}
</style>

