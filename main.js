import App from './App'
import uView from "uview-ui";

import store from "./store/index.js"
//新建的store文件要main.js注册
Vue.prototype.$store = store;
import http from 'basecall/http.js';
Vue.prototype.$http = http;

//配置公共方法
import common from './common/nick.js'
Vue.prototype.$noMultipleClicks = common.noMultipleClicks;
Vue.prototype.gonav = function(data) { // 页面跳转的事件
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	uni.navigateTo({
		url: '/' + data,
		success: function() {
			uni.hideLoading();
		},
		fail: function() {
			uni.hideLoading();
			uni.showToast({
				mask: true,
				icon: 'none',
				title: '暂无此功能',
				duration: 1000
			});
		}
	})
}

Vue.use(uView)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
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
  return {
    app
  }
}
// #endif