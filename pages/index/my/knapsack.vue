<template>
	 <view class="whole-page">
		   <view class="post-flex">
			     <view class="type-flex">   
					  <view class="type-item"  @click="gotype(1)"
						   :class="pedtype == 1 ? 'whot':''">
							卡券
							<view class="type-borde" v-if="pedtype == 1"></view>
					  </view>
					  <view class="type-item"  @click="gotype(2)"
						   :class="pedtype == 2 ? 'whot':''">
							勋章
							<view class="type-borde" v-if="pedtype == 2"></view>
					  </view>	  
				 </view>
				<view class="flex-button" v-if="pedtype == 1">
					  <view class="flex-item"  @click="goindex(1)"
						   :class="type_index == 1 ? 'guot':''">
							待使用		
					  </view>
					  <view class="flex-item"  @click="goindex(2)"
                           :class="type_index == 2 ? 'guot':''">
						   已使用/已过期
					  </view>	  
				 </view>
		  </view>
		  <view class="knaps-whole" style="padding-top:230upx;" v-if="pedtype == 1">
			    <view class="knaps-list"  v-for="(item,index) in knapslist">
					  <image src="../../../static/images/yx1.png" v-if="item.levelStr == 'A'"></image>
					  <image src="../../../static/images/yx2.png" v-if="item.levelStr == 'R'"></image>
					  <image src="../../../static/images/yx3.png" v-if="item.levelStr == 'S'"></image>
					  <view class="knaps-conet" :class="item.stuatus != 1 ? 'backs':''">
						    <view class="left-knaps">
								  <view class="knaps-title">优先抢购卡</view>
								  <view class="knaps-text">提前{{item.numericalValue}}分钟购买藏品</view>
							</view>
							  <!-- "stuatus": 1, //状态  1 有效  2失效  3已使用 -->
							<view class="knaps-right">
								  <view class="knaps-button" @click="gohome"
								       v-if="item.stuatus == 1">去使用</view>
								  <view class="knaps-button" v-if="item.stuatus == 2">已过期</view>
								  <view class="knaps-button" v-if="item.stuatus == 3">已使用</view>
								  <view class="knaps-tiem">{{item.endTime}}到期</view>
							</view>						
					  </view>
				</view>
		  </view>
		  <view class="knaps-whole" v-if="pedtype == 2">
			    <view class="medal-list" v-for="(item,index) in knapslist">
					  <view class="medal-imge">
						   <image :src="img_url+item.pic"></image>
					  </view>
					  <view class="medal-title">{{item.levelStr}}</view>
					  <view class="medal-buttom">设为头像</view>
				</view>
		  </view>
	 </view>
</template>

<script>
	export default {
		data() {
			return {
			   pedtype:1,
			   type_index:1,
			   knapslist:[],
			   pageNum:1,
			   img_url:""
			}
		},
		onLoad(e) {
			this.img_url = getApp().globalData.img_url
		},
		onShow() {
			this.pageNum = 1
			this.knapslist = []
			this.getmessageList()
		},
		onReachBottom() {
			let that = this
			console.log('触底刷新')
			uni.showLoading({
				title: '加载中...',
				mask:true
			});
			that.pageNum++
			console.log(that.pageNum)
			that.getmessageList()		
		},
		methods: {
			gohome(){
				uni.switchTab({
					url:'../home/home'
				});
			},
			getmessageList(){
				let that = this
				uni.request({
				     url: getApp().globalData.http_url + 'user/rights/list',
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						  'sessionId':  uni.getStorageSync('sessionId')
					 },					 
					 data:{
						 type:that.pedtype,
						 pageNum:that.pageNum,
						 pageSize:20,
						 status:that.type_index
					 },
				     success: (res) => {
						console.log(res,'我的背包');
						if(res.data.code == 200){
							uni.hideLoading()
							if(res.data.data == '' && that.pageNum > 1){
								uni.showToast({
									title:'已经到底了',
									icon: 'none',
									duration: 1000
								});
							}else{
								that.knapslist = that.knapslist.concat(res.data.data)
							}
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
		   gotype(e){
			   this.pedtype = e
			   this.pageNum = 1
			   this.knapslist = []
			   this.getmessageList()
		   },
		   goindex(e){
			  this.type_index = e
			  this.pageNum = 1
			  this.knapslist = []
			  this.getmessageList() 
		   }
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
		
	.post-flex {
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}
	.type-flex {
		width: 100%;
		padding:30upx 80upx 0 80upx;
		display: flex;
	}
	.type-item {
		flex: 1;
		color: #666666;
		font-size: 32upx;
		text-align: center;
	}
	.type-borde {
		background: #222222;
		border-radius: 2px;
		width: 40upx;
		height: 4upx;
		margin: 20upx auto 0 auto;
	}
	.whot {
		font-weight: 500;
		color: #222222;
	}
	.flex-button {
	   width: 100%;
	   padding: 30upx;
	}
	.flex-item {
		padding: 12upx 32upx;
		float: left;
		background: rgba(34, 34, 34, 0.05);
		border-radius: 28upx;
		font-size: 24upx;
		color: #666666;
		margin-right: 30upx;
	}
	.guot {
	  background: #222222;
	  color: #FFFFFF;	  
	}
	.knaps-whole {
		width: 100%;
		min-height: 90vh;
		padding: 100upx 20upx 20upx 20upx;
	}
	.knaps-list {
		width: 100%;
		height: 194upx;
		position: relative;
		margin-bottom: 16upx;
	}
	.knaps-conet {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 20upx;
		padding: 40upx 0 0 160upx;
	}
	.knaps-title {
		font-weight: 600;
		font-size: 36upx;
		color: #FFFFFF;
		padding: 12upx 0;
	}
	.knaps-text {
		font-weight: 500;
		font-size: 22upx;
		color: #FFFFFF;
	}
	.left-knaps{
		float: left;
	}
    .knaps-right {
		float: right;
		width: 260upx;
	}
	.knaps-button {
		width: 184upx;
		height: 64upx;
		text-align: center;
		line-height: 64upx;
		background: #FFFFFF;
		border-radius: 40upx;
		color: #54666C;
		font-weight: 500;
		font-size: 32upx;
		margin: 20upx auto 0 auto;
	}
	.knaps-tiem {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		color: #FFFFFF;
		padding-top: 8upx;
	}
	.backs {
		background: rgba(0, 0, 0, 0.3);
		opacity: 0.5;
	}
	.medal-list {
		width: 50%;
		float: left;
		margin-top:20upx;
	}
	.medal-imge {
		width: 240upx;
		height: 268upx;
		margin: 0 auto;
		border-radius: 20upx;
	}
	.medal-title {
		width: 100%;
		text-align: center;
		font-weight: 500;
		font-size: 32upx;		
		color: #222222;
		padding: 16upx 0;
	}
	.medal-buttom {
		width: 240upx;
		height: 56upx;
		margin: 0 auto;
		text-align: center;
		line-height: 56upx;
		background: #222222;
		border-radius: 28upx;
		font-weight: 500;
		font-size: 24upx;
		color: #FFFFFF;
	}
</style>
