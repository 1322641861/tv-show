<template>
	<view class="whole-page">
	      <view class="Recharge-top">
			     <view class="Recharge-title">请输入充值蜜糖数量</view>
				 <view class="number-whole">
					   <view class="number-item" v-for="(item,index) in optionlist"
					         :key="index" @click="gonumber(index,item)">
						     <view class="number-num" 
							      :class="num_index == index ? 'runs':''">{{item}}</view>
					   </view>
				 </view>
		  </view>
		  <view class="whole-padd">
		  		<view class="number-input">
		  			 <input placeholder="自定义输入数量" type="number" v-model="palacnum"
		  			 		@input="goholder" :adjust-position="false"/>		  
		  		</view>	  
				<view class="number-text">需要支付：{{Renum}}元</view>
				<view class="PayType-title">支付方式</view>
				<view class="PayType-item">
				<!-- 	   <view class="PayType-item">
						   <view class="PayType-img">
								 <image src="../../../static/images/wx.png"></image>
						   </view>
						   <view class="PayType-text">微信支付</view>
						   <view class="PayType-dunt"  @click="gochoice(1,'wx')"
								 :class="payType == 1 ? 'none':''">
								 <image src="../../../static/images/xz2.png" v-if="payType == 1"></image>
						   </view>
					  </view> -->
					  <view class="PayType-item">
						   <view class="PayType-img">
								 <image src="../../../static/images/ll.png"></image>
						   </view>
						   <view class="PayType-text">连连（银行卡支付）</view>
					   </view>
					   <view class="card-whole">
						     <view class="card-list" v-for="(item,index) in banklist" :key="index" @click="goxunz(index)">
						     	  <view class="card-img">
						     		    <image :src="item.bankPic"></image>
						     	  </view>
						     	  <view class="card-name">{{item.bankName}}{{item.cardCategory}}({{item.cardnum}})</view>
								  <view class="PayType-dunt"  @click="gochoice(4,index)"
										 :class="bankData.bankName == item.bankName ? 'none':''">
										 <image src="../../../static/images/xz2.png" 
										        v-if="bankData.bankName == item.bankName && payType == 4"></image>
								  </view>	  
						     </view>
							 <view class="card-bottom" @click="gomycard">
							 	 <view class="img-tj">
							 		   <image src="../../../static/images/tj3.png"></image>
							 	 </view>
							 	 添加银行卡
							 </view>
					   </view>	   
				</view> 
		  </view>
		  <view class="Recharge-whole">
			   <view class="Recharge-button" @click="goRecharge">充值</view>
			   <view class="Recharge-text"> 
				    <view class="PayType-dunt" :class="ifdunt ? 'none':''"
					     style="float:left;margin:4upx 10upx 0 10upx;width:30upx;height:30upx;" @click="goifdunt">
				    	 <image src="../../../static/images/xz2.png" v-if="ifdunt"></image>
				    </view>
				    已阅读并同意 <text @click="goRechargetext()">《充值协议》</text> 
			   </view>  
		  </view>
		 <uni-popup ref="popup_yanz"  @change="change">
			 <view class="popup-content" :class="{ 'popup-height': yanz_type === 'center'}">	
				   <view class="popup-title" style="padding-top:20upx;">确认支付</view>
				   <view class="yanz-text">短信验证码已发送预留手机号({{phone_new}})请将6位数字验证码填写到下方</view>
				   <view class="yanz-shur">
						 <input :class="Verif.length == 6 ? 'windt':''" 
							   type="number" maxlength="6" v-model="Verif" focus 
								@input="goinput" :adjust-position="false"/>
				   </view>
				   <view class="yanz-whole">
						 <view class="yanz-item"></view>
						 <view class="yanz-item"></view>
						 <view class="yanz-item"></view>
						 <view class="yanz-item"></view>
						 <view class="yanz-item"></view>
						 <view class="yanz-item"></view>
				   </view>
				    <view class="yanz-coed" @click="Verifications">{{text}}</view>
			 </view>
		 </uni-popup>
	</view>
</template>

<script>
	var times = 60;
	export default {
		data() {
			return {
				num:"",
				Verif:"",
				payType:4,
				num_index:0,
				banklist:[],
				optionlist:[],
				bankData:"",
				phone_new:"",
				phone:"",
				Renum:"",
				palacnum:"",
				orderId:"",
				ifdunt:false,
				text:'重新发送验证码',
				yanz_type:'center'
			}
		},
		onShow(){
		   this.getuserInfo()
		   this.getbanklist()
		   this.getoption()
		},
		methods: {
			goholder(e){
			  console.log(e)
			  this.Renum = this.palacnum
			},
			goRechargetext(){
				uni.navigateTo({
					url:'Rechargetext'
				})
			},
			goRecharge(){
				let that = this
				if(!that.ifdunt){
				   uni.showToast({
				   	title:'请购买并同意协议',
				   	icon: 'none',
				   	duration: 1500
				   });		
				   return
				}
				//1-微信 2-支付宝 3-杉德 4-连连 5-京东
				if(that.payType == 4){
					if(that.bankData == ''){
						uni.showToast({
						  title: '请先添加绑定银行卡！',
						  icon: "none",
						  duration: 2000
					   })
					   return
					}
				   uni.showLoading({
						title: '支付中',
						mask:true
				   });
				   uni.request({
				         url: getApp().globalData.http_url + 'mine/honey/order',
						 header:{
							 'content-type': 'application/json',
							 'sessionId':  uni.getStorageSync('sessionId')
						 },
						 method:'POST',
						 data:{
						   clientType:1,
						   num:that.Renum,
						   payType:that.payType,
						   bankId:that.bankData.id,
						 },
						 success: (res) => {   			
							console.log(res.data);
							uni.hideLoading()
							if(res.data.code == 200){		
								uni.showToast({
									title: '验证码已发送！',
									icon: "success",
									duration: 1000
								})	
								that.orderId = res.data.data.orderId
								that.setHtml()
								that.goyanz('center')						
							}else{
								uni.showToast({
									title:res.data.msg,
									icon: 'none',
									duration: 1500
								});	 
							} 
						}
				  });
				  return
				}		
			},
			goinput(e){
				if(e.detail.value.length == 6){
					 this.goconfirm()
				}
			},
			goconfirm(){
			   let that = this
			   if(that.Verif.length != 6){
				   uni.showToast({
						title:'请输入正确的验证码',
						icon: 'none',
						duration: 1500
				   });
				   return
			   }
			   uni.showLoading({
					title: '支付中',
					mask:true
			    });
			    uni.request({
			    	 url: getApp().globalData.http_url + '/mine/honey/jdConfirmPay', 
			    	 method:'GET',
			    	 header:{
			    		 'content-type': 'text/json;charset=UTF-8',
			    		  'sessionId':  uni.getStorageSync('sessionId')
			    	 },
					data:{
						orderId:that.orderId,
						code:that.Verif,
						type:2
					},
			    	success: (res) => {
			    		console.log(res.data,'银行卡支付')
			    		uni.hideLoading()
						that.Verif = ''
			    		if(res.data.code == 200){		
			    			uni.showToast({
			    				title: '充值成功！',
			    				icon: "success",
			    				duration: 1500
			    			})		
			    			that.getuserInfo()	
							that.close_yanz()
							
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
			goifdunt(){
			   this.ifdunt = !this.ifdunt
			},
			goyanz(type){
				this.yanz_type = type
				this.$refs.popup_yanz.open(type)
			},
			close_yanz(){
				this.$refs.popup_yanz.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			gomycard(){
				uni.navigateTo({
					 url: '../my/MyCard'
				});
			},
			gochoice(e,i){
				console.log(e,i)
				this.payType = e
				if(i != 'wx'){
					this.bankData = this.banklist[i]
				}
			},
			gonumber(e,num){
			   this.num_index = e
			   this.Renum = num
			},
			getoption(){
			  let that = this
			   uni.request({
			   	 url: getApp().globalData.http_url + 'mine/honey/option', 
			   	 method:'GET',
			   	 header:{
			   	    'content-type': 'text/json;charset=UTF-8',
			   		'sessionId':  uni.getStorageSync('sessionId')
			   	 },
			   	success: (res) => {
			   		console.log(res.data,'充值数量')
			   		if(res.data.code == 200){ 
					    var dar = res.data.data.substr(1)
						    dar = dar.substr(0,dar.length - 1)
			  	           that.optionlist = dar.split(",")
						   that.Renum = that.optionlist[0]
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
						that.phone_new = res.data.data.phone.substr(0,3) + '****' + res.data.data.phone.substr(7,4) 				
					  }
			       }
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
			gopaySendCode(){
			   let that = this
			   uni.showLoading({
					title: '发送中',
					mask:true
			    });
			    uni.request({
			    	 url: getApp().globalData.http_url + 'mine/honey/paySendCode', 
			    	 method:'GET',
			    	 header:{
			    		 'content-type': 'text/json;charset=UTF-8',
			    		  'sessionId':  uni.getStorageSync('sessionId')
			    	 },
					data:{
						orderId:that.orderId,
						clientType:1,
						bankId:that.bankData.id,   
						type:2
					},
			    	success: (res) => {
			    		console.log(res.data,'重新发送')
			    		uni.hideLoading()
			    		if(res.data.code == 200){		
			    			uni.showToast({
			    				title: '验证码已发送！',
			    				icon: "success",
			    				duration: 1000
			    			})							
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
			Verifications(){
			   let that = this
			    if(times!=60){
			    }else{
					 that.setHtml()
					 that.gopaySendCode() 
			    }
			},
			setHtml(){
				let that = this
			   -- times;
			   if(times!=0){
				   that.text = '重新发送验证码'+'('+ times + 's' + ')'
				   setTimeout(function () {
					 that.setHtml()
				   }, 1000)
			   }else{
				 that.text = '重新发送验证码'
				 times = 60
			   }
			 },
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.Recharge-top {
		width: 100%;
		margin-top: 80upx;
	}
	.Recharge-title {
		width: 100%;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
		padding: 20upx 40upx;
	}
	.number-whole {
       width: 100%; 
		padding: 20upx 30upx;
	}
	.number-item {
		width: 33.333333333333333333333%;
		float: left;
		padding: 10upx;
	}
	.number-num {
		width: 100%;
		background: rgba(34, 34, 34, 0.05);
		box-shadow: 0px 8upx 8upx rgba(255, 255, 255, 0.5);
		border-radius: 8upx;
		height: 136upx;
		text-align: center;
		line-height: 136upx;
		font-weight: 500;
		font-size: 40upx;
		color: #222222;
	}
	.runs {
		border: 1upx solid #222222;
		filter: drop-shadow(0px 4px 4px rgba(255, 255, 255, 0.5));
        background: #fff;
	}
	.whole-padd {
		width: 100%;
		padding: 10upx 40upx 0 40upx;
		border-bottom: 1upx solid #F0F0F0;
	}
	.number-input {
		width: 100%;
		padding: 30upx 0;
		border-bottom: 1upx solid #F0F0F0;
	}
	.number-input input{
		width: 100%;
		font-size: 32upx;
		color: #222222;
	}
	.number-text {
		width: 100%;
		font-size: 32upx;
		color: #222222;
		padding: 32upx 0;
	}
	.PayType-title {
		width: 100%;
		padding-top:40upx;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
	}
	.PayType-item {
		width: 100%;
		padding: 16upx 0;
		margin-bottom: 20upx;
	}
	.PayType-img {
		width: 48upx;
		height: 44upx;
		float: left;
	}
	.PayType-text {
		float: left;
		margin-left: 20upx;
		font-size: 32upx;
		color: #000000;
	}
	.PayType-dunt {
		float: right;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		border: 1upx solid #999999;
	}
	.none {
		border: none;
	}
	.card-whole {
		width: 100%;
	   padding-left: 80upx;
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
		font-size: 28upx;
		color: rgba(34, 34, 34, 0.8);
		margin-left: 14upx;
	}
	.card-bottom {
		width: 100%;
		color: #222222;
		margin-bottom: 20upx;
	}
	.img-tj {
		float: left;
		width: 40upx;
		height: 40upx;
		margin-right: 14upx;
	}
	.Recharge-whole {
		width: 100%;
		padding: 32upx 40upx;
	}
	.Recharge-button {
		width:100%;
		height: 96upx;
		background: #222222;
		border-radius: 8upx;
		line-height: 96upx;
		font-weight: 500;
		font-size: 36upx;
		color: #FFFFFF;
		text-align: center;
	}
	.Recharge-text {
		width: 100%;
		padding: 20upx 0;
		font-size: 24upx;
		color: rgba(34, 34, 34, 0.56);
	}
	.Recharge-text text{
		font-size: 24upx;
		color: #222222;
	}
	.yanz-text {
		width: 100%;
		font-size: 26upx;
		color: #222222;
		opacity: 0.4;
		padding-bottom:20upx;
	}
	.yanz-shur {
		width: 100%;
	}
	.yanz-shur input {
		display: inline-block;
		padding-left: 34upx;
		font-weight: 500;
		font-size: 48upx;
		width: 90%;
		color: #222222;
		letter-spacing:66upx;
	}
	.windt {
		width: 70%;
		padding-left:0;
		float: left;
	}
	.yanz-whole {
		width: 100%;
		display: flex;
	}
	.yanz-item {
		flex: 1;
		margin: 0 12upx;
		border-bottom: 1upx solid rgba(34, 34, 34, 0.12);
	}
	.yanz-item input {
		font-weight: 500;
		font-size: 48upx;
		width: 100%;
		color: #222222;
		text-align: center;
	}
	.yanz-coed {
		width: 100%;
		font-size: 26upx;	
		color: #222222;
		opacity: 0.28;
		text-align: center;
		margin: 40upx 0;
	}
</style>