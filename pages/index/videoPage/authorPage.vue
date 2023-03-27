<template>
    <view class="author-page">
		<view class="author-wrap">
			<image class="author-img" :src="authorData.avatar" mode="aspectFit"></image>
			<text class="name">{{authorData.name}}</text>
			<text class="desc">{{authorData.aword}}</text>
			<view class="follow" @click="collectShortVideo">
				<text class="flag" v-if="!isFollow">关注</text>
				<text class="flag" v-if="isFollow">已关注</text>
			</view>
		</view>
		<view class="author-list">
			<view class="title-wrap">
				<text class="title">作品</text>
			</view>
			<view class="video-list">
				<view class="video-cover" v-for="(item, index) in getFormatList" :key="index" @click="gotoShortDetail(index)">
					<image v-if="item.cover" class="cover-img" :src="item.cover" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	postVaasVideoCpinfo,
	postVaasVideoCpvideos,
	getVaasFeedbackList,
	postVaasFeedback,
} from '@/api/videoApi.js'

export default {
    name: 'author-page',
    data() {
        return {
			authorData: {},
			videoList: [],
			authorId: '',
			videoType: 1,
			platform: 3,
			page: 1, 
			size: 20,
			hasMore: true,
			isFollow: false,
			lastIndex: null, // 记录上一次观看的位置
        };
    },
	computed: {
		getFormatList() {
			let len = this.videoList.length
			if (len % 3 === 2) {
				this.videoList.push({})
			}
			return this.videoList  
		}
	},
	onReachBottom() {
		if (this.hasMore) this.postVaasVideoCpvideos(false)
	},
	onLoad(e) {
		this.authorId = e.authorId;
		// this.getLastPageCache();
		this.getVaasFeedbackList()
		this.postVaasVideoCpinfo()
		if (!this.videoList.length) {
			this.postVaasVideoCpvideos()
		}
	},
	watch: {
		$route(to) {
			console.log('$route', to);
			if (to.path === '/') {
				// let vaasList = this.$store.state.video.vaasList;
				// if (vaasList.length > 0) {
				// 	this.shortVideoData = vaasList;
				// }
			}
		}
	},
    methods: {
		getLastPageCache() {
			let videoInfo = this.$store.state.video;
			this.videoList = videoInfo.vaasAuthorList;
			this.lastIndex = videoInfo.aK;
			this.page = videoInfo.authorPage
			this.authorId = videoInfo.authorId ? videoInfo.authorId : this.authorId;
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
		getPlatform() {
			// 平台类型：1-Android，2-iOS，3-H5，4-小程序，5-web，当前默认；3
			let platform = uni.getSystemInfoSync().platform
			if (platform == 'android') {
				this.platform = 1
			} else if (platform == 'ios') {
				this.platform = 2
			} else if (platform == 'devtools') {
				this.platform = 4
			}
			// #ifdef H5
			this.platform = 3
			// #endif
		},
		checkoutLast() {
			let len = this.videoList.length
			if (!this.videoList[len - 1].videoId) {
				this.videoList.pop()
			}
		},
		gotoShortDetail(index) {
			this.$store.commit({
				type: 'SET_VAAS_AUTHOR_LSIT',
				vaasAuthorList: this.videoList,
			})
			this.$store.commit({
				type: 'SET_VAAS_AK',
				aK: index,
			})
			this.$store.commit({
				type: 'SET_VAAS_PARAMS',
				authorPage: this.page,
				authorId: this.authorId
			})
			// #ifdef APP-PLUS
			uni.navigateTo({
				url: `/pages/index/videoPage/shortVideo?isAuthor=1&index=${index}&page=${this.page}&authorId=${this.authorId}`
			})
			// #endif
			// #ifdef H5
			uni.navigateTo({
				url: `/pages/index/videoPage/nvueSwiper?isAuthor=1&index=${index}&page=${this.page}&authorId=${this.authorId}`
			})
			// #endif
		},
		postVaasVideoCpinfo() {
			let data = {
				id: this.authorId,
				videoType: this.videoType,
				platform: this.platform
			}
			postVaasVideoCpinfo(data).then(res => {
				if (res.code == 200) {
					this.authorData = res.data
				}
			})
		},
		getVaasFeedbackList() {
			let data = { action: 'follow' }
			getVaasFeedbackList(data).then(res => {
				if (res.code === 200) {
					let authorInfo = res.data.find(item => item.cpId == this.authorId)
					this.isFollow = authorInfo ? true : false
				}
			})
		},
		postVaasVideoCpvideos(isInit = true) {
			let data = {
				id: this.authorId,
				page: this.page,
				platform: this.platform,
				size: this.size,
				videoType: this.videoType
			}
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			postVaasVideoCpvideos(data).then(res => {
				uni.hideLoading();
				if (res.code === 200) {
					console.log(res);
					let data = res.data
					if (data && data.length) {
						this.page++
					} else {
						this.hasMore = false
					}
					if (isInit) {
						this.videoList = data
					} else {
						this.hasMore = true;
						this.checkoutLast()
						console.log(this.videoList);
						this.videoList = this.videoList.concat(data)
						// this.$forceUpdate(this.videoList)
					}
				} else {
					uni.showToast({
						title: res.msg || res.message,
						icon: 'none'
					})
				}
			})
		},
		// 点赞关注
		collectShortVideo() {
			let data = {
				action: this.isFollow ? 'disFollow' : 'follow', 
				// videoId: item._id,
				cpId: this.authorId,
				platform: this.platform,
				// sessionId: this.sessionId,
				// userId: item.userID
			}
			postVaasFeedback(data).then(res => {
				if (res && res.code == 200) {
					this.isFollow = !this.isFollow
				} else {
					uni.showToast({
						title: res ? res.message ? res.message : res.msg : '请求失败',
						icon: 'none'
					})
				}
			})
		},
	},
}
</script>

<style scoped lang="scss">
	.author-page {
		// min-height: 100vh;
		// background-color: $uni-theme-bgcolor;
		background-color: #1D252B;
		display: flex;
		min-height: 100%;
		flex-direction: column;
	}
	.author-wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: $uni-theme-bgcolor;
	}
	.author-wrap .author-img {
		background-color: #D9D9D9;
		border-radius: 50%;
		width: 128rpx;
		height: 128rpx;
		margin-top: 60rpx;
	}
	.author-wrap .name {
		margin-top: 24rpx;
		font-weight: 500;
		font-size: 36rpx;
		line-height: 50rpx;
		letter-spacing: -0.01em;
		color: #FFF;
	}
	.author-wrap .desc {
		margin-top: 24rpx;
		font-weight: 400;
		font-size: 24rpx;
		line-height: 34px;
		letter-spacing: -0.01em;
		color: rgba(255, 255, 255, 0.7);
	}
	.author-wrap .follow {
		margin: 32rpx 0 40rpx;
		width: 176rpx;
		height: 64rpx;
		background: #D9D9D9;
		border-radius: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.author-wrap .flag {
		font-weight: 500;
		font-size: 32rpx;
		line-height: 44rpx;
		letter-spacing: -0.01em;
		color: #000;
	}
	
	.author-list {
		background-color: #1D252B;
		padding: 0 32rpx;
		flex: 1;
	}
	.author-list .title-wrap {
		padding: 40rpx 0 40rpx;
	}
	.author-list .title {
		font-weight: 500;
		font-size: 32rpx;
		line-height: 44rpx;
		letter-spacing: -0.01em;
		color: #FFF;
	}
	.video-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.video-cover {
		margin: 4rpx 0 16rpx;
		width: 216rpx;
		height: 320rpx;
	}
	.video-cover .cover-img {
		width: 216rpx;
		height: 320rpx;
		background: #D9D9D9;
		border-radius: 12rpx;
	}
</style>