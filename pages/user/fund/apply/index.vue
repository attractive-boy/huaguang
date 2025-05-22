<template>
  <view class="apply-page">
    <!-- 状态栏（iOS风格） -->
    <view class="status-bar"></view>
    
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="back-btn" @click="onBack">
        <uv-icon name="arrow-left" color="#FFFFFF" size="36"></uv-icon>
        <text class="back-text">返回</text>
      </view>
    </view>

    <!-- 标题文字 -->
    <view class="page-title">青年帮扶基金申请表</view>

    <!-- 表单内容 -->
    <view class="form-content">
      <view class="form-group">
        <view class="form-container">
          <!-- 用户信息 -->
          <view class="group-title">用户信息</view>

          <!-- 第一行：姓名、出生日期 -->
          <view class="form-row">
            <view class="form-item half">
              <input class="item-input" v-model="formData.applicantName" placeholder="姓名" />
            </view>
            <view class="form-item half" @click="openBirthDatePicker">
              <input class="item-input" v-model="formData.birthDate" placeholder="出生日期" disabled
                style="pointer-events: none;" />
              <uv-datetime-picker ref="birthDatePicker" v-model="formData.birthDate" mode="date"
                @confirm="handleBirthDateChange">
              </uv-datetime-picker>
            </view>
          </view>

          <!-- 第二行：性别、学历文凭 -->
          <view class="form-row">
            <view class="form-item half" @click="openGenderPicker">
              <input class="item-input" v-model="genderOptions[formData.gender]" placeholder="性别" disabled
                style="pointer-events: none;" />
              <uv-picker ref="genderPicker" :columns="[genderOptions]" @confirm="handleGenderChange">
              </uv-picker>
            </view>
            <view class="form-item half">
              <input class="item-input" v-model="formData.education" placeholder="学历文凭" />
            </view>
          </view>

          <!-- 第三行：家庭（工作）地址 -->
          <view class="form-item">
            <input class="item-input" v-model="formData.address" placeholder="家庭（工作）地址" />
          </view>

          <!-- 第四行：名下财产 -->
          <view class="form-item">
            <input class="item-input" v-model="formData.property" placeholder="名下财产（车房）" />
          </view>

          <!-- 第五行：父母联系方式 -->
          <view class="form-item">
            <input class="item-input" v-model="formData.parentContact" placeholder="父母联系方式" />
          </view>
        </view>

        <!-- 资产负债信息 -->
        <view class="form-container debt-container">
          <view class="group-title">资产负债</view>

          <!-- 负债信息列表 -->
          <view class="debt-list">
            <view class="debt-item" v-for="(item, index) in debtList" :key="index">
              <view class="debt-row">
                <input class="debt-input" v-model="item.platform" placeholder="银行/平台名称" />
                <input class="debt-input" v-model="item.amount" placeholder="负债金额（元）" type="number" />
                <view class="delete-icon" @click="deleteDebtItem(index)" v-if="debtList.length > 1">
                  <uv-icon name="minus" color="#407BFF" size="24"></uv-icon>
                </view>
              </view>
              <!-- 上传负债截图 -->
              <view class="upload-section">
                <uv-upload 
                  :fileList="item.images" 
                  :name="index.toString()"
                  multiple 
                  :maxCount="1" 
                  @afterRead="afterRead"
                  @delete="deletePic"
                  :width="690"
                  :height="200"
                >
                  <view class="upload-box" v-if="!item.images || item.images.length === 0">
                    <uv-icon name="plus" color="#B0B0B0" size="60"></uv-icon>
                    <text class="upload-text">上传负债截图</text>
                  </view>
                </uv-upload>
              </view>
            </view>
          </view>

          <!-- 添加更多负债信息按钮 -->
          <view class="add-debt" @click="addDebtItem">
            <uv-icon name="plus" color="#407BFF" size="24"></uv-icon>
            <text class="add-text">增加更多负债信息</text>
          </view>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-section">
        <button class="submit-btn" @click="handleSubmit">提交审核</button>
      </view>
    </view>
    
    <!-- iOS Home Indicator -->
    <view class="home-indicator"></view>
  </view>
</template>

<script>
import request from '@/utils/request.js'
import { uploadFile } from '@/utils/file.js'
import config from '@/config/index.js'

export default {
  name: 'FundApplyPage',
  data() {
    return {
      formData: {
        applicantName: '',
        birthDate: '',
        gender: '',
        education: '',
        address: '',
        property: '',
        parentContact: ''
      },
      genderOptions: ['男', '女'],
      debtList: [
        {
          platform: '',
          amount: '',
          images: []
        },
        {
          platform: '',
          amount: '',
          images: []
        }
      ]
    }
  },
  methods: {
    onBack() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.switchTab({
            url: '/pages/user/fund/index'
          })
        }
      })
    },
    openBirthDatePicker() {
      this.$refs.birthDatePicker.open()
    },
    openGenderPicker() {
      this.$refs.genderPicker.open()
    },
    handleBirthDateChange(e) {
      this.formData.birthDate = e.value
    },
    handleGenderChange(e) {
      this.formData.gender = e.value[0]
    },
    addDebtItem() {
      this.debtList.push({
        platform: '',
        amount: '',
        images: []
      })
    },
    deleteDebtItem(index) {
      this.debtList.splice(index, 1)
    },
    async afterRead(event) {
      let lists = [].concat(event.file)
      let fileListLen = this.debtList[event.name].images.length
      
      lists.map((item) => {
        this.debtList[event.name].images.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      
      for (let i = 0; i < lists.length; i++) {
        try {
          const file = lists[i]
          
          let uploadParams = {
            file: file.url,
            businessType: 'DEBT_IMAGE',
            businessId: this.debtList[event.name].id || ''
          }
          
          const fileRes = await uploadFile(uploadParams)
          
          let item = this.debtList[event.name].images[fileListLen]
          
          this.debtList[event.name].images.splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: fileRes.fileUrl,
            id: fileRes.fileId
          }))
          
          fileListLen++
        } catch (error) {
          uni.showToast({
            title: '图片上传失败',
            icon: 'none'
          })
          this.debtList[event.name].images.splice(fileListLen, 1)
        }
      }
    },
    
    deletePic(event) {
      this.debtList[event.name].images.splice(event.index, 1)
    },
    
    async handleSubmit() {
      // 表单验证
      if (!this.formData.applicantName) {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
        return
      }
      if (!this.formData.birthDate) {
        uni.showToast({
          title: '请选择出生日期',
          icon: 'none'
        })
        return
      }
      if (this.formData.gender === '') {
        uni.showToast({
          title: '请选择性别',
          icon: 'none'
        })
        return
      }
      if (!this.formData.education) {
        uni.showToast({
          title: '请输入学历文凭',
          icon: 'none'
        })
        return
      }
      if (!this.formData.address) {
        uni.showToast({
          title: '请输入家庭或工作地址',
          icon: 'none'
        })
        return
      }
      if (!this.formData.parentContact) {
        uni.showToast({
          title: '请输入父母联系方式',
          icon: 'none'
        })
        return
      }

      // 验证负债信息
      const debts = this.debtList.map(item => {
        if (!item.platform) {
          uni.showToast({
            title: '请输入银行/平台名称',
            icon: 'none'
          })
          return null
        }
        if (!item.amount) {
          uni.showToast({
            title: '请输入负债金额',
            icon: 'none'
          })
          return null
        }
        if (!item.images || item.images.length === 0) {
          uni.showToast({
            title: '请上传负债截图',
            icon: 'none'
          })
          return null
        }
        return {
          platformName: item.platform,
          debtAmount: Number(item.amount),
          debtImageFileId: item.images[0].id // 假设上传成功后返回的图片对象中包含id字段
        }
      })

      if (debts.includes(null)) {
        return
      }

      try {
        const res = await request({
          url: '/api/fund/apply',
          method: 'POST',
          data: {
            applicantName: this.formData.applicantName,
            birthDate: this.formData.birthDate,
            gender: this.formData.gender === '男' ? 1 : 2,
            education: this.formData.education,
            address: this.formData.address,
            property: this.formData.property || '',
            parentContact: this.formData.parentContact,
            debts: debts
          }
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
@import '@/styles/variables.scss';

.apply-page {
  min-height: 100vh;
  background-color: #F0F2F5;
  padding-bottom: 100rpx;
  position: relative;

  /* 状态栏 */
  .status-bar {
    height: 44px;
    width: 100%;
    background: transparent;
  }

  /* 导航栏 */
  .navbar {
    padding: 20rpx 30rpx;
    background: linear-gradient(to right, #5DAAFF, #407BFF);
    
    .back-btn {
      display: flex;
      align-items: center;
      
      .back-text {
        color: #FFFFFF;
        font-size: 32rpx;
        margin-left: 8rpx;
      }
    }
  }

  /* 页面标题 */
  .page-title {
    color: #fff;
    font-size: 44rpx;
    font-weight: bold;
    text-align: left;
    padding: 20rpx 30rpx 40rpx;
    background: linear-gradient(to right, #5DAAFF, #407BFF);
  }

  /* 表单内容区域 */
  .form-content {
    margin: 0;
    margin-top: -20rpx;
    position: relative;
    z-index: 1;

    .form-group {
      background-color: #F0F2F5;
      border-radius: 30rpx 30rpx 0 0;
      padding: 30rpx 20rpx;
      margin: 0 0 30rpx;

      .form-container {
        min-height: 400rpx;
        border-radius: 20rpx;
        background-color: #fff;
        padding: 25rpx 20rpx;
        margin-bottom: 30rpx;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);

        .form-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20rpx;

          .form-item.half {
            width: 48%;
          }
        }
      }

      .debt-container {
        margin-top: 30rpx;
      }

      .group-title {
        font-size: 32rpx;
        color: #333333;
        font-weight: 600;
        margin-bottom: 30rpx;
        display: block;
      }

      .form-item {
        margin-bottom: 20rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .item-input {
          width: 100%;
          height: 80rpx;
          background-color: #F5F5F5;
          border-radius: 8rpx;
          padding: 0 20rpx;
          font-size: 28rpx;
          color: #333;
          box-sizing: border-box;
        }
      }
    }

    .submit-section {
      padding: 40rpx 30rpx 60rpx;

      .submit-btn {
        width: 100%;
        height: 90rpx;
        background: #407BFF;
        border-radius: 45rpx;
        color: #fff;
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

  /* iOS Home Indicator */
  .home-indicator {
    position: fixed;
    bottom: 8rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 120rpx;
    height: 10rpx;
    background-color: #000;
    border-radius: 5rpx;
  }
}

/* 负债列表样式 */
.debt-list {
  .debt-item {
    margin-bottom: 20rpx;
    border: 2rpx dashed #DCDCDC;
    border-radius: 16rpx;
    padding: 15rpx;

    .debt-row {
      display: flex;
      align-items: center;
      gap: 20rpx;

      .debt-input {
        flex: 1;
        height: 80rpx;
        background-color: #F5F5F5;
        border-radius: 8rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
        color: #333;
        box-sizing: border-box;
      }

      .delete-icon {
        width: 40rpx;
        height: 40rpx;
        background-color: #D6E4FF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10rpx;
      }
    }
  }
}

/* 添加负债按钮样式 */
.add-debt {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10rpx;
  padding: 20rpx 0;
  margin-left: 10rpx;
  cursor: pointer;

  .add-text {
    color: #407BFF;
    font-size: 28rpx;
  }
}

/* 上传区域样式 */
.upload-section {
  margin-top: 20rpx;
  width: 100%;
  box-sizing: border-box;
  
  .upload-box {
    width: 100%;
    height: 200rpx;
    background-color: #F5F5F5;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    box-sizing: border-box;

    .upload-text {
      color: #AAAAAA;
      font-size: 28rpx;
    }
  }

  :deep(.uv-upload__wrap) {
    width: 100% !important;
    
    uni-view {
      width: 100% !important;
    }

    .uv-upload__wrap__item {
      width: 100% !important;
      height: 200rpx !important;
      margin: 0 !important;
    }

    .uv-upload__wrap__item__image {
      width: 100% !important;
      height: 200rpx !important;
      object-fit: cover;
    }
  }
}
</style> 