<template>
    <view class="video-page" :class="{'video-page2': !isPlay}">
		<view class="video-box" @dblclick="dblclick" @click="dblclick">
			<video id="my-video" ref="videoBox" 
				:src="notPlayFromVip ? '' : videoSrc"
				:show-center-play-btn="false"
				:show-loading="false"
				:muted="muted"
				:enable-play-gesture="true"
				:title="allVideoList[currentNum - 1] && allVideoList[currentNum - 1].title"
				:show-mute-btn="true"
				@pause="pauseListener"
				@play="playListener"
				@error="errorListener"
				@fullscreenchange="fullscreenchange"
				@fullscreenclick="fullscreenclick"
				>
			</video>
			<cover-view class="not-vip" v-if="notPlayFromVip">
				<text class="vip-txt">开通会员后即可解锁</text>
			</cover-view>
			<cover-view class="not-vip not-update" v-if="notUpdated">
				<text class="vip-txt">该视频暂未更新</text>
			</cover-view>
			<!-- <cover-view class="operater-box" v-if="isFullScreen">
				
			</cover-view> -->
			
			<back-icon></back-icon>
		</view>
		<view class="content-box">
			<view class="nav-line">
				<view class="custom-tabs">
					<view class="tab" :class="{actived: index == current}" 
						v-for="(t, index) in contentTabList" :key="index" 
						@click="changeTab(index)">
						<view class="tab-item">{{t}}</view>
						<view class="tab-line" v-if="index == current"></view>
					</view>
				</view>
				<view class="leave-msg">
					<text>发送弹幕</text>
					<view class="barrage-btn">弹</view>
				</view>
			</view>
			<!-- 剧情 -->
			<view class="scroll-wrap" v-show="current === 0">
				<view class="video-profile-wrap">
					<video-profile :cover="getImgUrl(videoData.cover)"
						:playletName="videoData.playletName"
						 :playletTagsList="videoData.playletTags"
						 :synopsis="videoData.synopsis"
						 :isCollected="videoData.isCollect"
						 @collectVideo="collectVideo(videoData.playletId)"
						 @gotoDetail="gotoDetail(videoData.playletId)">
					</video-profile>
				</view>
				
				<view class="select-wrap">
					<view class="title-custom">
						<text class="title-color">选集观看</text>
						<text class="updated-txt">更新至{{videoData.currentNum}}集</text>
					</view>
					<view class="group-select">
					<!-- 	<view class="group-item" 
							:class="{'actived-group': groupIndex == index}" 
							v-for="(item, index) in videoData.selectGroup" 
							:key="index" @click="changeGroup(index)">
							{{item}}
						</view> -->
					</view>
					<view class="group-gather">
						<view class="gather-item" v-for="(item, index) in allVideoList" :key="index">
							<select-gather :isNotUpdated="!item.url && !item.previewUrl" 
								:isAdvance="item.videoType == 2" 
								:isVip="item.url !='' && item.videoType == 1 && index + 1 >= videoData.vipNum" 
								:gatherData="item" :isCurrentGather="currentNum == item.num" 
								@selectVideo="selectVideo(item)">
							</select-gather>
						</view>
					</view>
				</view>
				
			</view>
			<!-- 简介 -->
			<view class="scroll-wrap profile" v-show="current === 1">
				<view class="desc">
					{{videoData.updateInfo}}
				</view>
				<view class="profile-group">
					<view class="title-custom"><text class="title-color" v-if="profileData.direct.length>0">导演</text></view>
					<view class="group-wrap group-wrap2" v-if="profileData.direct.length>0">
						<view class="group-item" v-for="(item, index) in profileData.direct" @click="openActorToast(item)">
							<image :src="getImgUrl(item.head)" mode="aspectFill"></image>
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="title-custom"><text class="title-color" v-if="profileData.actor.length>0">演员</text></view>
					<view class="group-wrap" v-if="profileData.actor">
						<view class="group-item" v-for="(item, index) in profileData.actor.length>0" @click="openActorToast(item)">
							<image :src="getImgUrl(item.head)" mode="aspectFill"></image>
							<text>{{item.name}}</text>
						</view>
						<view class="group-item" v-for="item in getEmptyList"></view>
					</view>
				</view>
			</view>

		</view>
		
	</view>
</template>

<script>
import backIcon from "@/components/backIcon.vue"
import videoProfile from '@/components/profile-item/video-profile.vue';
import selectGather from '@/components/profile-item/select-gather';
import { 
	getPlayletDetail,
	getPlayletWactchLast,
	postPlayletWatchSave,
	postPlayletAction,
} from '@/api/api.js'
import {
	userInfo,
} from '@/api/officer.js';

export default {
    components: {
		backIcon,
		videoProfile,
		selectGather,
	},
    name: 'video-page',
    data() {
        return {
			videoSrc: '',
			contentTabList: ['剧情', '简介'],
			current: 0,
			allVideoList: [],
			groupIndex: 0,
			playletId: '',
			profileData: {
				direct: [],
				actor: [],
			},
			videoData: {},
			currentNum: 1, // 第几集
			progressBar: 0, // progressBar
			videoContext: null,
			sessionId: '',
			muted: false,
			isPlay: true,
			isFullScreen: false, // 是否全屏
			timeStampInterval: 0, // 获取双击间隔
			userinfo: {},
			isVip: 0,
			updateTimer: null, // 监听视频更新
        };
    },
	async onLoad(e) {
		this.getSessionId()
		this.playletId = e.vid;
		await this.getPlayletWactchLast(true)
		this.getVideoDetail()
		this.getUserInfo()
	},
	onReady() {
		this.initVideo()
	},
    computed: {
		getEmptyList() {
			let list = [];
			if (this.profileData && this.profileData.actor) {
				let len = this.profileData.actor.length % 4;
				list = len >= 2 ? new Array(4 - len) : []
			} else {
				list = []
			}
			return list;
		},
		canPlayFromContract() {
			// videoData.needContract
		},
		notPlayFromVip() {
			return this.allVideoList.length && this.allVideoList[this.currentNum - 1].url != '' && this.videoData.needVip && this.currentNum >= this.videoData.vipNum && this.isVip == 0
		},
		notUpdated() {
			return this.allVideoList.length && this.allVideoList[this.currentNum - 1].url == '' && !this.allVideoList[this.currentNum - 1].previewUrl
		},
	},
    methods: {
		getSessionId() {
			this.sessionId = uni.getStorageSync('sessionId');
		},
		initVideo() {
			console.log('player', this.player);
			this.videoContext = uni.createVideoContext('my-video')
		},
		//切换tablist
		changeTab(index) {
			this.current = index;
			// this.getCurrentApi();
		},
		changeGroup(item) {
			console.log('changeGroup', item);
		},
		openActorToast(item) {
			console.log('openActorToast', item);
		},
		pauseListener() {
			console.log('暂停拉');
			this.isPlay = false
		},
		playListener() {
			console.log('开始啦');
			this.isPlay = true
		},
		errorListener(e) {
			console.log('报错了', e);
		},
		async selectVideo(item) {
			if (this.currentNum == item.num) return
			// 保存进度
			this.postPlayletWatchSave()
			// 切换选集
			this.currentNum = item.num;
			await this.getPlayletWactchLast()
			this.getVideoUrl()
		},
		// 保存进度
		async postPlayletWatchSave() {
			let data = `?num=${this.currentNum}&playletId=${this.playletId}&progressBar=${this.progressBar}`;
			let res = await postPlayletWatchSave(data)
			// console.log('postPlayletWatchSave',data,  res);
		},
		async getPlayletWactchLast(init) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let data = init 
				? `?playletId=${this.playletId}`
				: `?playletId=${this.playletId}&num=${this.currentNum}`;
			let res = await getPlayletWactchLast(data)
			if (res.code == 200) {
				if (init) {
					this.currentNum = res.data.num;
					this.progressBar = res.data.progressBar;
				} else {
					if (this.currentNum == res.data.num) {
						this.currentNum = res.data.num;
						this.progressBar = res.data.progressBar;
					} else {
						this.progressBar = 0;
					}
				}
			} else {
				uni.showToast({
					title: res.msg || res.message,
					icon:'none'
				})
			}
			uni.hideLoading();
		},
		async getVideoDetail() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let res = await getPlayletDetail(this.playletId)
			uni.hideLoading();
			// console.log('getVideoDetail', this.playletId, res);
			if (res && res.code == 200) {
				this.videoData = res.data;
				this.profileData = {
					direct: this.videoData.playletDirector,
					actor: this.videoData.playletActor
				}
				this.allVideoList = this.videoData.officialVideos.concat(this.videoData.previewVideos)
				this.getVideoUrl()
				// let updateTimeStamp = new Date(res.data.updateTime).getTime()
				let updateTimeStamp = new Date('2023-03-24 17:27:29').getTime()
				if (updateTimeStamp >= new Date().getTime()) {
					this.updateTimer = setInterval(() => {
						console.log('updateTimeStamp', updateTimeStamp, new Date().getTime());
						if (updateTimeStamp < new Date().getTime()) {
							this.getVideoDetailUpdate();
							clearInterval(this.updateTimer)
						}
					}, 1000)
				}
				console.log('updateTimeStamp', updateTimeStamp);
			} else {
				uni.showToast({
					title: '数据加载失败',
					icon:'none'
				})
			}
		},
		async getVideoDetailUpdate() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let res = await getPlayletDetail(this.playletId)
			uni.hideLoading();
			// console.log('getVideoDetail', this.playletId, res);
			if (res && res.code == 200) {
				let newOfficialVideos = res.data.officialVideos.concat(res.data.previewVideos)
				if (newOfficialVideos.length > this.allVideoList.length) {
					this.allVideoList = newOfficialVideos
				}
			} else {
				uni.showToast({
					title: '数据加载失败',
					icon:'none'
				})
			}
		},
		getVideoRes() { // 获得前缀域名
			let url = ''
			// #ifdef H5
			url = '/res/'
			// #endif
			// #ifndef H5
			url = getApp().globalData.img_url
			// #endif
			return url
		},
		getVideoUrl() {
			this.pauseVideo()
			const url = this.getVideoRes()
			// console.log('getApp().globalData.http_url111', url, this.allVideoList, this.currentNum);
			this.allVideoList.map(i => {
				if (i.num == this.currentNum) {
					 this.videoSrc = url + i.url
				}
			})
			this.playAndSeekVideo()
			// console.log('getVideoUrl',this.currentNum,  this.videoSrc, this.progressBar);
		},
		playVideo() {
			setTimeout(() => {
				this.videoContext.play();
			}, 300)
		},
		playAndSeekVideo() {
			setTimeout(() => {
				this.videoContext.seek(this.progressBar)
				this.videoContext.play();
			}, 300)
		},
		pauseVideo() {
			this.videoContext.pause();
		},
		collectVideo(id) {
			if (this.sessionId) {
				let data = {
					action: 2, 
					// sessionId: this.sessionId, 
					playletId: id,
				}
				postPlayletAction(data).then((res) => {
					if (res && res.code == 200) {
						this.videoData.isCollect = !this.videoData.isCollect
						if (this.videoData.isCollect) {
							uni.showToast({
								title: '已加入追剧',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '已取消追剧',
								icon: 'none'
							})
						}
					} else {
						uni.showToast({
							title: res ? res.message ? res.message : res.msg : '请求失败',
							icon: 'none'
						})
					}
				})
			} else {
				uni.showToast({
				    title: '请先登录',
				    icon: 'none',
				    duration: 800
				});
				// uni.navigateTo({
				//     url: '/pages/index/longin/longin'
				// })
			}
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
		fullscreenchange(e) {
			console.log('视频全屏..', e, e.detail);
			this.isFullScreen = e.detail.fullScreen;
		},
		fullscreenclick(e) {
			console.log('视频全屏播放..', e);
		},
		dblclick(e) {
			// Date.parse(new Date()) / 1000
			// #ifdef H5
			let oldStamp = this.timeStampInterval
			this.timeStampInterval = Date.parse(new Date())
			if (this.timeStampInterval - oldStamp < 1000) {
				this.isPlay ? this.pauseVideo() : this.playVideo()
				this.timeStampInterval = 0
			}
			// #endif
		},
		async getUserInfo() {
		    let that = this
			let res = await userInfo(uni.getStorageSync('userId'))
			if (res.code == 200) {
				that.userinfo = res.data
				this.isVip = res.data.vipStatus
				if (uni.getStorageSync('is_Have') == 2) {
					that.account_toggle('center')
				}
			} else if (res.code == 403) {
				uni.showToast({
					title: '登录已失效，重新登录',
					icon: 'none',
					duration: 1000
				});
				that.is_login = false;
				uni.navigateTo({
					url: '/pages/index/longin/longin'
				})
			} else {
				uni.showToast({
					title: res.msg,
					icon: "none",
					duration: 850
				});
			}
		    
		},
	},
	destroyed() {
		console.log('我要销毁拉..');
		this.postPlayletWatchSave()
	},
}
</script>

<style scoped lang="scss">
	$padding: 0 36rpx;
	.video-page {
		position: relative;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: $uni-theme-bgcolor;
		// #ifdef APP-PLUS
		padding-top: calc(var(--status-bar-height) + 10px);
		// #endif
		
		.video-box {
			width: 100%;
			height: 420rpx;
			position: relative;
			video {
				width: 100%;
				height: 100%;
			}
		}
		
		.scroll-wrap {
			padding-top: 24rpx;
			flex: 1;
			overflow-y: scroll;
		}
		.content-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			background-color: $uni-theme-bgcolor;
			
			.nav-line {
				display: flex;
				padding: 24rpx 36rpx 24rpx;
				justify-content: space-between;
				
				.custom-tabs {
					display: flex;
					
					.tab {
						padding: 0 24rpx;
						margin-right: 28rpx;
					}
					.actived {
						.tab-item {
							color: $uni-theme-color;
						}
						.tab-line {
							background-color: $uni-theme-color;
						}
					}
					.tab-item {
						font-weight: 500;
						font-size: 32rpx;
						line-height: 44rpx;
						padding: 6rpx 0;
						color: $uni-theme-color-light;
					}
					.tab-line {
						width: 18rpx;
						height: 4rpx;
						background-color: $uni-theme-color-light;
						margin: auto;
						margin-top: 20rpx;
						border-radius: 4rpx;
					}
				}
			
				.leave-msg {
					width: 184rpx;
					height: 52rpx;
					line-height: 52rpx;
					background-color: #1D252B;
					backdrop-filter: blur(17rpx);
					border-radius: 8rpx;
					display: flex;
					justify-content: space-between;
					text {
						font-weight: 400;
						font-size: 24rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #D8D8D8;
						flex: 1;
					}
					.barrage-btn {
						width: 52rpx;
						height: 52rpx;
						background: linear-gradient(138.65deg, rgba(93, 232, 155, 0.1) 2.95%, rgba(0, 104, 98, 0.1) 93.7%);
						border-radius: 8rpx;
						color: $uni-theme-color;
						text-align: center;
					}
				}
				
			}
			
			.video-profile-wrap {
				padding: $padding;
			}
			
			.select-wrap {
				padding: $padding;
				
				.title-custom {
					padding-top: 80rpx;
					padding-bottom: 48rpx;
					font-weight: 500;
					font-size: 32rpx;
					line-height: 44rpx;
					color: $uni-theme-textcolor;
					.updated-txt {
						font-weight: 400;
						font-size: 24rpx;
						line-height: 34rpx;
						color: #D8D8D8;
						float: right;
					}
					.title-color {
						color: $uni-theme-textcolor;
					}
				}
				
				.group-select {
					display: flex;
					flex-wrap: wrap;
					
					.group-item {
						margin-right: 22rpx;
						margin-bottom: 48rpx;
						padding: 20rpx 30rpx;
						background: #2A2A29;
						border-radius: 12rpx;
						color: #959595;
					}
					.actived-group {
						background: #353331;
						color: $uni-theme-textcolor;
					}
				}
				
				
			}
			
			.gather-item {
				margin-bottom: 24rpx;
			}
			
		}
		
		.profile {
			padding: $padding;
			.desc {
				padding-top: 24rpx;
				padding-bottom: 80rpx;
				font-weight: 500;
				font-size: 28rpx;
				line-height: 40rpx;
				color: #A6AEB6;
			}
			.title-custom {
				font-weight: 500;
				font-size: 36rpx;
				line-height: 50rpx;
				padding-bottom: 48rpx;
				color: $uni-theme-textcolor;
			}
			.group-wrap {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}
			.group-wrap2 {
				justify-content: start;
				.group-item {
					margin-right: 48rpx;
				}
			}
			.group-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 48rpx;
				margin-right: 98rpx;
				&:nth-child(4n) {
					margin-right: 0;
				}
				&:empty {
					width: 96rpx;
					height: 0;
					border: none;
				}
				image {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
					margin-bottom: 16rpx;
					background-color: rgba(255, 255, 255, 0.08);
				}
				text {
					font-weight: 400;
					font-size: 24rpx;
					line-height: 34rpx;
					color: #D8D8D8;
				}
			}
		}
		
	}
	
	.video-page2 {
		height: auto;
		min-height: 100vh;
	}
		
	.operater-box {
		width: 100%;
		height: 92rpx;
		position: absolute;
		bottom: 0;
		background-color: pink;
	}
	
	.fullscreen-wrap {
		width: 100%;
		height: 92rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: yellowgreen;
	}
	
	.not-vip {
		position: absolute;
		// width: 100rpx;
		height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
		background-image: linear-gradient(90deg,#ffdf89 0,#f2ca5b 100%);
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		line-height: 60rpx;
		padding: 0 36rpx;
	}
	.not-update {
		background-image: none;
		background-color: rgba(93, 232, 155, 0.5);
	}
	.not-vip .vip-txt {
		font-size: 24rpx;
		font-weight: 500;
		color: #663d00;
	}
	.not-update .vip-txt {
		color: #fff;
	}
</style>