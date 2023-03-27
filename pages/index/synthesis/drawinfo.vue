<template>
	<view class="whole-page">
		  <view class="gral-img">
			    <image :src="drawdata.prizeImg" mode="widthFix"></image>
		  </view>
		  <view class="gral-info">
			   <view class="gral-title">
				    {{drawdata.prizeName}}
			   </view>
			   <view class="gral-coent">
				  <!-- <view class="label-num"> 
				   	  限量 {{drawdata.prizeTotalNum}}/{{drawdata.prizeTotalNum*1- drawdata.prizeNum*1}}
				   </view> -->
					<!-- <view class="gral-num">已兑{{drawdata.drawNum}}</view> -->
			   </view>
		  </view>
		  <view class="explain-whole">
			    <view class="explain-title">权益说明</view>
				<view class="explain-text">
					  抽奖为积分抽奖，抽奖后不论中与不中，积分是不退回的，如果您抽中奖品，请及时领取奖品
				</view>
		  </view>
		  <view class="gral-buttom">
			    <view class="gral-button">
					  <view class="gral-item guas" @click="goluckdraw(1)">
						    <view class="but-title">抽1次</view>
							<view class="but-text">{{drawdata.needScore}}积分</view>
					  </view>
					  <view class="gral-item" @click="goluckdraw(10)">
							<view class="but-title">抽10次</view>
							<view class="but-text">{{drawdata.needScore*10}}积分</view>
					  </view>
				</view>	
		  </view>
		  <uni-popup ref="popup_content"  @change="change">
		  		 <view class="cheang-content"  :class="{ 'popup-height': content_type === 'center'}">
					   <view v-if="thumbdata.prizeNum != 0">
					        <view class="content-title">恭喜你抽中了{{thumbdata.prizeName}} ×{{thumbdata.prizeNum}}</view>
							<!-- 现金红包 type 7 -->
						   <view class="conet-Red" v-if="thumbdata.prizeType == 7">
								 <image src="../../../static/images/jf14.png" mode="widthFix"></image>
								 <view class="title-red">{{thumbdata.prizeName}}<text>元</text></view>
								 <view class="red-buttom">
									   <view class="red-botton" @click="gorece()">立即领取</view>
								 </view>
						   </view>
						   <!-- 优先购 type 2-->
						    <view class="first-whole" v-if="thumbdata.prizeType == 2">
								  <view class="first-img">
									    <image src="../../../static/images/jf16.png" mode="widthFix"></image>
										<view class="post-first">可提前5分钟购买指定藏品</view>
								  </view>
								  <view class="button-first" @click="gorece()">立即领取</view>
							</view>
							<!-- 蜜糖 1-->
							<view class="honey-img" v-if="thumbdata.prizeType == 1">
								  <image src="../../../static/images/jf19.png" mode="widthFix"></image>
							</view>
							<!-- 积分 -->
							<!-- <view class="honey-img">
								   <image src="../../../static/images/jf23.png" mode="widthFix"></image>
							</view> -->
							<!--  5-第三方平台会员-->
						    <view v-if="thumbdata.prizeType == 5">
								 <view class="inte-img">
									   <image src="../../../static/images/jf20.png" mode="widthFix"></image>
								 </view>
								 <view class="button-first" @click="gorece()">立即领取</view>
							</view>
							<!--  6-实物-->
							<view v-if="thumbdata.prizeType == 6">
								 <view class="work-img">
								 	   <image :src="thumbdata.prizeImg" mode="widthFix"></image>
								 </view>
								 <view class="button-first" @click="gorece()">立即领取</view>
							</view>
							<!--  4-藏品-->
							<view v-if="thumbdata.prizeType == 4">
								  <view class="work-img">
								  		<image :src="thumbdata.prizeImg" mode="widthFix"></image>
								  </view>
								  <view class="work-text">已自动发放</view>
							</view>
					   </view>
					   <view v-if="thumbdata.prizeNum == 0">
						   <view class="cheang-title">很遗憾，未中奖</view>
						   <view class="fail-img">
								 <image src="../../../static/images/jf21.png" mode="widthFix"></image>
						   </view>					
					   </view>
					   <view class="close-buttom" @click="close_type">
						     <image src="../../../static/images/jf22.png"></image>
					   </view>
				</view>
		 </uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_url:"",
				drawdata:"",
				thumbdata:"",
				godid:"",
				content_type:'center'
			}
		},
		onLoad(e) {
		   this.img_url = getApp().globalData.img_url
		   this.godid = e.id
		   this.getdrawlist()
		},
		methods: {
			gorece(){
			  console.log(this.thumbdata)
			  uni.navigateTo({
				 url: '../home/receiveRrize?data='+ JSON.stringify(this.thumbdata) + '&type=1'
			  });
			},
			getdrawlist(){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/draw/info',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },
				   data:{
					 id:that.godid  
				   },
				   success: (res) => {
					   that.drawdata = res.data.data
					   console.log(that.drawdata,'抽奖商品详情');
				   }
			   });	
			},
			goluckdraw(drawNum){
				let that = this
				var data = {
					drawNum:drawNum,
					prizeId:that.drawdata.id
				}
				console.log(data)
				uni.showLoading({
					title: '抽奖中',
					mask:true
				});
				uni.request({
					 url: getApp().globalData.http_url+'score/draw/doDraw',
					 method:'POST',
					 header:{
						'content-type': 'application/x-www-form-urlencoded',
						'sessionId':  uni.getStorageSync('sessionId')
					 },	
					 data:{
						drawNum:drawNum,
						prizeId:that.drawdata.id
					 },
					 success: (res) => {
						console.log(res,'抽奖');
						uni.hideLoading()
						if(res.data.code == 200){
							 that.thumbdata = res.data.data
							 that.choet_type('center')	
							 that.getdrawlist()
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
			gogralorder(){
				uni.navigateTo({
				   url: 'gralorder' 
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
  .whole-page {
	  padding-bottom: 220upx;
  }
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
   .label-num {
   	   float: left;
   	   background: rgba(255, 123, 0, 0.08);
   	   border-radius: 4upx;
   	   padding: 6upx 12upx;
   	   font-weight: 500;
   	   font-size: 20upx;
   	   color: #FF7B00;
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
	  text-align: center;
	  background: #FF4848;
	  border-radius: 48upx;
	  font-weight: 500;
	  display: flex;
  }
  .gral-item {
	  flex: 1;	  
  }
  .but-title {
	  width: 100%;
	  color: #FFFFFF;
	  font-weight: 500;
	  padding: 10upx 0 2upx 0;
	  font-size: 32upx;
  }
  .but-text {
	  width: 100%;
	    color: #FFFFFF;
	  font-size: 24upx;
  }
  .guas {
	 background: #FF7F48; 
  }
  .content-title {
	  width: 100%;
	  font-weight: 700;
	  font-size: 44upx;
	  color: #FEF6AB;
	  text-align: center;
	  padding: 60upx 0;
  }
  .conet-Red {
	 width: 500upx;
	  margin: 0 auto;
	  position: relative;
  }
  .title-red {
	  width: 100%;
	  position: absolute;
	  top: 40upx;
	  text-align: center;
	  font-weight: 700;
	  font-size: 120upx;
	  color: #F0250E;
  }
   .title-red text{
	  font-weight: 700;
	  font-size: 48upx;
	  color: #F0250E;  
   }
  .red-buttom {
	  width: 100%;
	  position: absolute;
	  bottom:60upx;
  }
  .red-botton {
	 width: 346upx;
	 height: 84upx;
	 line-height: 84upx;
	 text-align: center;
	 margin: 0 auto;
	 color:  #B22821;
	 font-size: 36upx;
	 background: linear-gradient(180deg, #FEEBB2 0%, #FFB445 100%);
	 border-radius: 48upx;
  }
  .cheang-title {
	  width: 100%;
	  text-align: center;
	  font-weight: 700;
	  font-size: 44upx;
	  color: #FFFFFF;
  }
  .fail-img {
	  width: 400upx;
	  margin: 60upx auto;
  }
  .close-buttom {
	  width: 100%;
	  text-align: center;
  }
  .close-buttom image{
	  width: 56upx;
	  height: 56upx;
  }
  .first-whole {
  	width: 100%;
  }
  .honey-img {
	  width: 320upx;
	  margin: 0 auto 60upx auto;
  }
  .inte-img{
	 width: 400upx;
	 margin: 0 auto 60upx auto;
  }
  .first-img {
	 width: 440upx;
     position: relative;
  }
  .post-first {
	  position: absolute;
	  bottom: 120upx;
	  text-align: center;
	  width: 100%;
	  font-size: 28upx;	  
	  color: #FFFFFF;
  }
  .button-first {
	 width: 440upx;
	 height: 88upx;
	 line-height: 88upx;
	 text-align: center;
	 margin: 60upx auto;
	 color:  #B22821;
	 font-size: 36upx;
	 background: linear-gradient(180deg, #FEEBB2 0%, #FFB445 100%);
	 border-radius: 48upx; 
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
