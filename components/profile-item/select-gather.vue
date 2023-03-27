<template>
    <view class="select-gather">
		<view class="left-msg">
			<image class="left-img" :src="getImgUrl(gatherData.numCover)" mode="aspectFit"></image>
			<view class="is-vip" v-if="isVip">
				<text class="vip-txt">VIP</text>
			</view>
			<view class="is-vip is-vip1" v-if="isAdvance">
				<text class="vip-txt">预告</text>
			</view>
			<view class="is-vip is-vip2" v-if="isNotUpdated">
				<text class="vip-txt">未更新</text>
			</view>
			<view class="playing" v-if="isCurrentGather">
				<image class="playing-img" src="/static/home/playing-tag.png" mode="aspectFit"></image>
				<text class="playing-txt">正在播放</text>
			</view>
		</view>
		<view class="right-msg" @click="selectVideo">
			<view class="gather-msg">
				<view class="title">{{gatherData.title}}</view>
				<view class="tag" v-show="isCurrentGather">
					<image src="/static/home/playing-tag.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="current-status">
				<text v-show="isCurrentGather">正在观看</text>
				<text v-show="!isCurrentGather">第 {{gatherData.num}} 集 {{gatherData.timeNum}}</text>
			</view>
		</view>
	</view>
</template>

<script>

export default {
    name: 'select-gather',
	props: {
		gatherData: {
			type: Object,
			default: () => {}
		},
		isCurrentGather: {
			type: Boolean,
			default: false
		},
		isVip: {
			type: Boolean, 
			default: false
		},
		isAdvance: {
			type: Boolean,
			default: false
		},
		isNotUpdated: {
			type: Boolean,
			default: false
		}
	},
    data() {
        return {

        };
    },
    methods: {
		selectVideo() {
			this.$emit('selectVideo')
		},
		getImgUrl(src) {
			// #ifdef H5
			let url = '/res/'
			// #endif
			// #ifndef H5
			let url = getApp().globalData.img_url
			// #endif
			return url + src
		},
	},
}
</script>

<style scoped lang="scss">
	.select-gather {
		display: flex;
		justify-content: space-between;
		
		.left-msg {
			position: relative;
			.left-img {
				width: 232rpx;
				height: 132rpx;
				border-radius: 4rpx;
				background-color: rgba(255, 255, 255, 0.08);
			}
			
		}
		
		.is-vip {
			position: absolute;
			right: 0;
			top: 0;
			z-index: 1;
			padding: 0 8rpx;
			background-image: linear-gradient(126.36deg, #F5D1A1 0%, #FFE9CE 45.67%, #FFCF8E 100%);
			text-align: center;
			border-radius: 0 0 0 10rpx;
			padding-bottom: 1rpx;
		}
		.is-vip .vip-txt {
			font-size: 24rpx;
			line-height: 34rpx;
			color: #333;
		}
		.is-vip1 {
			background-image: linear-gradient(270deg, #FF252C 0%, #FF6B01 100%);
			color: #fff;
		}
		.is-vip1 .vip-txt {
			line-height: 34rpx;
			color: rgba(255, 255, 255, 0.7);
		}
		.is-vip2 {
			background-image: none;
			background-color: rgba(93, 232, 155, 0.5);
		}
		.is-vip2 .vip-txt {
			font-size: 24rpx;
			line-height: 34rpx;
			color: rgba(255, 255, 255, 0.7);
		}
		
		.playing {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		.playing .playing-img {
			width: 35rpx;
			height: 40rpx;
		}
		.playing .playing-txt {
			font-weight: 400;
			font-size: 24rpx;
			line-height: 42rpx;
			color: #5DE89B;
		}
		
		.right-msg {
			flex: 1;
			padding: 12rpx 4rpx 12rpx 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.gather-msg {
				display: flex;
				justify-content: space-between;
				font-weight: 500;
				font-size: 28rpx;
				line-height: 40rpx;
				
				.title {
					color: $uni-theme-color;
					flex: 1;
					margin-right: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.tag {
				width: 35rpx;
				height: 40rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.current-status {
				font-weight: 400;
				font-size: 24rpx;
				line-height: 34rpx;
				color: #D8D8D8;
			}
		}
	}
</style>