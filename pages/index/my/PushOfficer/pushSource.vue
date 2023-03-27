<template>
	<view class="whole-page">
		  <view class="search-whole">
			    <view class="search-content">
					  <view class="search-img">
						    <image src="../../../../static/images/ss2.png"></image>
					  </view>
					  <view class="search-input">
						    <input v-model="keyword" placeholder="输入短剧名称" />
					  </view>
				</view>
		  </view>
		  <view class="whole-nav">
			   <view class="ran-item" @click="goranIndex(index)" 
			          v-for="(item,index) in navList" :key="index">
					  <view class="ranking-text" :class="ranIndex == index ? 'pai':''">{{item}}</view>
					  <view class="ranking-border" v-if="ranIndex == index"></view>
			   </view>
		  </view>
		  <view class="whole-source">
			    <view class="source-list" v-for="(item,index) in sourceList" :key="index">
					   <view class="source-item">
						     <view class="source-img" @click="gosourceInfo(item)">
								   <image :src="item.pic" mode="aspectFill"></image>
							 </view>
							 <view class="source-title">{{item.title}}</view>
							 <view class="source-operate">
								    <view class="operate-item">
										  <image src="../../../../static/images/tgsc1.png"></image> {{item.downloadCount}}
									</view>
									<view class="operate-item">
										  <image src="../../../../static/images/tgsc2.png"></image> {{item.watchCount}}
									</view>
									<view class="operate-item">
										  <image src="../../../../static/images/tgsc3.png"></image> {{item.payCount}}
									</view>
							 </view>
							 <view class="source-button" @click="goDownload(item.content)">下载</view>
							<!-- <view @click="manyUploadImg()">上传11111111</view> -->
					   </view>
			    </view>
				
		  </view>
	</view>
</template>

<script>
	import {
	    spreadMaterial
	} from '@/api/officer.js';
	export default {
		data() {
			return {
				ranIndex:0,
				keyword:"",
				page:1,
				sourceList:[{},{},{},{},{},{},{},{},{},{}],
				navList:['最近更新','热门下载','热门观看','付费趋势'],
			}
		},
		onLoad() {
			this.getsourceList()
		},
		methods: {
			goDownload(like){
				let that = this
				var oA = document.createElement("a");
					oA.download = '2.mp4';// 设置下载的文件名，默认是'下载'
					oA.href = like;
					document.body.appendChild(oA);
					oA.click();
					oA.remove(); // 下载之后把创建的元素删除
				// uni.showLoading({
				//     title: '下载中',
				//     mask: true
				// });
				// uni.downloadFile({
				// 	url: like, 
				// 	success: (res) => {
				// 		console.log(res,'下载')
				// 		uni.hideLoading();
				// 	      // var oA = document.createElement("a");
				// 	      //   oA.download = '';// 设置下载的文件名，默认是'下载'
				// 	      //   oA.href = res.tempFilePaths;
				// 	      //   // document.body.appendChild(oA);
				// 	      //   oA.click();
				// 	      //   oA.remove(); // 下载之后把创建的元素删除
				// 		  window.open(res.tempFilePaths)
				// 	}
				// });
			},
			gosourceInfo(data){
			   uni.navigateTo({
			       url: '/pages/index/my/PushOfficer/sourceInfo?data='+ JSON.stringify(data)
			   })	
			},
			manyUploadImg(){
			  uni.chooseImage({
			  	count: 1, //默认9
			  	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			  	sourceType: ['album'], //从相册选择
			  	success: (res) => {
			  		console.log(JSON.stringify(res.tempFilePaths));  				
			  	 }
			  });	
			},
            getsourceList(){
            	let that = this	
            	spreadMaterial({
					keyword:that.keyword,
					page:that.page,
					limit:300,
					orderType:that.ranIndex+1
				}).then(res => {
            		console.log(res)
					for(var i in res.data){
						res.data[i].pic = that.getVideoBase64(res.data[i].content)
					}
            		that.sourceList = res.data
            	})
            },
			// 获取视频第一帧图片
			getVideoBase64(url) {
			  let _this = this;
			  return new Promise(function(resolve, reject) {
					let dataURL = "";
					let video = document.createElement("video");
					video.setAttribute("crossOrigin", "anonymous"); //处理跨域
					video.setAttribute("src", url);
					video.setAttribute("width", 177);
					video.setAttribute("height", 183);
					video.setAttribute("preload", "auto");
					video.addEventListener("loadeddata", function() {
					  let canvas = document.createElement("canvas"),
						width = video.width, //canvas的尺寸和图片一样
						height = video.height;
					  canvas.width = width;
					  canvas.height = height;
					  canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
					  dataURL = canvas.toDataURL("image/jpeg"); //转换为base64
				  resolve(dataURL);
				});
			  });
			},
			goranIndex(i){
				this.ranIndex = i
			}
		}
	}
</script>

<style>
  page {
  		background:#F6F6F6;
  	}
  	image {
  		width: 100%;
  		height:100%;
  	}
  	view{
  		font-family: 'PingFang SC';
  		font-style: normal;
  		overflow: hidden;
  		font-weight: 400;
		color: #333333;
  		box-sizing: border-box;
  	}
  .whole-page {
  	  width:100%;
  	  height:100%;
  }
  .search-whole {
	  width: 100%;
	  padding: 40upx 32upx 10upx 32upx;
  }
  .search-content {
	  width: 100%;
	  display: flex;
	  background: rgba(202, 202, 202, 0.2);
	  border-radius: 106upx;
	  padding: 12upx 40upx;
  }
  .search-img {
	  width: 40upx;
	  height: 40upx;
  }
  .search-input {
	  flex: 1;
	  margin-left: 16upx;
	  padding-left: 16upx;
	  border-left: 1upx solid #AAAAAA;
  }
   .search-input input {
	   width: 100%;
	   font-size: 28upx;
   }
   .whole-nav {
   	  width: 100%;
   	  padding:32upx 0;
	  display: flex;
   	  border-bottom: 1upx solid rgba(51, 51, 51, 0.05);;
   }
   .ran-item {
   	   flex: 1;
	   text-align: center;
   }
   .ranking-text {
   	 font-weight: 500;
   	 font-size: 32upx;
   	 color: #D8D8D8; 
   	 padding-bottom: 4upx;
   }
   .ranking-border {
   	  width: 32upx;
   	  height: 8upx;
   	  margin: 0 auto;
   	  background: #333333;
   	  border-radius: 30upx;
   }
   .pai {
   	 color: #333333; 
   }
   .whole-source {
	   width: 100%;
	   padding: 16upx;
   }
   .source-list {
	   float: left;
	   padding: 10upx;
	   width: 50%;
   }
   .source-item {
	   width: 100%;
	   background-color: #fff;
	   border-radius: 10upx;
   }
   .source-img {
	   width: 100%;
	   height: 352upx;
   }
   .source-title {
	   width: 100%;
	   height: 70upx;
	   padding: 0 12upx;
	   margin: 16upx 0;
	   font-size: 26upx;
   }
   .source-operate {
	   width: 100%;
	   padding: 0 12upx;
	   display: flex;
   }
   .operate-item {
	   flex: 1;
	   font-size: 20upx;
	   color: #777777;
	   display: flex;
	   flex-direction: row;
	   align-items: center;
   }
   .operate-item image {
	   width: 32upx;
	   height: 32upx;
   }
   .source-button {
	   width: 200upx;
	   height: 48upx;
	   font-size: 26upx;
	   line-height: 48upx;
	   color: #FFFFFF;
	   background: linear-gradient(180deg, #92F6B5 0%, #45D891 100%);
	   border-radius: 4upx;
	   text-align: center;
	   margin: 20upx auto;
   }
</style>
