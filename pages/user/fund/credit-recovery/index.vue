<template>
  <view class="credit-recovery-page">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 页眉区域 -->
    <view class="page-header">
      <!-- 返回导航 -->
      <view class="back-navigation" @click="goBack">
        <uv-icon name="arrow-left" color="#FFFFFF" size="18"></uv-icon>
        <text class="back-text">返回</text>
      </view>
      
      <!-- 页面标题 -->
      <view class="page-title">申请信用记录恢复</view>
    </view>
    
    <!-- 主内容区域背景 -->
    <view class="content-background">
      <!-- 第一个内容卡片 - 借款逾期信息 -->
      <view class="content-card">
        <view class="card-section-title">借款逾期信息</view>
        
        <!-- 2x2 网格输入框 -->
        <view class="input-grid-2x2">
          <view class="input-row">
            <view class="input-field">
              <input 
                v-model="formData.loanInfo.bank" 
                placeholder="银行/平台" 
                placeholder-class="input-placeholder"
                class="input-control"
              />
            </view>
            <view class="input-field">
              <input 
                v-model="formData.loanInfo.loanTime" 
                placeholder="借款时间" 
                placeholder-class="input-placeholder"
                class="input-control"
              />
            </view>
          </view>
          <view class="input-row">
            <view class="input-field">
              <input 
                v-model="formData.loanInfo.amount" 
                placeholder="金额" 
                placeholder-class="input-placeholder"
                class="input-control"
              />
            </view>
            <view class="input-field">
              <input 
                v-model="formData.loanInfo.overdueTime" 
                placeholder="逾期时间" 
                placeholder-class="input-placeholder"
                class="input-control"
              />
            </view>
          </view>
        </view>
      </view>
      
      <!-- 第二个内容卡片 - 逾期记录补交 -->
      <view class="content-card">
        <view class="card-section-title">逾期记录补交</view>
        
        <!-- 1x2 输入框 -->
        <view class="input-grid-1x2">
          <view class="input-field">
            <input 
              v-model="formData.repaymentInfo.remainingAmount" 
              placeholder="剩余金额" 
              placeholder-class="input-placeholder"
              class="input-control"
            />
          </view>
          <view class="input-field">
            <input 
              v-model="formData.repaymentInfo.repaymentAmount" 
              placeholder="补交金额" 
              placeholder-class="input-placeholder"
              class="input-control"
            />
          </view>
        </view>
        
        <!-- 文件上传区域 -->
        <view class="file-upload-area" @click="handleScreenshotUpload">
          <view class="upload-icon">+</view>
          <view class="upload-text">上传补交截图</view>
        </view>
      </view>
      
      <!-- 底部提交按钮 -->
      <view class="submit-button" @click="handleSubmit">
        <text class="submit-text">提 交 审 核</text>
      </view>
    </view>
    
    <!-- iOS Home Indicator -->
    <view class="home-indicator"></view>
  </view>
</template>

<script>
import config from '@/config/index.js'

export default {
  name: 'CreditRecoveryPage',
  data() {
    return {
      config: config,
      formData: {
        loanInfo: {
          bank: '',
          loanTime: '',
          amount: '',
          overdueTime: ''
        },
        repaymentInfo: {
          remainingAmount: '',
          repaymentAmount: '',
          screenshot: null
        }
      }
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
    handleScreenshotUpload() {
      uni.showToast({
        title: '截图上传功能开发中',
        icon: 'none'
      })
    },
    handleSubmit() {
      // 简单的表单验证
      const { loanInfo, repaymentInfo } = this.formData
      
      if (!loanInfo.bank || !loanInfo.loanTime || !loanInfo.amount || !loanInfo.overdueTime) {
        uni.showToast({
          title: '请完善借款逾期信息',
          icon: 'none'
        })
        return
      }
      
      if (!repaymentInfo.remainingAmount || !repaymentInfo.repaymentAmount) {
        uni.showToast({
          title: '请完善补交信息',
          icon: 'none'
        })
        return
      }
      
      uni.showToast({
        title: '提交功能开发中',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-recovery-page {
  min-height: 100vh;
  background-color: #EBF4FA;
  position: relative;
  
  .status-bar {
    height: var(--status-bar-height);
    background: transparent;
  }
  
  .page-header {
    position: relative;
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
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
        font-weight: 500;
      }
    }
    
    .page-title {
      color: #FFFFFF;
      font-size: 40rpx;
      font-weight: 600;
      text-align: center;
      z-index: 10;
      position: relative;
    }
  }
  
  .content-background {
    background-color: #F0F5FF;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    margin-top: -40rpx;
    position: relative;
    z-index: 2;
    padding: 30rpx 30rpx 100rpx;
    min-height: calc(100vh - 300rpx);
    
    .content-card {
      background: #FFFFFF;
      border-radius: 30rpx;
      padding: 40rpx;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
      margin-bottom: 30rpx;
      
      .card-section-title {
        color: #333333;
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 30rpx;
      }
      
      .input-grid-2x2 {
        .input-row {
          display: flex;
          gap: 20rpx;
          margin-bottom: 20rpx;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .input-field {
            flex: 1;
            
            .input-control {
              background-color: #F7F7F7;
              border-radius: 12rpx;
              padding: 24rpx 20rpx;
              font-size: 28rpx;
              color: #333333;
              width: 100%;
              box-sizing: border-box;
              border: none;
              outline: none;
            }
            
            .input-placeholder {
              color: #AAAAAA;
            }
          }
        }
      }
      
      .input-grid-1x2 {
        display: flex;
        gap: 20rpx;
        margin-bottom: 30rpx;
        
        .input-field {
          flex: 1;
          
          .input-control {
            background-color: #F7F7F7;
            border-radius: 12rpx;
            padding: 24rpx 20rpx;
            font-size: 28rpx;
            color: #333333;
            width: 100%;
            box-sizing: border-box;
            border: none;
            outline: none;
          }
          
          .input-placeholder {
            color: #AAAAAA;
          }
        }
      }
      
      .file-upload-area {
        background-color: #F7F7F7;
        border-radius: 16rpx;
        padding: 60rpx 40rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200rpx;
        
        .upload-icon {
          color: #AAAAAA;
          font-size: 60rpx;
          font-weight: normal;
          line-height: 1;
          margin-bottom: 16rpx;
        }
        
        .upload-text {
          color: #AAAAAA;
          font-size: 28rpx;
          font-weight: normal;
          text-align: center;
        }
      }
    }
    
    .submit-button {
      background-color: #3B82F6;
      border-radius: 50rpx;
      height: 96rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      width: 90%;
      box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.3);
      
      .submit-text {
        color: #FFFFFF;
        font-size: 36rpx;
        font-weight: 600;
        letter-spacing: 8rpx;
      }
    }
  }
  
  .home-indicator {
    position: fixed;
    bottom: 16rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 268rpx;
    height: 8rpx;
    background-color: #000000;
    border-radius: 4rpx;
  }
}
</style> 