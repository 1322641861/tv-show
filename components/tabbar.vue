<template>
	<view class="tabbar-wrap">
	    <view class="uni-tabbar">
			  <view class="uni-tabbar-item" v-for="(item,index) in tabbar" 
			        :key="index" @tap="changeTab(item)">
				    <view class="uni-tabbar-icon">
						  <image v-if="item.pagePath == pagePath"  :src="item.selectedIconPath" mode="aspectFit"></image>
						  <image v-else  mode="aspectFit" :src="item.iconPath"></image>
					</view>
					<view class="uni-tabbar__label" @tap="changeTab(item)" :class="{'active': item.pagePath == pagePath}">{{item.text}}</view>
			  </view>	  
		</view>
	</view>
</template>

<script>
	export default {
			props: {
				//从父级继承过来的属性 需要在父级中使用:pagePath='pagePath',
				pagePath: String
			},
			data() {
				return {
					showPage: false,
					containerHeight: 400,
					// 公共的tabbar
					tabbar: [
						{
							"pagePath": "pages/index/home/index",
							"iconPath": "/static/tabbar/home.png",
							"selectedIconPath": "/static/tabbar/home@.png",
							"text": "追剧"
						},
						// {
						// 	"pagePath": "pages/index/synthesis/synthesis",
						// 	"iconPath": "/static/tabbar/seek.png",
						// 	"selectedIconPath": "/static/tabbar/seek@.png",
						// 	"text": "探剧"
						// },	
						{
							"pagePath": "pages/index/my/personal",
							"iconPath": "/static/tabbar/my.png",
							"selectedIconPath": "/static/tabbar/my@.png",
							"text": "我的"
						}
					]
				};
			},
			watch: {
				pagePath: {
					handler(pagePath) {
						console.log('pagePath监听===val', pagePath)
					},
					immediate: true
				}
			},
			methods: {
				changeTab(item) {
					console.log('changeTab', item);
					this.page = item.pagePath;
					if (this.page == 'pages/index/circulation/circulation') {
						// window.location = 'https://chaoshucang.com/#/'
						// uni.navigateTo({
						// 	 url:'/' + this.page,
						// });
					} else {
						uni.reLaunch({
							url: '/' + this.page,
						});
					}			
				},
			}
		}

</script>

<style lang="scss">
	.tabbar-wrap {
		height: 114upx;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 10;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(10rpx);
	}
	.uni-tabbar {
		width: 100%;
		display: flex;
		align-items: center;
		// position: relative;
		// position: fixed;
		// bottom: 0;
		// z-index: 9;
		// background-color: $uni-theme-bgcolor;
		height: 114upx;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(10rpx);
		flex-direction: row;
	}
	.uni-tabbar-item {
		flex: 1;
		text-align: center;
	}
	.uni-tabbar-icon {
		width: 48upx;
		height: 48upx;
		margin: 0 auto;
	}
	.uni-tabbar__label {
		width: 100%;
		// padding-top: 8upx;
		font-weight: 400;
		font-size: 26upx;
		color: $uni-theme-textcolor;
	}
	.uni-tabbar-img {
		width: 88upx;
		height: 88upx;
		margin: 0 auto;
	}
	.uni-tabbar-icon image,.uni-tabbar-img image{
		width: 100%;
		height: 100%;
	}
	.active {
		color: $uni-theme-color;
	}
</style>