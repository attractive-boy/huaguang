<template>
	<view class="invitation-page">
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
			<!-- 邀请码信息卡片 -->
			<view class="invitation-card">
				<text class="card-title">我的邀请码</text>
				<view class="invitation-code-row">
					<view class="code-box">
						<text class="code-text">{{ invitationCode }}</text>
					</view>
					<view class="copy-icon" @click="copyInvitationCode">
						<text class="copy-symbol">📋</text>
					</view>
				</view>
				<view class="stats-row">
					<text class="stats-text">已邀请人数：<text class="stats-number">{{ invitedCount }}人</text></text>
					<text class="stats-text">团队总人数：<text class="stats-number">{{ totalTeamCount }}人</text></text>
				</view>
			</view>
			
			<!-- 邀请海报入口 -->
			<view class="poster-entry" @click="goToPoster" hover-class="poster-entry-hover">
				<text class="poster-text">邀请海报</text>
				<text class="arrow-icon">›</text>
			</view>
			
			<!-- 用户列表卡片 -->
			<view class="user-list-card">
				<scroll-view 
					class="user-list-scroll" 
					scroll-y 
					:style="{ height: userListHeight + 'px' }"
				>
					<view 
						class="user-item" 
						v-for="(user, index) in userList" 
						:key="index"
						@click="goToUserDetail(user)"
						hover-class="user-item-hover"
					>
						<view class="user-avatar">
							<uv-avatar 
								:src="user.avatar" 
								size="80" 
								shape="circle"
								:text="user.name ? user.name.charAt(0) : '用'"
								bg-color="#D8D8D8"
							></uv-avatar>
						</view>
						<view class="user-info">
							<view class="user-level-tag" :class="'level-' + user.level">
								<text class="level-text">{{ user.levelText }}</text>
							</view>
							<text class="user-name">{{ user.name }}</text>
						</view>
						<text class="join-date">{{ user.joinDate }}</text>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0,
			scrollHeight: 0,
			userListHeight: 400,
			invitationCode: 'ABC123',
			invitedCount: 12,
			totalTeamCount: 56,
			userList: [
				{
					id: 1,
					name: '李晓明',
					avatar: '',
					level: 1,
					levelText: '一级用户',
					joinDate: '2025年4月16日'
				},
				{
					id: 2,
					name: '王小红',
					avatar: '',
					level: 2,
					levelText: '二级用户',
					joinDate: '2025年4月15日'
				},
				{
					id: 3,
					name: '张三',
					avatar: '',
					level: 1,
					levelText: '一级用户',
					joinDate: '2025年4月14日'
				},
				{
					id: 4,
					name: '李四',
					avatar: '',
					level: 2,
					levelText: '二级用户',
					joinDate: '2025年4月13日'
				},
				{
					id: 5,
					name: '王五',
					avatar: '',
					level: 1,
					levelText: '一级用户',
					joinDate: '2025年4月12日'
				},
				{
					id: 6,
					name: '赵六',
					avatar: '',
					level: 1,
					levelText: '一级用户',
					joinDate: '2025年4月11日'
				},
				{
					id: 7,
					name: '孙七',
					avatar: '',
					level: 2,
					levelText: '二级用户',
					joinDate: '2025年4月10日'
				},
				{
					id: 8,
					name: '周八',
					avatar: '',
					level: 1,
					levelText: '一级用户',
					joinDate: '2025年4月9日'
				}
			]
		}
	},
	onLoad() {
		this.initPage();
		this.loadInvitationData();
	},
	methods: {
		// 初始化页面
		initPage() {
			const systemInfo = uni.getSystemInfoSync();
			this.statusBarHeight = systemInfo.statusBarHeight || 0;
			// 计算滚动容器高度：屏幕高度 - 状态栏 - 导航栏(约100rpx转50px)
			this.scrollHeight = systemInfo.windowHeight - this.statusBarHeight - 50;
			// 用户列表高度：滚动容器高度减去其他卡片的预估高度
			this.userListHeight = this.scrollHeight - 300;
		},
		
		// 加载邀请数据
		loadInvitationData() {
			// 这里可以从接口获取邀请数据
			// 暂时使用模拟数据
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack();
		},
		
		// 复制邀请码
		copyInvitationCode() {
			uni.setClipboardData({
				data: this.invitationCode,
				success: () => {
					uni.showToast({
						title: '邀请码已复制',
						icon: 'success'
					});
				},
				fail: () => {
					uni.showToast({
						title: '复制失败',
						icon: 'none'
					});
				}
			});
		},
		
		// 跳转到邀请海报页面
		goToPoster() {
			console.log('跳转到邀请海报页面');
			// uni.navigateTo({ url: '/pages/user/profile/poster/index' });
			uni.showToast({
				title: '邀请海报功能开发中',
				icon: 'none'
			});
		},
		
		// 跳转到用户详情
		goToUserDetail(user) {
			console.log('查看用户详情:', user);
			// uni.navigateTo({ url: `/pages/user/detail/index?userId=${user.id}` });
			uni.showToast({
				title: `查看${user.name}的详情`,
				icon: 'none'
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.invitation-page {
	width: 100%;
	height: 100vh;
	background: linear-gradient(180deg, #E0E8FF 0%, #F0F8FF 100%);
	position: relative;
}

.status-bar {
	width: 100%;
	background: transparent;
}

.nav-bar {
	width: 100%;
	height: 100rpx;
	display: flex;
	align-items: center;
	padding: 0 30rpx;
	background: linear-gradient(180deg, #E6F0FF 0%, #EBF4FF 100%);
}

.nav-back {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.back-icon {
	font-size: 36rpx;
	color: #4A90E2;
	margin-right: 8rpx;
	font-weight: bold;
}

.back-text {
	font-size: 32rpx;
	color: #4A90E2;
}

.scroll-container {
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
}

/* 邀请码信息卡片 */
.invitation-card {
	background: #FFFFFF;
	border-radius: 24rpx;
	padding: 40rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
}

.card-title {
	display: block;
	font-size: 32rpx;
	color: #333333;
	margin-bottom: 30rpx;
	font-weight: 500;
}

.invitation-code-row {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.code-box {
	background: #E0E0E0;
	border-radius: 12rpx;
	padding: 20rpx 30rpx;
	margin-right: 20rpx;
}

.code-text {
	font-size: 32rpx;
	color: #333333;
	font-weight: 500;
	letter-spacing: 2rpx;
}

.copy-icon {
	padding: 20rpx;
	cursor: pointer;
}

.copy-symbol {
	font-size: 32rpx;
	color: #666666;
}

.stats-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.stats-text {
	font-size: 26rpx;
	color: #666666;
}

.stats-number {
	color: #333333;
	font-weight: 500;
}

/* 邀请海报入口 */
.poster-entry {
	background: #E8EAF6;
	border-radius: 24rpx;
	padding: 30rpx 40rpx;
	margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	transition: all 0.3s ease;
}

.poster-entry-hover {
	background: #DDD9F6;
}

.poster-text {
	font-size: 32rpx;
	color: #303F9F;
	font-weight: 500;
}

.arrow-icon {
	font-size: 32rpx;
	color: #5C6BC0;
	font-weight: bold;
}

/* 用户列表卡片 */
.user-list-card {
	background: #FFFFFF;
	border-radius: 24rpx;
	padding: 40rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
	margin-bottom: 30rpx;
}

.user-list-scroll {
	width: 100%;
}

.user-item {
	display: flex;
	align-items: center;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #F5F5F5;
	cursor: pointer;
	transition: all 0.3s ease;
}

.user-item:last-child {
	border-bottom: none;
}

.user-item-hover {
	background: #F8F8F8;
	margin: 0 -40rpx;
	padding-left: 40rpx;
	padding-right: 40rpx;
	border-radius: 12rpx;
}

.user-avatar {
	margin-right: 24rpx;
}

.user-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.user-level-tag {
	background: #E3F2FD;
	border-radius: 8rpx;
	padding: 8rpx 16rpx;
	margin-bottom: 12rpx;
	align-self: flex-start;
}

.level-1 {
	background: #E3F2FD;
}

.level-2 {
	background: #EDE7F6;
}

.level-text {
	font-size: 24rpx;
	color: #42A5F5;
}

.level-2 .level-text {
	color: #7E57C2;
}

.user-name {
	font-size: 28rpx;
	color: #333333;
	font-weight: 500;
}

.join-date {
	font-size: 24rpx;
	color: #9E9E9E;
	text-align: right;
}
</style> 