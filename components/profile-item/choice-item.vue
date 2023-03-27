<template>
    <view class="choice-item">
		<image class="author-img" :src="cover" mode="aspectFit"></image>
		<view class="title-wrap">
			<text class="title">{{playletName}}</text>
			
			<text class="right-name">{{framerName}}</text>
			
			<view class="flag-wrap">
				<view class="flag-list" v-for="(item, index) in playletTagsList" :key="index">
					<image class="flag-list-img" src="/static/home/flag.png" mode="aspectFit"></image>
					<text class="flag-list-txt">{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
    name: 'choice-item',
	props: {
		playletTagsList: {
			type: Array,
			default: () => []
		},
		cover: {
			type: String,
			default: ''
		},
		playletName: {
			type: String,
			default: ''
		},
		framerName: {
			type: String,
			default: ''
		}
	},
    data() {
        return {

        };
    },
    methods: {},
}
</script>

<style scoped lang="scss">
	.choice-item {
		display: flex;
		flex-direction: row;
		background: #1D252B;
		/* #ifndef APP-PLUS-NVUE */
		backdrop-filter: blur(17rpx);
		/* #endif */
		border-radius: 20rpx;
		padding: 20rpx 50rpx 20rpx 20rpx;
	}
	.author-img {
		width: 128rpx;
		height: 128rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
		background: rgba(255, 255, 255, 0.08);
	}
	.title-wrap {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.title {
		font-weight: 500;
		font-size: 28rpx;
		line-height: 36rpx;
		margin-bottom: 4rpx;
		color: $uni-theme-textcolor;
	}
	
	.flag-wrap {
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.flag-list {
		margin-right: 12rpx;
		padding: 4rpx 12rpx;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	.flag-list-txt {
		font-size: 24rpx;
		color: #91949A;
	}
	.flag-list-img {
		width: 20rpx;
		height: 32rpx;
		margin-right: 8rpx;
	}
	
	.right-name {
		color: #5DE89B;
		font-size: 24rpx;
		line-height: 36rpx;
		margin-bottom: 4rpx;
		text-align: right;
		color: $uni-theme-color;
	}
</style>