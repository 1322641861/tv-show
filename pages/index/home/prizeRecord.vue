<template>
	<view class="whole-page">
		 <!-- 第三方会员 -->
		 <view v-if="rectdata.prizeType == 5">
			   <view class="rize-imge">
				     <image src="../../../static/images/jf29.png"></image>
			   </view>
			   <view class="rize-top">已领取</view>
			   <view class="rize-title">您已填写领取手机号</view>
			   <view class="rize-text">
			   	     您已填写了领取手机号，会员将在7个工作日内进行充值，如因您填写信息错误导致无法充值，平台不负任何责任，有其他疑问，请联系客服。
			   </view>
			   <view class="rize-mobile">领取手机号：{{rectdata.mobile}}</view>
			   <view v-if="rectdata.originType == 3">
					 <view class="order-title">订单信息</view>
					 <view class="order-text" v-if="rectdata.orderId != 0">
						  <view class="left-text">订单号</view>
						  <view class="right-text fl-right">{{rectdata.orderId}}</view>
					 </view>
					<view class="order-text" v-if="rectdata.price != 0">
						  <view class="left-text">实付款：</view>
						  <view class="right-text fl-right" style="color:#FF0000;">{{rectdata.price}}元</view>
					 </view>
					  <view class="order-text" v-if="rectdata.honey != 0">
						  <view class="left-text">蜜糖：</view>
						  <view class="right-text fl-right">{{rectdata.honey}}</view>
					  </view>
					 <view class="order-text" v-if="rectdata.score != 0">
						  <view class="left-text">积分：</view>
						  <view class="right-text fl-right">{{rectdata.score}}</view>
					 </view>
					 <view class="order-text">
						  <view class="left-text">兑换时间：</view>
						  <view class="right-text fl-right">{{rectdata.createTime}}</view>
					 </view>
			   </view>
		 </view>	
		 <!-- 红包 -->
		 <view v-if="rectdata.prizeType == 7">
		 	  <view class="rize-imge">
		 	  		  <image src="../../../static/images/jf29.png"></image>
		 	  </view>
		 	  <view class="rize-top">已领取</view>
		 	  <view class="rize-title">您已填写银行卡号</view>
		 	  <view class="rize-text">
		 	  	     您已填写银行卡号，会员将在7个工作日内进行打款，如因您填写信息错误导致无法转账，平台不负任何责任，有其他疑问，请联系客服。
		 	  </view>
		 	  <view class="rize-mobile">领取银行卡：{{bankData.bankName}}({{bankData.cardnum}})</view>		  
		 </view>
		<!-- 兑换实物 -->
		 <view v-if="rectdata.prizeType == 6">
			 <view class="order-top" v-if="rectdata.prizeState == 2 || rectdata.state == 2">
				   <image src="../../../static/images/jf26.png"></image>待发货
			 </view>
			 <view class="order-top" v-if="rectdata.prizeState == 3 || rectdata.state == 3">
			 		<image src="../../../static/images/jf27.png"></image>已发货
			 </view>
			<view class="order-text" v-if="rectdata.prizeState == 3 || rectdata.state == 3">
				  <view class="left-text">快递公司：</view>
				  <view class="right-text">{{rectdata.expressCompanyName}}</view>
			</view>
			<view class="order-text" v-if="rectdata.prizeState == 3 || rectdata.state == 3">
				  <view class="left-text">快到单号：</view>
				  <view class="right-text">{{rectdata.courierNumber}}</view>
			</view>			
			 <view class="order-title" style="padding-top:30upx;">收货信息</view>
			 <view class="order-text">
				  <view class="left-text">收件人：</view>
				  <view class="right-text">{{rectdata.addressee ? rectdata.addressee : rectdata.receiver}}</view>
			 </view>
			 <view class="order-text">
				  <view class="left-text">手机号：</view>
				  <view class="right-text">{{rectdata.mobile}}</view>
			 </view>
			 <view class="order-text">
				  <view class="left-text">收货地址：</view>
				  <view class="right-text">{{rectdata.detailAddress ? rectdata.detailAddress : rectdata.address}}</view>
			 </view>
			 <view class="order-text">
				  <view class="left-text">兑换时间：</view>
				  <view class="right-text">{{rectdata.createTime}}</view>
			 </view>
			 <view class="order-title">礼品信息</view>
			 <view class="good-whole">
					<view class="good-img">
						  <image :src="rectdata.prizeImg"></image>
					</view>
					<view class="good-conet">
						  <view class="good-title">{{rectdata.prizeName}}</view>
						  <view class="good-buttom" v-if="rectdata.prizeNum">
							   <view class="good-num">×{{rectdata.prizeNum}}</view>
						  </view>
					</view>
			 </view>
			 <view class="good-shur" v-if="rectdata.prizeNum">积分兑换礼品如无质量问题，不支持退换。</view>
			 <view class="good-shur" v-if="!rectdata.prizeNum">抽奖礼品如无质量问题，不支持退换。</view>
			 <view v-if="rectdata.originType == 3">
				 <view class="order-title">订单信息</view>
				 <view class="order-text" v-if="rectdata.orderId != 0">
					  <view class="left-text">订单号</view>
					  <view class="right-text fl-right">{{rectdata.orderId}}</view>
				 </view>
				<view class="order-text" v-if="rectdata.price != 0">
					  <view class="left-text">实付款：</view>
					  <view class="right-text fl-right" style="color:#FF0000;">{{rectdata.price}}元</view>
				 </view>
				  <view class="order-text" v-if="rectdata.honey != 0">
					  <view class="left-text">蜜糖：</view>
					  <view class="right-text fl-right">{{rectdata.honey}}</view>
				  </view>
				 <view class="order-text" v-if="rectdata.score != 0">
					  <view class="left-text">积分：</view>
					  <view class="right-text fl-right">{{rectdata.score}}</view>
				 </view>
				 <view class="order-text">
					  <view class="left-text">兑换时间：</view>
					  <view class="right-text fl-right">{{rectdata.createTime}}</view>
				 </view>
			 </view>
		 </view>	 
	</view>
</template>

<script>
	export default {
		data() {
			return {
			   rectdata:"",
			   bankData:""
			}
		},
		onLoad(e) {
			this.rectdata = JSON.parse(e.data)
			this.getbanklist()	
			console.log(this.rectdata)
		},
		methods: {
		   getbanklist(){
		      let that = this
		      uni.request({
		      	 url: getApp().globalData.http_url + 'mine/bank/list', 
		      	 method:'GET',
		      	 header:{
		      		 'content-type': 'text/json;charset=UTF-8',
		      		  'sessionId':  uni.getStorageSync('sessionId')
		      	 },
				 data:{
					type:2 
				 },
		      	success: (res) => {
		      		console.log(res.data,'银行卡列表')
		      		if(res.data.code == 200){
						for(var i in res.data.data){
							res.data.data[i].cardnum = res.data.data[i].cardNo.substr(12,4)
							if(that.rectdata.cardId == res.data.data[i].id){
								 that.bankData = res.data.data[i]
							}				
						}      		
		      		}				
		      	 },
		     });	
		   },
		}
	}
</script>

<style>
	page{
		background-color: #fff;	
	}
	image{
		width:100%;
		height:100%;
	}
	.order-top {
		width: 100%;
		padding: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 28upx;
	/* 	justify-content: center; */
	}
	.order-top  image{
		width: 32upx;
		height: 32upx;
		margin-right: 10upx;
	}
	.order-title {
		 width: 100%;
		 font-weight: 500;
		 font-size: 32upx;
		 padding: 80upx 40upx 40upx 40upx; 
	}
	.order-text {
		width: 100%;
		padding: 0 40upx 32upx 40upx;
	}
	.left-text {
		float: left;
		font-size: 28upx;
		color: #222222;
	}
	.right-text {
		float: left;
		font-weight: 500;
		font-size: 28upx;
		color: #222222;
		margin-left: 10upx;
	}
	.good-whole {
		  width: 100%;
		  display: flex;
		  padding: 0 40upx;
	}
	.good-img {
		  width: 160upx;
		  height: 160upx;
		  border-radius: 8upx;
	}
	.good-img image{
		  width:100%;
		  height:100%;
	}
	.good-conet {
		  flex: 1;
		  padding: 0 20upx;
	}
	.good-title {
		  width: 100%;
		  height: 88upx;
		  font-weight: 500;
		  font-size: 28upx;  
	}
	.good-buttom {
		  width: 100%;
		  padding-top:24upx;
	}
	.good-num {
		  float:left;
		  font-weight: 500;
		  font-size: 36upx;
	}
	.good-shur {
		width: 670upx;
		height: 52upx;
		margin: 20upx auto;
		line-height: 52upx;
		padding: 0 20upx;
		font-size: 24upx;
		color: #222222;
		background: #FEF6AB;
	}
	.fl-right {
		float: right;
	}
	.rize-title {
		width: 100%;
		font-weight: 500;
		font-size: 32upx;		
		color: #222222;
		padding:60upx 16upx  16upx 40upx;
	}
	.rize-text {
		width: 100%;
		font-size: 24upx;	
		color: #999999;
		padding: 0 40upx;
	}
	.rize-imge {
		width:80upx;
		height:80upx;
		margin: 80upx auto 32upx auto;
	}
	.rize-top {
		width: 100%;
		font-size: 36upx;
		text-align: center;
	}
	.rize-mobile {
		width: 100%;
		padding: 60upx 40upx;
		font-size: 32upx;
	}
</style>