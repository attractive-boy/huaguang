<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<view class="search-input">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input type="text" v-model="searchKey" placeholder="搜索咨询" @confirm="handleSearch" />
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
		
		<!-- 咨询列表 -->
		<scroll-view 
			class="consultation-list" 
			scroll-y 
			@scrolltolower="loadMore"
			:style="{ height: scrollHeight + 'px' }"
		>
			<view class="consultation-item" v-for="(item, index) in consultationList" :key="index" @click="goToDetail(item.id)">
				<view class="consultation-info">
					<view class="header">
						<text class="title">{{item.title}}</text>
						<text :class="['status', item.status]">{{item.statusText}}</text>
					</view>
					<view class="desc">{{item.description}}</view>
					<view class="meta">
						<view class="user">
							<text class="label">咨询人：</text>
							<text class="value">{{item.userName}}</text>
						</view>
						<view class="time">
							<text class="label">咨询时间：</text>
							<text class="value">{{item.createTime}}</text>
						</view>
					</view>
					<view class="category">
						<text class="label">咨询类型：</text>
						<text class="value">{{item.category}}</text>
					</view>
				</view>
				<view class="actions">
					<button class="action-btn" @click.stop="handleReply(item)" v-if="item.status === 'pending'">
						<uni-icons type="chat" size="16" color="#007AFF"></uni-icons>
						<text>回复</text>
					</button>
				</view>
			</view>
			
			<!-- 加载更多 -->
			<view class="loading" v-if="loading">加载中...</view>
			<view class="no-more" v-if="noMore">没有更多数据了</view>
		</scroll-view>
		
		<!-- 回复弹窗 -->
		<uni-popup ref="replyPopup" type="bottom">
			<view class="reply-popup">
				<view class="popup-header">
					<text class="title">回复咨询</text>
					<text class="close" @click="closeReplyPopup">关闭</text>
				</view>
				<view class="popup-content">
					<view class="form-item">
						<text class="label">回复内容</text>
						<textarea v-model="replyForm.content" placeholder="请输入回复内容" />
					</view>
					<view class="form-item">
						<text class="label">上传图片</text>
						<view class="upload-list">
							<view 
								class="upload-item" 
								v-for="(item, index) in replyForm.images" 
								:key="index"
							>
								<image :src="item" mode="aspectFill"></image>
								<view class="delete-btn" @click="deleteImage(index)">
									<uni-icons type="close" size="20" color="#fff"></uni-icons>
								</view>
							</view>
							<view class="upload-btn" @click="chooseImage" v-if="replyForm.images.length < 9">
								<uni-icons type="camera" size="30" color="#999"></uni-icons>
								<text>上传图片</text>
							</view>
						</view>
					</view>
					<button class="submit-btn" @click="submitReply">提交回复</button>
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
					{ label: '待回复', value: 'pending' },
					{ label: '已回复', value: 'replied' },
					{ label: '已关闭', value: 'closed' }
				],
				consultationList: [],
				page: 1,
				pageSize: 10,
				loading: false,
				noMore: false,
				scrollHeight: 0,
				currentConsultation: null,
				replyForm: {
					content: '',
					images: []
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
				this.consultationList = []
				this.noMore = false
				this.loadData()
			},
			handleStatusChange(status) {
				this.currentStatus = status
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
						title: '离婚财产分割问题咨询',
						description: '我和丈夫结婚5年，现在准备离婚。我们有一套共同房产，还有存款和股票等财产。请问在离婚时，这些财产应该如何分割？',
						status: ['pending', 'replied', 'closed'][Math.floor(Math.random() * 3)],
						statusText: {
							pending: '待回复',
							replied: '已回复',
							closed: '已关闭'
						}[this.status],
						userName: '张女士',
						createTime: '2024-05-09 14:30',
						category: '婚姻家事'
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
					url: `/pages/lawyer/consultation/detail?id=${id}`
				})
			},
			handleReply(consultation) {
				this.currentConsultation = consultation
				this.replyForm.content = ''
				this.replyForm.images = []
				this.$refs.replyPopup.open()
			},
			closeReplyPopup() {
				this.$refs.replyPopup.close()
			},
			chooseImage() {
				uni.chooseImage({
					count: 9 - this.replyForm.images.length,
					success: (res) => {
						this.replyForm.images = [...this.replyForm.images, ...res.tempFilePaths]
					}
				})
			},
			deleteImage(index) {
				this.replyForm.images.splice(index, 1)
			},
			submitReply() {
				if (!this.replyForm.content.trim()) {
					uni.showToast({
						title: '请输入回复内容',
						icon: 'none'
					})
					return
				}
				
				// 模拟提交回复
				uni.showLoading({
					title: '提交中...'
				})
				
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '回复成功',
						icon: 'success'
					})
					
					// 更新列表数据
					const index = this.consultationList.findIndex(item => item.id === this.currentConsultation.id)
					if (index !== -1) {
						this.consultationList[index].status = 'replied'
						this.consultationList[index].statusText = '已回复'
					}
					
					this.closeReplyPopup()
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

.consultation-list {
	background-color: #fff;
	
	.consultation-item {
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.consultation-info {
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
					
					&.replied {
						color: #4cd964;
						background-color: rgba(76, 217, 100, 0.1);
					}
					
					&.closed {
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

.reply-popup {
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
			
			textarea {
				width: 100%;
				height: 200rpx;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				padding: 20rpx;
				font-size: 28rpx;
			}
			
			.upload-list {
				display: flex;
				flex-wrap: wrap;
				
				.upload-item {
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					position: relative;
					
					image {
						width: 100%;
						height: 100%;
						border-radius: 8rpx;
					}
					
					.delete-btn {
						position: absolute;
						right: -10rpx;
						top: -10rpx;
						width: 40rpx;
						height: 40rpx;
						background-color: rgba(0, 0, 0, 0.5);
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				
				.upload-btn {
					width: 200rpx;
					height: 200rpx;
					background-color: #f5f5f5;
					border-radius: 8rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					
					text {
						font-size: 24rpx;
						color: #999;
						margin-top: 10rpx;
					}
				}
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