<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-content">
        <!-- 返回按钮 -->
        <view class="back-button" @click="goBack">
          <uv-icon name="arrow-left" :size="16" color="#007AFF"></uv-icon>
          <text class="back-text">返回</text>
        </view>
        
        <!-- 页面标题 -->
        <text class="page-title">法律文书列表</text>
      </view>
    </view>
    
    <!-- 主内容区域 -->
    <view class="content-area">
      <scroll-view 
        class="document-list" 
        scroll-y="true" 
        :style="{ height: scrollViewHeight + 'px' }"
        enable-back-to-top="true"
        show-scrollbar="false"
      >
        <!-- 文书列表项 -->
        <view 
          v-for="(document, index) in documentList" 
          :key="document.id"
          class="document-card"
          @click="handleCardClick(document)"
        >
          <!-- 左侧内容 -->
          <view class="card-content">
            <text class="document-title">{{ document.title }}</text>
            <text class="document-date">{{ document.createTime }}</text>
          </view>
          
          <!-- 右侧箭头 -->
          <view class="card-right">
            <uv-icon name="arrow-right" :size="12" color="#CCCCCC" class="arrow-icon"></uv-icon>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 底部标签栏 -->
    <view class="bottom-tab-bar">
      <view class="tab-divider"></view>
      <view class="tab-content">
        <!-- 首页标签 -->
        <view class="tab-item active">
          <uv-icon name="home" :size="20" color="#007AFF" class="tab-icon"></uv-icon>
          <text class="tab-text active">首页</text>
        </view>
        
        <!-- 信息标签 -->
        <view class="tab-item">
          <uv-icon name="chat" :size="20" color="#888888" class="tab-icon"></uv-icon>
          <text class="tab-text">信息</text>
        </view>
        
        <!-- 我的标签 -->
        <view class="tab-item">
          <uv-icon name="account" :size="20" color="#888888" class="tab-icon"></uv-icon>
          <text class="tab-text">我的</text>
        </view>
      </view>
    </view>
    
    <!-- 系统主屏幕指示器 -->
    <view class="home-indicator"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollViewHeight: 400, // 滚动容器高度，单位px
      statusBarHeight: 44, // 状态栏高度，单位px
      
      // 文书列表数据
      documentList: [
        {
          id: 1,
          title: '民事起诉状',
          createTime: '2025年5月6日 14:33'
        },
        {
          id: 2,
          title: '民事起诉状',
          createTime: '2025年5月6日 14:33'
        },
        {
          id: 3,
          title: '民事起诉状',
          createTime: '2025年5月6日 14:33'
        }
      ]
    }
  },
  
  mounted() {
    this.calculateScrollViewHeight()
  },
  
  methods: {
    // 计算滚动容器高度
    calculateScrollViewHeight() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight || 44
      const navbarHeight = 88 // 自定义导航栏高度
      const tabBarHeight = 100 // 底部标签栏高度
      const homeIndicatorHeight = 20 // 主屏幕指示器高度
      
      this.scrollViewHeight = systemInfo.windowHeight - this.statusBarHeight - navbarHeight - tabBarHeight - homeIndicatorHeight
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 处理卡片点击
    handleCardClick(document) {
      console.log('点击了文书:', document.title)
      // 这里可以添加跳转到详情页的逻辑
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #DDEEFF 0%, #BBDDFF 100%);
  position: relative;
  overflow: hidden;
}

/* 状态栏占位 */
.status-bar {
  width: 100%;
  background: transparent;
}

/* 自定义导航栏 */
.custom-navbar {
  width: 100%;
  padding: 0 20rpx;
  background: transparent;
  
  .navbar-content {
    width: 100%;
    padding: 20rpx 0;
    
    .back-button {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      
      .back-text {
        font-size: 32rpx;
        color: #007AFF;
        margin-left: 8rpx;
        font-weight: 400;
      }
    }
    
    .page-title {
      font-size: 48rpx;
      color: #333333;
      font-weight: bold;
      line-height: 1.2;
    }
  }
}

/* 主内容区域 */
.content-area {
  flex: 1;
  padding: 0 20rpx;
  
  .document-list {
    width: 100%;
    
    .document-card {
      background: #FFFFFF;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      padding: 24rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
      
      .card-content {
        flex: 1;
        
        .document-title {
          font-size: 32rpx;
          color: #333333;
          font-weight: 400;
          line-height: 1.4;
          margin-bottom: 8rpx;
          display: block;
        }
        
        .document-date {
          font-size: 24rpx;
          color: #888888;
          font-weight: 400;
          line-height: 1.2;
          display: block;
        }
      }
      
      .card-right {
        margin-left: 20rpx;
        
        .arrow-icon {
          opacity: 0.6;
        }
      }
    }
  }
}

/* 底部标签栏 */
.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  z-index: 1000;
  
  .tab-divider {
    height: 1rpx;
    background: #E0E0E0;
    width: 100%;
  }
  
  .tab-content {
    display: flex;
    height: 100rpx;
    align-items: center;
    justify-content: space-around;
    padding: 0 40rpx;
    
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      
      .tab-icon {
        margin-bottom: 4rpx;
      }
      
      .tab-text {
        font-size: 20rpx;
        color: #888888;
        font-weight: 400;
        line-height: 1.2;
        
        &.active {
          color: #007AFF;
        }
      }
    }
  }
}

/* 系统主屏幕指示器 */
.home-indicator {
  position: fixed;
  bottom: 8rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 268rpx;
  height: 8rpx;
  background: #000000;
  border-radius: 4rpx;
  z-index: 1001;
}
</style> 