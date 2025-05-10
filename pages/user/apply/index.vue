<template>
  <view class="apply-page">
    <!-- 顶部导航栏 -->
    <uv-navbar 
      leftText="返回" 
      :fixed="false" 
      title="" 
      :safeAreaInsetTop="false"
      @click-left="onBack"
    />

    <!-- 表单内容 -->
    <view class="form-content">
      <view class="form-group">
        <text class="group-title">基本信息</text>
        
        <!-- 姓名 -->
        <view class="form-item">
          <text class="item-label">姓名</text>
          <input class="item-input" type="text" v-model="formData.name" placeholder="请输入真实姓名" />
        </view>

        <!-- 身份证号 -->
        <view class="form-item">
          <text class="item-label">身份证号</text>
          <input class="item-input" type="idcard" v-model="formData.idCard" placeholder="请输入身份证号码" />
        </view>

        <!-- 手机号 -->
        <view class="form-item">
          <text class="item-label">手机号</text>
          <input class="item-input" type="number" v-model="formData.phone" placeholder="请输入手机号码" />
        </view>

        <!-- 帮扶类型 -->
        <view class="form-item">
          <text class="item-label">帮扶类型</text>
          <picker class="item-picker" mode="selector" :range="helpTypes" @change="handleHelpTypeChange">
            <view class="picker-content">
              <text>{{ formData.helpType || '请选择帮扶类型' }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
        </view>

        <!-- 帮扶金额 -->
        <view class="form-item">
          <text class="item-label">帮扶金额</text>
          <input class="item-input" type="digit" v-model="formData.amount" placeholder="请输入帮扶金额" />
        </view>

        <!-- 问题描述 -->
        <view class="form-item">
          <text class="item-label">问题描述</text>
          <textarea class="item-textarea" v-model="formData.description" placeholder="请详细描述您遇到的问题和困境" />
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-section">
        <button class="submit-btn" @click="handleSubmit">提交申请</button>
      </view>
    </view>

    <!-- 引入用户 TabBar -->
    <user-tabbar></user-tabbar>
  </view>
</template>

<script>
import UserTabbar from '@/components/tabbar/user-tabbar/user-tabbar.vue'
import request from '@/utils/request.js'

export default {
  name: 'ApplyPage',
  components: {
    UserTabbar
  },
  data() {
    return {
      helpTypes: ['医疗帮扶', '教育帮扶', '就业帮扶', '住房帮扶', '其他帮扶'],
      formData: {
        name: '',
        idCard: '',
        phone: '',
        helpType: '',
        amount: '',
        description: ''
      }
    }
  },
  methods: {
    onBack() {
      uni.navigateBack()
    },
    handleHelpTypeChange(e) {
      this.formData.helpType = this.helpTypes[e.detail.value]
    },
    async handleSubmit() {
      // 表单验证
      if (!this.formData.name) {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
        return
      }
      if (!this.formData.idCard) {
        uni.showToast({
          title: '请输入身份证号',
          icon: 'none'
        })
        return
      }
      if (!this.formData.phone) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      }
      if (!this.formData.helpType) {
        uni.showToast({
          title: '请选择帮扶类型',
          icon: 'none'
        })
        return
      }
      if (!this.formData.amount) {
        uni.showToast({
          title: '请输入帮扶金额',
          icon: 'none'
        })
        return
      }
      if (!this.formData.description) {
        uni.showToast({
          title: '请描述您的问题',
          icon: 'none'
        })
        return
      }

      try {
        const res = await request({
          url: '/api/help-loan/apply',
          method: 'POST',
          data: this.formData
        })
        
        if (res.code === 0) {
          uni.showToast({
            title: '申请提交成功',
            icon: 'success'
          })
          // 提交成功后返回上一页
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } else {
          uni.showToast({
            title: res.message || '提交失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('提交申请失败：', error)
        uni.showToast({
          title: '提交失败，请稍后重试',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-page {
  min-height: 100vh;
  background-color: #F5F8FF;
  padding-bottom: 100rpx;
  background-image: url('/static/images/apply-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .form-content {
    padding: 30rpx;

    .form-group {
      background-color: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;

      .group-title {
        font-size: 32rpx;
        color: #3C5D9F;
        font-weight: bold;
        margin-bottom: 30rpx;
        display: block;
      }

      .form-item {
        margin-bottom: 30rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .item-label {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 16rpx;
          display: block;
        }

        .item-input {
          width: 100%;
          height: 80rpx;
          background-color: #F5F8FF;
          border-radius: 8rpx;
          padding: 0 20rpx;
          font-size: 28rpx;
          color: #333;
          box-sizing: border-box;
        }

        .item-picker {
          width: 100%;
          height: 80rpx;
          background-color: #F5F8FF;
          border-radius: 8rpx;
          padding: 0 20rpx;
          box-sizing: border-box;

          .picker-content {
            height: 80rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28rpx;
            color: #333;

            .picker-arrow {
              color: #999;
              transform: rotate(90deg);
            }
          }
        }

        .item-textarea {
          width: 100%;
          height: 200rpx;
          background-color: #F5F8FF;
          border-radius: 8rpx;
          padding: 20rpx;
          font-size: 28rpx;
          color: #333;
          box-sizing: border-box;
        }
      }
    }

    .submit-section {
      padding: 40rpx 0;

      .submit-btn {
        width: 100%;
        height: 88rpx;
        background: linear-gradient(to right, #42B0FF, #DCF0FF);
        border-radius: 44rpx;
        color: #3C5D9F;
        font-size: 32rpx;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style> 