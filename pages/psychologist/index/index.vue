<template>
	<view class="container">
		<view class="header">
			<text class="title">心理师工作台</text>
		</view>
		<view class="content">
			<view class="stats-cards">
				<view class="stat-card">
					<text class="stat-number">0</text>
					<text class="stat-label">待处理咨询</text>
				</view>
				<view class="stat-card">
					<text class="stat-number">0</text>
					<text class="stat-label">今日咨询</text>
				</view>
				<view class="stat-card">
					<text class="stat-number">0</text>
					<text class="stat-label">本月收入</text>
				</view>
			</view>
			
			<view class="menu-list">
				<view class="menu-item" @click="goToConsultation">
					<text class="menu-title">咨询管理</text>
					<text class="arrow">></text>
				</view>
				<view class="menu-item" @click="goToReports">
					<text class="menu-title">评估报告</text>
					<text class="arrow">></text>
				</view>
				<view class="menu-item" @click="goToSchedule">
					<text class="menu-title">日程安排</text>
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
			goToConsultation() {
				uni.navigateTo({
					url: '/pages/psychologist/consultation/consultation'
				})
			},
			goToReports() {
				uni.navigateTo({
					url: '/pages/psychologist/reports/reports'
				})
			},
			goToSchedule() {
				// 跳转到日程安排页面
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
.stats-cards {
	display: flex;
	justify-content: space-between;
	margin-bottom: 30rpx;
}
.stat-card {
	flex: 1;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	margin: 0 10rpx;
	text-align: center;
}
.stat-number {
	font-size: 36rpx;
	font-weight: bold;
	color: #4893FF;
	display: block;
	margin-bottom: 10rpx;
}
.stat-label {
	font-size: 24rpx;
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