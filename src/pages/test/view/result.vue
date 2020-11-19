<template>
  <div class="result-conponent">
    asdfa
    <div class="goto-index-btn" @click="gotoIndex">跳转到index页面</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    gotoIndex() {
      this.$router.push({name: 'index', params: {}});
    }
  },
};
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

