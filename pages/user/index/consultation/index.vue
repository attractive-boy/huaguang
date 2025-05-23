<template>
  <view class="lawyer-consultation-page">
    <!-- 状态栏占位 -->
    <view class="status-bar"></view>
    
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <view class="navbar-content">
        <view class="back-button" @click="goBack">
          <uv-icon name="arrow-left" color="#FFFFFF" size="18"></uv-icon>
          <text class="back-text">返回</text>
        </view>
      </view>
    </view>
    
    <!-- 可滚动内容区域 -->
    <scroll-view class="page-scroll" scroll-y="true" :style="{ height: scrollHeight }">
      <!-- 横幅英雄区域 -->
      <view class="hero-banner">
        <view class="banner-content">
          <view class="text-content">
            <text class="main-title">法律帮助</text>
            <text class="sub-title">一对一咨询</text>
            <text class="description">专业律师为您排忧解难</text>
          </view>
          <view class="lawyer-illustration">
            <!-- 律师插画占位 -->
          </view>
        </view>
      </view>
      
      <!-- 内容区域 -->
      <view class="content-container">
        <!-- 筛选标签栏 -->
        <scroll-view class="filter-tabs" scroll-x="true" show-scrollbar="false">
          <view class="tabs-container">
            <view 
              v-for="(tab, index) in filterTabs" 
              :key="index"
              class="tab-item"
              :class="{ 'tab-active': tab.active }"
              @click="selectTab(index)"
            >
              <text class="tab-text">{{ tab.name }}</text>
            </view>
            <view class="more-tab">
              <text class="more-text">...</text>
            </view>
          </view>
        </scroll-view>
        
        <!-- 律师卡片列表 -->
        <view class="lawyer-list">
          <view 
            v-for="(lawyer, index) in lawyerList" 
            :key="lawyer.id"
            class="lawyer-card"
          >
            <view class="card-content">
              <!-- 律师基本信息区域 -->
              <view class="lawyer-basic-info">
                <!-- 律师头像 -->
                <view class="lawyer-avatar"></view>
                
                <!-- 律师文本信息 -->
                <view class="lawyer-text-info">
                  <text class="lawyer-name">{{ lawyer.name }}</text>
                  <text class="lawyer-tags">{{ lawyer.specialty }} | {{ lawyer.experience }} | {{ lawyer.successRate }}</text>
                  <text class="consult-count">{{ lawyer.consultCount }}</text>
                </view>
              </view>
              
              <!-- 服务项目区域 -->
              <view class="services-section">
                <view class="services">
                  <view 
                    v-for="(service, sIndex) in lawyer.services" 
                    :key="sIndex"
                    class="service-item"
                  >
                    <uv-icon :name="service.icon" color="#3A82F8" size="16"></uv-icon>
                    <text class="service-name">{{ service.type }}</text>
                    <view class="service-price-container">
                      <text class="service-price">¥{{ service.price }}</text>
                      <text class="service-unit">/{{ service.unit }}</text>
                    </view>
                  </view>
                </view>
                
                <!-- 立即咨询按钮 -->
                <view class="consult-button" @click="consultLawyer(lawyer)">
                  <text class="consult-text">立即咨询</text>
                </view>
              </view>
              
              <!-- 成功案例 -->
              <text class="achievement">{{ lawyer.achievement }}</text>
            </view>
            
            <!-- 分割线 -->
            <view v-if="index < lawyerList.length - 1" class="divider"></view>
          </view>
        </view>
        
        <!-- 底部安全区域 -->
        <view class="bottom-safe-area"></view>
      </view>
    </scroll-view>
    
    <!-- 底部导航栏 -->
    <user-tabbar></user-tabbar>
  </view>
</template>

<script>
import UserTabbar from '@/components/tabbar/user-tabbar/user-tabbar.vue'

export default {
  name: 'LawyerConsultationPage',
  components: {
    UserTabbar
  },
  data() {
    return {
      scrollHeight: '100vh',
      // 筛选标签数据
      filterTabs: [
        { name: '劳动纠纷', active: true },
        { name: '合同纠纷', active: false },
        { name: '婚姻家庭', active: false },
        { name: '消费维权', active: false }
      ],
      // 律师信息数据
      lawyerList: [
        {
          id: 1,
          name: '李晓明',
          specialty: '劳动法专长',
          experience: '8年经验',
          successRate: '胜诉率91%',
          consultCount: '400+人已咨询',
          services: [
            { type: '图文咨询', price: 60, unit: '次', icon: 'file-text' },
            { type: '语音咨询', price: 120, unit: '30分钟', icon: 'phone' }
          ],
          achievement: '成功帮助某员工追回工资5万元'
        },
        {
          id: 2,
          name: '王美华',
          specialty: '合同法专长',
          experience: '12年经验',
          successRate: '胜诉率95%',
          consultCount: '600+人已咨询',
          services: [
            { type: '图文咨询', price: 80, unit: '次', icon: 'file-text' },
            { type: '语音咨询', price: 150, unit: '30分钟', icon: 'phone' }
          ],
          achievement: '成功处理合同纠纷案件300余起'
        },
        {
          id: 3,
          name: '张建国',
          specialty: '婚姻家庭法专长',
          experience: '15年经验',
          successRate: '胜诉率88%',
          consultCount: '800+人已咨询',
          services: [
            { type: '图文咨询', price: 70, unit: '次', icon: 'file-text' },
            { type: '语音咨询', price: 140, unit: '30分钟', icon: 'phone' }
          ],
          achievement: '专业处理离婚财产分割案件'
        }
      ]
    }
  },
  mounted() {
    this.calculateScrollHeight()
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },
    // 选择筛选标签
    selectTab(index) {
      this.filterTabs.forEach((tab, i) => {
        tab.active = i === index
      })
    },
    // 咨询律师
    consultLawyer(lawyer) {
      uni.showToast({
        title: `咨询${lawyer.name}`,
        icon: 'none'
      })
      uni.navigateTo({
        url: '/pages/user/index/lawyer-detail/index'
      })
    },
    calculateScrollHeight() {
      // 获取系统信息
      const systemInfo = uni.getSystemInfoSync()
      const statusBarHeight = systemInfo.statusBarHeight || 0
      const navBarHeight = 44 // 导航栏高度
      const tabBarHeight = 50 // 底部导航栏高度
      const safeAreaBottom = systemInfo.safeAreaInsets?.bottom || 0
      
      // 计算可滚动区域高度
      const availableHeight = systemInfo.windowHeight - tabBarHeight - safeAreaBottom
      this.scrollHeight = availableHeight + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.lawyer-consultation-page {
  background-color: #F5F5F7;
  min-height: 100vh;
  position: relative;
}

// 状态栏占位
.status-bar {
  height: var(--status-bar-height);
  background: transparent;
}

// 自定义导航栏
.custom-navbar {
  position: absolute;
  top: var(--status-bar-height);
  left: 0;
  right: 0;
  z-index: 10;
  
  .navbar-content {
    padding: 15px 20px;
    
    .back-button {
      display: flex;
      align-items: center;
      
      .back-text {
        color: #FFFFFF;
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }
}

// 横幅英雄区域
.hero-banner {
  background: linear-gradient(135deg, #6B89F8 0%, #A19DFF 100%);
  padding: 80px 20px 40px;
  position: relative;
  
  .banner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .text-content {
      flex: 1;
      
      .main-title {
        color: #FFFFFF;
        font-size: 28px;
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
      }
      
      .sub-title {
        color: #FFFFFF;
        font-size: 42px;
        font-weight: bold;
        display: block;
        margin-bottom: 15px;
      }
      
      .description {
        color: #FFFFFF;
        font-size: 15px;
        display: block;
      }
    }
    
    .lawyer-illustration {
      width: 120px;
      height: 120px;
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHJ4PSIxMCIvPgo8Y2lyY2xlIGN4PSI0NSIgY3k9IjQwIiByPSIxNSIgZmlsbD0iIzMzMzMzMyIgb3BhY2l0eT0iMC4zIi8+CjxyZWN0IHg9IjMwIiB5PSI1NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzMzMzMzIiBvcGFjaXR5PSIwLjMiLz4KPHN2ZyB4PSI3MCIgeT0iMzAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzMzMzMzMyIgb3BhY2l0eT0iMC4zIi8+Cjx0ZXh0IHg9IjYwIiB5PSI5MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMzMzMzMzIiBvcGFjaXR5PSIwLjMiPuW+i+W4iDwvdGV4dD4KPC9zdmc+') center/contain no-repeat;
      border-radius: 10px;
    }
  }
}

// 内容容器
.content-container {
  background-color: #FFFFFF;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-top: -25px;
  position: relative;
  z-index: 5;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

// 筛选标签栏
.filter-tabs {
  margin-bottom: 20px;
  
  .tabs-container {
    display: flex;
    white-space: nowrap;
  }
  
  .tab-item {
    background-color: #E8EAF6;
    border-radius: 8px;
    padding: 8px 16px;
    margin-right: 10px;
    flex-shrink: 0;
    
    &.tab-active {
      background-color: #4A7DFF;
      
      .tab-text {
        color: #FFFFFF;
      }
    }
    
    .tab-text {
      color: #606C9A;
      font-size: 13px;
    }
  }
  
  .more-tab {
    background-color: #E8EAF6;
    border-radius: 8px;
    padding: 8px 12px;
    flex-shrink: 0;
    
    .more-text {
      color: #606C9A;
      font-size: 13px;
    }
  }
}

// 律师卡片列表
.lawyer-list {
  .lawyer-card {
    background-color: #FFFFFF;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 15px;
    display: flex;
    position: relative;
    
    .card-content {
      flex: 1;
      
      .lawyer-basic-info {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        
        .lawyer-avatar {
          width: 65px;
          height: 65px;
          background-color: #D8D8D8;
          border-radius: 50%;
          margin-right: 15px;
        }
        
        .lawyer-text-info {
          flex: 1;
          
          .lawyer-name {
            color: #333333;
            font-size: 20px;
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
          }
          
          .lawyer-tags {
            color: #666666;
            font-size: 12px;
            display: block;
            margin-bottom: 5px;
          }
          
          .consult-count {
            color: #999999;
            font-size: 11px;
            display: block;
            margin-bottom: 15px;
          }
        }
      }
      
      .services-section {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 10px;
        
        .services {
          flex: 1;
          
          .service-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            
            .service-name {
              color: #333333;
              font-size: 14px;
              margin-left: 8px;
              flex: 1;
            }
            
            .service-price-container {
              display: flex;
              align-items: baseline;
              
              .service-price {
                color: #333333;
                font-size: 17px;
                font-weight: bold;
              }
              
              .service-unit {
                color: #7A6FF0;
                font-size: 14px;
              }
            }
          }
        }
        
        .consult-button {
          background: linear-gradient(90deg, #7A8AFF 0%, #A19DFF 100%);
          border-radius: 20px;
          padding: 8px 20px;
          margin-left: 15px;
          align-self: center;
          
          .consult-text {
            color: #FFFFFF;
            font-size: 14px;
          }
        }
      }
      
      .achievement {
        color: #AAAAAA;
        font-size: 10px;
        display: block;
      }
    }
    
    .divider {
      height: 1px;
      background-color: #E8EAF6;
      margin: 15px 0;
    }
  }
}

// 页面滚动容器
.page-scroll {
  width: 100%;
}

// 底部安全区域
.bottom-safe-area {
  height: 20px;
}
</style> 