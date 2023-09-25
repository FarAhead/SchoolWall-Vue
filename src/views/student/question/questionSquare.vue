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
      <div class="ask-question" style="display: flex">
        <div class="ask-question-title">
          <div class="ask-question-head" @click="isAskShow =!isAskShow"><span>点击提问</span></div>
          <el-collapse-transition>
            <el-form class="ask-question-content" v-show="isAskShow" :model="askForm" ref="askForm">
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="askForm.askTitle"></el-input>
              </el-form-item>
              <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea"
                          v-model="askForm.askContent"
                          maxlength="100"
                          placeholder="在这里输入你想说的话"
                          show-word-limit
                >
                </el-input>
                <el-button type="primary" @click="submitForm('askForm')">立即提问</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-transition>
        </div>
      </div>

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
      isAskShow:false,
      askForm:{
        askTitle:'',
        askContent:''

      },
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
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if (valid){
          alert("submit");
        }else{
          console.log("error")
        }
      })
    }
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
