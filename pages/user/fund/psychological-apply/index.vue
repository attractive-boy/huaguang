<template>
  <view class="psychological-apply-page">
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
      <view class="subtitle">心理支持</view>
    </view>
    
    <!-- 主内容容器 -->
    <view class="main-content">
      <!-- 基本材料区域 -->
      <view class="form-section">
        <view class="section-title">基本材料</view>
        <view class="upload-area" @click="uploadIdCard">
          <uv-icon name="plus" color="#BDBDBD" size="24"></uv-icon>
          <text class="upload-text">上传身份证正反面照片</text>
        </view>
      </view>
      
      <!-- 心理困扰区域 -->
      <view class="form-section">
        <view class="section-title">心理困扰</view>
        <view class="input-area">
          <textarea 
            class="textarea-input"
            placeholder="简要说明心理困扰的现状与持续时间"
            v-model="formData.psychologicalIssue"
            maxlength="500"
          ></textarea>
        </view>
      </view>
      
      <!-- 问诊资料区域 -->
      <view class="form-section">
        <view class="section-title">
          <text class="title-main">问诊资料</text>
          <text class="title-optional">(选填)</text>
        </view>
        <view class="upload-area" @click="uploadMedicalRecord">
          <uv-icon name="plus" color="#BDBDBD" size="24"></uv-icon>
          <text class="upload-text">心理咨询记录或医院诊断</text>
        </view>
      </view>
    </view>
    
    <!-- 底部提交按钮 -->
    <view class="bottom-action">
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
  name: 'PsychologicalApplyPage',
  data() {
    return {
      config: config,
      formData: {
        idCardImages: [],
        psychologicalIssue: '',
        medicalRecords: []
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
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.idCardImages = res.tempFilePaths
          uni.showToast({
            title: '身份证照片上传成功',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '上传失败，请重试',
            icon: 'none'
          })
        }
      })
    },
    
    uploadMedicalRecord() {
      uni.chooseImage({
        count: 5,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res) => {
          this.formData.medicalRecords = res.tempFilePaths
          uni.showToast({
            title: '问诊资料上传成功',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '上传失败，请重试',
            icon: 'none'
          })
        }
      })
    },
    
    submitApplication() {
      // 验证必填项
      if (this.formData.idCardImages.length === 0) {
        uni.showToast({
          title: '请上传身份证照片',
          icon: 'none'
        })
        return
      }
      
      if (!this.formData.psychologicalIssue.trim()) {
        uni.showToast({
          title: '请填写心理困扰说明',
          icon: 'none'
        })
        return
      }
      
      // 提交申请
      uni.showLoading({
        title: '提交中...'
      })
      
      // 模拟提交过程
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '申请提交成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              this.goBack()
            }, 2000)
          }
        })
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.psychological-apply-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #5DADE2 0%, #AED6F1 100%);
  position: relative;
  
  .status-bar {
    height: var(--status-bar-height);
    background: transparent;
  }
  
  .page-header {
    position: relative;
    background: transparent;
    padding: 20rpx 30rpx 40rpx;
    
    .back-navigation {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      
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
      margin-bottom: 8rpx;
    }
    
    .subtitle {
      color: #FFFFFF;
      font-size: 36rpx;
      line-height: 1.5;
      opacity: 0.9;
    }
  }
  
  .main-content {
    background-color: #FFFFFF;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    margin: 0 5% 0 5%;
    padding: 30rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
    margin-bottom: 120rpx;
    
    .form-section {
      margin-bottom: 40rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .section-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333333;
        margin-bottom: 20rpx;
        
        .title-main {
          color: #333333;
        }
        
        .title-optional {
          color: #888888;
          font-weight: normal;
          font-size: 28rpx;
        }
      }
      
      .upload-area {
        background-color: #F5F5F5;
        border-radius: 12rpx;
        padding: 60rpx 30rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        .upload-text {
          color: #888888;
          font-size: 28rpx;
          margin-top: 16rpx;
          text-align: center;
        }
      }
      
      .input-area {
        background-color: #F5F5F5;
        border-radius: 12rpx;
        padding: 20rpx;
        
        .textarea-input {
          width: 100%;
          min-height: 80rpx;
          font-size: 28rpx;
          color: #333333;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          
          &::placeholder {
            color: #888888;
          }
        }
      }
    }
  }
  
  .bottom-action {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #5DADE2 0%, #AED6F1 100%);
    padding: 30rpx 5% 40rpx;
    
    .submit-button {
      background-color: #2979FF;
      border-radius: 50rpx;
      padding: 28rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4rpx 12rpx rgba(41, 121, 255, 0.3);
      
      .submit-text {
        color: #FFFFFF;
        font-size: 36rpx;
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