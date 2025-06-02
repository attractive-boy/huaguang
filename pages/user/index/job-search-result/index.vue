<template>
  <view class="job-search-container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 搜索区域 -->
    <view class="search-section">
      <uv-search 
        v-model="searchKeyword"
        shape="round"
        :bgColor="'#FFFFFF'"
        placeholder="新媒体"
        actionText="取消"
        :searchIconColor="'#A0D2EB'"
        :placeholderColor="'#333333'"
        :height="38"
        :showAction="true"
        :animation="true"
        @search="onSearch"
        @custom="onCancel"
        @change="onSearchChange"
        :customStyle="searchCustomStyle"
      ></uv-search>
    </view>
    
    <!-- 搜索结果数量提示 -->
    <view class="result-count-section">
      <text class="result-count-text">共找到{{ resultCount }}个相关职位</text>
    </view>
    
    <!-- 职位列表区域 -->
    <scroll-view class="job-list-container" scroll-y="true">
      <view 
        v-for="(job, index) in jobList" 
        :key="job.id"
        class="job-card"
        @click="onJobCardClick(job)"
      >
        <!-- 第一行：职位名称与薪资 -->
        <view class="job-card-header">
          <text class="job-title">{{ job.title }}</text>
          <text class="job-salary">{{ job.salary }}</text>
        </view>
        
        <!-- 第二行：地点与学历 -->
        <view class="job-card-info">
          <view class="info-item">
            <uv-icon name="map-pin" :size="12" color="#888888"></uv-icon>
            <text class="info-text">{{ job.location }}</text>
          </view>
          <view class="info-item">
            <uv-icon name="graduation-cap" :size="12" color="#888888"></uv-icon>
            <text class="info-text">{{ job.education }}</text>
          </view>
        </view>
        
        <!-- 右侧箭头图标 -->
        <view class="arrow-icon">
          <uv-icon name="arrow-right" :size="16" color="#CCCCCC"></uv-icon>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '新媒体',
      statusBarHeight: 0,
      resultCount: 12,
      jobList: [
        {
          id: 1,
          title: '法务专员',
          salary: '6k-9k',
          location: '上海市 · 浦东新区',
          education: '本科'
        },
        {
          id: 2,
          title: '法务助理',
          salary: '4k-6k',
          location: '北京市 · 朝阳区',
          education: '大专'
        },
        {
          id: 3,
          title: '法务经理',
          salary: '10k-15k',
          location: '深圳市 · 南山区',
          education: '本科'
        },
        {
          id: 4,
          title: '合规专员',
          salary: '7k-10k',
          location: '广州市 · 天河区',
          education: '本科'
        },
        {
          id: 5,
          title: '法务顾问',
          salary: '8k-12k',
          location: '杭州市 · 西湖区',
          education: '硕士'
        }
      ],
      searchCustomStyle: {
        margin: '0 30rpx'
      }
    }
  },
  onLoad() {
    // 获取状态栏高度
    this.getStatusBarHeight()
  },
  methods: {
    // 获取状态栏高度
    getStatusBarHeight() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight || 0
    },
    
    // 搜索提交处理
    onSearch(value) {
      console.log('搜索内容:', value)
      // TODO: 实现搜索逻辑
    },
    
    // 取消搜索处理
    onCancel() {
      console.log('取消搜索')
      // 可以选择清空搜索内容或返回上一页
      uni.navigateBack()
    },
    
    // 搜索内容变化处理
    onSearchChange(value) {
      console.log('搜索内容变化:', value)
      // TODO: 可以实现实时搜索建议
    },
    
    // 职位卡片点击处理
    onJobCardClick(job) {
      console.log('点击职位卡片:', job)
      // TODO: 跳转到职位详情页
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #EBF5FF 0%, #F8FCFF 100%);
}

.status-bar {
  width: 100%;
}

.search-section {
  padding: 20rpx 0;
}

.result-count-section {
  padding: 0 30rpx;
  margin-bottom: 20rpx;
}

.result-count-text {
  font-size: 26rpx;
  color: #666666;
}

.job-list-container {
  flex: 1;
  padding: 0 30rpx;
}

.job-card {
  position: relative;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  
  &:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.job-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #222222;
  flex: 1;
}

.job-salary {
  font-size: 32rpx;
  color: #20B2AA;
  font-weight: 500;
}

.job-card-info {
  display: flex;
  align-items: center;
  gap: 30rpx;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.info-text {
  font-size: 24rpx;
  color: #888888;
}

.arrow-icon {
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}
</style> 