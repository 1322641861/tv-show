<template>
	<view class="whole-page">
		  <view class="ranking-back">
			  <image src="../../../static/images/head.png"></image>
		  </view>
		 <view class="ran-head">
			    <view class="ran-item" @click="gonavdata(8)"
				     :class="navdata == 8 ? 'colt':''">
			    	  日榜  
			    </view>
				<view class="ran-item" @click="gonavdata(7)"
				     :class="navdata == 7 ? 'colt':''">
					  总榜  
				</view>
		  </view>
		  <view class="my-back">
			  <view class="my-post">
				  <view class="my-ranking">
						 <view class="conet-top">
							 你当前名次：{{ranking_info.isHaveRanking == 1 ? ranking_info.ranking : "未上榜" }}</view>		
						 <view class="conet-my">
							   <view class="conet-img">
								  <image :src="ranking_info.avatar"></image>
							   </view>
							   <view class="conet-name">{{ranking_info.nickName}}</view>
								<view class="conet-num">{{ranking_info.value}}</view>
						 </view> 
				  </view>
			  </view>
		  </view>
		  <view class="ranking-whole">
			    <view class="ranking-type">
					  <view class="type-item" @click="gorankingtype(1)"
				           :class="rankingtype == 1 ? 'colone':''">本期榜单</view>
					<!-- <view class="type-item" @click="gorankingtype(2)"
					      :class="rankingtype == 2 ? 'colone':''">上期榜单</view> -->
			    </view>
				<view class="content-nav">
					  <view class="left-num">名次</view>
					  <view class="content-user">用户</view>
					  <view class="right-num">排榜值</view>
				</view>
				<view class="ranking-for">
					  <view class="ranking-list" v-for="(item,index) in rankingList" :key="index">
					  	  <view class="left-num" style="padding-top: 10upx;">{{item.ranking}}</view>
					  	  <view class="content-user" style="display: flex;">
							    <view class="user-img">
									  <image :src="item.avatar"></image>
								</view>
								<view class="user-text">{{item.nickName}}</view>
						  </view>
					  	  <view class="right-num" style="padding-top: 10upx;">{{item.value}}</view>
					  </view>
				</view>
		  </view> 
		<view class="whole-rank">
			  <view class="back-title">本期打榜规则</view>  
			  <view class="rank-text">邀请实名注册用户榜值+1，邀请有效购买任意藏品用户榜值+10</view>  
			  <view class="rank-text">本次打榜活动持续3天，3天后更换榜单玩法！！</view>  
	          <view class="rank-text">打榜时间：8月27日15：00至8月30日15：00</view> 
			  <view class="rank-text">每天晚上11:55-12:00快照日榜</view> 
			  <view class="rank-text">榜单实时更新，日榜取前50名给予奖励！！总榜取前50名给予奖励！！</view>
			  <view class="back-title" style="padding-top: 20upx;">日榜单奖品：</view>
			  <view class="rank-text">榜一：阿努比斯*1 +制定藏品优先购*2</view>  
			  <view class="rank-text">榜二：比特熊*1+指定藏品优先购*2</view>
			  <view class="rank-text">榜三：比特鼠*1+指定藏品优先购*2</view>
			  <view class="rank-text">4-10名：指定藏品优先购*2</view>
			  <view class="rank-text">11-50名：指定藏品优先购*1</view>
			  <view class="rank-text">拉新日榜单，第一名获得阿努比斯阿努比斯由市场官方回收1200元以上</view>
			  <view class="back-title" style="padding-top: 20upx;">总榜单奖品：</view>
			  <view class="rank-text">榜一：苹果13ProMAX128+苹果电脑+苹果三代耳机</view>  
			  <view class="rank-text">榜二：苹果13ProMAX256+苹果二代耳机</view>
			  <view class="rank-text">榜三：IPad Pro 256榜</view>
			  <view class="rank-text">4-10：京东E卡200 +比特系列优先购一份</view>
			  <view class="rank-text">榜11-50：京东E卡100</view>
			  <view class="rank-text">奖品将在榜单结束后7个工作日内发放日榜前50名榜值小于30将取消获奖资格！！</view>
			  <view class="back-title" style="padding-top: 20upx;">总榜前50名榜值小于50将取消获奖资格！！</view>  
			  <view class="rank-text">严禁恶意刷单、严禁造假数据，一经发现将取消获奖资格</view> 
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
			//	http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api 测试 test
				rankingList:[],
				ranking_info:"",
				navdata:7,
				rankingtype:1,
				sessionId:"",
				userId:"",
				ifback:false
			}
		},
		onLoad(e) {
			this.sessionId = uni.getStorageSync('sessionId')
			this.userId = uni.getStorageSync('userId')
           this.getrankingList()
		},
		methods: {
			getrankingList(){
				 let that = this
				 uni.request({
				     url: getApp().globalData.http_url + 'user/leaderboard/list', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': that.sessionId
					 },
					 data:{
						 type:that.navdata,
						 period:that.rankingtype
					 },
				    success: (res) => {
						console.log(res.data);
						that.rankingList = res.data.data.ranks
						if(that.rankingtype == 1){
						   that.ranking_info = res.data.data.user
						}
						// if(res.data.data.ranks != ''){
						// 	that.rankingList = res.data.data.ranks
						// 	that.ranking_info = res.data.data.user
						// }else{
						// 	that.rankingList = []
						// 	that.ranking_info = ""
						// }
						
						
					
				    }
				});
			},
			goifback(){
				this.ifback = !this.ifback
			},
			gorankingtype(e){
				this.rankingtype = e
				this.getrankingList()
			},
             gonavdata(e){
				 this.navdata = e
				 this.getrankingList()
			 }
		}
	}
</script>

<style>
	 page {
		 background: none;
	 }
	 .whole-page{
	 	width: 100%;
	 	height: 100%;
		padding-bottom: 20upx;
		background: #EF3D56;
		position: relative;
	 }
	 view {
	 	box-sizing: border-box;
	 	font-size: 30upx;
	 	font-family: PingFang SC;
	 	font-style: normal;
	 	font-weight: normal;		
	 	color: #333333;
	 	overflow: hidden;
	 }
	 image {
		 width: 100%;
	 }
	 .ranking-top {
    	 width: 100%;
		 text-align: center;
		 padding-top: 26upx;
		 font-weight: 500;
		 font-size: 36upx;
		 color: #FFFFFF;
		 position: absolute;
		 top: 0;
	 }
	 .ran-head {
		 width: 100%;
		 padding: 30upx 30upx 30upx 100upx;
	 }
	 .ran-item {
		 width: 220upx;
		 padding: 16upx 0;
		 border: 1upx solid #fff;
		 border-radius: 36upx;
		 text-align: center;
         margin: 0 24upx;
		 color: #fff;
		 float: left;
	 }
	 .colt {
		 background-color: #fff;
		 color: #000000;
		 border: none;
		 padding: 18upx 0;
	 }
	 .ranking-back {
		 width: 100%;
		 height: 540upx;	
		 margin: 40upx 0;
	 }
	 .ranking-back image {
		 width: 100%;
		 height: 100%;
	 }
	 .my-back {
		  width: 100%;
		
	 }
	 .my-post {
		 width: 100%;
	 }
	 .my-ranking {
		 width: 700upx;
		 height: 260upx;
		 margin:0 auto;
		background: #FFFFFF;
		box-shadow: inset -4px -4px 10px #DDD6FF, inset -4px 4px 10px #DDD6FF, inset 0px -4px 10px #DDD6FF, inset 0px 4px 10px #DDD6FF;
		 border-radius: 20upx;
		 z-index: 2;
		 padding: 48upx 40upx;
	 }
	 .conet-top {
		 width: 100%;
		 color: #000000;
		 font-size: 28upx;
		 margin-bottom: 30upx;
	 }
	 .conet-my {
		 width: 100%;
	 }
	 .conet-img {
		 float: left;
		 width: 92upx;
		 height: 92upx;
	     border-radius: 50%;	 
	 }
	 .conet-img image {
		 width: 100%;
		 height: 100%;
	 }
	 .conet-name {
		 float: left;
		 color: #000000;
		 margin: 26upx 0 0 24upx;
		 font-size: 28upx;
	 } 
	 .conet-num {
		 float: right;
		 color: #000000;
		 margin-top: 26upx;
		 font-size: 28upx;
	 }
	 .ranking-nav {
		 width: 100%;
		 padding: 30upx;
		 margin-top: 30upx;
	 }
	 .nav-item {
		 width: 132upx;
		 height: 54upx;
		 text-align: center;
		 line-height: 54upx;
		 color: #FFFFFF;
		 font-size: 28upx;
		 margin: 0 20upx;
		 float: left;
	 }
	 .back {
		 background: #FBDCD1;
         font-weight: 500;
		 color: #AE3802;
		 border-radius: 8upx;
		 box-shadow: inset -2px -2px 10px #FDECDB, inset -2px 2px 10px #FDECDB, inset 0px -2px 10px #FDECDB, inset 0px 2px 10px #FDECDB;
	 }
	 .ranking-whole {
		  width: 700upx;
		/*  height: 800upx; */
		 background: #FFFFFF;
		 box-shadow: inset -4px -4px 10px #DDD6FF, inset -4px 4px 10px #DDD6FF, inset 0px -4px 10px #DDD6FF, inset 0px 4px 10px #DDD6FF;
		  border-radius: 20upx;
		  margin: 20upx auto;
		  padding: 20upx 0;
	 }
	 .ranking-type {
		 width: 100%;
		 padding: 32upx 120upx;
		 display: flex;
		 border-bottom:  1upx solid #F0F0F0;;
	 }
	 .type-item {
		 margin: 0 48upx;
		 font-size: 32upx;
		 color: #666666;
	 }
	 .colone {
		 font-weight: 500;
		 color: #000000;
	 }
	 .fl-left {
	 	float: left;
	 }
	 .fl-right {
	 	float: right;
	 }
	 .content-nav {
		 padding-top: 40upx;
		 width: 100%;
	 }
	 .left-num {
		 float: left;
		 width: 140upx;
		 text-align: center;
		 font-weight: 500;
		 color: #000000;
		 font-size: 28upx;
	 }
	 .content-user {
		 float: left;
		 width: 350upx;
		 text-align: center;
		 margin-left: 30upx;
	 }
	 .right-num {
		 float: right;
		 width: 180upx;
		 text-align: center;
		 font-weight: 500;
		 color: #000000;
		 font-size: 28upx;
	 }
	 .ranking-for {
		 width: 100%;
		 min-height: 500upx;
		/* height: 580upx;
		 overflow-y: scroll;
		 overflow-x: hidden; */
	 }
	 .ranking-list {
		 width: 100%;
		 padding: 20upx 0;
	 }
	 .user-img {
		 width: 64upx;
		 height: 64upx;
		 border-radius: 50%;
		margin-left: 60upx;		 
	 }
	 .user-img image {
		 width: 100%;
		 height: 100%;
	 }
	 .user-text {
		 margin: 10upx 0 0 14upx;
		 flex: 1;
		 height: 40upx;
		 text-align: left;
		 color: #000000;
		 font-size: 28upx;
		 text-overflow: -o-ellipsis-lastline;
		 text-overflow: ellipsis;
		 display: -webkit-box;
		 -webkit-line-clamp: 1;
		 line-clamp: 1;
		 -webkit-box-orient: vertical;
	 }
	 .post-guiz {
		 position: absolute;
		 top: 30upx;
		 right: 40upx;
		 color: #FFFFFF;
		 font-size: 28upx;
	 }
	 .whole-back {
		 width: 100%;
		 height: 100%;
		 position: absolute;
		 top: 0;
		 left: 0;
		 background-color:rgba(0, 0, 0, 0.4);
	 }
	 .whole-rank {
		width: 100%;
		padding: 40upx 26upx;
		color: #fff;
	 }
	 .back-title {
		 font-weight: 500;
		 font-size: 32upx;
		 color: #fff;
		 padding-bottom:10upx;
	 }
	 .rank-text {
		 font-size: 28upx;
		  color: #fff;
		  padding-bottom: 6upx;
	 }
	 .Mask-bottom {
		 width: 100%;
		 font-size: 28upx;	 
		 color:#FFFFFF;
		 padding-top: 24upx;
	 }
	 .Mask-img {
		 width: 100%;
		 padding: 40upx 0;
	     text-align: center;
	  }
	 .Mask-img image{
		 width: 64upx;
		 height: 64upx;
	 }
</style>
