<template>
	<view class="whole-page">
		 <view class="padd-whole">
			  <view class="synthesis-list" v-for="(item,index) in synthlist">
					<view class="synthesis-imge">
						  <image :src="img_url+item.itemIcon" mode="aspectFill"></image>
					</view>
					<view class="synthesis-title">{{item.itemName}}</view>
					<view style="padding-top:10upx;">
					<view class="amount-conet">
						  <view class="amount-left">限量</view>
						  <view class="amount-text">{{item.combineNum}}/{{item.combineRemainNum}}</view>
					</view>
					</view>
					<view class="synthesis-text">{{item.combineStarttime}}-{{item.combineEndtime}}</view>
					<view class="synthesis-bottom" @click="gosynthesisinfo(item.id)"
						  v-if="item.combineStatus == 1">合成</view>
					<view class="synthesis-bottom buns" 
						  v-if="item.combineStatus == 0">不可合成</view>
			  </view>
		  </view>
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
				pagePath:"pages/index/synthesis/synthesis",
				img_url:"",
				synthlist:[],
				pageNum:1,
				pageSize:100
			}
		},
		onLoad() {
		   this.img_url = getApp().globalData.img_url
		   this.getArtworklist()  
		},
		onShow(){
		  
		},
		methods: {
			getArtworklist(){
			    let that = this
			    uni.request({
			         url: getApp().globalData.http_url+'NfrArtwork/combine/'+1+'/'+100,
					 method:'GET',
					 header:{
						 'content-type': 'text/json;charset=UTF-8',
						  'sessionId':  uni.getStorageSync('sessionId')
					 },					 
					 // data:{
						//  pageNum:that.pageNum,
						//  pageSize:that.pageSize
					 // },
					 success: (res) => {
						console.log(res,'合成列表');
						if(res.data.code == 200){
							for(var i in res.data.data.records){
								var year = res.data.data.records[i].combineStarttime.substr(0,4)
								var month = res.data.data.records[i].combineStarttime.substr(5,2)
								var day = res.data.data.records[i].combineStarttime.substr(8,2)
								var year2 = res.data.data.records[i].combineEndtime.substr(0,4)
								var month2 = res.data.data.records[i].combineEndtime.substr(5,2)
								var day2 = res.data.data.records[i].combineEndtime.substr(8,2)
								res.data.data.records[i].combineStarttime = year + '.' + month + '.' + day
							    res.data.data.records[i].combineEndtime = year2 + '.' + month2 + '.' + day2
							}
							that.synthlist = res.data.data.records
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
			gosynthesisinfo(id){
			   uni.navigateTo({
			       url:'synthesisinfo?id='+id 
			   })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.whole-page {
		min-height: 100vh;
		position: relative;
		padding-bottom: 200rpx;
	}
	.padd-whole {
		padding: 15upx 15upx 160upx 15upx;
		min-height: 100vh;
	}
	
  .synthesis-list {
	  width: 350upx;
	  background: rgba(255, 255, 255, 0.4);
	  border-radius: 32upx;
	  float: left;
	  margin: 6upx;
  }
  .synthesis-imge {
	  width: 100%;
	  height: 350upx;
  }
  .synthesis-imge image {
	   width: 100%;
	   height: 100%;
	   border-radius: 32upx;
   }
   .synthesis-title {
	   width: 100%;
	   padding: 10upx 20upx 0 20upx;
	   font-weight: 500;
	   color: #222222;
	   text-overflow: -o-ellipsis-lastline;
	   text-overflow: ellipsis;
	   display: -webkit-box;
	   -webkit-line-clamp: 1;
	   line-clamp: 1;
	   -webkit-box-orient: vertical;
   }
   .amount-conet {
	  float: left;
	  margin-left: 20upx;
	   border-radius: 6upx;
	  border: 1upx solid #222222;
   }
   .amount-left {
	   float: left;
	   background: #222222;
	   padding: 2upx 8upx;
	   font-size: 22upx;
	   color: #FFFFFF;
   }
   .amount-text {
	   float: left;
	   color: #222222;
	   border-radius: 4upx;
	   padding: 2upx 8upx;
	   font-size: 22upx;
   }
   .synthesis-text {
	   font-size: 22upx;
	   color: #666666;
	   float: left;
	   margin:6upx 0 
	   20upx 20upx;
   }
   .synthesis-bottom {
	   width: 310upx;
	   height: 66upx;
	   background:#222222;
	   border-radius: 40upx;
	   text-align: center;
	   line-height: 66upx;
	   color: #FFFFFF;
	   margin: 24upx auto;
   }
   .buns {
	   background-color: #B9B9B9;
   }
</style>
