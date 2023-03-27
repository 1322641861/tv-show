<template>
	<view class="whole-page">
		  <view class="longin-title">登录密盒星球</view>
		  <view class="longin-text">发现更多艺术品</view>
		  <view style="width:100%;" v-if="longtype == 1">
			  <view class="longin-item">
				   <input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone"
						:adjust-position="false"/>
			  </view>
			  <view class="longin-shuo">未注册的手机号将自动注册</view>
			  <view class="longin-item">
				   <input placeholder="请输入短信验证码" type="number" maxlength="6" v-model="Verif"
					   style="width:60%;" :adjust-position="false"/>
				   <view class="right-input" @click='Verifications()'>{{text}}</view>
			  </view>
			  <view class="longin-button"  @click='goregister()'>登录/注册</view>
		  </view>
		  <view style="width:100%;" v-if="longtype == 2">
			   <view class="longin-item">
			   		   <input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone"
			   				:adjust-position="false"/>
			       </view>
			   	<view class="longin-item" style="margin-top:30upx;">
			   		   <input placeholder="请输入登录密码" password type="text" v-model="password"
			   				:adjust-position="false"/>
			   	</view>
			   	<view class="longin-button" @click='goregister()'>登 录</view>
		  </view>
		  <view class="agreement-whole">
			   <view class="agreement-radius" :class="ifagree ? 'bord':''" 
					 @click="goifagree">
					 <image src="../../../static/images/xz2.png"  v-if="ifagree"></image>
			   </view>
			   <view class="agreement-text">
					 已阅读并同意<text @click="goyh">《用户协议》</text> 和 <text @click="goys">《隐私协议》</text>
			   </view>
		  </view>
		  <view class="longtype-top">
			    <view class="longt-xian"></view>
				<view class="longt-title">切换登录方式</view>
				<view class="longt-xian"></view>
		  </view>
		  <view class="longtype-conet">
			    <view class="longtype-item" @click="golongtype(1)">
					   <view class="longtype-img">
						    <image src="../../../static/images/dl1.png" v-if="longtype == 2"></image>
							<image src="../../../static/images/dl1@.png" v-if="longtype == 1"></image>
					   </view>
					   <view class="longtype-text" 
					      :class="longtype == 1 ? 'tuns':''">验证码登录</view>
				</view>
			    <view class="longtype-item" @click="golongtype(2)">
			    	   <view class="longtype-img">
			    		    <image src="../../../static/images/dl2.png" v-if="longtype == 1"></image>
			    			<image src="../../../static/images/dl2@.png" v-if="longtype == 2"></image>
			    	   </view>
			    	   <view class="longtype-text" 
			    	       :class="longtype == 2 ? 'tuns':''">密码登录</view>
			    </view>
		  </view>
	<!-- 	  <view class="whole-Mask" v-if="if_dist">
			    <view class="content-back" @click="goifdist()">
				 </view>
			    <view class="content-verify">
					 <view class="popup-title" style="padding-top:0;">滑动验证</view> 
				 	<xl-slider-verify @success="verifySuccess" :reset="false"></xl-slider-verify>
			    </view>
		  </view> -->
	</view>
</template>

<script>
	var times = 60;
	import {
	    setCode,
		orlogin
	} from '@/api/api.js';
	import xlSliderVerify from '@/components/xlSliderVerify.vue'
	export default {
		components:{
			xlSliderVerify
		},
		data() {
			return {
				ifagree:false,
				if_dist:false,
				phone:"",
				password:"",
				Verif:"",
				longtype:2,
				lincode:'',
				text:'获取验证码',
			}
		},
		onShow(){
			let that = this
			var lincode = that.getRequest().inviteCode
			if(lincode){
				console.log(lincode,'邀请码')
				that.lincode = lincode
			}
		
		},
		methods: {
			goifdist(){
				this.if_dist = false
			},
			golongtype(e){
			   this.longtype = e
			   this.password = ''
			   this.Verif = ''
			},
			// verifySuccess(){
			// 	console.log('验证成功')
			// 	this.disabled = true
			// 	this.if_dist = false
			// 	if(times!=60){
			// 	}else{
			//     	this.sendcode();
			// 	} 
			// },
			goifagree(){
			   this.ifagree = !this.ifagree
			   console.log(this.ifagree)
			},
			Verifications(){
			   let that = this
			    if(times!=60){
			    }else{
			      that.sendcode();
			    }
			},
			setHtml(){
				let that = this
			   -- times;
			   if(times!=0){
				   that.text = times + 's'
				   setTimeout(function () {
					 that.setHtml()
				   }, 1000)
			   }else{
				 that.text = '获取验证码'
				 times = 60
			   }
			 },
			sendcode(){
				 let that = this
			   var regex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;//手机号正则
			   if(regex.test(that.phone)){
				  console.log(that.phone)
				    that.setHtml()
				    that.get_code() 			
			   }else{
				 uni.showToast({
					title:'请输入正确的手机号码 !',
					icon: 'none',
					duration: 1000
				 });
			   } 
			},
			get_code(){
				let that = this
				let callback = function(res) {
					 /* res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
					   res（客户端出现异常错误 仍返回可用票据） = {ret: 0, ticket: "String", randstr: "String", 
															 errorCode: Number, errorMessage: "String"}
					   res（用户主动关闭验证码）= {ret: 2}
					   */		  
					if (res.ticket && !res.errorMessage){
						// 上传票据 可根据errorCode和errorMessage做特殊处理或统计
						setCode({
						   ticket: res.ticket,
						   rendStr: res.randstr,
						   phone: that.phone,
						   status:1
						}).then(res => {
							console.log(res)
							if(res.code == 200){
								 uni.showToast({
									title:'验证码已发送 !',
									icon: 'none',
									duration: 1500
								 });
							}else{
								uni.showToast({
									title:res.message,
									icon: 'none',
									duration: 1500
								});	 
							}
						})	
					}
				} 		
				let loadErrorCallback = function (e) {
				   uni.showToast({
				   	title: "加载验证失败！",
				   	icon: 'none',
				   	duration: 1500
				   });	 
				}
				
				try {
				  var captcha1 = new TencentCaptcha(getApp().globalData.captchaAppId, callback);
				  captcha1.show(); // 显示验证码
				  
				} catch (error) {
				  loadErrorCallback(error);
				}
		
			
			},
			goregister(){
			   let that = this
			   var info = ''
			   if(that.longtype == 1){
					  if(that.phone == ''){
						 info = '请输入手机号码'
					  }else if(that.Verif == ''){
						 info = '请输入验证码'
					  }else if(!that.ifagree){
						 info = '请同意并阅读协议'
					  } 
			   }else{		   
				   if(that.phone == ''){
					 info = '请输入手机号码'
				   }else if(that.password == ''){
					 info = '请输入登录密码'
				   }else if(!that.ifagree){
					 info = '请同意并阅读协议'
				   }    
			   }	 
			   if(info != ''){
					uni.showToast({
					title:info,
					icon: 'none',
					duration: 1500
				   });	
					return
			   }else{ 
				 uni.showLoading({
					title: '登录中',
					mask:true
				 });
				 orlogin({
				    phone: that.phone,
				    code: that.Verif,
				    password:that.password,		
				    inviteCode:that.lincode ? that.lincode : "",
				 }).then(res => {
				 	console.log(res)
				 	if(res.code == 200){
				 		that.phone = ''
				 		that.Verif = ''
				 		that.lincode = ''
				 		that.vscode = ''
				 		uni.setStorageSync('sessionId',res.data.sessionId)
				 		uni.setStorageSync('userId', res.data.userId)	
				 		console.log(uni.getStorageSync('sessionId'),'22222')
				 		if(res.data.isSetPassword == 2){
				 			uni.showToast({
				 				title:'请去设置登录密码',
				 				icon: 'none',
				 				duration: 1500
				 			});
				 			setTimeout(() => {
				 			    uni.navigateTo({
				 			    	url: '../my/setpassword?type=1'
				 			    });
				 			}, 1000);	
				 		   return
				 		}else{
				 		   if(res.data.isRegister == 1){
				 				uni.showToast({
				 					title:'请先实名认证',
				 					icon: 'none',
				 					duration: 1500
				 				});
				 				setTimeout(() => {
				 					uni.reLaunch({
				 					  url:'../my/authentication'	 
				 					});
				 				}, 1000)
				 		   }else{
				 	           console.log('111')
				 				setTimeout(() => {
				 					uni.reLaunch({
				 						 url: '../home/index'
				 					});
				 				}, 500)
				 		   }	
				 		}			 		  		   
				 	}else{
				 		uni.showToast({
				 			title:res.message,
				 			icon: 'none',
				 			duration: 1500
				 		});	 
				 	}
				 })	
			   }
			},
			goyh(){
				// uni.navigateTo({
				//     url:'Privacytext'	
				// })
				 window.location = "http://chigua-official-site.chiguazixun.com/privacy/privacy1.html"
				 
			},
			goys(){
				// uni.navigateTo({
				//     url:'Servicetext'	
				// })
			    window.location =  "http://chigua-official-site.chiguazixun.com/privacy/privacy2.html"
			},
			getRequest(){
				var url = window.location.search;		
				var theRequest = new Object();		
				if (url.indexOf("?") != -1) {		
				   var str = url.substr(1); //获取url中"?"符后的字串 		
				   var strs = str.split("&");	
					for (var i = 0; i < strs.length; i++) {	
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);					
					}		
				}		
			   return theRequest;	
			},
		}
	}
</script>

<style>
	.whole-page {
		width: 100%;
		height: 100vh;
		padding: 88upx 64upx 0 64upx;
		background-color: #fff;
	}
    .longin-title {
		font-weight: 500;
		font-size: 44upx;
		color: #222222;
		padding-bottom: 32upx;
	}
	.longin-text {
		font-size: 32upx;
		padding: 0;
		color: rgba(34, 34, 34, 0.6);
		margin-bottom: 200upx;
	}
	.longin-shuo {
		width: 100%;
		font-size: 24upx;
		color: #222222;
		opacity: 0.56;
		margin: 24upx 0 30upx 0;
	}
	.longin-item {
		width: 100%;
		padding: 32upx 0;
		border-bottom: 1upx solid #CCCCCC;
	}
	.longin-item input {
		width: 100%;
		color: #222222;
		float: left;
		font-size: 32upx;
	}
	.right-input {
		  float: right;
		  font-size: 28upx;
		  color: #333333; 
	}
	.longin-button {
		width: 100%;
		height: 104upx;
		background: #222222;
		border-radius: 16upx;
		color: #FFFFFF;
		font-weight: 500;
		font-size: 32upx;
		text-align: center;
		line-height:104upx;
		margin: 66upx 0 32upx 0;
	}
	.agreement-whole {
		width: 100%;
		padding: 24upx 0;
	}
	.agreement-radius {
		float: left;
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		margin: 2upx 10upx 0 0;
		border: 2upx solid #C4C4C4;
	}
	.agreement-radius image {
		  width: 100%;
		  height: 100%;
	}
	.bord {
		  border:none;
	}
	.agreement-text {
		float: left;
		font-size: 24upx;
		color:rgba(34, 34, 34, 0.6);	
	}
	.agreement-text text {
		color: #222222;
	}
	.longtype-top {
		width: 100%;
		margin-top: 80upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.longt-xian {
		width: 196upx;
		height: 1upx;
		background-color: #F0F0F0;
	}
	.longt-title {
		color:rgba(204, 204, 204, 1);
		font-size: 28upx;
		text-align: center;
		padding: 0 20upx;
	}
	.longtype-conet {
		width: 100%;
		display: flex;
	}
	.longtype-item {
		flex: 1;
		margin-top: 20upx;
		text-align: center;
	}
	.longtype-img {
		width: 64upx;
		height: 64upx;
		margin: 10upx auto;
	}
   .longtype-img image{
	   width:100%;
	   height:100%;
   }
   .longtype-text{
	   font-size:24upx;
	   color: #999999;
   }
   .tuns {
	   color: #222222;
   }
   
</style>
