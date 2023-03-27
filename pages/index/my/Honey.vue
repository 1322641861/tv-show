<template>
	<view class="whole-page">
	      <view class="Honey-top">
			   <view class="Honey-text">
			   	     可用蜜糖 <image src="../../../static/images/xs.png"></image>    
			   </view>
			   <view class="Honey-num">{{honeydata.honeyBalance}}</view>
			   <view class="Honey-button" @click="goreHoney">充值</view>
			   <view class="exchang-whole">
				     <view class="exchang-item">
						   <view class="exchang-img">
						   		 <image src="../../../static/images/dh1.png"></image>			   
						   </view>
						   <view class="exchang-text">兑换艺术品</view>
					 </view>
					 <view class="exchang-item">
						   <view class="exchang-img">
								 <image src="../../../static/images/dh2.png"></image>			   
						   </view>
						   <view class="exchang-text">兑换商品</view>
					 </view>
			   </view>
		  </view>
		  <view class="Honey-title">
			    <view class="left-title">蜜糖变动明细</view>
				<view class="right-title" @click="godetailList">
					  查看全部<image src="../../../static/images/you.png"></image>
				</view>
		  </view>
		  <view class="Honey-whole">
			    <view class="Honey-list" v-for="(item,index) in honeydata.detailList">
			    	  <view class="list-top">
						   <view class="left-top">{{item.tradeName}}</view>  
						   <view class="right-top">{{item.flowDirection == 1 ? '-': '+'}}{{item.tradeNumber}}</view>
					  </view>  
					  <view class="list-bottom">
						   <view class="fl-left">{{item.createTime}}</view>
						   <view class="fl-right">余额：{{item.userBalance}}</view>
					  </view>  
			    </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				honeydata:""
			}
		},
		onShow(){
			this.gethoneyinfo()
		},
		methods: {
			gethoneyinfo(){
			   let that = this
			   uni.request({
			     url: getApp().globalData.http_url + 'mine/honey/info', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId':  uni.getStorageSync('sessionId')
			   	 },
			     success: (res) => {
			   		console.log(res.data.data,'我的蜜糖');	
					  if(res.data.code == 200){				 
						 that.honeydata = res.data.data
						
					  }
			       }
			   });
			},
			godetailList(){
			  uni.navigateTo({
			  	 url: 'detailList'
			  });
			},
			goreHoney(){
				uni.navigateTo({
					 url: 'reHoney'
				});	
			},
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.Honey-top {
		width:100%;
		padding: 200upx 0 40upx 0;
	}
	.Honey-text {
		font-size: 32upx;
		color: #222222;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.Honey-text image {
		width: 32upx;
		height: 32upx;
		margin-left:10upx;
	}
	.Honey-num {
		font-weight: 500;
		width: 100%;
		font-size: 60upx;
		text-align: center;
		color: #222222;
		padding: 32upx 0;
	}
	.Honey-button {
		width: 320upx;
		height: 88upx;
		background: #222222;
		border-radius: 8upx;
		line-height: 88upx;
        text-align: center;
		color: #fff;
		font-size: 32upx;
		margin: 32upx auto;
	}
	.exchang-whole {
	   width: 670upx;
	   margin: 0 auto;
	   padding: 32upx 0;
	   border-bottom: 1upx solid  #F0F0F0;
	}
	.exchang-item {
		float: left;
		margin-right: 40upx;
	}
	.exchang-img {
		width: 94upx;
		height: 94upx;
		margin: 0 auto;		
	}
	.exchang-text {
		font-size: 28upx;
		color: #222222;
	}
	.Honey-title {
		width: 100%;
		padding: 40upx;
	}
	.left-title {
		float: left;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
	}
	.right-title {
		float: right;
		color: rgba(34, 34, 34, 0.4);
		font-size: 28upx;
	}
	.right-title image {
		float: right;
		width: 16upx;
		height: 24upx;
		margin: 6upx 0 0 12upx;
	}
	.Honey-whole {
		width: 100%;
		padding: 0 40upx;
		margin-bottom: 20upx;
	}
	.Honey-list {
		width: 100%;
		padding: 32upx 0;
		margin-bottom: 20upx;
		border-bottom: 1upx solid #F0F0F0;
	}
	.list-top {
		width: 100%;
		padding-bottom: 20upx;
	}
	.left-top {
		float: left;
		font-size: 28upx;
		color: #222222;
	}
	.right-top {
		float: right;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
	}
	.list-bottom view{
		color: rgba(34, 34, 34, 0.4);
		font-size: 28upx;
	}
</style>