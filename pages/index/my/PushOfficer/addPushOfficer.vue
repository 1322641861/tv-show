<template>
	<view class="whole-page">
		  <view class="officer-img">
			    <image src="../../../../static/img/xtg.png"></image>
		  </view>
		  <view class="whole-padd">
			    <view class="whole-officer">
			    	  <view class="officer-haed">  	
							<view class="haed-item" @click="gonavIndex(0)"
							     :class="navIndex == 0 ? 'whet':''">星推官奖励</view>
							<view class="haed-item" @click="gonavIndex(1)"
							     :class="navIndex == 1 ? 'whet':''">如何成为星推官</view>	   
			    	  </view>
					  <view class="officer-item" v-if="navIndex == 0">
						    <view class="push-for">
								  <view class="push-item flex1">等级</view>
								  <view class="push-item">直推奖励</view>
								  <view class="push-item">间推奖励</view>
								  <view class="push-item flex2">平台分红</view>
							</view>
							<view class="push-for">
								  <view class="push-item flex1">黄金</view>
								  <view class="push-item">{{spreadData.starSpreadAwardVO.directGold}}</view>
								  <view class="push-item">{{spreadData.starSpreadAwardVO.indirectGold}}</view>
								  <view class="push-item flex2">{{spreadData.starSpreadAwardVO.platformGold}}</view>
							</view>
							<view class="push-for">
								  <view class="push-item flex1">钻石</view>
								  <view class="push-item">{{spreadData.starSpreadAwardVO.directDiamond}}</view>
								  <view class="push-item">{{spreadData.starSpreadAwardVO.indirectDiamond}}</view>
								  <view class="push-item flex2">{{spreadData.starSpreadAwardVO.platformDiamond}}</view>
							</view>
							<view class="push-for">
								  <view class="push-item flex1">王者</view>
								  <view class="push-item">{{spreadData.starSpreadAwardVO.directKing}}</view>
								  <view class="push-item">{{spreadData.starSpreadAwardVO.indirectKing}}</view>
								  <view class="push-item flex2">{{spreadData.starSpreadAwardVO.platformKing}}</view>
							</view>
							<view class="officer-text">
								  <text>增速排行榜奖励:</text> 每月推广流水增长比例排名前10名的用户瓜分当月流水的{{spreadData.velocityRankingPercentage}}%。
							</view>
							<view class="officer-text">
								  <text>流水排行榜奖励:</text> 每月推广流水额排名前10名的用户瓜分流水的{{spreadData.billRankingPercentage}}%。
							</view>
							<view class="officer-text" style="border-bottom: none;">
								  <text>升级奖励:</text> 升级到黄金星推官一次性奖励{{spreadData.updateGoldAward}}元，升级到钻石星推官一次性奖励{{spreadData.updateDiamondAward}}元。
							</view>
					  </view>
					  <view class="officer-item" v-if="navIndex == 1">
						    <view class="condition-for">
						    	  <view class="condition-deng">等级</view>
						    	  <view class="condition-item">条件一</view>
						    	  <view class="condition-item">条件二</view>
						    </view>
							<view class="condition-for">
								  <view class="condition-deng">黄金</view>
								  <view class="condition-item test">邀请五个有效用户</view>
								  <view class="condition-item test">/</view>
							</view>
							<view class="condition-for">
								  <view class="condition-deng">钻石</view>
								  <view class="condition-item test">分享流水达到10000元人民币</view>
								  <view class="condition-item test">邀请的用户中有3个黄金用户，并邀请了50个有效用户</view>
							</view>
							<view class="condition-for">
								  <view class="condition-deng">王者</view>
								  <view class="condition-item test">分享流水达到50000元人民币</view>
								  <view class="condition-item test">邀请的用户中有3个钻石用户，并邀请了200个有效用户</view>
							</view>
					  </view>
			    </view>		
		  </view>
	</view>
</template>

<script>
	import {
	    SpreadInfo
	} from '@/api/officer.js'
	export default {
		data() {
			return {
				navIndex:0,
				spreadData:""
			}
		},
		onLoad() {
			this.getSpreadInfo()
		},
		methods: {
			getSpreadInfo(){
				let that = this
				SpreadInfo().then(res => {
					console.log(res)
					that.spreadData = res.data
				})
			},
			gonavIndex(i){
				this.navIndex = i
			}
		}
	}
</script>

<style>
  page {
  		background: linear-gradient(179.97deg, #E2F4FF 36.03%, #FFFFFF 99.98%);
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
  .whole-officer {
	  width: 100%;
	  background-color: #fff;
	  box-shadow: 0px 8upx 16upx rgba(0, 0, 0, 0.1);
	  border-radius: 16upx;
	  padding: 0 24upx;
	  margin-bottom: 30upx;
  }
  .officer-haed {
	  width: 100%;
	  padding: 32upx 0 24upx 0;  
	  border-bottom: 1upx solid #F0F0F0;
  }
  .haed-item {
	  float: left;
	  font-weight: 500;
	  font-size: 32upx;
	  color: #D8D8D8;
	  margin-right: 72upx;
  }
  .whet {	 
    color: #333333; 
  }
  .officer-item {
	  width: 100%;
  }
  .push-for {
	  width: 100%;
	  border-bottom: 1upx solid #F0F0F0;
  }
  .push-item {
	  font-size: 28upx;
	  text-align: center; 
	  color: #AAAAAA;
	  padding: 24upx 0;
      float:left;
	  width: 200upx;
  }
  .flex1 {
	  text-align: left;
	  width: 90upx;
  }
  .flex2 {
  	  float: right;
  	  width: 140upx;
  }
  .officer-text {
	  width: 100%;
	  padding: 24upx 0;
	  font-weight: 500;
	  font-size: 26upx;	  
	  border-bottom: 1upx solid #F0F0F0;
	  color: rgba(170, 170, 170, 1);
  }
  .officer-text text{
	  color: #777777;
  }
  .condition-for {
	  width: 100%;
	  display: flex;
	  border-bottom: 1upx solid #F0F0F0;
  }
  .condition-deng {
	  width: 90upx;
	  font-size: 28upx;
	  color: #AAAAAA;
	  padding: 24upx 0;
	  margin-right: 40upx;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
  }
  .condition-item {
	  flex: 1;
	  font-size: 28upx;
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
	  color: #AAAAAA;
	  padding: 24upx;
	  
  }
  .test {
	  text-align: left;
  }
  .push-button {
	  width: 600upx;
	  height: 96upx;
	  text-align: center;
	  line-height: 96upx;
	  background: #333333;
	  border-radius: 8upx;
	  margin: 0 auto;
	  font-weight: 500;
	  font-size: 32upx;
	  color: #FFFFFF;
  }
</style>
