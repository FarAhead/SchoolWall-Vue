<template>
<div>
  <el-card class="answer-item" style="margin: 20px">
    <div>问题id：{{answer.aid}}</div>
    <div>提问者id:{{answer.uid}}</div>
    <div>提问内容:{{answer.acontent}}</div>
    <div>提问时间：{{answer.atime}}</div>
    <div class="manage-button">
      <el-button type="primary" @click="questionPass">撤销举报</el-button>
      <el-button type="danger" @click="questionNotPass">删除提问</el-button>
    </div>

  </el-card>
</div>
</template>

<script>
export default {
  name: "answerItem",
  props:['answer'],
  methods:{
    questionPass(){
      this.request.post("answer/agree",{
        aid:this.$props.answer.aid
      }).then(res=>{
        if(res.code==="200"){
          this.$message.success("举报已撤销");
          this.$parent.fetchReport();
        }
      })
    },
    questionNotPass(){
      this.request.post("answer/del",{
        aid:this.answer.aid
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
