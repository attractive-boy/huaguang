<template>
  <view class="lawyer-profile-page">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-content">
        <view class="back-button" @click="goBack">
          <uv-icon name="arrow-left" color="#4A90E2" size="18"></uv-icon>
          <text class="back-text">返回</text>
        </view>
      </view>
    </view>
    
    <!-- 滚动容器 -->
    <scroll-view 
      class="scroll-container" 
      scroll-y 
      :style="{ height: scrollHeight + 'px' }"
      enable-flex
    >
      <!-- 用户信息卡片 -->
      <view class="user-info-card">
        <!-- 头像占位符 -->
        <view class="avatar-placeholder"></view>
        
        <!-- 详细信息列表 -->
        <view class="info-list">
          <view class="info-row">
            <text class="info-label">姓名</text>
            <text class="info-content">李律师</text>
          </view>
          <view class="info-row">
            <text class="info-label">标签</text>
            <text class="info-content">劳动法专长</text>
          </view>
          <view class="info-row">
            <text class="info-label">执业经验</text>
            <text class="info-content">8年</text>
          </view>
          <view class="info-row">
            <text class="info-label">胜诉率</text>
            <text class="info-content">91%</text>
          </view>
        </view>
      </view>
      
      <!-- 详细说明卡片 -->
      <view class="detail-info-card">
        <view class="detail-row">
          <text class="detail-label">近期案例</text>
          <view class="detail-content">
            <text class="detail-text">案例时间（如 2025年4月5日）</text>
            <text class="detail-text">案例描述（如：成功协助当事人</text>
            <text class="detail-text">追回劳动仲裁款项5000元）</text>
          </view>
        </view>
        
        <view class="detail-row">
          <text class="detail-label">服务优势</text>
          <view class="detail-content">
            <text class="detail-text">1.响应迅速，24小时内答复</text>
            <text class="detail-text">2.丰富的劳动仲裁、劳合同管理</text>
            <text class="detail-text">等服务经验"</text>
          </view>
        </view>
        
        <view class="detail-row">
          <text class="detail-label">成功案例</text>
          <view class="detail-content">
            <text class="detail-text">协助中介企业追回薪资共计507</text>
            <text class="detail-text">万元</text>
          </view>
        </view>
        
        <view class="detail-row">
          <text class="detail-label">咨询范围</text>
          <view class="detail-content">
            <text class="detail-text">劳动合同起草与审查</text>
            <text class="detail-text">工伤/违法解雇维权</text>
            <text class="detail-text">社保、加班、赔偿、争议等</text>
          </view>
        </view>
      </view>
      
      <!-- 操作按钮 -->
      <view class="action-button" @click="handleSave">
        <text class="button-text">点击保存</text>
      </view>
      
      <!-- 底部安全区域 -->
      <view class="bottom-safe-area"></view>
    </scroll-view>
    
    <!-- 底部导航栏 -->
    <view class="bottom-tabbar">
      <view class="tab-item">
        <uv-icon name="home" size="48" color="#8E8E93"></uv-icon>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item">
        <uv-icon name="chat" size="48" color="#8E8E93"></uv-icon>
        <text class="tab-text">信息</text>
      </view>
      <view class="tab-item active">
        <uv-icon name="account" size="48" color="#007AFF"></uv-icon>
        <text class="tab-text active">我的</text>
      </view>
    </view>
    
    <!-- 系统导航指示器 -->
    <view class="home-indicator"></view>
  </view>
</template>

<script>
export default {
  name: 'LawyerProfile',
  data() {
    return {
      statusBarHeight: 0,
      scrollHeight: 0
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
      // 计算滚动区域高度：总高度 - 状态栏 - 导航栏 - 底部导航栏 - Home Indicator
      this.scrollHeight = systemInfo.windowHeight - this.statusBarHeight - 44 - 60 - 34
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack({
        fail: () => {
          // 如果没有上一页，跳转到律师工作台首页
          uni.navigateTo({
            url: '/pages/lawyer/index/dashboard/index'
          })
        }
      })
    },
    
    // 处理保存操作
    handleSave() {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lawyer-profile-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #E0F2FF 0%, #FFFFFF 100%);
  position: relative;
}

// 状态栏占位
.status-bar {
  width: 100%;
  background: transparent;
}

// 自定义导航栏
.custom-navbar {
  height: 44px;
  background: transparent;
  
  .navbar-content {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    
    .back-text {
      font-size: 16px;
      color: #4A90E2;
      margin-left: 5px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  }
}

// 滚动容器
.scroll-container {
  width: 100%;
  padding: 0 5%;
}

// 用户信息卡片
.user-info-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 20px 18px;
  margin: 15px 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  
  .avatar-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #D8D8D8;
    margin: 0 auto 20px auto;
  }
  
  .info-list {
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .info-label {
        font-size: 14px;
        color: #666666;
        width: 30%;
        text-align: right;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      
      .info-content {
        font-size: 14px;
        color: #333333;
        flex: 1;
        margin-left: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
    }
  }
}

// 详细说明卡片
.detail-info-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 20px 18px;
  margin: 15px 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  
  .detail-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 18px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .detail-label {
      font-size: 14px;
      color: #666666;
      width: 30%;
      text-align: left;
      margin-top: 2px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    
    .detail-content {
      flex: 1;
      margin-left: 12px;
      
      .detail-text {
        display: block;
        font-size: 14px;
        color: #333333;
        line-height: 1.5;
        margin-bottom: 2px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

// 操作按钮
.action-button {
  width: 88%;
  height: 44px;
  background-color: #5896FD;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px auto;
  
  .button-text {
    font-size: 16px;
    color: #FFFFFF;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
}

// 底部安全区域
.bottom-safe-area {
  height: 20px;
}

// 底部导航栏
.bottom-tabbar {
  position: fixed;
  bottom: 34px;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #F8F8F8;
  border-top: 1px solid #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .tab-text {
      font-size: 10px;
      color: #8E8E93;
      margin-top: 3px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      
      &.active {
        color: #007AFF;
      }
    }
  }
}

// 系统导航指示器
.home-indicator {
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 134px;
  height: 5px;
  background-color: #000000;
  border-radius: 2.5px;
}
</style> 