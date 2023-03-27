<template>
	<view class="whole-page">
		  <image src="../../../static/images/dw.png" mode="aspectFill"></image>
		  <view class="post-buttom">
			    <view class="item-button" style="float:left;"
				      @click="goiPhone()">
					  <image src="../../../static/images/ios.png"></image>
					   iPhone下载
				</view>
				<view class="item-button" style="float:right;" 
				      @click="goAndroid()">
					  <image src="../../../static/images/az.png"></image>
					  Android下载
				</view>
		  </view>
		  <view class="whole-Mask" v-if="is_Outside" @click="gois_Outside()">
			  <view class="guide-whole">
					 <view class="guide-title">
						   <view>点击右上角的···</view>
						   <view>选择默认浏览器打开即可下载</view>
					 </view>
					 <view class="guide-img">
						   <image src="../../../static/images/zy.png"></image>
					 </view>
			   </view>	
		  </view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				is_Outside:false
			}
		},
		methods: {
			goiPhone(){
				var me =  navigator.userAgent.toLowerCase();
				if(me.match(/MicroMessenger/i) == "micromessenger"){
						  console.log('微信浏览器')
					 this.is_Outside = true
					 return
				}
				   window.location = 'https://app.dfenfa.cn/GeyB'
				 //window.location = 'itms-services://?action=download-manifest&url=https://jkyx-api.chiguavod.com/ios/mhxq.plist'
			},
			gois_Outside(){
			  this.is_Outside = false
			},
			goAndroid(){
				var me =  navigator.userAgent.toLowerCase();
				if(me.match(/MicroMessenger/i) == "micromessenger"){
						  console.log('微信浏览器')
					 this.is_Outside = true
					 return
				}
				window.location = 'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/app/mhxq.apk'
			},
		}
	}
</script>

<style>
  image {
	  width: 100%;
	  height: 100%;
  }
 .whole-page {
	 width: 100%;
	 height: 100vh;
	 position: relative;
 }
 .post-buttom {
	 width: 100%;
	 position: absolute;
	 bottom: 200upx;
	 left: 0;
	 padding: 0 50upx;
 }
 .item-button {
	 width: 300upx;
	 height: 88upx;
	 background-color: #fff;
	 border-radius: 60upx;
	 color: #222222;
	 font-size: 32upx;
	 display: flex;
	 flex-direction: row;
	 align-items: center;
	 justify-content: center;
 }
 .item-button image{
	 width: 40upx;
	 height: 40upx;
	 margin-right:8upx;
 }
 /* 遮罩 */
 .whole-Mask {
 	width: 100%;
 	height: 100vh;
 	position: absolute;
 	top: 0;
 	left: 0;
 	background-color: rgba(0,0,0,0.4);

 }
 .guide-whole {
 		width: 100%;
 		padding:100upx;
 		color: #fff;
 	    margin-top: 100upx;
 	}
 	.guide-title {
 		float: left;	
 	}
 	.guide-title view{
 		color: #fff;
 	}
 	.guide-img {
 		float: right;
 		width: 100upx;
 		height: 100upx;
 	}
</style>
