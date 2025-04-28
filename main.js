import App from './App'
import uvUI from '@/uni_modules/uv-ui-tools'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

Vue.use(uvUI);

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  app.use(uvUI);
  
  return {
    app
  }
}
// #endif

// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uvUI)之后执行
uni.$uv.setConfig({
	// 修改$uv.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$uv.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$uv.props对象的属性
	props: {
		// 修改uv-text组件的size参数的默认值，注意：默认值都要用default声明
	}
})