<template>
	<view class="whole-page">
		  <view class="photo-list" v-for="(item,index) in work_list" @click="gosetavatarUrl(item.pic)">
			    <view class="xuan-img" v-if="photo_img == item.pic">
					 <image src="../../../static/images/dg3.png"></image>
				</view>
			    <view class="photo-img">
					 <image :src="item.pic" mode="aspectFill"></image>
				</view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				photo_img:"",
				work_list:[],
			}
		},
		onLoad() {
		  this.getuserCollections() 
		},
		methods: {
		  gosetavatarUrl(img){
			 let that = this
			 that.photo_img = img
			 uni.request({
			     url: getApp().globalData.http_url + 'mine/index/updateUser', 
			 	 method:'GET',
			 	 dataType:"json",
			 	 header:{
			 	   'content-type': 'text/json;charset=UTF-8',
			 	  'sessionId': uni.getStorageSync('sessionId')
			 	 },
			 	 data:{
			 		avatarUrl:img		
			 	 },
			     success: (res) => {
			 		console.log(res.data)
			 		if(res.data.code == 200){
			 			uni.showToast({
			 				title: '设置成功！',
			 				icon: "success",
			 				duration: 1000
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
			 				duration: 1500
			 			});	 
			 		}				
			     },
			 });  
		  },
		  getuserCollections(){
		  	let that = this	
		  	 uni.request({
		  		 url: getApp().globalData.http_url + 'bsn/ddc/myCollections', 
		  		 method:'GET',
		  		 header:{
		  			 'content-type': 'text/json;charset=UTF-8',
		  			 'sessionId': uni.getStorageSync('sessionId')
		  		 },
		  		  success: (res) => {
		  			console.log(res.data,'用户藏品列表');
		  		    that.work_list = res.data.data		
		  		  }
		  	});
		  },	
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
	image {
		width:100%;
		height:100%;
	}
	.whole-page {
		padding: 34upx;
	}
    .photo-list {
		width: 33.33333333%;
		float: left;
		padding: 4upx;
		position: relative;
	}
	.xuan-img {
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 20upx;
		top: 20upx;
		z-index: 2;
	}
	.photo-img {
		width: 100%;
		height: 218upx;
	}
</style>
