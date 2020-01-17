<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data() {
    return {
      
    }
  },
  mounted() {
    document.title = 'webpack+vue'
  },
}
</script>
<style lang="less">
  html,body,#app{
    height: 100%;
  }
</style>


