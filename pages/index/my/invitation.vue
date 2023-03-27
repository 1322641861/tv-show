<template>
	<view class="whole-page">
		  <view class="code-whole">
				<view class="code-img">
					  <swiper :indicator-dots="true" indicator-active-color="#fff"
					     :current="current"  @change="goswiper">
					  	 <swiper-item v-for="(item,index) in newPicArry">
					  		   <image :src="item"></image>
							   <canvas :canvas-id="'myCanvas'+index" style='opacity:0;width:240px;height:440px'/>
					  	 </swiper-item>
					  </swiper>
				</view>
				<view class="code-text">
					  <view class="left-text">我的邀请码：{{inviteCode}}</view>
					  <view class="right-text" @click="gocopy">
						    <image src="../../../static/images/fz.png"></image>
					  </view>
				</view>
				<view class="code-button" @click="copylike">复制邀请链接</view>
		  </view>
		  <view class="text-next">长按图片保存分享海报</view>
		 <canvas canvas-id="myCanvas" style='opacity:0;width:240px;height:440px'/>
	</view>
</template>

<script>
	import QRCode from 'qrcode';
	export default {
		data() {
			return {
				newPicArry:[
					'../../../static/images/hb.jpg',
					'../../../static/images/hb1.jpg',
					'../../../static/images/hb2.jpg',
					'../../../static/images/hb3.jpg',
					'../../../static/images/hb4.jpg'
				],
			   current:0,
			   canvasUrl:"",
			   firstFlag:true,
			   inviteCode:"",
			   code_img:"",  
			   QRlink:"",
			   base64Img:"",
			   ut_code:"",
			   canvasCss:{
					w: 240,
					h: 440
			   },
			   back_img:"../../../static/images/hb.jng",
			   // back_img:"https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/2022/04/22/20220422103834704.png",
			   
			 //  http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api // 测试 test
			 //  img_url:"https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/", // 正式 prod // 测试 test
			}
		},
		onLoad(e) {
		  console.log(e)
		  this.inviteCode = e.inviteCode
		  this.QRlink = 'https://jkyx-api.chiguavod.com/blindBoxMate/'+'?inviteCode='+ e.inviteCode
		  this.goiscode()
		},
		//mounted(){
	       // this.goSee()
		//},
		methods: {
			goswiper(e){
			  var i = e.detail.current 
			  this.current = e.detail.current
			  if(this.newPicArry[i] == '../../../static/images/hb.jpg' || this.newPicArry[i] == '../../../static/images/hb1.jpg' || this.newPicArry[i] == '../../../static/images/hb2.jpg' || this.newPicArry[i] == '../../../static/images/hb3.jpg' || this.newPicArry[i] == '../../../static/images/hb4.jpg'){
				    this.getcanvas(this.ut_code)
			  }
			  console.log(this.current)  	
			},
			gocopy(){
				let that = this
				uni.setClipboardData({
					data: that.inviteCode,
					success: function () {
						console.log('success');
					    uni.hideKeyboard();
						uni.showToast({
							title:'已复制',
							icon: 'none',
							duration: 1500
						});
					}
				});
			},
			copylike(){
				let that = this
				uni.setClipboardData({ 
					data:'https://jkyx-api.chiguavod.com/blindBoxMate/'+'?inviteCode='+that.inviteCode,
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
      //      		uni.request({
      //      		     url: that.http_url + 'mine/index/inviteQrcode', 
      //      			 method:'GET',
      //      			 header:{
      //      				 'content-type': 'text/json;charset=UTF-8',
      //      				 'sessionId':uni.getStorageSync('sessionId')
      //      			 },
					 // data:{
						// url:'https://jkyx-api.chiguavod.com/blindBoxMate/#/'+'?inviteCode='+that.inviteCode
					 // },
      //      		     success: (res) => {
      //      				console.log(res,'二维码');	
				  //       that.code_img = that.img_url+res.data.data
						//     console.log(that.code_img)
						// //	that.getcanvas()		
      //      		    }
      //      		});
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
	                     that.code_img=url
	          		  console.log(that.code_img)
					  that.getimginfo()
					  
	            }) 
           	},
			getimginfo(){
			    let that = this
				uni.downloadFile({
					url: that.code_img, 
					success: (res) => {
						if (res.statusCode === 200) {
							console.log(res.tempFilePath,'下载二维码')
							that.ut_code = res.tempFilePath
							that.getcanvas(res.tempFilePath)
						}
					}
				});
			},
			getcanvas(code){
			 	uni.showLoading({
			 	   title: '加载中...'
			  })
				let that = this
				let canvasCss = {
					 w: 240,
					 h: 440
				 };
				const ctx = uni.createCanvasContext('myCanvas', that);
				 ctx.fillRect(0, 0, canvasCss.w, canvasCss.h);
				  // 填充白色背景
				ctx.setFillStyle('white');
				var i = that.current
				var bkimg = that.newPicArry[i]
				ctx.drawImage(bkimg, 0, 0, canvasCss.w, canvasCss.h);
				// 邀请码
				ctx.drawImage(code,80,canvasCss.h-110,80,80)
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
								 that.base64Img = img
								 that.newPicArry[i] = img
								 if(that.current == 4){
									 that.current = 0
								 }else{
									  that.current = i+1
								 }					 			
								 that.firstFlag = false
								 uni.hideLoading();
								 console.log(i)		
							},
							fail(err) {
								console.log(err)
							},
							complete(val) {
								uni.hideLoading();
							},
						}, that);
					}, 2500)
				})())
			}
		}
	}
</script>

<style>
	page{
	  background-color: #f7f7f7;
	}
	image {
		width: 100%;
		height: 100%;
	}
	swiper,swiper-item{
		width: 100%;
		height: 100%;
	}
	.whole-page {
		padding: 40upx 20upx;
		height: 99vh;
	}
	.img-code {
		width: 400upx;
		height: 400upx;
		margin:  20upx auto;
	}
	.code-whole {
		width: 100%;
		background: rgba(255, 255, 255, 0.3);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
		border-radius: 40upx;
		padding: 80upx 40upx;
	}
	.code-img {
		width: 480upx;
		height: 880upx;
		margin: 0 auto;
		border-radius: 10upx;
		position: relative;
	}
	.code-text {
		width: 400upx; 
		padding: 40upx 0;
		margin: 0 auto;
	}
	.left-text {
		float: left;
		font-size: 30upx;
		color: #000000;
	}
	.right-text {
		float: right;
		font-size: 30upx;
		color: #4664F5;
		width: 32upx;
		height: 32upx;
		margin-top: 4upx;
	}
	.code-button {
		width: 100%;
		height: 84upx;
		line-height: 84upx;
		text-align: center;
		font-size: 32upx;
		color: #FFFFFF;
		background: #333333;
		border-radius: 42upx;
	}
	.post-img {
		width: 160upx;
		height: 160upx;
		position: absolute;
		bottom:90upx;
		left: 160upx;
	}
	.text-next {
		width: 100%;
		text-align: center;
		font-size: 28upx;
		color: #999999;
		padding: 20upx 0;
	}
</style>
