<template>
	<view class="whole-page">
		 <view class="logo">
			  <image src="/static/images/logo.png"></image>
		 </view> 
		<view class="text-area">
			{{title}}
		</view>
		<view class="text-art">系统开放时间 4-28 11:50</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '系统服务维护中...'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.whole-page {
		width: 100%;
		height: 100vh;
		padding-top: 14vh;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 40upx auto;
		
	}
	.logo image{
		width: 100%;
		height: 100%;
	}

	.text-area {
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		color: #8f8f94;
	}
	.text-art {
		width: 100%;
		text-align: center;
		padding-top: 30upx;
		color: #8f8f94;
	}
</style>
