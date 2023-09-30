<template>
<div>
  <el-empty v-if="!reports" description="暂无待审核举报"></el-empty>
  <report-item v-else v-for="report in reports" :key="report.aid" :report="report"></report-item>
</div>
</template>

<script>
import reportItem from "@/components/card/reportItem.vue";
export default {
  name: "reportVerify",
  data(){
    return{
      reports:{
        qid:0,
        uid:0,
        qtitle:"",
        qcontent:"",
        qtime:"",
        uname:{
          uname:"",
        }
      },
    }
  },
  components:{
    reportItem
  },
  methods:{
    fetchReport(){
      this.request.post("question/query2")
          .then(res=>{
            this.reports = res.data;
          })
    }

  },
  mounted() {
    this.fetchReport()
  }
}
</script>

<style scoped>

</style>
