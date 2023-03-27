<template>
	<view class="whole-page">
		 <view class="activity-top">
			   <view class="act-whole"> 
				    <view class="actg-title">限时活动规则：</view>
				     <view class="activity-text">
						年9月9日起，新老用户可以通过购买的方式来获得藏品，并将其冷冻48小时，以此获得积分，用来兑换奖品或抽奖。
						 冷冻不同等级的藏品会获得不同的积分（详情可查看9月8日公众号文章）。
						 <image src="../../../static/images/you.png" @click="gomore('center')"></image>
						 <text @click="gomore('center')">查看更多</text>
				    </view>
			    </view>
		       <view class="activity-num">已获积分：{{dataInfo.countScore}}</view>
		 </view>
		 <view class="activity-title">
			   <view class="act-title">正在冷冻中的艺术品</view>
		 </view>
		 <view class="act-work">
			   <view class="work-for" v-for="(item,index) in dataInfo.frozenArray" :key="index">
				     <view class="work-img">
						   <image :src="item.ddcPic"></image>
						   <view class="post-numt">
							     <view>{{item.ddcName}}</view><text>x{{item.ddcNumber}}</text>
						   </view>
					 </view>
					 <view class="work-text">剩余{{item.timeLeft}}</view>
			   </view>
		 </view>
		 <view style="padding: 0 32upx;">
			   <view class="activity-title" style="padding:32upx 0;border-bottom: 1upx solid #F0F0F0;">
				     <view class="act-title">选择艺术品</view>
				     <view class="act-xuan" :class="xuantext == '取消全选' ? 'fik':''" 
					 @click="goquanxuan()">{{xuantext}}</view>
			   </view>
		 </view>
		 <view class="work-whole">
			   <view class="work-list" v-for="(item,index) in worklist" :key="index">
					 <view class="work-img" style="height:164upx;" @click="getxuan(item,index)">
						   <view class="xuan-post" :class="item.is_xuan == 1 ? 'bort':''">
							     <image src="../../../static/images/jf30.png" v-if="item.is_xuan == 1"></image>
						   </view>
						   <image :src="item.ddcPic"></image>
						   <view class="post-numt">
								 <view>{{item.ddcName}}</view><text>x{{item.ddcNumber}}</text>
						   </view>
					 </view>
					 <view class="work-quantity">
						   <view class="quan-imge" @click="goreduce(index)"
						        style="border-radius: 20upx 0 0 20upx;">
							     <image src="../../../static/images/jian1.png"></image>
						   </view>
						   <view class="quan-text">{{item.number}}</view>
						   <view class="quan-imge" @click="goplus(item,index)"
						        style="border-radius: 0  20upx 20upx 0;">
						   	     <image src="../../../static/images/jia.png"></image>
						   </view>
					 </view>
			   </view>
		 </view>	
		 <view class="post-buttom">
			   <view class="post-button" @click="gofrozenDDC()">开始冷冻</view>
		 </view>
		 <uni-popup ref="popup_Sign"  @change="change">
		  		 <view class="text-content"  :class="{ 'popup-height': Sign_type === 'center'}">
		 			   <view class="title-conet">活动规则</view>
					   <view class="conet-whole">
						    <view class="conet-title">限时活动规则：</view>
						     <view class="conet-item">
						     	   1、冷冻的藏品必须是活动开启后新购买到的藏品。				     
						     </view>
							 <view class="conet-item">
							 	   2、冷冻期间无法自行解除，需等待48小时后系统自动解除冷冻状态。			     
							 </view>
							 <view class="conet-item">
							 	   3、冷冻积分将会在冷冻时间结束后发放到账户中。		     
							 </view>
							 <view class="conet-item">
							 	   4、战姬系列暂时不参与此次活动（无法冷冻）。		     
							 </view>
							 <view class="conet-item">
								   5、活动将会暂时关闭转赠功能。
							 </view>
							 <view class="conet-item">
							 	    测试期间，活动规则及获得积分的数量将会随时调整。
							 </view>
							 <view class="conet-item">
								   最终解释权归平台所有。
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
			  dataInfo:"",
			  Sign_type:'center',
			  worklist:[],
			  runtlist:[],
			  xuantext:'全选'
			}
		},
		onLoad(){
		    this.getfrozenInfo()
		},
		methods: {
			gofrozenDDC(){
			   let that = this
			   if(that.runtlist == ''){
				   uni.showToast({
						title:'请选择冻结的藏品',
						icon: 'none',
						duration: 1000
				   }); 
				   return
			   }
			   
			   uni.showLoading({
					title:'冻结中',
					mask:true
			   });
			   var data = JSON.stringify(that.runtlist) 
			   console.log(data)
			   uni.request({
			   	 url: getApp().globalData.http_url+'bsn/ddc/frozenDDC',
			   	 method:'POST',
			   	 header:{
			   		'content-type':'application/x-www-form-urlencoded',
			   		'sessionId':  uni.getStorageSync('sessionId')
			   	 },
			   	 data:{
					 array:data
				 },
			   	 success: (res) => {
			   		console.log(res,'冻结');
					uni.hideLoading()
			   		if(res.data.code == 200){													
			   			uni.showToast({
			   				title: '冻结成功！',
			   				icon: "success",
			   				duration: 1500
			   			})	
						setTimeout(() => {
							uni.navigateBack({
								delta:1,//返回层数，2则上上页
							})
						}, 1000)
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
			gomore(type){
				let that = this
				that.Sign_type = type
				that.$refs.popup_Sign.open(type)
			},
			close_type(){
				this.$refs.popup_Sign.close()
				this.close_code()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			// 减数量
			goreduce(i){
				let that = this
				if(that.worklist[i].number > 0){
					that.worklist[i].number--
				}
			},
			// 加数量
			goplus(item,j){
				let that = this
				if(that.worklist[j].number < that.worklist[j].ddcNumber){
					that.worklist[j].number++
				}		
				console.log(that.worklist)
			},
			goquanxuan(){
				let that = this
				var list = []
				if(that.runtlist.length == that.worklist.length){
					for(var i in that.worklist){
						that.worklist[i].is_xuan = 0
					}
					that.xuantext = '全选'
					that.runtlist = ''
				}else{
					that.xuantext = '取消全选'
					for(var i in that.worklist){
						that.worklist[i].is_xuan = 1
						var data = {ddcId:that.worklist[i].ddcId,number:that.worklist[i].number}
						list.push(data)
					}
					 that.runtlist = list
				}		
			    console.log(that.runtlist,that.worklist)	 
			},
			getxuan(item,j){
				console.log(item,j)
				let that = this
				if(that.worklist[j].is_xuan == 0){
					that.worklist[j].is_xuan = 1			
					var data = {ddcId:that.worklist[j].ddcId,number:that.worklist[j].number}
					that.runtlist.push(data)		
				}else{
					that.worklist[j].is_xuan = 0
					if(that.runtlist.length == 1){
						that.runtlist = []
						return
					}
				    that.runtlist.splice(j,1)		
				}
				 console.log(that.runtlist,that.worklist)
			},
			getfrozenInfo(){
				let that = this
				uni.request({
					 url: getApp().globalData.http_url+'bsn/ddc/frozenInfo',
					 method:'GET',
					 header:{
						'content-type': 'text/json;charset=UTF-8',
						'sessionId':  uni.getStorageSync('sessionId')
					 },
					 success: (res) => {
						console.log(res,'冻结页面');
						if(res.data.code == 200){		
							for(var i in res.data.data.frozenArray){
								res.data.data.frozenArray[i].timeLeft = that.dateCount(res.data.data.frozenArray[i].timeLeft)
							}
							that.dataInfo = res.data.data 
							that.worklist = res.data.data.collectionsArray
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
			dateCount(endTime){
			        var until= new Date(endTime);     
			        var days = (until)/1000/3600/24; 
			        var day = Math.floor(days);
			        var hours = (days - day)*24;
			        var hour = Math.floor(hours);
			        var minutes = (hours - hour)*60;
			        var minute = Math.floor(minutes);
			        var seconds = (minutes - minute)*60;
			        var second = Math.floor(seconds);
			        var back = day+'天'+hour+'时'+minute+'分';
			        return back;
		    },
	    }
	}
</script>

<style>
  page {
	background-color: #fff;
  }
  image{
	  width:100%;
	  height:100%;
  }
  .whole-page {
	  padding-bottom: 200upx;
  }
  .activity-top {
	  width: 100%;
	  padding: 24upx 32upx 0 32upx;
  }
  .act-whole {
	  width: 100%;
	  background: #F9F9F9;
	  border-radius: 8upx;
	  padding: 20upx 24upx;
  }
  .actg-title {
	  width: 100%;
	  font-size: 28upx;
	  padding-bottom: 16upx;
  }
  .activity-text {
	  width: 100%;
	  color: #666666;
	  font-size: 24upx;
  }
  .activity-text text {
  	   float: right;
  	   color: #999999;
  	  font-size: 24upx;
  	  color: rgba(34, 34, 34, 0.56); 
  }
  .activity-text image{
  	   float: right;
  	   width: 12upx;
  	   height: 18upx;
  	   margin: 8upx 0 0 6upx;
  }
  
  .activity-num {
	  width: 100%;
	  height: 74upx;
	  line-height:74upx;
	  padding: 0 24upx;
	  background: rgba(255, 127, 72, 0.08);
	  border: 1upx solid #FFF2E7;
	  border-radius: 8upx;
	  font-weight: 500;
	  font-size: 28upx;
	  color: #FF7F48;
	  margin-top:24upx;
  }
  .activity-title {
	  width: 100%;
	  font-weight: 500;
	  font-size: 32upx;
	  padding: 32upx;
  }
  .act-title {
	  float: left;
	  font-weight: 500;
	  font-size: 32upx;
  }

  .act-xuan {
	  float: right;
	  font-size: 28upx;
  }
  .act-work {
	  width: 96%;
	  display: -webkit-box;
	  overflow-x: scroll;
	  padding-left:32upx;
  }
  .work-for {
	  width: 144upx;
	  margin-right: 8upx;
  }
  .work-img{
	  width: 100%;
	  height: 144upx;
	  position: relative;
	  border-radius: 12upx;
  }
  .xuan-post {
	  position: absolute;
	  width:32upx;
	  height:32upx;
	  top: 10upx;
	  right:10upx;
	  z-index:2;
	  border-radius: 50%;
	  border: 1upx solid #FFFFFF;
  }
  .bort {
	  border: none;
  }
  .work-text {
	 width: 100%;
	 padding: 16upx 0;
	 text-align: center;
	 font-size: 18upx;
  }
  .post-numt {
	  width: 100%;
	  background: rgba(34, 34, 34, 0.8);
	  border-radius: 0px 0px 12upx 12upx;
	  padding: 8upx;
	  position: absolute;
	  bottom:0;
	  left:0;
  }
  .post-numt view{
	  float: left;
	  width: 67%;
	  font-size: 18upx;
	  color: #FFFFFF;
	  text-overflow: -o-ellipsis-lastline;
	  text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp: 1;
	  line-clamp: 1;
	  -webkit-box-orient: vertical;
  }
  .post-numt text{
	  float: right;
	  font-size: 18upx;
	  color: #FFFFFF;
  }
  .work-whole {
	  width: 100%;
	  padding: 24upx;
  }
  .work-list {
	 width: 160upx;
	 margin:0 8upx;
     float: left;
  }
  .work-quantity {
	  width: 100%;
	  height: 40upx;
	  display: flex;
	  margin: 16upx 0 30upx 0;
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
  }
  .quan-imge {
	  width: 48upx;
	  height: 40upx;
	  background: #F0F0F0;
	  text-align: center;
  }
  .quan-imge image{
	  width: 20upx;
	  height:20upx;  
  }
  .quan-text {
	 width: 54upx;
	 height: 40upx;
	 margin: 0 2upx;
	 background: #F0F0F0;
	 text-align: center;
	 line-height: 40upx;
  }
  .post-buttom {
  	  width: 100%;
  	  background-color: #fff;
  	  position: fixed;
  	  bottom: 0;
  	  z-index: 9;
	  border-top: 1upx solid #F0F0F0;
  	  padding: 48upx 40upx 60upx 40upx;
  }
  .post-button {
  	  width: 100%;
  	  height: 96upx;
  	  text-align: center;
  	  background: #FF4848;
  	  border-radius: 48upx;
  	  font-weight: 500;
	  line-height: 96upx;
	  color: #FFFFFF;
	  font-weight: 500;
	  font-size: 32upx;
  }
  .fik {
	  color: #666666;
  }
  .text-content {
	  width: 580upx;
	  background: #FFFFFF;
	  border-radius: 32upx;
	  padding: 40upx;
  }
  .title-conet {
	  width: 100%;
	  position: relative;
	  font-weight: 500;
	  font-size: 32upx;
	  color: #222222;
	  text-align: center;
      padding-bottom:40upx;
  }
  .conet-whole {
	  width: 100%;
	  height: 420upx;
	  overflow-y: scroll;
  }
  .conet-title {
	  width: 100%;
	  padding-bottom: 16upx;
	  font-size: 28upx;  
  }
  .conet-item {
	  width: 100%;
	  font-size: 28upx;
	  color: #666666;
	  padding-bottom: 10upx;
  }
  
</style>
