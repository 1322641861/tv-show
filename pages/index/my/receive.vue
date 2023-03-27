<template>
	<view class="whole-page sun">
		  <view class="receive-list" v-for="(item,index) in draw_list">
			     <view class="receive-top">
					   <view class="receive-img">
						     <image :src="img_url+item.pic"></image>
					   </view>
					   <view class="receive-conet">
						     <view class="receive-title">{{item.goodsName}}</view>
							<!-- <view class="receive-text">{{}}</view> -->
					   </view>
				 </view>
				 <view class="receive-bottom">{{item.goodsInfo}}</view>
				 <view class="receive-button" :class="item.isReceive == 1 ? 'bunt':''" 
				       @click="goinfo(item.isReceive,item.type,item.id,index)">
				       {{item.isReceive == 1 ? '已领取':'立即领取'}}</view>
					   
		  </view>
		  <uni-popup ref="popup"  @change="change">
		   	<view class="popup-Sign" :class="{ 'popup-height': type === 'center'}">	
		  		  <view class="popup-title">请输入充值号码</view>
				  <view class="popup-input">
					   <input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone"
					           :adjust-position="false"/>
				  </view>
				  <view class="popup-button" @click="gopopup">确认领取</view>
		     </view>
		  </uni-popup>
		  <uni-popup ref="popup_add"  @change="change2">
		   	<view class="popup-content" :class="{ 'popup-height': add_type === 'bottom'}">	
		  	      <view class="popup-title">填写收货信息</view>
		  	      <view class="address-whole">
		  	      		<view class="left-address">收货人</view>		
					    <view class="right-address">
							  <input placeholder="请输入姓名" type="text"  v-model="name"
							          :adjust-position="false"/>
						</view>	
		  	      </view>
				  <view class="address-whole">
				  		<view class="left-address">手机号码</view>		
						<view class="right-address">
							  <input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone"
									  :adjust-position="false"/>
						</view>	
				  </view>
				  <view class="address-whole">
				  		<view class="left-address">所在地区</view>		
						<view class="fl-right">
							  <view class="item-right">						
									<input placeholder="省份" type="text"  v-model="province"
											  :adjust-position="false"/>
							  </view>	
							  <view class="item-right">
									<input placeholder="城市" type="text"  v-model="city"
											  :adjust-position="false"/>
							  </view>
							  <view class="item-right">
									<input placeholder="地区" type="text"  v-model="area"
											  :adjust-position="false"/>
							  </view>
						</view>	
				  </view>
				  <view class="address-whole">
				  		<view class="left-address">详细地址</view>		
						<view class="right-address" style="height: 180upx;">
							  <textarea   auto-height  v-model="detailAddress"
									  placeholder="请输入小区/楼栋/单元名称/乡镇/村等" :adjust-position="false" />
						</view>	
				  </view>
				  <view class="qun-button" @click="goreceive">确定</view>
		     </view>
		  </uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {			
				good_index:0,
				info_index:'',
				type: 'center',
				add_type:'bottom',
				img_url:"",
				// img_url:'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/',
		  //   	http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api // 测试 test
				draw_list:[],
				name:"",
				phone:"",
				province:"",
				city:"",
				area:"",
				goods_id:"",
				sessionId:"",
				detailAddress:"",
				is_app:false,
			}
		},
		onLoad(e) {
		   if(e.sessionId){
				console.log('app跳转')
				this.is_app = true
				this.sessionId = e.sessionId
		   }else{
			   console.log('h5跳转')
				this.is_app = false
				this.sessionId = uni.getStorageSync('sessionId')
		   }
		   this.img_url = getApp().globalData.img_url
		   this.good_index = e.index
		   this.getuserorderList()
		},
		methods: {
			gopopup(){
			   let that = this
			  if(that.phone == ''){
			   	uni.showToast({
			   		title:'请输入收货手机',
			   		icon: 'none',
			   		duration: 1500
			   	});	
			   }else{
			     uni.request({
			     	 url: getApp().globalData.http_url + 'blindBox/receivePrize', 
			     	 method:'GET',
			     	 header:{
			     		 'content-type': 'text/json;charset=UTF-8',
			     		 'sessionId':that.sessionId
			     	 },
			     	 data:{
			     		id:that.goods_id,
			     		phone:that.phone,
			     	 },
			     	 success: (res) => {	
			     		console.log(res)
			     		if(res.data.code == 200){
			     			 uni.showToast({
			     				title:'领取成功 !',
			     				icon: 'none',
			     				duration: 1500
			     			 });
			   			   that.getuserorderList()
			     		}else{
			     			uni.showToast({
			     				title:res.data.message,
			     				icon: 'none',
			     				duration: 1500
			     			});	 
			     		}
			     		
			     	 }
			     });
			   }
			},
			goreceive(){
				let that = this
				if(that.name == ''){
					uni.showToast({
						title:'请输入收货人',
						icon: 'none',
						duration: 1500
					});	
				}else if(that.phone == ''){
					uni.showToast({
						title:'请输入收货手机',
						icon: 'none',
						duration: 1500
					});	
				}else{
					uni.showLoading({
						title: '领取中',
						mask:true
					});
				  uni.request({
				  	 url: getApp().globalData.http_url + 'blindBox/receivePrize', 
				  	 method:'GET',
				  	 header:{
				  		 'content-type': 'text/json;charset=UTF-8',
				  		 'sessionId': that.sessionId
				  	 },
				  	 data:{
				  		id:that.goods_id,
				  		phone:that.phone,
				  		name:that.name,
				  		province:that.province,
				  		city:that.city,
				  		area:that.area,
				  		detailAddress:that.detailAddress
				  	 },
				  	 success: (res) => {	
				  		console.log(res)
						uni.hideLoading()
				  		if(res.data.code == 200){
				  			 uni.showToast({
				  				title:'领取成功 !',
				  				icon: 'none',
				  				duration: 1500
				  			 });
							 that.getuserorderList()
				  		}else{
				  			uni.showToast({
				  				title:res.data.message,
				  				icon: 'none',
				  				duration: 1500
				  			});	 
				  		}
				  		
				  	 }
				  });
				}
			},
			toggle(type){
				this.type = type
				this.$refs.popup.open(type)
			},
			gosttog(type){
				console.log(type)
				this.add_type = type
				this.$refs.popup_add.open(type)
			},
			close(){
				this.$refs.popup.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			change2(e){
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			getuserorderList(){
				  let that = this
				   uni.request({
					 url: getApp().globalData.http_url + 'blindBox/orderList', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': that.sessionId
					 },
					 data:{
						 pageNum:1,
						 pageSize:100
					 },
					  success: (res) => {	
					    console.log(res)
						var index = this.good_index 
						console.log(res.data.data[index].prizesList,'结果');
						that.draw_list = res.data.data[index].prizesList
						
					  }
				  });
			},
		   goinfo(i,type,id,index){
			    let that = this
			     console.log(type)
			   this.goods_id = id
			   this.info_index = index
			   if(i == 2){		  
					if(type == 1){
						this.gosttog('bottom')
					}else if(type == 2){
						 this.toggle('center')
					}else if(type == 5){
						 uni.request({
						 	 url: getApp().globalData.http_url + 'blindBox/receivePrize', 
						 	 method:'GET',
						 	 header:{
						 		 'content-type': 'text/json;charset=UTF-8',
						 		 'sessionId': that.sessionId
						 	 },
						 	 data:{
						 		id:that.goods_id,
						 	 },
						 	 success: (res) => {	
						 		console.log(res)
						 		if(res.data.code == 200){
						 			 uni.showToast({
						 				title:'领取成功 !',
						 				icon: 'none',
						 				duration: 1500
						 			 });
						 		   that.getuserorderList()
						 		}else{
						 			uni.showToast({
						 				title:res.data.message,
						 				icon: 'none',
						 				duration: 1500
						 			});	 
						 		}
						 		
						 	 }
						 });
					}else{
						uni.showToast({
							title:'已自动发放 !',
							icon: 'none',
							duration: 1500
						});
					}				
			   }else{
				  if(type > 2){
				     uni.showToast({
				     	title:'已自动发放 !',
				     	icon: 'none',
				     	duration: 1500
				     });
					return
				  }
				  uni.navigateTo({
				  	 url: 'goodsInfo?i='+this.good_index +"&j=" + index
				  });    
			   }	   
		   }
		}
	}
</script>

<style>
	page {
	  background-color: #f2f2f2;
	}
	.sun {
		padding: 20upx;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.receive-list {
		width: 100%;
		padding: 32upx;
		background-color: #fff;
		margin-bottom: 14upx;
		border-radius: 16upx;
	}
	.receive-top {
		width: 100%;
		display: flex;
	}
	.receive-img {
		width: 130upx;
		height: 130upx;
		border-radius: 12upx;
	}
	.receive-conet {
		flex: 1;
		padding-left: 32upx;
	}
	.receive-title {
		width: 100%;
		font-weight: 500;
		font-size: 32upx;
		color: #000000;
		padding-bottom: 8upx;
	}
	.receive-text {
		font-size: 32upx;
		color: #999999
	}
	.receive-bottom {
		width: 100%;
		padding: 30upx 0;
		color: #666666;
	}
	.receive-button {
		float: right;
		width: 220upx;
		height: 74upx;
		text-align: center;
		line-height: 74upx;
		font-size: 32upx;
		color: #fff;
		/* background: #FF7B00; */
		background: linear-gradient(90deg, #EF7FDF 0%, #7AB9EF 99.48%);
		border-radius: 8upx;
	}
	.popup-Sign {
		width: 670upx;
		background: #FFFFFF;
		border-radius: 24upx;
		padding: 0 48upx;
	}
	.popup-title {
		width: 100%;
		text-align: center;
		font-size: 32upx;
		padding: 40upx 0;
	}
	.popup-input {
		width: 100%;
		height: 96upx;
		background: #F2F2F2;
		border-radius: 8upx;
		padding: 26upx 40upx;
	}
	.popup-button {
		width: 100%;
		height: 96upx;
		background: #FF7B00;
		border-radius: 8upx;
		margin: 40upx 0 80upx 0;
		text-align: center;
		line-height: 96upx;
		font-weight: 500;
		font-size: 32upx;
		color: #FFFFFF;
	}
	.bunt {
		background: #C4C4C4;
	}
	.popup-content {
		background-color: #fff;
		border-radius: 24upx 24upx 0 0;
		padding: 10upx 36upx;
		width: 100%;
	}
	.address-whole {
		width: 100%;
		padding-bottom: 30upx;
	}
	.left-address {
		float: left;
		font-size: 32upx;	
	}
	.right-address {
		float: right;
		width: 484upx;
		height: 88upx;
		background: #F2F2F2;
		border-radius: 12upx;
		padding: 24upx;
	}
	.item-right {
		float: left;
		height: 88upx;
		background: #F2F2F2;
		border-radius: 12upx;
		padding: 24upx;
		width: 148upx;
		margin-left: 20upx;
	}
	.qun-button {
		width: 100%;
		height: 96upx;
		line-height: 96upx;
		text-align: center;
		margin: 30upx 0;
		background: #FC4343;
		border-radius: 48upx;
        font-size: 32upx;
        color: #FFFFFF;
	}
</style>
