<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-content">
        <!-- 返回按钮 -->
        <view class="back-button" @click="goBack">
          <uv-icon name="arrow-left" :size="16" color="#409EFF"></uv-icon>
          <text class="back-text">返回</text>
        </view>
      </view>
    </view>
    
    <!-- 主内容滚动区域 -->
    <scroll-view 
      class="main-scroll-view" 
      scroll-y="true" 
      :style="{ height: scrollViewHeight + 'px' }"
      enable-back-to-top="true"
      show-scrollbar="false"
    >
      <!-- 主内容卡片 -->
      <view class="main-content-card">
        <!-- 卡片标题区域 -->
        <view class="card-title-section">
          <view class="title-left">
            <text class="main-title">劳动仲裁申请书</text>
            <text class="date-time">2025年5月6日 14:33</text>
          </view>
          <view class="status-badge">
            <text class="status-text">待审核</text>
          </view>
        </view>
        
        <!-- 引言段落 -->
        <view class="intro-paragraph">
          <text class="intro-text">仲裁委员会：</text>
          <text class="intro-text">申请人因与用人单位发生劳动争议，现依据《中华人民共和国劳动争议调解仲裁法》的有关规定，向贵委员会申请仲裁，请依法受理。</text>
        </view>
        
        <!-- 一、申请人基本信息 -->
        <view class="section">
          <text class="section-title">一、申请人基本信息</text>
          <view class="info-list">
            <text class="info-item">姓名：张三</text>
            <text class="info-item">性别：男</text>
            <text class="info-item">出生日期：1995年6月1日</text>
            <text class="info-item">身份证号：32010119950601XXXX</text>
            <text class="info-item">联系电话：138XXXXXXXX</text>
            <text class="info-item">联系地址：江苏省南京市玄武区××小区×号楼</text>
          </view>
        </view>
        
        <!-- 二、被申请人基本信息 -->
        <view class="section">
          <text class="section-title">二、被申请人基本信息</text>
          <view class="info-list">
            <text class="info-item">单位名称：南京某科技有限公司</text>
            <text class="info-item">法定代表人：李四</text>
            <text class="info-item">单位地址：江苏省南京市雨花台区××路×号</text>
            <text class="info-item">联系电话：025-8XXXXXXX</text>
          </view>
        </view>
        
        <!-- 三、仲裁请求 -->
        <view class="section">
          <text class="section-title">三、仲裁请求</text>
          <view class="request-list">
            <text class="request-item">1. 请求被申请人支付2024年11月至2025年1月的工资共计人民币15,000元；</text>
            <text class="request-item">2. 请求被申请人支付经济补偿金人民币5,000元；</text>
            <text class="request-item">3. 请求被申请人出具解除劳动关系证明；</text>
            <text class="request-item">4. 请求仲裁费用由被申请人承担。</text>
          </view>
        </view>
        
        <!-- 四、事实与理由 -->
        <view class="section">
          <text class="section-title">四、事实与理由</text>
          <view class="reason-paragraph">
            <text class="reason-text">申请人自2022年5月入职被申请人单位，担任软件工程师一职，双方签订了为期三年的劳动合同。但自2024年11月起，被申请人以经营困难为由拖欠申请人工资。2025年1月20日，被申请人未经协商，单方面以口头方式解除了与申请人的劳动合同，并拒绝出具解除证明及支付相应补偿金。</text>
            <text class="reason-text">申请人多次与单位协商无果，现依法提起劳动仲裁，望依法维护申请人合法权益。</text>
          </view>
        </view>
        
        <!-- 落款区域 -->
        <view class="signature-section">
          <text class="signature-item signature-left">此致</text>
          <text class="signature-item signature-right">南京市劳动争议仲裁委员会</text>
          <text class="signature-item signature-right">申请人：张三</text>
          <text class="signature-item signature-right">2025年5月7日</text>
        </view>
      </view>
      
      <!-- 附件链接区域 -->
      <view class="attachment-section" @click="viewAttachment">
        <view class="attachment-content">
          <uv-icon name="file-text" :size="24" color="#409EFF"></uv-icon>
          <text class="attachment-text">证据材料.pdf</text>
        </view>
      </view>
      
      <!-- 操作按钮区域 -->
      <view class="action-buttons">
        <uv-button 
          type="primary" 
          shape="circle" 
          size="large"
          :custom-style="{ marginBottom: '15px' }"
          @click="handleApprove"
        >
          确认通过
        </uv-button>
        <uv-button 
          type="error" 
          shape="circle" 
          size="large"
          @click="handleReject"
        >
          驳回
        </uv-button>
      </view>
    </scroll-view>
    
    <!-- 底部标签导航栏 -->
    <view class="bottom-tab-bar">
      <view class="tab-divider"></view>
      <view class="tab-content">
        <view class="tab-item tab-active">
          <uv-icon name="home" :size="22" color="#409EFF"></uv-icon>
          <text class="tab-text tab-text-active">首页</text>
        </view>
        <view class="tab-item">
          <uv-icon name="chat" :size="22" color="#8A8A8E"></uv-icon>
          <text class="tab-text">信息</text>
        </view>
        <view class="tab-item">
          <uv-icon name="account" :size="22" color="#8A8A8E"></uv-icon>
          <text class="tab-text">我的</text>
        </view>
      </view>
      <!-- iOS Home Indicator -->
      <view class="home-indicator"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollViewHeight: 400
    }
  },
  
  mounted() {
    this.calculateScrollViewHeight()
  },
  
  methods: {
    // 计算滚动容器高度
    calculateScrollViewHeight() {
      const systemInfo = uni.getSystemInfoSync()
      const statusBarHeight = systemInfo.statusBarHeight || 44
      const navbarHeight = 88 // 自定义导航栏高度
      const tabBarHeight = 100 // 底部标签栏高度（包含安全区域）
      
      this.scrollViewHeight = systemInfo.windowHeight - statusBarHeight - navbarHeight - tabBarHeight
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 查看附件
    viewAttachment() {
      uni.showToast({
        title: '查看证据材料',
        icon: 'none'
      })
    },
    
    // 确认通过
    handleApprove() {
      uni.showModal({
        title: '确认操作',
        content: '确定要通过这份劳动仲裁申请书吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '审核通过',
              icon: 'success'
            })
            // 这里可以添加实际的审核通过逻辑
          }
        }
      })
    },
    
    // 驳回申请
    handleReject() {
      uni.showModal({
        title: '确认操作',
        content: '确定要驳回这份劳动仲裁申请书吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '已驳回',
              icon: 'none'
            })
            // 这里可以添加实际的驳回逻辑
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #EBF4FF 0%, #F8FBFF 100%);
}

/* 状态栏占位 */
.status-bar {
  height: var(--status-bar-height);
  background: transparent;
}

/* 自定义导航栏 */
.custom-navbar {
  height: 88rpx;
  background: transparent;
  
  .navbar-content {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    
    .back-button {
      display: flex;
      align-items: center;
      
      .back-text {
        margin-left: 10rpx;
        font-size: 32rpx;
        color: #409EFF;
        font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
      }
    }
  }
}

/* 主内容滚动区域 */
.main-scroll-view {
  padding: 0 20rpx 30rpx 20rpx;
}

/* 主内容卡片 */
.main-content-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

/* 卡片标题区域 */
.card-title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30rpx;
  
  .title-left {
    flex: 1;
    
    .main-title {
      display: block;
      font-size: 44rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 10rpx;
      font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    }
    
    .date-time {
      display: block;
      font-size: 24rpx;
      color: #999999;
      font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    }
  }
  
  .status-badge {
    background: #EBF4FF;
    border: 2rpx solid #409EFF;
    border-radius: 8rpx;
    padding: 6rpx 16rpx;
    
    .status-text {
      font-size: 22rpx;
      color: #409EFF;
      font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    }
  }
}

/* 引言段落 */
.intro-paragraph {
  margin-bottom: 30rpx;
  
  .intro-text {
    display: block;
    font-size: 28rpx;
    color: #303133;
    line-height: 1.6;
    margin-bottom: 8rpx;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 章节样式 */
.section {
  margin-bottom: 30rpx;
  
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    color: #303133;
    margin-bottom: 16rpx;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
  }
}

/* 信息列表 */
.info-list {
  .info-item {
    display: block;
    font-size: 28rpx;
    color: #303133;
    line-height: 1.7;
    margin-bottom: 8rpx;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 请求列表 */
.request-list {
  .request-item {
    display: block;
    font-size: 28rpx;
    color: #303133;
    line-height: 1.7;
    margin-bottom: 8rpx;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 事实与理由段落 */
.reason-paragraph {
  .reason-text {
    display: block;
    font-size: 28rpx;
    color: #303133;
    line-height: 1.6;
    margin-bottom: 16rpx;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 落款区域 */
.signature-section {
  margin-top: 40rpx;
  
  .signature-item {
    display: block;
    font-size: 28rpx;
    color: #303133;
    margin-bottom: 10rpx;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    
    &.signature-left {
      text-align: left;
      margin-bottom: 20rpx;
    }
    
    &.signature-right {
      text-align: right;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 附件链接区域 */
.attachment-section {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 20rpx 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  
  .attachment-content {
    display: flex;
    align-items: center;
    
    .attachment-text {
      margin-left: 20rpx;
      font-size: 30rpx;
      color: #303133;
      font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
    }
  }
}

/* 操作按钮区域 */
.action-buttons {
  padding: 0 10rpx;
  margin-bottom: 20rpx;
}

/* 底部标签导航栏 */
.bottom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  
  .tab-divider {
    height: 2rpx;
    background: #EFEFEF;
  }
  
  .tab-content {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 20rpx;
    
    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      
      .tab-text {
        margin-top: 4rpx;
        font-size: 20rpx;
        color: #8A8A8E;
        font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
        
        &.tab-text-active {
          color: #409EFF;
        }
      }
    }
  }
  
  .home-indicator {
    height: 20rpx;
    width: 100rpx;
    background: #000000;
    border-radius: 10rpx;
    margin: 10rpx auto;
  }
}

/* 适配安全区域 */
.bottom-tab-bar {
  padding-bottom: env(safe-area-inset-bottom);
}
</style> 