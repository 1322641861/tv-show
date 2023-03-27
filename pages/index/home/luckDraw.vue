<template>
	<view class="whole-page">
		<view class="Draw-top">
			<image src="../../../static/images/cj1.png" style="width:100%;" mode="widthFix"></image>
			<view class="top-text">
				<view>{{actDesc}}</view>
				<!-- <view>本次抽奖活动时间：{{choujtimes}} - {{stoptiemweew}}</view> -->
			</view>
		</view>
		<view class="whole-padd">
			<view class="whole-Draw">
             
			   <!-- 抽奖人轮播 -->
			   <view class="awardee_box">
			   	<mosowetextscrollrow :list="listKey" :actives="chooseList" textKey="name" delay="1000"
			   		initPosition="right" />
			   </view>
			
			
				<view class="Draw-img">
					<image src="../../../static/images/cj2.gif" style="width:100%;" mode="widthFix"></image>
				</view>
				<view class="not-bottom" v-if="showcjBtn==1">
					<view class="not-conet">{{choujtimes}} 开始</view>
				</view>
				<view class="share_btn" v-if="showcjBtn==2">
					<image class="btn_one" src="../../../static/images/share_one.png" mode="aspectFill" @click="opensharepopu()"></image>
					<view class="cj_btn" @click="godraw()">
						<image class="btn_two" src="../../../static/images/cj_btn.png" mode="aspectFill"></image>
						<text class="cj_num" v-if="lucknum != 0">抽奖x{{lucknum}}</text>
						<text class="cj_num" v-if="lucknum == 0">抽奖</text>
					</view>
				</view>
				<view class="not-bottom_stop" v-if="showcjBtn==3">
					<view class="not-conet">抽奖已结束</view>
				</view>
				<view class="record-bottom" @click="goprizeRecord">
					<view></view>中奖记录<view></view>
				</view>
			</view>
		</view>
		<view class="title-Draw">本次活动奖品如下</view>
		<view class="whole-list">
			<view class="list-for" v-for="(item,index) in Signlist">
				<view class="list-img">
					<image :src="item.prizeImg" mode="aspectFill"></image>
				</view>
				<view class="list-title">{{item.prizeName}}</view>
			</view>
		</view>
		<view class="rule_btn" @click="openrules">
			<text>抽奖规则</text>
		</view>
		<uni-popup ref="rulepopu" type="center" @maskClick="getclosepopu">
			<view class="rule_box">
				<image class="close_i" src="../../../static/images/close_icon.png" mode="aspectFill" @click="getclosepopu">
				</image>
				<view class="r_txt">抽奖规则</view>
				<view class="rule_content">
					<view class="rule-text" v-for="(item,index) in ruleslist" :key="index">
						 {{index+1}}、{{item.describe}}
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 抽中的奖品 -->
		<view class="whole-Mask"  v-if="if_draw">
			 <!-- 红包 -->
		<!-- <view class="conet-Red">
				 <image src="../../../static/images/jf14.png" mode="widthFix" style="width:100%;"></image>
				 <view class="title-red">40<text>元</text></view>
				 <view class="red-buttom">
					   <view class="red-text">恭喜你抽中了5元红包</view>
					   <view class="red-botton" @click="goreceive()">立即领取</view>
				 </view>
			 </view> -->
			 <view class="mask-draw">
					 <view class="content-title">恭喜你抽中了{{drawdata.prizeName}}</view>
					 <!-- 优先购 type 2-->
					 <view class="first-whole" v-if="drawdata.prizeType == 2">
						  <view class="first-img">
								<image :src="drawdata.prizeImg" mode="widthFix" style="width: 100%;"></image>
							   <!-- <view class="post-first">可提前5分钟购买指定藏品</view> -->
						  </view>
						  <view class="work-text">已自动发放</view> 
					</view>
					<!-- 蜜糖 1-->
					<view v-if="drawdata.prizeType == 1">
						<view class="honey-img" v-if="drawdata.prizeType == 1">
							  <image src="../../../static/images/jf19.png" mode="widthFix" style="width: 100%;"></image>
						</view>
						<view class="work-text">已自动发放</view>
					</view>
					<!--  5-第三方平台会员-->
					<view v-if="drawdata.prizeType == 5">
						 <view class="inte-img">
							   <!-- <image src="../../../static/images/jf20.png" mode="widthFix"></image> -->
							   <image :src="drawdata.prizeImg" mode="widthFix" style="width: 100%;"></image>
						 </view>
						 <view class="button-first" @click="goreceive()">立即领取</view>
					</view>
					<!--  6-实物-->
					<view v-if="drawdata.prizeType == 6">
						 <view class="work-img">
							   <image :src="drawdata.prizeImg" mode="widthFix" style="width: 100%;"></image>
						 </view>
						 <view class="button-first" @click="goreceive()">立即领取</view>
					</view>
					<!--  4-藏品-->
					<view v-if="drawdata.prizeType == 4">
						  <view class="work-img">
								<image :src="drawdata.prizeImg" mode="widthFix" style="width: 100%;"></image>
						  </view>
						  <view class="work-text">已自动发放</view>
					</view>
					<view class="close-imge" @click="coseprizepopu()">
						  <image src="../../../static/images/jf22.png"></image>
					</view>
			</view>
		</view>
		<!-- 未抽中的奖品 -->
		<uni-popup ref="noprizepopu" type="center" @maskClick="closenoprize" mask-background-color="rgba(0,0,0,0.8)"> 
			<view class="nori_class">
				<text class="tsd_txt">很遗憾，未中奖</text>
				<image class="no_prizeimg" src="../../../static/images/noprize.png" mode="aspectFill"></image>
				<image class="btn_gb" src="../../../static/images/guanbi.png" mode="aspectFill" @click="closenoprize"></image>
			</view>
		</uni-popup>
		<view class="whole-Mask" v-if="if_share">
			    <view class="share-whole">
					  <view class="share-img">
						    <image :src="back_img"></image>
					  </view>
					  <view class="share-text">长按海报，保存到相册</view>
					  <view class="share-bottom">
						    <view class="share-item" @click="cosesharepopu">关闭</view>
							<view class="share-item bunt" @click="copylike()">复制链接</view>
					  </view>
				</view>			
		</view>
		<canvas canvas-id="myCanvas" style='opacity:0; width:306px;height:544px' v-if="if_share"/>
	</view>
</template>

<script>
    import QRCode from 'qrcode';
	import getDateTime from '../../../components/getdateTime.js';
	import mosowetextscrollrow from '../../../components/mosowe-text-scroll-row/mosowe-text-scroll-row.vue'
	export default {
		data() {
			return {
				if_draw:false,
				if_share:false,
				back_img:"../../../static/images/jf32.png",
				code_img:"",
				QRlink:"https://jkyx-api.chiguavod.com/blindBoxMate/#/pages/index/home/luckDraw",
				chooseList: [],
				listKey: [
					{
						name:""
					}
				
				],
				actDesc:"",//描述规则
				choujtimes: "", //后台配置的开始时间
				stoptiemweew: "", //后台配置的结束时间
				showcjBtn: 5, //1抽奖未开始 2 抽奖 3 抽奖已结束
		        lucknum:"",
				inte:"",
				drawdata:"",
				ruleslist:[],
				Signlist: []
			}
		},
		components: {
			mosowetextscrollrow
		},
		onLoad(e) {
			this.getrotion() //获取滚动信息
			this.getActivelist() //获取活动详情
			this.getprizelist() //获取抽奖奖品列表
			this.getusertimes() // 获取可抽奖次数
			this.getruleslist()
			this.goiscode()
		},
		methods: {
			//关闭未抽中弹框
			closenoprize(){
				this.$refs.noprizepopu.close()
			},
			//打开未抽中弹框
			opennoprize(){
				this.$refs.noprizepopu.open("center")
			},
			//抽中的弹框
			openprizepopu(){
				// this.$refs.prizepopu.open("center")
				this.if_draw = true
			},	
			//关闭抽中的弹框
			coseprizepopu(){
				// this.$refs.prizepopu.close()
			   this.if_draw = false
			},
			opensharepopu(){
				this.if_share = true
			    this.getcanvas()
			},
			//关闭分享的弹框
			cosesharepopu(){
				this.if_share = false
			},
			copylike(){
				let that = this
				uni.setClipboardData({ 
					data:that.QRlink,
					success: function () {
						console.log('success');
						uni.hideKeyboard();   //  隐藏软键盘
						uni.showToast({
							title:'已复制',
							icon: 'none',
							duration: 1500
						});
					}
				});
			},
			goiscode(){
				let that = this
				let opts = {
				   errorCorrectionLevel: "L",//容错级别
				   type: "image/png",//生成的二维码类型
				   quality: 0.3,//二维码质量
				   margin: 2,//二维码留白边距
				   width: 200,//宽
				   height: 200,//高
				   text:that.QRlink,//二维码内容
				   color: {
						dark: "#666666",//前景色
						light: "#fff"//背景色
				   }
				 };
				 //this.QRlink 生成的二维码地址url
				 QRCode.toDataURL(that.QRlink, opts , (err, url) => {
					  if (err) throw err
					  //将生成的二维码路径复制给data的QRImgUrl
						  that.getimginfo(url)					  
				  }) 
			},
			getimginfo(url){
				let that = this
				uni.downloadFile({
					url: url, 
					success: (res) => {
					  if (res.statusCode === 200) {
							console.log(res.tempFilePath,'下载二维码')
							that.code_img = res.tempFilePath
					   }
					}
				});
			},
		    // 领取
			goreceive(){
				let that = this
				that.coseprizepopu()
				uni.navigateTo({
			    	url: 'receiveRrize?data='+ JSON.stringify(this.drawdata)  + '&type=2'
				});				
			},
			godraw(){
				let that = this 
				if(that.lucknum == 0){
					uni.showModal({
						title: '提示',
						content: '确定消耗'+ that.inte +'积分去抽奖吗',
						confirmText:'确定',
						cancelText:'取消',
						success: function (res) {
							if (res.confirm) {
								that.getexchange()
							} else if (res.cancel) {
								
							}
						}
					});
					
					return
				}
				that.luckdraw()
				
			},
			//抽奖
			luckdraw(){
			  let that = this 
			  uni.request({
			  	url: getApp().globalData.http_url + 'lottery/user/draw/' + 1,
			  	method: 'POST',
			  	header: {
			  		'content-type': 'text/json;charset=UTF-8',
			  		'sessionId': uni.getStorageSync('sessionId')
			  	},
			  	success: (res) => {
			  		console.log(res,'点击抽奖')
			  		if (res.data.code == 200) {
			  			that.getusertimes()
			  			that.drawdata = res.data.data
			  			console.log(res.data.data.prizeType)
			  			if(res.data.data.prizeType == 0){
			  				console.log('未中奖')
			  				that.opennoprize()
			  			}else{
			  				
			  				that.openprizepopu()
			  				console.log('中奖')
			  			}
			          				 
			  		} else {
			  			uni.showToast({
			  				title: res.data.msg,
			  				icon: 'none',
			  				duration: 1000
			  			});
			  		}
			  	}
			  });
			},
			// 积分兑换抽奖·
			getexchange(){
			  let that = this
			  uni.request({
			  	url: getApp().globalData.http_url + 'lottery/user/exchange/' + 1,
			  	method: 'GET',
			  	header: {
			  		'content-type': 'text/json;charset=UTF-8',
			  		'sessionId': uni.getStorageSync('sessionId')
			  	},
			  	success: (res) => {
			  		console.log(res,'兑换抽奖次数')
			  		if (res.data.code == 200) {
			          	 if(res.data.data.timesRemain != 0){
							 that.luckdraw()
						 }	
			  		} else {
			  			uni.showToast({
			  				title: res.data.msg,
			  				icon: 'none',
			  				duration: 1000
			  			});
			  		}
			  	}
			  });	
			},
			getusertimes(){
				let that = this
				uni.request({
					url: getApp().globalData.http_url + 'lottery/user/times/' + 1,
					method: 'GET',
					header: {
						'content-type': 'text/json;charset=UTF-8',
						'sessionId': uni.getStorageSync('sessionId')
					},
					data: {
				
					},
					success: (res) => {
						console.log(res,'抽奖次数')
						if (res.data.code == 200) {
				             that.lucknum = res.data.data.timesRemain
							 if(that.lucknum == 0){
								 that.getexchangeScore() 
							 }					
						}else if(res.data.code == 403){
							uni.navigateTo({
								  url:'../longin/longin'
							})
					    } else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});
						}
					}
				});
			},
			//获取兑换抽奖所需积分
			getexchangeScore(){
			   let that = this
			   uni.request({
			   	url: getApp().globalData.http_url + 'lottery/user/exchangeScore',
			   	method: 'GET',
			   	header: {
			   		'content-type': 'text/json;charset=UTF-8',
			   		'sessionId': uni.getStorageSync('sessionId')
			   	},
			   	success: (res) => {
			   		console.log(res,'抽奖所需积分')
			   		if (res.data.code == 200) {
			          that.inte = res.data.data	
			   		}else{
			   			uni.showToast({
			   				title: res.data.msg,
			   				icon: 'none',
			   				duration: 1000
			   			});
			   		}
			   	}
			   });
			},
			//活动规则列表
			getruleslist(){
			   let that = this
			   uni.request({
			   	url: getApp().globalData.http_url + 'lottery/act/rules/' + 1,
			   	method: 'GET',
			   	header: {
			   		'content-type': 'text/json;charset=UTF-8',
			   		'sessionId': uni.getStorageSync('sessionId')
			   	},
			   	success: (res) => {
			   		console.log(res,'活动规则列表')
			   		if (res.data.code == 200) {
			                that.ruleslist = res.data.data
			   		} else {
			   			uni.showToast({
			   				title: res.data.msg,
			   				icon: 'none',
			   				duration: 1000
			   			});
			   		}
			   	}
			   });	
			},
			//获取抽奖奖品列表
			getprizelist() {
				let that = this
				uni.request({
					url: getApp().globalData.http_url + 'lottery/prizes/' + 1,
					method: 'GET',
					header: {
						'content-type': 'text/json;charset=UTF-8',
						'sessionId': uni.getStorageSync('sessionId')
					},
					data: {

					},
					success: (res) => {
						console.log(res,'抽奖奖品列表')
						if (res.data.code == 200) {
                             that.Signlist = res.data.data
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});
						}
					}
				});
			},

			//获取活动详情 
			getActivelist() {
				let that = this
				uni.request({
					url: getApp().globalData.http_url + 'lottery/act/' + 1,
					method: 'GET',
					header: {
						'content-type': 'text/json;charset=UTF-8',
						'sessionId': uni.getStorageSync('sessionId')
					},
					data: {

					},
					success: (res) => {
						console.log(res,'获取活动详情')
						if (res.data.code == 200) {
							that.choujtimes = res.data.data.startTime
							that.stoptiemweew = res.data.data.endTime
							that.actDesc=res.data.data.actDesc
							let timeStr = getDateTime.dateTimeStr(
							'y-m-d h:i:s'); // y:年 m:月 d:日 h:时 i:分 s:秒 中间的分割符号可更改

							if (timeStr < this.choujtimes) {
								this.showcjBtn = 1
							}
							if (timeStr >= this.choujtimes && timeStr < this.stoptiemweew) {
								this.showcjBtn = 2
							}
							if (timeStr >= this.stoptiemweew) {
								this.showcjBtn = 3
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							});
						}
					}
				});


			},

			//获取滚动信息
			getrotion() {
				let that = this
				uni.request({
					url: getApp().globalData.http_url + 'lottery/rotation',
					method: 'GET',
					header: {
						'content-type': 'text/json;charset=UTF-8',
						'sessionId': uni.getStorageSync('sessionId')
					},
					data: {

					},
					success: (res) => {

						if (res.data.code == 200) {
							res.data.data.map(item => {
								item.name = item.userName + "抽中了" + item.prizeName
								that.listKey.push({name:item.name})
							})
							
							console.log(that.listKey)

						}

					}
				});
			},
			//关闭抽奖规则弹框
			getclosepopu() {
				this.$refs.rulepopu.close()
			},
			//打开抽奖规则
			openrules() {
				this.$refs.rulepopu.open("center")
			},
			goprizeRecord() {
				uni.navigateTo({
					url: 'drawGift'
				})
			},
			getcanvas(){
			 	uni.showLoading({
			 	   title: '加载中...'
			    })
				let that = this
				setTimeout(() => {
					let canvasCss = {
						 w: 306,
						 h: 544
					 };
					const ctx = uni.createCanvasContext('myCanvas', that);
					ctx.fillRect(0, 0, canvasCss.w, canvasCss.h);
					  // 填充白色背景
					ctx.setFillStyle('white');
					var bkimg = that.back_img
					var code = that.code_img
					ctx.drawImage(bkimg, 0, 0, canvasCss.w, canvasCss.h);
					// 邀请码
					ctx.drawImage(code,canvasCss.w/2-40,canvasCss.h-100,80,80)
					ctx.draw(false, (() => {
						setTimeout(() => {
							uni.canvasToTempFilePath({
								canvasId: 'myCanvas',
								destWidth: 700,
								destHeight: 1300,
								quality: 1,
								fileType: 'png',
								success: (res) => {
									console.log(res,'画布')	
									var img = res.tempFilePath
									 that.back_img = img
									 uni.hideLoading();	
								},
								fail(err) {
									console.log(err)
								},
								complete(val) {
									uni.hideLoading();
								},
							}, that);
						}, 1500)
					})())
			   }, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.nori_class{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		.tsd_txt{
			font-size: 36upx;
			color: #fff;
			font-weight: 500;
		}
		.no_prizeimg{
			width: 400upx;
			height: 324upx;
			margin-top: 60upx;
			margin-bottom: 120upx;
		}
		.btn_gb{
			width: 360upx;
			height: 88upx;
		}
		
		
	}
	.rule_box {
		width: 550upx;
		padding: 40upx;
		background-color: #fff;
		border-radius: 32upx;
	}

	.close_i {
		width: 24upx;
		height: 24upx;
		position: absolute;
		right: 32upx;
		top: 32upx;
	}

	.r_txt {
		width: 100%;
		text-align: center;
		font-size: 32upx;
		color: #222;
		font-weight: 500;
		padding-bottom: 40upx;
	}
    .rule-text {
		text-align: left;
		width: 100%;
		font-size: 28upx;
		color: #666666;
		padding-bottom: 12upx;
	}
	.rule_btn {
		width: 148upx;
		height: 56upx;
		background-color: #7100BB;
		border-bottom-left-radius: 25upx;
		border-top-left-radius: 25upx;
		position: fixed;
		right: 0;
		top: 535upx;
		text-align: center;
		line-height: 56upx;
		font-size: 24upx;
		color: #fff;
		font-weight: 400;
	}

	.whole-page {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(90deg, #EF3B54 0%, #EB2252 100%);
	}

	.Draw-top {
		width: 100%;
		position: relative;
	}

	.top-text {
		width: 100%;
		position: absolute;
		text-align: center;
		left: 0;
		bottom: 30upx;
	}

	.top-text view {
		font-size: 24upx;
		color: #FFFFFF;
		padding:0 40upx;
	}

	.whole-padd {
		width: 100%;
		padding: 0 32upx;
	}
	
	.awardee_box {
		width: 100%;
		height: 60rpx;
		box-shadow: inset -2upx 0px 1upx #71DAAE, inset 1px 0px 0px #DFFFFE, inset 0px -1px 0px #DFFFFE, inset 0px 2upx 2upx #71DAAE;

		border-radius: 6upx;
		display: flex;
		align-items: center;
		margin-bottom: 20upx;
		color: #fff !important;
	}
	

	.whole-Draw {
		/* width: 100%; */
		height: 1010upx;
		background: #B037FF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset -2px 0px 2px #FFFFFF, inset 2px 0px 8px #FFFFFF, inset 0px 2px 8px #FFFFFF;
		border-radius: 48upx;
		padding: 40upx 62upx;
	}

	

	.Draw-roll {
		width: 100%;
		box-shadow: inset -2upx 0px 1upx #71DAAE, inset 1px 0px 0px #DFFFFE, inset 0px -1px 0px #DFFFFE, inset 0px 2upx 2upx #71DAAE;
		border-radius: 6upx;
		height: 60upx;
		line-height: 60upx;
		padding-left: 20upx;
		margin-bottom: 28upx;
		font-size: 24upx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.not-bottom {
		width: 100%;
		margin: 36upx 0;
		height: 180upx;
		text-align: center;
		line-height: 132upx;
		background: rgba(255, 210, 142, 0.5);
		box-shadow: -1px 0px 0px #9B4800, 0px 4px 0px #9B4800, inset 0px 1px 0px #FFFFFF;
		border-radius: 40upx;
		padding: 20upx;
	}

	.not-bottom_stop {
		width: 100%;
		margin: 36upx 0;
		height: 180upx;
		text-align: center;
		line-height: 132upx;
		background: rgba(255, 210, 142, 0.5);
		box-shadow: -1px 0px 0px #9B4800, 0px 4px 0px #9B4800, inset 0px 1px 0px #FFFFFF;
		border-radius: 40upx;
		padding: 20upx;
	}

	.share_btn {
		width: 100%;
		margin: 36upx 0;
		height: 180upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFD28E;
		box-shadow: -1px 0px 0px #9B4800, 0px 4px 0px #9B4800, inset 0px 1px 0px #FFFFFF;
		border-radius: 40upx;
		padding: 20upx;
	}

	.btn_one {
		width: 248rpx;
		height: 140rpx;
		margin: 0 3upx;
	}

	.cj_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 248rpx;
		height: 140rpx;
		position: relative;
		margin: 0 3upx;

	}

	.btn_two {
		width: 248rpx;
		height: 140rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 98;
	}

	.cj_num {
		font-size: 40upx;
		font-weight: 400;
		color: #fff;
		z-index: 99;
		margin-bottom: 22upx;
	}

	.not-conet {
		width: 100%;
		height: 100%;
		background: rgba(235, 35, 82, 0.5);
		box-shadow: inset 0px -10px 0px #733500, inset 0px 4px 8px #FF8EA9;
		border-radius: 32upx;
		font-size: 40upx;
		color: #FFFFFF;
	}

	.record-bottom {
		width: 100%;
		font-size: 28upx;
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.record-bottom view {
		width: 2upx;
		height: 20upx;
		background: #FFFFFF;
		margin: 0 12upx;
	}

	.title-Draw {
		width: 100%;
		padding: 40upx 0;
		font-weight: 500;
		font-size: 36upx;
		color: #FFFFFF;
		text-align: center;
	}

	.whole-list {
		width: 100%;
		padding: 0 28upx 30upx 30upx;
	}

	.list-for {
		width: 338upx;
		height: 404upx;
		background: #FFFFFF;
		border: 1upx solid rgba(34, 34, 34, 0.12);
		border-radius: 32upx;
		float: left;
		margin: 5upx;
	}

	.list-img {
		width: 100%;
		height: 338upx;
		box-shadow: inset 0px -1px 2px rgba(0, 0, 0, 0.25);
		border-radius: 32upx;
	}

	.list-img image {
		width: 100%;
		height: 100%;
	}

	.list-title {
		width: 100%;
		text-align: center;
		padding-top: 16upx;
	}
	.content-title {
		  width: 100%;
		  font-weight: 700;
		  font-size: 36upx;
		  color: #FEF6AB;
		  text-align: center;
		  padding: 60upx 0;
	}
	.conet-Red {
		 width: 500upx;
		  margin: 0 auto;
		  position: relative;
	}
	.title-red {
		  width: 100%;
		  position: absolute;
		  top: 40upx;
		  text-align: center;
		  font-weight: 700;
		  font-size: 120upx;
		  color: #F0250E;
	}
	 .title-red text{
		  font-weight: 700;
		  font-size: 48upx;
		  color: #F0250E;  
	 }
	.red-buttom {
		  width: 100%;
		  position: absolute;
		  bottom:60upx;
	}
	.red-text {
		width: 100%;
		text-align: center;
		padding-bottom: 30upx;
		font-size: 30upx;
		color: #fff;
		
	}
	.red-botton {
		 width: 346upx;
		 height: 84upx;
		 line-height: 84upx;
		 text-align: center;
		 margin: 0 auto;
		 color:  #B22821;
		 font-size: 36upx;
		 background: linear-gradient(180deg, #FEEBB2 0%, #FFB445 100%);
		 border-radius: 48upx;
	}
	.cheang-title {
		  width: 100%;
		  text-align: center;
		  font-weight: 700;
		  font-size: 44upx;
		  color: #FFFFFF;
	}
	.fail-img {
		  width: 400upx;
		  margin: 60upx auto;
	}
	.close-buttom {
		  width: 100%;
		  text-align: center;
	}
	.close-buttom image{
		  width: 56upx;
		  height: 56upx;
	}
	.first-whole {
		width: 100%;
	}
	.honey-img {
		  width: 320upx;
		  margin: 0 auto 60upx auto;
	}
	.inte-img{
		 width: 400upx;
		 margin: 0 auto 60upx auto;
	}
	.first-img {
		 width: 440upx;
	   position: relative;
	    margin: 0 auto 30upx auto;
	}
	.post-first {
		  position: absolute;
		  bottom: 120upx;
		  text-align: center;
		  width: 100%;
		  font-size: 28upx;	  
		  color: #FFFFFF;
	}
	.button-first {
		 width: 440upx;
		 height: 88upx;
		 line-height: 88upx;
		 text-align: center;
		 margin: 60upx auto;
		 color:  #B22821;
		 font-size: 36upx;
		 background: linear-gradient(180deg, #FEEBB2 0%, #FFB445 100%);
		 border-radius: 48upx; 
	}
	.work-img {
		   width: 500upx;
		   margin: 0 auto 30upx auto;
	}
	.work-img image{
		  border-radius: 10upx;
	}
	.work-text {
		  text-align: center;
		  font-size: 34upx;
		  color: #f2f2f2;
		  padding-bottom: 40upx;
	}
	// 分享样式
	.share-whole {
		width: 610upx;
		margin: 10vh auto 0 auto;
	}
	.share-img {
		width: 100%;
		height: 1088upx;
	}
	.share-img image{
		width: 100%;
		height: 100%;
	}
	.share-text {
		width: 100%;
		font-size: 28upx;
		color: #FFFFFF;
		padding: 40upx 0;
		text-align: center;
	}
	.share-bottom {
		width: 100%;
		display: flex;
		height: 88upx;
		line-height: 88upx;
		border-radius: 48upx;
		border: 1upx solid #FEEBB2;
	}
	.share-item {
		flex: 1;
		height: 100%;
		font-size: 32upx;
		color: #FEEBB2;
		text-align: center;
	}
	.bunt {
		color: #B22821;
		background: linear-gradient(180deg, #FEEBB2 0%, #FFB445 100%);
	}
	.whole-Mask {
		position: fixed;
		z-index: 999;
		background-color: rgba(0,0,0,0.8);
	}
	.mask-draw {
		width: 100%;
		margin-top: 20vh;
	}
	.close-imge {
		width: 100%;
		padding: 40upx 0;
		text-align: center;
	}
	.close-imge image{
		width: 80upx;
		height:80upx;
	}
</style>
