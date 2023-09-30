<template>
<div>
  <answer-item v-for="answer in answers" :key="answer.aid" :answer="answer"></answer-item>
</div>
</template>

<script>
import answerItem from "@/components/card/reportItem.vue";
export default {
  name: "reportVerify",
  data(){
    return{
      answers:{
        aid:0,
        qid:0,
        uid:0,
        acontent:"",
        atime:""
      },
    }
  },
  components:{
    answerItem
  },
  methods:{
    fetchReport(){
      this.request.post("answer/query2")
          .then(res=>{
            this.answers = res.data;
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
