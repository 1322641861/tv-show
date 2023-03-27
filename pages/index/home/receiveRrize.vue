<template>
	<view class="whole-page">
		  <view class="receive-imge" v-if="rectdata.prizeType == 7">
			    <image src="../../../static/images/cj4.png" style="width:100%;" mode="widthFix"></image>
		  </view>
		  <view class="receive-imge" style="width:300upx;" v-if="rectdata.prizeType != 7">
		  		<image :src="rectdata.prizeImg" style="width:100%;" mode="widthFix"></image>
		  </view>	  
		  <view class="receive-title">{{rectdata.prizeName}}</view>
		  <view v-if="rectdata.prizeType == 7">
			    <view class="rize-title">选择收款银行卡</view>
			    <view class="rize-text">
					选择后不可更改，如因银行卡错误导致打款失败，平台不负任何责任，有问题请联系客服
			    </view>
			    <view class="whole-card">
					<view class="card-list" v-for="(item,index) in banklist" :key="index" @click="goxunz(index)">
						  <view class="card-img">
								<image :src="item.bankPic"></image>
						  </view>
						  <view class="card-name">{{item.bankName}}{{item.cardCategory}}({{item.cardnum}})</view>	
						  <view class="card-dui" v-if="bankData.bankName == item.bankName">
								<image src="../../../static/images/dg.png" style="width:30upx;height:20upx;"></image>
						  </view>
					</view>
					<view class="card-bottom" @click="gomycard">
						 <view class="img-tj">
							   <image src="../../../static/images/jia.png"></image>
						 </view>
						 添加银行卡
					</view>
			   </view>	   
		  </view>
		  <view v-if="rectdata.prizeType == 6">
			  <view class="rize-title">填写收货信息</view>
			  <view class="rize-text">
					 收货信息填写后不可更改，如因地址错误导致发货收货失败，平台不负任何责任，有问题请联系客服。
			  </view>
			  <view class="input-item" style="margin-top:60upx;">
					<view class="input-left">姓名</view>
					<view class="input-right">
						  <input placeholder="请输入姓名" type="text" v-model="name"
								:adjust-position="false"/>
					</view>
			  </view>
			  <view class="input-item">
					<view class="input-left">手机号</view>
					<view class="input-right">
						  <input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone"
								:adjust-position="false"/>
					</view>
			  </view>
			  <view class="input-item">
					<view class="input-left">收货地址</view>
					<view class="input-right">
						  <input placeholder="请输入收货地址" type="text"  v-model="address"
								:adjust-position="false"/>
					</view>
			  </view>
		  </view>
		  <view v-if="rectdata.prizeType == 5">
			   <view class="rize-title">填写领取手机号</view>
			   <view class="rize-text">
					请确保您填写的手机号已经注册了爱奇艺平台，未注册爱奇艺平台的手机号将无法进行充值，如因您填写信息错误导致无法充值，平台不负任何责任，有其他疑问，请联系客服。
			   </view>
			   <view class="input-item">
					<view class="input-left">手机号</view>
					<view class="input-right">
						  <input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone"
								:adjust-position="false"/>
					</view>
			   </view>
		  </view>
		  <view class="receive-button" @click="gogain()">确认领取</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  name:"",
			  phone:"",
			  address:"",
			  rectdata:"",
			  banklist:[],
			  bankData:"",
			  lucktype:1
			}
		},
		onLoad(e) {
			console.log(JSON.parse(e.data),e.type)
			this.lucktype = e.type
			// 奖品类型：1-蜜糖 2-优先抢购卡 3-盲盒 4-藏品 5-第三方平台会员 6-实物 7-红包
			this.rectdata = JSON.parse(e.data)
			if(this.rectdata.prizeType == 7){
				 this.getbanklist()
			}
		},
		methods: {
			gogain(){
			   let that = this
			   if(that.lucktype == 2){
				   that.getaccept()
				   return
			   }
			   uni.request({
			   	 url: getApp().globalData.http_url+'score/draw/getPrize',
			   	 method:'POST',
			   	 header:{
			   		'content-type': 'application/x-www-form-urlencoded',
			   		'sessionId':  uni.getStorageSync('sessionId')
			   	 },	
			   	 data:{
					prizeId:that.rectdata.prizeId ? that.rectdata.prizeId: that.rectdata.id,
			   		address:that.address,
			   		name:that.name,
			   		phone:that.phone,		   
			   		cardId: that.rectdata.prizeType == 7 ? that.bankData.id : ''					
			   	 },
			   	 success: (res) => {
			   		console.log(res,'领取');
			   		uni.hideLoading()
			   		if(res.data.code == 200){
						uni.showToast({
							title:res.data.msg,
							icon: 'success',
							duration: 1500
						});
			   		     setTimeout(() => {
			   		        uni.navigateBack({
			   		        		delta:2,//返回层数，2则上上页
			   		        	})
			   		     }, 1000)
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
			getaccept(){
			  let that = this  
			  var id = that.rectdata.rewardId ? that.rectdata.rewardId : that.rectdata.id
			  uni.request({ 
			  	 url: getApp().globalData.http_url+'lottery/reward/accept/' + id,
			  	 method:'PUT',
			  	 header:{
			  		'content-type': 'application/json;charset=UTF-8',
			  		'sessionId':  uni.getStorageSync('sessionId')
			  	 },	
			  	 data:{
			  	    rewardId:id, 
			  		address:that.address,
			  		receiver:that.name,
			  		mobile:that.phone,		   					
			  	 },
			  	 success: (res) => {
			  		console.log(res,'领取');
			  		uni.hideLoading()
			  		if(res.data.code == 200){
						uni.showToast({
							title:res.data.msg,
							icon: 'success',
							duration: 1500
						});
			  		     setTimeout(() => {
			  		        uni.navigateBack({
			  		        		delta:1,//返回层数，2则上上页
			  		        	})
			  		     }, 1000)
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
			goxunz(e){
				this.bankData = this.banklist[e]
				console.log(this.bankData)
		   },
		   gomycard(){
			 uni.navigateTo({
			 	 url: '../my/MyCard' 
			 });  
		   },
           getbanklist(){
             let that = this
             uni.request({
             	 url: getApp().globalData.http_url + 'mine/bank/list', 
             	 method:'GET',
             	 header:{
             		 'content-type': 'text/json;charset=UTF-8',
             		  'sessionId':  uni.getStorageSync('sessionId')
             	 },
          	 data:{
          		type:2 
          	 },
			 success: (res) => {
				console.log(res.data,'银行卡列表')
				if(res.data.code == 200){
				for(var i in res.data.data){
					res.data.data[i].cardnum = res.data.data[i].cardNo.substr(12,4)
				}
					 that.banklist = res.data.data
				 if(res.data.data!=''){
					 that.bankData = res.data.data[0]
				 } 
				}				
			 },
            });	
          },
		}
	}
</script>

<style>
	page{
		background-color: #fff;	
	}
	image{
		width:100%;
		height:100%;
	}
	.whole-page {
		padding: 32upx;
	}
	.receive-imge {
		width: 249upx;
		margin: 120upx auto 40upx auto;
	}
	.receive-title {
		width: 100%;
		font-size: 40upx;
		color: #F54D42;
       text-align: center;
	   margin-bottom: 120upx;
	}
	.rize-title {
		width: 100%;
		font-weight: 500;
		font-size: 32upx;		
		color: #222222;
		padding: 16upx 0;
	}
	.rize-text {
		width: 100%;
		font-size: 24upx;	
		color: #999999;
	}
	.receive-button {
		width: 100%;
		height: 96upx;
		text-align: center;
		line-height: 96upx;
		background: #222222;
		border-radius: 8upx;
		font-size: 32upx;
		color: #FFFFFF;
		margin: 80upx auto;
	}
	.input-item {
		width: 100%;
	}
	.input-left {
		float: left;
		font-size: 28upx;		
		color: #222222;
		padding: 32upx 0;
	}
	.input-right {
		float: right;
		width: 500upx;
		padding: 32upx 10upx;
		border-bottom: 1upx solid #F0F0F0;
	}
    .input-right input{
		width: 100%;
		font-size: 28upx;
	}
	.whole-card {
		width: 100%;
		max-height: 400upx;
		padding:60upx 0;
	}
	.card-list {
		width: 100%;
		margin-bottom: 20upx;
	}
	.card-img {
		float: left;
		width: 42upx;
		height: 42upx;
	}
	.card-name {
		float: left;
		margin-left: 14upx;
	}
	.card-dui {
		float: right;	
	}
	.card-img image{
		width: 100%;
		height: 100%;
	}
	.card-bottom {
		color: #222222;
		float: left;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color:  rgba(34, 34, 34, 0.05);
		margin-bottom: 20upx;
	}
	.img-tj {
		float: left;
		width: 24upx;
		height: 28upx;
		margin-right: 14upx;
	}
	.img-tj image {
		width: 100%;
		height: 100%;
	}
</style>