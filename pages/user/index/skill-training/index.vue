<template>
  <view class="skill-training-container">
    <!-- 自定义导航栏 -->
    <uv-navbar 
      :safeAreaInsetTop="true"
      placeholder
      bgColor="#A0D8FF"
      :border="false"
    >
      <template #left>
        <uv-icon 
          name="arrow-left" 
          size="20" 
          color="#50A0E0"
          @click="goBack"
        ></uv-icon>
      </template>
      <template #right>
        <uv-icon 
          name="search" 
          size="20" 
          color="#50A0E0"
          @click="handleSearch"
        ></uv-icon>
      </template>
    </uv-navbar>

    <!-- 页面内容 -->
    <view class="content">
      <!-- 插画Banner区域 -->
      <view class="banner-section">
        <view class="illustration-container">
          <!-- 左侧女性人物 -->
          <view class="character-left">
            <view class="character-head"></view>
            <view class="character-body"></view>
            <view class="character-arm"></view>
          </view>
          
          <!-- 中央笔记本电脑 -->
          <view class="laptop-center">
            <view class="laptop-base"></view>
            <view class="laptop-screen">
              <view class="play-button"></view>
            </view>
            <view class="envelope-icon">
              <view class="envelope-body"></view>
              <view class="envelope-arrow"></view>
            </view>
          </view>
          
          <!-- 右侧男性人物 -->
          <view class="character-right">
            <view class="character-head male"></view>
            <view class="character-body male"></view>
            <view class="character-tie"></view>
          </view>
        </view>
        
        <!-- 技能培训标题 -->
        <view class="banner-title">技能培训</view>
      </view>

      <!-- 标签导航栏 -->
      <view class="tabs-section">
        <uv-tabs 
          :list="tabsList" 
          :current="currentTab"
          @change="handleTabChange"
          lineColor="#007AFF"
          activeColor="#007AFF"
          inactiveColor="#4A90E2"
          :scrollable="true"
        ></uv-tabs>
      </view>

      <!-- 可滚动的课程列表容器 -->
      <scroll-view 
        class="scroll-container" 
        scroll-y="true" 
        :style="{ height: scrollViewHeight + 'px' }"
        enable-back-to-top="true"
        show-scrollbar="false"
      >
        <!-- 课程卡片列表 -->
        <view class="courses-section">
          <uv-grid :col="2" :border="false">
            <uv-grid-item v-for="(course, index) in coursesList" :key="index">
              <view class="course-card" @click="handleCourseClick(course)">
                <!-- 课程缩略图 -->
                <view class="course-thumbnail">
                  <view class="placeholder-image"></view>
                  <!-- 爱心收藏图标 -->
                  <view class="favorite-icon" @click.stop="toggleFavorite(index)">
                    <uv-icon 
                      :name="course.isFavorite ? 'heart-fill' : 'heart'" 
                      :color="course.isFavorite ? '#FF4D4F' : '#FFFFFF'"
                      size="16"
                    ></uv-icon>
                  </view>
                  <!-- 视频时长 -->
                  <view class="duration">{{ course.duration }}</view>
                </view>
                
                <!-- 课程标题 -->
                <view class="course-title">{{ course.title }}</view>
                
                <!-- 底部信息 -->
                <view class="course-info">
                  <text class="play-count">{{ course.playCount }}次播放</text>
                  <view class="share-icon">
                    <view class="share-dot"></view>
                    <view class="share-line1"></view>
                    <view class="share-line2"></view>
                  </view>
                </view>
              </view>
            </uv-grid-item>
          </uv-grid>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      scrollViewHeight: 400, // 滚动容器高度，单位px
      tabsList: [
        { name: '办公技能' },
        { name: '软件开发' },
        { name: '电商运营' },
        { name: '摄影剪辑' },
        { name: '职业规划' }
      ],
      coursesList: [
        {
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: false
        },
        {
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: true
        },
        {
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: false
        },
        {
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: false
        },
        {
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: false
        },
        {
          title: '新媒体营销策略精讲',
          duration: '28:45',
          playCount: '1.9万',
          isFavorite: false
        }
      ]
    }
  },
  mounted() {
    this.calculateScrollViewHeight()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    handleSearch() {
      uni.navigateTo({
        url: '/pages/user/index/search/index'
      })
    },
    handleTabChange(index) {
      this.currentTab = index
      // 根据标签切换课程内容
      console.log('切换到标签：', this.tabsList[index].name)
    },
    toggleFavorite(index) {
      this.coursesList[index].isFavorite = !this.coursesList[index].isFavorite
    },
    handleCourseClick(course) {
      // 跳转到课程详情页面
      uni.navigateTo({
        url: '/pages/user/index/skill-training/detail/index?courseId=' + encodeURIComponent(course.title)
      })
    },
    calculateScrollViewHeight() {
      // 获取系统信息
      const systemInfo = uni.getSystemInfoSync()
      const windowHeight = systemInfo.windowHeight
      
      // 计算固定区域的高度（单位px）
      // 导航栏高度约44px + 状态栏高度
      const navbarHeight = 44 + systemInfo.statusBarHeight
      // Banner区域高度：500rpx转换为px
      const bannerHeight = 500 * systemInfo.windowWidth / 750
      // Tabs区域高度：约60rpx转换为px + margin
      const tabsHeight = (60 + 30) * systemInfo.windowWidth / 750
      
      // 计算可用的滚动区域高度
      this.scrollViewHeight = windowHeight - navbarHeight - bannerHeight - tabsHeight
      
      // 确保最小高度
      if (this.scrollViewHeight < 200) {
        this.scrollViewHeight = 200
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.skill-training-container {
  height: 100vh;
  background: linear-gradient(to bottom, #D0E8FF, #E8F4FF);
  overflow: hidden;
}

.content {
  padding: 0;
}

.banner-section {
  height: 500rpx;
  position: relative;
  margin-bottom: 30rpx;
  background: linear-gradient(135deg, #4A90E2 0%, #7BB3E8 50%, #A0D8FF 100%);
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  
  .illustration-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60rpx;
  }
  
  .banner-title {
    position: absolute;
    top: 80rpx;
    right: 80rpx;
    font-size: 72rpx;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 3rpx 3rpx 6rpx rgba(74, 144, 226, 0.4);
    font-family: $font-family-youshe, 'PingFang SC', 'Microsoft YaHei', sans-serif;
    z-index: 10;
  }
}

.tabs-section {
  margin-bottom: 30rpx;
  padding: 0 20rpx;
  
  :deep(.uv-tabs) {
    background-color: transparent;
    
    .uv-tabs__wrapper__nav__item {
      background-color: #E6F2FF;
      color: #4A90E2;
      border-radius: 25rpx;
      margin: 0 8rpx;
      padding: 12rpx 24rpx;
      font-size: 28rpx;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &.uv-tabs__wrapper__nav__item--active {
        background-color: #007AFF;
        color: #FFFFFF;
      }
    }
    
    .uv-tabs__wrapper__nav__line {
      display: none;
    }
  }
}

.scroll-container {
  width: 100%;
  background-color: transparent;
}

.courses-section {
  padding: 20rpx 20rpx 40rpx;
}

.course-card {
  background-color: #FFFFFF;
  border-radius: 20rpx;
  margin: 15rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
  
  .course-thumbnail {
    width: 100%;
    height: 240rpx;
    position: relative;
    
    .placeholder-image {
      width: 100%;
      height: 100%;
      background-color: #F0F0F0;
    }
    
    .favorite-icon {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      width: 40rpx;
      height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
    
    .duration {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      color: #FFFFFF;
      font-size: 24rpx;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 6rpx 12rpx;
      border-radius: 8rpx;
      font-weight: 500;
    }
  }
  
  .course-title {
    padding: 20rpx 20rpx 10rpx;
    font-size: 30rpx;
    color: #333333;
    font-weight: bold;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  
  .course-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx 20rpx;
    
    .play-count {
      font-size: 24rpx;
      color: #888888;
      font-weight: 400;
    }
    
    .share-icon {
      width: 28rpx;
      height: 28rpx;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        width: 6rpx;
        height: 6rpx;
        background-color: #888888;
        border-radius: 50%;
        top: 2rpx;
        left: 11rpx;
      }
      
      &::after {
        content: '';
        position: absolute;
        width: 6rpx;
        height: 6rpx;
        background-color: #888888;
        border-radius: 50%;
        bottom: 2rpx;
        left: 5rpx;
      }
      
      .share-dot {
        position: absolute;
        width: 6rpx;
        height: 6rpx;
        background-color: #888888;
        border-radius: 50%;
        bottom: 2rpx;
        right: 5rpx;
      }
      
      .share-line1 {
        position: absolute;
        width: 12rpx;
        height: 2rpx;
        background-color: #888888;
        top: 8rpx;
        left: 8rpx;
        transform: rotate(-30deg);
      }
      
      .share-line2 {
        position: absolute;
        width: 12rpx;
        height: 2rpx;
        background-color: #888888;
        top: 18rpx;
        left: 8rpx;
        transform: rotate(30deg);
      }
    }
  }
}

// 插画元素样式
.character-left, .character-right {
  position: relative;
  width: 120rpx;
  height: 300rpx;
  flex-shrink: 0;
  
  .character-head {
    width: 80rpx;
    height: 80rpx;
    background-color: #FDBCB4;
    border-radius: 50%;
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    
    &.male {
      left: 20rpx;
    }
    
    &::before {
      content: '';
      position: absolute;
      width: 60rpx;
      height: 40rpx;
      background-color: #2A4A87;
      border-radius: 30rpx 30rpx 0 0;
      top: -20rpx;
      left: 10rpx;
    }
  }
  
  .character-body {
    width: 100rpx;
    height: 160rpx;
    background-color: #2A4A87;
    border-radius: 20rpx;
    position: absolute;
    top: 80rpx;
    left: 10rpx;
    
    &::before {
      content: '';
      position: absolute;
      width: 80rpx;
      height: 120rpx;
      background-color: #FFFFFF;
      border-radius: 15rpx;
      top: 20rpx;
      left: 10rpx;
    }
    
    &.male::after {
      content: '';
      position: absolute;
      width: 20rpx;
      height: 80rpx;
      background-color: #4A90E2;
      top: 30rpx;
      left: 40rpx;
    }
  }
  
  .character-arm {
    width: 40rpx;
    height: 80rpx;
    background-color: #2A4A87;
    border-radius: 20rpx;
    position: absolute;
    top: 100rpx;
    right: -20rpx;
    transform: rotate(-30deg);
  }
  
  .character-tie {
    width: 20rpx;
    height: 80rpx;
    background-color: #4A90E2;
    position: absolute;
    top: 110rpx;
    left: 50rpx;
    border-radius: 0 0 10rpx 10rpx;
  }
}

.laptop-center {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  flex-shrink: 0;
  
  .laptop-base {
    width: 180rpx;
    height: 20rpx;
    background-color: #4A90E2;
    border-radius: 10rpx;
    position: absolute;
    bottom: 40rpx;
    left: 10rpx;
  }
  
  .laptop-screen {
    width: 160rpx;
    height: 120rpx;
    background-color: #4A90E2;
    border-radius: 15rpx;
    position: absolute;
    bottom: 60rpx;
    left: 20rpx;
    
    &::before {
      content: '';
      position: absolute;
      width: 140rpx;
      height: 100rpx;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      top: 10rpx;
      left: 10rpx;
    }
  }
  
  .play-button {
    width: 40rpx;
    height: 40rpx;
    background-color: #FFFFFF;
    border-radius: 50%;
    position: absolute;
    top: 50rpx;
    left: 80rpx;
    z-index: 2;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-left: 15rpx solid #4A90E2;
      border-top: 10rpx solid transparent;
      border-bottom: 10rpx solid transparent;
      top: 10rpx;
      left: 15rpx;
    }
  }
  
  .envelope-icon {
    position: absolute;
    bottom: 10rpx;
    left: 30rpx;
    
    .envelope-body {
      width: 40rpx;
      height: 30rpx;
      background-color: #D8D8D8;
      border-radius: 5rpx;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-left: 20rpx solid transparent;
        border-right: 20rpx solid transparent;
        border-top: 15rpx solid #D8D8D8;
        top: 0;
        left: 0;
      }
    }
    
    .envelope-arrow {
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-bottom: 15rpx solid #D8D8D8;
      position: absolute;
      top: -10rpx;
      left: 10rpx;
    }
  }
}

// 响应式优化
@media screen and (max-width: 750rpx) {
  .banner-section {
    .illustration-container {
      padding: 0 40rpx;
    }
    
    .banner-title {
      font-size: 60rpx;
      right: 60rpx;
    }
  }
  
  .character-left, .character-right {
    width: 100rpx;
    
    .character-head {
      width: 70rpx;
      height: 70rpx;
    }
    
    .character-body {
      width: 90rpx;
      height: 140rpx;
    }
  }
  
  .laptop-center {
    width: 160rpx;
    height: 160rpx;
    
    .laptop-screen {
      width: 140rpx;
      height: 100rpx;
    }
  }
}

// 动画效果
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10rpx);
  }
}

.play-button {
  animation: float 2s ease-in-out infinite;
}

.character-arm {
  animation: float 3s ease-in-out infinite;
}
</style> 