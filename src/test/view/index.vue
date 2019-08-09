<template>
  <div class="index-conponent">
    aaaaaa
    <div class="goto-result-btn" @click="gotoResult">跳转到result页面</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    gotoResult() {
      this.$router.push({name: 'result', params: {}});
    }
  },
}
</script>
<style lang="less" scoped>
  .index-conponent{
    
  }
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

