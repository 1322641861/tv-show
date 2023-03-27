<template>
	<view class="whole-page">
		  <view class="port-title">您的数字艺术品图片</view>
		  <view class="whole-portrait">
			    <view class="portrait-item" v-for="(item,index) in draw_list">
					 <view class="post-item" :class="draw_index == index ? 'bunt':''" @click="godraw(index)">
						    <image src="../../../static/images/xz.png" v-if="draw_index == index"></image>
					  </view>
					  <image src="../../../static/images/tp.png" style="width: 100%;height:100%;"></image>
				</view>
		  </view>
		  <view class="post-bottom">
			    <view class="portrait-button">确定更换</view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			   draw_index:-1,
			   draw_list:[{},{},{},{},{},{},{},{},{}]
			}
		},
		onLoad() {
      
		},
		methods: {
            godraw(e){
			  this.draw_index = e
			}
			
		}
	}
</script>

<style>
	.port-title {
		width: 100%;
		padding: 80upx 20upx 20upx 20upx;
		font-weight: 500;
		font-size: 32upx;
		color: #000000;
	}
	.whole-portrait {
		width: 100%;
		padding: 14upx;
	}
	.portrait-item {
		float: left;
		width: 234upx;
		height: 234upx;
		margin: 4upx;
		position: relative;
	}
	.post-item {
		width: 32upx;
		height: 32upx;
		border: 2upx solid #FFFFFF;
		position: absolute;
		right: 10upx;
		top: 10upx;
		z-index: 9;
		border-radius: 50%;
	}
	.post-item image{
		width: 100%;
		height: 100%;
	}
	.bunt {
		border: none;
	}
	.post-bottom {
		width: 100%;
		margin-top: 260upx;
		padding: 0 40upx;
	}
	.portrait-button {
		width: 100%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		font-weight: 500;
		font-size: 32upx;
		color: #FFFFFF;
		background: linear-gradient(90deg, #EF7FDF 0%, #7AB9EF 100%);
		border-radius: 16upx;
	}
</style>
