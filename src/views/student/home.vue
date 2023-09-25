<template>
<div>
  <homepage v-bind:uType="userType"></homepage>
</div>
</template>

<script>
import homepage from "@/components/homepage/index.vue";
export default {
  name: "home",
  components:{
    homepage
  },
  data(){
    return{
      userType:"student"
    }
  }
}
</script>

<style scoped>

</style>
