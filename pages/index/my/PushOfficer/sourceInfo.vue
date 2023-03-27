<template>
	<view style="sour-whole">
		 <view class="haed-sour">
			   <view class="sour-title">
				     <image src="../../../../static/img/return_page.png" @click="getRutrun"></image>	
					{{dataInfo.title}}
			   </view>
		 </view>
		  <view class="video-whole">
			   <video :src="dataInfo.content"  object-fit="cover"></video>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataInfo:"",
				
			}
		},
		onLoad(e) {
			 console.log(JSON.parse(e.data))
			this.dataInfo = JSON.parse(e.data)
		},
		methods: {
			getRutrun() {
				// #ifdef  APP-PLUS
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
				// #endif
				// #ifdef H5
				history.back();
				// #endif
			},
		}
	}
</script>

<style>
  page {
  		background:#F6F6F6;
  	}
  	image {
  		width: 100%;
  		height:100%;
  	}
  	view{
  		font-family: 'PingFang SC';
  		font-style: normal;
  		overflow: hidden;
  		font-weight: 400;
		color: #333333;
  		box-sizing: border-box;
  	}
    .sour-whole {
		width: 100%;
		height: 100vh;
		position: relative;
	}
	.haed-sour {
		width: 100%;
		position: absolute;
		top: 0;
		background: rgba(255, 255, 255, 0.4);
		padding-bottom: 22upx;
		/*#ifdef H5*/
		  padding-top:50upx;
		/*#endif*/
		/*#ifdef APP-PLUS*/
		  padding-top:100upx;
		/*#endif*/
		z-index: 999;
	}
	.sour-title {
		  width: 100%;
		  position: relative;
		  text-align: center;
		  font-size: 32upx;
		  color: #333333;
		  z-index: 999;
		 
	}
	.sour-title image {
		 position: absolute;
		 left:32upx;
		 top: 3upx;
		 width: 20upx;
		 height: 34upx;
	}
	.video-whole {
		width: 100%;
		height: 100vh;
	}
	.video-whole video {
		width: 100%;
		height: 100vh;
	}
</style>
