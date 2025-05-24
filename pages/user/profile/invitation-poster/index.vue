<template>
	<view class="invitation-poster-page">
		<!-- 自定义状态栏 -->
		<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		
		<!-- 导航栏 -->
		<view class="nav-bar">
			<view class="nav-back" @click="goBack">
				<text class="back-icon">‹</text>
				<text class="back-text">返回</text>
			</view>
		</view>
		
		<!-- 滚动容器 -->
		<scroll-view 
			class="scroll-container" 
			scroll-y 
			:style="{ height: scrollHeight + 'px' }"
			enable-flex
		>
			<!-- 主内容卡片 -->
			<view class="main-card">
				<!-- 插画人物区域 -->
				<view class="illustration-area">
					<view class="woman-illustration">
						<!-- 这里可以放置插画图片，暂时用CSS绘制简化版本 -->
						<view class="woman-figure">
							<view class="woman-head"></view>
							<view class="woman-body"></view>
							<view class="woman-arm"></view>
						</view>
					</view>
				</view>
				
				<!-- 二维码容器 -->
				<view class="qr-container">
					<view class="qr-code-area">
						<uv-qrcode 
							:value="qrCodeData" 
							:size="qrCodeSize"
							:margin="0"
							background-color="#D8D8D8"
							foreground-color="#000000"
						></uv-qrcode>
					</view>
					<text class="invitation-code-text">{{ invitationCode }}</text>
				</view>
				
				<!-- 邀请说明文本 -->
				<text class="instruction-text">邀请好友扫码注册，立享佣金奖励</text>
			</view>
		</scroll-view>
		
		<!-- 保存按钮区域 -->
		<view class="save-button-area">
			<uv-button 
				class="save-poster-button"
				type="primary"
				shape="circle"
				:custom-style="saveButtonStyle"
				@click="savePoster"
			>
				保存海报
			</uv-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			scrollHeight: 0,
			invitationCode: 'ABC123',
			qrCodeData: 'https://example.com/invite?code=ABC123',
			qrCodeSize: 120,
			saveButtonStyle: {
				backgroundColor: '#4A90E2',
				borderRadius: '50px',
				height: '44px',
				width: '70%',
				fontSize: '16px',
				fontWeight: '500'
			}
		}
	},
	onLoad(options) {
		this.initPage();
		// 如果有传入的邀请码参数，使用传入的值
		if (options.code) {
			this.invitationCode = options.code;
			this.qrCodeData = `https://example.com/invite?code=${options.code}`;
		}
	},
	methods: {
		// 初始化页面
		initPage() {
			const systemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = systemInfo.statusBarHeight || 0;
			// 计算滚动容器高度：屏幕高度 - 状态栏 - 导航栏 - 保存按钮区域
			this.scrollHeight = systemInfo.windowHeight - this.statusBarHeight - 50 - 80;
			
			// 根据屏幕宽度调整二维码大小
			const screenWidth = systemInfo.windowWidth;
			this.qrCodeSize = Math.min(120, screenWidth * 0.25);
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack();
		},
		
		// 保存海报到相册
		savePoster() {
			uni.showLoading({
				title: '正在保存...'
			});
			
			// 模拟保存过程
			setTimeout(() => {
				uni.hideLoading();
				uni.showToast({
					title: '海报已保存到相册',
					icon: 'success',
					duration: 2000
				});
			}, 1500);
			
			// 实际项目中，这里应该实现截图和保存到相册的功能
			// 可以使用uni.canvasToTempFilePath()和uni.saveImageToPhotosAlbum()
		}
	}
}
</script>

<style lang="scss" scoped>
.invitation-poster-page {
	width: 100%;
	height: 100vh;
	background: linear-gradient(135deg, #E0F2FF 0%, #D0E8FF 100%);
	position: relative;
}

.status-bar {
	width: 100%;
	background: transparent;
}

.nav-bar {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 15px;
	background: transparent;
}

.nav-back {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.back-icon {
	font-size: 18px;
	color: #4A90E2;
	margin-right: 4px;
	font-weight: bold;
}

.back-text {
	font-size: 16px;
	color: #4A90E2;
	font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
}

.scroll-container {
	width: 100%;
	padding: 0 5%;
	box-sizing: border-box;
}

.main-card {
	background: #F0F8FF;
	border-radius: 20px;
	padding: 20px;
	margin-bottom: 20px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	position: relative;
	overflow: hidden;
}

/* 插画区域 */
.illustration-area {
	width: 100%;
	height: 200px;
	position: relative;
	margin-bottom: 20px;
}

.woman-illustration {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 150px;
	height: 200px;
}

.woman-figure {
	position: relative;
	width: 100%;
	height: 100%;
}

.woman-head {
	position: absolute;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	width: 60px;
	height: 70px;
	background: #FFDAB9;
	border-radius: 50% 50% 45% 45%;
	border: 2px solid #1A237E;
}

.woman-head::before {
	content: '';
	position: absolute;
	top: -10px;
	left: -5px;
	width: 70px;
	height: 50px;
	background: #1A237E;
	border-radius: 50% 50% 40% 40%;
	z-index: -1;
}

.woman-body {
	position: absolute;
	top: 85px;
	left: 50%;
	transform: translateX(-50%);
	width: 80px;
	height: 100px;
	background: #2A3B8F;
	border-radius: 10px 10px 0 0;
}

.woman-body::before {
	content: '';
	position: absolute;
	top: 15px;
	left: 10px;
	width: 60px;
	height: 70px;
	background: #F5F5F5;
	border-radius: 5px;
}

.woman-arm {
	position: absolute;
	top: 100px;
	right: 10px;
	width: 40px;
	height: 15px;
	background: #2A3B8F;
	border-radius: 10px;
	transform: rotate(-15deg);
}

.woman-arm::after {
	content: '';
	position: absolute;
	right: -15px;
	top: -5px;
	width: 20px;
	height: 25px;
	background: #FFDAB9;
	border-radius: 50%;
}

/* 二维码容器 */
.qr-container {
	background: #FFFFFF;
	border-radius: 12px;
	padding: 20px;
	margin: 0 auto 20px;
	width: 65%;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 10;
}

.qr-code-area {
	margin-bottom: 15px;
	border-radius: 8px;
	overflow: hidden;
}

.invitation-code-text {
	font-size: 28px;
	color: #333333;
	font-weight: 500;
	letter-spacing: 2px;
	font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
}

/* 说明文本 */
.instruction-text {
	display: block;
	text-align: center;
	font-size: 14px;
	color: #505A71;
	margin-top: 20px;
	font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
}

/* 保存按钮区域 */
.save-button-area {
	position: fixed;
	bottom: 30px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	padding: 0 15%;
}

.save-poster-button {
	box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

/* 响应式调整 */
@media screen and (max-width: 375px) {
	.main-card {
		padding: 15px;
	}
	
	.qr-container {
		width: 70%;
		padding: 15px;
	}
	
	.invitation-code-text {
		font-size: 24px;
	}
	
	.instruction-text {
		font-size: 13px;
	}
}

@media screen and (min-width: 414px) {
	.qr-container {
		width: 60%;
	}
}
</style> 