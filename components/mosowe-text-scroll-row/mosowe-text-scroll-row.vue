<template>
  <view class='text-scroll-wrap'>
		<view class="text-content"
			:style="{
				left:leftMove+'px'
				}">
			<view 
				class="text-item"
				 :class="{
					 active: textKey || imageKey ? JSON.stringify(actives).indexOf(JSON.stringify(text)) > -1: actives.includes(text)
				 }"
				v-for="(text,index) in myList" 
				:key="index" 
				@click="clickThis($event)" :data-text="textKey || imageKey ? JSON.stringify(text): text">
				<view class="text" style="color: #fff;font-size: 24upx;">
					<image v-if="imageKey" :src="text[imageKey]" class="image"></image>
					{{type === 'text' ? (textKey ? text[textKey] : text) : ''}}
				</view>
			</view>			
		</view>
	</view>
</template>

<script>
export default {
  name: 'text-scroll-wrap',
  components: {},
  props: {
		list: { // 滚动列表
			type: Array,
			default: () => {
				return [];
			}
		},
		type: {// 类型
			type: String,
			default: 'text',
			validator: (value) => {
				return ['text', 'image'].indexOf(value) !== -1;
			}
		},
		textKey: { // 文字key值
			type: String,
			default: ''
		},
		imageKey: { // 图片key值
			type: String,
			default: ''
		},
		actives: { // 如果需要，此为已选列表
			type: Array,
			default: () => {
				return [];
			}
		},
		duration: { // 间隔时间
			type: [Number, String],
			default: 20
		},
		delay: { // 延迟时间
			type: [Number, String],
			default: 0
		},
		initPosition: { // 初始位置
			type: String,
			default: 'left',
			validator: (value) => {
				return ['left', 'right'].indexOf(value) !== -1;
			}
		}
	},
  data () {
    return {
			myList: [],
			leftMove: 0,
			firstItemWidth: 0,
			wrapWidth: 0,
    };
  },
  // 组件实例化之前
  beforeCreate () {},
  // 组件创建完成
  created () {
		this.myList = this.list;
	},
  // 组件挂载之前
  beforeMount () {},
  // 组件挂载之后
  mounted () {
		let query = uni.createSelectorQuery().in(this);
		query.select('.text-item').boundingClientRect(data => {
			this.firstItemWidth = data.width;
		}).exec();
		query.select('.text-scroll-wrap').boundingClientRect(data => {
			this.wrapWidth = data.width;
			this.initPosition ==='left' ? this.leftMove = 0 : this.leftMove = this.wrapWidth;
		}).exec();
		if (this.delay<=0) {
			this.scrollContent();
		} else {
			let t = setTimeout(() => {
				clearTimeout(t);
				this.scrollContent();
			}, Number(this.delay));
		}
		
	},
  // 组件数据更新时
  beforeUpdate () {},
  // 组价更新
  updated () {},
  // 组件销毁前
  beforeDestroy () {},
  // 组件销毁后
  destroyed () {},
  // 页面方法
  methods: {
		// 点击此项
		clickThis (e) {
			// console.log(e.currentTarget.dataset.text);
			this.$emit('change', e.currentTarget.dataset.text);
		},
		// 滚动
		scrollContent () {
			let num = this.initPosition === 'left' ? 0 : this.wrapWidth;
			setInterval(() => {
				num--;
				if (num < 0 && Math.abs(num) >= this.firstItemWidth) {
					this.myList.push(this.myList[0]);
					this.myList.splice(0, 1);
					num += this.firstItemWidth;
					let query = uni.createSelectorQuery().in(this);
					query.selectAll('.text-item').boundingClientRect(data => {
						this.firstItemWidth = data[1].width;
					}).exec();
				}
				this.leftMove = num;
			}, Number(this.duration));
		}
	}
};
</script>

<style lang='scss'>
.text-scroll-wrap{
	overflow: hidden;
	width: 100%;
	height: 40rpx;
	line-height: 40rpx;
	position: relative;
	.text-content{
		display: inline-block;
		white-space: nowrap;
		height: 100%;
		position: absolute;
		top: 0;
		.text-item{
			width: 430upx !important;
			height: 100%;
			display: inline-block;
			overflow: hidden;
			font-size: 24rpx;
			/* color: #007778; */
			color: #fff !important;
			.text{
				padding: 0 30rpx;
				margin: 0 20rpx;
				/* background: #D9FFF2; */
				border-radius: 50rpx;
				.image{
					display: inline-block;
					width: 50rpx;
					height: 50rpx;
					vertical-align: middle;
				}
			}
			&.active .text{
				background: #1E90FF;
				color: #fff !important;
			}
		}
	}
}
</style>
