<template>
	<view class="whole-page">
		  <view class="fans-top">
			    <view class="iem-top">
					  <view class="iem-num">{{directFans.allFans}}</view>
					  <view class="iem-text">全部粉丝</view>
				</view>
				<view class="iem-top">
					  <view class="iem-num">{{directFans.allEffectiveFans}}</view>
					  <view class="iem-text">亲密粉丝</view>
				</view>
		  </view>
		  <view class="fans-head">
			    <view class="head-item">亲密粉丝</view>
				<view class="head-border"></view>
		  </view>
		  <view class="fans-whole">
			    <view class="fans-list" v-for="(item,index) in fansList" :key="index">
			    	    <view class="fans-img">
			    			  <image :src="item.avatarUrl"></image>
			    		</view>
			    		<view class="fans-conet">
			    			  <view class="fans-name">{{item.nickName}}</view>
			    			  <view class="fans-text">{{item.time}}</view>
			    		</view>
			      </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fansList:[],
				directFans:"",
				pageNum:1
			}
		},
		onLoad() {
	       this.getfansList()  
		   this.getfansCount()
		},
		onReachBottom() {
			let that = this
			console.log('触底刷新')
			uni.showLoading({
				title: '加载中...',
				mask:true
			});
			that.pageNum++
			console.log(that.pageNum)
			that.getfansList()
				
		},
		methods: {
			getfansCount(){
			   let that = this
			   uni.request({
			     url: getApp().globalData.http_url + 'mine/fans/fansCount', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId':  uni.getStorageSync('sessionId')
			   	 },
			     success: (res) => {
			   		console.log(res,'粉丝');	
			   		that.directFans = res.data.data 
			       }
			   });
			},
		  getfansList(){
		     let that = this
		     uni.request({
		         url: getApp().globalData.http_url + 'mine/fans/list', 
		     	 method:'GET',
		     	 header:{
		     		 'content-type': 'text/json;charset=UTF-8',
		     		 'sessionId':  uni.getStorageSync('sessionId')
		     	 },
				 data:{
					pageNum:that.pageNum,
					pageSize:50,
				 },
		        success: (res) => {
		     		console.log(res.data,'粉丝列表');	
		  		    if(res.data.code == 200){
					  uni.hideLoading()
					  if(res.data.data == '' && that.pageNum > 1){
					  	uni.showToast({
					  		title:'已经到底了',
					  		icon: 'none',
					  		duration: 1000
					  	});
					  }else{
					  	that.fansList = that.fansList.concat(res.data.data)
					  }	
		  		   }
		         }
		     });
		  },
		
		}
	}
</script>

<style>
	page{
		background-color: #f2f2f2;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.fans-top {
		width: 100%;
		padding: 100upx 40upx;
		text-align: center;
		display: flex;
		background-color: #fff;
	}
	.iem-top {
		flex: 1;
	}
	.iem-num {
		font-size: 34upx;
		font-weight: 500;
	}
	.iem-text {
		font-size: 28upx;
		padding-top: 20upx;
	}
	.fans-head {
		width: 100%;
		padding:0 30upx;
		background-color: #fff;
	}
	.head-item {
		width: 20%;
		text-align: center;
		padding: 30upx 0;
		font-size: 32upx;
	}
	.head-border {
		width: 70upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #222222;
		margin-left: 30upx;
	}
	.fans-whole {
		width: 100%;
		min-height:60vh;
		padding: 20upx;
	}
	.fans-list {
		width: 100%;
		margin-bottom: 16upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 16upx;
		padding: 32upx 40upx;
		display: flex;
	}
	.fans-img {
		float: left;
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
	}
	.fans-conet {
		flex: 1;
		padding-left:16upx;
	}
	.fans-name {
		width: 100%;
		font-size: 30upx;
		color: #000000;
	}
	.fans-text {
		padding-top: 8upx;
		font-size: 28upx;
		color: #666666;
	}
</style>
