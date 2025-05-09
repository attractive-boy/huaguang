<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search-box">
			<view class="search-input">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input type="text" v-model="searchKey" placeholder="搜索律师姓名/专长" @confirm="handleSearch" />
			</view>
		</view>
		
		<!-- 筛选栏 -->
		<view class="filter-bar">
			<view class="filter-item" @click="showFilter('specialty')">
				<text>{{currentSpecialty || '专长领域'}}</text>
				<uni-icons type="down" size="12" color="#666"></uni-icons>
			</view>
			<view class="filter-item" @click="showFilter('experience')">
				<text>{{currentExperience || '执业年限'}}</text>
				<uni-icons type="down" size="12" color="#666"></uni-icons>
			</view>
			<view class="filter-item" @click="showFilter('sort')">
				<text>{{currentSort || '综合排序'}}</text>
				<uni-icons type="down" size="12" color="#666"></uni-icons>
			</view>
		</view>
		
		<!-- 律师列表 -->
		<scroll-view 
			class="lawyer-list" 
			scroll-y 
			@scrolltolower="loadMore"
			:style="{ height: scrollHeight + 'px' }"
		>
			<view class="lawyer-item" v-for="(item, index) in lawyerList" :key="index" @click="goToDetail(item.id)">
				<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				<view class="info">
					<view class="header">
						<text class="name">{{item.name}}</text>
						<text class="title">{{item.title}}</text>
					</view>
					<view class="specialty">
						<text class="label">专长领域：</text>
						<text class="value">{{item.specialty}}</text>
					</view>
					<view class="experience">
						<text class="label">执业年限：</text>
						<text class="value">{{item.experience}}年</text>
					</view>
					<view class="stats">
						<view class="stat-item">
							<text class="num">{{item.caseCount}}</text>
							<text class="label">办案数</text>
						</view>
						<view class="stat-item">
							<text class="num">{{item.rating}}</text>
							<text class="label">好评率</text>
						</view>
						<view class="stat-item">
							<text class="num">{{item.consultCount}}</text>
							<text class="label">咨询量</text>
						</view>
					</view>
				</view>
				<view class="actions">
					<button class="action-btn" @click.stop="handleConsult(item)">
						<uni-icons type="chat" size="16" color="#007AFF"></uni-icons>
						<text>咨询</text>
					</button>
				</view>
			</view>
			
			<!-- 加载更多 -->
			<view class="loading" v-if="loading">加载中...</view>
			<view class="no-more" v-if="noMore">没有更多数据了</view>
		</scroll-view>
		
		<!-- 筛选弹窗 -->
		<uni-popup ref="filterPopup" type="bottom">
			<view class="filter-popup">
				<view class="popup-header">
					<text class="title">{{filterTitle}}</text>
					<text class="close" @click="closeFilter">关闭</text>
				</view>
				<scroll-view class="popup-content" scroll-y>
					<view 
						class="filter-option" 
						v-for="(item, index) in filterOptions" 
						:key="index"
						:class="{ active: currentFilterValue === item.value }"
						@click="selectFilter(item.value)"
					>
						{{item.label}}
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: '',
				currentSpecialty: '',
				currentExperience: '',
				currentSort: '',
				currentFilterType: '',
				currentFilterValue: '',
				filterTitle: '',
				filterOptions: [],
				specialtyOptions: [
					{ label: '全部', value: '' },
					{ label: '婚姻家事', value: '婚姻家事' },
					{ label: '劳动纠纷', value: '劳动纠纷' },
					{ label: '合同纠纷', value: '合同纠纷' },
					{ label: '交通事故', value: '交通事故' },
					{ label: '房产纠纷', value: '房产纠纷' }
				],
				experienceOptions: [
					{ label: '全部', value: '' },
					{ label: '3年以下', value: '3' },
					{ label: '3-5年', value: '5' },
					{ label: '5-10年', value: '10' },
					{ label: '10年以上', value: '10+' }
				],
				sortOptions: [
					{ label: '综合排序', value: 'default' },
					{ label: '好评率最高', value: 'rating' },
					{ label: '咨询量最多', value: 'consult' },
					{ label: '办案数最多', value: 'case' }
				],
				lawyerList: [],
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
			// 减去搜索栏和筛选栏的高度
			this.scrollHeight = systemInfo.windowHeight - uni.upx2px(180)
			
			this.loadData()
		},
		methods: {
			handleSearch() {
				this.page = 1
				this.lawyerList = []
				this.noMore = false
				this.loadData()
			},
			showFilter(type) {
				this.currentFilterType = type
				switch (type) {
					case 'specialty':
						this.filterTitle = '专长领域'
						this.filterOptions = this.specialtyOptions
						this.currentFilterValue = this.currentSpecialty
						break
					case 'experience':
						this.filterTitle = '执业年限'
						this.filterOptions = this.experienceOptions
						this.currentFilterValue = this.currentExperience
						break
					case 'sort':
						this.filterTitle = '排序方式'
						this.filterOptions = this.sortOptions
						this.currentFilterValue = this.currentSort
						break
				}
				this.$refs.filterPopup.open()
			},
			closeFilter() {
				this.$refs.filterPopup.close()
			},
			selectFilter(value) {
				this.currentFilterValue = value
				switch (this.currentFilterType) {
					case 'specialty':
						this.currentSpecialty = value
						break
					case 'experience':
						this.currentExperience = value
						break
					case 'sort':
						this.currentSort = value
						break
				}
				this.closeFilter()
				this.page = 1
				this.lawyerList = []
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
						name: '李律师',
						title: '婚姻家事律师',
						avatar: '/static/avatar/lawyer1.jpg',
						specialty: '婚姻家事、劳动纠纷',
						experience: 5,
						caseCount: 128,
						rating: '98%',
						consultCount: 256
					}))
					
					this.lawyerList = [...this.lawyerList, ...mockData]
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
					url: `/pages/user/lawyer/detail?id=${id}`
				})
			},
			handleConsult(lawyer) {
				uni.navigateTo({
					url: `/pages/user/chat/index?lawyerId=${lawyer.id}`
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

.filter-bar {
	display: flex;
	background-color: #fff;
	padding: 20rpx 0;
	margin-bottom: 20rpx;
	
	.filter-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		
		text {
			font-size: 28rpx;
			color: #666;
			margin-right: 6rpx;
		}
	}
}

.lawyer-list {
	background-color: #fff;
	
	.lawyer-item {
		display: flex;
		padding: 30rpx;
		border-bottom: 1rpx solid #eee;
		
		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		
		.info {
			flex: 1;
			margin-right: 20rpx;
			
			.header {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				
				.name {
					font-size: 32rpx;
					color: #333;
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
			
			.specialty, .experience {
				font-size: 26rpx;
				color: #666;
				margin-bottom: 10rpx;
				
				.label {
					color: #999;
				}
			}
			
			.stats {
				display: flex;
				
				.stat-item {
					margin-right: 30rpx;
					
					.num {
						font-size: 28rpx;
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
		
		.actions {
			display: flex;
			flex-direction: column;
			justify-content: center;
			
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

.filter-popup {
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
		max-height: 600rpx;
		padding: 0 30rpx;
		
		.filter-option {
			padding: 30rpx 0;
			font-size: 28rpx;
			color: #333;
			border-bottom: 1rpx solid #eee;
			
			&:last-child {
				border-bottom: none;
			}
			
			&.active {
				color: #007AFF;
			}
		}
	}
}
</style> 