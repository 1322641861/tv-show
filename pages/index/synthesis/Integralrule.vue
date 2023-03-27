<template>
	<view class="whole-page">
		  <view class="lnt-title">1、积分乐园简介</view>
		  <view class="lnt-text">
			  积分乐园是为用户提供的一个兑换礼品玩法，用户可以通过每天做任务获得积分；
			  完成任务后，需要点击任务后方的领取积分按钮获得积分。
		  </view>
		  <view class="lnt-title">2、玩法简介</view>
		  <view class="lnt-text">
			  积分乐园是为用户提供的一个兑换礼品玩法，用户可以通过每天做任务获得积分；
			  完成任务后，需要点击任务后方的领取积分按钮获得积分。
		  </view>
		  <view class="lnt-text">1）每日签到领积分规则：用户每天来访积分乐园首页签到，可以获得对应的积分，连续签到可以获得积分加成，每连续签到7天，第7天获得额外积分；</view>
		  <view class="lnt-text">
			    •若用户断签，则重新开始计算连续签到天数。
		  </view>
		  <view class="lnt-text">
			  2）邀请好友规则：用户可以通过邀请有效新用户获得积分（有效新用户指在活动时间范围内注册并且收藏了任意一个有效艺术品的用户），连续邀请好友可以获得积分加成；
		  </view>
		  <view class="lnt-text">
			  3）收藏艺术品规则：每日新拥有任意一个有效的的艺术品，可获得积分。
		  </view>
		  <view class="lnt-text">
		  		 •曾经拥有过的藏品，再次拥有不会获得积分
		  </view>
		  <view class="lnt-text">
			  4）合成艺术品规则：用户每日合成有效艺术品可获得积分，连续合成可以获得积分加成。
		  </view>
		  <view class="lnt-title">3、其他说明</view>
		  <view class="lnt-text">1）签到等获取积分上限说明：用户通过任务获得的积分，若未收取，会有容量上限，到达上限后不再获得新积分；</view>
		  <view class="lnt-text">2） 在获取和使用积分的过程中，如果用户存在违规行为（如作弊领取、恶意套现、刷取信誉、虛假交
易、拆单套现等），密盒星球将取消您的获取资格，并有权撤销违规交易，扣除违规获得或使用的积分和其他奖励，必要时追究法律责任。</view>
		  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.whole-page {
		width: 100%;
		padding: 48upx;
	}
    .lnt-title {
		width: 100%;
		font-weight: 500;
		font-size: 32upx;
		color: #222222;
		padding-bottom: 20upx;
	}
	.lnt-text {
		width: 100%;
		font-size: 28upx;
		color: #222222;
		padding-bottom: 30upx;
	}
</style>
