<template>
    <cover-view class="back-icon" @click="goBack">
		<cover-image src="/static/home/back.png" mode="aspectFit"></cover-image>
	</cover-view>
	<!-- <view class="back-icon" @click="goBack">
		<image src="/static/home/back.png" mode="aspectFit"></image>
	</view> -->
</template>

<script>

export default {
    name: 'back-icon',
	props: {
		goBackFn: {
			type: Object,
			default: null,
		},
	},
    data() {
        return {

        };
    },
    methods: {
		//返回
		goBack() {
			if (this.goBackFn) {
				this.goBackFn();
				return;
			}
			// #ifdef  APP-PLUS
			uni.navigateBack({
				delta: 1, //返回层数，2则上上页
			})
			// #endif
			// #ifdef H5
			history.back();
			// #endif
		},
	},
}
</script>
<style scoped lang="scss">
	.back-icon {
		width: 52rpx;
		height: 52rpx;
		position: fixed;
		left: 36rpx;
		/* #ifndef APP-PLUS-NVUE */
		top: calc(var(--status-bar-height) + 10px + 36rpx);
		// z-index: 1;
		image {
			width: 100%;
			height: 100%;
		}
		/* #endif */
	}
</style>