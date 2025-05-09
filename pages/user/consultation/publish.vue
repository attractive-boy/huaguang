<template>
	<view class="container">
		<view class="form">
			<!-- 标题 -->
			<view class="form-item">
				<input 
					type="text" 
					v-model="form.title" 
					placeholder="请输入咨询标题" 
					maxlength="50"
				/>
				<text class="word-count">{{form.title.length}}/50</text>
			</view>
			
			<!-- 分类 -->
			<view class="form-item">
				<picker 
					mode="selector" 
					:range="categories" 
					range-key="name"
					@change="handleCategoryChange"
				>
					<view class="picker">
						<text class="label">选择分类</text>
						<text class="value">{{form.categoryName || '请选择'}}</text>
						<uni-icons type="right" size="16" color="#999"></uni-icons>
					</view>
				</picker>
			</view>
			
			<!-- 内容 -->
			<view class="form-item">
				<textarea 
					v-model="form.content" 
					placeholder="请详细描述您的问题，以便获得更准确的回答" 
					maxlength="1000"
				></textarea>
				<text class="word-count">{{form.content.length}}/1000</text>
			</view>
			
			<!-- 图片上传 -->
			<view class="form-item">
				<view class="upload-title">
					<text>上传图片</text>
					<text class="tip">最多上传9张图片</text>
				</view>
				<view class="upload-list">
					<view 
						class="upload-item" 
						v-for="(item, index) in form.images" 
						:key="index"
					>
						<image :src="item" mode="aspectFill"></image>
						<view class="delete-btn" @click="deleteImage(index)">
							<uni-icons type="close" size="20" color="#fff"></uni-icons>
						</view>
					</view>
					<view class="upload-btn" @click="chooseImage" v-if="form.images.length < 9">
						<uni-icons type="camera" size="30" color="#999"></uni-icons>
						<text>上传图片</text>
					</view>
				</view>
			</view>
			
			<!-- 匿名发布 -->
			<view class="form-item">
				<view class="switch-item">
					<text>匿名发布</text>
					<switch 
						:checked="form.isAnonymous" 
						@change="handleAnonymousChange"
						color="#007AFF"
					/>
				</view>
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="bottom-bar">
			<button class="submit-btn" @click="handleSubmit">发布咨询</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [
					{ id: 1, name: '婚姻家事' },
					{ id: 2, name: '劳动纠纷' },
					{ id: 3, name: '合同纠纷' },
					{ id: 4, name: '交通事故' },
					{ id: 5, name: '房产纠纷' }
				],
				form: {
					title: '',
					categoryId: null,
					categoryName: '',
					content: '',
					images: [],
					isAnonymous: false
				}
			}
		},
		methods: {
			handleCategoryChange(e) {
				const index = e.detail.value
				this.form.categoryId = this.categories[index].id
				this.form.categoryName = this.categories[index].name
			},
			handleAnonymousChange(e) {
				this.form.isAnonymous = e.detail.value
			},
			chooseImage() {
				uni.chooseImage({
					count: 9 - this.form.images.length,
					success: (res) => {
						this.form.images = [...this.form.images, ...res.tempFilePaths]
					}
				})
			},
			deleteImage(index) {
				this.form.images.splice(index, 1)
			},
			validateForm() {
				if (!this.form.title.trim()) {
					uni.showToast({
						title: '请输入咨询标题',
						icon: 'none'
					})
					return false
				}
				
				if (!this.form.categoryId) {
					uni.showToast({
						title: '请选择咨询分类',
						icon: 'none'
					})
					return false
				}
				
				if (!this.form.content.trim()) {
					uni.showToast({
						title: '请输入咨询内容',
						icon: 'none'
					})
					return false
				}
				
				return true
			},
			handleSubmit() {
				if (!this.validateForm()) return
				
				// 模拟提交
				uni.showLoading({
					title: '发布中...'
				})
				
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '发布成功',
						icon: 'success'
					})
					
					// 返回上一页
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}, 1500)
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

.form {
	background-color: #fff;
	padding: 30rpx;
	
	.form-item {
		margin-bottom: 30rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
		
		input {
			height: 80rpx;
			font-size: 32rpx;
			border-bottom: 1rpx solid #eee;
		}
		
		.picker {
			display: flex;
			align-items: center;
			height: 80rpx;
			border-bottom: 1rpx solid #eee;
			
			.label {
				font-size: 32rpx;
				color: #333;
				margin-right: 20rpx;
			}
			
			.value {
				flex: 1;
				font-size: 32rpx;
				color: #999;
			}
		}
		
		textarea {
			width: 100%;
			height: 300rpx;
			font-size: 32rpx;
			line-height: 1.6;
			padding: 20rpx 0;
		}
		
		.word-count {
			display: block;
			text-align: right;
			font-size: 24rpx;
			color: #999;
			margin-top: 10rpx;
		}
		
		.upload-title {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			
			text {
				font-size: 32rpx;
				color: #333;
			}
			
			.tip {
				font-size: 24rpx;
				color: #999;
				margin-left: 20rpx;
			}
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
		
		.switch-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			text {
				font-size: 32rpx;
				color: #333;
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
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
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
</style> 