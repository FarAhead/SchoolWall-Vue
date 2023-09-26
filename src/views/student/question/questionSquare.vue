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
                <el-button type="primary" @click="submitForm('askForm')" >立即提问</el-button>
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
import studentInfo from "@/store/modules/studentInfo";
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
        },
      ],
      rules:{
        askTitle: [ { required: true, message: "账号不能为空！", trigger: "blur" },],
        askContent: [{required:true,message:"请填写内容",trigger:"blur"},],

      },
    }
  },

  methods:{
    submitForm(formName){
      this.$refs["askForm"].validate((valid)=>{
        if (valid){
          this.request.post("question/add",{
            body:{
              uid:studentInfo.state.stuInfo.uid,
              qtitle:this.askForm.askTitle,
              qcontent:this.askForm.askContent,
              qtime:this.getDateTime(),
              qlabel:1
            }
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
    getDateTime() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
          new Date().getMinutes() < 10
              ? "0" + new Date().getMinutes()
              : new Date().getMinutes();
      let ss =
          new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
      let gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      return gettime;
    },
  },

  mounted() {
    //页面加载后自动获取所有帖子
    this.request.post('question/queryall')
        .then((response)=>{
          console.log("帖子加载完毕")
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
