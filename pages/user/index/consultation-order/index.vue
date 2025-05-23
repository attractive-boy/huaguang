<template>
  <view class="consultation-order-page">
    <!-- 自定义导航栏 -->
    <uv-navbar 
      title="咨询订单" 
      :autoBack="true"
      leftText="返回"
      bgColor="#6A9EFF"
      leftIconColor="#FFFFFF"
      :titleStyle="{ color: '#FFFFFF' }"
    ></uv-navbar>
    
    <!-- 主内容区域 -->
    <view class="main-content">
      <!-- 律师信息卡片 -->
      <view class="lawyer-card">
        <view class="lawyer-avatar">
          <view class="avatar-placeholder"></view>
        </view>
        <view class="lawyer-info">
          <text class="lawyer-name">{{ lawyerInfo.name }}</text>
          <view class="lawyer-tag">
            <text class="tag-text">{{ lawyerInfo.specialty }}</text>
          </view>
        </view>
      </view>
      
      <!-- 咨询类型选择卡片 -->
      <view class="consultation-type-card">
        <view 
          class="type-option" 
          :class="{ 'option-selected': selectedConsultationType === 'text' }"
          @click="selectConsultationType('text')"
        >
          <view class="option-icon text-icon">
            <view class="icon-rect"></view>
            <view class="icon-lines">
              <view class="line"></view>
              <view class="line"></view>
              <view class="line"></view>
            </view>
          </view>
          <view class="option-text">
            <text class="option-title">图文咨询</text>
            <text class="option-desc">文字形式咨询</text>
          </view>
        </view>
        
        <view 
          class="type-option" 
          :class="{ 'option-selected': selectedConsultationType === 'voice' }"
          @click="selectConsultationType('voice')"
        >
          <view class="option-icon voice-icon">
            <view class="phone-icon"></view>
          </view>
          <view class="option-text">
            <text class="option-title">语言咨询</text>
            <text class="option-desc">网络语言或视频形式咨询</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部行动按钮 -->
    <view class="action-button-area">
      <uv-button 
        text="立刻咨询"
        type="primary"
        :customStyle="{
          backgroundColor: '#2979FF',
          borderRadius: '12rpx',
          height: '88rpx',
          fontSize: '36rpx',
          fontWeight: 'bold'
        }"
        @click="handleConsultation"
      ></uv-button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ConsultationOrder',
  data() {
    return {
      selectedConsultationType: 'voice', // 默认选中语言咨询
      lawyerInfo: {
        name: '李律师',
        specialty: '劳动法专长'
      }
    }
  },
  methods: {
    // 选择咨询类型
    selectConsultationType(type) {
      this.selectedConsultationType = type
    },
    
    // 处理立即咨询按钮点击
    handleConsultation() {
      console.log('选择的咨询类型:', this.selectedConsultationType)
      
      // 跳转到订单详情页面，传递参数
      uni.navigateTo({
        url: `/pages/user/index/order-detail/index?consultationType=${this.selectedConsultationType}&lawyerName=${this.lawyerInfo.name}&lawyerSpecialty=${this.lawyerInfo.specialty}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.consultation-order-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #87CEEB 0%, #ADD8E6 50%, #F0F8FF 100%);
  position: relative;
}

.main-content {
  padding: 200rpx 40rpx 200rpx;
}

/* 律师信息卡片样式 */
.lawyer-card {
  background: #FFFFFF;
  border-radius: 32rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
}

.lawyer-avatar {
  margin-right: 24rpx;
}

.avatar-placeholder {
  width: 120rpx;
  height: 120rpx;
  background: #D8D8D8;
  border-radius: 50%;
}

.lawyer-info {
  flex: 1;
}

.lawyer-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333333;
  display: block;
  margin-bottom: 12rpx;
}

.lawyer-tag {
  background: #2979FF;
  border-radius: 8rpx;
  padding: 8rpx 16rpx;
  display: inline-block;
}

.tag-text {
  color: #FFFFFF;
  font-size: 24rpx;
}

/* 咨询类型选择卡片样式 */
.consultation-type-card {
  background: #FFFFFF;
  border-radius: 32rpx;
  padding: 30rpx;
}

.type-option {
  background: #F8F9FA;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.type-option:last-child {
  margin-bottom: 0;
}

.option-selected {
  border-color: #5D9BFF !important;
}

.option-icon {
  width: 80rpx;
  height: 80rpx;
  background: #87B8FF;
  border-radius: 12rpx;
  margin-right: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* 图文咨询图标 */
.text-icon {
  flex-direction: column;
}

.icon-rect {
  width: 24rpx;
  height: 18rpx;
  background: #FFFFFF;
  border-radius: 2rpx;
  margin-bottom: 4rpx;
}

.icon-lines {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
}

.line {
  width: 20rpx;
  height: 2rpx;
  background: #FFFFFF;
}

/* 语言咨询图标 */
.phone-icon {
  width: 32rpx;
  height: 32rpx;
  background: #FFFFFF;
  border-radius: 6rpx 6rpx 6rpx 16rpx;
  position: relative;
}

.phone-icon::before {
  content: '';
  position: absolute;
  top: 6rpx;
  left: 6rpx;
  width: 20rpx;
  height: 20rpx;
  border: 2rpx solid #87B8FF;
  border-radius: 2rpx;
}

.option-text {
  flex: 1;
}

.option-title {
  font-size: 32rpx;
  color: #333333;
  display: block;
  margin-bottom: 8rpx;
}

.option-desc {
  font-size: 24rpx;
  color: #888888;
}

/* 底部按钮区域 */
.action-button-area {
  position: fixed;
  bottom: 60rpx;
  left: 40rpx;
  right: 40rpx;
  z-index: 100;
}
</style> 