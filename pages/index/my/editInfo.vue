<template>
	<view class="whole-page">
		  <view class="item-input">
			     <view class="left-item" style="padding-top:10upx;">
					  上级邀请人
				 </view>
				<view class="right-item colt" v-if="userInfo.isHaveParentId == 0"  @click="toggle('center')">
					     添加邀请人
				 		<image src="../../../static/images/you.png" class="yout"></image>		 
				 </view>
				<view class="right-item yjt" v-if="userInfo.isHaveParentId == 1">
				 	   <image :src="userInfo.parentAvatarUrl"></image> 
					    <text>{{userInfo.parentNickName}}</text>
				 </view>
		  </view>
		  <!-- @click="goportrait()" -->
		  <view class="item-input">
				 <view class="left-item">
					   昵称
				 </view>
				 <view class="right-item" @click="opennoprize">
						{{userInfo.nickName}}
					   <image src="../../../static/images/you.png" class="yout"></image>		 
				 </view>	  
		  </view>
		  <view class="item-input">
				 <view class="left-item" style="padding-top:26upx;">
					  头像
				 </view>
				 <view class="right-item" @click="openbuttpopu">
						<image :src="userInfo.avatarUrl" class="tx-img"></image> 
					   <image src="../../../static/images/you.png" class="yout" style="margin-top: 30upx;"></image>		 
				 </view>
		  </view>
		  <view class="item-input">
				 <view class="left-item">
					  手机号
				 </view>
				 <view class="right-item" @click="goeditPhone">
						{{secrecy_phone}}
					   <image src="../../../static/images/you.png" class="yout"></image>		 
				 </view>	  
		  </view>
		  <view class="item-input">
				 <view class="left-item">
					  性别
				 </view>
				 <view class="right-item">
					   <image src="../../../static/images/you.png" class="yout"></image>	
						<picker @change="bindPickerChange" :value="userInfo.gender" :range="gender_array">
							  <view class="uni-input">{{userInfo.gender_text}}</view>
						</picker>
					  	 
				 </view>	  
		  </view>
		<!--  <view class="item-input">
				 <view class="left-item">
					  地区
				 </view>
				 <view class="right-item">
						
					   <image src="../../../static/images/you.png" class="yout"></image>		 
				 </view>	  
		  </view>
		  <view class="item-input">
				 <view class="left-item">
					  学历
				 </view>
				 <view class="right-item">
						
					   <image src="../../../static/images/you.png" class="yout"></image>		 
				 </view>	  
		  </view> -->
		  <uni-popup ref="popup"  @change="change">
					<view class="popup-content" :class="{ 'popup-height': type === 'center'}">	
						  <view class="popup-title">绑定上级邀请人</view>  
						  <view class="popup-input">
							   <input placeholder="请输入邀请码"  v-model="lincode"
							   	  :adjust-position="false"/>
						  </view>
						  <view class="button-bottom">
							    <view class="item-button" @click="close">下次绑定</view>
								<view class="item-button cuont" @click="bindInvitationCode()">确认绑定</view>
						  </view>
					 </view>
		  </uni-popup>
		  <uni-popup ref="noprizepopu" type="center" @maskClick="closenoprize" mask-background-color="rgba(0,0,0,0.8)">
		  	     <view class="popup-content">
					  <view class="popup-title">修改昵称</view>
					  <view class="name-text">
						   当前昵称：{{userInfo.nickName}}
					  </view>
					  <view class="name-shuo">更换昵称后，下次请用新昵称登录。</view>
					  <view class="popup-input">
						   <input placeholder="新昵称(2-16位中英文、数字)"  v-model="namebunt"
							  :adjust-position="false"/>
					  </view>
					  <view class="button-bottom">
							<view class="item-button" @click="closenoprize">取消</view>
							<view class="item-button cuont" @click="bindnickName()">确定</view>
					  </view>
				 </view>
		  </uni-popup>
		   <uni-popup ref="buttpopu" type="bottom" @maskClick="closebuttpopu" mask-background-color="rgba(0,0,0,0.8)">
			      <view class="whole-but">
					    <view class="item-buts" @click="goPhoto">从我的艺术品中选择</view>
						<view class="item-buts padt" @click="goavatar">从相册上传</view>
						<view class="item-buts" style="color:#999999;" @click="closebuttpopu()">取消</view>
				  </view>
		   </uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  type: 'center',
			  lincode:"",
			  namebunt:"",
			  userInfo:"",
			  secrecy_phone:"",
			  gender_array:['保密','男生','女生'],
			  // img_url:'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/',
			  // http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api 测试 test
			}
		},
		onLoad() {
           
		},
		onShow(){
		  this.getuserInfo()
		},	
		methods: {
			closenoprize(){
				this.$refs.noprizepopu.close()
			},
			opennoprize(){
				this.$refs.noprizepopu.open("center")
			},
			closebuttpopu(){
				this.$refs.buttpopu.close()
			},
			openbuttpopu(){
				this.$refs.buttpopu.open("bottom")
			},
			goeditPhone(){
				uni.navigateTo({
					 url: 'editPhone?phone='+this.userInfo.phone
				});
			},
			goPhoto(){
			  uni.navigateTo({
			  	 url: 'Photo'
			  });	
			},
			goavatar(){
				
			   // uni.navigateTo({
			   // 	 url: 'Cropping'
			   // });
			   let taht = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
						let igmFile = res.tempFilePaths;
						uni.uploadFile({
							url:getApp().globalData.http_url+'mine/info/modify/avatar',
							method:"POST",
							header:{
							  'sessionId':uni.getStorageSync('sessionId')
							},	
							filePath:igmFile[0],
							name:'file',
							success: (res) =>{
								console.log(res)
								var data = JSON.parse(res.data)
								if(data.code == 200){
								  	console.log(data)
								    uni.showToast({
								    	title: '编辑成功！',
								    	icon: "success",
								    	duration: 1000
								    })	
								    this.closebuttpopu()
									this.getuserInfo()
								}else{
									 uni.showToast({
										title:data.msg,
										icon: 'none',
										duration: 1000
									 });			
								 }			
							},
							fail: (err) =>{
							  console.log(err);
							},
						})
					}
				});
			},
			bindnickName(){
			  let that = this
			  if(that.namebunt == ''){
				 uni.showToast({
					title:'请输入用户昵称',
					icon: 'none',
					duration: 1000
				 });	  
				 return
			  }
			  uni.request({
			  	 url: getApp().globalData.http_url+'mine/info/modify/nick?nickName='+ that.namebunt,
			  	 method:'PUT',
			  	 header:{
			  		'content-type': 'application/json;charset=UTF-8',
			  		'sessionId':  uni.getStorageSync('sessionId')
			  	 },	
			  	 success: (res) => {
			  		console.log(res,'修改昵称');
			  		uni.hideLoading()
			  		if(res.data.code == 200){
						uni.showToast({
							title:res.data.msg,
							icon: 'success',
							duration: 1500
						});
			  		    this.closenoprize()
						 this.getuserInfo()
			  		}else{
			  			 uni.showToast({
			  				title:res.data.msg,
			  				icon: 'none',
			  				duration: 1000
			  			 });			
			  		 }		 
			  	 }
			   });
			 },
			 bindPickerChange: function(e) {
				 var i = e.detail.value
				 let that = this
			     that.userInfo.gender_text = that.gender_array[i]
			     that.userInfo.gender = i
			     uni.request({
			         url: getApp().globalData.http_url + 'mine/index/updateUser', 
			     	   method:'GET',
			     	   header:{
			     		 'content-type': 'text/json;charset=UTF-8',
			     		 'sessionId':  uni.getStorageSync('sessionId')
			     	   },
					   data:{
						 gender:that.userInfo.gender
					   },
			         success: (res) => {
			     	   console.log(res,'修改资料');	
					   if(res.data.code == 200){   
							that.getuserInfo()
					   }else{
						 uni.showToast({
							title:res.data.message,
							icon: 'none',
							duration: 1000
						 });	 
					   }
			         }
			     });
			 },
			bindInvitationCode(){
			   let that = this
			   if(that.lincode == ''){
				   uni.showToast({
						title:'邀请码不能为空',
						icon: 'none',
						duration: 1000
				   });
				   return
			   }
			   uni.request({
			       url: getApp().globalData.http_url + 'mine/index/bindInvitationCode', 
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId':  uni.getStorageSync('sessionId')
			   	   },
				   data:{
					 invitationCode:that.lincode
				   },
			       success: (res) => {
			   		console.log(res,'绑定邀请人');	
					  if(res.data.code == 200){
						    uni.showToast({
						    	title:'绑定成功！',
						    	icon: 'success',
						    	duration: 1000
						    });
							that.close()
						    that.getuserInfo()
					  }else{
						 uni.showToast({
							title:res.data.message,
							icon: 'none',
							duration: 1000
						 });	 
					  }
			       }
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
						 if(res.data.data.gender == 0){
						    res.data.data.gender_text = '保密'
						 }else if(res.data.data.gender == 1){
							res.data.data.gender_text = '男生'
						 }else{
							res.data.data.gender_text = '女生'
						 }		
						   that.userInfo = res.data.data
						  that.secrecy_phone =  res.data.data.phone.substr(0,3) + '****' + res.data.data.phone.substr(7,4)
					  }else{
						 uni.showToast({
						 	title:'登录已失效，重新登录',
						 	icon: 'none',
						 	duration: 1000
						 });	 
					  }
			       }
			   });
			},
            toggle(type){
            	this.type = type
            	this.$refs.popup.open(type)
            },
            close(){
            	this.$refs.popup.close()
            },
            change(e) {
            	console.log('当前模式：' + e.type + ',状态：' + e.show);
            },
			goportrait(){
			  uni.navigateTo({
				 url: 'portrait'
			  });
			}
		}
	}
</script>

<style>
	.whole-page {
		padding: 20upx;
		
	}
	.item-input {
		width: 100%;
		background: rgba(255, 255, 255, 0.3);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
		border-radius: 16upx;
		padding: 32upx 40upx;
		margin-bottom: 16upx;
	}
	.left-item {
		float: left;
		color: #000000;
	}
	.right-item {
		float: right;
	}
	.right-item picker,.uni-input{
		float: right;
	}
	.yout {
		float: right;
		width: 14upx;
		height: 24upx;
		margin: 8upx 0 0 16upx;
	}
	.colt {
		color: #999999;
		padding-top: 10upx;
	}
	.yjt image{
		width: 56upx;
		height: 56upx;
		float: left;
		border-radius: 50%;
		margin-right: 14upx;
	}
	.yjt text {
		float: right;
		padding-top: 10upx;
	}
	.tx-img {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.popup-input {
		width: 90%;
		margin: 20upx auto 50upx auto;
	    padding: 30upx 40upx;
		background: #F0F0F0;
		border-radius: 8upx;
	}
	.popup-content {
		padding:0;
	}
	.button-bottom {
		width: 100%;
		margin-top: 20upx;
		border-top: 2upx solid #F2F2F2;
	}
	.item-button {
		float: left;
		width: 50%;
		padding: 34upx 0;
		font-weight: 400;
		font-size: 32upx;
		color: #C4C4C4;
		text-align: center;
	}
	.cuont {
		color: #000000;
		border-left: 2upx solid #F2F2F2;
	}
	.name-text {
		width: 100%;
		font-size: 28upx;
		padding: 0 40upx;
	}
	.name-shuo {
		width: 100%;
		padding-top: 4upx;
		color: #999999;
		font-size: 28upx;
		padding: 0 40upx;
	}
	.whole-but {
		width: 100%;
        background-color: #fff;
		border-radius: 40upx 40upx 0px 0px;
		padding-bottom: 44upx;
	}
	.item-buts {
		width: 100%;
		text-align: center;
		padding: 40upx 0;
	}
	.padt {
		border-top: 1upx solid #F2F2F2;
		border-bottom: 10upx solid #F2F2F2;
	}
</style>
