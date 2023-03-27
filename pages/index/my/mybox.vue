<template>
	<!-- <view class="whole-page">
		   <view class="whole-order">
			   <view class="order-top">
					 <view class="top-title">盲盒名称</view>
					 <view class="right-more">待抽奖</view>
			   </view>
			   <view class="order-tiem">2022-04-20</view>
			   <view class="order-button">立即抽奖</view>
		   </view>
		   <view class="whole-order">
			   <view class="order-top">
					 <view class="top-title">盲盒名称</view>
					 <view class="right-more cot">待领取</view>
			   </view>
			   <view class="order-tiem">2022-04-20</view>
			   <view class="order-for">
					 <view class="order-list" v-for="(item,index) in bannerTop">
						   <view class="order-img">
								 <image src="../../../static/images/tp.png"></image>
						   </view>		
						   <view class="order-title">貂蝉</view>
					 </view>
			   </view>
			   <view class="order-button">立即领取</view>
		   </view>
		   <view class="whole-order">
			   <view class="order-top">
					 <view class="top-title">盲盒名称</view>
					 <view class="right-more fun">待抽奖</view>
			   </view>
			   <view class="order-tiem">2022-04-20</view>
			   <view class="order-for">
					 <view class="order-list" v-for="(item,index) in bannerTop">
						   <view class="order-img">
								 <image src="../../../static/images/tp.png"></image>
						   </view>		
						   <view class="order-title">貂蝉</view>
					 </view>
			   </view>
			   <view class="order-button border">立即领取</view>
		   </view>
	</view> -->
	<view class="whole-page">
		  <image class="whole-image" src="../../../static/images/bj.png"></image>
		  <view class="draw-head">
			    <view class="head-item"  @click="gohead(index)"
				      v-for="(item,index) in head_list"
				     :class="head_index == index ? 'colt':''"> 
			    	 {{item.name}}({{item.count}}) 		    
			    </view>	    
		  </view>
		  <view class="whole-post">
			    <view class="draw-button" @click="gogentsa" v-if="head_list != ''">开始抽X{{head_data.count}}</view>
				<view class="draw-button" v-else>暂无抽奖</view>
			    <view class="draw-whole"  v-for="(item,index) in draw_list" v-if="draw_list !=''">
					  <view class="draw-top">
						    <view class="fl-left" style="font-size: 32upx;">抽奖时间：{{item.lotteryTime}}</view>
						<!-- 	<view class="fl-right" style="" :class="item.blindBoxIsReceive == 1 ? 'yanse':'yanse2'"
							  >{{item.blindBoxIsReceive == 1 ? '已领取':'待领取'}}</view> -->
					  </view>
					  <view class="draw-for">
						    <view class="draw-list" v-for="(i,itemindex) in item.prizesList">
						      	  <view class="for-img">
									    <image :src="img_url + i.pic" mode="aspectFill"></image>
								  </view>		    
								  <view class="for-title">{{i.goodsName}}</view>
						    </view>
					  </view>
					  <view class="for-button" @click="goreceive(index)">查看详情</view>
					<!-- <view class="for-button" @click="goreceive(index)">
					        {{item.blindBoxIsReceive == 1 ? '查看详情':'立即领取'}}</view> -->
				</view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerTop:[{},{},{},{},{},{},{},{},{}],
				draw_list:[],
				head_index:0,
				head_list:[],
				head_data:"",
				img_url:"",
				userId:"",
				sessionId:"",
				// img_url:'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/', // 正式 prod // 测试 test
				// http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api // 测试 test
			}
		},
		onLoad(e) {
		   this.sessionId = uni.getStorageSync('sessionId')
		   this.userId = uni.getStorageSync('userId')
	 	   this.img_url = getApp().globalData.img_url
		   this.getuserLotteryCount()
		   this.getuserorderList()  
		},
		methods: {
		  gohead(e){
			this.head_index = e  
			this.head_data = this.head_list[e]
		  			
		  },
		  goreceive(e){
			 if(this.is_app){
				 uni.navigateTo({
				 	 url: 'receive?index='+ e + '&sessionId='+ this.sessionId
				 }) 
			 }else{
				uni.navigateTo({
					 url: 'receive?index='+ e
				}) 
			 }		 
		  },
		  gogentsa(){
			 let that = this
			 console.log(that.head_data)
			 uni.showLoading({
				title: '抽奖中',
				mask:true
			 });
			 uni.request({
				 url: getApp().globalData.http_url + 'blindBox/lottery', 
				 method:'GET',
				 header:{
					 'content-type': 'text/json;charset=UTF-8',
					 'sessionId': that.sessionId
				 },
				 data:{
					 orderId: that.head_data.orderId
				 },
				  success: (res) => {
					console.log(res.data);
					uni.hideLoading()
					if(res.data.code == 200){
						 uni.showToast({
							title:'抽奖成功 !',
							icon: 'none',
							duration: 1500
						 });
					}else{
						uni.showToast({
							title:res.data.message,
							icon: 'none',
							duration: 1500
						});	 
					}
					this.getuserLotteryCount()
					this.getuserorderList()
					
				  }
			 });
		  },
		  getuserorderList(){
			  let that = this
			   uni.request({
				 url: getApp().globalData.http_url + 'blindBox/orderList', 
				 method:'GET',
				 header:{
					 'content-type': 'text/json;charset=UTF-8',
					 'sessionId': that.sessionId
				 },
				 data:{
					 pageNum:1,
					 pageSize:100
				 },
				  success: (res) => {
					console.log(res.data,'历史抽奖信息列表');
					that.draw_list = res.data.data
					
				  }
			  });
		  },
		  getuserLotteryCount(){
			  let that = this
			   uni.request({
				 url: getApp().globalData.http_url + 'blindBox/userLotteryCount', 
				 method:'GET',
				 header:{
					 'content-type': 'text/json;charset=UTF-8',
					 'sessionId': that.sessionId
				 },
				  success: (res) => {
					console.log(res.data,'可抽奖信息')							
					if( res.data.data != ""){
						var i = that.head_index
						that.head_list = res.data.data
						that.head_data = res.data.data[i]
					}
				  }
			  });
		  }
		}
	}
</script>

<style>
	page{
	  background-color: #f7f7f7;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.whole-page {
		width: 100%;
		padding: 40upx 20upx;
	}
	.whole-order {
		width: 100%;
		background-color: #fff;
		border-radius: 40upx;
		margin-bottom: 10upx;
	}
	.order-top {
		width: 100%;
		padding: 24upx 32upx;
	}
	.top-title {
		float: left;
		font-weight: 500;
		font-size: 30upx;
		color: #000000;
	}
	.right-more {
		float: right;
		font-size: 30upx;
		color: #000000;
	}
	.right-more image{
		float: right;
		width: 16upx;
		height: 26upx;
		margin: 4upx 0 0 6upx;
	}
	.order-for {
		width: 100%;
		padding-left: 32upx;
		overflow-x: scroll;
		overflow-y: hidden;
		display: -webkit-box;
		background: #fff;
		padding-bottom: 30upx;
	}
	.order-list {
		width: 138upx;
		margin-right: 8upx;
	}
	.order-img {
		width: 100%;
		height: 138upx;
		border-radius: 16upx;
	}
	.order-title {
		width: 100%;
		padding: 10upx 0;
		font-weight: 400;
		font-size: 26upx;
		color: #000000;
		text-align: center;
	}
	.order-tiem {
		font-size: 26upx;
		padding: 0 0 20upx 32upx;
		color: #999999;
	}
	.order-button {
		width: 640upx;
		height: 84upx;
		text-align: center;
		line-height: 84upx;
		background: linear-gradient(90deg, #EF7FDF 0.16%, #7AB9EF 100.16%);
		border-radius: 42upx;
		font-size: 32upx;
		color: #FFFFFF;
		margin:  32upx auto;
	}
	.cot {
		color: #4664F5;
	}
	.fun {
		color: #4664F5;
		opacity: 0.5;
	}
	.border {
		border: 2upx solid #4664F5;
		color: #4664F5;
		background: none;
	}
	
	/*  */
	.whole-page {
		min-height: 110vh;
		background-color: #9512ED;
	}
	.draw-head {
		width: 100%;
		display: flex;
		position: fixed;
		top: 0;
		z-index: 99;
		padding: 20upx 24upx;
		background: rgba(0, 0, 0, 0.40);
	}
	.head-item {
		flex: 1;
		font-size: 28upx;
		color: #FFFFFF;
		text-align: center;
	}
	.colt {
		color: #FFD600;
	}
	.whole-image{
		width: 100%;
		height: 540upx;
	}
	.whole-post {
		width: 100%;
		z-index: 9;
	   margin-top: -60upx;
		padding: 0 26upx 30upx 26upx;
	}
	.draw-img {
		width: 354upx;
		height: 360upx;
		margin: 0 auto;
	}
	.draw-img image{
		width: 100%;
		height: 100%;
	}
	.draw-button {
		width: 100%;
		height: 104upx;
		text-align: center;
		line-height: 98upx;
		margin: 40upx auto;
		font-size: 36upx;
		color: #fff;
		font-weight: 500;
		background: #6E3DDE;
		box-shadow: inset 0px -8upx 40upx #4E008C, inset 0px 8upx 20upx #FFFFFF;
		border-radius: 94upx;
		
	}
	.draw-whole {
		width: 100%;
		background: #FFFFFF;
		border-radius: 10px;
		margin-bottom: 12upx;
	}
	.draw-top {
		width: 100%;
		padding: 40upx 32upx 10upx 32upx;
	}
	.draw-for {
		width: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
		padding-left: 26rpx;
		display: -webkit-box;
		padding: 20upx;
	}
	.draw-list {
		width: 160upx;
		margin: 12upx;
	}
	.for-img {
		width: 100%;
		height: 160upx;
		border-radius: 6upx;
	}
	.for-img image {
		width: 100%;
		height: 100%;
	}	
	.for-title {
		padding-top: 10upx;
		font-weight: 500;
		font-size: 28upx;
		text-overflow: -o-ellipsis-lastline;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp: 2;
	  line-clamp: 2;
	  -webkit-box-orient: vertical;
	}
	.for-button {
		width: 634upx;
		height: 88upx;
		text-align: center;
	    line-height: 88upx;
		background: #9512ED;
		border-radius: 92upx;
		font-weight: 500;
		font-size: 32upx;
		margin: 30upx auto;
		color: #fff;
	}
	.yanse {
		color: #9512ED;
	}
	.yanse2 {
		color: rgba(149, 18, 237, 0.5);
	}
</style>
