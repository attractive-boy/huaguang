<template>
  <view class="counseling-test-page">
   
    
    <!-- 导航返回区 -->
    <view class="navbar">
      <view class="navbar-left" @click="goBack">
        <uv-icon name="arrow-left" color="#FFFFFF" size="20"></uv-icon>
        <text class="navbar-text">返回</text>
      </view>
    </view>
    
    <!-- 介绍文本区 -->
    <view class="intro-section">
      <text class="intro-text-1">Hi, 在进行咨询前</text>
      <text class="intro-text-2">让我们一起进行一个小测试吧</text>
    </view>
    
    <!-- 装饰几何图形 -->
    <view class="decorative-shapes">
      <view class="shape shape-1"></view>
      <view class="shape shape-2"></view>
      <view class="shape shape-3">
        <view class="shape-line"></view>
        <view class="shape-line"></view>
      </view>
    </view>
    
    <!-- 测试卡片 -->
    <view class="test-card">
      <!-- 问题文本 -->
      <view class="question-section">
        <template v-for="(line, index) in currentQuestion.question.split('\n')">
          <text :key="index" class="question-text">{{ line }}</text>
        </template>
      </view>
      
      <!-- 答案选项 -->
      <view class="options-section">
        <view 
          v-for="(option, index) in currentQuestion.options" 
          :key="index"
          class="option-btn" 
          @click="selectAnswer(index + 1)"
        >
          <text>{{ option }}</text>
        </view>
      </view>
      
      <!-- 回到上一题 -->
      <view 
        class="prev-question" 
        :class="{'prev-disabled': isFirstQuestion}"
        @click="goToPrevQuestion"
      >
        <text>回到上一题</text>
      </view>
    </view>
    
    <!-- iOS Home Indicator -->
    <view class="home-indicator">
      <view class="indicator-line"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CounselingTestPage',
  data() {
    return {
      currentQuestionIndex: 0,
      answers: [],
      counselor: null, // 咨询师信息
      questions: [
        {
          question: '你是否最近感到情绪低落\n甚至影响到日常生活',
          options: [
            '是，我需要心理调节',
            '否，我最近心情不错',
            '我的情绪低落，但是还能接受'
          ]
        },
        {
          question: '你是否经常感到压力过大\n无法应对生活或工作',
          options: [
            '是，压力非常大',
            '有一些压力，但能应对',
            '我的压力水平正常'
          ]
        },
        {
          question: '你最近的睡眠质量如何',
          options: [
            '很差，经常失眠',
            '一般，偶尔会醒来',
            '睡眠质量良好'
          ]
        }
      ]
    }
  },
  onLoad() {
    // 获取上一页面传递的咨询师数据
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('counselorData', (data) => {
      this.counselor = data.counselor
    })
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]
    },
    isFirstQuestion() {
      return this.currentQuestionIndex === 0
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.questions.length - 1
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    selectAnswer(optionIndex) {
      // 记录答案
      this.answers[this.currentQuestionIndex] = optionIndex
      
      // 如果不是最后一题，前进到下一题
      if (!this.isLastQuestion) {
        this.currentQuestionIndex++
      } else {
        // 是最后一题，完成测试，进入咨询
        this.finishTest()
      }
    },
    goToPrevQuestion() {
      if (!this.isFirstQuestion) {
        this.currentQuestionIndex--
      }
    },
    finishTest() {
      // 计算测试结果
      const result = this.calculateTestResult()
      
      // 显示结果提示
      uni.showToast({
        title: '测试完成',
        icon: 'none'
      })
      
      // 延迟后跳转到咨询页面
      setTimeout(() => {
        if (!this.counselor) {
          uni.showToast({
            title: '获取咨询师信息失败',
            icon: 'none'
          })
          return
        }
        
        uni.navigateTo({
          url: '/pages/user/fund/counseling/chat',
          success: (res) => {
            // 传递测试结果和咨询师信息到聊天页面
            res.eventChannel.emit('counselData', {
              counselor: this.counselor,
              testResult: result,
              answers: this.answers
            })
          }
        })
      }, 1500)
    },
    calculateTestResult() {
      // 简单计算测试结果
      // 实际项目中可能需要更复杂的计算逻辑
      const sum = this.answers.reduce((total, answer) => total + answer, 0)
      const avg = sum / this.answers.length
      
      if (avg <= 1.5) {
        return '需要专业心理咨询'
      } else if (avg <= 2.5) {
        return '建议适当寻求心理支持'
      } else {
        return '心理状态良好'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.counseling-test-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #FFB6C1, #FFC0CB, #FFAAB5);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  // 状态栏
  .status-bar {
    height: var(--status-bar-height, 44px);
    width: 100%;
    
    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      height: 100%;
    }
    
    &-time {
      font-size: 28rpx;
      color: #000000;
    }
    
    &-right {
      display: flex;
      align-items: center;
      
      .status-bar-signal,
      .status-bar-wifi,
      .status-bar-battery {
        width: 50rpx;
        height: 30rpx;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      
      .status-bar-signal {
        background-image: url("data:image/svg+xml,%3Csvg width='18' height='12' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 8.5H3V11.5H1V8.5ZM5 6H7V11.5H5V6ZM9 3.5H11V11.5H9V3.5ZM13 1H15V11.5H13V1Z' fill='black'/%3E%3C/svg%3E");
      }
      
      .status-bar-wifi {
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z' fill='black'/%3E%3Cpath d='M8 3.5C5.23858 3.5 2.82443 4.93578 1.52143 7.10156C1.37146 7.35908 1.43136 7.68646 1.66459 7.87161C1.89782 8.05676 2.22737 8.04156 2.44615 7.83759C3.57143 6.78527 5.38287 6 8 6C10.6171 6 12.4286 6.78527 13.5538 7.83759C13.7726 8.04156 14.1022 8.05676 14.3354 7.87161C14.5686 7.68646 14.6285 7.35908 14.4786 7.10156C13.1756 4.93578 10.7614 3.5 8 3.5Z' fill='black'/%3E%3Cpath d='M8 0.5C3.58172 0.5 0.5 3.58172 0.5 8C0.5 8.27614 0.723858 8.5 1 8.5C1.27614 8.5 1.5 8.27614 1.5 8C1.5 4.13401 4.13401 1.5 8 1.5C11.866 1.5 14.5 4.13401 14.5 8C14.5 8.27614 14.7239 8.5 15 8.5C15.2761 8.5 15.5 8.27614 15.5 8C15.5 3.58172 12.4183 0.5 8 0.5Z' fill='black'/%3E%3C/svg%3E");
      }
      
      .status-bar-battery {
        background-image: url("data:image/svg+xml,%3Csvg width='25' height='12' viewBox='0 0 25 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='21' height='11' rx='2.5' stroke='black'/%3E%3Crect x='2' y='2' width='18' height='8' rx='1' fill='black'/%3E%3Cpath d='M23 4V8C24.1046 8 25 7.10457 25 6C25 4.89543 24.1046 4 23 4Z' fill='black'/%3E%3C/svg%3E");
      }
    }
  }
  
  // 导航栏
  .navbar {
    height: 90rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    
    &-left {
      display: flex;
      align-items: center;
      
      .navbar-text {
        color: #FFFFFF;
        font-size: 32rpx;
        margin-left: 8rpx;
      }
    }
  }
  
  // 介绍文本区
  .intro-section {
    padding: 30rpx 40rpx;
    display: flex;
    flex-direction: column;
    
    .intro-text-1 {
      font-size: 36rpx;
      color: #FFFFFF;
      margin-bottom: 16rpx;
    }
    
    .intro-text-2 {
      font-size: 48rpx;
      color: #FFFFFF;
      font-weight: bold;
    }
  }
  
  // 装饰几何图形
  .decorative-shapes {
    position: absolute;
    top: 200rpx;
    right: 0;
    z-index: 0;
    
    .shape {
      position: absolute;
      border-radius: 20rpx;
      
      &-1 {
        width: 240rpx;
        height: 240rpx;
        background-color: rgba(255, 218, 185, 0.6);
        right: -50rpx;
        top: 0;
        transform: rotate(15deg);
      }
      
      &-2 {
        width: 200rpx;
        height: 200rpx;
        background-color: rgba(255, 200, 212, 0.5);
        right: 50rpx;
        top: 100rpx;
        transform: rotate(30deg);
      }
      
      &-3 {
        width: 180rpx;
        height: 180rpx;
        background-color: rgba(255, 235, 240, 0.7);
        right: 100rpx;
        top: 150rpx;
        transform: rotate(45deg);
        position: relative;
        overflow: hidden;
        
        .shape-line {
          position: absolute;
          width: 100%;
          height: 2rpx;
          background-color: rgba(255, 255, 255, 0.7);
          
          &:first-child {
            top: 60rpx;
          }
          
          &:last-child {
            top: 90rpx;
          }
        }
      }
    }
  }
  
  // 测试卡片
  .test-card {
    margin: 40rpx auto;
    width: 85%;
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 48rpx;
    padding: 50rpx 40rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    
    // 问题文本
    .question-section {
      margin-bottom: 60rpx;
      text-align: center;
      
      .question-text {
        display: block;
        font-size: 36rpx;
        color: #C8647A;
        line-height: 1.5;
      }
    }
    
    // 答案选项
    .options-section {
      display: flex;
      flex-direction: column;
      gap: 30rpx;
      margin-bottom: 60rpx;
      
      .option-btn {
        height: 100rpx;
        background-color: #FFF0F5;
        border-radius: 50rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        text {
          font-size: 32rpx;
          color: #C8647A;
        }
        
        &:active {
          opacity: 0.8;
        }
      }
    }
    
    // 回到上一题
    .prev-question {
      text-align: center;
      
      text {
        font-size: 28rpx;
        color: #DDA0AF;
      }
      
      &:active {
        opacity: 0.8;
      }
      
      &.prev-disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
  
  // iOS Home Indicator
  .home-indicator {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .indicator-line {
      width: 140rpx;
      height: 10rpx;
      background-color: #000000;
      border-radius: 5rpx;
    }
  }
}
</style> 