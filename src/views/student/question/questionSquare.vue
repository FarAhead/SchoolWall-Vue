<template>
<el-row :gutter="20">
  <el-col :span="19"  style="height: 100%;">
    <div class="grid-content bg-purple">
      <div class="channel-container" style="display: flex;padding-top: 20px;padding-left: 20px">
        <div class="channel"><el-button round >健身</el-button></div>
        <div class="channel"><el-button round >美食</el-button></div>
        <div class="channel"><el-button round >运动</el-button></div>
        <div class="channel"><el-button round >生活</el-button></div>
        <div class="channel"><el-button round >学习</el-button></div>
      </div>

      <div class="content-list-container">
        <questionItem v-for="question in questions" :key="question.qid" :question="question"></questionItem>
      </div>
    </div>

  </el-col>
  <el-col :span="5">
    <div class="grid-content bg-purple-light">
      <div class="ask-question" style="display: flex">
        <div class="ask-question-title" style="margin-top: 80px">
          <div class="ask-question-head" @click="isAskShow =!isAskShow"><span style="font-weight: bold;color: #00838F;font-size: 20px">点击提问</span></div>
          <transition name="el-fade-in-linear">
            <el-form class="ask-question-content" v-show="isAskShow" :model="askForm" ref="askForm">
              <el-form-item label="问题名称" prop="askTitle">
                <el-input v-model="askForm.askTitle"></el-input>
              </el-form-item>
              <el-form-item label="问题内容" prop="askContent">
                <el-input type="textarea"
                          v-model="askForm.askContent"
                          maxlength="100"
                          placeholder="在这里输入你想说的话"
                          show-word-limit
                >
                </el-input>
                <el-button type="primary" @click="submitForm('askForm')" style="margin-top: 40px;float: right">立即提问</el-button>
              </el-form-item>
            </el-form>
          </transition>
        </div>
      </div>

    </div>
  </el-col>




</el-row>

</template>

<script>
import questionItem from "@/components/card/questionItem.vue";
import studentInfo from "@/store/modules/studentInfo";
import {getDateTime} from "@/utils/getDateTime";

export default {
  name: "questionSquare",
  components:{
    questionItem
  },
  data(){
    return {
      //是否显示提问框
      isAskShow:false,

      //提问表单
      askForm:{
        askTitle:'',
        askContent:''
      },

      //帖子的列表
      questions:[
        {
          qid:0,
          uid:"",
          qtitle:"问题名称",
          qcontent:"问题的具体描述",
          user:{
            uname:"",
            uavatar:"",
          },
          qavatar:"用户头像url",
          qbrowsecount:666,
          qlikecount:15,
          qanswercount:12,
          qtime:"",
        },
      ],
      rules:{
        askTitle: [ { required: true, message: "账号不能为空！", trigger: "blur" },],
        askContent: [{required:true,message:"请填写内容",trigger:"blur"},],
      },
    }
  },

  methods:{
    // getUserNameAvatar(){
    //   for(let i=0;i<this.questions.length;i++){
    //     const question = this.questions[i];
    //     //console.log("当前answer的uid："+answer.uid)
    //     this.request.post("user/query1",{
    //       uid:question.uid
    //     })
    //         .then(res=>{
    //           //见下文，一定要用$set方法！
    //           this.$set(this.questions[i], 'quser', res.data.uname);
    //           this.$set(this.questions[i], 'qavatar', res.data.uavatar);
    //           //console.log(this.answers[i].uname)
    //         })
    //   }
    // },

    //提交我的提问
    submitForm(formName){
      this.$refs["askForm"].validate((valid)=>{
        if (valid){
          this.request.post("question/add",{
              uid:studentInfo.state.stuInfo.uid,
              qtitle:this.askForm.askTitle,
              qcontent:this.askForm.askContent,
              qtime:getDateTime,
              qlabel:1
          })
              .then((response)=>{
                if (response.code === "200"){
                  this.$message({message: '发送成功', type: 'success'});
                  this.$refs["askForm"].resetFields();
                } else {
                  this.$message({message: '发送失败，请重试', type: 'error'});
                }
              })
        }else{
          console.log("error")
        }
      })
    },
  },

  mounted() {
    //页面加载后自动获取所有帖子
    this.request.post('question/queryall')
        .then((response)=>{
          console.log("帖子加载完毕")
          if (response.code==="200"){
            this.questions = response.data;
            //this.getUserNameAvatar();
          }
        })
  }
}
</script>

<style lang="less" scoped>
.channel{
margin-right: 10px;
  el-button{
    box-shadow: #8c939d 0 0 10px;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
