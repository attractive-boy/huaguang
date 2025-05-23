<template>
  <view class="skill-detail-container">
    <!-- 自定义导航栏 -->
    <uv-navbar 
      :safeAreaInsetTop="true"
      placeholder
      :bgColor="navbarBgColor"
      :border="false"
    >
      <template #left>
        <view class="nav-back-btn" @click="goBack">
          <uv-icon 
            name="arrow-left" 
            size="18" 
            :color="navIconColor"
          ></uv-icon>
          <text class="back-text">返回</text>
        </view>
      </template>
    </uv-navbar>

    <!-- 页面内容 -->
    <view class="page-content">
      <!-- 横幅插画区域 -->
      <view class="banner-section">
        <view class="banner-background">
          <!-- 左侧女性人物 -->
          <view class="character-female">
            <view class="female-head"></view>
            <view class="female-body"></view>
            <view class="female-jacket"></view>
            <view class="female-shirt"></view>
          </view>
          
          <!-- 中央笔记本电脑 -->
          <view class="laptop-container">
            <view class="laptop-base"></view>
            <view class="laptop-screen">
              <view class="play-button-container">
                <view class="play-button">
                  <view class="play-triangle"></view>
                </view>
              </view>
            </view>
          </view>
          
          <!-- 右侧男性人物 -->
          <view class="character-male">
            <view class="male-head"></view>
            <view class="male-body"></view>
            <view class="male-jacket"></view>
            <view class="male-shirt"></view>
            <view class="male-tie"></view>
          </view>
        </view>
        
        <!-- 技能培训标题叠加 -->
        <view class="banner-title">技能培训</view>
      </view>

      <!-- 课程标题区域 -->
      <view class="course-title-section">
        <text class="course-title">{{ courseInfo.title }}</text>
      </view>

      <!-- 统计数据区域 -->
      <view class="statistics-section">
        <view class="stat-item">
          <uv-icon name="eye" size="14" :color="statIconColor"></uv-icon>
          <text class="stat-text">{{ courseInfo.viewCount }}次观看</text>
        </view>
        <view class="stat-right-group">
          <view class="stat-item" @click="toggleFavorite">
            <uv-icon 
              name="star-fill" 
              size="14" 
              :color="favoriteIconColor"
            ></uv-icon>
            <text class="stat-text">{{ courseInfo.favoriteCount }}</text>
          </view>
          <view class="stat-item" @click="handleShare">
            <uv-icon name="share" size="14" :color="statIconColor"></uv-icon>
            <text class="stat-text">{{ courseInfo.shareCount }}</text>
          </view>
        </view>
      </view>

      <!-- 课程简介区域 -->
      <view class="introduction-section">
        <text class="intro-title">课程简介</text>
        <text class="intro-content">{{ courseInfo.introduction }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 导航栏配色
      navbarBgColor: '#E0F2FF',
      navIconColor: '#2563EB',
      statIconColor: '#888888',
      
      // 课程信息
      courseInfo: {
        title: '从零开始学Python编程',
        viewCount: '1.2万',
        favoriteCount: 108,
        shareCount: 108,
        introduction: '本课程专为Python零基础学员打造，全面讲解Python语言的基础语法与核心概念，配合大量案例和练习，帮助学员从零掌握编程思维，具备独立编写Python程序的能力。',
        isFavorited: false
      }
    }
  },
  computed: {
    favoriteIconColor() {
      return this.courseInfo.isFavorited ? '#FFA500' : '#888888'
    }
  },
  onLoad(options) {
    // 接收从列表页传递的课程信息
    if (options.courseId) {
      this.loadCourseDetail(options.courseId)
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    
    toggleFavorite() {
      this.courseInfo.isFavorited = !this.courseInfo.isFavorited
      // 这里可以调用API更新收藏状态
      uni.showToast({
        title: this.courseInfo.isFavorited ? '已收藏' : '已取消收藏',
        icon: 'none',
        duration: 1500
      })
    },
    
    handleShare() {
      uni.showToast({
        title: '分享功能',
        icon: 'none',
        duration: 1500
      })
    },
    
    loadCourseDetail(courseId) {
      // 根据courseId加载具体的课程详情
      console.log('加载课程详情:', courseId)
      
      // 模拟不同课程的数据
      const courseData = {
        '新媒体营销策略精讲': {
          title: '新媒体营销策略精讲',
          viewCount: '1.9万',
          favoriteCount: 156,
          shareCount: 89,
          introduction: '本课程深入讲解新媒体营销的核心策略和实战技巧，涵盖内容营销、社交媒体运营、数据分析等关键领域，帮助学员掌握现代营销的精髓，提升品牌影响力和转化效果。'
        },
        '从零开始学Python编程': {
          title: '从零开始学Python编程',
          viewCount: '1.2万',
          favoriteCount: 108,
          shareCount: 108,
          introduction: '本课程专为Python零基础学员打造，全面讲解Python语言的基础语法与核心概念，配合大量案例和练习，帮助学员从零掌握编程思维，具备独立编写Python程序的能力。'
        }
      }
      
      // 如果找到对应的课程数据，则更新
      if (courseData[courseId]) {
        this.courseInfo = {
          ...this.courseInfo,
          ...courseData[courseId]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// CSS变量定义
:root {
  --primary-blue: #2563EB;
  --light-blue: #E0F2FF;
  --gradient-start: #60A5FA;
  --gradient-end: #93C5FD;
  --dark-gray: #333333;
  --medium-gray: #555555;
  --light-gray: #888888;
  --orange: #FFA500;
  --white: #FFFFFF;
  --page-bg-start: #EBF5FF;
  --page-bg-end: #F8FBFF;
}

.skill-detail-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, var(--page-bg-start), var(--page-bg-end));
}

// 导航栏样式
.nav-back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  
  .back-text {
    font-size: 16px;
    color: var(--primary-blue);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
}

// 页面内容
.page-content {
  padding: 0;
}

// 横幅插画区域
.banner-section {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.banner-background {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, var(--gradient-start), var(--gradient-end));
  display: flex;
  align-items: center;
  justify-content: center;
}

// 左侧女性人物
.character-female {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 120px;
}

.female-head {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  background: #F4C2A1;
  border-radius: 50%;
}

.female-body {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 60px;
  background: var(--white);
  border-radius: 8px;
}

.female-jacket {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 50px;
  background: #1E3A8A;
  border-radius: 8px;
}

.female-shirt {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 30px;
  background: var(--white);
  border-radius: 4px;
}

// 中央笔记本电脑
.laptop-container {
  position: relative;
  z-index: 2;
}

.laptop-base {
  width: 100px;
  height: 8px;
  background: #374151;
  border-radius: 4px;
  margin-top: 60px;
}

.laptop-screen {
  position: relative;
  width: 90px;
  height: 60px;
  background: #4285F4;
  border-radius: 4px;
  margin: -4px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button-container {
  position: relative;
}

.play-button {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-triangle {
  width: 0;
  height: 0;
  border-left: 8px solid var(--white);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  margin-left: 2px;
}

// 右侧男性人物
.character-male {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 120px;
}

.male-head {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  background: #F4C2A1;
  border-radius: 50%;
}

.male-body {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 60px;
  background: var(--white);
  border-radius: 8px;
}

.male-jacket {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 50px;
  background: #1E3A8A;
  border-radius: 8px;
}

.male-shirt {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 30px;
  background: var(--white);
  border-radius: 4px;
}

.male-tie {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 25px;
  background: #93C5FD;
  border-radius: 2px;
}

// 横幅标题
.banner-title {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 32px;
  font-weight: 800;
  color: var(--white);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transform: perspective(100px) rotateX(5deg);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

// 课程标题区域
.course-title-section {
  padding: 20px 16px 0;
}

.course-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--dark-gray);
  line-height: 1.4;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

// 统计数据区域
.statistics-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-text {
  font-size: 12px;
  color: var(--light-gray);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.stat-right-group {
  display: flex;
  gap: 15px;
}

// 课程简介区域
.introduction-section {
  padding: 20px 16px;
}

.intro-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: var(--dark-gray);
  margin-bottom: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.intro-content {
  display: block;
  font-size: 14px;
  color: var(--medium-gray);
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: justify;
}
</style> 