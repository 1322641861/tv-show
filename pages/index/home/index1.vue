<template>
	<view class="index-wrap">
		<cover-view class="header-wrap">
			<view class="header-top"></view>
			<view class="header">
				<cover-view class="left-btn">密盒</cover-view>
				<cover-view class="center-txt" @click="backToTop">剧有引力</cover-view>
				<cover-view class="left-btn"></cover-view>
			</view>
		</cover-view>

		<view class="content-wrap">
			<view class="video-list" v-for="(item, index) in homeData" :key="index">
				<square-video :id="index" :poster="item.poster" :videoSrc="item.videoSrc"
					@gotoPage="gotoDetail($event)"></square-video>

				<view class="video-profile-wrap" @click="gotoDetail(3)">
					<video-profile :videoMsg="item.videoMsg"></video-profile>
				</view>

				<view class="choice">
					<view class="common-title">精选作品</view>
					<view class="choice-list">
						<view class="choice" v-for="(choice, i) in item.choiceData" :key="i">
							<choice-item :choiceData="choice"></choice-item>
						</view>
					</view>
				</view>
			</view>
		</view>

		<tabbar :pagePath='pagePath'></tabbar>

	</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue';
	import squareVideo from '@/components/video-card/square-video.vue';
	import videoProfile from '@/components/profile-item/video-profile.vue';
	import choiceItem from '@/components/profile-item/choice-item.vue';

	export default {
		components: {
			tabbar,
			squareVideo,
			videoProfile,
			choiceItem,
		},
		data() {
			return {
				pagePath: "pages/index/home/index",
				choiceList: [],
				homeData: [],
			}
		},
		onLoad(e) {
			// let sessionId = uni.getStorageSync('sessionId')
			// this.img_url = getApp().globalData.img_url
			this.getHomeData()
		},
		methods: {
			getHomeData() {
				this.homeData = [{
						// videoSrc: '/static/home/test/1.mp4',
						videoSrc: 'http://localhost:8081/blindBoxMate/static/home/test/1.mp4',
						poster: '/static/home/test1.png',
						videoMsg: {
							img: '/static/home/test1.png',
							title: '蜘蛛侠 第二季',
							flagList: ['科幻', '漫威'],
							details: '新冠肺炎疫情发生以来，世界卫生组织积极履行自身职责，秉持客观科学公正立场，积极推动抗击疫情国际合作，得到国际社会广泛认可。”法国总统马... ',
						},
						choiceData: [{
								img: '/static/home/test2.png',
								flagList: ['漫威', '漫画动画'],
								creator: '@公司简介',
								title: '漫威漫威漫威漫威漫威漫威'
							},
							{
								img: '/static/home/test2.png',
								flagList: ['漫威', '漫画动画'],
								creator: '@公司简介',
								title: '漫威漫威漫威漫威漫威漫威'
							},
							{
								img: '/static/home/test2.png',
								flagList: ['漫威', '漫画动画'],
								creator: '@公司简介',
								title: '漫威漫威漫威漫威漫威漫威'
							}
						]
					},
					{
						videoSrc: '/static/home/test/3.mp4',
						poster: '/static/home/test1.png',
						videoMsg: {
							img: '/static/home/test1.png',
							title: 'gang忒 第一季',
							flagList: ['科幻', '漫威'],
							details: '新冠肺炎疫情发生以来，世界卫生组织积极履行自身职责，秉持客观科学公正立场，积极推动抗击疫情国际合作，得到国际社会广泛认可。”法国总统马... ',
						},
						choiceData: [{
								img: '/static/home/test2.png',
								flagList: ['漫威', '漫画动画'],
								creator: '@公司简介',
								title: '漫威漫威漫威漫威漫威漫威'
							},
							{
								img: '/static/home/test2.png',
								flagList: ['漫威', '漫画动画'],
								creator: '@公司简介',
								title: '漫威漫威漫威漫威漫威漫威'
							},
							{
								img: '/static/home/test2.png',
								flagList: ['漫威', '漫画动画'],
								creator: '@公司简介',
								title: '漫威漫威漫威漫威漫威漫威'
							}
						]
					},
				]
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: "/pages/index/videoPage/videoPage?vid=" + id
				})
				// uni.navigateTo({
				// 	url: "/pages/index/videoPage/shortVideo"
				// })
			},
			backToTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	$padding: 0 36rpx;

	.index-wrap {
		width: 100%;
		padding-top: calc(var(--status-bar-height) + 10px);
		overflow-x: hidden;
		position: relative;
		padding-bottom: 200rpx;
		background-color: $uni-theme-bgcolor;

		.header-wrap {
			position: fixed;
			z-index: 9;
			background-color: $uni-theme-bgcolor;
			height: calc(var(--status-bar-height) + 10px + 100rpx);
			left: 0;
			right: 0;
			top: 0;

			.header-top {
				height: calc(var(--status-bar-height) + 10px);
			}
		}

		.header {
			padding: $padding;
			height: 88rpx;
			position: relative;

			.left-btn {
				font-weight: 500;
				font-size: 40rpx;
				line-height: 100rpx;
				color: #fff;
			}

			.center-txt {
				position: absolute;
				left: 50%;
				top: 0;
				transform: translateX(-50%);
				color: $uni-theme-color;
				font-weight: 500;
				font-size: 48rpx;
				line-height: 100rpx;
			}
		}

		.content-wrap {
			// padding-top: 24rpx;
			padding-top: 112rpx;

			.video-list {
				.video-profile-wrap {
					padding: $padding;
					margin-top: 20rpx;
				}
			}

			.choice-list {
				padding: $padding;
				margin-bottom: 56rpx;

				.choice {
					margin-bottom: 24rpx;
				}
			}
		}
	}
</style>
