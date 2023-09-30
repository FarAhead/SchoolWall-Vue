<template>
  <div class="myQuestion-list">
    <questionItem v-for="question in questions" :key="question.qid" :question="question"></questionItem>
  </div>
</template>

<script>
import studentInfo from "@/store/modules/studentInfo";
import questionItem from "@/components/card/questionItem.vue";

export default {
  name: "myFavorite",
  components:{
    questionItem
  },
  data() {
    return {
      questions:[
        {
          qid:0,
          qtitle:"",
          qcontent:"",
          qtime:"",
          user:{
            uid:"",
            uname:"",
            uavatar:""
          },
          qbrowsecount:0,
          qlikecount:0,
          qanswercount:0,
        },
      ],
    }
  },
  methods:{

  },
  mounted() {
    this.request.post('lik/my',{
      uid:studentInfo.state.stuInfo.uid
    })
        .then((response)=>{
          if (response.code==="200"){
            this.questions = response.data;
          }
        })
        .catch(err=>{
          this.$message.error("获取失败")
        })
  }
}
</script>

<style scoped>

</style>
