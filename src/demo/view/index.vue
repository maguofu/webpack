<template>
  <div class="index-component">
    ttttiiiii
    <div class="goto-result-btn" @click="gotoResult">跳转到result页面</div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import $http from '@src/api/api.js';
  @Component({
    components: {
    }
  })

  export default class Demo extends Vue {
    created() {
      ($http as any).demoApi({a: 'asdfasdf'}).then((res:any) => {
        console.log(res);
      }).catch((e:any) => {

      })
    }
    gotoResult() {
      (this as any).$router.push({name: 'result', params: {}});
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

