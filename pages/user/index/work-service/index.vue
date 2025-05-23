<template>
  <view class="work-service-page">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-content">
        <view class="navbar-left" @click="goBack">
          <uv-icon name="arrow-left" size="20" color="#333"></uv-icon>
        </view>
        <!-- <view class="navbar-title">工作服务</view> -->
        <!-- <view class="navbar-right"></view> -->
      </view>
    </view>

    <!-- 主内容区域 -->
    <view class="main-content">
      <!-- 我要找工作卡片 -->
      <view class="service-card job-search-card" @click="handleJobSearch">
        <view class="card-content">
          <view class="card-text">
            <view class="card-title">我要</view>
            <view class="card-subtitle">找工作</view>
          </view>
          <view class="card-image">
            <image src="/static/images/find_jobs.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>

      <!-- 我要招人卡片 -->
      <view class="service-card recruitment-card" @click="handleRecruitment">
        <view class="card-content">
          <view class="card-text">
            <view class="card-title">我要</view>
            <view class="card-subtitle">招人</view>
          </view>
          <view class="card-image">
            <image src="/static/images/find_peop.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <UserTabbar />
  </view>
</template>

<script>
import UserTabbar from '@/components/tabbar/user-tabbar/user-tabbar.vue'

export default {
  name: 'WorkService',
  components: {
    UserTabbar
  },
  data() {
    return {
      // 页面数据
    }
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 处理找工作点击
    handleJobSearch() {
      // 跳转到招聘平台页面
      uni.navigateTo({
        url: '/pages/user/index/job-platform/index',
        fail: (err) => {
          console.error('跳转招聘平台失败：', err)
          uni.showToast({
            icon: 'none',
            title: '页面跳转失败'
          })
        }
      })
    },
    
    // 处理招聘点击
    handleRecruitment() {
      // 暂时只显示提示，后续添加跳转逻辑
      uni.showToast({
        title: '招聘功能',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.work-service-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #E6F3FF 0%, #F0F8FF 100%);
}

/* 自定义导航栏 */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.8);
  padding-top: var(--status-bar-height);
  
  .navbar-content {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    
    .navbar-left {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .navbar-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    
    .navbar-right {
      width: 44px;
    }
  }
}

/* 主内容区域 */
.main-content {
  padding-top: calc(var(--status-bar-height) + 44px + 20px);
  padding: calc(var(--status-bar-height) + 44px + 20px) 16px 20px;
  padding-bottom: calc(100rpx + 20px); /* 为底部导航栏留出空间 */
  display: flex;
  flex-direction: column;
  gap: 100rpx;
}

/* 服务卡片 */
.service-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  .card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .card-text {
      flex: 1;
      
      .card-title {
        font-size: 32px;
        font-weight: bold;
        color: #333;
        line-height: 1.2;
        margin-bottom: 4px;
      }
      
      .card-subtitle {
        font-size: 32px;
        font-weight: bold;
        color: #333;
        line-height: 1.2;
      }
    }
    
    .card-image {
      width: 120px;
      height: 120px;
      
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}


</style> 