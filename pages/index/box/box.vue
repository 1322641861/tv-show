<template>
	<view class="whole-page">
		 <view class="whole-padd">
			 <view class="notice-top">
						   <view class="notice-img">
								 <image src="../../../static/images/gk.png" style="width:28upx;height:26upx;"></image>
						   </view>
						   <view class="notice-title">公告</view>
						   <view class="notice-text">欢迎注册密盒星球...</view>
						  <!-- <view class="right-more">
								 查看更多
								 <image src="../../../static/images/you.png"></image>
						   </view> -->
			 </view>
			<!-- <view class="search-whole" @click="gosearch">
				   <image src="../../../static/images/ss.png"></image> 搜索好物
			 </view> -->
			 <view class="swiper-whole">
				  <swiper :indicator-dots="true" indicator-active-color="#fff" :autoplay="true">
					   <swiper-item v-for="(item,index) in bannerTop" v-if="item.sortNum != 1001"
						     @click="gofilelike(item.linkType,item.linkAddr)">
					   		  <image :src="img_url+item.filePath"></image>
					   </swiper-item>
				  </swiper>
			 </view>
			 <view class="box-type">
				  <view class="type-tiem" @click="gotype(0)"
				        :class="type_index == 0 ? 'tyt':''">
				  		艺术品
				  </view>
				 <view class="type-tiem" @click="gotype(1)"
				        :class="type_index == 1 ? 'tyt':''">
				  		盲盒
				  </view>	
				  <view class="type-tiem" @click="gotype(2)"
				         :class="type_index == 2 ? 'tyt':''">
				   		预售日历
				   </view>				   
			 </view>
			<!-- <view class="screen-whole" v-if="saleType !=2">
				  <view class="screen-item" @click="gopriceOrder()">
				  	    <view class="screen-text">
				  	    	   价格 			 
				  	    </view>	
						<view class="screen-right">
							  <view class="screen-img">
								    <image src="../../../static/images/sxs@.png" v-if="priceOrder == 1"></image>
							  	    <image src="../../../static/images/sxs.png" v-if="priceOrder == 0"></image>
							  </view>	
							  <view class="screen-img">
								   <image src="../../../static/images/sxx@.png" v-if="priceOrder == 0"></image>
								   <image src="../../../static/images/sxx.png" v-if="priceOrder == 1"></image>
							  </view>
						</view>	
				  </view>
				  <view class="screen-item" @click="goscr(1)">
				  	    <view class="screen-text">
				  	    	   热度 			 
				  	    </view>	
						<view class="screen-right">
							  <view class="screen-img">
								   <image src="../../../static/images/sxs.png"></image>
							  </view>	
							  <view class="screen-img">
								   <image src="../../../static/images/sxx.png"></image>
							  </view>
						</view>	
				  </view>
				  <view class="screen-item" @click="goscr(2)">
				  	    <view class="screen-text">
				  	    	   发布时间 			 
				  	    </view>	
						<view class="screen-right">
							  <view class="screen-img">
								   <image src="../../../static/images/sxs.png"></image>
							  </view>	
							  <view class="screen-img">
								   <image src="../../../static/images/sxx.png"></image>
							  </view>
						</view>	
				  </view>
			 </view> -->
		 </view> 
		 <view class="whole-box" style="padding:20upx;" v-if="type_index==0">
			  <!--  <view class="mot-text">
						   艺术品即将上线，敬请期待
			    </view> -->
			 <view class="box-list" v-for="(item,index) in workList">
			 	  <view class="post-shou">{{item.sellOut == 1 ? '已售罄':'在售'}}</view>
			   	  <view class="box-img" @click="goartworkinfo(item.id)">
						<image :src="img_url+item.itemIcon" mode="widthFix"></image>
				  </view>
				  <view class="box-title" @click="goartworkinfo(item.id)">
				       {{item.itemName}} <view class="give-text">已售 {{item.saled}}</view>
				  </view>
				  <view class="label-whole" @click="goartworkinfo(item.id)">
						 <view class="label-item" v-for="(i,i_index) in item.rarenessNames" 
						      :key="i_index" v-if="i_index < 4">
							   {{i}}
						 </view>			 
				  </view>
				  <view class="box-text">
						 <image :src="img_url+item.creatorAvatar"></image>
						 {{item.creatorName}}
				   </view>
				   <view class="box-bottom">
						 <view class="box-Price">
							  ￥ <text>{{item.salePrice}}</text>
						 </view>
						 <view class="box-num">
							  {{item.stockTotal}}份
						 </view>
						<view class="box-give" @click="golike(item.id,item.isLike)">
							   <image src="../../../static/images/sc.png" v-if="item.isLike == 0"></image>
								<image src="../../../static/images/sc@.png" v-else></image>
								{{item.likes}}
						 </view>
				   </view>
			   </view>
		 </view>
		 <view class="whole-box"  v-if="type_index==1">
			  <view class="box-list" v-for="(item,index) in Signlist" @click="goboxInfo(item.blindBoxId)">
			  		  <view class="post-shou" v-if="item.isOpen == 1">在售</view>
					  <view class="post-shou" v-if="item.isOpen == 2">开售时间: {{item.startTime}}</view>
					  <view class="post-shou" v-if="item.isOpen == 3">已售罄</view>
					  <view class="post-shou" v-if="item.isOpen == 4">已结束</view>
			  		  <view class="box-img">
			  				<image :src="img_url+item.itemIcon" mode="widthFix"></image>
			  		  </view>
			  		  <view class="box-title">
					        {{item.itemName}}
					        <view class="give-text" style="float: right;"
					             v-if="item.saled != null">已售 {{item.saled}}</view>
					  </view>
			  		   <view class="box-bottom">
			  				 <view class="box-Price">
			  					    ￥ <text>{{item.salePrice}}</text>
			  				 </view>
							 <view class="box-lin-price" style="padding-top: 6upx;">原价:{{item.originPrice}}</view>
							 <view class="box-num">
								  {{item.saled*1+item.stock*1}}份
							 </view>
			  				 <!-- <view class="box-give">
			  					   <image src="../../../static/images/sc.png"></image>
			  					   123
			  				 </view> -->
			  		   </view>
			  	</view>
		 </view>
		 <view class="whole-box" style="padding:20upx;" v-if="type_index==2">
			  <view class="tiem-whole">
				<!--   <view class="box-list-lie" v-for="(item,index) in workList">
						  <view class="box-img-lie">
								<image src="../../../static/images/tp.png"></image>
						  </view>
						  <view class="box-conet-lie">
								<view class="box-title-lie">
									  权益盲盒-密盒达人
								</view>
								<view class="label-whole" style="padding:0 0 16upx 0;">
									   <view class="label-item">1000份</view>
								</view>
								
								<view class="box-Price">
									  ￥ <text>921元</text>
								</view>
						  </view>
				   </view> -->
			   </view>
		 </view>
		 <uni-popup ref="popup"  @change="change">
			<view class="popup-content" :class="{ 'popup-height': type === 'center'}">	
				  <view class="popup-title">手机号快速登录</view>  
				  <view class="popup-item">
						<input placeholder="请输入手机号" type="number" maxlength="11" v-model="phone"
								:adjust-position="false"/>
				  </view>
				  <view class="popup-item">
						<input placeholder="请输入验证码" type="number" maxlength="6" v-model="Verif"
							   style="width:60%;" :adjust-position="false"/>
						 <view class="right-input" @click='Verifications()'>{{text}}</view>
				  </view>
				  <view class="popup-item">
						<input placeholder="请输入字符验证码" type="text" maxlength="4" v-model="vscode"
							   style="width:60%;" :adjust-position="false"/>
						 <view class="right-random" @click='randomnum()'>
							   <text v-for="item in randomtext">{{item}}</text>
							  <!-- <view class="random-text">看不清换一张</view> -->
						 </view>
				  </view>
				 <!-- <view class="popup-item">
						<input placeholder="请输入邀请码(选填)" maxlength="11" v-model="lincode"
							  :adjust-position="false"/>
				  </view> -->
				  <view class="popup-button"  @click='goregister()'>注册/登录</view>
				  <view class="agreement-whole">
					   <view class="agreement-radius" :class="ifagree ? 'bord':''" 
							 @click="goifagree">
							 <image src="../../../static/images/dui.png"  v-if="ifagree"></image>
					   </view>
					   <view class="agreement-text">
							 已阅读并同意<text @click="goyh">《用户协议》</text> 和 <text @click="goys">《隐私协议》</text>
					   </view>
				  </view>
			 </view>
		 </uni-popup>
	</view>
</template>

<script>
	var times = 60;
	export default {
		data() {
			return {
				vscode:"",
				randomtext:[],
				saleType:1, // 分类导航
				type_index:0, //类型导航
				priceOrder:1,  // 价格筛选导航
				publishTimeOrder:1,  // 发布时间筛选导航
				heatOrder:1,  // 热度筛选导航
				bannerTop:['../../../static/images/bag.png'],
				Signlist:[],
				pageNum:1,
				pageSize:100,
				phone:"",
				Verif:"",
				lincode:'',
				ifagree:true,
				type: 'center',
				text:'获取验证码',
				is_longin:true,
				userInfo:"",
				img_url:"",
				// img_url:"https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/", // 正式 prod // 测试 test
				// http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api // 测试 test
			    workList:[],
				// workList:[{img:"../../../static/images/work1.png",name:"貂蝉",saled:500,yisd:500,crea_img:"../../../static/images/crea.png",crea_name:"飓风三国"},
				//   {img:"../../../static/images/work3.png",name:"吕布",saled:500,yisd:500,crea_img:"../../../static/images/crea.png",crea_name:"飓风三国"},
				//   {img:"../../../static/images/work5.png",name:"赵云",saled:1000,yisd:1000,crea_img:"../../../static/images/crea.png",crea_name:"飓风三国"}]
			}
		},
		onLoad() {
	      console.log(getApp().globalData.http_url)
		  this.img_url = getApp().globalData.img_url
		},
		onShow(){
			let that = this
			let sessionId = uni.getStorageSync('sessionId')
			console.log(sessionId)
			var lincode = that.getRequest().inviteCode
			if(lincode){
				console.log(lincode,'邀请码')
			    that.lincode = lincode
			}
			if(sessionId || sessionId != ""){
				that.is_longin = false
				// that.getuserInfo()
			   that.getMarketPanelGoodsList()
			   that.getArtworklist()
			   that.getbanner()
			}else{
				that.is_longin = true
				setTimeout(function () {
					  that.toggle('center')	
				}, 1000)
			}		
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
			goartworkinfo(id){
				uni.navigateTo({
				   // url:'../home/artworkinfo?id='+id + '&sessionId='+ uni.getStorageSync('sessionId') + '&userId='+ uni.getStorageSync('userId')
				      url:'../home/artworkinfo?id='+id 
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
						    that.close()
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
			gofilelike(type,link){
				if(type == 1){
					 window.location = link
				}else{
					uni.showToast({
						title:'暂未开放 !',
						icon: 'none',
						duration: 1000
					});
				}
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
			golike(id,type){
			  let that = this
			  console.log(type)
			  var like = type == 0 ? 'NfrArtwork/like':'NfrArtwork/dislike'
			   uni.request({
			        url: getApp().globalData.http_url + like,
			   	 method:'GET',
			   	 header:{
			   		 'content-type': 'text/json;charset=UTF-8',
			   		  'sessionId':  uni.getStorageSync('sessionId')
			   	 },					 
			   	 data:{
			   		id:id
			   	 },
			      success: (res) => {
			   		  console.log(res.data,'喜欢');	
			   		  var text = type == 0 ? '喜欢成功' : '已取消'
					  if(res.data.code == 200){
						  uni.showToast({
							title:text,
							icon: 'none',
							duration: 1000
						  });
						  that.getArtworklist()
					  }else{
						  uni.showToast({
						  	title:res.data.message,
						  	icon: 'none',
						  	duration: 1500
						  });	
					  }
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
						 pageSize:that.pageSize,
						  // saleType:that.saleType,
						//  priceOrder:that.priceOrder,
						 // publishTimeOrder:that.publishTimeOrder,  
						 // heatOrder: that.heatOrder,  
					 },
				     success: (res) => {
						console.log(res,'艺术品列表');
					   that.workList = res.data.data	
						 				
				    }
				}); 
			},
			// getuserInfo(){
			//    let that = this
			//    uni.request({
			//         url: getApp().globalData.http_url + 'mine/index/list/' +  uni.getStorageSync('userId'), 
			//    	 method:'GET',
			//    	 header:{
			//    		 'content-type': 'text/json;charset=UTF-8',
			//    		 'sessionId':  uni.getStorageSync('sessionId')
			//    	 },
			//      success: (res) => {
			//    		 console.log(res.data.data,'用户信息');
			// 		 if(res.data.code == 200){		
			// 			 that.userInfo = res.data.data
						
			// 		 }else{
			// 			 uni.showToast({
			// 			 	title:'登录已失效，重新登录',
			// 			 	icon: 'none',
			// 			 	duration: 1000
			// 			 });
			// 			  that.toggle('center')
			// 			 that.is_longin = true  
	  //               }
			//        }
			//    });
			// },
			goboxInfo(id){
				 console.log(id,'222')
				 if(this.is_longin){
					  uni.showToast({
						title:'请先登录',
						icon: 'none',
						duration: 1000
					  });
				     this.toggle('center')
				    return
				 }
				uni.navigateTo({
				    url:'../home/boxInfo?blindBoxId='+ id 
				})
			},
			gotype(e){
			  this.type_index = e
			  if(e == 0){
				  this.saleType = 1
			     this.getArtworklist()
			  }else if(e == 2){
				 this.saleType = 2 
				 this.getArtworklist()
			  }
			
			},
			goscr(e){
			  this.scr_index = e
			},
			gopriceOrder(){
			  this.priceOrder =  this.priceOrder == 1 ? 0 : 1
			},
			gosearch(){
			 uni.navigateTo({
				 url:'search'
			 })
			},
			Verifications(){
			   let that = this
			   if(that.vscode == ''){
				   uni.showToast({
						title:'请输入字符验证码!',
						icon: 'none',
						duration: 1000
				   });
				   return
			   }else if(that.vscode.toUpperCase() != that.randomtext.toUpperCase()){
				   uni.showToast({
						title:'字符验证码不正确!',
						icon: 'none',
						duration: 1500
				   });
				   return
			    }
			    if(times!=60){
			    }else{
			      that.sendcode();
			    }
			},
			setHtml(){
				let that = this
			   -- times;
			   if(times!=0){
				   that.text = times + 's'
				   setTimeout(function () {
					 that.setHtml()
				   }, 1000)
			   }else{
				 that.text = '获取验证码'
				 times = 60
			   }
			 },
			sendcode(){
				 let that = this
			   var regex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;//手机号正则
			   if(regex.test(that.phone)){
				  console.log(that.phone)
				  that.setHtml()
				  that.get_code() 			
			   }else{
				 uni.showToast({
					title:'请输入正确的手机号码 !',
					icon: 'none',
					duration: 1000
				 });
			   } 
			},
			get_code(){
				 let that = this
				uni.request({
				     url: getApp().globalData.http_url + 'app/user/send_code', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
					 },
					 data:{
						phone: that.phone
					 },
				    success: (res) => {
						console.log(res.data)
						if(res.data.code == 200){
							 uni.showToast({
								title:'验证码已发送 !',
								icon: 'none',
								duration: 1500
							 });
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
			goregister(){
			   let that = this
			   var info = ''
			   if(that.phone == ''){
				   info = '请输入手机号码'
			   }else if(that.Verif == ''){
				   info = '请输入验证码'
			   }else if(!that.ifagree){
				   info = '请同意并阅读协议'
			   }		 
			   if(info != ''){
					uni.showToast({
					title:info,
					icon: 'none',
					duration: 1500
				   });	
					return
			   }else{
				   uni.showLoading({
						title: '登录中',
						mask:true
				   });
				  uni.request({
				     url: getApp().globalData.http_url + 'app/user/register_or_login', 
				  	 method:'GET',
					 dataType:"json",
				  	 header:{
				  		 'content-type': 'text/json;charset=UTF-8',
				  	 },
				  	 data:{
						phone: that.phone,
						code: that.Verif,
						inviteCode:that.lincode ? that.lincode : "",
					 },
				      success: (res) => {
				  		console.log(res.data)
					     uni.hideLoading()
				  		if(res.data.code == 200){
				  			that.is_longin = false
							that.phone = ''
							that.Verif = ''
							that.lincode = ''
							uni.setStorageSync('sessionId',res.data.data.sessionId)
							uni.setStorageSync('userId', res.data.data.userId)	
							console.log(uni.getStorageSync('sessionId'),'22222')
						    that.close()
							that.getMarketPanelGoodsList()
							that.getArtworklist()
				  		}else{
				  			uni.showToast({
				  				title:res.data.message,
				  				icon: 'none',
				  				duration: 1500
				  			});	 
				  		}				
				      },
				  });
			   }
			},
			toggle(type){
				this.type = type
				this.$refs.popup.open(type)
				this.randomnum()
			},
			close(){
				this.$refs.popup.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			randomnum(){
			  this.randomtext = this.getCode(4)
			   console.log(this.randomtext)
			},
			getCode(n) {
			   var all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
			   var b = [];
			   var a = ''
			   for (var i = 0; i < n; i++) {
				  var index = Math.floor(Math.random() * 62);
				  b.push(all.charAt(index));
			      a+=all.charAt(index)
			   }
			   return a;
			 },
			goifagree(){
			  this.ifagree = !this.ifagree
			  console.log(this.ifagree)
			},
			goyh(){
				 window.location = "http://chigua-official-site.chiguazixun.com/privacy/privacy1.html"
			},
			goys(){
			    window.location =  "http://chigua-official-site.chiguazixun.com/privacy/privacy2.html"
			},
		}
	}
</script>

<style>
	image {
		width: 100%;
	}
	.whole-page {
		padding-top:34upx;
	}
	.whole-padd {
		width: 100%;
		padding: 0 20upx;	
	}
    .notice-top {
    	width: 100%;
    	background: rgba(255, 255, 255, 0.3);
    	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
    	padding: 20upx 26upx;
    	border-radius: 8upx;
    	margin-top: 6upx;
    }
    .notice-img {
    	/* width: 28upx;
    	height: 26upx; */
    	float: left;
    }
    
    .notice-title {
    	float: left;
    	width: 62upx;
        text-align: center;
    	padding: 4upx 0;
    	background: #7AB9EF;
    	border-radius: 6upx;
    	font-weight: 400;
    	font-size: 22upx;
    	color: #FFFFFF;
    	margin: 0 10upx 0 16upx;
    }
    .notice-text {
    	float: left;
    	color: #666666;
    	font-size: 26upx;
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
    	height: 288upx;
    	border-radius: 30upx;
    	margin-top: 16upx;
    }
    swiper,swiper-item,image{
    	width: 100%;
    	height: 100%;
    }
	.search-whole {
	  width: 100%;
	  height: 72upx;
	  margin-top: 8upx;
	 background: rgba(255, 255, 255, 0.3);
	 box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
	  border-radius: 40upx;
	  padding: 0 32upx;
	  line-height: 72upx;
	  font-size: 30upx;
	  color: #999999;
	}
	.search-whole image{
		float: left;
		width: 32upx;
		height: 32upx;
		margin: 20upx 10upx 0 0;
	}
	.nav-whole {
		width: 100%;
		padding: 32upx 0;
	}
	.nav-item {
		float: left;
		font-size: 32upx;
		color: #000000;
        margin-right: 64upx;
	}
	.navt {
		font-size: 36upx;
		font-weight: 500
	}
	.box-type{
		padding: 40upx 0 20upx 0;
		width: 100%;
	}
	.type-tiem {
		width: 156upx;
		height: 60upx;
		box-sizing: border-box;
		border-radius: 12upx;
		text-align: center;
		line-height: 60upx;
		font-size: 30upx;
		float: left;
		margin-right: 26upx;
	}
	.tyt {
		background: linear-gradient(90deg, #EF7FDF 0%, #7AB9EF 100%);
		color: #FFFFFF;
		border: none;
	}
	.screen-whole{
		width: 100%;
		padding-top:32upx;
	}
	.screen-item {
		float: left;
		margin-right: 64upx;
	}
	.screen-text {
		float: left;
		font-size: 30upx;
		color: #000000;
	}
	.screen-right {
		float: left;
		padding-left: 8upx;
	}
	.screen-img {
		margin-top:-16upx;
	}
	.screen-img image {
		width: 20upx;
		height: 12upx;
	}
	.whole-box {
		width: 100%;
		padding: 20upx 10upx;
	}
	.box-list {
		width: 100%;
		background: rgba(255, 255, 255, 0.3);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 1px #FFFFFF, inset -1px 0px 1px #FFFFFF, inset 1px 0px 1px #FFFFFF;
		border-radius: 64upx;
		margin-bottom: 32upx;
		position: relative;
	}
	.post-shou {
		position: absolute;
		left: 32upx;
		top: 32upx;
		z-index: 9;
		padding: 4upx 28upx;
		font-size: 26upx;
		color: #FFFFFF;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 24upx;
	}
	.box-img {
		width: 100%;
	}
	.box-title {
		width: 100%;
		padding: 20upx 24upx;
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
		padding: 0 24upx 20upx 24upx;
	}
	.label-item {
		float: left;
		background: linear-gradient(92.25deg, #EF7FDF 1.98%, #7AB9EF 98.21%);
		border-radius: 4upx;
	    font-weight: 500;
	    font-size: 22upx;
	    color: #FFFFFF;
		padding: 6upx 20upx;
		margin-right: 14upx;
	}
	.box-text {
		font-size: 26upx;
		color: #999999;
		padding-left: 24upx;
	}
	.box-text image{
		width: 36upx;
		height: 36upx;
		float: left;
		margin-right: 10upx;
		border-radius: 50%;
	}
	.box-bottom {
		width: 100%;
	    padding: 20upx 24upx 30upx 24upx;
	}
	.box-Price {
		float: left;
		color: #FC4343;
		font-weight: 500;
		font-size: 26upx;
	}
	.box-Price text {
		font-weight: 500;
		font-size: 40upx;
		color: #FC4343;
	}
	.box-give {
		float: right;
		font-size: 30upx;
		color: #666666;
	}
	.box-give image {
		float: left;
	    width: 32upx;
		height: 28upx;
		margin: 6upx 10upx 0 0;
	}
	.box-list-two {
		width: 350upx;
		margin: 6upx;
		float: left;
		border-radius: 48upx;
		background-color: #fff;
	}
	.box-img-two {
		width: 100%;
		height: 350upx;
		border-radius: 48upx;
	}
	.box-title-two {
		width: 100%;
		padding: 16upx 16upx 0 16upx;
		height: 60upx;
		font-weight: 500;
		font-size: 32upx;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.box-text-two {
		width: 100%;
		padding: 0 16upx;
	}
	.box-Price-two {
		float: left;
		font-weight: 500;
		font-size: 26upx;
		color: #FC4343;
	}
	.box-Price-two text{
		font-weight: 500;
		font-size: 36upx;
		color: #FC4343;
	}
	.box-lin-price {
		float: left;
		margin-left: 20upx;
		font-size: 26upx;
		color: #999999;
		margin-top: 6upx;
		text-decoration-line: line-through;
	}
	.box-button-two {
		width: 100%;
		padding: 6upx 16upx 22upx 16upx;
	}
	.give-text {
		float: right;
		font-size: 28upx;
		padding-top: 6upx;
		color: #999999;
	}
	.box-list-lie {
		width: 100%;
		background: rgba(255, 255, 255, 0.3);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 1px #FFFFFF, inset -1px 0px 1px #FFFFFF, inset 1px 0px 1px #FFFFFF;
		margin-bottom: 20upx;
		border-radius: 48upx;
		display: flex;
	}
	.box-img-lie {
		width: 256upx;
		height: 256upx;
		border-radius: 40upx;
	}
	.box-conet-lie {
		flex: 1;
		padding: 40upx 30upx 40upx 32upx;
	}
	.box-title-lie {
		font-weight: 500;
		font-size: 36upx;
		color: #000000;
		padding-bottom: 12upx;
	}
	.mot-text {
		width: 100%;
		text-align: center;
		padding: 180upx 0;
		color: #909399;
	}
	.box-num {
		float: left;
		background: #FF7C01;
		border-radius: 4upx;
		padding: 2upx 14upx;
		color: #fff;
		font-size: 28upx;
		margin: 4upx 0 0 20upx;
	}
</style>

