<template>
    <view class="video-profile">
		<view class="title-wrap">
			<view class="left-title">
				<image class="img" :src="cover" mode="aspectFill"></image>
				<view class="title-msg">
					<view class="title">{{playletName}}</view>
					<view class="flag-wrap">
						<view class="flag-list" v-for="(item, index) in playletTagsList" :key="index">
							<image src="/static/home/flag.png" mode="aspectFit"></image>
							<text>{{item.tag}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="collect-btn" @click.stop="collectVideo">
				<view class="collect-item is-collect" v-show="isCollected">
					<image src="/static/home/collected.png" mode="aspectFit"></image>
					<text>已追</text>
				</view>
				<view class="collect-item not-collect" v-show="!isCollected">
					<image src="/static/home/collect.png" mode="aspectFit"></image>
					<text>追剧</text>
				</view>
			</view>
		</view>
		<view class="details">
			{{synopsis}}
		</view>
	</view>
</template>

<script>

export default {
    name: 'video-profile',
	props: {
		synopsis: {
			type: String,
			default: ''
		},
		cover: {
			type: String,
			default: ''
		},
		playletName: {
			type: String,
			default: ''
		},
		playletTagsList: {
			type: Array,
			default: () => []
		},
		isCollected: {
			type: Boolean,
			default: false
		}
	},
    data() {
        return {

        };
    },
    computed: {},
    methods: {
		collectVideo() {
			this.$emit('collectVideo');
		},
		gotoDetail() {
			this.$emit('gotoDetail');
		}
	},
}
</script>

<style scoped lang="scss">
	.video-profile {
		width: 100%;
		color: #fff;
		.title-wrap {
			display: flex;
			justify-content: space-between;
			
			.left-title {
				display: flex;
				flex: 1;
			}
			.img {
				width: 96rpx;
				height: 96rpx;
				border-radius: 12rpx;
				margin-right: 24rpx;
				background: rgba(255, 255, 255, 0.08);
			}
			.title-msg {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 1;
				.title {
					font-weight: 500;
					font-size: 36rpx;
					line-height: 50rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.flag-wrap {
					display: flex;
					align-items: center;
				}
				.flag-list {
					margin-right: 12rpx;
					padding: 4rpx 12rpx;
					background: rgba(255, 255, 255, 0.1);
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					font-size: 24rpx;
					image {
						width: 20rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}
			}
		
			.collect-btn {
				.collect-item {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 100%;
					image {
						width: 48rpx;
						height: 48rpx;
					}
					text {
						font-weight: 400;
						font-size: 24rpx;
						line-height: 34rpx;
						// text-align: right;
						// letter-spacing: -0.01em;
					}
				}
			}
		}
		
		.details {
			font-weight: 500;
			font-size: 28rpx;
			line-height: 40rpx;
			color: #A6AEB6;
			margin-top: 48rpx;
		}
	}
</style>