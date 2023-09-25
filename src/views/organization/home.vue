<template>
<div>
<homepage :u-type="userType"></homepage>
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
      userType:"organization"
    }
  }
}
</script>

<style scoped>

</style>
