<template>
  <view class="skill-training-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
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
          size="42" 
          color="#50A0E0"
          bold="true"
          @click="goBack"
        ></uv-icon>
      </template>
      <template #right>
        <uv-icon 
          name="search" 
          size="42" 
          color="#50A0E0"
          @click="handleSearch"
        ></uv-icon>
      </template>
    </uv-navbar>

    <!-- 页面内容 -->
    <view class="content">
      <!-- Banner区域 -->
      <view class="banner-section" :style="{ backgroundImage: `url(${skillBannerImage})` }">
        <!-- 技能培训标题 -->
      </view>

      <!-- 标签导航栏 -->
      <view class="tabs-section">
        <view class="custom-tabs">
          <view 
            v-for="(tab, index) in tabsList" 
            :key="index"
            class="tab-item"
            :class="{ 'tab-item--active': currentTab === index }"
            @click="handleTabChange(index)"
          >
            {{ tab.name }}
          </view>
        </view>
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
                      size="32"
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
                    <uv-icon name="share-fill" size="28" color="#888888"></uv-icon>
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
import { staticBaseUrl } from '@/config/index.js'

export default {
  data() {
    return {
      currentTab: 0,
      scrollViewHeight: 400, // 滚动容器高度，单位px
      backgroundImage: `${staticBaseUrl}/bg3.png`, // 背景图片
      skillBannerImage: `${staticBaseUrl}/skill.png`, // 技能培训banner图片
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.content {
  padding: 0;
}

.banner-section {
  height: 400rpx;
  position: relative;
  margin-bottom: 30rpx;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  // border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  
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
  
  .custom-tabs {
    display: flex;
    flex-wrap: nowrap;
    gap: 16rpx;
    overflow-x: auto;
    padding-bottom: 10rpx;
    
    /* 隐藏滚动条但保持滚动功能 */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    .tab-item {
      background-color: #d7f0ff;
      color: #666;
      border-radius: 25rpx;
      padding: 12rpx 24rpx;
      font-size: 28rpx;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      
      &.tab-item--active {
        background-color: #1871d7;
        color: #fff;
      }
      
      &:hover {
        opacity: 0.8;
      }
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
  // background-color: #FFFFFF;
  border-radius: 20rpx;
  margin: 15rpx;
  overflow: hidden;
  // box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
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
      border-radius: 20rpx;
      background-color: #d8d8d8;
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
      // background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
    
    .duration {
      position: absolute;
      bottom: 20rpx;
      right: 20rpx;
      color: #666;
      font-size: 24rpx;
      // background-color: rgba(0, 0, 0, 0.6);
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
    

  }
}

// 响应式优化
@media screen and (max-width: 750rpx) {
  .banner-section {
    .banner-title {
      font-size: 60rpx;
      right: 60rpx;
    }
  }
}
</style>