<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<view class="search-input">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input type="text" v-model="searchKey" placeholder="搜索案件" @confirm="handleSearch" />
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
		
		<!-- 案件列表 -->
		<scroll-view 
			class="case-list" 
			scroll-y 
			@scrolltolower="loadMore"
			:style="{ height: scrollHeight + 'px' }"
		>
			<view class="case-item" v-for="(item, index) in caseList" :key="index" @click="goToDetail(item.id)">
				<view class="case-info">
					<view class="header">
						<text class="title">{{item.title}}</text>
						<text :class="['status', item.status]">{{item.statusText}}</text>
					</view>
					<view class="desc">{{item.description}}</view>
					<view class="meta">
						<view class="client">
							<text class="label">委托人：</text>
							<text class="value">{{item.clientName}}</text>
						</view>
						<view class="time">
							<text class="label">创建时间：</text>
							<text class="value">{{item.createTime}}</text>
						</view>
					</view>
					<view class="progress" v-if="item.status === 'processing'">
						<text class="label">当前进度：</text>
						<text class="value">{{item.progress}}</text>
					</view>
				</view>
				<view class="actions">
					<button class="action-btn" @click.stop="handleUpdate(item)">
						<uni-icons type="compose" size="16" color="#007AFF"></uni-icons>
						<text>更新进度</text>
					</button>
				</view>
			</view>
			
			<!-- 加载更多 -->
			<view class="loading" v-if="loading">加载中...</view>
			<view class="no-more" v-if="noMore">没有更多数据了</view>
		</scroll-view>
		
		<!-- 更新进度弹窗 -->
		<uni-popup ref="updatePopup" type="bottom">
			<view class="update-popup">
				<view class="popup-header">
					<text class="title">更新案件进度</text>
					<text class="close" @click="closeUpdatePopup">关闭</text>
				</view>
				<view class="popup-content">
					<view class="form-item">
						<text class="label">当前进度</text>
						<input type="text" v-model="updateForm.progress" placeholder="请输入当前进度" />
					</view>
					<view class="form-item">
						<text class="label">进度说明</text>
						<textarea v-model="updateForm.description" placeholder="请输入进度说明" />
					</view>
					<button class="submit-btn" @click="submitUpdate">提交更新</button>
				</view>
			</view>
		</uni-popup>
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
					{ label: '待处理', value: 'pending' },
					{ label: '处理中', value: 'processing' },
					{ label: '已完成', value: 'completed' },
					{ label: '已取消', value: 'cancelled' }
				],
				caseList: [],
				page: 1,
				pageSize: 10,
				loading: false,
				noMore: false,
				scrollHeight: 0,
				currentCase: null,
				updateForm: {
					progress: '',
					description: ''
				}
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
				this.caseList = []
				this.noMore = false
				this.loadData()
			},
			handleStatusChange(status) {
				this.currentStatus = status
				this.page = 1
				this.caseList = []
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
						title: '离婚财产分割案件',
						description: '处理离婚财产分割纠纷，包括房产、存款等财产的分割问题',
						status: ['pending', 'processing', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
						statusText: {
							pending: '待处理',
							processing: '处理中',
							completed: '已完成',
							cancelled: '已取消'
						}[this.status],
						clientName: '张女士',
						createTime: '2024-05-09',
						progress: '正在收集证据'
					}))
					
					this.caseList = [...this.caseList, ...mockData]
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
					url: `/pages/lawyer/cases/detail?id=${id}`
				})
			},
			handleUpdate(case_) {
				this.currentCase = case_
				this.updateForm.progress = case_.progress
				this.updateForm.description = ''
				this.$refs.updatePopup.open()
			},
			closeUpdatePopup() {
				this.$refs.updatePopup.close()
			},
			submitUpdate() {
				if (!this.updateForm.progress.trim()) {
					uni.showToast({
						title: '请输入当前进度',
						icon: 'none'
					})
					return
				}
				
				if (!this.updateForm.description.trim()) {
					uni.showToast({
						title: '请输入进度说明',
						icon: 'none'
					})
					return
				}
				
				// 模拟提交更新
				uni.showLoading({
					title: '更新中...'
				})
				
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'success'
					})
					
					// 更新列表数据
					const index = this.caseList.findIndex(item => item.id === this.currentCase.id)
					if (index !== -1) {
						this.caseList[index].progress = this.updateForm.progress
					}
					
					this.closeUpdatePopup()
				}, 1500)
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

.case-list {
	background-color: #fff;
	
	.case-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.case-info {
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
					
					&.pending {
						color: #ff9500;
						background-color: rgba(255, 149, 0, 0.1);
					}
					
					&.processing {
						color: #007AFF;
						background-color: rgba(0, 122, 255, 0.1);
					}
					
					&.completed {
						color: #4cd964;
						background-color: rgba(76, 217, 100, 0.1);
					}
					
					&.cancelled {
						color: #999;
						background-color: rgba(153, 153, 153, 0.1);
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
				
				.client, .time {
					font-size: 26rpx;
					color: #666;
					margin-right: 30rpx;
					
					.label {
						color: #999;
					}
				}
			}
			
			.progress {
				font-size: 26rpx;
				
				.label {
					color: #999;
				}
				
				.value {
					color: #007AFF;
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

.update-popup {
	background-color: #fff;
	border-radius: 20rpx 20rpx 0 0;
	
	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.title {
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
		}
		
		.close {
			font-size: 28rpx;
			color: #999;
		}
	}
	
	.popup-content {
		padding: 30rpx;
		
		.form-item {
			margin-bottom: 30rpx;
			
			.label {
				display: block;
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			input {
				width: 100%;
				height: 80rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 0 20rpx;
				font-size: 28rpx;
			}
			
			textarea {
				width: 100%;
				height: 200rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 20rpx;
				font-size: 28rpx;
			}
		}
		
		.submit-btn {
			width: 100%;
			height: 80rpx;
			background-color: #007AFF;
			color: #fff;
			font-size: 32rpx;
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&::after {
				display: none;
			}
		}
	}
}
</style> 