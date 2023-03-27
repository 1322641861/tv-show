<template>
	<view class="whole-page">
		<!-- originType 来源类型 1 宝箱任务 2 积分抽奖 3 积分兑换 -->
		  <view class="gift-list" v-for="(item,index) in giftList">
			    <view class="gift-img">
					  <image :src="item.prizeImg"></image>
				</view>
				<view class="gift-conet">
					  <view class="gift-title">{{item.prizeName}}</view>
					  <!-- <view class="bot-text">
					  	    <text>×{{item.prizeNum}}</text> 
					  </view> -->
					  <view class="gift-bottom">
						    <view class="gift-tiem">{{item.createTime}}</view>
							<view class="gift-right" v-if="item.state == 2" @click="goprizeRecord(item)">
								  {{item.prizeType == 6 ? '待发货':'已领取'}}  
								  <image src="../../../static/images/you.png"></image>
							</view>
						    <view class="gift-text" v-if="item.state == 3 && item.prizeType == 6"
							     @click="goprizeRecord(item)">
							      已发货
								 <image src="../../../static/images/you.png"></image>
						   </view>	
						   <view class="gift-text" v-if="item.state == 3 && item.prizeType != 6">
						   	     已发放					   						
						   </view>	
						  <view class="gift-botton" v-if="item.state == 1" @click="gorece(item)">领取</view>
					  </view>
				</view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			   giftList:[]
			}
		},
		onShow(){
		  this.getgoodslist()
		},
		methods: {
			goprizeRecord(data){
			  uni.navigateTo({
			     url: '../home/prizeRecord?data='+ JSON.stringify(data)
			  });
			},
			gorece(data){
			  uni.navigateTo({
			     url: '../home/receiveRrize?data='+ JSON.stringify(data) + '&type=2'
			  });
			},
		  getgoodslist(){
		     let that = this
		     uni.request({
		         url: getApp().globalData.http_url + 'lottery/user/reward/' + 1,
		     	   method:'GET',
		     	   header:{
		     		 'content-type': 'text/json;charset=UTF-8',
		     		  'sessionId':  uni.getStorageSync('sessionId')
		  	   },					 
		  	   success: (res) => {
		  	  	  console.log(res,'中奖列表');
		  		  this.giftList = res.data.data
		  	   }
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
    .whole-page {
		width: 100%;
		padding: 0 32upx;
	}
	.gift-list {
		width: 100%;
		padding:32upx 0;
		display: flex;
		margin-bottom: 20upx;
		border-bottom: 1upx solid #F0F0F0;
	}
	.gift-img {
		width: 160upx;
		height: 160upx;
		border-radius: 24upx;
	}
	.gift-conet {
		flex: 1;
		margin-left: 24upx;
	}
	.gift-title {
		width: 100%;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
		padding: 10upx 0 20upx 0;
	}
	.gift-bottom {
		width: 100%;
	}
	.bot-text {
		width: 100%;
		padding: 10upx 0 30upx 0;
	}
	.bot-text text {
		float: right;
		font-size: 28upx;
	}
	.gift-tiem {
		float: left;
		font-size: 24upx;
		padding-top: 6upx;
		color: rgba(34, 34, 34, 0.4);
	}
	.gift-right {
		float: right;
		font-size: 28upx;
		color: rgba(34, 34, 34, 0.4);
	}
	.gift-right image{
		width: 16upx;
		height: 24upx;
		margin-left: 8upx;
	}
	.gift-botton {
		float: right;
		width: 136upx;
		height: 52upx;
		line-height: 52upx;
		background: #222;
		border-radius: 28upx;
		text-align: center;
		font-weight: 500;
		font-size: 24upx;
		color: #FFFFFF;
	}
	.gift-text {
		float: right;
		color: rgba(34, 34, 34, 0.4);
		font-size: 28upx;
	}
	.gift-text image{
		width: 16upx;
		height: 24upx;
		margin-left: 8upx;
	}
</style>
