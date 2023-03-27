<template>
	<view class="whole-page">
		 <view style="margin-top: 40upx;" v-if="userInfo.isHaveDDCAddress == 1">
			  <view class="chain-title">
					链账户名称
			  </view>
			  <view class="chain-back">
				   <view class="chain-like">{{userInfo.ddcAddressName}}</view>
			  </view>
			  <view class="chain-title">
				   <image src="../../../static/images/qkl.png"></image>BSN联盟链
			  </view>
			  <view class="chain-back">
					<view class="chain-like">{{userInfo.ddcAddress}}</view><image src="../../../static/images/fz.png" @click="copylike"></image>
			  </view>
		  </view>
		  <uni-popup ref="popup_account"  @change="change">
		  				<view class="popup-content" style="padding:0;" :class="{ 'popup-height': account_type === 'center'}">	
		  					  <view class="popup-title">创建区块链账户</view>  
		  					  <view class="popup-input">
		  						   <input placeholder="请输入区块链名称,且不可修改"  v-model="clientName"
		  							      maxlength="12"  :adjust-position="false"/>
		  					  </view>
		  					  <view class="button-bottom">
		  							<view class="item-button" @click="close()">稍后再看</view>
		  							<view class="item-button cuont" @click="bindcreateDDCAddress()">立即创建</view>
		  					  </view>
		  				 </view>
		  </uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:"",
				sessionId:"",
				userId:"",
				clientName:"",
				account_type:'center',
			//	http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api // 测试 test
			}
		},
		onLoad(e) {
			if(e.sessionId){
				this.sessionId = e.sessionId
			
			}
			if(e.userId){	
				this.userId = e.userId	
			}
	       this.getuserInfo()  
		},
		methods: {
			account_toggle(type){
				uni.setStorageSync('is_Have', 1);
				this.account_type = type
				this.$refs.popup_account.open(type)
			},
			close(){
				this.$refs.popup_account.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			copylike(){
				let that = this
				uni.setClipboardData({ 
					data:that.userInfo.ddcAddress,
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
		    getuserInfo(){
		     let that = this
		     uni.request({
		          url: getApp().globalData.http_url + 'mine/index/list/' +  that.userId, 
		     	 method:'GET',
		     	 header:{
		     		 'content-type': 'text/json;charset=UTF-8',
		     		 'sessionId': that.sessionId
		     	 },
		       success: (res) => {
		     		console.log(res.data.data,'用户信息');	
		  		  if(res.data.code == 200){
		  			 that.userInfo = res.data.data
					 if(res.data.data.isHaveDDCAddress !=1){
						  that.account_toggle('center')
					 }
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
		  bindcreateDDCAddress(){
		  	let that = this
		  	uni.showLoading({
		  		title: '加载中',
		  		mask:true
		  	});
		  	if(that.clientName == ''){
		  		uni.showToast({
		  			title:'请输入地址',
		  			icon: 'none',
		  			duration: 1000
		  		});
		  		return
		  	}
		  	uni.request({
		  	    url: getApp().globalData.http_url + 'bsn/ddc/createDDCAddress', 
		  		   method:'GET',
		  		   header:{
		  			 'content-type': 'text/json;charset=UTF-8',
		  			 'sessionId': that.sessionId
		  		   },
		  		   data:{
		  			    clientName:that.clientName
		  		   },
		  	    success: (res) => {
		  		   console.log(res,'用户创建ddc地址');	
		  		   	uni.hideLoading()
		  		   if(res.data.code == 200){   
		  				uni.showToast({
		  					title:'创建成功',
		  					icon: 'none',
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
		}
	}
</script>

<style>
	page{
		background-color: #f2f2f2;
	}
	.whole-page {
		padding: 40upx 20upx;
	}
	.acount-top {
		width: 100%;
		padding: 80upx 0;
		text-align: center;
	}
	.acount-title {
		font-size: 36upx;
		padding-bottom: 20upx;
	}
	.acount-text {
		font-size: 32upx;
		color: #666666;
	}
	.chain-title {
		width: 100%;
		display: flex;
		font-size: 32upx;
		color: #000000;
		margin-top: 60upx;
	}
	.chain-title image{
		width: 54upx;
		height: 32upx;
		float: left;
		padding: 6upx 10upx 0 0;
	}
	.chain-back {
		width: 100%;
		background: rgba(255, 255, 255, 0.3);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
		border-radius: 16upx;
		padding: 32upx 24upx;
		margin-top: 26upx;
	}
	.chain-like{
		float: left;
		width: 90%;
		font-size: 30upx;
		color: #000000;
		display: inline-block;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.chain-back image{
		float: right;
		width: 32upx;
		height: 32upx;
		margin-top: 4upx;
	}
	.popup-input {
		width: 90%;
		margin: 20upx auto 50upx auto;
	    padding: 30upx 40upx;
		background: #F0F0F0;
		border-radius: 8upx;
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
	.dius {
		border-radius:16upx;
	}
</style>
