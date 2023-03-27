<template>
	<view class="whole-page">
	<!-- 	  <view class="notice-top">
			   <view class="notice-img">
				     <image src="../../../static/images/gk.png" style="width:28upx;height:26upx;"></image>
			   </view>
			   <view class="notice-text">欢迎注册密盒星球...</view>
			   <view class="right-more" @click="goluckDraw()">
				     查看更多
					 <image src="../../../static/images/you.png"></image>
			   </view>
		  </view> -->
		 <view class="post-app" @click="goDownload">下载APP</view>
		  <view class="swiper-whole">
			  <!-- v-if="item.sortNum != 1001" -->
			  <swiper :indicator-dots="true" indicator-active-color="#fff" :autoplay="true">
			  	 <swiper-item v-for="(item,index) in bannerTop" 
				      @click="gofilelike(item.linkType,item.linkAddr)">
			  		  <image :src="img_url+item.filePath" mode="aspectFill"></image>
			  	 </swiper-item>
			  </swiper>
		  </view>
		  <view class="home-title">
			    <image src="../../../static/images/tie4.png" class="tit-img1"></image>
			    <image src="../../../static/images/tie1.png" class="tit-img"></image>
		  </view>
		  <view class="New-whole">
			    <view class="New-list" @click="goartworkinfo(workdata.id)">
			    	  <image :src="img_url+workdata.itemIcon"></image>
					  <view class="post-shou"
					  	   :class="workdata.sellOut == 1 ? '':'zait'">{{workdata.sellOut == 1 ? '售罄': '在售'}}</view>
					  <view class="post-New">
						    <view class="New-conet">
								  <view class="New-title">{{workdata.itemName}}  </view>
								  <view class="New-label">
									   <view class="New-item">限量 <view></view> {{workdata.stockTotal}}份</view>
									   <view class="New-item"v-for="(i,i_index) in workdata.rarenessNames"
							                :key="i_index" v-if="i_index < 4">
							                {{i}}</view>
								  </view>
								  <view class="New-buttom">
									    <view class="New-creation">
											  <image :src="img_url+workdata.creatorAvatar"></image>
											   {{workdata.creatorName}}
										</view>
										<view class="New-Price">￥{{workdata.salePrice}}</view>
								  </view>
							</view>
					  </view>
			    </view>
				<view class="New-list"  @click="goboxInfo(Signdata.blindBoxId)" >
					  <image :src="img_url+Signdata.itemIcon"></image>
					  <view class="post-shou zait" v-if="Signdata.isOpen == 1">在售</view>
					  <view class="post-shou zait" v-if="Signdata.isOpen == 2">开售时间: {{Signdata.startTime}}</view>
					  <view class="post-shou" v-if="Signdata.isOpen == 3">售罄</view>
					  <view class="post-shou" v-if="Signdata.isOpen == 4">已结束</view>
					  <view class="post-New">
						    <view class="New-conet">
								  <view class="New-title">{{Signdata.itemName}} </view>
								  <view class="New-label">
									   <view class="New-item">限量 <view></view>{{Signdata.saled*1+Signdata.stock*1}}份</view>
								  </view>
								  <view class="New-buttom">
										<view class="New-Price">￥{{Signdata.salePrice}}</view>
								  </view>
							</view>
					  </view>
				</view>
		  </view>
		  <view class="home-head">
				<view class="head-item" @click="gohead(0)"
					 :class="head_index == 0 ? 'cunt':''">
					 艺术品 <image src="../../../static/images/tie3.png" v-if="head_index == 0"></image>
				</view>
				<view class="head-item" @click="gohead(1)"
					 :class="head_index == 1 ? 'cunt':''">
					  盲盒 <image src="../../../static/images/tie3.png" v-if="head_index == 1"></image>
				</view>
				<!-- <view class="head-item" @click="gohead(2)"
					 :class="head_index == 2 ? 'cunt':''">
					  发售日历
				</view> -->
		  </view>
		  <view class="whole-box" v-if="head_index==0">
			  <view class="box-list" v-for="(item,index) in workList" @click="goartworkinfo(item.id)">
					  <view class="post-shou" 
					       :class="item.sellOut == 1 ? 'zait':''">{{item.sellOut == 1 ? '售罄': '在售'}}</view>
			    	  <view class="box-img" >
						    <image :src="img_url+item.itemIcon" mode="aspectFill"></image>
					  </view>
					  <view class="box-title">{{item.itemName}} </view>
					  <view class="box-text">
						     <image :src="img_url+item.creatorAvatar"></image>
							 {{item.creatorName}}
					   </view>
					 <!--  <view class="box-Price">
							  ￥ {{item.salePrice}}
					   </view> -->
			    </view>
		  </view>
		  <view class="whole-box" v-if="head_index==1">
				<view class="box-list" v-for="(item,index) in Signlist" @click="goboxInfo(item.blindBoxId)">
					  <view class="post-shou zait" v-if="item.isOpen == 1">在售</view>
					  <view class="post-shou zait" v-if="item.isOpen == 2">开售时间: {{item.startTime}}</view>
					  <view class="post-shou" v-if="item.isOpen == 3">售罄</view>
					  <view class="post-shou" v-if="item.isOpen == 4">已结束</view>
					  <view class="box-img">
							<image :src="img_url+item.itemIcon" mode="aspectFill"></image>
					  </view>
					  <view class="box-title">{{item.itemName}} </view>
						<!-- <view class="box-Price" v-if="item.salePrice !=0">
							  ￥{{item.salePrice}}
						</view> -->
				</view>
		  </view>
		  <!-- <view class="explain-text">ICP备案号：鄂ICP备2021013474号-10</view>
		  <view class="explain-text" style="padding-bottom:20upx;">增值电信业务经营许可证号：鄂B2-20210395</view> -->
		   <tabbar :pagePath='pagePath'></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue';
	export default {
		components:{
			tabbar
		},
		data() {
			return {
			    pagePath:"pages/index/home/home",
				is_longin:true,
				is_xint:true,
		  	    type: 'center',
				head_index:0,
				pageNum:1,
				pageSize:100,
				img_url:"",
				bannerTop:[],
				workList:[],
				Signlist:[],
				Signdata:"",
				workdata:""
			}
		}, 
		onLoad(e) {
			let that = this
			let sessionId = uni.getStorageSync('sessionId')
			console.log(sessionId,'用户凭证')
			that.img_url = getApp().globalData.img_url
			that.getArtworklist()
			that.getbanner()
		},
		onShow(){
			
		
		},
		methods: {
			getRequest(){
				var url = window.location.search;		
				var theRequest = new Object();		
				if (url.indexOf("?") != -1) {		
				   var str = url.substr(1); //获取url中"?"符后的字串 		
				   var strs = str.split("&");	
					for (var i = 0; i < strs.length; i++) {	
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);					
					}		
				}		
			   return theRequest;	
			},
			gohead(e){
				this.head_index = e
				if(e == 0){
					this.getArtworklist()	
				}else if(e == 1){
					this.getMarketPanelGoodsList()
				}
			},
			goboxInfo(id){
				 console.log(id,'222')
				uni.navigateTo({
				    url:'boxInfo?blindBoxId='+ id 
				})
			},
			goartworkinfo(id){
				uni.navigateTo({
				  //  url:'artworkinfo?id='+id + '&sessionId='+ uni.getStorageSync('sessionId') + '&userId='+ uni.getStorageSync('userId')
				  url:'artworkinfo?id='+id 
				})
			},
			gofilelike(type,link){
				if(type == 1){
					 window.location = link
				}else{
					// uni.showToast({
					// 	title:'暂未开放 !',
					// 	icon: 'none',
					// 	duration: 1000
					// });
				}
			},
			goluckDraw(){
			   uni.navigateTo({
			   	  url:'luckDraw'
			   })	
			},
		    getMarketPanelGoodsList(){
		    	let that = this
		    	uni.request({
		    	     url: getApp().globalData.http_url + 'goods/getBlindBoxList',
		    		 method:'GET',
		    		 header:{
		    			 'content-type': 'text/json;charset=UTF-8',
		    			  'sessionId':  uni.getStorageSync('sessionId')
		    		 },					 
		    		 data:{
		    			 pageNum:that.pageNum,
		    			 pageSize:that.pageSize
		    		 },
		    	     success: (res) => {
		    			console.log(res,'盲盒商品列表');
		    			if(res.data.code == 200){
		    				that.Signlist = res.data.data
		    			    that.Signdata = res.data.data[0]
							let boxt = new Date(that.Signdata.startTime)
							let wort = new Date(that.workdata.startTime)
							let boxtiem = boxt.getTime(boxt) 
							let wortiem = wort.getTime(wort)
							console.log(boxtiem,'1')
							console.log(wortiem,'2')
							if(wortiem > boxtiem){
								that.is_xint = true
								console.log('新品藏品')
							}else{
								that.is_xint = false
								console.log('新品盲盒')
							}
		    			}else{
		    				 uni.showToast({
		    					title:'登录已失效，重新登录',
		    					icon: 'none',
		    					duration: 1000
		    				 });
		    				  that.toggle('center')
		    				 that.is_longin = true  					
		    			 }		 		
		    	    }
		    	});
		    },
			getbanner(){
				let that = this
				uni.request({
				     url: getApp().globalData.http_url + 'banner',
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						  'sessionId':  uni.getStorageSync('sessionId')
					 },					 
					 data:{
						 position:40
					 },
				     success: (res) => {
						console.log(res,'轮播图');	
						 that.bannerTop = res.data.data.rows		
				    }
				}); 
			},
			getArtworklist(){
				let that = this
				uni.request({
				     url: getApp().globalData.http_url + 'NfrArtwork/list',
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						  'sessionId':  uni.getStorageSync('sessionId')
					 },					 
					 data:{
						 pageNum:that.pageNum,
						 pageSize:that.pageSize
					 },
				     success: (res) => {
						console.log(res,'艺术品列表');
						if(res.data.code == 200){
							that.workList = res.data.data
							that.workdata = res.data.data[0]
							that.getMarketPanelGoodsList()	
						}else{
							 uni.showToast({
								title:'登录已失效，重新登录',
								icon: 'none',
								duration: 1000
							 });
							  that.toggle('center')
							 that.is_longin = true  					
						 }		 
				    }
				}); 
			},
			toggle(type){	
				// this.type = type
				// this.$refs.popup.open(type)
				// this.randomnum()
				uni.navigateTo({
					  url:'../longin/longin'
				})
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			goDownload(){
		        uni.navigateTo({
		        	  url:'Download'
		        })
			},
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
	.notice-top {
		width: 100%;
		padding: 30upx 0;
		border-radius: 8upx;
	}
	.notice-img {
		/* width: 28upx;
		height: 26upx; */
		float: left;
	}
    .post-app {
		position: fixed;
		right: 0;
		top: 26vh;
		padding: 10upx 20upx 10upx 30upx;
		border-radius: 26upx 0 0 26upx;
		color: #fff;
		background: #DC8E47;
		z-index:99;		
	}
	.notice-text {
		float: left;
		color: #666666;
		font-size: 26upx;
		padding-left: 10upx;
	}
	.right-more {
		float: right;
		font-size: 26upx;
		color: #999999;
	}
	.right-more image{
		width: 12upx;
		height: 22upx;
		float: right;
		margin: 6upx 0 0 6upx;
	}
	.swiper-whole {
		width: 100%;
		height: 480upx;
	}
	swiper,swiper-item,image{
		width: 100%;
		height: 100%;
	}
	.home-title {
		width: 100%;
		padding: 30upx 24upx;
		margin-top: 10upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.tit-img1 {
		width: 162upx;
		height: 42upx;
	}
	.tit-img{
		width: 94upx;
		height: 28upx;
		margin-left: 12upx;
	}
	.home-head {
		width: 100%;
		padding: 32upx;
	}
	.head-item {
	   margin-right: 48upx;
	   float: left;
	   color: #666666;
	   font-size: 36upx;
	   font-weight: 400;
	   display: flex;
	   flex-direction: row;
	   align-items: center;
	}
	.head-item image {
		width: 26upx;
		height: 18upx;
		margin-left: 8upx;
	}
	.cunt {
		font-weight:600;
		color: #222222;
	}
	
	.whole-box {
		width: 100%;
		padding: 14upx 14upx 160upx 14upx;
		
	}
	.box-list {
		width: 50%;
	    background: #FFFFFF;
		padding:10upx 5upx 20upx 5upx;
		position: relative;
		float: left;
	}
	.post-shou {
		position: absolute;
		left: 32upx;
		top: 32upx;
		z-index: 9;
		padding: 6upx 32upx;
		font-size: 28upx;
		color: #999999;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 30upx;
	}
	.zait {
		color:#6BCA62;
	}
	.box-img {
		width: 100%;
		height: 346upx;
		border-radius: 16upx;
	}
	.box-img image{
		width: 100%;
		height: 100%;
		border-radius: 16upx;
	}
	.box-title {
		width: 100%;
		padding: 16upx;
		padding-bottom: 0;
		font-weight: 500;
		font-size: 32upx;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.label-whole {
		width: 100%;
		padding: 0 0 20upx 24upx;
	}
	.label-item {
		float: left;
		font-size: 22upx;
		color: #222222;
		padding: 4upx 12upx;
		border-radius: 4upx;
		border: 1upx solid rgba(34, 34, 34, 0.8);
		margin-right: 6upx;	
	}
	.box-text {
		font-size: 20upx;
		color: rgba(34, 34, 34, 0.56);
		padding-left: 16upx;
	}
	.box-text image{
		width: 32upx;
		height: 32upx;
		float: left;
		margin-right: 10upx;
		border-radius: 50%;
	}
	.box-Price {
		color: #222222;
		font-weight: 500;
		font-size: 32upx;
		padding: 10upx 0 0 16upx;
	}
   .guide-whole {
		width: 100%;
		padding:100upx;
		color: #fff;
	    margin-top: 140upx;
	}
	.guide-title {
		float: left;	
	}
	.guide-title view{
		color: #fff;
	}
	.guide-img {
		float: right;
		width: 100upx;
		height: 100upx;
	}
	.box-num {
		float: left;
		border: 1upx solid rgba(34, 34, 34, 0.8);
		margin-right: 6upx;	
		border-radius: 4upx;
	}
	.left-num {
		float: left;
		padding: 4upx 12upx;
		font-size: 22upx;
		color: #FFFFFF;
		background: rgba(34, 34, 34, 0.8);
	}
	.right-num {
		float: left;
		font-size: 22upx;
		color: #222222;
		padding:4upx 12upx;		
	}
	
	/* 新版本 */
	.New-whole {
		width: 100%;
		display: -webkit-box;
		overflow-x: scroll;
		padding-left: 24upx;
	}
	.New-list {
		width: 640upx;
		height: 640upx;
		border-radius:24upx;
		position: relative;
		margin-right: 16upx;
	}
	.New-list image{
		width: 100%;
		height: 100%;
	}
	.post-New {
		width: 100%;
		padding: 40upx;
		bottom: 0;
		left:0;
		position: absolute;
	}
	.New-conet {
		width: 100%;
		background: radial-gradient(100% 100% at 0% 0.02%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
		backdrop-filter: blur(12px);
		border-radius: 16upx;
		padding: 0 32upx;
	}
	.New-title {
		width: 100%;
		font-weight: 500;
		font-size: 36upx;
		color: #FFFFFF;
		padding-top: 20upx;
	}
	.New-label {
		width: 100%;
		padding: 14upx 0;
	}
	.New-item {
		float: left;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 2upx 14upx;
		margin-right:16upx;
		border: 1upx solid #CCCCCC;
		border-radius: 4upx;
		font-size: 20upx;
		color: #FFFFFF;
	}
	.New-item view{
		width: 2upx;
		height: 14upx;
		margin: 0 10upx;
		background-color: #fff;
	}
	.New-buttom {
		width: 100%;
		padding-bottom: 20upx;
	}
	.New-creation {
		float: left;
		display: flex;
		margin-top: 16upx;
		flex-direction: row;
		align-items: center;
		font-size: 24upx;
		color: #FFFFFF;
	}
	.New-creation image{
		width: 36upx;
		height: 36upx;
		border-radius:50%;
		margin-right: 8upx;
	}
	.New-Price {
		float: right;
		font-weight: 500;
		font-size: 44upx;
		color: #FFFFFF;
	}
</style>
