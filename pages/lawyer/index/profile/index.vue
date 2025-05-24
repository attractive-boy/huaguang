<template>
	<view class="lawyer-profile-page">
		<!-- 自定义状态栏 -->
		<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		
		<!-- 滚动容器 -->
		<scroll-view 
			class="scroll-container" 
			scroll-y 
			:style="{ height: scrollHeight + 'px' }"
			enable-flex
		>
			<!-- 用户信息卡片 -->
			<view class="user-info-card">
				<view class="user-header">
					<view class="avatar-placeholder"></view>
					<view class="user-details">
						<text class="user-name">李律师</text>
						<text class="practice-number">执业编号: 9842108</text>
					</view>
				</view>
			</view>
			
			<!-- 服务状态卡片 -->
			<view class="service-status-card">
				<view class="status-content">
					<view class="status-left">
						<text class="status-label">我的服务状态:</text>
						<view class="status-indicator">
							<view class="online-dot"></view>
							<text class="status-text">在线</text>
						</view>
					</view>
					<text class="arrow-icon">></text>
				</view>
			</view>
			
			<!-- 服务统计卡片 -->
			<view class="service-stats-card">
				<text class="stats-line">我的服务单数: 累计咨询23次</text>
				<text class="stats-line">今日收入: ¥128.00</text>
			</view>
			
			<!-- 设置卡片 -->
			<view class="settings-card">
				<text class="card-title">设置</text>
				<view class="settings-list">
					<view 
						class="setting-item" 
						v-for="(item, index) in settingsItems" 
						:key="index"
						@click="handleSettingClick(item.type)"
						hover-class="setting-item-hover"
					>
						<view class="item-left">
							<uv-icon :name="item.icon" size="40" color="#888888"></uv-icon>
							<text class="item-text">{{ item.text }}</text>
						</view>
						<text class="arrow-icon">></text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部导航栏 -->
		<view class="bottom-tabbar">
			<view class="tab-item">
				<uv-icon name="home" size="48" color="#888888"></uv-icon>
				<text class="tab-text">首页</text>
			</view>
			<view class="tab-item">
				<uv-icon name="chat" size="48" color="#888888"></uv-icon>
				<text class="tab-text">信息</text>
			</view>
			<view class="tab-item active">
				<uv-icon name="account" size="48" color="#007AFF"></uv-icon>
				<text class="tab-text active">我的</text>
			</view>
		</view>
		
		<!-- 系统导航指示器 -->
		<view class="home-indicator"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			scrollHeight: 0,
			settingsItems: [
				{
					type: 'password',
					icon: 'lock',
					text: '修改密码'
				},
				{
					type: 'userinfo',
					icon: 'account',
					text: '修改用户信息'
				},
				{
					type: 'notification',
					icon: 'bell',
					text: '消息通知设置'
				}
			]
		}
	},
	onLoad() {
		this.initPage();
	},
	methods: {
		// 初始化页面
		initPage() {
			const systemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = systemInfo.statusBarHeight || 0;
			// 减去底部导航栏高度和home indicator高度
			this.scrollHeight = systemInfo.windowHeight - this.statusBarHeight - 120;
		},
		
		// 处理设置项点击
		handleSettingClick(type) {
			console.log('设置项点击:', type);
			switch(type) {
				case 'password':
					// 跳转到修改密码页面
					break;
				case 'userinfo':
					// 跳转到修改用户信息页面
					break;
				case 'notification':
					// 跳转到消息通知设置页面
					break;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.lawyer-profile-page {
	width: 100%;
	height: 100vh;
	background: linear-gradient(135deg, #E0F0FF 0%, #F0F8FF 100%);
	position: relative;
}

.status-bar {
	width: 100%;
	background: transparent;
}

.scroll-container {
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
}

/* 卡片通用样式 */
.user-info-card,
.service-status-card,
.service-stats-card,
.settings-card {
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	border-radius: 24rpx;
	margin-bottom: 20rpx;
	padding: 40rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

/* 用户信息卡片 */
.user-header {
	display: flex;
	align-items: center;
}

.avatar-placeholder {
	width: 120rpx;
	height: 120rpx;
	background-color: #D9D9D9;
	border-radius: 50%;
	margin-right: 30rpx;
}

.user-details {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.user-name {
	font-size: 36rpx;
	font-weight: 600;
	color: #333333;
	margin-bottom: 10rpx;
}

.practice-number {
	font-size: 26rpx;
	color: #888888;
}

/* 服务状态卡片 */
.status-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.status-left {
	display: flex;
	align-items: center;
}

.status-label {
	font-size: 30rpx;
	color: #333333;
	margin-right: 16rpx;
}

.status-indicator {
	display: flex;
	align-items: center;
}

.online-dot {
	width: 20rpx;
	height: 20rpx;
	background-color: #52C41A;
	border-radius: 50%;
	margin-right: 10rpx;
}

.status-text {
	font-size: 30rpx;
	color: #52C41A;
}

.arrow-icon {
	font-size: 24rpx;
	color: #CCCCCC;
}

/* 服务统计卡片 */
.stats-line {
	display: block;
	font-size: 30rpx;
	color: #333333;
	margin-bottom: 16rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}

/* 设置卡片 */
.card-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #333333;
	margin-bottom: 30rpx;
	display: block;
}

.settings-list {
	display: flex;
	flex-direction: column;
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24rpx 0;
	
	&:not(:last-child) {
		border-bottom: 1rpx solid #F0F0F0;
	}
}

.setting-item-hover {
	background-color: rgba(0, 0, 0, 0.05);
	border-radius: 12rpx;
}

.item-left {
	display: flex;
	align-items: center;
}

.item-text {
	font-size: 30rpx;
	color: #333333;
	margin-left: 20rpx;
}

/* 底部导航栏 */
.bottom-tabbar {
	position: fixed;
	bottom: 34rpx;
	left: 0;
	right: 0;
	height: 100rpx;
	background-color: #FFFFFF;
	border-top: 1rpx solid #E0E0E0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.tab-text {
	font-size: 20rpx;
	color: #888888;
	margin-top: 6rpx;
	
	&.active {
		color: #007AFF;
	}
}

/* 系统导航指示器 */
.home-indicator {
	position: fixed;
	bottom: 8rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 268rpx;
	height: 8rpx;
	background-color: #000000;
	border-radius: 4rpx;
}
</style> 