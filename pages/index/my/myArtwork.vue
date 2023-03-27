<template>
	<view class="whole-page">
		<!--  <view class="head-whole">
			   <view class="head-item"  @click="gohead(0)"
			        :class="head_index == 0 ? 'colt':''">
			   	     我的
			   </view>
			 <view class="head-item"  @click="gohead(1)"
			        :class="head_index == 1 ? 'colt':''">
                     赠送
			   </view>
			   <view class="head-item"  @click="gohead(2)"
			        :class="head_index == 2 ? 'colt':''">
			   	     收到
			   </view>
		 </view> -->
		 <view class="box-whole" v-if="head_index == 0">
			  <view class="box-list" v-for="(item,index) in work_list">
				 <!-- <view class="post-shou">在售</view>      -->
				  <view class="box-img" @click="goworkinfo(item.id,item.oneCategory)">
						<image :src="item.pic" mode="widthFix"></image>
				  </view>
				  <view class="box-title">{{item.goodsName}}</view>
				  <view class="box-text">
						 <image :src="item.creatorUrl"></image>
						 {{item.creatorName}}
				   </view> 
				   <view class="box-bottom">
						 <view class="right-botton" :class="item.isTransfer == 2 ? 'funs':''"
						       @click="goincrease(item.id,item.isTransfer)">
							    {{item.isTransfer == 1 ? '去转让' : item.transferTime}}
						 </view>
						 
				   </view>
			 </view>
		 </view>
		 <view class="box-whole" v-if="head_index != 0">
			  <view class="box-list" v-for="(item,index) in ferList">
				  <view class="box-img">
						<image :src="item.pic" mode="widthFix"></image>
				  </view>
				  <view class="box-title">{{item.goodsName}}</view>
				  <view class="box-text" v-if="head_index == 1">
					     <text>我赠送的人:</text>
						 <image :src="item.toAvatarUrl"></image>
						 {{item.toNickName}}
				   </view>
				   <view class="box-text" v-if="head_index == 2">
						 <text>赠送给我的人:</text>
						 <image :src="item.fromAvatarUrl"></image>
						 {{item.fromNickName}}
				    </view>
				   <view class="box-bottom">
						 
				   </view>
			 </view>
		 </view>
		 <uni-popup ref="popup"  @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'center'}">	
					  <view class="popup-title">转赠</view>
					  <view class="popup-text">接收方BSN链账户</view>
					  <view class="popup-item" style="margin-bottom: 40upx;">
							<input placeholder="请输入BSN链账户" type="text"  v-model="address"
									:adjust-position="false"/>
					  </view>
					  <view class="popup-text">随机字符验证码</view>
					  <view class="popup-item" style="margin-bottom: 40upx;">
							<input placeholder="请输入字符验证码" type="text" maxlength="4" v-model="vscode"
								   style="width:60%;" :adjust-position="false"/>
							 <view class="right-random" @click='randomnum()'>
								   <text v-for="item in randomtext">{{item}}</text>
								  <!-- <view class="random-text">看不清换一张</view> -->
							 </view>
					  </view>
					  <view class="popup-text">您手机短信验证码</view>
					  <view class="popup-item">
							<input placeholder="请输入手机验证码" type="number" maxlength="6" v-model="Verif"
								   style="width:60%;" :adjust-position="false"/>
							 <view class="right-input" @click='Verifications()'>{{text}}</view>
					  </view>
					  <view class="popup-button"  style="margin-top:60upx;" @click='goregister()'>确认转赠</view>
					  <view class="pot-text">转赠过程大约30秒左右，请耐心等待</view>
				 </view>
		 </uni-popup>
		 <uni-popup ref="popup_buttom"  @change="change">
			<view class="popup-bottom" :class="{ 'popup-height': type_buttom === 'bottom'}"> 
				  <view class="bot-item">
						 <view class="bot-text" @click="toggle('center')">无偿转让</view>
						 <view class="bot-text" style="border-top: 1upx solid #F2F2F2;"
												@click="goguns" >委托转让</view>
				  </view>
				  <view class="bot-button" @click="close_buttom()">取消</view>
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
				address:"",
				Verif:"",
				text:'获取验证码',
				head_index:0,
				work_list:[],
				ferList:[],
				type: 'center',
				type_buttom:'bottom',
				phone:"",
				work_id:"",
				workname:"",
				// img_url:'https://jkyx-prod.oss-cn-hangzhou.aliyuncs.com/res/',
				// http_url:"https://jkyx-api.chiguavod.com/applet/", // 正式 api 测试 test
			}
		},
	   	onLoad(e){
		  console.log(e)
		  this.workname = e.name
		},
		onShow(){
			this.getuserInfo()
		    this.getuserCollections()
		},
		methods: {
			goregister(){
			   let that = this
			   var info = ''	  
		        if(that.address == ''){
				   info = '请输入对方BSN链账户'
			   }else if(that.Verif == ''){
				   info = '请输入验证码'
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
				   	title: '转赠中请勿刷新...',
				   	mask:true
				  }); 
				  uni.request({
				     url: getApp().globalData.http_url + 'bsn/ddc/transferDDC', 
				  	 method:'GET',
					 dataType:"json",
				  	 header:{
				  		 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
				  	 },
				  	 data:{
						id:that.work_id,
						code: that.Verif,
						address:that.address
					 },
				      success: (res) => {
				  		console.log(res.data)
						uni.hideLoading()
				  		if(res.data.code == 200){
							uni.showToast({
								title: '转赠成功！',
								icon: "success",
								duration: 1000
							})
							that.Verif = ''
							that.address = ''
							 that.getuserInfo()  
							 that.getuserCollections()
						     that.close()
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
						 that.phone = res.data.data.phone
					  }else{
						 uni.showToast({
						 	title:'登录已失效，重新登录',
						 	icon: 'none',
						 	duration: 1000
						 });
						 uni.switchTab({
						 	 url: 'my'
						 });
					  }
			       }
			   });
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
			   if(that.address == ''){
				  uni.showToast({ 
					title:'请输入对方BSN链账户 !',
					icon: 'none',
					duration: 1000
				  });
			   }else{
				  that.setHtml()
				  that.get_code() 
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
			goincrease(id,type){
				if(type == 2){
					return
				}
				this.work_id = id
				this.toggle_buttom('bottom')	
				// uni.showToast({
				// 	title:'转赠冷却期截止到5月5日',
				// 	icon: 'none',
				// 	duration: 1000
				// });
			},
			goguns(){
				 window.location = 'https://chaoshucang.com/#/'
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle_buttom(type){
			  this.type_buttom = type
			  this.$refs.popup_buttom.open(type)
			},
			toggle(type){
				this.type = type
				this.$refs.popup.open(type)
				this.randomnum()
			},
			close_buttom(){
				this.$refs.popup_buttom.close()
			},
			close(){
				this.$refs.popup.close()
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
			getuserCollections(){
				let that = this
				 uni.request({
					 url: getApp().globalData.http_url + 'bsn/ddc/userCollections', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
					 },
					 data:{
						 pageNum:1,
						 pageSize:300
					 },
					  success: (res) => {
						console.log(res.data,'用户藏品列表');
						var list = []
						 for(var i in res.data.data){
							 if(res.data.data[i].goodsName == that.workname){
								  list.push(res.data.data[i])
							 }
						 }
						 that.work_list = list
						
					  }
				});
			},
			getTransferList(){
				let that = this
				 uni.request({
					 url: getApp().globalData.http_url + 'bsn/ddc/collectionsTransferList', 
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						 'sessionId': uni.getStorageSync('sessionId')
					 },
					 data:{
						 type:that.head_index,
						 pageNum:1,
						 pageSize:100
					 },
					  success: (res) => {
						console.log(res.data,'用户藏品转赠记录');
						 that.ferList =  res.data.data
						
					  }
				});
			},
			gohead(e){
				this.head_index = e
				if(e == 0){
					this.getuserCollections()
				}else{
					this.getTransferList()
				}
			},
		   goworkinfo(id,type){
			 uni.navigateTo({
			 	 url: 'myArtworkInfo?id='+ id + '&oneCategory=' + type
			 });  
		   },
		}
	}
</script>

<style>
	page{
	  background-color: #f2f2f2;
	}
	image {
		width: 100%;
		height: 100%;
	}
	.whole-page {
		width: 100%;
	}
	.head-whole {
		width: 100%;
		display: flex;
		background: #FFFFFF;
		padding: 20upx 160upx;
	   position: fixed;
	   top: 0;
	   z-index: 99;
	}
	.head-item {
		flex: 1;
		text-align: center;
		font-size: 32upx;
		color: #000000;
	}
	.colt {
		font-weight: 500;
		font-size: 36upx;
		color: #000000;
	}
	.box-whole {
		width: 100%;
		padding: 30upx 20upx 20upx 20upx;
	}
	.box-list {
		width: 100%;
		/* background: #FFFFFF; */
		background: rgba(255, 255, 255, 0.3);
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), inset -1px 0px 0px #FFFFFF, inset 1px 0px 0px #FFFFFF, inset 0px 1px 0px #FFFFFF;
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
	}
	.label-whole {
		width: 100%;
		padding: 0 0 20upx 24upx;
	}
	.label-item {
		float: left;
		background: linear-gradient(90deg, #EC84C1 0%, #6277E0 101.54%);
		border-radius: 8upx;
	    font-weight: 500;
	    font-size: 28upx;
	    color: #FFFFFF;
		padding: 4upx 20upx;
	}
	.box-text {
		font-size: 26upx;
		color: #999999;
		padding-left: 24upx;
	}
	.box-text text {
		float: left;
		padding-right: 10upx;
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
	.left-bottom {
		float: left;
	}
	.bot-img {
		float: left;
		width: 32upx;
		height: 32upx;
		border-radius: 50%;
		margin-right: -10upx;
	}
	.bot-img:last-child{
		margin-right: 0;
	}
	.bot-nun {
		float: left;
		font-size: 26upx;
		color: #666666;
		padding: 0 0 6upx 6upx;
	}
	.box-give {
		float: left;
		margin-top: 14upx;
		font-size: 30upx;
		color: #666666;
	}
	.box-give image {
		float: left;
	    width: 32upx;
		height: 28upx;
		margin: 6upx 10upx 0 0;
	}
	.right-botton{
		float: right;
		padding: 14upx 50upx;
		background: #222222;
		border-radius: 44upx;
		font-weight: 500;
		font-size: 30upx;
		color: #FFFFFF;
	}
	.pot-text {
		width: 100%;
		text-align: center;
		font-size: 26upx;
		padding: 26upx 0;
		color: #666666;
	}
	.funs {
		background: #999999;
	}
	.bot-item {
		width: 96%;
		margin: 0 auto;
		text-align: center;
	    border-radius: 30upx;
		background-color: rgba(255, 255, 255);
	}
	.bot-text {
		width: 100%;
		padding: 30upx 0;
		font-size: 32upx;
	}
	.bot-button {
		width: 96%;
		padding: 30upx 0;
		font-size: 32upx;
		background-color: #FFFFFF;
		 border-radius: 30upx;
		 color: #999999;
		 text-align: center;
		margin: 20upx auto
	}
</style>
