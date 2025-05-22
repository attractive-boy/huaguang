<template>
  <view class="help-types-page">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 页面头部区域 -->
    <view class="page-header">
      <!-- 返回导航 -->
      <view class="back-navigation" @click="goBack">
        <uv-icon name="arrow-left" color="#FFFFFF" size="18"></uv-icon>
        <text class="back-text">返回</text>
      </view>
      
      <!-- 主标题 -->
      <view class="main-title">青年帮扶基金 · 助力你的成长</view>
      
      <!-- 副标题 -->
      <view class="subtitle">无论你面临失业、债务、心理困扰，还是法律纠纷，这里都有专业支持。</view>
      
      <!-- 背景几何图案 -->
      <view class="bg-shapes">
        <view class="shape shape-1"></view>
        <view class="shape shape-2"></view>
        <view class="shape shape-3"></view>
      </view>
    </view>
    
    <!-- 内容卡片列表区域 -->
    <view class="content-area">
      <!-- 失业援助卡片 -->
      <view class="help-card unemployment-card" @click="handleCardClick('unemployment')">
        <view class="card-content">
          <view class="card-title">失业援助</view>
          <view class="card-description">
            <text>工作突然没了？我们帮你找方向！</text>
            <text>失业不是终点，而是新起点。让我们帮你重新站稳脚跟。</text>
          </view>
        </view>
        <view class="card-illustration">
          <uv-image :src="`${config.staticBaseUrl}/icons/unemployment-help.png`" 
                    width="120rpx" height="120rpx" mode="aspectFit"></uv-image>
        </view>
      </view>
      
      <!-- 债务纾困卡片 -->
      <view class="help-card debt-card" @click="handleCardClick('debt')">
        <view class="card-content">
          <view class="card-title">债务纾困</view>
          <view class="card-description">
            <text>信用卡/网贷压得喘不过气？</text>
            <text>欠款可以慢慢还，你的心理健康更重要。</text>
          </view>
        </view>
        <view class="card-illustration">
          <uv-image :src="`${config.staticBaseUrl}/icons/debt-help.png`" 
                    width="120rpx" height="120rpx" mode="aspectFit"></uv-image>
        </view>
      </view>
      
      <!-- 心理支持卡片 -->
      <view class="help-card psychological-card" @click="handleCardClick('psychological')">
        <view class="card-content">
          <view class="card-title">心理支持</view>
          <view class="card-description">
            <text>情绪崩溃？你值得被倾听！</text>
            <text>承认自己需要帮助，本身就是一种勇敢。</text>
          </view>
        </view>
        <view class="card-illustration">
          <uv-image :src="`${config.staticBaseUrl}/icons/psychological-help.png`" 
                    width="120rpx" height="120rpx" mode="aspectFit"></uv-image>
        </view>
      </view>
      
      <!-- 法律护航卡片 -->
      <view class="help-card legal-card" @click="handleCardClick('legal')">
        <view class="card-content">
          <view class="card-title">法律护航</view>
          <view class="card-description">
            <text>劳动纠纷？官司缠身？专业律师帮你！</text>
            <text>法律不是奢侈品，你的权益我们共同守护。</text>
          </view>
        </view>
        <view class="card-illustration">
          <uv-image :src="`${config.staticBaseUrl}/icons/legal-help.png`" 
                    width="120rpx" height="120rpx" mode="aspectFit"></uv-image>
        </view>
      </view>
    </view>
    
    <!-- iOS Home Indicator -->
    <view class="home-indicator"></view>
  </view>
</template>

<script>
import config from '@/config/index.js'

export default {
  name: 'HelpTypesPage',
  data() {
    return {
      config: config
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.switchTab({
            url: '/pages/user/fund/index'
          })
        }
      })
    },
    handleCardClick(type) {
      switch(type) {
        case 'unemployment':
          uni.showToast({
            title: '失业援助功能开发中',
            icon: 'none'
          })
          break
        case 'debt':
          uni.navigateTo({
            url: '/pages/user/fund/debt/index'
          })
          break
        case 'psychological':
          // 跳转到心理支持页面
          uni.navigateTo({
            url: '/pages/user/fund/psychological-apply/index'
          })
          break
        case 'legal':
          // 跳转到法律护航申请页面
          uni.navigateTo({
            url: '/pages/user/fund/legal/index'
          })
          break
        default:
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.help-types-page {
  min-height: 100vh;
  background-color: #F8F9FA;
  position: relative;
  
  .status-bar {
    height: var(--status-bar-height);
    background: transparent;
  }
  
  .page-header {
    position: relative;
    background: linear-gradient(135deg, #A0C8FF 0%, #80B3FF 100%);
    padding: 20rpx 30rpx 60rpx;
    overflow: hidden;
    
    .back-navigation {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      z-index: 10;
      position: relative;
      
      .back-text {
        color: #FFFFFF;
        font-size: 32rpx;
        margin-left: 8rpx;
      }
    }
    
    .main-title {
      color: #FFFFFF;
      font-size: 56rpx;
      font-weight: bold;
      line-height: 1.2;
      margin-bottom: 20rpx;
      z-index: 10;
      position: relative;
    }
    
    .subtitle {
      color: #FFFFFF;
      font-size: 28rpx;
      line-height: 1.5;
      opacity: 0.9;
      z-index: 10;
      position: relative;
    }
    
    .bg-shapes {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      
      .shape {
        position: absolute;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 40rpx;
        
        &.shape-1 {
          width: 600rpx;
          height: 300rpx;
          right: -300rpx;
          top: -100rpx;
          transform: rotate(30deg);
          background: rgba(255, 255, 255, 0.15);
        }
        
        &.shape-2 {
          width: 500rpx;
          height: 250rpx;
          right: -100rpx;
          top: 100rpx;
          transform: rotate(45deg);
          background: rgba(255, 255, 255, 0.1);
        }
        
        &.shape-3 {
          width: 400rpx;
          height: 200rpx;
          right: 200rpx;
          top: 300rpx;
          transform: rotate(60deg);
          background: rgba(255, 255, 255, 0.08);
        }
      }
    }
  }
  
  .content-area {
    background-color: #F8F9FA;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    margin-top: -40rpx;
    position: relative;
    z-index: 2;
    padding: 30rpx 30rpx 100rpx;
    
    .help-card {
      background: #FFFFFF;
      border-radius: 24rpx;
      margin-bottom: 30rpx;
      padding: 40rpx 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 24rpx;
        z-index: 1;
      }
      
      .card-content {
        flex: 1;
        z-index: 2;
        position: relative;
        
        .card-title {
          font-size: 44rpx;
          font-weight: bold;
          color: #FFFFFF;
          margin-bottom: 20rpx;
        }
        
        .card-description {
          display: flex;
          flex-direction: column;
          gap: 8rpx;
          
          text {
            font-size: 26rpx;
            color: #FFFFFF;
            line-height: 1.5;
            opacity: 0.9;
          }
        }
      }
      
      .card-illustration {
        z-index: 2;
        position: relative;
        margin-left: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      // 失业援助卡片样式
      &.unemployment-card::before {
        background: linear-gradient(135deg, #C5BFF2 0%, #A59FDD 100%);
      }
      
      // 债务纾困卡片样式
      &.debt-card::before {
        background: linear-gradient(135deg, #FFD8A8 0%, #FFBE7C 100%);
      }
      
      // 心理支持卡片样式
      &.psychological-card::before {
        background: linear-gradient(135deg, #FFCACA 0%, #FFB8B8 100%);
      }
      
      // 法律护航卡片样式
      &.legal-card::before {
        background: linear-gradient(135deg, #A0E8D8 0%, #7DE0C8 100%);
      }
    }
  }
  
  .home-indicator {
    position: fixed;
    bottom: 8rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 268rpx;
    height: 8rpx;
    background-color: #000000;
    border-radius: 4rpx;
  }
}
</style> 