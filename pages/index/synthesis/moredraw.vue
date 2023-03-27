<template>
	<view class="whole-page">
		  <view class="shop-for">
				<view class="shop-list" v-for="(item,index) in drawlist" :key="index">
					  <view class="shop-img">
							<image :src="item.prizeImg" mode="aspectFill"></image>
					  </view> 
					  <view class="shop-conet">
							<view class="conet-title">{{item.prizeName}}</view>
							<view class="shop-buttom">
								<!-- 	<view>
									<view class="label-num">
										  {{item.prizeNum}}/{{item.drawNum}}
									</view>
									</view> -->
									<view class="shop-tiem">{{item.endTime}}结束</view>			  
							</view>	    			
					  </view>
					  <view class="right-shop" @click="godrawinfo(item.id)">
							 <view class="shop-button">
								   <view class="but-title">抽1次</view>
								   <view class="but-text">{{item.needScore}}积分</view>
							 </view>
							 <view class="shop-button mag">
								   <view class="but-title">抽10次</view>
								   <view class="but-text">{{item.needScore*10}}积分</view>
							 </view>						 
					  </view>
				</view> 
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drawlist:[]
			}
		},
		onLoad() {
		   this.img_url = getApp().globalData.img_url 
		   this.getdrawlist()
		},
		methods: {
			godrawinfo(id){
			  uni.navigateTo({
			     url: 'drawinfo?id='+ id
			  });
			},
			getdrawlist(){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/draw/list',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },
				   data:{
					 type:2 
				   },
				   success: (res) => {
					  console.log(res,'抽奖商品列表');
					   that.drawlist = res.data.data				
				   }
			   });	
			},
		}
	}
</script>

<style>
 page {
	 background-color: #fff;
 }
 image{
	 width:100%;
	 height:100%;
 }
 .shop-for {
 	   width: 100%;
	   padding: 30upx;
 }
 .shop-list {
 	   width: 100%;
 	   border-bottom: 1upx solid #F0F0F0;
 	   padding-bottom: 40upx;
 	   margin-bottom: 40upx;
 }
 .shop-img {
 	  width: 160upx;
 	  height: 160upx;
 	  float: left;
 	  border-radius: 8upx;
 }
 .shop-conet {
 	   float: left;
 	   width: 270upx;
 	   margin-left: 24upx;
 }
 .conet-title {
 	   width: 100%;
 	   font-weight: 500;
 	   font-size: 28upx;
 }
 .shop-buttom {
 	   width: 100%;
 	   margin-top: 6upx;
 }
 .label-num {
 	   float: left;
 	   background: rgba(255, 123, 0, 0.08);
 	   border-radius: 4upx;
 	   padding: 6upx 12upx;
 	   font-weight: 500;
 	   font-size: 20upx;
 	   color: #FF7B00;
 }
 .shop-tiem {
 	   margin-top: 14upx;
 	   width: 100%;
 	   font-size: 20upx;
 	   color: #222222;
 }
 .right-shop {
 	   float: right;
 }
 .shop-button {
 	  width: 166upx;
 	  height: 68upx;
 	  text-align: center;
 	  background: #FF7F48;
 	  border-radius: 40upx;  
 }
 .but-title {
 	  font-weight: 500;
 	  font-size: 28upx;	  
 	  color: #FFFFFF; 
 }
 .but-text {
 	  color: #FFFFFF;
 	  font-size: 20upx;
 	  margin-top: -2upx;
 }
 .mag {
 	   background:#FF4848;
 	   margin-top: 24upx;
 }
</style>
