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
          qtime:"",
          user:{
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
    getUserName() {
      return studentInfo.state.stuInfo.uname
    }
  },
  mounted() {
    this.request.post('question/myfavorite',{
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
