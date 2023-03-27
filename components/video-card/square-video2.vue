<template>
    <view class="square-video">
		<view class="video-wrap" :style="getVideoStyle">
			<cover-view class="video-wrap2" @click="gotoPage">
				<!-- <cover-view class="poster-wrap" v-show="!played">
					<image :src="poster" mode="aspectFit"></image>
				</cover-view> -->
				<cover-image class="poster-wrap" v-show="!played" :src="poster"></cover-image>
				<video v-show="played" :id="getCurrentId" class="video-box" :src="videoSrc" ref="homeVideo" 
					playsinline="true"
					:controls="false" 
					webkit-playsinline="true" 
					:show-loading="false"
					:show-center-play-btn="false" 
					crossorigin="anonymous" 
					object-fit="cover"
					muted="muted" 
					@error="getErrorMsg" 
					@play="getPlayStatus" 
					@ended="getEndedStatus"
					
					preload="auto" 
					x5-playsinline="" 
					x-webkit-airplay="allow" 
					x5-video-player-type="h5" 
					x5-video-player-fullscreen=""
					x5-video-orientation="portraint">
				</video>
			</cover-view>
			
			<cover-view class="audio-btn" v-if="played" @click="changeAudio">
			<!-- 	<image v-show="audioFlag === 'muted'" src="/static/home/audio-close.png" mode="aspectFit"></image>
				<image v-show="audioFlag !== 'muted'" src="/static/home/audio.png" mode="aspectFit"></image> -->
				<cover-image class="audio-btn-item" v-show="audioFlag === 'muted'" src="/static/home/audio-close.png"></cover-image>
				<cover-image class="audio-btn-item" v-show="audioFlag !== 'muted'" src="/static/home/audio.png"></cover-image>
			</cover-view>
		</view>
		
		<!-- <view class="onpause-btn" v-show="!played" @click="playVideo">
			<image src="/static/home/play.png" mode="aspectFit"></image>
		</view> -->
		<cover-image class="onpause-btn" v-show="!played" @click="playVideo" src="/static/home/play.png"></cover-image>
	</view>
</template>

<script>

export default {
    name: 'square-video',
	props: {
		videoSrc: {
			type: String,
			default: ''
		},
		poster: {
			type: String,
			default: '/static/home/test1.png'
		},
		width: {
			type: String,
			default: '678rpx'
		},
		height: {
			type: String,
			default: '678rpx'
		},
		size: {
			type: String,
			default: '678rpx'
		},
		id: {
			type: Number,
			default: null,
		},
	},
	computed: {
		getVideoStyle: function() {
			return {
				width: this.width ? this.width : this.size, 
				height: this.height ? this.height : this.size,
			};
		},
		getCurrentId() {
			return 'video-box' + this.id
		}
	},
    data() {
        return {
			audioFlag: 'muted',
			played: false,
			homeVideo: null,
        };
    },
    methods: {
		gotoPage(id) {
			this.$emit('gotoPage', id)
		},
		changeAudio() {
			this.audioFlag = this.audioFlag ? '' : 'muted'
			this.homeVideo.muted = this.audioFlag
			console.log("this.$refs['homeVideo']", this.$refs['homeVideo']);
			this.$refs['homeVideo'].muted = true
			this.$refs['homeVideo'].volume = 1
		},
		playVideo() {
			if (this.videoSrc) {
				this.homeVideo = this.homeVideo ? this.homeVideo : uni.createVideoContext(this.getCurrentId)
				this.homeVideo.play()
				this.played = true
				console.log('视频播放...', this.homeVideo, this.homeVideo.play);
			} else {
				this.played = false
				uni.showModal({
					content: '播放失败',
					showCancel: false
				})
			}
		},
		pauseVideo() {
			if (this.played) {
				this.played = false
				this.homeVideo && this.homeVideo.pause();
			}
		},
		getPlayStatus(e) {
			console.log('播放中.....', e);
		},
		getEndedStatus(e) {
			this.played = false
		},
		getErrorMsg(e) {
			console.log('播放错误', e);
		}
	},
}
</script>

<style scoped lang="scss">
	.square-video {
		position: relative;
		width: 100%;
		text-align: center;
		padding-bottom: 50rpx;
		
		.video-wrap2 {
			position: absolute;
			width: 100%;
			height: 100%;
			overflow: hidden;
			border-radius: 24rpx;
		}
		.video-wrap {
			margin: auto;
			overflow: hidden;
			border-radius: 24rpx;
			position: relative;
			video,
			.poster-wrap {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				right: 0;
				z-index: 1;
				overflow: hidden;
				border-radius: 24rpx;
				image {
					width: 100%;
					height: 100%;
					z-index: 1;
				}
				
			}
			.audio-btn {
				position: absolute;
				width: 50rpx;
				height: 50rpx;
				right: 40rpx;
				bottom: 40rpx;
				.audio-btn-item {
					width: 100%;
					height: 100%;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.onpause-btn {
			position: absolute;
			width: 100rpx;
			height: 100rpx;
			bottom: 0rpx;
			right: 76rpx;
			z-index: 3;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
</style>