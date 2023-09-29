<template>
  <div>
    <el-empty v-if="isEmpty" description="暂无公告"></el-empty>
    <notice-item v-else v-for="notice in notices" :key="notice.nid" :notice="notice" :permission="permission"></notice-item>
  </div>
</template>

<script>
import noticeItem from "@/components/card/noticeItem.vue";
export default {
  name: "newsSquare",
  data(){
    return{
      isEmpty:false,
      permission:"student",
        notices:[
          {
            nid:'',
            uid:'',
            ntitle:'',
            ncontent:'',
            ntime:'',
            organization:{
              zname:'',
              zavatar:''
            },
          }
        ],
    }
  },
  components: {
    noticeItem
  },
  methods:{
    fetchNotice(){
      this.request.post("notice/queryall",)
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
