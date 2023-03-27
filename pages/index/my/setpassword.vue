<template>
    <view class="whole-page">
		  <view class="set-title">{{type == 1 ? '设置密码':'重置密码'}}</view>
		  <view class="set-text">
			    设置密码后，下次登录可以使用手机号+密码进行快速登录
			    密码需是6-20位，大小写英文字母+数字+符号。
		  </view>
		 <view class="longin-item">
		 	   <input placeholder="请输入密码" :password="isAbleSee ? true : false" 
			         type="text" v-model="password" :adjust-position="false"/>
				<image @click="goisAbleSee" :class="isAbleSee ? 'giks':''"
				   :src="isAbleSee ? '../../../static/images/by.png':'../../../static/images/xs.png'"></image>
		 </view>
		 <view class="longin-item">
		 	   <input placeholder="请再次确认密码" :password="isAbleSee2 ? true : false"  
			          type="text" v-model="password_num" :adjust-position="false"/>
			 <image @click="goisAbleSee2" :class="isAbleSee2 ? 'giks':''"
			        :src="isAbleSee2 ? '../../../static/images/by.png':'../../../static/images/xs.png'"></image>
		 </view>
		<view class="longin-item" v-if="type == 2">
			   <input placeholder="请输入短信验证码" type="number" maxlength="6" v-model="Verif"
				   style="width:60%;" :adjust-position="false"/>
			   <view class="right-input" @click='Verifications()'>{{text}}</view>
		</view>
		 <view class="longin-button"  @click='goPassword()'>确 定</view>
	</view>
</template>

<script>
	var times = 60;
	export default {
		data() {
			return {
			  text:'获取验证码',
			  phone:"",
			  Verif:"",
			  isAbleSee:true,
			  isAbleSee2:true,
			  password:"",
			  password_num:"",
			  type:1
			}
		},
		onLoad(e){
			console.log(e)
			this.type = e.type
			this.getuserInfo()
			 if(e.type == 2){
				  uni.setNavigationBarTitle({ title: "重置登录密码" });
			 }
		},
		onShow(){
		
		},
		methods: {
			goPassword(){
			   let that = this
			   if(that.password == ''){
				  uni.showToast({
					title:'请输入密码',
					icon: 'none',
					duration: 1500
				  });
				  return
			   }
			   if(that.password_num == ''){
				  uni.showToast({
					title:'请输入再次确认密码',
					icon: 'none',
					duration: 1500
				  });
				  return
			   }
			   if(that.password_num != that.password){
				  uni.showToast({
					title:'两次密码输入不一致',
					icon: 'none',
					duration: 1500
				  });
				  return
			   }
			   uni.showLoading({
					 title: '加载中',
					 mask:true
			   });	
			   uni.request({
			        url: getApp().globalData.http_url + 'mine/index/updatePassword', 
					 method:'GET',
					 dataType:"json",
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
					 },
					 data:{
						password:that.password,
						confirmPassword:that.password_num,
						code:that.Verif
					 },
			         success: (res) => {
						console.log(res.data)
						uni.hideLoading()
						if(res.data.code == 200){
							uni.showToast({
								title:'密码设置成功！',
								icon: 'none',
								duration: 1500
							});
							setTimeout(() => {
								uni.reLaunch({
									 url: '../my/personal'
								});
							}, 1000)		
						}else{
							uni.showToast({
								title:res.data.msg,
								icon: 'none',
								duration: 1500
							});	 
						}				
			        },
			   });		  			
			},
			getuserInfo(){
			   let that = this
			   uni.request({
			        url: getApp().globalData.http_url + 'mine/index/list/' +  uni.getStorageSync('userId'), 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId':  uni.getStorageSync('sessionId')
					 },
					 success: (res) => {
					 console.log(res.data.data,'用户信息');	
					 if(res.data.code == 200){		
						that.phone = res.data.data.phone
					  }
			       }
			   });
			},
			goisAbleSee(){
				this.isAbleSee = !this.isAbleSee
			},
			goisAbleSee2(){
				this.isAbleSee2 = !this.isAbleSee2
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
				that.setHtml()
				that.get_code() 
			},
			get_code(){
				 let that = this
				uni.request({
				     url: getApp().globalData.http_url + 'app/user/send_code', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
					 },
					 data:{
						phone: that.phone
					 },
				    success: (res) => {
						console.log(res.data)
						if(res.data.code == 200){
							 uni.showToast({
								title:'验证码已发送 !',
								icon: 'none',
								duration: 1500
							 });
						}else{
							uni.showToast({
								title:res.data.message,
								icon: 'none',
								duration: 1500
							});	 
						}				
				    },
				});		
			},
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.whole-page {
		padding: 88upx 64upx 0 64upx;
	}
	.set-title {
		width: 100%;
		font-weight: 500;
		font-size: 44upx;
		color: #222222;
	}
	.set-text {
		width: 100%;
		padding: 34upx 0;
		font-size: 24upx;	
		color: #222222;	
		opacity: 0.4;
	}
	.longin-item {
		width: 100%;
		padding: 32upx 0;
		margin-top:30upx;
		border-bottom: 1upx solid #222222;
	}
	.longin-item input {
		width: 90%;
		color: #222222;
		float: left;
		font-size: 32upx;
	}
	.longin-item image {
		float: right;
		width: 32upx;
		height: 26upx;
		margin: 14upx 10upx 0 0;
	}
	.giks {
		height: 20upx !important;
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
</style>
