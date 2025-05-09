<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<view class="search-input">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input type="text" v-model="searchKey" placeholder="搜索法律问题" @confirm="handleSearch" />
			</view>
		</view>
		
		<!-- 分类标签 -->
		<scroll-view class="category-scroll" scroll-x>
			<view class="category-list">
				<view 
					class="category-item" 
					:class="{ active: currentCategory === item.id }"
					v-for="(item, index) in categories" 
					:key="index"
					@click="handleCategoryChange(item.id)"
				>
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		
		<!-- 咨询列表 -->
		<scroll-view 
			class="consultation-list" 
			scroll-y 
			@scrolltolower="loadMore"
			:style="{ height: scrollHeight + 'px' }"
		>
			<view class="consultation-item" v-for="(item, index) in consultationList" :key="index" @click="goToDetail(item.id)">
				<view class="consultation-info">
					<text class="title">{{item.title}}</text>
					<text class="desc">{{item.description}}</text>
					<view class="meta">
						<text class="category">{{item.categoryName}}</text>
						<text class="views">{{item.views}}次浏览</text>
						<text class="time">{{item.createTime}}</text>
					</view>
				</view>
				<image v-if="item.image" :src="item.image" mode="aspectFill" class="consultation-image"></image>
			</view>
			
			<!-- 加载更多 -->
			<view class="loading" v-if="loading">加载中...</view>
			<view class="no-more" v-if="noMore">没有更多数据了</view>
		</scroll-view>
		
		<!-- 发布按钮 -->
		<view class="publish-btn" @click="goToPublish">
			<uni-icons type="plus" size="24" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: '',
				currentCategory: 0,
				categories: [
					{ id: 0, name: '全部' },
					{ id: 1, name: '婚姻家事' },
					{ id: 2, name: '劳动纠纷' },
					{ id: 3, name: '合同纠纷' },
					{ id: 4, name: '交通事故' },
					{ id: 5, name: '房产纠纷' }
				],
				consultationList: [],
				page: 1,
				pageSize: 10,
				loading: false,
				noMore: false,
				scrollHeight: 0
			}
		},
		onLoad() {
			// 获取屏幕高度
			const systemInfo = uni.getSystemInfoSync()
			// 减去搜索栏和分类标签的高度
			this.scrollHeight = systemInfo.windowHeight - uni.upx2px(180)
			
			this.loadData()
		},
		methods: {
			handleSearch() {
				this.page = 1
				this.consultationList = []
				this.noMore = false
				this.loadData()
			},
			handleCategoryChange(categoryId) {
				this.currentCategory = categoryId
				this.page = 1
				this.consultationList = []
				this.noMore = false
				this.loadData()
			},
			loadData() {
				if (this.loading || this.noMore) return
				
				this.loading = true
				// 模拟接口请求
				setTimeout(() => {
					const mockData = Array(this.pageSize).fill(0).map((_, index) => ({
						id: this.page * this.pageSize + index,
						title: '法律咨询标题' + (this.page * this.pageSize + index),
						description: '这是一段法律咨询的描述文字，描述咨询的具体内容...',
						categoryName: this.categories[Math.floor(Math.random() * 5) + 1].name,
						views: Math.floor(Math.random() * 1000),
						createTime: '2024-05-09',
						image: '/static/consultation/example.jpg'
					}))
					
					this.consultationList = [...this.consultationList, ...mockData]
					this.loading = false
					
					if (this.page >= 3) {
						this.noMore = true
					}
					this.page++
				}, 1000)
			},
			loadMore() {
				this.loadData()
			},
			goToDetail(id) {
				uni.navigateTo({
					url: `/pages/user/consultation/detail?id=${id}`
				})
			},
			goToPublish() {
				uni.navigateTo({
					url: '/pages/user/consultation/publish'
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
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

.category-scroll {
	background-color: #fff;
	padding: 20rpx 0;
	white-space: nowrap;
	
	.category-list {
		display: inline-block;
		padding: 0 20rpx;
		
		.category-item {
			display: inline-block;
			padding: 10rpx 30rpx;
			margin-right: 20rpx;
			font-size: 28rpx;
			color: #666;
			background-color: #f5f5f5;
			border-radius: 30rpx;
			
			&.active {
				color: #fff;
				background-color: #007AFF;
			}
		}
	}
}

.consultation-list {
	background-color: #fff;
	
	.consultation-item {
		display: flex;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.consultation-info {
			flex: 1;
			margin-right: 20rpx;
			
			.title {
				font-size: 32rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			.desc {
				font-size: 28rpx;
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
				
				.category {
					font-size: 24rpx;
					color: #007AFF;
					background-color: rgba(0, 122, 255, 0.1);
					padding: 4rpx 12rpx;
					border-radius: 4rpx;
					margin-right: 20rpx;
				}
				
				.views, .time {
					font-size: 24rpx;
					color: #999;
					margin-right: 20rpx;
				}
			}
		}
		
		.consultation-image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 8rpx;
		}
	}
}

.loading, .no-more {
	text-align: center;
	padding: 30rpx;
	color: #999;
	font-size: 24rpx;
}

.publish-btn {
	position: fixed;
	right: 30rpx;
	bottom: 120rpx;
	width: 100rpx;
	height: 100rpx;
	background-color: #007AFF;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 16rpx rgba(0, 122, 255, 0.3);
}
</style> 