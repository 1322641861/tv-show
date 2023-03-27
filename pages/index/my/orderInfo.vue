<template>
	<view class="whole-page">
		  <view class="order-haed">
			    <view class="order-imge">
					  <image src="../../../static/images/or1.png" v-if="order_info.status == 10"></image>
					  <image src="../../../static/images/or2.png" v-if="order_info.status == 0"></image>
					  <image src="../../../static/images/or3.png" v-if="order_info.status == 1"></image>
				</view>
				<view class="order-text">{{order_info.status_text}}</view>
				<!-- <view class="order-tiem">5分钟</view> -->
		  </view>
		 <view class="order-button" v-if="order_info.status == 10"
		      @click="choicePayType('bottom')">立即支付</view>
		 <view class="whole-padd">
			   <view class="order-wrok">
					<view class="order-img">
						  <image :src="img_url+order_info.pic"></image>
					</view>
					<view class="order-conet">
						  <view class="order-title">{{order_info.orderName}}</view>
						  <view class="order-label">
							  <view class="label-item" v-for="item in order_info.rareness">{{item}}</view>
						  </view>
						  <view class="order-num">x{{order_info.num}}</view>
					</view>
			   </view>
			   <view class="order-item">
				     <view class="order-left">订单号</view>
					 <view class="order-right">{{order_info.orderNo}}</view>
			   </view>
			   <view class="order-item">
					 <view class="order-left">下单时间</view>
					 <view class="order-right">{{order_info.createTime}}</view>
			   </view>
			   <view class="order-item" v-if="order_info.status == 1">
					 <view class="order-left">支付时间</view>
					 <view class="order-right">{{order_info.payTime}}</view>
			   </view>
			   <view class="order-item" v-if="order_info.status == 1">
					 <view class="order-left">支付方式</view>
					 <view class="order-right">{{order_info.payType}}</view>
			   </view>
		 </view>
		 <uni-popup ref="popup"  @change="change">
				<view class="PayType-content" :class="{ 'popup-height': type === 'bottom'}">	
					  <view class="PayType-title">支付订单</view>
					  <view class="Pay-item">
							<view class="Pay-left">支付方式</view>			 						   
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  img_url:"",
			  order_info:'',
			  pageNum:1,
			  honey_index:1,
			  bankData:"",
			  banklist:[],
			  type:'bottom',
			  card_type:'center',
			  yanz_type:'center',
			  payType:4,
			  Verif:"",
			  phone_new:"",
			  phone:"",
			  orindex:""
			}
		},
		onLoad(e) {
			let that = this
			that.img_url = getApp().globalData.img_url	
			that.orindex = e.i
	  	    that.getorderList(e.i)
			that.getuserInfo()
		},
		onShow(){
			  this.getbanklist()
		},
		methods: {
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
			    	 url: getApp().globalData.http_url + 'goods/pay/jdConfirmPay', 
			    	 method:'GET',
			    	 header:{
			    		 'content-type': 'text/json;charset=UTF-8',
			    		  'sessionId':  uni.getStorageSync('sessionId')
			    	 },
					data:{
						orderId:that.order_info.id,
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
			    			that.getuserInfo()
			    			that.getorderList(that.orindex)	
							that.close_card()
							that.close()
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
				 	 url: getApp().globalData.http_url + 'user/orders/payOrder', 
				 	 method:'GET',
				 	 header:{
				 		 'content-type': 'text/json;charset=UTF-8',
				 		  'sessionId':  uni.getStorageSync('sessionId')
				 	 },
					data:{
						orderId:that.order_info.id,
						bankId:that.bankData.id,   
						payType:4,
						clientType:1
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
						    that.goyanz('center')					
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
			getorderList(i){
			   let that = this
			   uni.request({
			     url: getApp().globalData.http_url + 'user/orders/list', 
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		 'sessionId':  uni.getStorageSync('sessionId')
			   	 },
				 data:{
					pageNum:that.pageNum, 
					pageSize:100,
					status:100
				 },
			     success: (res) => {
					  if(res.data.code == 200){
						  if(res.data.data[i].status == 0){
							 res.data.data[i].status_text = '已取消'
						  }else if(res.data.data[i].status == 10){
							 res.data.data[i].status_text = '待支付'  
						  }else if(res.data.data[i].status == 1){
							 res.data.data[i].status_text = '已完成'  
						  }	  
						  that.order_info = res.data.data[i]
						 console.log(that.order_info,'订单详情');	
					  }else if(res.data.code == 10){
							uni.showToast({
								title:'登录已失效，重新登录',
								icon: 'none',
								duration: 1000
							});
							setTimeout(() => {
							   uni.switchTab({
								  url: '../my/my'
							   });
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
				this.close_card()
			},
			gomycard(){
				uni.navigateTo({
					 url: '../my/MyCard'
				});
			},
			goyanz(type){
				this.yanz_type = type
				this.$refs.popup_yanz.open(type)
			},
			close_yanz(){
				this.$refs.popup_yanz.close()
			},
			choicePayType(type){
				let that = this
				that.type = type
				that.$refs.popup.open(type)
			},
			close(){
				this.$refs.popup.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			goxuans(type){
				this.card_type = type
				this.$refs.popup_card.open(type)
			},
			close_card(){
				this.$refs.popup_card.close()
			},
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.order-haed {
		width: 100%;
		text-align: center;
		padding: 100upx 0 80upx 0;
	}
	.order-imge {
		width: 80upx;
		height: 80upx;
		margin: 40upx auto;
	}
	.order-text {
		font-weight: 400;
		font-size: 36upx;
		color: #222222;
	}
	.order-tiem {
		font-weight: 400;
		font-size: 32upx;
		color: #222222;
		padding-top: 16upx;
	}
	.order-button {
		width: 320upx;
		height: 88upx;
		background: #222222;
		border-radius: 8upx;
		text-align: center;
		line-height: 88upx;
		margin: 0 auto 40upx auto;
		font-size: 32upx;
		color: #FFFFFF;
	}
	.whole-padd {
		width: 100%;
		padding: 40upx;
	}
	.order-wrok {
		width: 100%;
		display: flex;
		border-bottom: 1upx solid #F0F0F0;
		padding-bottom:30upx;
		margin-bottom: 60upx;
	}
	.order-img {
		width: 192upx;
		height: 192upx;
		border-radius: 24upx;
	}
	.order-conet {
		flex: 1;
		padding-left: 30upx;
	}
	.order-title {
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
		padding: 10upx 0;
	}
	.order-label {
		width: 100%;
		padding-bottom: 40upx;
	}
	.label-item {
		float: left;
		padding: 2upx 12upx;
		border: 1upx solid rgba(34, 34, 34, 0.8);
		border-radius: 4upx;
		margin-right: 10upx;
		font-size: 20upx;
		color: #222222;
	}
	.order-num {
		font-weight: 500;
		font-size: 36upx;
		color: #222222;
	}
	.order-item {
		width: 100%;
		padding-bottom: 40upx;	
	}
	
	.order-left {
		font-size: 28upx;
		float: left;
		color: rgba(34, 34, 34, 0.56);
	}
	.order-right {
		float: right;
		font-size: 28upx;
		color: #222222;
	}
	.Pay-item {
		width: 100%;
		padding:0 40upx 48upx 40upx;
	}
	.Pay-left {
		float: left;
		font-size: 32upx;
		color: #222222;
	}
	.PayType-content {
		width: 100%;
		padding: 40upx 0;
		min-height: 660upx;
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
		position: absolute;
		bottom: 20upx;
		left: 0;
		padding: 32upx 40upx;
		border-top: 1upx solid #f0f0f0;
	}
	.PayType-button {
		width: 100%;
		height: 96upx;
		background: #222222;
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
		border: 1upx solid #222222;
	}
	.button-item {
		width: 50%;
		color: #fff;
	}
	.colt {
		color: #222222;
		background-color: #FFFFFF;
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
		padding-bottom: 30upx;
	}
	.yanz-item {
		flex: 1;
		margin: 0 12upx;
		border-bottom: 1upx solid rgba(34, 34, 34, 0.12);
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
</style>