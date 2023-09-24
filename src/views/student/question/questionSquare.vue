<template>
<div>
  <el-col :span="18">
    <div class="grid-content bg-purple">

      <div class="channel-container" style="display: flex">
        <div class="channel"><el-button round>健身</el-button></div>
        <div class="channel"><el-button round>美食</el-button></div>
        <div class="channel"><el-button round>运动</el-button></div>
        <div class="channel"><el-button round>生活</el-button></div>
        <div class="channel"><el-button round>学习</el-button></div>
      </div>

      <div class="content-list-container">
        <questionItem v-for="question in questions" :key="question.qid" :question="question"></questionItem>
      </div>
    </div>

  </el-col>
  <el-col :span="6">
    <div class="grid-content bg-purple-light">
    右边可以放一些快捷链接
    </div>
  </el-col>




</div>

</template>

<script>
import questionItem from "@/components/card/questionItem.vue";

export default {
  name: "questionSquare",
  components:{
    questionItem
  },
  data(){
    return {
      questions:[
        {
          qid:0,
          qtitle:"问题名称",
          qcontent:"问题的具体描述",
          quser:"用户姓名",
          qavatar:"用户头像url",
          qbrowsecount:666,
          qlikecount:15,
          qanswercount:12,
          qtime:"",
          comments:[
            {
              auser:"回复者姓名",
              aavatar:"回答用户url",
              acontent:"回答的内容"

            }
          ]
        }
      ]
    }
  },
  methods:{

  },
  mounted() {
    this.request.post('https://mock.apifox.cn/m2/3303344-0-default/111528940')
        .then((response)=>{
          console.log("11111111111")
          if (response.code==="200"){
            this.questions = response.data;
          }
        })
  }
}
</script>

<style scoped>

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
