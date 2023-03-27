<template>
	<view class="whole-page">
		  <view class="class-haed">
		  	  <view class="haed-item" @click="gohaed(0)"
			        :class="haed_index == 0 ? 'you':''">
		  			 互动消息   			
		  	  </view>
		  	  <view class="haed-item" @click="gohaed(1)" 
			       :class="haed_index == 1 ? 'you':''">
		  			官方公告
		  	  </view>
			  <view class="haed-item" @click="gohaed(2)"
			       :class="haed_index == 2 ? 'you':''">
			  		 系统消息
			  </view>
			  <view class="haed-item" @click="gohaed(3)"
			       :class="haed_index == 3 ? 'you':''">
			  		 审核通知
			  </view>
		  </view>
		  <view class="whole-news">
			    <view class="news-list"  v-for="(item,index) in newslist">
					  <view class="news-top" v-if="haed_index == 0">互动消息</view>
					  <view class="news-top" v-if="haed_index == 1">官方公告</view>
					  <view class="news-top" v-if="haed_index == 2">系统消息</view>
					  <view class="news-top" v-if="haed_index == 3">审核通知</view>
					  <view class="news-tiem">{{item.createTime}}</view>
					  <view class="news-text">
						   {{item.content}}
					  </view>
					  <view class="news-bottom" v-if="item.link != ''"
					       @click="gomeit(item.link)">
						   查看详情 <image src="../../../static/images/you2.png"></image>
					  </view>
				</view>
		  </view>
		   <tabbar :pagePath='pagePath'></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue';
	export default {
		components:{
			tabbar
		},
		data() {
			return {
				pagePath:"pages/index/news/news",
				newslist:[],
	    		haed_index:1,
			}
		},
		onShow(){
			let that = this
	    	that.getmessageList()			
		},
		methods: {
			gomeit(link){
				 window.location = link
			},
			gohaed(e){
				this.haed_index = e 
				this.getmessageList()
			},
			getmessageList(){
				let that = this
				uni.request({
				     url: getApp().globalData.http_url + 'message/list',
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						  'sessionId':  uni.getStorageSync('sessionId')
					 },					 
					 data:{
						 type:that.haed_index,
						 pageNum:1,
						 pageSize:100
					 },
				     success: (res) => {
						console.log(res,'消息列表');
						if(res.data.code == 200){
							that.newslist = res.data.data
						}else if(res.data.code == 403){
							 uni.showToast({
								title:'登录已失效，重新登录',
								icon: 'none',
								duration: 1000
							 });
							setTimeout(() => {
							   uni.navigateTo({
							 	  url:'../longin/longin'
							   })
							}, 1000)			 
						 }else{
							 uni.showToast({
								title:res.data.msg,
								icon: 'none',
								duration: 1000
							 });			 
						 }			 		
				    }
				});
			},
		}
	}
</script>

<style>
  .whole-page {
	  width: 100%;
	  min-height: 100vh;
  }
  .class-haed {
  	 width: 100%;
  	 display: flex;
	 padding: 24upx 10upx;
	 position: fixed;
	 top: 0;
	 background: rgb(255, 255, 255);
  }
  .haed-item {
  	 flex: 1;
  	 text-align: center;
	font-size: 32upx;
  }
  .you {
  	 font-size: 36upx;
  	 font-weight: 500;
  }
  .whole-news {
	  width: 100%;
	  padding: 120upx 20upx 160upx 20upx;
  }
  .news-list {
	  width: 100%;
	  padding: 32upx 40upx;
	  background: rgba(255, 255, 255, 0.3);
	  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
	  border-radius: 40upx;
	  margin-bottom:20upx;
  }
  .news-top {
	  font-weight: 500;
	  font-size: 32upx;
  }
  .news-tiem {
	  color: #999999;
	  padding: 4upx 0;
  }
  .news-text {
	  width: 100%;
	  min-height: 200upx;
	  color: #666666;
	  padding-bottom: 22upx;
  }
  .news-bottom {
	  width: 100%;
	  padding-top: 24upx;
	  border-top: 1upx solid #FFFFFF;
  }
  .news-bottom image {
	  float: right;
	  width: 16upx;
	  height: 24upx;
	  margin-top: 4upx;
  }
</style>
