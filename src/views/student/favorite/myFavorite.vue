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
          qtitle:"问题名称",
          qcontent:"问题的具体描述",
          quser:"用户姓名",
          qavatar:"用户头像url",
          qbrowsecount:666,
          qlikecount:15,
          qanswercount:12,
          qtime:"",
        },
      ],
    }
  },
  methods:{
    getUserName() {
      return studentInfo.state.stuInfo.uname
    }
  },
  mounted() {
    this.request.post('question/queryself',{
      uid:studentInfo.state.stuInfo.uid
    })
        .then((response)=>{
          if (response.code==="200"){
            this.questions = response.data;
            this.getUserName();
          }
        })
  }
}
</script>

<style scoped>

</style>
