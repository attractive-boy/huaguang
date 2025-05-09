<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="basic-info">
			<view class="header">
				<image class="avatar" :src="lawyer.avatar" mode="aspectFill"></image>
				<view class="info">
					<view class="name-row">
						<text class="name">{{lawyer.name}}</text>
						<text class="title">{{lawyer.title}}</text>
					</view>
					<view class="stats">
						<view class="stat-item">
							<text class="num">{{lawyer.caseCount}}</text>
							<text class="label">办案数</text>
						</view>
						<view class="stat-item">
							<text class="num">{{lawyer.rating}}</text>
							<text class="label">好评率</text>
						</view>
						<view class="stat-item">
							<text class="num">{{lawyer.consultCount}}</text>
							<text class="label">咨询量</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="tags">
				<text class="tag" v-for="(item, index) in lawyer.tags" :key="index">{{item}}</text>
			</view>
			
			<view class="actions">
				<button class="action-btn" @click="handleConsult">
					<uni-icons type="chat" size="16" color="#fff"></uni-icons>
					<text>立即咨询</text>
				</button>
				<button class="action-btn outline" @click="handleAppointment">
					<uni-icons type="calendar" size="16" color="#007AFF"></uni-icons>
					<text>预约见面</text>
				</button>
			</view>
		</view>
		
		<!-- 专长领域 -->
		<view class="section">
			<view class="section-title">
				<text>专长领域</text>
			</view>
			<view class="specialty-list">
				<view class="specialty-item" v-for="(item, index) in lawyer.specialties" :key="index">
					<text class="name">{{item.name}}</text>
					<text class="desc">{{item.desc}}</text>
				</view>
			</view>
		</view>
		
		<!-- 执业经历 -->
		<view class="section">
			<view class="section-title">
				<text>执业经历</text>
			</view>
			<view class="experience-list">
				<view class="experience-item" v-for="(item, index) in lawyer.experiences" :key="index">
					<view class="time">{{item.time}}</view>
					<view class="content">
						<text class="title">{{item.title}}</text>
						<text class="desc">{{item.desc}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 成功案例 -->
		<view class="section">
			<view class="section-title">
				<text>成功案例</text>
				<text class="more" @click="showMoreCases">查看更多</text>
			</view>
			<view class="case-list">
				<view class="case-item" v-for="(item, index) in lawyer.cases" :key="index" @click="showCaseDetail(item)">
					<view class="case-info">
						<text class="title">{{item.title}}</text>
						<text class="desc">{{item.desc}}</text>
						<view class="meta">
							<text class="time">{{item.time}}</text>
							<text class="views">{{item.views}}次浏览</text>
						</view>
					</view>
					<image v-if="item.image" :src="item.image" mode="aspectFill" class="case-image"></image>
				</view>
			</view>
		</view>
		
		<!-- 用户评价 -->
		<view class="section">
			<view class="section-title">
				<text>用户评价</text>
				<text class="more" @click="showMoreReviews">查看更多</text>
			</view>
			<view class="review-list">
				<view class="review-item" v-for="(item, index) in lawyer.reviews" :key="index">
					<view class="review-header">
						<image class="avatar" :src="item.userAvatar" mode="aspectFill"></image>
						<view class="info">
							<text class="name">{{item.userName}}</text>
							<view class="rating">
								<uni-icons 
									v-for="i in 5" 
									:key="i"
									:type="i <= item.rating ? 'star-filled' : 'star'" 
									size="12" 
									:color="i <= item.rating ? '#ff9500' : '#ddd'"
								></uni-icons>
							</view>
						</view>
						<text class="time">{{item.time}}</text>
					</view>
					<text class="content">{{item.content}}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<button class="action-btn" @click="handleConsult">
				<uni-icons type="chat" size="16" color="#fff"></uni-icons>
				<text>立即咨询</text>
			</button>
			<button class="action-btn outline" @click="handleAppointment">
				<uni-icons type="calendar" size="16" color="#007AFF"></uni-icons>
				<text>预约见面</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				lawyer: {
					name: '李律师',
					title: '婚姻家事律师',
					avatar: '/static/avatar/lawyer1.jpg',
					caseCount: 128,
					rating: '98%',
					consultCount: 256,
					tags: ['婚姻家事', '劳动纠纷', '合同纠纷', '交通事故'],
					specialties: [
						{
							name: '婚姻家事',
							desc: '擅长处理离婚、财产分割、子女抚养等婚姻家事纠纷'
						},
						{
							name: '劳动纠纷',
							desc: '擅长处理劳动合同、工伤赔偿、社保等劳动纠纷'
						}
					],
					experiences: [
						{
							time: '2018-2020',
							title: '某知名律师事务所',
							desc: '担任婚姻家事部律师，处理各类婚姻家事案件'
						},
						{
							time: '2020-至今',
							title: '某大型律师事务所',
							desc: '担任高级合伙人，专注于婚姻家事和劳动纠纷领域'
						}
					],
					cases: [
						{
							id: 1,
							title: '离婚财产分割纠纷',
							desc: '成功帮助当事人获得房产和存款的合理分割',
							time: '2024-03-15',
							views: 256,
							image: '/static/case/case1.jpg'
						},
						{
							id: 2,
							title: '劳动合同纠纷',
							desc: '帮助当事人获得经济补偿金和未签订劳动合同的双倍工资',
							time: '2024-02-20',
							views: 189,
							image: '/static/case/case2.jpg'
						}
					],
					reviews: [
						{
							userName: '张女士',
							userAvatar: '/static/avatar/user1.jpg',
							rating: 5,
							content: '李律师非常专业，帮我解决了离婚财产分割的问题，非常感谢！',
							time: '2024-05-01'
						},
						{
							userName: '王先生',
							userAvatar: '/static/avatar/user2.jpg',
							rating: 5,
							content: '李律师很有耐心，解答问题很详细，推荐！',
							time: '2024-04-28'
						}
					]
				}
			}
		},
		onLoad(options) {
			this.id = options.id
			// 这里可以根据id加载律师详情
		},
		methods: {
			handleConsult() {
				uni.navigateTo({
					url: `/pages/user/chat/index?lawyerId=${this.id}`
				})
			},
			handleAppointment() {
				uni.navigateTo({
					url: `/pages/user/appointment/index?lawyerId=${this.id}`
				})
			},
			showMoreCases() {
				uni.navigateTo({
					url: `/pages/user/lawyer/cases?lawyerId=${this.id}`
				})
			},
			showMoreReviews() {
				uni.navigateTo({
					url: `/pages/user/lawyer/reviews?lawyerId=${this.id}`
				})
			},
			showCaseDetail(case_) {
				uni.navigateTo({
					url: `/pages/user/lawyer/case-detail?id=${case_.id}`
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

.basic-info {
	background-color: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;
	
	.header {
		display: flex;
		margin-bottom: 20rpx;
		
		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			margin-right: 30rpx;
		}
		
		.info {
			flex: 1;
			
			.name-row {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				
				.name {
					font-size: 36rpx;
					color: #333;
					font-weight: bold;
					margin-right: 20rpx;
				}
				
				.title {
					font-size: 24rpx;
					color: #007AFF;
					background-color: rgba(0, 122, 255, 0.1);
					padding: 4rpx 12rpx;
					border-radius: 4rpx;
				}
			}
			
			.stats {
				display: flex;
				
				.stat-item {
					margin-right: 30rpx;
					
					.num {
						font-size: 32rpx;
						color: #333;
						margin-right: 6rpx;
					}
					
					.label {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
	}
	
	.tags {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 30rpx;
		
		.tag {
			font-size: 24rpx;
			color: #666;
			background-color: #f5f5f5;
			padding: 6rpx 20rpx;
			border-radius: 30rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
		}
	}
	
	.actions {
		display: flex;
		
		.action-btn {
			flex: 1;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			border-radius: 40rpx;
			margin: 0;
			
			&:first-child {
				background-color: #007AFF;
				color: #fff;
				margin-right: 20rpx;
			}
			
			&.outline {
				background-color: #fff;
				color: #007AFF;
				border: 1rpx solid #007AFF;
			}
			
			&::after {
				display: none;
			}
			
			text {
				margin-left: 6rpx;
			}
		}
	}
}

.section {
	background-color: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;
	
	.section-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		
		text {
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
			
			&.more {
				font-size: 28rpx;
				color: #999;
				font-weight: normal;
			}
		}
	}
	
	.specialty-list {
		.specialty-item {
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.name {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			.desc {
				font-size: 26rpx;
				color: #666;
				line-height: 1.6;
			}
		}
	}
	
	.experience-list {
		.experience-item {
			display: flex;
			margin-bottom: 30rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.time {
				width: 160rpx;
				font-size: 26rpx;
				color: #999;
			}
			
			.content {
				flex: 1;
				
				.title {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 10rpx;
				}
				
				.desc {
					font-size: 26rpx;
					color: #666;
					line-height: 1.6;
				}
			}
		}
	}
	
	.case-list {
		.case-item {
			display: flex;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #eee;
			
			&:last-child {
				border-bottom: none;
			}
			
			.case-info {
				flex: 1;
				margin-right: 20rpx;
				
				.title {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 10rpx;
				}
				
				.desc {
					font-size: 26rpx;
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
					
					.time, .views {
						font-size: 24rpx;
						color: #999;
						margin-right: 20rpx;
					}
				}
			}
			
			.case-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 8rpx;
			}
		}
	}
	
	.review-list {
		.review-item {
			padding: 20rpx 0;
			border-bottom: 1rpx solid #eee;
			
			&:last-child {
				border-bottom: none;
			}
			
			.review-header {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				
				.avatar {
					width: 60rpx;
					height: 60rpx;
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
					
					.rating {
						display: flex;
					}
				}
				
				.time {
					font-size: 24rpx;
					color: #999;
				}
			}
			
			.content {
				font-size: 26rpx;
				color: #666;
				line-height: 1.6;
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
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.action-btn {
		flex: 1;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		border-radius: 40rpx;
		margin: 0;
		
		&:first-child {
			background-color: #007AFF;
			color: #fff;
			margin-right: 20rpx;
		}
		
		&.outline {
			background-color: #fff;
			color: #007AFF;
			border: 1rpx solid #007AFF;
		}
		
		&::after {
			display: none;
		}
		
		text {
			margin-left: 6rpx;
		}
	}
}
</style> 