<template>
	<view class="whole-page">
		  <view v-if="orderdata.goodsType == 6">
			  <view class="order-title">收货信息</view>
			  <view class="order-item">
					<view class="order-text">姓名</view>
					<view class="order-input">
						  <input placeholder="请填写收货人姓名" type="text" v-model="name"/> 
					</view>
			  </view>
			  <view class="order-item">
					<view class="order-text">手机号</view>
					<view class="order-input">
						  <input placeholder="请输入收货人手机号" type="number" maxlength="11" v-model="phone"/> 
					</view>
			  </view>
			  <view class="order-item">
					<view class="order-text">收货地址</view>
					<view class="order-input">
						  <input placeholder="请填写收货地址，省/市/区/县等" type="text"  v-model="address"/> 
					</view>
			  </view>
	<!-- 		  <view class="order-item">
					<view class="order-text">详细地址</view>
					<view class="order-input">
						  <input placeholder="请填写街道/楼牌号等" type="text"  v-model="edaddress"/> 
					</view>
			  </view> -->
			  <view class="order-item">
					<view class="order-text">备注</view>
					<view class="order-input">
						  <textarea  placeholder="请输入备注内容" v-model="remarks" />
					</view>
			  </view>
		  </view>
		  <view v-if="orderdata.goodsType == 5">
			   <view class="order-title">{{orderdata.goodsInfo}}</view>
			   <view class="order-item">
					<view class="order-text">手机号</view>
					<view class="order-input">
						  <input placeholder="请输入充值手机号" type="number" maxlength="11" v-model="phone"/> 
					</view>
			   </view>
			   <view class="order-item">
					<view class="order-text">备注</view>
					<view class="order-input">
						  <textarea  placeholder="请输入备注内容" v-model="remarks" />
					</view>
			   </view>
		  </view>
		  <view class="order-title">礼品信息</view>
		  <view class="good-whole">
			    <view class="good-img">
					  <image :src="orderdata.goodsPic"></image>
				</view>
				<view class="good-conet">
					  <view class="good-title">{{orderdata.name}}</view>
					  <view class="good-buttom">
						   <view class="good-num">兑换数量</view>
						   <view class="order-right">
								 <view class="num-item" @click="goplus()">
									   <image src="../../../static/images/jia.png"></image>
								 </view>
								 <view class="num-item" style="min-width:56upx;">{{purch}}</view>
								 <view class="num-item" @click="goreduce()">
									   <image src="../../../static/images/jian.png"></image>
								 </view>
						   </view>
					  </view>
				</view>
		  </view>
		  <view class="gral-buttom">
			    <view class="gral-coent">
					   <view class="gral-text">合计：</view>
					   <view class="gral-lnt">
							 <text>{{totalscore}}</text>积分
					   </view>
						<view class="gral-price" v-if="orderdata.prices != 0">
							  <text>+{{totalprices}}</text>元
						</view>	
						<view class="gral-price" v-if="orderdata.honeyPrices != 0">
							  <text>+{{totalhoney}}</text>蜜糖
						</view>
			    </view>
		  	    <view class="gral-button" @click="goexchange()">立即兑换</view>	
		  </view>
		  <uni-popup ref="popup"  @change="change">
				<view class="PayType-content" :class="{ 'popup-height': Pay_type === 'bottom'}">	
					  <view class="PayType-title">确认订单</view>
					  <view class="PayType-prices">{{totalprices}}元</view>
					  <view class="order-item">
					  	   <view class="order-left">支付方式</view>			 						   
					  </view>
					  <view class="PayType-item">
							 <view class="PayType-img">
								 <image src="../../../static/images/ll.png"></image>
							 </view>
							 <view class="PayType-text">连连（银行卡支付）</view>
							 <view class="PayType-dunt"  @click="gochoice(4)"
								 :class="payType == 4 ? 'none':''">
								 <image src="../../../static/images/xz2.png" v-if="payType == 4"></image>
							 </view>
					    </view> 
					    <view class="card-text" v-if="bankData ==''">
							   <view class="card-left" @click="gomycard()">
									<image src="../../../static/images/tj2.png"></image>
									 添加银行卡
							   </view>
					    </view>
					    <view class="card-text" v-if="bankData!=''">
							   <view class="card-left">
									 {{bankData.bankName}}{{bankData.cardCategory}}({{bankData.cardnum}})
							   </view>
							  <text @click="goxuans('center')">更换</text>
					    </view>
					   <view class="PayType-whole">
					         <view class="PayType-button" @click="gopurchase()">确认支付</view>
					     </view>
				</view>
		 </uni-popup>
		 <uni-popup ref="popup_card"  @change="change">
				<view class="popup-content" :class="{ 'popup-height': card_type === 'center'}">	
					  <view class="popup-title" style="padding-top:20upx;">选择银行卡</view>  
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
									   <image src="../../../static/images/tj3.png"></image>
								 </view>
								 添加银行卡
								 <image src="../../../static/images/you.png" style="float:right;width:16upx;height:24upx;margin-top:10upx;"></image>
							</view>
					  </view>
			 </view>
		 </uni-popup>
		 <uni-popup ref="popup_yanz"  @change="change">
				 <view class="popup-content" :class="{ 'popup-height': yanz_type === 'center'}">	
					   <view class="popup-title" style="padding-top:20upx;">确认支付</view>
					   <view class="yanz-text">短信验证码已发送预留手机号({{phone_new}})请将6位数字验证码填写到下方</view>
					   <view class="yanz-shur">
							 <input  type="number" maxlength="6" v-model="Verif" focus
									 @confirm="goconfirm" @input="goinput" :adjust-position="false"/>
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
				name:"",
				phone:"",
				address:"",
				purch:1,
				orderId:"",
				orderdata:"",
				totalscore:"",
				totalprices:"",
				totalhoney:"",
				remarks:"",
				Pay_type:"bottom",
				card_type:"center",
				yanz_type:"center",
				payType:4,
				bankData:"",
				banklist:[],
				phone_new:"",
				Verif:"",
				text:'重新发送验证码',
			}
		},
		onLoad(e) {
			this.orderdata = JSON.parse(e.data)
			console.log(this.orderdata)
			this.totalscore = this.orderdata.score*this.purch
			this.totalprices = this.orderdata.prices*this.purch
			this.totalhoney = this.orderdata.honeyPrices*this.purch
	 	    this.getbanklist()	
			this.getuserInfo()
		},
		methods: {
			goinput(e){
				console.log(e)
				if(e.detail.value.length == 6){
					this.goconfirm()
				}
			},
			goconfirm(e){
				console.log(e)
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
			    	 url: getApp().globalData.http_url + 'goods/pay/jdConfirmPay', 
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
			    				title: '支付成功！',
			    				icon: "success",
			    				duration: 1500
			    			})		
                            setTimeout(() => {
								uni.navigateBack({
									delta:2,//返回层数，2则上上页
								})
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
			gopurchase(){
			   let that = this
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
			    	 url: getApp().globalData.http_url + 'score/goods/pay', 
			    	 method:'GET',
			    	 header:{
			    		 'content-type': 'text/json;charset=UTF-8',
			    		  'sessionId':  uni.getStorageSync('sessionId')
			    	 },
					 data:{
						clientType:1,
						orderId:that.orderId,
						payType:4,
						bankId:that.bankData.id
					 },
			    	 success: (res) => {
			    		console.log(res.data,'支付订单')
			    		if(res.data.code == 200){
			   				uni.showToast({
			   					title: '验证码已发送！',
			   					icon: "success",
			   					duration: 1000
			   				})	
			   				that.setHtml()
			   				that.goyanz('center')	
			    		}else{
						   uni.showToast({
								title:res.data.msg,
								icon: 'none',
								duration: 1000
						   });	
						}				
			    	 },
			   });
			},
			goexchange(){
			   let that = this
			   uni.showLoading({
					title:'兑换中',
					mask:true
			   });
			   uni.request({
			   	 url: getApp().globalData.http_url+'score/goods/check',
			   	 method:'POST',
			   	 header:{
			   		'content-type': 'application/x-www-form-urlencoded',
			   		'sessionId':  uni.getStorageSync('sessionId')
			   	 },	
			   	 data:{
			   		exchangeNum:that.purch,
					goodsId:that.orderdata.goodsId,
					address:that.address,
					takeName:that.name,
					mobile:that.phone,
					remarks:that.remarks
			   	 },
			   	 success: (res) => {
			   		console.log(res,'兑换');
			   		uni.hideLoading()
			   		if(res.data.code == 200){
						if(res.data.data.orderId != 0){
							 that.orderId = res.data.data.orderId
						     that.getPay_type('bottom')
						}else{
							uni.showToast({
								title:'兑换成功',
								icon: 'success',
								duration: 1500
							});
							 setTimeout(() => {
								uni.navigateBack({
									delta:2,//返回层数，2则上上页
								})
							 }, 1000)
						}
						// var data = JSON.stringify(res.data.data)					
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
				this.close_card()
			},
			getPay_type(type){
			   this.Pay_type = type
			   this.$refs.popup.open(type)
			},
			close_Pay(){
				this.$refs.popup.close()
			},
			goxuans(type){
				this.card_type = type
				this.$refs.popup_card.open(type)
			},
			close_card(){
				this.$refs.popup_card.close()
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
			goreduce(){
			   if(this.purch == 1){
				   return
			   }else{
				   this.purch--
				   // this.orderdata.score =  
				   this.totalscore = this.totalscore - this.orderdata.score
				   this.totalprices = this.totalprices - this.orderdata.prices
				   this.totalhoney = this.totalhoney - this.orderdata.honeyPrices
			   }
			},
			goplus(){
			   if(this.purch == 10){
				   return
			   }else{
				   this.purch++
				   this.totalscore = this.orderdata.score*this.purch
				   this.totalprices = this.orderdata.prices*this.purch
				   this.totalhoney = this.orderdata.honeyPrices*this.purch
			   }
			},
			gomycard(){
				uni.navigateTo({
					 url: '../my/MyCard'
				});
			},
			getuserInfo(){
			   let that = this
			   uni.request({
			        url: getApp().globalData.http_url + 'mine/index/list/' + uni.getStorageSync('userId'), 
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
					}else{
						uni.showToast({
							title:'登录已失效，重新登录',
							icon: 'none',
							duration: 1500
						});
						setTimeout(() => {
						   uni.reLaunch({
							  url: '../my/my'
						   });
						}, 1000)
					}
			     		
			       }
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
			gopaySendCode(){
			   let that = this
			   uni.showLoading({
					title: '发送中',
					mask:true
			    });
			    uni.request({
			    	 url: getApp().globalData.http_url + 'goods/pay/paySendCode', 
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
 image{
	 width:100%;
	 height:100%;
 }
 page {
	 background-color: #fff;
 }
 
 .order-title {
	 width: 100%;
	 font-weight: 500;
	 font-size: 32upx;
	 padding: 80upx 40upx 40upx 40upx; 
 }
 .order-item {
	 width: 100%;
	 padding: 0 40upx;
	 margin-bottom: 30upx;
 }
 .order-text {
	 float: left;
	 font-size: 28upx;
	 color: #222222;
	 padding: 32upx 0;
 }
 .order-input {
	 float: right;
	 padding: 32upx 0;
	 width: 500upx;
	 border-bottom:1upx solid #F0F0F0; 
 }
  .order-input input,.order-input textarea{
	   font-size: 28upx;
	  width: 100%;
	  height: 100%;
  }
  .good-whole {
	  width: 100%;
	  display: flex;
	  padding: 0 40upx;
  }
  .good-img {
	  width: 160upx;
	  height: 160upx;
	  border-radius: 8upx;
  }
  .good-img image{
	  width:100%;
	  height:100%;
  }
  .good-conet {
	  flex: 1;
	  padding: 0 20upx;
  }
  .good-title {
	  width: 100%;
	  height: 88upx;
	  font-weight: 500;
	  font-size: 28upx;  
  }
  .good-buttom {
	  width: 100%;
	  padding-top:24upx;
  }
  .good-num {
	  float:left;
	  font-size: 28upx;
  }
  .order-right {
	  float: right;
  }
  
  .num-item {
  	float: right;
  	margin-left: 6upx;
  	background: rgba(34, 34, 34, 0.05);
  	border-radius: 6upx;
    width: 40upx;
	height: 40upx;
	text-align: center;
  	font-size: 28upx;
  	text-align: center;
  	color: #222222
  }
  .num-item image{
  	width: 20upx;
  	height: 20upx;
  }
  .gral-buttom {
  	  width: 100%;
  	  background-color: #fff;
  	  position: fixed;
  	  bottom: 0;
  	  z-index: 9;
	  border-top: 1upx solid #f2f2f2;
  	  padding: 48upx 30upx 60upx 30upx;
  }
  .gral-coent {
  	 float: left;
	 padding-top: 14upx;
  }
  .gral-text {
	  float: left;
	  padding-top:10upx;
	  font-size: 28upx;
  }
  .gral-lnt {
  	  float: left;
  	  font-weight: 500;
  	  font-size: 20upx;
  }
  .gral-lnt text{
  	  padding-right: 4upx;
  	  font-weight: 500;
  	  font-size: 40upx;
  }
  .gral-price {
  	  float: left;
  	  font-weight: 500;
  	  font-size: 20upx;
  	  color: #FF0000;
  	  margin-left: 4upx;
  }
  .gral-price text{
  	 padding-right: 4upx;
  	 font-weight: 500;
  	 font-size: 40upx;
  	 color: #FF0000;  
  }
  .gral-button {
	  float: right;
  	  width: 210upx;
  	  height: 76upx;
  	  line-height: 76upx;
  	  text-align: center;
  	  background: #FF4848;
  	  border-radius: 48upx;
  	  font-weight: 500;
  	  font-size: 28upx;
  	  color: #FFFFFF;
  }
  .PayType-content {
  	width: 100%;
  	padding: 40upx 0;
  	background-color: #FFF;
  	position: relative;
  	border-radius: 40upx 40upx 0px 0px;
  }
  .PayType-title{
  	font-weight: 500;
  	font-size: 34upx;
  	color: #000000;
  	text-align: center;
  	padding-bottom:80upx;
  }
  .PayType-prices {
	  width: 100%;
	  text-align: center;
	  padding-bottom:66upx;
	  font-weight: 500;
	  font-size: 48upx;
	  color: #222222;
  }
  .PayType-item {
  	width: 100%;
  	padding: 16upx 40upx;
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
  	font-size: 28upx;
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
  .card-text {
  	width: 100%;
  	padding: 0 40upx;
  }
  .card-text text {
  	font-size: 24upx;
  	color: #222222;
  	float: left;
  	padding-top: 4upx;
  }
  .card-left {
  	float: left;
  	padding: 6upx 16upx;
  	background: rgba(201, 147, 98, 0.12);
  	border-radius: 4upx;
  	font-size: 22upx;
  	color: #5D3F24;
  	margin-right: 10upx;
  }
  .card-left image {
  	float: left;
  	width: 20upx;
  	height: 20upx;
  	margin: 6upx 4upx 0 0;
  }
  .PayType-whole {
  	width: 100%;
	margin-top: 44upx;
  	padding: 32upx 40upx;
  	border-top: 1upx solid #f0f0f0;
  }
  .PayType-button {
  	width: 100%;
  	height: 96upx;
  	background: #FF4848;
  	border-radius: 48upx;
  	line-height: 96upx;
  	color: #FFFFFF;
  	font-weight: 500;
  	font-size: 32upx;
  	display: flex;
  	text-align: center;
  	flex-direction: row;
  	align-items: center;
  	justify-content: center;
  }
  .whole-card {
  	width: 100%;
  	max-height: 400upx;
  	overflow-y: scroll;
  	padding-bottom: 40upx;
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
  	width: 100%;
  	color: #222222;
  	margin-bottom: 20upx;
  }
  .img-tj {
  	float: left;
  	width: 44upx;
  	height: 44upx;
  	margin-right: 14upx;
  }
  .img-tj image {
  	width: 100%;
  	height: 100%;
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
  	padding-left:34upx;
  }
  .yanz-shur input {
  	font-weight: 500;
  	font-size: 48upx;
  	width: 100%;
  	color: #222222;
  	letter-spacing:62upx;
  }
  .yanz-whole {
  	width: 100%;
  	display: flex;
  }
  .yanz-item {
  	flex: 1;
  	margin: 0 12upx;
  	border: 1upx solid rgba(34, 34, 34, 0.12);
  }
  .yanz-coed {
  	width: 100%;
  	font-size: 26upx;	
  	color: #222222;
  	opacity: 0.28;
  	text-align: center;
  	padding: 40upx 0;
  }
</style>
