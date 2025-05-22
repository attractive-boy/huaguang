<template>
  <view class="legal-apply-page">
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
      <view class="subtitle">法律护航</view>
      
      <!-- 背景几何图案 -->
      <view class="bg-shapes">
        <view class="shape shape-1"></view>
        <view class="shape shape-2"></view>
        <view class="shape shape-3"></view>
      </view>
    </view>
    
    <!-- 主内容区域 -->
    <view class="content-area">
      <view class="form-card">
        <!-- 基本材料区域 -->
        <view class="section">
          <view class="section-title">基本材料</view>
          
          <!-- 身份证正反面照片上传 -->
          <view class="upload-item">
            <uv-upload 
              :fileList="formData.idCardImages" 
              name="idCard"
              multiple 
              :maxCount="2" 
              @afterRead="afterRead"
              @delete="deletePic"
              :width="690"
              :height="240"
            >
              <view class="upload-box" v-if="!formData.idCardImages || formData.idCardImages.length === 0">
                <uv-icon name="plus" color="#CCCCCC" size="60"></uv-icon>
                <text class="upload-text">上传身份证正反面照片</text>
              </view>
            </uv-upload>
          </view>
          
          <!-- 劳动合同或工作证明上传 -->
          <view class="upload-item">
            <uv-upload 
              :fileList="formData.contractImages" 
              name="contract"
              multiple 
              :maxCount="3" 
              @afterRead="afterRead"
              @delete="deletePic"
              :width="690"
              :height="240"
            >
              <view class="upload-box" v-if="!formData.contractImages || formData.contractImages.length === 0">
                <uv-icon name="plus" color="#CCCCCC" size="60"></uv-icon>
                <text class="upload-text">劳动合同或工作证明</text>
              </view>
            </uv-upload>
          </view>
          
          <!-- 欠薪证明或相关证据上传 -->
          <view class="upload-item">
            <uv-upload 
              :fileList="formData.evidenceImages" 
              name="evidence"
              multiple 
              :maxCount="5" 
              @afterRead="afterRead"
              @delete="deletePic"
              :width="690"
              :height="240"
            >
              <view class="upload-box" v-if="!formData.evidenceImages || formData.evidenceImages.length === 0">
                <uv-icon name="plus" color="#CCCCCC" size="60"></uv-icon>
                <text class="upload-text">欠薪证明或相关证据</text>
                <text class="upload-sub-text">(如工资单、聊天记录)</text>
              </view>
            </uv-upload>
          </view>
        </view>
        
        <!-- 纠纷说明区域 -->
        <view class="section">
          <view class="section-title">纠纷说明</view>
          <view class="textarea-container">
            <textarea 
              class="dispute-textarea"
              v-model="formData.disputeDescription"
              placeholder="时间、原因、公司名称"
              maxlength="500"
              :show-confirm-bar="false"
            ></textarea>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部提交按钮 -->
    <view class="submit-section">
      <button class="submit-btn" @click="handleSubmit">提 交 审 核</button>
    </view>
    
    <!-- iOS Home Indicator -->
    <view class="home-indicator"></view>
  </view>
</template>

<script>
import config from '@/config/index.js'
import { uploadFile } from '@/utils/file.js'

export default {
  name: 'LegalApplyPage',
  data() {
    return {
      config: config,
      formData: {
        idCardImages: [],
        contractImages: [],
        evidenceImages: [],
        disputeDescription: ''
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.navigateTo({
            url: '/pages/user/fund/help-types/index'
          })
        }
      })
    },
    
    async afterRead(event) {
      let lists = [].concat(event.file)
      let fieldName = event.name
      
      // 根据上传类型确定对应的数组
      let targetArray
      switch(fieldName) {
        case 'idCard':
          targetArray = this.formData.idCardImages
          break
        case 'contract':
          targetArray = this.formData.contractImages
          break
        case 'evidence':
          targetArray = this.formData.evidenceImages
          break
        default:
          return
      }
      
      lists.map((item) => {
        targetArray.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      
      for (let i = 0; i < lists.length; i++) {
        try {
          const result = await uploadFile(lists[i].url)
          if (result.success) {
            targetArray[targetArray.length - lists.length + i] = {
              ...lists[i],
              status: 'success',
              message: '上传成功',
              url: result.data.url
            }
          } else {
            targetArray[targetArray.length - lists.length + i] = {
              ...lists[i],
              status: 'failed',
              message: '上传失败'
            }
          }
        } catch (error) {
          targetArray[targetArray.length - lists.length + i] = {
            ...lists[i],
            status: 'failed',
            message: '上传失败'
          }
        }
      }
    },
    
    deletePic(event) {
      let fieldName = event.name
      let index = event.index
      
      switch(fieldName) {
        case 'idCard':
          this.formData.idCardImages.splice(index, 1)
          break
        case 'contract':
          this.formData.contractImages.splice(index, 1)
          break
        case 'evidence':
          this.formData.evidenceImages.splice(index, 1)
          break
      }
    },
    
    validateForm() {
      if (this.formData.idCardImages.length === 0) {
        uni.showToast({
          title: '请上传身份证照片',
          icon: 'none'
        })
        return false
      }
      
      if (this.formData.contractImages.length === 0) {
        uni.showToast({
          title: '请上传劳动合同或工作证明',
          icon: 'none'
        })
        return false
      }
      
      if (this.formData.evidenceImages.length === 0) {
        uni.showToast({
          title: '请上传欠薪证明或相关证据',
          icon: 'none'
        })
        return false
      }
      
      if (!this.formData.disputeDescription.trim()) {
        uni.showToast({
          title: '请填写纠纷说明',
          icon: 'none'
        })
        return false
      }
      
      return true
    },
    
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      // 检查是否有文件正在上传
      const allImages = [
        ...this.formData.idCardImages,
        ...this.formData.contractImages,
        ...this.formData.evidenceImages
      ]
      
      const uploadingImages = allImages.filter(img => img.status === 'uploading')
      if (uploadingImages.length > 0) {
        uni.showToast({
          title: '文件上传中，请稍候',
          icon: 'none'
        })
        return
      }
      
      const failedImages = allImages.filter(img => img.status === 'failed')
      if (failedImages.length > 0) {
        uni.showToast({
          title: '部分文件上传失败，请重新上传',
          icon: 'none'
        })
        return
      }
      
      try {
        uni.showLoading({
          title: '提交中...'
        })
        
        // 构建提交数据
        const submitData = {
          type: 'legal', // 法律护航类型
          idCardImages: this.formData.idCardImages.map(img => img.url),
          contractImages: this.formData.contractImages.map(img => img.url),
          evidenceImages: this.formData.evidenceImages.map(img => img.url),
          disputeDescription: this.formData.disputeDescription.trim()
        }
        
        // TODO: 调用提交API
        console.log('提交数据:', submitData)
        
        // 模拟提交成功
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: '提交成功',
            icon: 'success'
          })
          
          // 提交成功后返回上一页
          setTimeout(() => {
            this.goBack()
          }, 1500)
        }, 2000)
        
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '提交失败，请重试',
          icon: 'none'
        })
        console.error('提交失败:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.legal-apply-page {
  min-height: 100vh;
  background-color: #F0F4F8;
  position: relative;
  
  .status-bar {
    height: var(--status-bar-height);
    background: transparent;
  }
  
  .page-header {
    position: relative;
    background: linear-gradient(135deg, #4A90E2 0%, #87CEFA 100%);
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
      margin-bottom: 10rpx;
      z-index: 10;
      position: relative;
    }
    
    .subtitle {
      color: #FFFFFF;
      font-size: 36rpx;
      font-weight: bold;
      line-height: 1.2;
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
    background-color: #F0F4F8;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    margin-top: -40rpx;
    position: relative;
    z-index: 2;
    padding: 30rpx 30rpx 20rpx;
    
    .form-card {
      background: #FFFFFF;
      border-radius: 32rpx;
      padding: 40rpx 30rpx;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
      
      .section {
        margin-bottom: 50rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .section-title {
          font-size: 32rpx;
          color: #333333;
          font-weight: 600;
          margin-bottom: 30rpx;
        }
        
        .upload-item {
          margin-bottom: 30rpx;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .upload-box {
            width: 100%;
            height: 240rpx;
            background-color: #F5F5F7;
            border-radius: 16rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16rpx;
            
            .upload-text {
              color: #888888;
              font-size: 28rpx;
              text-align: center;
            }
            
            .upload-sub-text {
              color: #AAAAAA;
              font-size: 24rpx;
              text-align: center;
            }
          }
        }
        
        .textarea-container {
          .dispute-textarea {
            width: 100%;
            min-height: 200rpx;
            background-color: #F5F5F7;
            border-radius: 16rpx;
            padding: 20rpx;
            font-size: 28rpx;
            color: #333333;
            line-height: 1.5;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  
  .submit-section {
    padding: 30rpx 30rpx 60rpx;
    
    .submit-btn {
      width: 100%;
      height: 88rpx;
      background: #4A90E2;
      border-radius: 44rpx;
      color: #FFFFFF;
      font-size: 36rpx;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      letter-spacing: 4rpx;
      
      &:active {
        opacity: 0.8;
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

// 上传组件样式覆盖
:deep(.uv-upload__wrap) {
  width: 100% !important;
  
  .uv-upload__wrap__item {
    width: 100% !important;
    height: 240rpx !important;
    margin: 0 0 20rpx 0 !important;
    
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
  
  .uv-upload__wrap__item__image {
    width: 100% !important;
    height: 240rpx !important;
    object-fit: cover;
    border-radius: 16rpx;
  }
}
</style> 