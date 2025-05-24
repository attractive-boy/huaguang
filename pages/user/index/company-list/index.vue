<template>
  <view class="container">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 重构后的导航栏 -->
    <view class="nav-bar">
      <!-- 返回按钮 -->
      <view class="nav-back" @click="goBack">
        <uv-icon name="arrow-left" size="18" color="#333333"></uv-icon>
        <text class="back-text">返回</text>
      </view>
      
      <!-- 排序选项 - 位于返回按钮下方偏右 -->
      <view class="sort-option" @click="showSortMenu">
        <text class="sort-text">{{ currentSort.label }}</text>
        <view class="sort-arrow">▼</view>
      </view>
      
      <!-- 搜索图标 - 位于导航栏右侧 -->
      <view class="search-icon" @click="handleSearch">
        <uv-icon name="search" size="22" color="#87CEFA"></uv-icon>
      </view>
    </view>
    
    <!-- 简化后的筛选标签栏 -->
    <view class="filter-bar">
      <scroll-view class="filter-tags" scroll-x="true" show-scrollbar="false">
        <view class="tags-wrapper">
          <view 
            v-for="(tag, index) in filterTags" 
            :key="index"
            class="filter-tag"
            :class="{ 'active': tag.active }"
            @click="toggleTag(index)"
          >
            <text class="tag-text" :class="{ 'active': tag.active }">{{ tag.label }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 公司列表 - 带渐变背景 -->
    <scroll-view class="company-list" scroll-y="true" @scrolltolower="loadMore">
      <view 
        v-for="(company, index) in companyList" 
        :key="index"
        class="company-card"
        @click="goToCompanyDetail(company)"
      >
        <!-- 公司Logo占位符 -->
        <view class="company-logo">
          <uv-image 
            v-if="company.logo"
            :src="company.logo" 
            width="50px" 
            height="50px" 
            mode="aspectFill"
            radius="25px"
          ></uv-image>
          <view v-else class="logo-placeholder"></view>
        </view>
        
        <!-- 公司信息 -->
        <view class="company-info">
          <text class="company-name">{{ company.name }}</text>
          <text class="company-desc">{{ company.industry }} · {{ company.type }} {{ company.scale }}</text>
        </view>
        
        <!-- 箭头图标 -->
        <view class="arrow-icon">
          <text class="arrow-text">></text>
        </view>
      </view>
      
      <!-- 加载更多提示 -->
      <view v-if="loading" class="loading-tip">
        <text class="loading-text">加载中...</text>
      </view>
      
      <view v-if="noMore" class="no-more-tip">
        <text class="no-more-text">没有更多数据了</text>
      </view>
    </scroll-view>
    
    <!-- 排序菜单弹窗 -->
    <uv-popup 
      v-model="showSort" 
      mode="bottom" 
      border-radius="20"
      :safe-area-inset-bottom="true"
    >
      <view class="sort-popup">
        <view class="popup-header">
          <text class="popup-title">排序方式</text>
          <view class="close-btn" @click="showSort = false">
            <uv-icon name="close" size="18" color="#666666"></uv-icon>
          </view>
        </view>
        <view class="sort-options">
          <view 
            v-for="(option, index) in sortOptions" 
            :key="index"
            class="sort-item"
            :class="{ 'selected': currentSort.value === option.value }"
            @click="selectSort(option)"
          >
            <text class="sort-item-text" :class="{ 'selected': currentSort.value === option.value }">
              {{ option.label }}
            </text>
            <uv-icon 
              v-if="currentSort.value === option.value"
              name="checkmark" 
              size="16" 
              color="#007AFF"
            ></uv-icon>
          </view>
        </view>
      </view>
    </uv-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 排序相关
      showSort: false,
      currentSort: {
        label: '默认排序',
        value: 'default'
      },
      sortOptions: [
        { label: '默认排序', value: 'default' },
        { label: '最新发布', value: 'newest' },
        { label: '薪资最高', value: 'salary_high' },
        { label: '规模最大', value: 'scale_large' }
      ],
      
      // 筛选标签
      filterTags: [
        { label: '推荐', active: true },
        { label: '附近', active: false },
        { label: '无学历限制', active: false },
        { label: '推荐', active: false },
        { label: '附近', active: false },
        { label: '无学历限制', active: false }
      ],
      
      // 公司列表数据
      companyList: [
        {
          id: 1,
          name: 'XX科技有限公司',
          industry: '互联网',
          type: '软件开发',
          scale: '500-999人',
          logo: ''
        },
        {
          id: 2,
          name: 'XX科技有限公司',
          industry: '互联网',
          type: '软件开发',
          scale: '500-999人',
          logo: ''
        },
        {
          id: 3,
          name: 'XX科技有限公司',
          industry: '互联网',
          type: '软件开发',
          scale: '500-999人',
          logo: ''
        },
        {
          id: 4,
          name: 'XX科技有限公司',
          industry: '互联网',
          type: '软件开发',
          scale: '500-999人',
          logo: ''
        },
        {
          id: 5,
          name: 'XX科技有限公司',
          industry: '互联网',
          type: '软件开发',
          scale: '500-999人',
          logo: ''
        },
        {
          id: 6,
          name: 'XX科技有限公司',
          industry: '互联网',
          type: '软件开发',
          scale: '500-999人',
          logo: ''
        }
      ],
      
      // 加载状态
      loading: false,
      noMore: false,
      page: 1,
      pageSize: 10
    }
  },
  
  onLoad() {
    this.loadCompanyList()
  },
  
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    
    // 显示排序菜单
    showSortMenu() {
      console.log('点击排序按钮')
      this.showSort = true
      console.log('showSort状态:', this.showSort)
    },
    
    // 选择排序方式
    selectSort(option) {
      this.currentSort = option
      this.showSort = false
      this.refreshList()
    },
    
    // 切换筛选标签
    toggleTag(index) {
      this.filterTags[index].active = !this.filterTags[index].active
      this.refreshList()
    },
    
    // 搜索
    handleSearch() {
      uni.navigateTo({
        url: '/pages/user/index/search/index'
      })
    },
    
    // 跳转到公司详情
    goToCompanyDetail(company) {
      uni.navigateTo({
        url: `/pages/user/index/company-detail/index?id=${company.id}`
      })
    },
    
    // 加载公司列表
    async loadCompanyList() {
      if (this.loading || this.noMore) return
      
      this.loading = true
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟数据
        const newData = Array.from({ length: this.pageSize }, (_, i) => ({
          id: this.companyList.length + i + 1,
          name: 'XX科技有限公司',
          industry: '互联网',
          type: '软件开发',
          scale: '500-999人',
          logo: ''
        }))
        
        if (this.page === 1) {
          this.companyList = newData
        } else {
          this.companyList.push(...newData)
        }
        
        this.page++
        
        // 模拟没有更多数据
        if (this.page > 3) {
          this.noMore = true
        }
      } catch (error) {
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    // 刷新列表
    refreshList() {
      this.page = 1
      this.noMore = false
      this.companyList = []
      this.loadCompanyList()
    },
    
    // 加载更多
    loadMore() {
      this.loadCompanyList()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #E0F2FF 0%, #F5FAFF 100%);
  overflow: hidden;
}

// 状态栏占位
.status-bar {
  height: var(--status-bar-height);
  background-color: #F0F8FF;
  flex-shrink: 0;
}

// 重构后的导航栏
.nav-bar {
  height: 80px;
  background-color: #F0F8FF;
  position: relative;
  padding: 0 16px;
  flex-shrink: 0;
  
  .nav-back {
    position: absolute;
    top: 8px;
    left: 16px;
    display: flex;
    align-items: center;
    gap: 2px;
    
    .back-text {
      font-size: 17px;
      color: #333333;
      font-weight: 500;
    }
  }
  
  .sort-option {
    position: absolute;
    top: 30px;
    left: 50px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    min-width: 80px;
    min-height: 30px;
    cursor: pointer;
    
    .sort-text {
      font-size: 13px;
      color: #666666;
      font-weight: 400;
    }
    
    .sort-arrow {
      font-size: 10px;
      color: #666666;
      transform: scale(0.8);
    }
  }
  
  .search-icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
}

// 简化后的筛选栏
.filter-bar {
  height: 50px;
  background-color: #F0F8FF;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  overflow: hidden;
  
  .filter-tags {
    height: 100%;
    width: 100%;
    
    .tags-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 100%;
      padding-right: 20px;
      
      .filter-tag {
        height: 30px;
        padding: 0 12px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        background-color: #EAF4FF;
        white-space: nowrap;
        flex-shrink: 0;
        
        &.active {
          background-color: #D3E9FE;
        }
        
        .tag-text {
          font-size: 13px;
          color: #666666;
          font-weight: 400;
          
          &.active {
            color: #3A8DDE;
            font-weight: 500;
          }
        }
      }
    }
  }
}

// 公司列表 - 带渐变背景
.company-list {
  flex: 1;
  width: 100%;
  padding: 0 16px;
  overflow: hidden;
  box-sizing: border-box;
  
  .company-card {
    width: calc(100% - 0px);
    max-width: 100%;
    box-sizing: border-box;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 12px 16px;
    margin: 12px 0;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    
    .company-logo {
      width: 52px;
      height: 52px;
      margin-right: 10px;
      flex-shrink: 0;
      
      .logo-placeholder {
        width: 52px;
        height: 52px;
        border-radius: 26px;
        background-color: #D9D9D9;
      }
    }
    
    .company-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      overflow: hidden;
      
      .company-name {
        font-size: 16px;
        color: #333333;
        font-weight: 600;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }
      
      .company-desc {
        font-size: 12px;
        color: #888888;
        line-height: 1.2;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }
    }
    
    .arrow-icon {
      width: 20px;
      margin-left: 10px;
      flex-shrink: 0;
      text-align: center;
      
      .arrow-text {
        font-size: 14px;
        color: #AAAAAA;
        font-weight: 400;
      }
    }
  }
  
  .loading-tip, .no-more-tip {
    text-align: center;
    padding: 20px 0;
    
    .loading-text, .no-more-text {
      font-size: 14px;
      color: #999999;
    }
  }
}

// 排序弹窗
.sort-popup {
  background-color: #FFFFFF;
  
  .popup-header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid #F0F0F0;
    
    .popup-title {
      font-size: 16px;
      color: #333333;
      font-weight: 600;
    }
    
    .close-btn {
      padding: 5px;
    }
  }
  
  .sort-options {
    padding: 10px 0;
    
    .sort-item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      
      &.selected {
        background-color: #F8F9FA;
      }
      
      .sort-item-text {
        font-size: 15px;
        color: #333333;
        
        &.selected {
          color: #007AFF;
          font-weight: 500;
        }
      }
    }
  }
}
</style> 