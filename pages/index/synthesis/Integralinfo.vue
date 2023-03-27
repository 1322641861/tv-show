<template>
	<view class="whole-page">
		  <view class="gral-img">
			    <image :src="exchangedata.goodsPic" mode="widthFix"></image>
		  </view>
		  <view class="gral-info">
			   <view class="gral-title">
				     {{exchangedata.name}}
			   </view>
			   <view class="gral-coent">
				    <view class="gral-lnt">
					     <text>{{exchangedata.score}}</text>积分
				    </view>
					<view class="gral-price" v-if="exchangedata.prices != 0">
						  <text>+{{exchangedata.prices}}</text>元
					</view>
					<view class="gral-price" v-if="exchangedata.honeyPrices != 0">
						  <text>+{{exchangedata.honeyPrices}}</text>蜜糖
					</view>
					<view class="gral-num">已兑{{exchangedata.saled}}</view>
			   </view>
		  </view>
		  <view class="explain-whole">
			    <view class="explain-title">权益说明</view>
				<view class="explain-text">
					 兑换商品后，如商品无质量问题一概不能退换，如有商品使用上的问题，您可以联系平台客服进行咨询。
				</view>
		  </view>
		  <view class="gral-buttom">
			    <view class="gral-button" @click="gogralorder()">立即兑换</view>	
		  </view>
		  <uni-popup ref="popup_content"  @change="change">
		  		 <view class="cheang-content"  :class="{ 'popup-height': content_type === 'center'}">
					  <view class="content-title">兑换成功</view>	
					  <view class="work-img">
							<image :src="thumbdata.prizeImg" mode="widthFix"></image>
					  </view>
					  <view class="work-text">已自动发放</view>
					 
				 </view>
		  </uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exchangedata:"",
				thumbdata:"",
				content_type:'center'
			}
		},
		onLoad(e) {
		   this.img_url = getApp().globalData.img_url
		   this.getgoodslist(e.id)
		},
		methods: {
			getgoodslist(id){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/goods/info',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },					 
				   data:{
					 id:id
				   },
				   success: (res) => {
					  that.exchangedata = res.data.data	
					  console.log(that.exchangedata,'兑换商品详情');
				   }
			   });	
			},
			gogralorder(){
				console.log(this.exchangedata)
				if(this.exchangedata.goodsType == 1){
					this.goexchange()
				}else{
					uni.navigateTo({
					   url: 'gralorder?data='+ JSON.stringify(this.exchangedata)
					});
				}		
			},
			goexchange(){
			   let that = this
			   uni.showLoading({
					title:'兑换中',
					mask:true
			   });
			   uni.request({
			   	 url: getApp().globalData.http_url+'score/goods/check',
			   	 method:'POST',
			   	 header:{
			   		'content-type': 'application/x-www-form-urlencoded',
			   		'sessionId':  uni.getStorageSync('sessionId')
			   	 },	
			   	 data:{
					exchangeNum:1,
					goodsId:that.exchangedata.goodsId,	
			   	 },
			   	 success: (res) => {
			   		console.log(res,'兑换');
			   		uni.hideLoading()
			   		if(res.data.code == 200){
						that.thumbdata = res.data.data
						that.choet_type('center')	
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
			choet_type(type){
				let that = this
				that.content_type = type
				that.$refs.popup_content.open(type)
			},
			close_type(){
				this.$refs.popup_content.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
		}
	}
</script>

<style>
  image {
	  width: 100%;
	  height: 100%;
  }
  .gral-img {
	  width: 100%;
  }
  .gral-info {
	  width: 100%;
	  background-color: #fff;
	  padding: 40upx;
  }
  .gral-title {
	  width: 100%;
	  font-weight: 500;
	  font-size: 32upx;
	  padding-bottom: 22upx;
  }
  .gral-coent {
	  width: 100%;
  }
  .gral-lnt {
	  float: left;
	  font-weight: 500;
	  font-size: 20upx;
  }
  .gral-lnt text{
	  padding-right: 4upx;
	  font-weight: 500;
	  font-size: 44upx;
  }
  .gral-price {
	  float: left;
	  font-weight: 500;
	  font-size: 20upx;
	  color: #FF0000;
	  margin-left: 4upx;
  }
  .gral-price text{
	 padding-right: 4upx;
	 font-weight: 500;
	 font-size: 44upx;
	 color: #FF0000;  
  }
  .gral-num {
	  float: right;
	  color: rgba(34, 34, 34, 0.4);
	  font-size: 24upx;
	  margin-top: 20upx;
  }
  .explain-whole {
	  width: 100%;
	  background-color: #fff;
	  padding: 32upx 40upx;
	  margin: 12upx 0;
  }
  .explain-title {
	  width: 100%;
	  font-weight: 500;
	  font-size: 32upx;
	  padding-bottom: 24upx;
  }
  .explain-text {
	  width: 100%;
	  color: #222222;
	  text-align: left;
	  font-size: 24upx;
  }
  .gral-buttom {
	  width: 100%;
	  background-color: #fff;
	  position: fixed;
	  bottom: 0;
	  z-index: 9;
	  padding: 48upx 40upx 60upx 40upx;
  }
  .gral-button {
	  width: 100%;
	  height: 96upx;
	  line-height: 96upx;
	  text-align: center;
	  background: #FF4848;
	  border-radius: 48upx;
	  font-weight: 500;
	  font-size: 32upx;
	  color: #FFFFFF;
  }
  .content-title {
  	  width: 100%;
  	  font-weight: 700;
  	  font-size: 44upx;
  	  color: #FEF6AB;
  	  text-align: center;
  	  padding: 60upx 0;
  }
  .work-img {
  	   width: 500upx;
  	   margin: 0 auto 30upx auto;
  }
  .work-img image{
  	  border-radius: 10upx;
  }
  .work-text {
  	  text-align: center;
  	  font-size: 34upx;
  	  color: #f2f2f2;
  	  padding-bottom: 40upx;
  }
</style>
