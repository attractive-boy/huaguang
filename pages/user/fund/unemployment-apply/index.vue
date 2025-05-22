<template>
  <view class="unemployment-apply-page">
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
      <view class="main-title">青年帮扶基金申请</view>
      
      <!-- 副标题 -->
      <view class="subtitle">失业援助</view>
      
      <!-- 背景几何图案 -->
      <view class="bg-shapes">
        <view class="shape shape-1"></view>
        <view class="shape shape-2"></view>
        <view class="shape shape-3"></view>
      </view>
    </view>
    
    <!-- 主体内容卡片 -->
    <view class="content-card">
      <!-- 基本材料区域 -->
      <view class="section">
        <view class="section-title">基本材料</view>
        
        <!-- 上传身份证照片区域 -->
        <view class="upload-area" @click="uploadIdCard">
          <uv-icon name="plus" color="#C7C7CC" size="40"></uv-icon>
          <text class="upload-text">上传身份证正反面照片</text>
        </view>
        
        <!-- 上传失业证明区域 -->
        <view class="upload-area" @click="uploadUnemploymentProof">
          <uv-icon name="plus" color="#C7C7CC" size="40"></uv-icon>
          <view class="upload-text-group">
            <text class="upload-text-main">最近1个月的失业证明</text>
            <text class="upload-text-sub">(如离职证明、社保停缴记录等)</text>
          </view>
        </view>
      </view>
      
      <!-- 个人简历区域 -->
      <view class="section">
        <view class="section-title">
          <text class="title-main">个人简历</text>
          <text class="title-optional">(选填)</text>
        </view>
        
        <!-- 上传个人简历区域 -->
        <view class="upload-area" @click="uploadResume">
          <uv-icon name="plus" color="#C7C7CC" size="40"></uv-icon>
          <text class="upload-text">个人简历 (用于就业推荐)</text>
        </view>
      </view>
    </view>
    
    <!-- 提交按钮 -->
    <view class="submit-button-container">
      <view class="submit-button" @click="submitApplication">
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
  name: 'UnemploymentApplyPage',
  data() {
    return {
      config: config,
      uploadedFiles: {
        idCard: [],
        unemploymentProof: [],
        resume: []
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
    
    uploadIdCard() {
      uni.chooseImage({
        count: 2,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.uploadedFiles.idCard = res.tempFilePaths
          uni.showToast({
            title: '身份证照片已选择',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          })
        }
      })
    },
    
    uploadUnemploymentProof() {
      uni.chooseImage({
        count: 5,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.uploadedFiles.unemploymentProof = res.tempFilePaths
          uni.showToast({
            title: '失业证明已选择',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          })
        }
      })
    },
    
    uploadResume() {
      uni.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.uploadedFiles.resume = res.tempFilePaths
          uni.showToast({
            title: '简历文件已选择',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '选择文件失败',
            icon: 'none'
          })
        }
      })
    },
    
    submitApplication() {
      // 验证必填项
      if (this.uploadedFiles.idCard.length === 0) {
        uni.showToast({
          title: '请上传身份证照片',
          icon: 'none'
        })
        return
      }
      
      if (this.uploadedFiles.unemploymentProof.length === 0) {
        uni.showToast({
          title: '请上传失业证明',
          icon: 'none'
        })
        return
      }
      
      // 显示提交确认
      uni.showModal({
        title: '确认提交',
        content: '确定要提交失业援助申请吗？',
        success: (res) => {
          if (res.confirm) {
            this.doSubmit()
          }
        }
      })
    },
    
    doSubmit() {
      uni.showLoading({
        title: '提交中...'
      })
      
      // 模拟提交过程
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '申请已提交，请等待审核',
          icon: 'success',
          duration: 2000
        })
        
        // 提交成功后返回上一页
        setTimeout(() => {
          this.goBack()
        }, 2000)
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.unemployment-apply-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #65A7F4 0%, #3A8BEE 100%);
  position: relative;
  
  .status-bar {
    height: var(--status-bar-height);
    background: transparent;
  }
  
  .page-header {
    position: relative;
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
      font-size: 48rpx;
      font-weight: bold;
      line-height: 1.2;
      margin-bottom: 16rpx;
      z-index: 10;
      position: relative;
    }
    
    .subtitle {
      color: #FFFFFF;
      font-size: 40rpx;
      font-weight: 600;
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
  
  .content-card {
    background: #FFFFFF;
    border-top-left-radius: 32rpx;
    border-top-right-radius: 32rpx;
    margin-top: -32rpx;
    position: relative;
    z-index: 2;
    padding: 40rpx 30rpx 240rpx;
    min-height: calc(100vh - 300rpx);
    
    .section {
      margin-bottom: 60rpx;
      
      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 24rpx;
        
        .title-main {
          color: #333333;
        }
        
        .title-optional {
          color: #999999;
          font-weight: normal;
        }
      }
      
      .upload-area {
        background: #F2F2F7;
        border-radius: 16rpx;
        padding: 50rpx 40rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 32rpx;
        min-height: 200rpx;
        
        .upload-text {
          color: #8E8E93;
          font-size: 28rpx;
          margin-top: 16rpx;
          text-align: center;
        }
        
        .upload-text-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 16rpx;
          
          .upload-text-main {
            color: #8E8E93;
            font-size: 28rpx;
            text-align: center;
            margin-bottom: 8rpx;
          }
          
          .upload-text-sub {
            color: #AEAEB2;
            font-size: 24rpx;
            text-align: center;
          }
        }
      }
    }
  }
  
  .submit-button-container {
    position: fixed;
    bottom: 60rpx;
    left: 30rpx;
    right: 30rpx;
    z-index: 10;
    
    .submit-button {
      background: #007AFF;
      border-radius: 50rpx;
      height: 96rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8rpx 24rpx rgba(0, 122, 255, 0.3);
      
      .submit-text {
        color: #FFFFFF;
        font-size: 34rpx;
        font-weight: bold;
        letter-spacing: 8rpx;
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