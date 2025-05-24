<template>
  <view class="video-collection-page">
    <!-- 自定义状态栏 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 导航栏 -->
    <view class="nav-section">
      <!-- 返回按钮 -->
      <view class="back-button" @click="goBack">
        <uv-icon name="arrow-left" color="#4A90E2" size="16"></uv-icon>
        <text class="back-text">返回</text>
      </view>
    </view>
    
    <!-- 滚动容器 -->
    <scroll-view 
      class="scroll-container" 
      scroll-y="true" 
      :style="{ height: scrollHeight + 'px' }"
      enable-back-to-top="true"
      show-scrollbar="false"
    >
      <!-- 视频列表 -->
      <view class="video-list">
        <view 
          v-for="(video, index) in videoList" 
          :key="video.id"
          class="video-card"
          @click="handleVideoClick(video)"
        >
          <!-- 左侧缩略图区域 -->
          <view class="thumbnail-container">
            <!-- 缩略图占位符 -->
            <view class="thumbnail-placeholder"></view>
            
            <!-- 爱心收藏图标 -->
            <view class="favorite-icon" @click.stop="toggleFavorite(index)">
              <uv-icon 
                :name="video.isFavorite ? 'heart-fill' : 'heart'" 
                :color="video.isFavorite ? '#FF4D4F' : '#FF4D4F'"
                size="12"
              ></uv-icon>
            </view>
            
            <!-- 视频时长 -->
            <view class="duration">{{ video.duration }}</view>
          </view>
          
          <!-- 右侧文本信息区域 -->
          <view class="video-info">
            <!-- 视频标题 -->
            <text class="video-title">{{ video.title }}</text>
            
            <!-- 播放次数 -->
            <text class="play-count">{{ video.playCount }}次播放</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      scrollHeight: 0,
      videoList: [
        {
          id: 1,
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: true
        },
        {
          id: 2,
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: true
        },
        {
          id: 3,
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: true
        },
        {
          id: 4,
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: true
        },
        {
          id: 5,
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: true
        }
      ]
    }
  },
  onLoad() {
    this.initPage()
  },
  methods: {
    // 初始化页面
    initPage() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight || 0
      
      // 计算滚动容器高度：屏幕高度 - 状态栏 - 导航区域
      const navHeight = 80 // 导航区域高度，单位px
      this.scrollHeight = systemInfo.windowHeight - this.statusBarHeight - navHeight
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 切换收藏状态
    toggleFavorite(index) {
      this.videoList[index].isFavorite = !this.videoList[index].isFavorite
      // 这里可以调用API更新收藏状态
      uni.showToast({
        title: this.videoList[index].isFavorite ? '已收藏' : '已取消收藏',
        icon: 'none',
        duration: 1500
      })
    },
    
    // 处理视频点击
    handleVideoClick(video) {
      console.log('点击视频:', video)
      // 这里可以跳转到视频播放页面
      // uni.navigateTo({ url: `/pages/video/play/index?id=${video.id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-collection-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #B0E0E6 0%, #F0F8FF 100%);
  position: relative;
}

.status-bar {
  width: 100%;
  background: transparent;
}

.nav-section {
  padding: 15rpx 30rpx 20rpx 30rpx;
  
  .back-button {
    display: flex;
    align-items: center;
    
    .back-text {
      margin-left: 10rpx;
      font-size: 34rpx;
      color: #4A90E2;
      font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
    }
  }
}

.scroll-container {
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.video-list {
  padding-bottom: 40rpx;
}

.video-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  margin-bottom: 30rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.12);
  }
}

.thumbnail-container {
  width: 120rpx;
  height: 90rpx;
  position: relative;
  margin-right: 30rpx;
  flex-shrink: 0;
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  background-color: #D8D8D8;
  border-radius: 16rpx;
}

.favorite-icon {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  width: 24rpx;
  height: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.duration {
  position: absolute;
  bottom: 8rpx;
  right: 8rpx;
  background: rgba(0, 0, 0, 0.6);
  color: #FFFFFF;
  font-size: 20rpx;
  padding: 2rpx 6rpx;
  border-radius: 4rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
}

.video-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-title {
  font-size: 30rpx;
  color: #333333;
  font-weight: 500;
  margin-bottom: 12rpx;
  line-height: 1.4;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
}

.play-count {
  font-size: 24rpx;
  color: #888888;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
}
</style> 