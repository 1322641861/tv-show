<template>
	<view>
		 <!-- <image src="../../../../static/images/dw.png" mode="widthFix"></image> -->
		 <view class="orfficer-user">
			   <view class="user-img">
				     <image :src="spreadData.avatarUrl"></image>
			   </view>
			   <view class="user-conet">
				     <view class="user-name">{{spreadData.userName}}
					       <image src="../../../../static/img/xtg2.png" @click="goaddPushOfficer"></image>
					</view>
					 <view class="user-grade" :class="spreadData.level == 0 ? 'giks':''">
						   <image :src="spreadData.levelImg" mode="widthFix"></image>
					 </view>

			   </view>
		 </view>
		 <view class="orfficer-text">
			   <text v-if="spreadData.nextLevelNeedBill > 0">下一级还需要{{spreadData.nextLevelNeedBill}}流水，</text>
			   <text v-if="spreadData.nextLevelNeedGoldUser > 0">下一级还需要邀请{{spreadData.nextLevelNeedGoldUser}}个黄金用户，</text>
			   <text v-if="spreadData.nextLevelNeedDiamondUser > 0">下一级还需要邀请{{spreadData.nextLevelNeedDiamondUser}}个钻石用户，</text>
			   <text v-if="spreadData.nextLevelNeedEffectiveUser > 0">下一级还需要邀请{{spreadData.nextLevelNeedEffectiveUser}}个有效用户</text></view>	 
		 <view class="whole-padd">
			   <view class="post-ranking">
				     <view class="ranking-nav">
						  <view class="nav-item" @click="openPopupGoods">
								<view class="nav-img">
									  <image src="../../../../static/img/ph1.png"></image>
								</view>
								<view class="nav-text">邀请星推官</view>
						  </view>
						  <view class="nav-item" @click="goInvitationList">
								<view class="nav-img">
									  <image src="../../../../static/img/ph2.png"></image>
								</view>
								<view class="nav-text">邀请记录</view>
						  </view>
						  <view class="nav-item" @click="gopushIncome">
								<view class="nav-img">
									  <image src="../../../../static/img/ph3.png"></image>
								</view>
								<view class="nav-text">推广收益</view>
						  </view>
						  <view class="nav-item" @click="goPushSource">
								<view class="nav-img">
									  <image src="../../../../static/img/ph4.png"></image>
								</view>
								<view class="nav-text">推广素材</view>
						  </view>
				     </view>
			   </view>
			   <view class="whole-ranking">
				     <view class="whole-nav">
						   <view class="ran-item" @click="goranIndex(1)">
							      <view class="ranking-text" :class="ranIndex == 1 ? 'pai':''">增速排行榜</view>
								  <view class="ranking-border" v-if="ranIndex == 1"></view>
						   </view>
						   <view class="ran-item" @click="goranIndex(2)">
								  <view class="ranking-text" :class="ranIndex == 2 ? 'pai':''">流水排行榜</view>
								  <view class="ranking-border" v-if="ranIndex == 2"></view>
						   </view>
					 </view> 
					 <view class="ranking-padd">
							 <view class="ranking-explain" v-if="ranIndex == 1">
								   每月底24点统计本月推广流水比上月的增速比，从大到小前10名星推官瓜分本月平台流水的{{spreadData.velocityRankingPercentage}}%，计算方式为：(本月流水-上月流水）/上月流水
							 </view>
							 <view class="ranking-explain" v-if="ranIndex == 2">
							       每月底24点统计本月推广流水额，从大到小排名前10名星推官瓜分平台本月流水{{spreadData.billRankingPercentage}}%
							 </view>
							 <view class="ranking-back">
								   <view class="ranking-haed">
										  <view class="haed-item" style="text-align: left;">排名</view>
										  <view class="haed-item">用户</view>
										  <view class="haed-item" style="text-align: right;">{{ranIndex == 1 ? '当前增速':'流水额(元)'}}</view>
								   </view>
								   <view class="ranking-for">
										  <view class="ranking-list" v-for="(item,index) in rankingData.rankings" :key="index">
												<view class="list-left">
													  <image src="../../../../static/img/dt1.png" v-if="index==0"></image>
													  <image src="../../../../static/img/dt2.png" v-if="index==1"></image>
													  <image src="../../../../static/img/dt3.png" v-if="index==2"></image>
													  <view class="left-text" v-if="index>=3">{{index}}</view>
												</view>
												<view class="list-conet">
													  <image :src="item.pic"></image>
													   {{item.userName}}
												</view>
												<view class="list-right">{{item.rank}}{{ranIndex == 1 ? '%':''}}</view>
										  </view>
								   </view>
							 </view>
							 <view class="ranking-user">
								   <view class="ranking-list">
										<view class="list-left" style="width:100upx;">
											  <view class="left-text" style="font-size:26upx;"> 
											       {{rankingData.rank == 0 ? '未上榜': rankingData.rank}}
											 </view>
										</view>
										<view class="list-conet" style="padding-left:70upx;">
											  <image :src="rankingData.pic"></image>
											    {{rankingData.userName}}
											  <text>自己</text>
										</view>
										<view class="list-right">{{rankingData.value}}</view>
								   </view>						   
							 </view>
					 </view>
			   </view>
		 </view>
		 <uni-popup ref="popupGoods" type="bottom">
				<view class="popup-whole">
				      <view class="popup-title">
						    邀请星推官 <image src="../../../../static/images/xx2.png" @click="closePopupGoods"></image>
					  </view>
					  <view class="popup-nav">
						   <view class="ran-popup" @click="gopopIndex(1)">
								  <view class="ranking-text" :class="popIndex == 1 ? 'pai':''">精选海报</view>
								  <view class="ranking-border" v-if="popIndex == 1"></view>
						   </view>
						   <view class="ran-popup" @click="gopopIndex(3)">
								  <view class="ranking-text" :class="popIndex == 3 ? 'pai':''">独立二维码</view>
								  <view class="ranking-border" v-if="popIndex == 3"></view>
						   </view>
						   <view class="ran-popup" @click="gopopIndex(2)">
								  <view class="ranking-text" :class="popIndex == 2 ? 'pai':''">推广链接</view>
								  <view class="ranking-border" v-if="popIndex == 2"></view>
						   </view>
					  </view>
					  <view class="whole-bill">
						    <view class="action-swiper" v-if="popIndex == 1">
						    	  <view class="swiper-img">
						    	  	  <swiper  indicator-active-color="#fff" next-margin="270rpx"
						    	  	     :current="current"  @change="goswiper">
						    	  	  	 <swiper-item v-for="(item,index) in newPicArry" :key="index" @click="previewImage(index)">
						    	  	  		   <image :src="item.pic" v-if="item.can == ''"></image>
						    				   <image :src="item.can" v-if="item.can != ''"></image>
						    	  			   <canvas :canvas-id="'myCanvas'+index" style='opacity:0;width:320px;height:424px'/>
						    	  	  	 </swiper-item>
						    	  	  </swiper>
						    	  </view>
						    </view>
						    <view class="action-code" v-if="popIndex == 3">
							      <view class="code-img">
									    <image :src="code_img"></image>
								  </view>	 
								  <!-- #ifdef APP-PLUS -->
								   <view class="code-button" @click="goAlipay()">保存二维码</view>
								  <!-- #endif -->
								  <!-- #ifdef H5 -->
									   <view class="bind-text">点击预览长按保存海报</view>
								  <!-- #endif -->
						    </view>
							 <view class="action-for" v-if="popIndex == 2">
								  <view class="action-list" v-for="(item,index) in actionList" :key="index">
									    <image src="../../../../static/img/xtg3.png"  mode="widthFix"></image>
										 <view class="post-link">
											   <view class="link-text">{{item}}</view>
											   <view class="link-button" @click="copylike(item)">复制</view>
										 </view>			    
								  </view>
						    </view>
					  </view>
				</view>
		 </uni-popup>
	</view> 
</template>

<script>
	import {
	    SpreadInfo,
		rankingList,
		posterOrLanguage,
		userInfo
	} from '@/api/officer.js';
	import QRCode from 'qrcode';
	export default {
		data() {
			return {
				ranIndex:1,
				popIndex:1,
				current:0,
				spreadData:"",
				newPicArry:[],
				actionList:[],
				rankingData:"",
				userInfo:"",
				QRlink:"",
				code_img:""
			}
		},
		onLoad() {
			this.getSpreadInfo()
			this.getUserInfo()
			this.getrankingList()
			this.getposterOrLanguage()
		},
		methods: {
			copylike(text){
				let that = this
				uni.setClipboardData({ 
					data:text,
					success: function () {
						console.log('success');
						uni.hideKeyboard();   //  隐藏软键盘
						uni.showToast({
							title:'已复制',
							icon: 'none',
							duration: 1500
						});
					}
				});
			},
			getSpreadInfo(){
				let that = this
				SpreadInfo().then(res => {
					console.log(res)
					res.data.levelImg = '../../../../static/img/grade'+res.data.level+'.png'
					that.spreadData = res.data
				})
			},
			getUserInfo() {
			    let that = this
				userInfo().then(res => {
					 console.log(res,'用户信息')
					 that.userInfo = res.data	 
					 that.QRlink = getApp().globalData.http_add+'?inviteCode='+ res.data.inviteCode
					 that.goiscode()
				})
			},
			getposterOrLanguage(){
				let that = this
				posterOrLanguage({
					type:that.popIndex
				}).then(res => {
					console.log(res,'海报or推广用语')
					if(that.popIndex == 1){
						var list = []
						res.data.filter(i => {
							var data = {pic:i,can:""}
							list.push(data)
						})
						that.newPicArry = list
					}else{
						for(var c in res.data){
							res.data[c] = res.data[c] + that.QRlink
						}
						that.actionList = res.data
						console.log(that.actionList)
					}
					
				})
			},
			//生成二维码
			goiscode(){
			  let that = this
			  let opts = {
				   errorCorrectionLevel: "L",//容错级别
				   type: "image/png",//生成的二维码类型
				   quality: 0.3,//二维码质量
				   margin: 2,//二维码留白边距
				   width: 200,//宽
				   height: 200,//高
				   text:that.QRlink,//二维码内容
				   color: {
						dark: "#666666",//前景色
						light: "#fff"//背景色
				   }
				};
				//this.QRlink 生成的二维码地址url
				QRCode.toDataURL(that.QRlink, opts , (err, url) => {
					  if (err) throw err
					  //将生成的二维码路径复制给data的QRImgUrl
					   that.code_img=url
						  
			  }) 
			},
			getrankingList(){
			   let that = this
			   rankingList({
				   type:that.ranIndex
			   }).then(res => {
			      console.log(res,'排行榜')
			       that.rankingData = res.data
			   })	
			},
			previewImage(index) {
				//uniapp预览轮播图
				var list = []
				this.newPicArry.filter(i => {
					list.push(i.can)
				})
				uni.previewImage({
					current: index, //预览图片的下标
					urls: list
				})
			},
			goswiper(e){
			  var i = e.detail.current 
			  this.current = e.detail.current
			  // var ht = this.newPicArry[i].pic.substring(0,5)
			  // console.log(ht)
				 //  if(ht == 'https' || ht == '../..'){
					//    this.getcanvas(this.ut_code)
				 //  }
			  console.log(this.current)  	
			},
			openPopupGoods(){
				this.$refs.popupGoods.open()
					    			
			},
			closePopupGoods(){
				this.$refs.popupGoods.close()
			},
			goaddPushOfficer(){
			   uni.navigateTo({
			       url: '/pages/index/my/PushOfficer/addPushOfficer'
			   })	
			},
			goInvitationList(){
			   uni.navigateTo({
			       url: '/pages/index/my/PushOfficer/InvitationList'
			   })	
			},
			gopushIncome(){
			  uni.navigateTo({
			      url: '/pages/index/my/PushOfficer/pushIncome'
			  })
			},
			goPushSource(){
			  uni.navigateTo({
			      url: '/pages/index/my/PushOfficer/pushSource'
			  })	
			},
			gopopIndex(i){
			   this.popIndex = i
			    if(i != 3){
					this.getposterOrLanguage()
				}
			},
			goranIndex(i){
				this.ranIndex = i
				this.getrankingList()
			}
		}
	}
</script>

<style>
  page {
  		background: #F5F5F5;
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
  .orfficer-user {
	  width: 100%;
	  display: flex;
	  padding: 40upx 28upx 22upx 28upx;
  }
  .user-img {
	  width: 116upx;
	  height: 116upx;
	  border-radius: 50%;
  }
  .user-conet {
	  flex: 1;
	  padding: 10upx 0 0 20upx;
  }
  .user-name {
	  width: 100%;
	  font-weight: 500;
	  font-size: 28upx;
	  color: #333333;
	  padding-left: 10upx;
  }
  .user-name image {
	  width: 32upx;
	  height: 32upx;
	  float: right;
	  margin: 4upx 4upx 0 0;
  }
  .user-grade {
	  float: left;
	  width: 180upx;
  }
  .giks {
	 width: 140upx; 
  }
  .orfficer-text {
	  width: 100%;
	  font-size: 20upx;
	  color: #AAAAAA;
	  padding: 0 32upx;
  }
  .whole-padd {
	  width: 100%;
	  position: relative;
	  padding-top: 150upx;
  }
  .post-ranking {
	  position: absolute;
	  top: 10upx;
	  width: 100%;
	  padding:32upx;
  }
  .ranking-nav {
	  width: 100%;
	  height: 180upx;
	  background: #FFFFFF;
	  box-shadow: 0px 8upx 20upx rgba(0, 0, 0, 0.05);
	  border-radius: 12upx;
	  display: flex;
  }
  .nav-item {
	  flex: 1;
	  padding-top: 40upx;
  }
  .nav-img {
	  width: 72upx;
	  height: 72upx;
	  margin: 0 auto 8upx auto;
  }
  .nav-text {
	  text-align: center;
	  font-size: 24upx;	  
	  color: #333333;
  }
  .whole-ranking {
	  width: 100%;
	  background: #FFFFFF;
	  padding-top: 80upx;
	  border-radius: 30upx 30upx 0 0;
  }
  .whole-nav {
	  width: 100%;
	  padding:32upx;
	  border-bottom: 1upx solid rgba(51, 51, 51, 0.05);;
  }
  .ran-item {
	  float: left;
	  height: 54upx;
	  margin-right: 72upx;
  }
  .ranking-text {
	 font-weight: 500;
	 font-size: 32upx;
	 color: #D8D8D8; 
	 padding-bottom: 2upx;
  }
  .ranking-border {
	  width: 32upx;
	  height: 8upx;
	  margin: 0 auto;
	  background: #333333;
	  border-radius: 30upx;
  }
  .pai {
	 color: #333333; 
  }
  .ranking-padd {
	  width: 100%;
	  padding: 0 32upx;
  }
  .ranking-explain {
	  width: 100%;
	  padding: 32upx 0;
	  font-size: 26upx;
	  color: #AAAAAA;
  }
  .ranking-back {
	  width: 100%;
	  background: rgba(51, 51, 51, 0.03);
	  border-radius: 8upx;
	  margin-bottom: 24upx;
  }
  .ranking-user {
	 width: 100%;
	 background: rgba(51, 51, 51, 0.03);
	 border-radius: 8upx; 
	 margin-bottom: 40upx;
  }
  .ranking-haed {
  	   width: 100%;
  	   display: flex;
  	   padding: 24upx;
	   border-bottom: 1upx solid rgba(51, 51, 51, 0.05);
  }
  .haed-item {
  	   flex: 1;
  	   font-size: 28upx;
  	   color: #AAAAAA;
  	   text-align: center
  }
  .ranking-for {
  	   width: 100%;
  	   height: 600upx;
  	   overflow-y: scroll;
  	   overflow-x: hidden; 
  	   padding-bottom: 20upx;
  }
  .ranking-list {
  	   width: 100%;
  	   display: flex;
	   padding: 10upx 20upx;
	   border-bottom: 1upx solid rgba(51, 51, 51, 0.05);
  }
  .list-left {
  	   width: 56upx;
  	   margin-top: 10upx;
  	   height: 56upx;
  }
  .left-text {
  	   width: 100%;
  	   line-height: 56upx;
  	   text-align: center;
  	   font-size: 32upx;
  	   color: #333333;
  }
  .list-conet {
  	   flex: 1;
  	   display: flex;
  	   flex-direction: row;
  	   align-items: center;
  	   padding-left: 120upx;
  	   font-size: 26upx;
  	   color: #777777;
  }
  .list-conet image {
  	   width: 60upx;
  	   height: 60upx;
  	   border-radius: 50%;
  	   margin-right: 14upx;
  }
  .list-conet text{
	  background: rgba(255, 63, 77, 0.6);
	  border-radius: 4upx;
	  font-size: 20upx;
	  color: #FFFFFF;
	  padding:0 8upx;
	  display: inline-block;
	  margin-left: 10upx;
  }
  .list-right {
  	   font-size: 14px;
  	   line-height: 66upx;
  	   color: #333333;
  	   width: 132upx;
  	   text-align: center;
  }
  .popup-whole {
	  width: 100%;
	  background-color: #fff;
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
	  width: 32upx;
	  height: 32upx;
	  position: absolute;
	  top: 44upx;
	  right: 40upx;
  }
  .popup-nav {
	  width: 100%;
	  padding-bottom: 32upx;
	  display: flex;
	  border-bottom: 2upx solid rgba(51, 51, 51, 0.05);;
  }
  .ran-popup {
	  flex: 1;
	  text-align: center;
  }
  .whole-bill {
	  width: 100%;
	  height: 780upx;
	  padding-bottom: 80upx;
  }
  .action-swiper {
	  width: 100%;
	
	  padding: 32upx 0 0 32upx;
  }
  .swiper-img {
	  width: 100%;
	  height: 680upx;
  }
  .swiper-img image {
	   width: 432upx;
	  height: 680upx;
  }
  swiper,swiper-item {
	  width: 100%;
	  height: 680upx;
  }
  .code-img {
	 width: 480upx;
	 height: 480upx;
	 margin: 80upx auto 50upx auto;  
  }
  .code-button {
	 width: 220upx;
	 height: 56upx;
	 line-height: 56upx;
	 text-align: center;
	 margin: 0 auto;
	 background: rgba(51, 51, 51, 0.7);
	 backdrop-filter: blur(4upx);
	 border-radius: 62upx;
	 font-size: 32upx;
	 color: #FFFFFF;
  }
  .bind-text {
	  width: 100%;
	  text-align: center;
	  font-size: 28upx;
	  color: #999999;
	  padding-top: 80upx;
  }
  .action-for {
	  width: 100%;
	  padding: 32upx;
  }
  .action-list {
	  width: 100%;
	  height: 200upx;
	  margin-bottom: 32upx;
	  position: relative;
  }
  .post-link {
	  width: 100%;
	  height: 100%;
	  position: absolute;
	  top: 0;
	  left: 0;
	  padding: 20upx 22upx;
  }
  .link-text {
	  float: left;
	  width: 500upx;
	  height: 158upx;
	  padding: 12upx;
	  background: rgba(255, 255, 255, 0.62);
	  border-radius: 10upx;
	  font-size: 26upx;
	  color: #925300;
  }
  .link-button {
	  width: 56upx;
	  height: 144upx;
	  background: #DC3626;
	  border-radius: 74upx;
	  float: right;
	  margin-top: 12upx;
	  padding-top: 30upx;
	  font-weight: 500;
	  font-size: 30upx;
      text-align: center;
	  color: #FFFFFF;
  }
</style>
