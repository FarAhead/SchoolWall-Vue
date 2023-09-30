<template>
<div>
  <el-card class="answer-item" style="margin: 20px">
    <div>问题id：{{report.qid}}</div>
    <div>提问者id:{{report.uid}}</div>
    <div>提问标题:{{report.qtitle}}</div>
    <div>提问内容:{{report.qcontent}}</div>
    <div>提问时间：{{report.qtime}}</div>
    <div class="manage-button">
      <el-button type="danger" @click="questionNotPass" style="float: right">删除提问</el-button>
      <el-button type="primary" @click="questionPass" style="float: right">撤销举报</el-button>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  props:['report'],
  methods:{
    questionPass(){
      this.request.post("question/agree",{
        qid:this.$props.report.qid
      }).then(res=>{
        if(res.code==="200"){
          this.$message.success("审核完成，举报已撤销");
          this.$parent.fetchReport();
        }
      })
    },
    questionNotPass(){
      this.request.post("question/del",{
        qid:this.report.qid
      })
          .then(res=>{
            this.$message.success("成功删除该条提问！");
            this.$parent.fetchReport();
          })
    }
  }
}
</script>

<style scoped>

</style>
