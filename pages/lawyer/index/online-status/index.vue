<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 导航区域 -->
    <view class="navigation-area">
      <view class="back-button" @click="goBack">
        <uv-icon name="arrow-left" color="#3B82F6" size="20"></uv-icon>
        <text class="back-text">返回</text>
      </view>
    </view>
    
    <!-- 插画区域 -->
    <view class="illustration-area">
      <view class="lawyer-illustration">
        <!-- 左侧男律师 -->
        <view class="lawyer-male">
          <view class="lawyer-head">
            <view class="hair male-hair"></view>
            <view class="face"></view>
          </view>
          <view class="lawyer-body">
            <view class="suit-jacket male-jacket"></view>
            <view class="shirt"></view>
            <view class="tie"></view>
            <view class="folder left-folder"></view>
          </view>
        </view>
        
        <!-- 右侧女律师 -->
        <view class="lawyer-female">
          <view class="lawyer-head">
            <view class="hair female-hair"></view>
            <view class="face"></view>
          </view>
          <view class="lawyer-body">
            <view class="suit-jacket female-jacket"></view>
            <view class="shirt"></view>
            <view class="badge">
              <uv-icon name="account-balance" color="#FFFFFF" size="12"></uv-icon>
            </view>
            <view class="folder right-folder"></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 设置卡片区域 -->
    <view class="settings-card">
      <!-- 接受新咨询设置 -->
      <view class="setting-item">
        <text class="setting-label">接受新咨询</text>
        <uv-switch 
          v-model="settings.acceptNewConsultation"
          :activeColor="switchActiveColor"
          :inactiveColor="switchInactiveColor"
          :size="switchSize"
          @change="onSwitchChange('acceptNewConsultation', $event)"
        ></uv-switch>
      </view>
      
      <!-- 分割线 -->
      <view class="divider"></view>
      
      <!-- 暂不接单设置 -->
      <view class="setting-item">
        <text class="setting-label">暂不接单</text>
        <uv-switch 
          v-model="settings.temporarilyUnavailable"
          :activeColor="switchActiveColor"
          :inactiveColor="switchInactiveColor"
          :size="switchSize"
          @change="onSwitchChange('temporarilyUnavailable', $event)"
        ></uv-switch>
      </view>
    </view>
    
    <!-- 说明文字区域 -->
    <view class="description-area">
      <text class="description-text">你可以随时切换当前在线状态，方便灵活安排接单时间。</text>
    </view>
    
    <!-- 操作按钮区域 -->
    <view class="action-area">
      <view class="save-button" @click="saveSettings">
        <text class="save-button-text">点击保存</text>
      </view>
    </view>
    
    <!-- iOS Home Indicator -->
    <view class="home-indicator"></view>
  </view>
</template>

<script>
export default {
  name: 'LawyerOnlineStatus',
  data() {
    return {
      statusBarHeight: 0,
      // 开关设置
      settings: {
        acceptNewConsultation: true,  // 接受新咨询 - 默认开启
        temporarilyUnavailable: false // 暂不接单 - 默认关闭
      },
      // 开关样式配置
      switchActiveColor: '#3B82F6',
      switchInactiveColor: '#CCCCCC',
      switchSize: 25
    }
  },
  onLoad() {
    // 获取状态栏高度
    this.getSystemInfo()
    // 加载保存的设置
    this.loadSettings()
  },
  methods: {
    // 获取系统信息
    getSystemInfo() {
      const systemInfo = uni.getSystemInfoSync()
      this.statusBarHeight = systemInfo.statusBarHeight || 20
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    
    // 开关状态改变处理
    onSwitchChange(key, value) {
      console.log(`设置项 ${key} 改变为:`, value)
      
      // 如果开启"暂不接单"，自动关闭"接受新咨询"
      if (key === 'temporarilyUnavailable' && value === true) {
        this.settings.acceptNewConsultation = false
      }
      // 如果开启"接受新咨询"，自动关闭"暂不接单"
      else if (key === 'acceptNewConsultation' && value === true) {
        this.settings.temporarilyUnavailable = false
      }
    },
    
    // 保存设置
    saveSettings() {
      try {
        // 保存到本地存储
        uni.setStorageSync('lawyer_online_status', this.settings)
        
        uni.showToast({
          title: '设置已保存',
          icon: 'success',
          duration: 2000
        })
        
        console.log('在线状态设置已保存:', this.settings)
      } catch (error) {
        console.error('保存设置失败:', error)
        uni.showToast({
          title: '保存失败',
          icon: 'error',
          duration: 2000
        })
      }
    },
    
    // 加载保存的设置
    loadSettings() {
      try {
        const savedSettings = uni.getStorageSync('lawyer_online_status')
        if (savedSettings) {
          this.settings = { ...this.settings, ...savedSettings }
          console.log('已加载保存的设置:', this.settings)
        }
      } catch (error) {
        console.error('加载设置失败:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #F0F8FF 0%, #E6F7FF 30%, #D6EFFF 60%, #F0F8FF 100%);
  position: relative;
  overflow: hidden;
}

/* 云彩背景效果 */
.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(214, 239, 255, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 40%, rgba(214, 239, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(214, 239, 255, 0.25) 0%, transparent 50%);
  pointer-events: none;
}

.status-bar {
  width: 100%;
}

.navigation-area {
  padding: 10rpx 30rpx;
  position: relative;
  z-index: 10;
}

.back-button {
  display: flex;
  align-items: center;
  width: fit-content;
}

.back-text {
  color: #3B82F6;
  font-size: 32rpx;
  margin-left: 8rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.illustration-area {
  padding: 40rpx 30rpx;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.lawyer-illustration {
  display: flex;
  align-items: flex-end;
  gap: 60rpx;
}

.lawyer-male, .lawyer-female {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lawyer-head {
  position: relative;
  margin-bottom: 20rpx;
}

.hair {
  width: 80rpx;
  height: 60rpx;
  background-color: #333333;
  border-radius: 40rpx 40rpx 20rpx 20rpx;
  position: relative;
}

.male-hair {
  border-radius: 40rpx 40rpx 10rpx 10rpx;
}

.female-hair {
  width: 90rpx;
  height: 70rpx;
  border-radius: 45rpx 45rpx 25rpx 25rpx;
}

.face {
  width: 70rpx;
  height: 70rpx;
  background-color: #FCE9C9;
  border-radius: 50%;
  position: absolute;
  top: 30rpx;
  left: 50%;
  transform: translateX(-50%);
}

.lawyer-body {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.suit-jacket {
  width: 120rpx;
  height: 160rpx;
  background-color: #4A90E2;
  border-radius: 20rpx 20rpx 0 0;
  position: relative;
}

.male-jacket::before {
  content: '';
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 80rpx;
  height: 100rpx;
  background-color: #FFFFFF;
  border-radius: 10rpx;
}

.female-jacket {
  border-radius: 20rpx 20rpx 0 0;
}

.female-jacket::before {
  content: '';
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 80rpx;
  height: 100rpx;
  background-color: #FFFFFF;
  border-radius: 10rpx 10rpx 0 0;
}

.shirt {
  width: 80rpx;
  height: 80rpx;
  background-color: #FFFFFF;
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10rpx;
}

.tie {
  width: 20rpx;
  height: 60rpx;
  background-color: #1E3A8A;
  position: absolute;
  top: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 10rpx 10rpx;
}

.badge {
  position: absolute;
  top: 30rpx;
  right: 10rpx;
  width: 30rpx;
  height: 30rpx;
  background-color: #3B82F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.folder {
  width: 40rpx;
  height: 50rpx;
  background-color: #1E3A8A;
  border-radius: 5rpx;
  position: absolute;
  top: 80rpx;
}

.left-folder {
  left: -20rpx;
}

.right-folder {
  right: -20rpx;
}

.settings-card {
  margin: 40rpx 30rpx;
  background-color: #FFFFFF;
  border-radius: 24rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0px 8rpx 24rpx rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 0;
}

.setting-label {
  color: #333333;
  font-size: 32rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.divider {
  height: 1rpx;
  background-color: #E0E0E0;
  margin: 30rpx 0;
}

.description-area {
  padding: 0 40rpx;
  margin-bottom: 60rpx;
  position: relative;
  z-index: 10;
}

.description-text {
  color: #666666;
  font-size: 26rpx;
  line-height: 1.5;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.action-area {
  padding: 0 50rpx;
  margin-bottom: 80rpx;
  position: relative;
  z-index: 10;
}

.save-button {
  width: 100%;
  height: 88rpx;
  background-color: #3B82F6;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4rpx 12rpx rgba(59, 130, 246, 0.3);
}

.save-button-text {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.home-indicator {
  position: fixed;
  bottom: 10rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 100rpx;
  height: 8rpx;
  background-color: #000000;
  border-radius: 4rpx;
  z-index: 20;
}

/* 响应式适配 */
@media screen and (max-width: 375px) {
  .lawyer-illustration {
    gap: 40rpx;
  }
  
  .suit-jacket {
    width: 100rpx;
    height: 140rpx;
  }
  
  .settings-card {
    margin: 30rpx 20rpx;
    padding: 30rpx 25rpx;
  }
}

/* 按钮点击效果 */
.save-button:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

.back-button:active {
  opacity: 0.7;
  transition: opacity 0.1s ease;
}
</style> 