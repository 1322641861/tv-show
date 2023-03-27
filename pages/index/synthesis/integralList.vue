<template>
	<view class="whole-page">
		  <view class="class-haed">
		  	  <view class="haed-item" @click="gohaed(0)"
		  		   :class="direction == 0 ? 'you':''">
		  			 全部   			
					<view class="haed-border" v-if="direction == 0"></view>
		  	  </view>
		  	  <view class="haed-item" @click="gohaed(1)" 
		  		   :class="direction == 1 ? 'you':''">
		  			支出
					<view class="haed-border" v-if="direction == 1"></view>
		  	  </view>
			  <view class="haed-item" @click="gohaed(2)"
				   :class="direction == 2 ? 'you':''">
					 收入
					 <view class="haed-border" v-if="direction == 2"></view>
			  </view>
		  </view>
		 
		  <view class="Honey-whole">
			    <view class="Honey-list" v-for="(item,index) in detailList">
			    	  <view class="list-top">
						   <view class="left-top">
						        {{item.title}}		
							</view>  
						   <view class="right-top">{{item.detailType == 1 ? '-': '+'}}{{item.score}}</view>
					  </view>  
					  <view class="list-bottom">
						   <view class="fl-left">{{item.createTime}}</view>
						   <view class="fl-right">{{item.syScore}}</view>
					  </view>  
			    </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				direction:0,
				detailList:""
			}
		},
		onShow(){
			this.getdetailList()
		},
		methods: {
			gohaed(e){
			   this.direction = e
			   this.getdetailList()
			},
			getdetailList(){
			   let that = this
			   uni.request({
			     url: getApp().globalData.http_url + 'score/goods/scoreDetails', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId':  uni.getStorageSync('sessionId')
			   	 },
				 data:{
					 type:that.direction
				 },
			     success: (res) => {
			   		console.log(res.data,'明细');	
					  if(res.data.code == 200){				 
						 that.detailList = res.data.data
						
					  }
			       }
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
	.class-haed {
		width: 100%;
		padding: 30upx 80upx 0 80upx;
		display: flex;
		position: fixed;
		top: 0;
	}
	.haed-item {
		flex: 1;
		text-align: center;
		font-size: 32upx;
		color: #222222;
	}
	.haed-border {
		width: 40upx;
		height: 4upx;
		background-color: #222222;
		border-radius: 10upx;
		margin: 16upx auto 0 auto;
		
	}
	.you {
		font-weight: 500;
	}
	.Honey-whole {
		width: 100%;
		padding: 90upx 40upx 0 40upx;
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