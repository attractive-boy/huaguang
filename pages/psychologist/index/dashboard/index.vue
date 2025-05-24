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
			<!-- 插画区域 -->
			<view class="illustration-area">
				<view class="illustration-content">
					<!-- 女性角色 -->
					<view class="character female">
						<view class="head">
							<view class="hair"></view>
							<view class="face">
								<view class="eyes">
									<view class="eye left"></view>
									<view class="eye right"></view>
								</view>
								<view class="smile"></view>
							</view>
						</view>
						<view class="body">
							<view class="suit-jacket"></view>
							<view class="shirt"></view>
							<view class="hand"></view>
						</view>
					</view>
					
					<!-- 男性角色 -->
					<view class="character male">
						<view class="head">
							<view class="hair"></view>
							<view class="face">
								<view class="eyes">
									<view class="eye left"></view>
									<view class="eye right"></view>
								</view>
								<view class="smile"></view>
							</view>
						</view>
						<view class="body">
							<view class="suit-jacket"></view>
							<view class="shirt"></view>
							<view class="tie"></view>
						</view>
					</view>
					
					<!-- 笔记本电脑轮廓 -->
					<view class="laptop"></view>
				</view>
			</view>
			
			<!-- 咨询信息卡片 -->
			<view class="info-card">
				<text class="card-title">咨询信息</text>
				<view class="consultation-list">
					<view class="list-item" v-for="(item, index) in consultationList" :key="index">
						<text class="name">{{ item.name }}</text>
						<text class="summary">{{ item.summary }}</text>
						<text class="time">{{ item.time }}</text>
					</view>
				</view>
			</view>
			
			<!-- 功能按钮卡片 -->
			<view class="action-card">
				<view class="action-buttons">
					<view class="action-button" @click="handleReply">
						<view class="icon-container reply-icon">
							<text class="icon">💬</text>
						</view>
						<text class="button-label">回复</text>
					</view>
					<view class="action-button" @click="handleEditProfile">
						<view class="icon-container edit-icon">
							<text class="icon">📝</text>
						</view>
						<text class="button-label">修改介绍</text>
					</view>
					<view class="action-button" @click="handleChangePassword">
						<view class="icon-container password-icon">
							<text class="icon">🔒</text>
						</view>
						<text class="button-label">密码修改</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部导航栏 -->
		<view class="bottom-navigation">
			<view class="nav-divider"></view>
			<view class="nav-items">
				<view class="nav-item active">
					<text class="nav-icon">🏠</text>
					<text class="nav-text active">首页</text>
				</view>
				<view class="nav-item">
					<text class="nav-icon">💬</text>
					<text class="nav-text">信息</text>
				</view>
				<view class="nav-item">
					<text class="nav-icon">👤</text>
					<text class="nav-text">我的</text>
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
			consultationList: [
				{
					name: '李小明',
					summary: '公司拖欠工资三个月，当...',
					time: '10分钟前'
				},
				{
					name: '张小红',
					summary: '工作压力过大，经常失眠...',
					time: '25分钟前'
				},
				{
					name: '王小华',
					summary: '与同事关系紧张，需要...',
					time: '1小时前'
				}
			]
		}
	},
	methods: {
		handleReply() {
			console.log('处理回复功能')
		},
		handleEditProfile() {
			console.log('修改介绍功能')
		},
		handleChangePassword() {
			console.log('密码修改功能')
		}
	}
}
</script>

<style scoped>
.container {
	width: 100%;
	height: 100vh;
	background: linear-gradient(to bottom, #FFF0F5, #FFFAFA);
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
	padding: 0 5% 20px 5%;
}

/* 插画区域 */
.illustration-area {
	height: 25vh;
	width: 100%;
	margin-bottom: 20px;
	position: relative;
	background: linear-gradient(135deg, #FFE4E1, #FFF0F5);
	border-radius: 0 0 20px 20px;
	overflow: hidden;
}

.illustration-content {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.character {
	position: relative;
	width: 80px;
	height: 120px;
	margin: 0 20px;
}

.female .head {
	width: 50px;
	height: 50px;
	background: #F5C4C4;
	border-radius: 25px;
	position: relative;
	margin: 0 auto;
}

.female .hair {
	width: 55px;
	height: 30px;
	background: #8B4513;
	border-radius: 30px 30px 0 0;
	position: absolute;
	top: -5px;
	left: -2.5px;
}

.male .head {
	width: 50px;
	height: 50px;
	background: #F5C4C4;
	border-radius: 25px;
	position: relative;
	margin: 0 auto;
}

.male .hair {
	width: 45px;
	height: 25px;
	background: #8B4513;
	border-radius: 25px 25px 0 0;
	position: absolute;
	top: -5px;
	left: 2.5px;
}

.face {
	position: absolute;
	top: 15px;
	left: 50%;
	transform: translateX(-50%);
}

.eyes {
	display: flex;
	gap: 8px;
}

.eye {
	width: 3px;
	height: 3px;
	background: #000;
	border-radius: 50%;
}

.smile {
	width: 12px;
	height: 6px;
	border: 1px solid #000;
	border-top: none;
	border-radius: 0 0 12px 12px;
	margin: 5px auto 0;
}

.body {
	width: 60px;
	height: 70px;
	margin: 0 auto;
	position: relative;
}

.female .suit-jacket {
	width: 60px;
	height: 50px;
	background: #F5C4C4;
	border-radius: 10px;
}

.male .suit-jacket {
	width: 60px;
	height: 50px;
	background: #4A434B;
	border-radius: 10px;
}

.shirt {
	width: 40px;
	height: 30px;
	background: #FFFFFF;
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 5px;
}

.tie {
	width: 8px;
	height: 25px;
	background: #F28B82;
	position: absolute;
	top: 15px;
	left: 50%;
	transform: translateX(-50%);
}

.hand {
	width: 15px;
	height: 15px;
	background: #F5C4C4;
	border-radius: 50%;
	position: absolute;
	top: 20px;
	right: -5px;
}

.laptop {
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	width: 80px;
	height: 50px;
	background: #E0E0E0;
	border-radius: 5px;
	opacity: 0.3;
}

/* 咨询信息卡片 */
.info-card {
	background: #FFFFFF;
	border-radius: 18px;
	padding: 18px;
	margin-bottom: 15px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
	font-size: 18px;
	font-weight: bold;
	color: #333333;
	margin-bottom: 15px;
	display: block;
}

.consultation-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.list-item {
	background: #FFF5F5;
	border-radius: 6px;
	padding: 12px;
	display: flex;
	align-items: center;
	gap: 10px;
}

.name {
	color: #333333;
	font-size: 14px;
	font-weight: 500;
	min-width: 60px;
}

.summary {
	color: #666666;
	font-size: 14px;
	flex: 1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.time {
	color: #999999;
	font-size: 12px;
	min-width: 60px;
	text-align: right;
}

/* 功能按钮卡片 */
.action-card {
	background: #FFFFFF;
	border-radius: 18px;
	padding: 20px;
	margin-bottom: 15px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-buttons {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.action-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	flex: 1;
}

.icon-container {
	width: 50px;
	height: 50px;
	background: #FF8A80;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon {
	font-size: 24px;
	color: #FFFFFF;
}

.button-label {
	color: #333333;
	font-size: 13px;
	text-align: center;
}

/* 底部导航栏 */
.bottom-navigation {
	background: #FFFFFF;
	padding-bottom: 0;
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
	font-size: 22px;
	color: #888888;
}

.nav-text {
	font-size: 10px;
	color: #888888;
}

.nav-item.active .nav-icon,
.nav-text.active {
	color: #FF8A80;
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