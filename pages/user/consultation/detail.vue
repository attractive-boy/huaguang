<template>
	<view class="container">
		<!-- 咨询内容 -->
		<view class="consultation-content">
			<view class="header">
				<text class="title">{{consultation.title}}</text>
				<view class="meta">
					<text class="category">{{consultation.categoryName}}</text>
					<text class="views">{{consultation.views}}次浏览</text>
					<text class="time">{{consultation.createTime}}</text>
				</view>
			</view>
			
			<view class="content">
				<text class="text">{{consultation.content}}</text>
				<view class="images" v-if="consultation.images && consultation.images.length">
					<image 
						v-for="(item, index) in consultation.images" 
						:key="index" 
						:src="item" 
						mode="widthFix"
						@click="previewImage(index)"
					></image>
				</view>
			</view>
			
			<view class="user-info">
				<image class="avatar" :src="consultation.userAvatar" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{consultation.userName}}</text>
					<text class="desc">{{consultation.userDesc}}</text>
				</view>
			</view>
		</view>
		
		<!-- 回答列表 -->
		<view class="answer-list">
			<view class="section-title">
				<text>全部回答</text>
				<text class="count">({{answerList.length}})</text>
			</view>
			
			<view class="answer-item" v-for="(item, index) in answerList" :key="index">
				<view class="answer-header">
					<image class="avatar" :src="item.userAvatar" mode="aspectFill"></image>
					<view class="info">
						<text class="name">{{item.userName}}</text>
						<text class="title">{{item.userTitle}}</text>
					</view>
					<view class="actions">
						<button class="action-btn" @click="handleLike(item)">
							<uni-icons :type="item.isLiked ? 'heart-filled' : 'heart'" size="20" :color="item.isLiked ? '#ff4d4f' : '#999'"></uni-icons>
							<text>{{item.likes}}</text>
						</button>
					</view>
				</view>
				
				<view class="answer-content">
					<text class="text">{{item.content}}</text>
					<view class="images" v-if="item.images && item.images.length">
						<image 
							v-for="(img, imgIndex) in item.images" 
							:key="imgIndex" 
							:src="img" 
							mode="widthFix"
							@click="previewAnswerImage(item.images, imgIndex)"
						></image>
					</view>
				</view>
				
				<view class="answer-footer">
					<text class="time">{{item.createTime}}</text>
					<view class="actions">
						<button class="action-btn" @click="handleReply(item)">
							<uni-icons type="chat" size="20" color="#999"></uni-icons>
							<text>回复</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="input-box">
				<input 
					type="text" 
					v-model="replyContent" 
					placeholder="写下你的回答..." 
					@confirm="handleSubmit"
				/>
			</view>
			<button class="submit-btn" @click="handleSubmit">发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				consultation: {
					title: '离婚财产分割问题咨询',
					categoryName: '婚姻家事',
					views: 1234,
					createTime: '2024-05-09',
					content: '我和丈夫结婚5年，现在准备离婚。我们有一套共同房产，还有存款和股票等财产。请问在离婚时，这些财产应该如何分割？房产是婚后购买的，首付是我父母出的，但房产证上写的是我们两个人的名字。',
					images: [
						'/static/consultation/divorce1.jpg',
						'/static/consultation/divorce2.jpg'
					],
					userAvatar: '/static/avatar/user1.jpg',
					userName: '张女士',
					userDesc: '普通用户'
				},
				answerList: [
					{
						id: 1,
						userAvatar: '/static/avatar/lawyer1.jpg',
						userName: '李律师',
						userTitle: '婚姻家事律师',
						content: '根据《婚姻法》规定，婚后购买的房产属于夫妻共同财产。虽然首付是您父母出资，但房产证登记在双方名下，视为对双方的赠与。在离婚时，房产应当平均分割。\n\n对于存款和股票等财产，如果是在婚姻存续期间获得的，也属于夫妻共同财产，原则上应当平均分割。\n\n建议您：\n1. 收集相关财产证据\n2. 与对方协商分割方案\n3. 如果协商不成，可以起诉离婚并要求分割财产',
						images: [
							'/static/consultation/answer1.jpg'
						],
						createTime: '2024-05-09 14:30',
						likes: 56,
						isLiked: false
					}
				],
				replyContent: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			// 这里可以根据id加载咨询详情
		},
		methods: {
			previewImage(index) {
				uni.previewImage({
					urls: this.consultation.images,
					current: index
				})
			},
			previewAnswerImage(images, index) {
				uni.previewImage({
					urls: images,
					current: index
				})
			},
			handleLike(answer) {
				answer.isLiked = !answer.isLiked
				answer.likes += answer.isLiked ? 1 : -1
			},
			handleReply(answer) {
				this.replyContent = `@${answer.userName} `
			},
			handleSubmit() {
				if (!this.replyContent.trim()) {
					uni.showToast({
						title: '请输入回答内容',
						icon: 'none'
					})
					return
				}
				
				// 模拟提交回答
				const newAnswer = {
					id: this.answerList.length + 1,
					userAvatar: '/static/avatar/user1.jpg',
					userName: '张女士',
					userTitle: '普通用户',
					content: this.replyContent,
					images: [],
					createTime: '刚刚',
					likes: 0,
					isLiked: false
				}
				
				this.answerList.unshift(newAnswer)
				this.replyContent = ''
				
				uni.showToast({
					title: '发布成功',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx;
}

.consultation-content {
	background-color: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;
	
	.header {
		margin-bottom: 30rpx;
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 20rpx;
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
	
	.content {
		margin-bottom: 30rpx;
		
		.text {
			font-size: 30rpx;
			color: #333;
			line-height: 1.6;
			margin-bottom: 20rpx;
		}
		
		.images {
			image {
				width: 100%;
				margin-bottom: 20rpx;
				border-radius: 8rpx;
			}
		}
	}
	
	.user-info {
		display: flex;
		align-items: center;
		padding-top: 20rpx;
		border-top: 1rpx solid #eee;
		
		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		
		.info {
			flex: 1;
			
			.name {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 6rpx;
			}
			
			.desc {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
}

.answer-list {
	background-color: #fff;
	padding: 30rpx;
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		
		.count {
			font-size: 28rpx;
			color: #999;
			font-weight: normal;
		}
	}
	
	.answer-item {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #eee;
		
		&:last-child {
			border-bottom: none;
		}
		
		.answer-header {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			
			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			
			.info {
				flex: 1;
				
				.name {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 6rpx;
				}
				
				.title {
					font-size: 24rpx;
					color: #999;
				}
			}
			
			.actions {
				.action-btn {
					display: flex;
					align-items: center;
					background: none;
					border: none;
					padding: 0;
					margin: 0;
					line-height: 1;
					
					&::after {
						display: none;
					}
					
					text {
						font-size: 24rpx;
						color: #999;
						margin-left: 6rpx;
					}
				}
			}
		}
		
		.answer-content {
			margin-bottom: 20rpx;
			
			.text {
				font-size: 30rpx;
				color: #333;
				line-height: 1.6;
				margin-bottom: 20rpx;
			}
			
			.images {
				image {
					width: 100%;
					margin-bottom: 20rpx;
					border-radius: 8rpx;
				}
			}
		}
		
		.answer-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.time {
				font-size: 24rpx;
				color: #999;
			}
			
			.actions {
				.action-btn {
					display: flex;
					align-items: center;
					background: none;
					border: none;
					padding: 0;
					margin: 0;
					line-height: 1;
					
					&::after {
						display: none;
					}
					
					text {
						font-size: 24rpx;
						color: #999;
						margin-left: 6rpx;
					}
				}
			}
		}
	}
}

.bottom-bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	padding: 20rpx 30rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.input-box {
		flex: 1;
		background-color: #f5f5f5;
		border-radius: 30rpx;
		padding: 10rpx 20rpx;
		margin-right: 20rpx;
		
		input {
			height: 60rpx;
			font-size: 28rpx;
		}
	}
	
	.submit-btn {
		width: 120rpx;
		height: 60rpx;
		background-color: #007AFF;
		color: #fff;
		font-size: 28rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		
		&::after {
			display: none;
		}
	}
}
</style> 