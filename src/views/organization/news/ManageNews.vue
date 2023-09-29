<template>
<div>
  <notice-item v-for="notice in notices" :key="notice.id" :notice="notice" :permission="permission"/>
</div>
</template>

<script>
import noticeItem from "@/components/card/noticeItem.vue";
import organizationInfo from "@/store/modules/organizationInfo";
export default {
  name: "ManageNews",
  components:{
    noticeItem
  },
  data(){
    return{
      permission:"org",
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
      this.request.post("notice/query",{
        uid:organizationInfo.state.orgInfo.uid
      })
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
  }
}
</script>

<style scoped>

</style>
