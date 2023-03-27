<template>
	<view class="whole-page">
		   <view style="width: 10rem; margin: 1rem auto;">
		        <button type="default" plain="true" @click="chooseImg">
		          choose image
		        </button>
		      </view>
		  
		      <view style="display: flex;justify-content: center;align-items: center;margin-top: 1rem;">
		        <image :src="imgDataUrl" mode="aspectFit"></image>
		      </view>
	</view>
</template>

	
<script>
	export default {
	  data() {
	    return {
	      // 储存最后裁剪的数据 base64
	      imgDataUrl: "",
	    };
	  },
	
	  methods: {
	    chooseImg() {
	      const that = this;
	      uni.navigateTo({
	         url: "../../uni_modules/buuug7-img-cropper/pages/cropper",
	        events: {
	          imgCropped(event) {
	            // 监听裁剪完成
	            // 返回的 event 中包含了已经裁剪好图片的base64编码字符串
	            // 你可以使用 <image :src="imgDataUrl" mode="aspectFit"></image> 组件来展示裁剪后的图片
	            // 或者你可以将该字符串通过接口上传给服务器用来保存
	            console.log(event);
	            that.imgDataUrl = event.data;
	            // do whatever you want
	            // upload to server
	          },
	        },
	      });
	    },
	  },
	};
</script>

<style>
</style>