<template>
	<view class="whole-page">
		  <view class="lnvitation-back">
			    <view class="post-lnvitation">
					  <view class="lnvitation-content">
					  	   	<view class="left-lnvitation">
								  <view class="lnvitation-num">{{rankingInfo.takeIncome}}</view>
								  <view class="lnvitation-text">可提现收益</view>
							</view>	
							<view class="lnvitation-button">提现</view>	
					  </view>		    			    
			    </view>
				<view class="whole-lnvitation">
					 <view class="lnvitation-info">
							 <view class="item-content">
								   <view class="content-num">{{rankingInfo.allIncome}}</view>
								   <view class="content-text">总收益</view>
							 </view>
							 <view class="item-content">
								   <view class="content-num">{{rankingInfo.yesterdayIncome}}</view>
								   <view class="content-text">昨日收益</view>
							 </view>
							 <view class="item-content">
								   <view class="content-num">{{rankingInfo.monthIncome}}</view>
								   <view class="content-text">本月收益</view>
							 </view>
					 </view>
					 <view class="lnvitation-title">每日数据记录<text>(仅保留最近30天的记录)</text></view>
					 <view class="lnvi-haed">
							 <view class="lnvi-left">日期</view>
							 <view class="lnvi-tiem">邀请人数</view>
							 <view class="lnvi-grade">有效收益(元)</view>						 
					 </view>
					 <view class="lnvi-for">
							 <view class="lnvi-haed" v-for="(item,index) in rankingInfo.everyDayNotesVOS" :key="index">
								 <view class="lnvi-left fimt">{{item.time}}</view>
								 <view class="lnvi-tiem grat">{{item.invNumber}}</view>
								 <view class="lnvi-grade grat">{{item.value}}</view>						 
							 </view>
					 </view>				  
				</view>
		  </view>
	</view>
</template>

<script>
	import {
	   incomeInfo
	} from '@/api/officer.js'
	export default {
		data() {
			return {
				rankingInfo:""
			}
		},
		onShow() {
		   this.getincomeInfo()
		},
		methods: {
			getincomeInfo() {
			    let that = this
				incomeInfo().then(res => {
					 console.log(res,'推广收益信息')
					  that.rankingInfo = res.data
				})
			},
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
  	  padding: 32upx 0;
  }
  .left-lnvitation {
	  float: left;
	  width: 300upx;
	  text-align: center;
  }
  .lnvitation-num {
	  font-weight: 500;
	  font-size: 48upx;
  }
  .lnvitation-text {
	  font-size: 26upx;
	  color: #AAAAAA;
  }
  .lnvitation-button {
	  float: right;
	  width: 176upx;
	  height: 68upx;
	  line-height: 68upx;
	  text-align: center;
	  font-weight: 500;
	  font-size: 24upx;
	  color: #FFFFFF;
	  background: linear-gradient(0.04deg, #35D28A 1.25%, #95F7B6 100.38%);
	  border-radius: 8upx;
	  margin: 20upx 72upx 0 0;
  }
  .whole-lnvitation {
  	  width: 100%;
  	  background: #FFFFFF;
  	  padding: 90upx 0 0 32upx;
  	  border-radius: 12upx 12upx 0 0;
  }
  .lnvitation-title {
  	  font-weight: 500;
  	  font-size: 32upx;
  	  padding:30upx 0 10upx 0;
  }
  .lnvitation-title text{
  	  font-size: 24upx;
      font-weight: 400;
  	  color: #AAAAAA;
  	  padding-left: 6upx; 
  }
  .lnvitation-info {
	  display: flex;
  }
  .item-content {
  	  flex: 1;
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
  .lnvi-haed {
  	  width: 100%;
  	  padding: 24upx 20upx 24upx 0;
  	   text-align: center;
  	  border-bottom:  1upx solid rgba(51, 51, 51, 0.05);
  }
  .lnvi-left {
  	  float: left;
  	  width: 200upx;
  	  text-align: center;
  	  font-size: 28upx;
  	  color: #AAAAAA;
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
  	  width: 200upx;
  	  font-size: 28upx;
  	  color: #AAAAAA;
  }
  .lnvi-for {
  	   width: 100%;
  	   height: 800upx;
  	   overflow-y: scroll;
  	   overflow-x: hidden; 
  	   padding-bottom: 20upx;
  }
  .fimt {
  	  font-size: 24upx;
  }
  .grat {
  	  color: #777777;
  	  
  }
</style>
