<template>
  <div class="index-component">
    ttttiiiii
    <div class="goto-result-btn" @click="gotoResult">跳转到result页面</div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  export default class Demo extends Vue {

    gotoResult() {
      // this.$router.push({name: 'result', params: {}});
      console.log('asdfsdfg');
    }
  }
</script>
<style lang="less" scoped>
  .goto-result-btn{
    font-size: .2rem;
    width: 4rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    border-radius: .3rem;
    position: fixed;
    bottom: .5rem;
    left: 50%;
    margin-left: -2rem;
    background: #ccc;
  }
</style>

