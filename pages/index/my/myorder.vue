<template>
	<view class="whole-page">
		  <view class="class-haed">
		  	    <view class="haed-item" @click="gohaed(100)"
		  		     :class="direction == 100 ? 'you':''">
		  			 全部   			
		  			 <view class="haed-border" v-if="direction == 100"></view>
		  	   </view>
		  	   <view class="haed-item" @click="gohaed(10)" 
		  		    :class="direction == 10 ? 'you':''">
                     待支付
		  			 <view class="haed-border" v-if="direction == 10"></view>
		  	   </view>
			   <view class="haed-item" @click="gohaed(1)"
				    :class="direction == 1 ? 'you':''">
					 已完成
					 <view class="haed-border" v-if="direction == 1"></view>
			   </view>
		  </view>
		  <view class="whole-order">
			    <view class="order-list" v-for="(item,index) in orderList">
					  <view class="order-wrok">
						    <view class="order-img">
								  <image :src="img_url+item.pic"></image>
							</view>
							<view class="order-conet">
								  <view class="order-title">
									    {{item.orderName}} <text>{{item.status_text}}</text>
								  </view>
								 <view class="order-label">
									   <view class="label-item" v-for="i in item.rareness">{{i}}</view>
								 </view>
							</view>
					  </view>
					  <view class="order-bottom">
						    <view class="box-top">
						         <view class="order-tiem">下单时间：{{item.createTime}}</view>
							     <view class="order-num">x{{item.num}}</view>
							</view>
						    <view class="box-bottom">
								 <!-- 状态//0已取消 1已完成 2支付中 9已退款 10待支付 -->
								  <view class="button-order mimg" v-if="item.status == 10" 
								        @click="goorderInfo(index)">立即支付</view>
								  <view class="button-order tune"  @click="gocancelOrder(item.id)"
								      v-if="item.status == 10">取消支付</view>
								  <view class="button-order"  v-if="item.status == 1"
								        @click="goinfo(item.blindBoxId,item.ddcId)">
									     查看{{item.blindBoxId != null ? '盲盒':'藏品'}}</view>
								  <view class="button-order" @click="goorderInfo(index)">查看订单</view>
							</view>
					  </view>
				</view>
		  </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				img_url:"",
				pageNum:1,
				direction:100,
				orderList:[]
			}
		},
		onShow(){
			this.img_url = getApp().globalData.img_url		
			this.getorderList()
		},
		methods: {
			gohaed(e){
			  this.direction = e
			  this.pageNum = 1
			  this.getorderList()
			},
			goinfo(bid,wid){
				if(bid!= null){
					uni.navigateTo({
					    url:'mybox'					
					})
				}
				if(wid!= null){
					uni.navigateTo({
					    url: 'myArtworkInfo?id='+ wid + '&oneCategory=' + '图片'
					});
				}
			},
			goorderInfo(i){
				uni.navigateTo({
					 url:'orderInfo?i='+i 
				});
			},
			gocancelOrder(id){
				let that = this
				uni.showModal({
					title: '提示',
					content: '是否取消订单？',
					success: function (res) {
						if (res.confirm) {
						   uni.request({
							    url: getApp().globalData.http_url + 'user/orders/cancelOrder', 
							    method:'GET',
							    header:{
									 'content-type': 'text/json;charset=UTF-8',
									  'sessionId':  uni.getStorageSync('sessionId')
								},
								data:{
									orderId:id
								},
						    	success: (res) => {
						    		console.log(res.data,'取消订单')
						    		uni.hideLoading()
						    		if(res.data.code == 200){		
						    			uni.showToast({
						    				title:'已取消',
						    				icon: 'none',
						    				duration: 1500
						    			});		
						   				that.getorderList()			
						    		}else{
						    			uni.showToast({
						    				title:res.data.msg,
						    				icon: 'none',
						    				duration: 1500
						    			});	 
						    		} 			
						    	 },
						   });	
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getorderList(){
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
					status:that.direction
				 },
			     success: (res) => {
			   		  console.log(res.data,'我的订单');	
					  if(res.data.code == 200){			
						  for(var i in res.data.data){
							  if(res.data.data[i].status == 0){
							  	  res.data.data[i].status_text = '已取消'
							  }else if(res.data.data[i].status == 10){
							  	  res.data.data[i].status_text = '待支付'  
							  }else if(res.data.data[i].status == 1){
							  	  res.data.data[i].status_text = '已完成'  
							  }
						  }
						  that.orderList = res.data.data
						
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
	.class-haed {
		width: 100%;
		padding: 30upx 80upx 0 80upx;
		display: flex;
		position: fixed;
		top: 0;
		z-index: 9;
		background-color: #fff;
	}
	.haed-item {
		flex: 1;
		text-align: center;
		font-size: 32upx;
		color: #222222;
	}
	.haed-border {
		width: 40upx;
		height: 4upx;
		background-color: #222222;
		border-radius: 10upx;
		margin: 16upx auto 0 auto;
		
	}
	.you {
		font-weight: 500;
	}
	.whole-order {
		width: 100%;
		padding: 100upx 32upx 0 32upx;
	}
	.order-list {
		width: 100%;
		padding: 20upx 0;
		margin-bottom: 20upx;
		border-bottom:1upx solid #F0F0F0;
	}
	.order-wrok {
		width: 100%;
		display: flex;	
	}
	.order-img {
		width: 160upx;
		height: 160upx;
		border-radius: 16upx;
	}
	.order-conet {
		flex: 1;
		padding-left: 24upx;
	}
	.order-title {
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
		padding: 10upx 0;
	}
	.order-title text{
		font-size: 28upx;
		color: #222222;
		float: right;
	}
	.order-label {
		width: 100%;
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
	.order-bottom {
		width: 100%;
		padding: 32upx 0;
	}
	.box-top {
		width: 100%;	
	}
	.order-tiem {
		float: left;
		font-size: 28upx;
		color: rgba(34, 34, 34, 0.56);
	}
	.order-num {
		float: right;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
	}
	.box-bottom {
		width: 100%;
		padding-top: 40upx;
	}
	.button-order {
		width: 192upx;
		height: 68upx;
		border: 1upx solid #222222;
		border-radius: 44upx;
		float: right;
		margin-left: 24upx;
		font-size: 28upx;
		text-align: center;
		line-height: 68upx;
		color: #222222;
	}
	.tune{
		border-color: rgba(34, 34, 34, 0.4);
		color:  rgba(34, 34, 34, 0.4);
	}
	.mimg {
		background: #222222;
		color: #fff;
		border: none;
	}
</style>