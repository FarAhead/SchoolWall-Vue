<template>
<div>
  <notice-item v-for="notice in notices" :key="notice.id" :notice="notice" :permission="permission"/>
</div>
</template>

<script>
import noticeItem from "@/components/card/noticeItem.vue";
export default {
  name: "newsVerify",
  components:{
    noticeItem
  },
  data() {
    return{
      permission:"admin",
      notices:[{
        nid:'',
        uid:'',
        ntitle:'',
        ncontent:'',
        ntime:'',
      }]
    }
  },
  methods:{
    fetchNotice(){
      this.request.post("notice/queryall2")
          .then(res=>{
            if (res.code === "200"){
              this.notices=res.data;
            } else {
              console.log("获取公告失败！")
            }
          })
    }
  },
  mounted() {
    this.fetchNotice();
  },
}
</script>

<style scoped>

</style>
