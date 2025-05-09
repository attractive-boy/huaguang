<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<view class="search-input">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input type="text" v-model="searchKey" placeholder="搜索报告" @confirm="handleSearch" />
			</view>
		</view>
		
		<!-- 状态标签 -->
		<scroll-view class="status-scroll" scroll-x>
			<view class="status-list">
				<view 
					class="status-item" 
					:class="{ active: currentStatus === item.value }"
					v-for="(item, index) in statusList" 
					:key="index"
					@click="handleStatusChange(item.value)"
				>
					{{item.label}}
				</view>
			</view>
		</scroll-view>
		
		<!-- 报告列表 -->
		<scroll-view 
			class="report-list" 
			scroll-y 
			@scrolltolower="loadMore"
			:style="{ height: scrollHeight + 'px' }"
		>
			<view class="report-item" v-for="(item, index) in reportList" :key="index" @click="goToDetail(item.id)">
				<view class="report-info">
					<view class="header">
						<text class="title">{{item.title}}</text>
						<text :class="['status', item.status]">{{item.statusText}}</text>
					</view>
					<view class="desc">{{item.description}}</view>
					<view class="meta">
						<view class="user">
							<text class="label">来访者：</text>
							<text class="value">{{item.userName}}</text>
						</view>
						<view class="time">
							<text class="label">创建时间：</text>
							<text class="value">{{item.createTime}}</text>
						</view>
					</view>
					<view class="category">
						<text class="label">报告类型：</text>
						<text class="value">{{item.category}}</text>
					</view>
				</view>
				<view class="actions">
					<button class="action-btn" @click.stop="handleEdit(item)" v-if="item.status === 'draft'">
						<uni-icons type="compose" size="16" color="#007AFF"></uni-icons>
						<text>编辑</text>
					</button>
					<button class="action-btn" @click.stop="handleShare(item)" v-if="item.status === 'completed'">
						<uni-icons type="share" size="16" color="#007AFF"></uni-icons>
						<text>分享</text>
					</button>
				</view>
			</view>
			
			<!-- 加载更多 -->
			<view class="loading" v-if="loading">加载中...</view>
			<view class="no-more" v-if="noMore">没有更多数据了</view>
		</scroll-view>
		
		<!-- 悬浮按钮 -->
		<view class="float-btn" @click="createReport">
			<uni-icons type="plus" size="24" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: '',
				currentStatus: 'all',
				statusList: [
					{ label: '全部', value: 'all' },
					{ label: '草稿', value: 'draft' },
					{ label: '已完成', value: 'completed' },
					{ label: '已分享', value: 'shared' }
				],
				reportList: [],
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
			// 减去搜索栏和状态标签的高度
			this.scrollHeight = systemInfo.windowHeight - uni.upx2px(180)
			
			this.loadData()
		},
		methods: {
			handleSearch() {
				this.page = 1
				this.reportList = []
				this.noMore = false
				this.loadData()
			},
			handleStatusChange(status) {
				this.currentStatus = status
				this.page = 1
				this.reportList = []
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
						title: '心理咨询评估报告',
						description: '来访者表现出明显的焦虑症状，建议进行认知行为疗法干预。',
						status: ['draft', 'completed', 'shared'][Math.floor(Math.random() * 3)],
						statusText: {
							draft: '草稿',
							completed: '已完成',
							shared: '已分享'
						}[this.status],
						userName: '王先生',
						createTime: '2024-05-09 14:30',
						category: '心理评估'
					}))
					
					this.reportList = [...this.reportList, ...mockData]
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
					url: `/pages/psychologist/reports/detail?id=${id}`
				})
			},
			handleEdit(report) {
				uni.navigateTo({
					url: `/pages/psychologist/reports/edit?id=${report.id}`
				})
			},
			handleShare(report) {
				uni.showActionSheet({
					itemList: ['分享给来访者', '导出PDF', '打印'],
					success: (res) => {
						switch (res.tapIndex) {
							case 0:
								// 分享给来访者
								uni.showToast({
									title: '分享成功',
									icon: 'success'
								})
								break
							case 1:
								// 导出PDF
								uni.showLoading({
									title: '导出中...'
								})
								setTimeout(() => {
									uni.hideLoading()
									uni.showToast({
										title: '导出成功',
										icon: 'success'
									})
								}, 1500)
								break
							case 2:
								// 打印
								uni.showToast({
									title: '打印功能开发中',
									icon: 'none'
								})
								break
						}
					}
				})
			},
			createReport() {
				uni.navigateTo({
					url: '/pages/psychologist/reports/create'
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

.status-scroll {
	background-color: #fff;
	padding: 20rpx 0;
	white-space: nowrap;
	
	.status-list {
		display: inline-block;
		padding: 0 20rpx;
		
		.status-item {
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

.report-list {
	background-color: #fff;
	
	.report-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.report-info {
			margin-bottom: 20rpx;
			
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				
				.title {
					font-size: 32rpx;
					color: #333;
					font-weight: bold;
				}
				
				.status {
					font-size: 24rpx;
					padding: 4rpx 12rpx;
					border-radius: 4rpx;
					
					&.draft {
						color: #ff9500;
						background-color: rgba(255, 149, 0, 0.1);
					}
					
					&.completed {
						color: #4cd964;
						background-color: rgba(76, 217, 100, 0.1);
					}
					
					&.shared {
						color: #007AFF;
						background-color: rgba(0, 122, 255, 0.1);
					}
				}
			}
			
			.desc {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 20rpx;
				line-height: 1.6;
			}
			
			.meta {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 10rpx;
				
				.user, .time {
					font-size: 26rpx;
					color: #666;
					margin-right: 30rpx;
					
					.label {
						color: #999;
					}
				}
			}
			
			.category {
				font-size: 26rpx;
				color: #666;
				
				.label {
					color: #999;
				}
			}
		}
		
		.actions {
			display: flex;
			justify-content: flex-end;
			
			.action-btn {
				display: flex;
				align-items: center;
				background: none;
				border: 1rpx solid #007AFF;
				border-radius: 30rpx;
				padding: 10rpx 20rpx;
				margin: 0;
				line-height: 1;
				
				&::after {
					display: none;
				}
				
				text {
					font-size: 24rpx;
					color: #007AFF;
					margin-left: 6rpx;
				}
			}
		}
	}
}

.loading, .no-more {
	text-align: center;
	padding: 30rpx;
	color: #999;
	font-size: 24rpx;
}

.float-btn {
	position: fixed;
	right: 30rpx;
	bottom: 30rpx;
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