<template>
	<view class="whole-page">
	       <view class="search-top">
			     <view class="search-left">
			     	   <image src="../../../static/images/zuo.png"></image>    
			     </view>
				 <view class="search-conet">
					   <image src="../../../static/images/ss.png"></image>
					   <input class="uni-input"  v-model="Value" confirm-type="search" placeholder="搜索" />
				 </view>
				 <view class="search-text">搜索</view>
		   </view>
		   <view class="search-whole">
			     <view class="zui-top">
					   最近搜索 <image src="../../../static/images/ljt.png"></image>
				 </view>
				 <view class="search-content">
					   <view class="search-item">无大语</view>
					   <view class="search-item">密盒</view>
					   <view class="search-item">关羽</view>
					   <view class="search-item">赵云</view>
				 </view>
		   </view>
		   <view class="whole-box">
				<view class="box-list" v-for="(item,index) in bannerTop">
					  <view class="post-shou">在售</view>
					  <view class="box-img">
						<!-- 	<image src="../../../static/images/tp.png"></image> -->
					  </view>
					  <view class="box-title">密盒星球-密盒星球</view>
					  <view class="label-whole">
							 <view class="label-item">1000份</view>
					  </view>
					  <view class="box-text">
							 <image src="../../../static/images/tp.png"></image>
							 密盒星球
					   </view>
					   <view class="box-bottom">
							 <view class="box-Price">
								   ￥ <text>921</text>
							 </view>
							 <view class="box-give">
								   <image src="../../../static/images/sc.png"></image>
								   123
							 </view>
					   </view>
				</view>
		   </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Value:"",
				bannerTop:[{},{},{},{}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	image {
		width: 100%;
		height: 100%;
	}
	.search-top {
		width: 100%;
		padding: 20upx;
	}
	.search-left {
		width: 20upx;
		height: 32upx;
	    float: left;
		margin: 22upx 26upx 0 14upx;
	}
	.search-conet {
		float: left;
		width: 560upx;
		height: 74upx;
		background: #F2F2F2;
		border-radius: 40upx;
		padding: 20upx 24upx;
		line-height: 74upx;
	}
	.search-conet image {
		float: left;
		width: 32upx;
		height: 32upx;
		margin: 6upx 0 0 6upx;
	}
	.uni-input {
		float: left;
		width: 80%;
		height: 100%;
		font-size: 30upx;
		margin-left: 16upx;
	}
	.search-text {
		float: right;
		font-weight: 500;
		font-size: 30upx;
		padding: 16upx 14upx 0 0;
	}
	.search-whole {
		width: 100%;
	}
	.zui-top {
		width: 100%;
		padding: 40upx 32upx;
		font-size: 30upx;
		color: #999999;
	}
	.zui-top image{
		width: 32upx;
		height: 32upx;
		float: right;
		margin: 4upx 6upx 0 0;
	}
	.search-content {
		width: 100%;
		padding-left: 32upx;
	}
	.search-item{
		float: left;
		padding: 8upx 32upx;
		font-size: 26upx;
		color: #000000;
		background: #DDDDDD;
		border-radius: 8upx;
		margin: 0 16upx 16upx 0;
	}
	.whole-box {
		width: 100%;
		padding: 0 20upx;
	}
	.box-list {
		width: 100%;
		background: #FFFFFF;
		border-radius: 64upx;
		margin-bottom: 32upx;
		position: relative;
	}
	.post-shou {
		position: absolute;
		left: 32upx;
		top: 32upx;
		z-index: 9;
		padding: 4upx 28upx;
		font-size: 26upx;
		color: #FFFFFF;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 24upx;
	}
	.box-img {
		width: 100%;
		height: 760upx;
	}
	.box-title {
		width: 100%;
		padding: 20upx 24upx;
		font-weight: 500;
		font-size: 32upx;
	}
	.label-whole {
		width: 100%;
		padding: 0 0 20upx 24upx;
	}
	.label-item {
		float: left;
		background: linear-gradient(90deg, #EC84C1 0%, #6277E0 101.54%);
		border-radius: 8upx;
	    font-weight: 500;
	    font-size: 28upx;
	    color: #FFFFFF;
		padding: 4upx 20upx;
	}
	.box-text {
		font-size: 26upx;
		color: #999999;
		padding-left: 24upx;
	}
	.box-text image{
		width: 36upx;
		height: 36upx;
		float: left;
		margin-right: 10upx;
		border-radius: 50%;
	}
	.box-bottom {
		width: 100%;
	    padding: 20upx 24upx 30upx 24upx;
	}
	.box-Price {
		float: left;
		color: #FC4343;
		font-weight: 500;
		font-size: 26upx;
	}
	.box-Price text {
		font-weight: 500;
		font-size: 40upx;
		color: #FC4343;
	}
	.box-give {
		float: right;
		font-size: 30upx;
		color: #666666;
	}
	.box-give image {
		float: left;
	    width: 32upx;
		height: 28upx;
		margin: 6upx 10upx 0 0;
	}
</style>
