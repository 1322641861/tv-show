<template>
	<view class="whole-page">
		  <view class="shop-bkimg">
		  	  <image src="../../../static/images/jf1.png" mode="widthFix" style="width:100%;"></image>
			  <view class="pstop-conet">
					<view class="pstop fl-left" @click="gointegralList()">
						  <image src="../../../static/images/jf3.png" class="ps-jz"></image>
						    {{scoreBalance}}
						  <image src="../../../static/images/you3.png" class="r-img"></image>
					</view>
					<view class="pstop fl-right" @click="gomygift()">
						  <image src="../../../static/images/jf4.png" class="ps-jz2"></image>
						   我的礼品
						  <image src="../../../static/images/you3.png" class="r-img"></image>
					</view>
			  </view>
			  <view class="post-center" @click="goIntegralrule()">规则说明</view>
			   <view class="post-center" style="top:300upx;" @click="goStrategy()">积分攻略</view>  
			  <view class="psbut-conet">
					<view class="cone-item" @click="gocode('bottom')">
						  <image src="../../../static/images/jf2.gif" mode="widthFix"></image>				
					</view>
			  </view>
	     </view>
		 <view class="shop-whole">
		 	  <view class="shop-title">
				   积分抽取礼品 
				  <view class="right-tit" @click="gomoredraw()">
					    更多抽奖 <image src="../../../static/images/you.png"></image>
				  </view>
			  </view>  
		 	  <view class="shop-for">
				    <view class="shop-list" v-for="(item,index) in drawlist" :key="index">
				    	  <view class="shop-img">
				    			<image :src="item.prizeImg" mode="aspectFill"></image>
				    	  </view> 
				    	  <view class="shop-conet">
				    			<view class="conet-title">{{item.prizeName}}</view>
				    			<view class="shop-buttom">
										<!-- <view>
										<view class="label-num"> 
											  限量 {{item.prizeTotalNum}}/{{item.prizeTotalNum*1- item.prizeNum*1}}
										</view>
										</view> -->
				    					<view class="shop-tiem">{{item.endTime}}结束</view>					  
				    			</view>	    			
				    	  </view>
						  <view class="right-shop" @click="godrawinfo(item.id)">
						  	     <view class="shop-button">
									   <view class="but-title">抽1次</view>
									   <view class="but-text">{{item.needScore}}积分</view>
								 </view>
								 <view class="shop-button mag">
									   <view class="but-title">抽10次</view>
									   <view class="but-text">{{item.needScore*10}}积分</view>
								 </view>						 
						  </view>
				    </view> 
		      </view>
		</view>
		<view class="shop-whole" style="padding:0;">
			  <view class="shop-title" style="padding: 40upx 32upx;">积分兑换礼品 </view>  
		     <view class="inte-top">
				   <view class="inte-item" :class="index == inte_index ? 'bunr':''" @click="goindex(index)"
				        v-for="(item,index) in intelist" :key="index">{{item}}</view>
			  </view>
			  <view class="inte-for">
					<view class="inte-list" v-for="(item,index) in exchangelist" :key="index"
					      @click="goIntegralinfo(item.goodsId)">
						  <view class="inte-img">
							    <image :src="item.goodsPic" mode="aspectFill"></image>
								<view class="post-lit">已兑{{item.saled}}</view>
						  </view>
						  <view class="inte-conet">
							    <view class="inte-title">{{item.name}}</view>
								<view class="inte-num">
									  <text>{{item.score}}</text>积分
								</view>
								<view class="inte-price" v-if="item.honeyPrices != 0">
									  <text>+{{item.honeyPrices}}</text>蜜糖
								</view>
								<view class="inte-price" v-if="item.prices != 0">
									  <text>+{{item.prices}}</text>元
								</view>
						  </view>
					</view>
			  </view>
		 </view>
		 <view class="post-activity" style="bottom:39vh;" @click="goactivity">
			   <image src="../../../static/images/jf28.gif" mode="widthFix"></image>	
		 </view>
		 <view class="post-activity" style="bottom:48vh;" @click="goluckDraw()">
		 	  <image src="../../../static/images/jf31.gif" mode="widthFix"></image>	
		 </view>
		 <uni-popup ref="popup_task"  @change="change">
				  <view class="task-whole"  :class="{ 'popup-height': tasktype === 'bottom'}">
					    <view class="task-pstop">
					    	  <view class="task-title">
					    	  		<image src="../../../static/images/jf7.png" mode="widthFix"></image>						     
					    	  </view>						     
					    </view>
					    <view class="task-content">
							  <view class="task-xx" @click="close_code">
								    <image src="../../../static/images/jf13.png"></image>
							  </view>
							  <view class="task-for">
								    <view class="task-list" v-for="(item,index) in tasklist" :key="index">
										  <view class="task-img">
											    <image :src="item.img"></image>
										  </view>
										  <view class="task-conet">
											    <view class="Sign-title">
													 {{item.name}} <image src="../../../static/images/jf12.png"></image>
													<text v-if="item.name == '签到任务'">已连续签到{{item.doneTimes}}天</text>
												</view>
												<view class="Sign-text">
	                                                  <text v-if="item.id == 1">来访积分乐园</text>
													  <text v-if="item.id == 2">邀请新用户收藏艺术品</text>
													  <text v-if="item.id == 3">获得任意一件有效艺术品</text>
													  <text v-if="item.id == 4">合成任意一件有效艺术品</text>
													  <view class="Sign-back">
														   <image src="../../../static/images/jf3.png"></image>
														   <view class="back-text">+{{item.taskScore}}</view>
													  </view>
												</view>
										  </view>
										  <view class="task-button" @click="gotask(item.id,item.name)" 
										       v-if="item.state == 0">去完成</view>
										<!--  <view class="task-button wanc" v-if="item.state == 1">已完成</view> -->
										  <view class="task-button bausn"  @click="goreceive(item.id,item.name)" 
										        v-if="item.state == 1">领取积分</view>
										  <view class="task-button wanc" v-if="item.state == 2">已领取</view>
									</view>
							  </view>
						</view>		
				  </view>
		 </uni-popup>
		 <uni-popup ref="popup_Sign"  @change="change">
		  		 <view class="Sign-content"  :class="{ 'popup-height': Sign_type === 'center'}">
		 			   <image src="../../../static/images/jf15.png" mode="widthFix"></image>	   
		 			   <view class="post-Sign">
						    <view class="sign-center">
								  <view class="sign-img">
									   <image src="../../../static/images/jf3.png"></image>
								  </view>
								  <view class="sign-num">+{{taskScore}}</view>
							</view>
							<view class="sign-shuo">每日签到领积分可兑换礼品</view>
							<view class="sign-buttom" @click="close_type()">好的</view>
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
				scoreBalance:"",
				tasktype:'bottom',
				Sign_type:'center',
				inte_index:0,
				taskScore:"",
				intelist:['1-1000','1001-5000','5001-20000','20001-50000','50000以上'],
				drawlist:[],
				img_url:"",
				exchangelist:[],
				tasklist:[],
				good_min:1,
				good_max:1000
			}
		},
		onLoad() {
		   this.img_url = getApp().globalData.img_url
		   this.getuserInfo()
		   this.getScore()
		   this.getgoodslist()  
		   this.getdrawlist()
		   this.getmyPrize()
		   this.gettasklist()
		},
		onShow(){
		  
		},
		methods: {
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
						 that.userInfo = res.data.data						
					  }else if(res.data.code == 403){
							 uni.showToast({
								title:'登录已失效，重新登录',
								icon: 'none',
								duration: 1000
							 });
							setTimeout(() => {
							   uni.navigateTo({
							 	  url:'../longin/longin'
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
			gotask(id,name){
				if(id == 1){
				   this.gosign()
				}else if(id == 2){
					uni.navigateTo({
						 url: '../my/invitation?inviteCode=' + this.userInfo.inviteCode
					});
				}else if(id == 3){
					uni.navigateTo({
						 url: '../circulation/circulation' 
					});
				}else if(id == 4){
					uni.reLaunch({
						 url: 'synthesis' 
					});
				}			
			},
			goactivity(){
			  uni.navigateTo({
				 url:'activity' 
			  });
			},
			goluckDraw(){
			   uni.navigateTo({
			   	  url:'../home/luckDraw'
			   })	
			},
			goreceive(id,name){
				let that = this
				uni.request({
					 url: getApp().globalData.http_url+'score/task/gain',
					 method:'POST',
					 header:{
						'content-type': 'application/x-www-form-urlencoded',
						'sessionId':  uni.getStorageSync('sessionId')
					 },
					 data:{
						 id:id,
						 name:name,
						 state:1
					 },
					 success: (res) => {
						console.log(res,'领取积分');
						uni.hideLoading()
						that.getScore() 
						that.gettasklist()	
						if(res.data.code == 500){									
										
							uni.showToast({
								title: '领取成功！',
								icon: "success",
								duration: 1000
							})	
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
			gosign(){
			  let that = this
			  uni.request({
			     url: getApp().globalData.http_url+'score/task/sign',
			  	 method:'GET',
			  	 header:{
			  	    'content-type': 'text/json;charset=UTF-8',
			  		'sessionId':  uni.getStorageSync('sessionId')
			  	 },	
			  	 success: (res) => {
			  		console.log(res,'签到');
			  		uni.hideLoading()
			  		if(res.data.code == 200){
						 that.taskScore = res.data.data.taskScore
			  			 that.choet_type('center')	
						 that.gettasklist() 
						 that.goreceive(1,'签到任务')
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
			getScore(){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/task/getScore',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },					 
				   success: (res) => {
					  console.log(res,'用户积分');
					  that.scoreBalance = res.data.data.scoreBalance
					 
				   }
			   });		
			},
			getgoodslist(){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/goods/list',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },					 
				   data:{
					  max:that.good_max,
					  min:that.good_min
				   },
				   success: (res) => {
				  	  console.log(res,'兑换商品列表');
					  that.exchangelist = res.data.data			
				   }
			   });	
			},
			gettasklist(){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/task/list',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },					 
				   success: (res) => {
					  console.log(res,'积分任务列表');			
					  for(var i in res.data.data){
						  if(res.data.data[i].name == '签到任务'){
							 res.data.data[i].img = '../../../static/images/jf8.png'
							 if(res.data.data[i].state == 0){
								 that.gosign()
							 }
						  }else if(res.data.data[i].name == '邀请好友'){
							 res.data.data[i].img = '../../../static/images/jf9.png' 
						  }else if(res.data.data[i].name == '收藏艺术品'){
							 res.data.data[i].img = '../../../static/images/jf10.png' 
						  }else if(res.data.data[i].name == '合成艺术品'){
							 res.data.data[i].img = '../../../static/images/jf11.png'   
						  }
						  
					  }
					  that.tasklist = res.data.data		
				   }
			   });	
			},
			getdrawlist(){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/draw/list',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },
				   data:{
					 type:1  
				   },
				   success: (res) => {
					  console.log(res,'抽奖商品');
					   that.drawlist = res.data.data				
				   }
			   });	
			},
			getmyPrize(){
			   let that = this
			   uni.request({
			       url: getApp().globalData.http_url + 'score/goods/myPrize',
			   	   method:'GET',
			   	   header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
				   },
				   success: (res) => {
					  console.log(res,'我的礼品');
					  			
				   }
			   });	
			},
			godrawinfo(id){
			  uni.navigateTo({
			     url: 'drawinfo?id='+ id
			  });
			},
			gomoredraw(){
			   uni.navigateTo({
			      url: 'moredraw' 
			   });	
			},
			gomygift(){
			  uni.navigateTo({
			     url: 'mygift' 
			  });
			},
			gointegralList(){
			   uni.navigateTo({
			      url: 'integralList' 
			   });
			},
			goIntegralrule(){
			   uni.navigateTo({
			      url: 'Integralrule' 
			   });	
			},
			goStrategy(){
			  uni.navigateTo({
			     url: 'Strategy' 
			  });
			},
			goIntegralinfo(id){
			  uni.navigateTo({
			     url: 'Integralinfo?id='+id
			  }); 
			}, 
			choet_type(type){
				let that = this
				that.Sign_type = type
				that.$refs.popup_Sign.open(type)
			},
			close_type(){
				this.$refs.popup_Sign.close()
				this.close_code()
			},
			gocode(type){
			  this.tasktype = type
			  this.$refs.popup_task.open(type)
			},
			close_code(){
			  this.$refs.popup_task.close()
			},
			goindex(i){
			   this.inte_index = i	
			   if(i == 0){
				   this.good_min = 1
				   this.good_max = 1000
			   }else if(i == 1){
				 this.good_min = 1001
				 this.good_max = 5000  
			   }else if(i == 2){
				 this.good_min = 5001
				 this.good_max = 20000  
			   }else if(i == 3){
				 this.good_min = 20001
				 this.good_max = 50000  
			   }else if(i == 4){
				 this.good_min = 50001
				 this.good_max = 999999  
			   }
			   this.getgoodslist()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
		}
	}
</script>

<style>
	image{
	  width: 100%;
	  height: 100%;
	}
	page{
		background: #FFF1D8;
	}
    .whole-page {
	   min-height: 95vh;
	}
	.shop-bkimg {
		width: 100%;
		margin-bottom: -10upx;
		position: relative;
	}
	.shop-bkimg  image{
		border-radius: 0;
	}
   .pstop-conet {
		width: 100%;
		padding: 32upx;
		position: absolute;
		top: 0;
		left: 0;
   }
   .pstop {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 10upx 22upx;
		color:#fff;
		font-weight: 500;
		font-size: 26upx;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 32upx;
   }
   .ps-jz {
		width:36upx;
		height:36upx;
		margin-right:6upx;
   }
   .ps-jz2 {
		width:40upx;
		height:40upx;
		margin-right:6upx;
   }
   .r-img {
		margin-left: 6upx;
		width: 14upx;
		height: 20upx;
   }
   .psbut-conet {
	  width: 100%;
	  padding: 88upx 48upx;
	  position: absolute;
	  bottom:0;
	  left: 0; 
   }
   .cone-item {
	   margin: 0 auto;
	   width: 360upx; 
   }
   .post-center {
	   background: #26A3FC;
	   position: absolute;
	   right: 0;
	   top: 220upx;
	   padding: 10upx 26upx;
	   font-weight: 500;
	   font-size: 24upx;
	   color: #FFFFFF;
	   border-radius: 32upx 0px 0px 32upx;
   }
   .shop-whole {
	   width: 100%;
	   background-color: #fff;
	   padding: 0 32upx;
	   border-radius: 32upx;
	   margin-bottom: 16upx;
   }
   .shop-title {
	   width: 100%;
	   padding: 40upx 0;
	   font-weight: 500;
	   font-size: 32upx;  
   }
   .inte-top {
	   width: 100%;
	   padding-left:14upx;
   }
   .inte-item {
	   float: left;
	   font-size: 20upx;
	   border: 1upx solid rgba(34, 34, 34, 0.05);
	   border-radius: 2px;
	   padding: 6upx 8upx;
	   margin: 0 4upx;
   }
   .bunr {
   	   color: #FF4848;
   	   font-weight: 500;
   	  background: rgba(255, 72, 72, 0.05);
   	  border: 1upx solid #FF4848; 
   }
   
   .right-tit {
	   float: right;
	  font-size: 24upx;
	  color: rgba(34, 34, 34, 0.56); 
   }
   .right-tit image{
	   float: right;
	   width: 12upx;
	   height: 18upx;
	   margin: 6upx 0 0 6upx;
   }
   .shop-for {
	   width: 100%;
   }
   .shop-list {
	   width: 100%;
	   border-bottom: 1upx solid #F0F0F0;
	   padding-bottom: 40upx;
	   margin-bottom: 40upx;
   }
   .shop-img {
	  width: 160upx;
	  height: 160upx;
	  float: left;
	  border-radius: 8upx;
   }
   .shop-conet {
	   float: left;
	   width: 270upx;
	   margin-left: 24upx;
   }
   .conet-title {
	   width: 100%;
	   font-weight: 500;
	   font-size: 28upx;
   }
   .shop-buttom {
	   width: 100%;
	   margin-top: 6upx;
   }
   .label-num {
	   float: left;
	   background: rgba(255, 123, 0, 0.08);
	   border-radius: 4upx;
	   padding: 6upx 12upx;
	   font-weight: 500;
	   font-size: 20upx;
	   color: #FF7B00;
   }
   .shop-tiem {
	   margin-top: 14upx;
	   width: 100%;
	   font-size: 20upx;
	   color: #222222;
   }
   .right-shop {
	   float: right;
   }
   .shop-button {
	  width: 166upx;
	  height: 68upx;
	  text-align: center;
	  background: #FF7F48;
	  border-radius: 40upx;  
   }
   .but-title {
	 margin-top: 2upx;
	 font-weight: 500;
	 font-size: 26upx;	  
	 color: #FFFFFF; 
   }
   .but-text {
	  color: #FFFFFF;
	  font-size: 20upx;
	  margin-top: -2upx;
   }
   .mag {
	   background:#FF4848;
	   margin-top: 24upx;
   }
   .inte-for {
	   width: 100%;
	   padding: 30upx 12upx;
   }
   .inte-list {
	   width: 50%;
	   float: left;
	   padding: 16upx 14upx;
   }
   .inte-img {
	   width: 100%;
	   height: 324upx;
	   position: relative;
	   border-radius: 16upx 16upx 0px 0px;
   }
   .post-lit {
	   position: absolute;
	   left: 0;
	   top: 0;
	   padding: 8upx 14upx;
	   font-weight: 500;
	   font-size: 16upx;
	   color: #FFFFFF;
	   border-radius: 16upx 0px;
	   background: rgba(0, 0, 0, 0.8);
   }
   .inte-conet {
	   width: 100%;
	   height: 142upx;
	   padding: 12upx;
   }
   .inte-title {
	   width: 100%;
	   font-size: 28upx;
	   color: #222222;
	   text-overflow: -o-ellipsis-lastline;
	   text-overflow: ellipsis;
	   display: -webkit-box;
	   -webkit-line-clamp: 1;
	   line-clamp: 1;
	   -webkit-box-orient: vertical;
   }
   .inte-num {
	   font-weight: 500;
	   font-size: 20upx;
	   padding: 8upx 0 4upx 0;
   }
   .inte-num text{
	    font-size: 28upx;
		font-weight: 500;
		padding-right: 4upx;
   }
   .inte-price {
	   font-weight: 500;
	   font-size: 20upx;
	   color: #FF7B00;
   }
   .inte-price text{
   	    font-size: 28upx;
		font-weight: 500;
   		padding-right: 4upx;
		color: #FF7B00;
   }
   .task-whole {
	   width: 100%;
	   position: relative;
   }
   .task-pstop {
	   width: 100%;
	   position: absolute;
	   top: 0;
   }
   .task-title {
	   width: 436upx;
	   margin:  0 auto;
   }
   .task-content {
	   width: 100%;
	   margin-top: 130upx;
	   background: linear-gradient(180deg, #FFD0A4 0%, #FFF7EF 45.31%);
	   border-radius: 40upx 40upx 0px 0px;
   }
   .task-xx {
	   width: 100%;
	   padding: 30upx;
	   text-align: right;
   }
   .task-xx image {
	   width: 48upx;
	   height: 48upx;
   }
   .task-for {
	   width: 100%;
	   padding: 32upx;
	   min-height: 600upx;
   }
   .task-list {
	   width: 100%;
	   padding: 34upx 0;
   }
   .task-img {
	   float: left;
	   width: 96upx;
	   height: 96upx;
   }
   .task-conet {
	   float: left;
	   margin-left: 16upx;
   }
   .Sign-title {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  font-weight: 500;
	  font-size: 32upx;	  
   }
   .Sign-title image{
	   width: 24upx;
	   height: 24upx;
	   margin: 0 8upx;
   }
   .Sign-title text{
	   font-size: 28upx;
	   font-weight: 400;
   }
   .Sign-text {
	   padding-top: 8upx;
   }
   .Sign-text text{
	   float: left;
	   padding-top: 8upx;
	   font-size: 24upx;
	   color: rgba(34, 34, 34, 0.56);
   }
   .Sign-back {
	   float: left;
	   margin-left: 8upx;
   }
   .Sign-back image{
	   float: left;
	   width: 42upx;
	   height: 42upx;
   }
   .back-text {
	   float: left;
	   padding: 2upx 14upx;
	   font-size: 24upx;
	   color: #FF7B00;
	   margin:6upx 0 0  -12upx;
	   background: rgba(255, 123, 0, 0.08);
	   border-radius: 0px 20upx 20upx 0px;
   }
   .task-button {
	   float: right;
	   width: 166upx;
	   height: 68upx;
	   line-height: 68upx;
	   text-align: center;
	   background: #FF4848;
	   border-radius: 40upx;
	   font-weight: 500;
	   font-size: 28upx;
	   color: #FFFFFF;
	   margin-top: 20upx;
   }
   .wanc {
	 background: rgba(255, 72, 72, 0.5);  
   }
   .bausn {
	 background: #FF7F48;  
   }
   .Sign-content {
	   width: 550upx;
	   position: relative;
   }
   .post-Sign {
	   width: 100%;
	   top: 140upx;
	   position: absolute;
   }
   .sign-center {
      width: 240upx;
	  height: 240upx;
	  margin: 0 auto;
	  background: radial-gradient(100% 100% at 0% 0.02%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.42) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
	  border: 1upx solid rgba(255, 255, 255, 0.5);
	  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
	  backdrop-filter: blur(24upx);
	  border-radius: 32upx; 
   }
   .sign-img {
	   width: 112upx;
	   height: 112upx;
	   margin: 24upx auto;
   }
   .sign-num {
	   width: 100%;
	   text-align: center;
	   font-weight: 600;
	   font-size: 52upx;
	   color: #FF7B00;
   }
   .sign-shuo {
	   width: 100%;
	   text-align: center;
	   font-size: 28upx;
	   color: rgba(34, 34, 34, 0.56);
	   padding: 48upx 0;
   }
   .sign-buttom {
	   width: 384upx;
	   height: 88upx;
	   line-height: 88upx;
	   text-align: center;
	   background: #FF7F48;
	   border-radius: 44upx;
	   margin: 0 auto;
	   font-weight: 500;
	   font-size: 32upx;
	   color: #FFFFFF;
   }
   .post-activity {
	   position: fixed;
	   right: 40upx;
	   width: 134upx;
   }
</style>
