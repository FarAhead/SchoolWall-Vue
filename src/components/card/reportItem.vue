<template>
<div>
  <el-card class="answer-item" style="margin: 20px">
    <div class="report-item">问题id：{{report.qid}}</div>
    <div class="report-item">提问者id:{{report.uid}}</div>
    <div class="report-item">提问标题:{{report.qtitle}}</div>
    <div class="report-item">提问时间：{{report.qtime}}</div>
    <div class="report-item" style="font-size: 20px;margin-top: 8px;color: #212121;font-weight: bold">提问内容:{{report.qcontent}}</div>
    <div class="manage-button" >
      <el-button type="danger" @click="questionNotPass" style="float: right;margin-bottom: 20px">删除提问</el-button>
      <el-button type="primary" @click="questionPass" style="float: right;margin-bottom: 20px;margin-right: 20px">撤销举报</el-button>
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
.report-item{
  margin-bottom: 3px;
  color: #757575;
  font-size: 16px;
}
</style>
