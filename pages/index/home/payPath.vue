<template>
    <view>
      <!--  <form name="myform" :action="payPath" method="post" /> -->
    </view>
</template>

<script>
    document.myform.submit();
    export default {
        data() {
            return {
                payPath: '',
            }
        },
        onLoad(e) {
            console.log('eeee',e);
            // this.payPath = e.payPath
            document.querySelector('body').innerHTML = payPath;
            document.forms[0].submit()
        },
        onShow(e) {
            console.log('eee',e);
        },
        methods: {

        }
    }
</script>

<style>
</style>
