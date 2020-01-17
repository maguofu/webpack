<template>
  <div class="result-conponent">
    tttttrrrr
    <div class="goto-index-btn" @click="gotoIndex">跳转到index页面</div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { funDecorator, funDecoratorHigher } from "@src/common/decorator/test";
  @Component({
    components: {
    }
  })

  export default class Demo extends Vue {
    private context: any = null;
    created() {
      this.testHander();
    }

    gotoIndex() {
      console.log(this);
      ((this as any).$router as any).push({name: 'index', params: {}});
    }

    @funDecoratorHigher(new Demo())
    testHander() {
      console.log('============');
      this.myFun();
    }

    myFun() {
      console.log('啊看见对方卡的是否卡');
    }
  }
</script>
<style lang="less" scoped>
  .goto-index-btn{
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
