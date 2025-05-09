<template>
	<view class="container">
		<view class="header">
			<text class="title">个人中心</text>
		</view>
		<view class="content">
			<view class="user-info">
				<image class="avatar" src="/static/default-avatar.png"></image>
				<view class="info">
					<text class="name">用户名</text>
					<text class="phone">手机号</text>
				</view>
			</view>
			<view class="menu-list">
				<view class="menu-item" @click="goToMyConsultations">
					<text class="menu-title">我的咨询</text>
					<text class="arrow">></text>
				</view>
				<view class="menu-item" @click="goToSettings">
					<text class="menu-title">设置</text>
					<text class="arrow">></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToMyConsultations() {
				// 跳转到我的咨询列表
			},
			goToSettings() {
				// 跳转到设置页面
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
.user-info {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}
.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	margin-right: 20rpx;
}
.info {
	flex: 1;
}
.name {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}
.phone {
	font-size: 28rpx;
	color: #666;
}
.menu-list {
	background-color: #fff;
	border-radius: 12rpx;
}
.menu-item {
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #eee;
}
.menu-title {
	font-size: 30rpx;
}
.arrow {
	color: #999;
}
</style> 