<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Demo',
  data() {
    return {
      
    };
  },
  mounted() {
    document.title = 'webpack+vue+ts';
  }
};
</script>
<style lang="less">
  html,body,#app{
    height: 100%;
  }
</style>


