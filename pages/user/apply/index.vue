<template>
  <view class="apply-page">
    <!-- 顶部导航栏 -->
    <uv-navbar leftText="返回" :fixed="false" title="" :safeAreaInsetTop="false" :bgColor="'transparent'"
      :leftIconColor="'#fff'" @leftClick="onBack" />

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
              <input class="item-input" v-model="formData.applicantName" placeholder="请输入姓名" />
            </view>
            <view class="form-item half" @click="openBirthDatePicker">
              <input class="item-input" v-model="formData.birthDate" placeholder="请选择出生日期" disabled
                style="pointer-events: none;" />
              <uv-datetime-picker ref="birthDatePicker" v-model="formData.birthDate" mode="date"
                @confirm="handleBirthDateChange">

              </uv-datetime-picker>
            </view>
          </view>

          <!-- 第二行：性别、学历文凭 -->
          <view class="form-row">
            <view class="form-item half" @click="openGenderPicker">
              <input class="item-input" v-model="genderOptions[formData.gender]" placeholder="请选择性别" disabled
                style="pointer-events: none;" />
              <uv-picker ref="genderPicker" :columns="[genderOptions]" @confirm="handleGenderChange">
              </uv-picker>
            </view>
            <view class="form-item half">
              <input class="item-input" v-model="formData.education" placeholder="请输入学历文凭" />
            </view>
          </view>

          <!-- 第三行：家庭（工作）地址 -->
          <view class="form-item">
            <input class="item-input" v-model="formData.address" placeholder="请输入家庭或工作地址" />
          </view>

          <!-- 第四行：名下财产 -->
          <view class="form-item">
            <input class="item-input" v-model="formData.property" placeholder="请输入名下财产情况（选填）" />
          </view>

          <!-- 第五行：父母联系方式 -->
          <view class="form-item">
            <input class="item-input" v-model="formData.parentContact" placeholder="请输入父母联系方式" />
          </view>
        </view>

        <!-- 资产负债信息 -->

        <view class="form-container" style="margin-top: 30rpx;">
          <view class="group-title">资产负债</view>

          <!-- 负债信息列表 -->
          <view class="debt-list">
            <view class="debt-item" v-for="(item, index) in debtList" :key="index">
              <view class="debt-row">
                <input class="debt-input" v-model="item.platform" placeholder="银行/平台名称" />
                <input class="debt-input" v-model="item.amount" placeholder="负债金额（元）" type="number" />
                <view class="delete-icon" @click="deleteDebtItem(index)">
                  <uv-icon name="trash" color="#999" size="36"></uv-icon>
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
                >
                  <view class="upload-box" v-if="!item.images || item.images.length === 0">
                    <uv-icon name="plus" color="#347FF1" size="40"></uv-icon>
                    <text class="upload-text">上传负债截图</text>
                  </view>
                </uv-upload>
              </view>
            </view>
          </view>

          <!-- 添加更多负债信息按钮 -->
          <view class="add-debt" @click="addDebtItem">
            <uv-icon name="plus" color="#347FF1" size="20"></uv-icon>
            <text class="add-text">增加更多负债信息</text>
          </view>
        </view>
      </view>




      <!-- 提交按钮 -->
      <view class="submit-section">
        <button class="submit-btn" @click="handleSubmit">提交申请</button>
      </view>
    </view>

  </view>
</template>

<script>
import UserTabbar from '@/components/tabbar/user-tabbar/user-tabbar.vue'
import request from '@/utils/request.js'
import { uploadFile } from '@/utils/file.js'

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
        description: '',
        applicantName: '',
        birthDate: '',
        gender: '',
        education: '',
        address: '',
        property: '',
        parentContact: ''
      },
      genderOptions: ['男', '女'],
      debtList: [{
        platform: '',
        amount: '',
        images: []
      }]
    }
  },
  methods: {
    onBack() {
      console.log('点击返回')
      uni.navigateBack({
        delta: 1,
        fail: (err) => {
          console.error('返回失败：', err)
          // 如果返回失败，则跳转到首页
          uni.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    },
    openBirthDatePicker() {
      console.log('openBirthDatePicker')
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
      if (!this.formData.gender) {
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
          url: '/api/help-loan/apply',
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
        console.error('提交申请失败：', error)
        uni.showToast({
          title: '提交失败，请稍后重试',
          icon: 'none'
        })
      }
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
      console.log('afterRead event:', event)
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      console.log('处理前的文件列表:', lists)
      let fileListLen = this.debtList[event.name].images.length
      console.log('当前负债项索引:', event.name)
      console.log('当前图片列表长度:', fileListLen)
      
      lists.map((item) => {
        console.log('添加文件项:', item)
        this.debtList[event.name].images.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      
      for (let i = 0; i < lists.length; i++) {
        try {
          console.log('开始上传第', i + 1, '个文件')
          
          // 获取文件对象
          const file = lists[i]
          console.log('文件对象:', file)
          
          // 根据环境获取文件路径
          let uploadParams = {}
          

          uploadParams = {
            file: file.url,
            businessType: 'DEBT_IMAGE',
            businessId: this.debtList[event.name].id
          }
          
          console.log('上传参数:', uploadParams)
          
          const fileRes = await uploadFile(uploadParams)
          
          console.log('上传成功,返回数据:', fileRes)
          
          let item = this.debtList[event.name].images[fileListLen]
          console.log('更新前的图片项:', item)
          
          this.debtList[event.name].images.splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: fileRes.fileUrl,
            id: fileRes.fileId
          }))
          
          console.log('更新后的图片列表:', this.debtList[event.name].images)
          fileListLen++
        } catch (error) {
          console.error('上传失败,错误详情:', error)
          console.error('错误堆栈:', error.stack)
          uni.showToast({
            title: '图片上传失败',
            icon: 'none'
          })
          // 上传失败时移除该图片
          this.debtList[event.name].images.splice(fileListLen, 1)
        }
      }
    },
    
    deletePic(event) {
      console.log('删除图片事件:', event)
      console.log('删除前的图片列表:', this.debtList[event.name].images)
      this.debtList[event.name].images.splice(event.index, 1)
      console.log('删除后的图片列表:', this.debtList[event.name].images)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.apply-page {
  min-height: 100vh;
  background-color: #F5F8FF;
  padding-bottom: 100rpx;
  background-image: $apply-bg-image;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .page-title {
    color: #fff;
    font-size: 40rpx;
    font-weight: bold;
    text-align: left;
    padding: 30rpx;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .form-content {
    margin: 0;

    .form-group {
      background-color: #fff;
      border-radius: 30rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;
      background-color: rgba(255, 255, 255, 0.9);

      .form-container {
        min-height: 400rpx;
        border: 2rpx dashed #3C5D9F;
        border-radius: 20rpx;
        background-color: #fff;
        padding: 20rpx;

        .form-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30rpx;

          .form-item.half {
            width: 48%;
          }
        }
      }

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
      padding: 40rpx 30rpx;

      .submit-btn {
        width: 100%;
        height: 88rpx;
        background: #347FF1;
        border-radius: 44rpx;
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
}

.debt-list {
  .debt-item {
    margin-bottom: 20rpx;
    border: 2rpx dashed #3C5D9F;
    border-radius: 20rpx;
    padding: 20rpx;

    .debt-row {
      display: flex;
      align-items: center;
      gap: 20rpx;

      .debt-input {
        flex: 1;
        height: 80rpx;
        background-color: #F5F8FF;
        border-radius: 8rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
        color: #333;
        box-sizing: border-box;
      }

      .delete-icon {
        padding: 10rpx;
      }
    }
  }
}

.add-debt {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 20rpx 0;
  cursor: pointer;

  .add-text {
    color: #347FF1;
    font-size: 28rpx;
  }
}

.upload-section {
  margin-top: 30rpx;
  width: 100%;
  
  .upload-box {
    width: 80vw;
    height: 150px;
    background-color: #F5F8FF;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10rpx;

    .upload-text {
      color: #347FF1;
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
      height: 150px !important;
      margin: 0 !important;
    }

    .uv-upload__wrap__item__image {
      width: 100% !important;
      height: 150px !important;
      object-fit: cover;
    }
  }
}
</style>