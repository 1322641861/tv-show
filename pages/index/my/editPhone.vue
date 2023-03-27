<template>
	<view class="whole-page">
		  <view class="phone-title">
			    当前手机号：{{phone}}
		  </view>
		  <view class="phone-text">需要更换的新手机号码</view>
		  <view class="phone-item">
				<input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone_new"
					   style="width:100%;"	:adjust-position="false"/>
		  </view>
		  <view class="phone-item">
		  		<input placeholder="请输入验证码" type="number" maxlength="6" v-model="Verif"
		  			   style="width:60%;" :adjust-position="false"/>
		  		 <view class="right-input" @click='Verifications()'>{{text}}</view>
		  </view>
		    <view class="popup-button"  @click='goregister()'>确认更换手机号</view>
	</view>
</template>

<script>
	var times = 60;
	export default {
		data() {
			return {
				phone:"",
				phone_new:"",
				Verif:"",
				text:'获取验证码',
			//	http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api 测试 test
			}
		},
		onLoad(e) {
           this.phone = e.phone
		},
		methods: {
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
              if(regex.test(that.phone_new)){
           	  console.log(that.phone_new)
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
           	 uni.request({
           	     url: getApp().globalData.http_url + 'app/user/send_code', 
           		 method:'GET',
           		 header:{
           			 'content-type': 'text/json;charset=UTF-8',
           		 },
           		 data:{
           			phone: that.phone_new
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
           goregister(){
              let that = this
              var info = ''
              if(that.phone_new == ''){
           	   info = '请输入新手机号码'
              }else if(that.Verif == ''){
           	   info = '请输入验证码'
              }		 
              if(info != ''){
           		uni.showToast({
           		title:info,
           		icon: 'none',
           		duration: 1500
           	   });	
           		return
              }else{  
           	  uni.request({
           	     url: getApp().globalData.http_url + 'mine/index/changePhone?phone=' + that.phone_new +'&code='+ that.Verif, 
           	  	 method:'POST',
           		 dataType:"json",
           	  	 header:{
           	  		 'content-type': 'text/json;charset=UTF-8',
					 'sessionId':uni.getStorageSync('sessionId')
           	  	 },
           	      success: (res) => {
           	  		console.log(res.data)
           	  		if(res.data.code == 200){
           			    uni.showToast({
           			    	title:'更换成功！',
           			    	icon: 'success',
           			    	duration: 1000
           			    });
						setTimeout(() => {
						   uni.navigateBack(-1)
						}, 1000)
           	  		}else{
           	  			uni.showToast({
           	  				title:res.data.message,
           	  				icon: 'none',
           	  				duration: 1500
           	  			});	 
           	  		}				
           	      },
           	  });
              }
           },
		}
	}
</script>

<style>
	.whole-page {
		background:none !important;
		padding: 40upx;
	}
	.phone-title {
		width: 100%;
		text-align: center;
		padding: 80upx 0;
	}
	.phone-text {
		width: 100%;
		padding-bottom: 20upx;
		color: #000000;
	}
	.phone-item {
		width: 100%;
		padding: 28upx 40upx;
		background: #F2F2F2;
		border-radius: 16upx;
		margin-bottom: 40upx;
	}
	.phone-item input {
		float: left;
	}
	.right-input {
	   float: right;
	   font-size: 26upx;
	   color: #000000;
	   margin-top: 6upx;
	}
	.popup-button {
		width: 100%;
		border-radius: 16upx;
	}
</style>
