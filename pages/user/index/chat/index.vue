<template>
  <view class="chat-page">
    <!-- 系统状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-content">
        <!-- 返回按钮 -->
        <view class="back-button" @click="goBack">
          <uv-icon name="arrow-left" color="#FFFFFF" size="18"></uv-icon>
        </view>
        
        <!-- 律师信息和计时器 -->
        <view class="lawyer-info">
          <text class="lawyer-name">李律师</text>
          <text class="lawyer-desc">劳动仲裁方向专业律师</text>
          <view class="timer-container">
            <uv-icon name="clock" color="#FFFFFF" size="16"></uv-icon>
            <text class="timer-text">19:58</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 聊天内容区域 -->
    <scroll-view 
      class="chat-content" 
      scroll-y="true" 
      :scroll-top="scrollTop"
      :style="{ height: chatHeight }"
    >
      <!-- 时间戳分隔符 -->
      <view class="timestamp-separator">
        <text class="timestamp-text">2025年4月24日 17:01</text>
      </view>
      
      <!-- 接收的消息1 -->
      <view class="message-item received">
        <view class="avatar"></view>
        <view class="message-bubble received-bubble">
          <text class="message-text">你好呀, 我是心理咨询师林默。在这里, 你可以放心地聊聊自己最近的感受。今天是什么让你想找个人说说话呢?</text>
        </view>
      </view>
      
      <!-- 发送的消息1 -->
      <view class="message-item sent">
        <view class="message-bubble sent-bubble">
          <text class="message-text">工作特别忙, 晚上睡不着, 白天又没精神, 感觉整个人被掏空了...</text>
        </view>
        <view class="avatar"></view>
      </view>
      
      <!-- 接收的消息2 -->
      <view class="message-item received">
        <view class="avatar"></view>
        <view class="message-bubble received-bubble">
          <text class="message-text">嗯, 我能感觉到你现在真的很累... ...这种"被掏空"的状态持续多久了? 是一两周, 还是更久?</text>
        </view>
      </view>
      
      <!-- 发送的消息2 -->
      <view class="message-item sent">
        <view class="message-bubble sent-bubble">
          <text class="message-text">好像几个月了</text>
        </view>
        <view class="avatar"></view>
      </view>
      
      <!-- 视频邀请卡片 -->
      <view class="video-invitation-card">
        <view class="invitation-info">
          <view class="video-icon">
            <uv-icon name="video" color="#FFFFFF" size="20"></uv-icon>
          </view>
          <view class="invitation-text">
            <text class="invitation-line1">对方给你发送了视频邀请,</text>
            <text class="invitation-line2">你是否同意</text>
          </view>
        </view>
        <view class="invitation-buttons">
          <view class="reject-button" @click="rejectVideo">
            <text class="reject-text">拒绝</text>
          </view>
          <view class="accept-button" @click="acceptVideo">
            <text class="accept-text">同意</text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 消息输入区域 -->
    <view class="message-input-area">
      <view class="input-container">
        <input 
          class="message-input" 
          placeholder="请输入消息" 
          v-model="inputMessage"
          @confirm="sendMessage"
        />
        <view class="add-button" @click="showMoreOptions">
          <uv-icon name="plus-circle" color="#888888" size="20"></uv-icon>
        </view>
      </view>
    </view>
    
    <!-- 快捷操作栏 -->
    <view class="quick-actions">
      <view class="action-item" @click="openAlbum">
        <uv-icon name="photo" color="#4A90E2" size="24"></uv-icon>
        <text class="action-label">相册</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ChatPage',
  data() {
    return {
      chatHeight: '100vh',
      scrollTop: 0,
      inputMessage: '',
      messages: []
    }
  },
  mounted() {
    this.calculateChatHeight()
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 计算聊天区域高度
    calculateChatHeight() {
      const systemInfo = uni.getSystemInfoSync()
      const statusBarHeight = systemInfo.statusBarHeight || 0
      const navBarHeight = 60 // 自定义导航栏高度
      const inputAreaHeight = 50 // 输入区域高度
      const quickActionsHeight = 80 // 快捷操作栏高度
      
      this.chatHeight = `${systemInfo.windowHeight - statusBarHeight - navBarHeight - inputAreaHeight - quickActionsHeight}px`
    },
    
    // 发送消息
    sendMessage() {
      if (this.inputMessage.trim()) {
        // 这里可以添加发送消息的逻辑
        console.log('发送消息:', this.inputMessage)
        this.inputMessage = ''
      }
    },
    
    // 显示更多选项
    showMoreOptions() {
      uni.showActionSheet({
        itemList: ['拍照', '从相册选择', '文件'],
        success: (res) => {
          console.log('选择了第' + (res.tapIndex + 1) + '个选项')
        }
      })
    },
    
    // 打开相册
    openAlbum() {
      uni.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          console.log('选择的图片:', res.tempFilePaths)
        }
      })
    },
    
    // 拒绝视频邀请
    rejectVideo() {
      uni.showToast({
        title: '已拒绝视频邀请',
        icon: 'none'
      })
    },
    
    // 接受视频邀请
    acceptVideo() {
      uni.showToast({
        title: '已接受视频邀请',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-page {
  width: 100%;
  height: 100vh;
  background-color: #F7F7F8;
  display: flex;
  flex-direction: column;
}

// 系统状态栏占位
.status-bar {
  height: var(--status-bar-height);
  background: linear-gradient(180deg, #A0C4FF 0%, #87AFFF 100%);
}

// 自定义导航栏
.custom-navbar {
  background: linear-gradient(180deg, #A0C4FF 0%, #87AFFF 100%);
  padding: 10px 15px;
  
  .navbar-content {
    display: flex;
    align-items: center;
    position: relative;
    height: 50px;
  }
  
  .back-button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 8px;
  }
  
  .lawyer-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .lawyer-name {
      color: #FFFFFF;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 2px;
    }
    
    .lawyer-desc {
      color: #FFFFFF;
      font-size: 12px;
      margin-bottom: 4px;
    }
    
    .timer-container {
      display: flex;
      align-items: center;
      gap: 4px;
      
      .timer-text {
        color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}

// 聊天内容区域
.chat-content {
  flex: 1;
  padding: 15px;
  background-color: #F7F7F8;
}

// 时间戳分隔符
.timestamp-separator {
  text-align: center;
  margin: 20px 0;
  
  .timestamp-text {
    color: #AAAAAA;
    font-size: 10px;
  }
}

// 消息项
.message-item {
  display: flex;
  margin-bottom: 15px;
  
  &.received {
    justify-content: flex-start;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #D9D9D9;
      margin-right: 8px;
    }
    
    .message-bubble {
      max-width: 70%;
    }
  }
  
  &.sent {
    justify-content: flex-end;
    padding-right: 15px;
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #D9D9D9;
      margin-left: 8px;
      flex-shrink: 0;
    }
    
    .message-bubble {
      max-width: 70%;
    }
  }
}

// 消息气泡
.message-bubble {
  padding: 10px 12px;
  border-radius: 12px;
  
  .message-text {
    font-size: 14px;
    line-height: 1.4;
  }
  
  &.received-bubble {
    background-color: #FFFFFF;
    border-bottom-left-radius: 4px;
    
    .message-text {
      color: #333333;
    }
  }
  
  &.sent-bubble {
    background-color: #A0C4FF;
    border-bottom-right-radius: 4px;
    
    .message-text {
      color: #FFFFFF;
    }
  }
}

// 视频邀请卡片
.video-invitation-card {
  margin: 20px auto;
  width: 85%;
  background-color: rgba(230, 240, 255, 0.8);
  border: 1px solid #C0D8FF;
  border-radius: 12px;
  padding: 15px;
  
  .invitation-info {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    
    .video-icon {
      width: 30px;
      height: 30px;
      background-color: #4A90E2;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    
    .invitation-text {
      flex: 1;
      
      .invitation-line1,
      .invitation-line2 {
        display: block;
        color: #333333;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
  
  .invitation-buttons {
    display: flex;
    gap: 10px;
    
    .reject-button,
    .accept-button {
      flex: 1;
      padding: 8px 0;
      border-radius: 6px;
      text-align: center;
    }
    
    .reject-button {
      background-color: #F0F0F0;
      
      .reject-text {
        color: #666666;
        font-size: 14px;
      }
    }
    
    .accept-button {
      background-color: #D9E6FF;
      
      .accept-text {
        color: #4A6DE5;
        font-size: 14px;
      }
    }
  }
}

// 消息输入区域
.message-input-area {
  background-color: #FFFFFF;
  padding: 10px 15px;
  border-top: 1px solid #EEEEEE;
  
  .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .message-input {
      flex: 1;
      height: 36px;
      background-color: #F5F5F5;
      border-radius: 18px;
      padding: 0 15px;
      font-size: 14px;
      border: none;
      
      &::placeholder {
        color: #BBBBBB;
      }
    }
    
    .add-button {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// 快捷操作栏
.quick-actions {
  background-color: #FFFFFF;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  border-top: 1px solid #EEEEEE;
  
  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    
    .action-label {
      color: #333333;
      font-size: 10px;
    }
  }
}
</style> 