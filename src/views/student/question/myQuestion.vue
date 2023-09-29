<template>
<div class="myQuestion-list">
  <questionItem v-for="question in questions" :key="question.qid" :question="question"  :isSelf=true>
    <el-button type="warning">删除帖子</el-button>
  </questionItem>
</div>
</template>

<script>
import studentInfo from "@/store/modules/studentInfo";
import questionItem from "@/components/card/questionItem.vue";

export default {
  name: "myQuestion",
  components:{
    questionItem
  },
  data() {
    return {
      questions:[
        {
          qid:0,
          qtitle:"问题名称",
          qcontent:"问题的具体描述",
          user:{
            uname:"",
            uavatar:""
          },
          qbrowsecount:666,
          qlikecount:15,
          qanswercount:12,
          qtime:"",
        },
      ],
    }
  },
  methods:{
    // getUserName() {
    //   for(let i=0;i<this.questions.length;i++){
    //     const question = this.questions[i];
    //     //console.log("当前answer的uid："+answer.uid)
    //     this.$set(this.questions[i],'quser',studentInfo.state.stuInfo.uname)
    //   }
    // }
  },
  mounted() {
    this.request.post('question/queryself',{
      uid:studentInfo.state.stuInfo.uid
    })
        .then((response)=>{
          if (response.code==="200"){
            this.questions = response.data;
            //this.getUserName();
          }
        })
  }
}
</script>

<style scoped>

</style>
