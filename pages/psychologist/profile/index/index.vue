<template>
	<view class="container">
		<!-- iOS状态栏 -->
		<view class="status-bar">
			<text class="time">9:41</text>
			<view class="status-icons">
				<text class="signal">●●●○</text>
				<text class="wifi">📶</text>
				<text class="battery">🔋</text>
			</view>
		</view>
		
		<!-- 可滚动内容区域 -->
		<scroll-view class="scroll-content" scroll-y="true" :show-scrollbar="false">
			<!-- 用户信息卡片 -->
			<view class="user-info-card">
				<view class="user-header">
					<!-- 头像占位符 -->
					<view class="avatar-placeholder"></view>
					<view class="user-details">
						<text class="user-name">李律师</text>
						<text class="practitioner-id">执业编号: 9842108</text>
					</view>
				</view>
			</view>
			
			<!-- 服务状态卡片 -->
			<view class="service-status-card">
				<text class="status-title">我的服务状态:</text>
				<view class="status-row">
					<view class="status-indicator"></view>
					<text class="status-text">在线</text>
					<text class="nav-arrow">›</text>
				</view>
			</view>
			
			<!-- 服务单数与收入卡片 -->
			<view class="service-stats-card">
				<text class="service-count">我的服务单数: 累计咨询23次</text>
				<text class="today-income">今日收入: ¥128.00</text>
			</view>
			
			<!-- 设置卡片 -->
			<view class="settings-card">
				<text class="settings-title">设置</text>
				<view class="settings-list">
					<!-- 修改密码 -->
					<view class="setting-item" @click="handleChangePassword" hover-class="setting-item-hover">
						<view class="item-left">
							<text class="setting-icon">🛡️</text>
							<text class="setting-text">修改密码</text>
						</view>
						<text class="nav-arrow">›</text>
					</view>
					
					<!-- 修改用户信息 -->
					<view class="setting-item" @click="handleEditUserInfo" hover-class="setting-item-hover">
						<view class="item-left">
							<text class="setting-icon">👤</text>
							<text class="setting-text">修改用户信息</text>
						</view>
						<text class="nav-arrow">›</text>
					</view>
					
					<!-- 消息通知设置 -->
					<view class="setting-item" @click="handleNotificationSettings" hover-class="setting-item-hover">
						<view class="item-left">
							<text class="setting-icon">🗑️</text>
							<text class="setting-text">消息通知设置</text>
						</view>
						<text class="nav-arrow">›</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部标签栏 -->
		<view class="bottom-navigation">
			<view class="nav-divider"></view>
			<view class="nav-items">
				<view class="nav-item">
					<text class="nav-icon">🏠</text>
					<text class="nav-text">首页</text>
				</view>
				<view class="nav-item">
					<text class="nav-icon">💬</text>
					<text class="nav-text">信息</text>
				</view>
				<view class="nav-item active">
					<text class="nav-icon active">👤</text>
					<text class="nav-text active">我的</text>
				</view>
			</view>
		</view>
		
		<!-- iOS Home Indicator -->
		<view class="home-indicator"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				name: '李律师',
				practitionerId: '9842108',
				isOnline: true,
				serviceCount: 23,
				todayIncome: 128.00
			}
		}
	},
	methods: {
		// 修改密码
		handleChangePassword() {
			console.log('修改密码');
			uni.showToast({
				title: '跳转到修改密码页面',
				icon: 'none'
			});
		},
		
		// 修改用户信息
		handleEditUserInfo() {
			console.log('修改用户信息');
			uni.showToast({
				title: '跳转到用户信息编辑页面',
				icon: 'none'
			});
		},
		
		// 消息通知设置
		handleNotificationSettings() {
			console.log('消息通知设置');
			uni.showToast({
				title: '跳转到通知设置页面',
				icon: 'none'
			});
		}
	}
}
</script>

<style scoped>
.container {
	width: 100%;
	height: 100vh;
	background: linear-gradient(to bottom, #FFF0F0, #FFDDE0);
	display: flex;
	flex-direction: column;
}

/* iOS状态栏 */
.status-bar {
	height: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	background: transparent;
}

.time {
	color: #000000;
	font-size: 17px;
	font-weight: 600;
}

.status-icons {
	display: flex;
	align-items: center;
	gap: 5px;
}

.signal, .wifi, .battery {
	color: #000000;
	font-size: 14px;
}

/* 可滚动内容区域 */
.scroll-content {
	flex: 1;
	padding: 0 15px 20px 15px;
}

/* 卡片通用样式 */
.user-info-card,
.service-status-card,
.service-stats-card,
.settings-card {
	background: #FFFFFF;
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 20px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 用户信息卡片 */
.user-header {
	display: flex;
	align-items: center;
}

.avatar-placeholder {
	width: 65px;
	height: 65px;
	border-radius: 50%;
	background-color: #D9D9D9;
	margin-right: 15px;
}

.user-details {
	flex: 1;
}

.user-name {
	display: block;
	font-size: 20px;
	font-weight: bold;
	color: #333333;
	margin-bottom: 6px;
}

.practitioner-id {
	display: block;
	font-size: 14px;
	color: #666666;
}

/* 服务状态卡片 */
.status-title {
	display: block;
	font-size: 16px;
	color: #333333;
	margin-bottom: 15px;
}

.status-row {
	display: flex;
	align-items: center;
}

.status-indicator {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background-color: #5CB85C;
	margin-right: 10px;
}

.status-text {
	flex: 1;
	font-size: 16px;
	color: #333333;
}

.nav-arrow {
	font-size: 14px;
	color: #CCCCCC;
}

/* 服务统计卡片 */
.service-count {
	display: block;
	font-size: 16px;
	color: #333333;
	margin-bottom: 10px;
}

.today-income {
	display: block;
	font-size: 16px;
	color: #333333;
}

/* 设置卡片 */
.settings-title {
	display: block;
	font-size: 18px;
	font-weight: bold;
	color: #333333;
	margin-bottom: 15px;
}

.settings-list {
	display: flex;
	flex-direction: column;
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 0;
	transition: all 0.3s ease;
}

.setting-item-hover {
	background-color: #F8F8F8;
	margin: 0 -20px;
	padding-left: 20px;
	padding-right: 20px;
	border-radius: 12px;
}

.item-left {
	display: flex;
	align-items: center;
	flex: 1;
}

.setting-icon {
	font-size: 20px;
	color: #888888;
	margin-right: 12px;
}

.setting-text {
	font-size: 16px;
	color: #333333;
}

/* 底部导航栏 */
.bottom-navigation {
	background: #F9F9F9;
	border-top: 1px solid #E0E0E0;
}

.nav-divider {
	height: 1px;
	background: #E0E0E0;
}

.nav-items {
	display: flex;
	height: 55px;
	align-items: center;
}

.nav-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
}

.nav-icon {
	font-size: 24px;
	color: #888888;
}

.nav-text {
	font-size: 11px;
	color: #888888;
}

.nav-item.active .nav-icon,
.nav-text.active {
	color: #FF4D4F;
}

/* iOS Home Indicator */
.home-indicator {
	height: 5px;
	width: 134px;
	background: #000000;
	border-radius: 3px;
	margin: 8px auto;
}
</style> 