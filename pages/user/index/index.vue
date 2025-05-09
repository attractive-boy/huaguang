<template>
	<view class="container">
		<!-- 顶部搜索栏 -->
		<view class="search-box">
			<view class="search-input">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input type="text" placeholder="搜索法律问题" />
			</view>
		</view>
		
		<!-- 轮播图 -->
		<swiper class="banner" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image :src="item.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<!-- 功能导航 -->
		<view class="nav-grid">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navigateTo(item.url)">
				<image :src="item.icon" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- 热门咨询 -->
		<view class="section">
			<view class="section-header">
				<text class="title">热门咨询</text>
				<text class="more" @click="navigateTo('/pages/user/consultation/list')">更多</text>
			</view>
			<view class="consultation-list">
				<view class="consultation-item" v-for="(item, index) in consultationList" :key="index" @click="navigateTo('/pages/user/consultation/detail?id=' + item.id)">
					<view class="consultation-info">
						<text class="title">{{item.title}}</text>
						<text class="desc">{{item.description}}</text>
						<view class="meta">
							<text class="views">{{item.views}}次浏览</text>
							<text class="time">{{item.createTime}}</text>
						</view>
					</view>
					<image v-if="item.image" :src="item.image" mode="aspectFill" class="consultation-image"></image>
				</view>
			</view>
		</view>
		
		<!-- 引入 tab-bar 组件 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				bannerList: [
					{
						image: '/static/banner/banner1.jpg'
					},
					{
						image: '/static/banner/banner2.jpg'
					}
				],
				navList: [
					{
						name: '法律咨询',
						icon: '/static/icons/consult.png',
						url: '/pages/user/consultation/list'
					},
					{
						name: '找律师',
						icon: '/static/icons/lawyer.png',
						url: '/pages/user/lawyer/list'
					},
					{
						name: '心理疏导',
						icon: '/static/icons/psychology.png',
						url: '/pages/user/psychology/list'
					},
					{
						name: '我的',
						icon: '/static/icons/user.png',
						url: '/pages/user/profile/index'
					}
				],
				consultationList: [
					{
						id: 1,
						title: '离婚财产分割问题咨询',
						description: '夫妻共同财产如何分割？房产、存款等财产如何分配？',
						views: 1234,
						createTime: '2024-05-09',
						image: '/static/consultation/divorce.jpg'
					},
					{
						id: 2,
						title: '劳动合同纠纷咨询',
						description: '公司无故降薪，如何维护自己的合法权益？',
						views: 856,
						createTime: '2024-05-08',
						image: '/static/consultation/labor.jpg'
					}
				]
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 100rpx;
}

.search-box {
	padding: 20rpx 30rpx;
	background-color: #fff;
	
	.search-input {
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		border-radius: 30rpx;
		padding: 10rpx 20rpx;
		
		input {
			flex: 1;
			height: 60rpx;
			margin-left: 10rpx;
			font-size: 28rpx;
		}
	}
}

.banner {
	height: 300rpx;
	margin: 20rpx 30rpx;
	border-radius: 12rpx;
	overflow: hidden;
	
	image {
		width: 100%;
		height: 100%;
	}
}

.nav-grid {
	display: flex;
	flex-wrap: wrap;
	padding: 30rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	
	.nav-item {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
		
		image {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 10rpx;
		}
		
		text {
			font-size: 24rpx;
			color: #333;
		}
	}
}

.section {
	background-color: #fff;
	padding: 30rpx;
	
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333;
		}
		
		.more {
			font-size: 24rpx;
			color: #999;
		}
	}
	
	.consultation-list {
		.consultation-item {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #eee;
			
			&:last-child {
				border-bottom: none;
			}
			
			.consultation-info {
				flex: 1;
				margin-right: 20rpx;
				
				.title {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 10rpx;
				}
				
				.desc {
					font-size: 24rpx;
					color: #666;
					margin-bottom: 10rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				
				.meta {
					display: flex;
					align-items: center;
					
					.views, .time {
						font-size: 22rpx;
						color: #999;
						margin-right: 20rpx;
					}
				}
			}
			
			.consultation-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 8rpx;
			}
		}
	}
}
</style> 