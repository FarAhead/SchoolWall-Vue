<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name:'App',
  // beforeMount() {
  //   window.addEventListener('beforeunload',function (e){
  //     window.localStorage.clear();
  //   });
  // }
}
</script>

<style lang="less">
  html,body{
    margin: 0;
    padding: 0;
  }
</style>
