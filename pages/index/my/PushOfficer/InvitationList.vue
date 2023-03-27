<template>
	<view class="whole-page">
		  <view class="lnvitation-back">
			     <view class="post-lnvitation">
					   <view class="lnvitation-content">
						     <view class="item-content">
								   <view class="content-num">{{inviteData.allInvNumber}}</view>
								   <view class="content-text">总邀请数</view>
							 </view>
							 <view class="item-content">
								   <view class="content-num">{{inviteData.effectiveNumber}}</view>
								   <view class="content-text">有效用户</view>
							 </view>
							 <view class="item-content">
								   <view class="content-num">{{inviteData.todayInvNumber}}</view>
								   <view class="content-text">今日邀请</view>
							 </view>
							 <view class="item-content">
								   <view class="content-num">{{inviteData.goldNumber}}</view>
								   <view class="content-text">黄金星推官</view>
							 </view>
							 <view class="item-content">
								   <view class="content-num">{{inviteData.diamondNumber}}</view>
								   <view class="content-text">钻石星推官</view>
							 </view>
							 <view class="item-content">
								   <view class="content-num">{{inviteData.kingNumber}}</view>
								   <view class="content-text">王者星推官</view>
							 </view>
					   </view>
				 </view>
				 <view class="whole-lnvitation">
					   <view class="lnvitation-title">邀请记录列表<text>(付费过的用户算作有效用户)</text></view>
					   <view class="lnvi-haed">
						     <view class="lnvi-left">用户</view>
							 <view class="lnvi-tiem">注册时间</view>
						     <view class="lnvi-grade">等级</view>
							 <view class="lnvi-grade">有效</view>												 
					   </view>
					   <view class="lnvi-for">
						     <view class="lnvi-haed" v-for="(item,index) in inviteData.inviteListVOs" :key="index">
								 <view class="lnvi-left flit">
									   <image :src="item.avatarUrl"></image>
									   {{item.userName}}
								 </view>
								 <view class="lnvi-tiem fimt">{{item.createTime}}</view>
								 <view class="lnvi-grade grat" v-if="item.level == 0">普通</view>
								 <view class="lnvi-grade grat" v-if="item.level == 1">黄金</view>
								 <view class="lnvi-grade grat" v-if="item.level == 2">钻石</view>
								 <view class="lnvi-grade grat" v-if="item.level == 3">王者</view>
								 <view class="lnvi-grade grat">{{item.isEffective == 1 ? '是':'否'}}</view>						 
						     </view>
					   </view>
				 </view>
		  </view>
	</view>
</template>

<script>
	import {
	    inviteInfo
	} from '@/api/officer.js'
	export default {
		data() {
			return {
				page:1,
				inviteData:"",
				rankingList:[{},{},{},{},{},{},{},{},{}]
			}
		},
		onLoad() {
			this.getinviteInfo()
		},
		methods: {
			getinviteInfo(){
				let that = this
				inviteInfo({
					page:that.page,
					limit:100
				}).then(res => {
					console.log(res)
					that.inviteData = res.data
				})
			}
		}
	}
</script>

<style>
  page {
  		background: #FFF;
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
  .whole-page {
  	  width:100%;
  	  height:100%;
  }
  .officer-img {
	  width: 396upx;
	  height: 396upx;
	  margin: 0 auto;
  }
  .whole-padd {
	  width: 100%;
	  padding: 0 32upx;
  }
  .lnvitation-back {
	  width: 100%;
	  position: relative;
	  padding-top: 140upx;
	  background-color: #F6F6F6;
  }
  .post-lnvitation {
	  width: 100%;
	  padding: 40upx 32upx;
	  position: absolute;
	  top: 0;
	  z-index: 9;
  }
  .lnvitation-content {
	  width: 100%;
	  background: #FFFFFF;
	  box-shadow: 0px 8upx 20upx rgba(0, 0, 0, 0.05);
	  border-radius: 12upx;
	   padding: 12upx 0;
  }
  .item-content {
	  width: 33.33333%;
	  float: left;
	  text-align: center;
	  padding: 12upx 0;
  }
  .content-num {
	  width: 100%;
	  font-weight: 500;
	  font-size: 28upx;
	  color: #333333;
  }
  .content-text {
	  font-size: 26upx;
	  color: #AAAAAA;
	  padding-top: 6upx;
  }
  .whole-lnvitation {
	  width: 100%;
	  background: #FFFFFF;
	  padding: 160upx 0 0 32upx;
	  border-radius: 12upx 12upx 0 0;
  }
  .lnvitation-title {
	  font-weight: 500;
	  font-size: 32upx;
	  padding-bottom: 10upx;
  }
  .lnvitation-title text{
	  font-size: 24upx;
      font-weight: 400;
	  color: #AAAAAA;
	  padding-left: 6upx; 
  }
  .lnvi-haed {
	  width: 100%;
	  padding: 24upx 20upx 24upx 0;
	   text-align: center;
	  border-bottom:  1upx solid rgba(51, 51, 51, 0.05);
  }
  .lnvi-left {
	  float: left;
	  width: 190upx;
	  text-align: center;
	  font-size: 28upx;
	  color: #AAAAAA;
  }
  .flit {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  font-size: 26upx;
	  color: #777777;
  }
  .flit image {
	  width: 60upx;
	  height: 60upx;
	  border-radius: 50%;
	  margin-right: 8upx;
  }
  .lnvi-tiem {
	  float: left;
	  font-size: 28upx;
	  color: #AAAAAA;
	  width: 280upx;
	  padding-left: 20upx;
  }
  .lnvi-grade {
	  float: right;
	  width: 94upx;
	  font-size: 28upx;
	  color: #AAAAAA;
  }
  .lnvi-for {
  	   width: 100%;
  	  /* height: 800upx;
  	   overflow-y: scroll;
  	   overflow-x: hidden; */
  	   padding-bottom: 20upx;
  }
  .fimt {
	  font-size: 24upx;
	  line-height: 60upx;
  }
  .grat {
	  color: #777777;
	   line-height: 60upx;
  }
</style>
