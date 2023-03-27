<template>
	<view class="whole-page">
		  <view class="maember-back">
			    <image src="../../../../static/img/hy1.png" mode="widthFix"></image>
				<view class="maember-post">
					  <view class="maember-hede">
						    <image src="../../../../static/img/zuo.png" mode="widthFix" @click="getRutrun"></image>
							会员
					  </view>
					  <view class="maember-content">
						    <image src="../../../../static/img/hy2.png" mode="widthFix"  v-if="userInfo.vipStatus == 0"></image>
					   	    <image src="../../../../static/img/hy3.png" mode="widthFix" v-else></image>
							<view class="content-post">
								  <view class="content-title" 
								        :class="userInfo.vipStatus != 0 ? 'cikt':''">
									    <image src="../../../../static/img/hy4.png" mode="widthFix" v-if="userInfo.vipStatus == 0"></image>
										<image src="../../../../static/img/hy5.png" mode="widthFix" v-else></image>
										黄金会员
										<text v-if="userInfo.vipExpiresTime != null">{{userInfo.vipExpiresTime}}到期</text>
								  </view>	
									<view class="open-maember">
										 <!-- <view class="item-open" @click="golevelType(1)"
												:class="levelType == 1 ? 'borde' : ''">
												<view class="item-title">三个月会员</view>
												<view class="item-price"><text>￥</text> 99</view>
												<view class="item-text">海量短剧免费看</view>
										  </view>
										  <view class="item-open" @click="golevelType(2)"
												:class="levelType == 2 ? 'borde' : ''">
												<view class="item-title">一年会员</view>
												<view class="item-price"><text>￥</text> 353</view>
												<view class="item-shuo">立减21元 <text>￥386</text></view>
												<view class="item-text">海量短剧免费看</view>
										  </view> -->
										  <view class="item-open" v-for="(item,index) in vipList" :key="index"
										        @click="golevelType(index,item)"
												:class="levelType == index ? 'borde' : ''">
											    <view class="open-title">{{item.typeName}}</view>
												<view class="item-price"><text>￥</text>{{item.typePrice}}</view>
												<view class="item-shuo" v-if="item.preferentialFlag == 0">
													 立减{{item.originPrice*1-item.typePrice*1}}元 <text>￥{{item.originPrice}}</text>
												</view>
												<view class="item-text">海量短剧免费看</view>
										   </view>
								 	</view>
								    <view class="remove-button" @click="openPopupGoods">
										  <view class="remove-title">立即{{userInfo.vipStatus == 0 ? '开通':'续费'}}</view>
										  <view class="remove-text">开通会员免费看剧</view>
									</view>	
								    <view class="rights-title">
										   <image src="../../../../static/img/hy6.png" mode="widthFix"></image>
										  会员权益
										   <image src="../../../../static/img/hy7.png" mode="widthFix"></image>
									</view>
									<view class="rights-whole">
										  <view class="rights-item" v-for="(item,index) in rightsList" :key="index">
											    <view class="rights-img">
													<image :src="item.pic" mode="widthFix"></image>
												</view> 
												 <view class="rights-text">{{item.name}}</view> 
										  </view>
									</view>
							</view>
					  </view>
				</view>
		  </view>
	<!-- 	  <view class="whole-padd">
			     <view class="like-whole">
					   <view class="like-title">猜你喜欢</view>
					   <view class="like-for">
						     <view class="like-list" v-for="(item,index) in rightsList" :key="index">
								   <view class="like-img">
									     <image src="../../../../static/img/xtg.png" mode="aspectFill"></image>
										 <view class="post-like">VIP</view>
								   </view>
								   <view class="like-text">题目题目</view>
							 </view>
					   </view>
				 </view>
		  </view> -->
		  <uni-popup ref="popupGoods" type="bottom">
		  	   <view class="popup-whole">
					 <view class="popup-title">
							充值会员 <image src="../../../../static/images/xx2.png" @click="closePopupGoods"></image>
				     </view>
					 <view class="huiyuan-item">
						   <view class="huiyuan-text">{{vipData.typeName}}</view>
						   <view class="huiyuan-price">¥{{orderMoney}}</view>
					 </view>
					 <view class="item-title">选择支付方式</view>
					 <view class="payType-item">
						   <view class="payType-img">
							     <image src="../../../../static/img/hy14.png"></image>
						   </view>
						   <view class="payType-text">余额(¥{{balance}})</view>
						   <view class="pay-goux" :class="Payindex != -1 ? 'bore':''" @click="firstRadioChange(-1,0)">
						   	 	  <image src="../../../../static/img/gx3.png" v-if="Payindex == -1"></image>
						   </view>
					 </view>
					 <view class="payType-item">
						   <view class="payType-img">
								 <image src="../../../../static/img/hy17.png"></image>
						   </view>
						   <view class="payType-text">支付宝</view>
						   <view class="pay-goux" :class="Payindex != -2 ? 'bore':''" @click="firstRadioChange(-2,0)">
								  <image src="../../../../static/img/gx3.png" v-if="Payindex == -2"></image>
						   </view>
					 </view>
					 <view class="payType-card">
						   <view class="card-img">
							     <image src="../../../../static/img/hy15.png"></image>
						   </view>
						   <view class="card-title">银行卡支付</view>
						   <!-- <view class="card-right">
							     <image src="../../../../static/img/xia.png"></image>
						   </view> -->
					 </view>
					 <view class="bkcard-item" v-for="(item,index) in banklist" :key="index">
						   <view class="bkcard-img">
							     <image :src="item.bankPic"></image>
						   </view>
						   <view class="bkcard-text">{{item.bankName}}({{item.cardnum}})</view>
						   <view class="pay-goux" :class="Payindex != index ? 'bore':''" @click="firstRadioChange(index,item)">
						   	 	  <image src="../../../../static/img/gx3.png" v-if="Payindex == index"></image>
						   </view>
					 </view>
					 <view class="bkcard-item" @click="addCard">
						   <view class="bkcard-img">
						   		  <image src="../../../../static/img/hy16.png"></image>
						   </view>
						   <view class="bkcard-text">添加银行卡 </view>				   
					 </view>
					 <view class="pay-button" @click="gobuyVip">
						   <view class="pay-title">立即{{userInfo.vipStatus == 0 ? '开通':'续费'}}</view>
						   <view class="pay-text">开通会员免费看剧</view>
					 </view>
			   </view>
		  </uni-popup>
		  <uni-popup ref="popup_yanz" type="center">
		      <view class="popup-content">
				  <view class="popup-title" style="padding-top:20upx;">确认支付</view>
				  <view class="yanz-text">短信验证码已发送预留手机号({{bankData.phone}})请将6位数字验证码填写到下方</view>
				  <view class="yanz-shur">
					  <input :class="Verif.length == 6 ? 'windt':''" type="number" maxlength="6" v-model="Verif" focus
						  @input="goinput" :adjust-position="false" />
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
	import {
		userInfo,
	    systemList,
		buyVip,
		llNotify
	} from '@/api/officer.js';
	import {    
		bindCardList,
		myWallet
	} from '@/api/api.js'
	 var times = 60;
	export default {
		data() {
			return {
				levelType:0,
				Payindex:-1,
				PayType:6, //支付类型：1-微信 2-支付宝 3-杉德 4-连连 5-京东 6-余额
				userInfo:'',
				balance:"",
				banklist:[],
				bankData:"",
				vipList:[],
				vipData:"",
				orderMoney:"",
				Verif: "",
				text: '重新发送验证码',
				orderId:"",
				rightsList:[
					{pic:"../../../../static/img/hy8.png",name:"免费看"},
					{pic:"../../../../static/img/hy9.png",name:"抢先看"},
					{pic:"../../../../static/img/hy10.png",name:"超清看"},
					{pic:"../../../../static/img/hy11.png",name:"半价点播"},
					{pic:"../../../../static/img/hy12.png",name:"身份升级"},
					{pic:"../../../../static/img/hy13.png",name:"评论表情"},
				]
			}
		},
		onLoad() {
			this.getsystemList()
		    this.getUserInfo()
		    this.getbanklist()
			this.getmyWallet()
		},
		methods: {	
			// 会员下单
			gobuyVip(){
				let that = this
				var clientType = ''
				// #ifdef H5
				   clientType = 1
				// #endif
				// #ifdef APP-PLUS
				   clientType = 2
				//#endif
		       uni.showLoading({
		           title: '加载中'
		       });
			    buyVip({
				  clientType:clientType,
				  bankId:that.PayType == 4 ? that.bankData.id*1 : '',
				  bankType:that.PayType == 4 ? that.bankData.bankName : '',
				  orderMoney:that.orderMoney,
				  orderType: that.userInfo.vipStatus == 0 ? 1 : 2,
				  payType:that.PayType,
				  typeId:that.vipData.id
				}).then(res => {
			    	console.log(res,'下单')
					 uni.hideLoading();
			    	if(res.data.code == 200){
						//余额
						if(res.data.data.orderId && that.PayType == 6){
							uni.showToast({
							    title: '开通成功！',
							    icon: "success",
							    duration: 1500
							})
							that.getsystemList()
							that.getUserInfo()
							that.closePopupGoods()
							that.getmyWallet()
						}
						//银行卡
						if(res.data.data.orderId && that.PayType == 4){
							that.orderId = res.data.data.orderId
							  that.setHtml()
							  that.goPopupyanz()
						}	
						//支付宝
						if(that.PayType == 2){
							 document.querySelector('body').innerHTML = res.data.data;
							 document.forms[0].submit()
							 return;
						}				
										
					}else{
						uni.showToast({
							title:res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
			    })
			},
			goconfirm(){
			   let that = this
			   if (that.Verif.length != 6) {
			       uni.showToast({
			           title: '请输入正确的验证码',
			           icon: 'none',
			           duration: 1500
			       });
			       return
			   }
			   uni.showLoading({
			       title: '支付中',
			       mask: true
			   });
			   llNotify({
			     orderId: that.orderId,
			     code: that.Verif,
				 type:2
			   }).then(res => {
			   	console.log(res,'连连确认支付')
			   	 uni.hideLoading();
			   	if(res.code == 200){
			   	  	uni.showToast({
			   	  	    title: '开通成功！',
			   	  	    icon: "success",
			   	  	    duration: 1500
			   	  	})
			   	  	that.getsystemList()
			   	  	that.getUserInfo()
			   	  	that.closePopupGoods()
			   	  	that.close_yanz()
					that.getmyWallet()
			   	}else{
			   		uni.showToast({
			   			title:res.msg,
			   			icon: 'none',
			   			duration: 2000
			   		});
			   	}
			   })
			},
			openPopupGoods(){
				this.$refs.popupGoods.open()
					    			
			},
			closePopupGoods(){
				this.$refs.popupGoods.close()
			},
			goPopupyanz() {
			    this.$refs.popup_yanz.open()
			},
			close_yanz() {
			    this.$refs.popup_yanz.close()
			},
			goinput(e) {
			    if (e.detail.value.length == 6) {
			        this.goconfirm()
			    }
			},
			// 添加银行卡
			addCard() {
			    uni.navigateTo({
			        url: "/pages/index/my/AddCard"
			    })
			},
			//选择支付方式
			firstRadioChange(i,item){
				console.log(i,item)
				this.Payindex = i
				if(i == -1){
					this.PayType = 6					
				}
				 if(i == -2){
					this.PayType = 2
				 }
			     if(i > -1){
					this.bankData = item
					this.PayType = 4
				 }
			},
			getsystemList(){
				let that = this
				systemList().then(res => {
					console.log(res,'会员列表')
					this.vipList = res.data
					this.vipData = res.data[0]
					// 	优惠价格是否开启 0 不开启 1开启
					if(this.vipData.preferentialFlag == 0){
						this.orderMoney = this.vipData.originPrice
					}else{
						this.orderMoney = this.vipData.typePrice
					}
				})
			},
			getUserInfo() {
			    let that = this
				userInfo().then(res => {
					 console.log(res,'用户信息')
					 res.data.vipExpiresTime = res.data.vipExpiresTime.substr(0, 10)
					 that.userInfo = res.data
				})
			},
			getbanklist(){
			   let that = this
			  bindCardList({type:2 }).then(res => {
			  	  console.log(res,'银行卡')
				  if(res.code == 200){
				  	for(var i in res.data){
				  		res.data[i].cardnum = res.data[i].cardNo.substr(12,4)
				  	}
				  	 that.banklist = res.data
				  	 if(res.data!=''){
				  		 that.bankData = res.data[0]
						 console.log()
				  	 } 
				  }		 
			  }) 
			},
			getmyWallet(){
			   let that = this
			   myWallet().then(res => {
			   	  console.log(res,'余额')
				  that.balance = res.data.balance
			   				 
			   }) 	
			},
			golevelType(i,item){
				this.levelType = i
				this.vipData = item
			},
			Verifications() {
			    let that = this
			    if (times != 60) {} else {
			        that.setHtml()
			        that.submit()
			    }
			},
			setHtml() {
			    console.log('111');
			    let that = this
			        --times;
			    if (times != 0) {
			        that.text = '重新发送验证码' + '(' + times + 's' + ')'
			        setTimeout(function() {
			            that.setHtml()
			        }, 1000)
			    } else {
			        that.text = '重新发送验证码'
			        times = 60
			    }
			},
			//返回
			getRutrun() {
				// #ifdef  APP-PLUS
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
				// #endif
				// #ifdef H5
				history.back();
				// #endif
			},
		}
	}
</script>

<style>
  page {
  		background: #FFFFFF;
  	}
  	image {
  		width: 100%;
  		height:100%;
  	}
  	view{
  		font-family: 'PingFang SC';
  		font-style: normal;
  		overflow: hidden;
  		font-weight: 400;
  		color: #333333;
  		box-sizing: border-box;
  	}
   .whole-page {
  	  width:100%;
  	  height:100%;
   }
   .maember-back {
	   width: 100%;  
	   /*#ifdef H5*/
	     height: 1130upx;
	   /*#endif*/
	   /*#ifdef APP-PLUS*/
	     height: 1210upx;
	   /*#endif*/ 
	   position: relative;
   }
   .maember-post {
	   width: 100%;
	   padding: 0 20upx;
	   position: absolute;
	   top: 0;
   }
   .maember-hede {
	   width: 100%;
	   text-align: center;
	   font-weight: 500;
	   font-size: 36upx;
	   color: #FFFFFF;
	   position: relative;
	   /*#ifdef H5*/
	     margin-top:30upx;
	   /*#endif*/
	   /*#ifdef APP-PLUS*/
	     margin-top:80upx;
	   /*#endif*/ 
	   padding-bottom: 60upx;
   }
   .maember-hede image {
	   width: 22upx;
	   position: absolute;
	   left: 10upx;
	   top: 8upx;
   }
   .maember-content {
	   width: 100%;
	   position: relative;
   }
   .content-post {
	   position: absolute;
	   width: 100%;
	   top: 0;
   }
   .content-title {
	   width: 100%;
	   font-weight: 500;
	   font-size: 36upx;
	   color: #AAAAAA;
	   display: flex;
	   align-items: center;
	   padding: 10upx 0 0 52upx;
   }
   .cikt {
	   color: #E0C598;

   }
   .content-title image {
	   width: 64upx;
	   margin-right: 10upx;
   }
   .content-title text {
	   font-weight: 400;
	   font-size: 20upx;
	   padding: 10upx 0 0 14upx;
	   color: rgba(226, 206, 161, 0.6);
   }
   .open-maember {
	   width: 100%;
	   display: flex;
	   margin-top:56upx;
	   padding: 32upx 22upx;
   }
   .item-open {
	   width: 310upx;
	   margin: 0 10upx;
	   height: 266upx;
	   background: #FFFAF5;
	   border: 4upx solid #E7D0B6;
	   border-radius: 12upx;
	   text-align: center;
	   padding: 40upx 0;
   }
   .borde {
	   border: 4upx solid rgba(146, 120, 54, 1);
	   background: linear-gradient(126.36deg, #F5D1A1 0%, #FFE9CE 45.67%, #FFCF8E 100%);
   }
   .open-title {
	   width: 100%;
	   font-weight: 500;
	   font-size: 26upx;
	   color: #333333;
   }
   .item-price {
	   padding:10upx 0;
	   font-size: 48upx;
	   color: #333333;
   }
   .item-price text {
	   font-size: 24upx;
   }
   .item-shuo {
	   font-size: 24upx;
	   color: #333333;
   }
   .item-shuo text{
   	   font-size: 24upx;
   	   color: #777777;
	   padding-left: 16upx;
   }
   .item-text {
	   padding-top: 10upx;
	   font-size: 24upx;
	   color: #AAAAAA;
   }
   .remove-button {
	   width: 640upx;
	   height: 88upx;
	   margin: 0 auto;
	   text-align: center;
	   background: linear-gradient(126.36deg, #F5D1A1 0%, #FFE9CE 45.67%, #FFCF8E 100%);
	   border-radius: 82upx;
   }
   .remove-title {
	   font-weight: 500;
	   font-size: 28upx;
	   color: #333333;
	   padding-top: 10upx;
   }
   .remove-text {
	   font-size: 24upx;
	   color: #777777;
   }
   .rights-title {
	   width: 100%;
	   display: flex;
	   font-weight: 500;
	   margin-top: 40upx;
	   font-size: 32upx;
	   color: #333333;
	   align-items: center;
	   justify-content: center;
   }
   .rights-title image{
	   width: 32upx;
	   margin: 0 16upx;
   }
   .rights-whole {
	   width: 100%;
	   padding: 16upx 0;
   }
   .rights-item {
	   float: left;
	   text-align: center;
	   padding: 16upx 0;
	   width: 33.33333333%;
   }
   .rights-img {
	   width: 72upx;
	   margin: 0 auto;
   }
   .rights-text {
	   padding-top: 8upx;
	   font-size: 24upx;
	   color: #333333;
   }
   .whole-padd {
	   width: 100%;
	   padding: 0 32upx 60upx 32upx;
   }
   .like-whole {
	   width: 100%;
	   background: linear-gradient(148.25deg, #FFF1E2 0%, #FFFCF9 53.65%, #FFF1E2 100%);
	   box-shadow: 0px 8upx 12upx rgba(0, 0, 0, 0.1);
      border-radius: 16upx;
   }
   .like-title {
	   width: 100%;
	   padding: 32upx 24upx;
   }
   .like-for {
	   width: 100%;
	   padding-left: 24upx;
   }
   .like-list {
	   width: 200upx;
	   float: left;
	   margin-right: 20upx;
	   margin-bottom: 20upx;
   }
   .like-img {
	   width: 100%;
	   height: 240upx;
	   border-radius: 8upx;
   }
   .like-text {
	   width: 100%;
	   padding-top: 6upx;
	   font-size: 26upx;
	   color: #333333;  
   }
   .popup-whole {
   	  width: 100%;
	  padding: 0 32upx;
	  border-radius: 20upx 20upx 0 0;
   	  background: linear-gradient(148.25deg, #FFF1E2 0%, #FFFCF9 53.65%, #FFF1E2 100%);
   }
   .popup-title {
   	  width: 100%;
   	  text-align: center;
   	  position: relative;
   	  padding: 40upx;
   	  font-weight: 500;
   	  font-size: 32upx;
   	  color: #333333;
   }
   .popup-title image {
   	  width: 28upx;
   	  height: 28upx;
   	  position: absolute;
   	  top: 44upx;
   	  right: 0;
   }
   .huiyuan-item {
	   width: 100%;
	   padding: 24upx 0;
	   margin-bottom: 40upx;
	   border-top: 1upx solid rgba(51, 51, 51, 0.05);
	   border-bottom: 1upx solid rgba(51, 51, 51, 0.05);
   }
   .huiyuan-text {
	   float: left;
	   font-size: 26upx;
   }
   .huiyuan-price {
	   float: right;
	   font-size: 26upx;
   }
   .item-title {
	   width: 100%;
	   font-weight: 500;
	   font-size: 28upx;
	   margin-bottom: 40upx;
   }
   .payType-item {
	   width: 100%;
	   margin-bottom: 40upx;
   }
   .payType-img {
	   float: left;
	   width: 32upx;
	   height: 32upx;
	   margin-top: 4upx;
   }
   .payType-text {
	   float: left;
	   font-size: 28upx;
	   margin-left: 12upx;
   }
   .pay-goux {
   	  float: right;
   	  width: 36upx;
   	  height: 36upx;
   	  border-radius: 50%;
   	   image {
   	  		  width: 36upx;
   	  		  height: 36upx;
   	   }
   }
   .bore {
      border: 1upx solid #999999;
   }
   .payType-card {
	   width: 100%;
	   margin-bottom: 20upx;
   }
   .card-img {
	   width: 48upx;
	   height: 48upx;
	   float: left;
   }
   .card-title {
	   float: left;
	   margin-left: 10upx;
	   font-size: 32upx;
   }
   .card-right {
	   float: right;
	   width: 36upx;
	   height: 36upx;
	   margin-top: 6upx;
   }
   .bkcard-item {
	   width: 100%;
	   padding-left: 60upx;
	   padding-bottom: 24upx;
   }
   .bkcard-img {
	   float: left;
	   width: 40upx;
	   height: 40upx;
   }
   .bkcard-text {
	   float: left;
	   color: rgba(34, 34, 34, 0.8);
	   padding-left: 12upx;
   }
   .pay-button {
	  width: 640upx;
	  height: 88upx;
	  text-align: center;
	  margin: 80upx auto 40upx auto;
	  background: linear-gradient(126.36deg, #F5D1A1 0%, #FFE9CE 45.67%, #FFCF8E 100%);
	  border-radius: 82upx;
   }
   .pay-title {
	   padding: 4upx 0;
	   font-weight: 500;
	   font-size: 28upx;
   }
   .pay-text {
   	   font-size: 24upx;
	   color: #777777;
   }
   /* 短信弹窗 */
   .yanz-text {
       width: 100%;
       font-size: 26upx;
       color: #222222;
       opacity: 0.4;
       padding-bottom: 20upx;
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
       letter-spacing: 66upx;
   }  
   .windt {
       width: 70%;
       padding-left: 0;
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
