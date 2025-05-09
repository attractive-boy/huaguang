<template>
	<view class="container">
		<view class="header">
			<text class="title">预约咨询</text>
		</view>
		<view class="content">
			<view class="type-selector">
				<view class="type-item" :class="{ active: type === 'lawyer' }" @click="type = 'lawyer'">
					<text>律师咨询</text>
				</view>
				<view class="type-item" :class="{ active: type === 'psychologist' }" @click="type = 'psychologist'">
					<text>心理师咨询</text>
				</view>
			</view>
			
			<view class="form-item">
				<text class="label">咨询主题</text>
				<input class="input" v-model="title" placeholder="请输入咨询主题" />
			</view>
			
			<view class="form-item">
				<text class="label">咨询时间</text>
				<picker mode="date" :value="date" @change="onDateChange">
					<view class="picker">
						{{date || '请选择日期'}}
					</view>
				</picker>
			</view>
			
			<view class="form-item">
				<text class="label">咨询时段</text>
				<picker mode="time" :value="time" @change="onTimeChange">
					<view class="picker">
						{{time || '请选择时间'}}
					</view>
				</picker>
			</view>
			
			<view class="form-item">
				<text class="label">咨询描述</text>
				<textarea class="textarea" v-model="description" placeholder="请详细描述您的问题" />
			</view>
			
			<button class="submit-btn" @click="submitAppointment">提交预约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'lawyer',
				title: '',
				date: '',
				time: '',
				description: ''
			}
		},
		methods: {
			onDateChange(e) {
				this.date = e.detail.value
			},
			onTimeChange(e) {
				this.time = e.detail.value
			},
			submitAppointment() {
				if (!this.title || !this.date || !this.time || !this.description) {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none'
					})
					return
				}
				
				// TODO: 提交预约信息
				uni.showLoading({
					title: '提交中...'
				})
				
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '预约成功',
						icon: 'success'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}, 1000)
			}
		}
	}
</script>

<style>
.container {
	padding: 20rpx;
}
.header {
	padding: 20rpx 0;
}
.title {
	font-size: 36rpx;
	font-weight: bold;
}
.content {
	margin-top: 30rpx;
}
.type-selector {
	display: flex;
	background-color: #fff;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
}
.type-item {
	flex: 1;
	text-align: center;
	padding: 20rpx 0;
	font-size: 28rpx;
}
.type-item.active {
	color: #4893FF;
	position: relative;
}
.type-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 40rpx;
	height: 4rpx;
	background-color: #4893FF;
}
.form-item {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
}
.label {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 10rpx;
	display: block;
}
.input {
	height: 80rpx;
	border-bottom: 1rpx solid #eee;
}
.picker {
	height: 80rpx;
	line-height: 80rpx;
	border-bottom: 1rpx solid #eee;
}
.textarea {
	width: 100%;
	height: 200rpx;
	border: 1rpx solid #eee;
	border-radius: 8rpx;
	padding: 10rpx;
}
.submit-btn {
	background-color: #4893FF;
	color: #fff;
	margin-top: 40rpx;
}
</style> 