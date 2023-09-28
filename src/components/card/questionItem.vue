<template>
  <el-card class="content-item-content" shadow="hover" style="margin: 20px;background-color:aliceblue">
    <div class="content-info" style="display: grid; grid-template-columns: 150px 1fr">
      <div class="questioner-info">
        <div class="questioner-avatar" style="justify-items: center;margin: 10px">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="70"></el-avatar>
        </div>
        <div class="questioner-name"><span>这是用户名称</span></div>
      </div>
      <div class="questiion-info">
        <div class="question-title">{{question.qtitle}}</div>
        <div class="question-content">
          <div class="question-content-text">
            {{question.qcontent}}
          </div>
          <el-button class="show-all-content" @click="">展开全文</el-button>
        </div>
      </div>
    </div>
    <div class="comment-item" style="display: flex;justify-content: space-between">
      <div class="comment-button">
        <el-button icon="el-icon-search" @click="likeQuestion"  :type="isLiked ? 'primary' : 'default'"> {{ isLiked ? '已点赞' : '点赞' }} {{question.qlikecount}}</el-button>
        <el-button icon="el-icon-search" @click="expandAnswer">评论 {{question.qanswercount}}</el-button>
        <el-button icon="el-icon-search" @click="collectQuestion" :type="isCollected ? 'warning':'default'">{{isCollected?'已收藏':'收藏'}}</el-button>
        <el-button icon="el-icon-search" >举报</el-button>
      </div>
      <div class="comment-count">
        <span>{{question.qtime}}发布&nbsp&nbsp&nbsp</span>
        <span>  {{question.qbrowsecount }}次浏览</span>
      </div>
    </div>

    <el-collapse-transition>
      <div class="answer-zone" v-show="showAnswer">
        <div class="my-answer" style="display: flex">
          <div class="input-zone" style="width: 80%">
            <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="100"
                show-word-limit
            >
            </el-input>
          </div>
          <el-button type="primary" style="height: 50px">提交</el-button>
        </div>

        <div class="answer-list">
          <div class="answer-list-item" v-for="answer in answers" :key="answer.aid" style="display: grid;grid-template-columns: 80px 1fr" >
            <div class="answer-info">
              <div class="answer-avatar">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"></el-avatar>
              </div>
            </div>
            <div class="answer-content">
              <div class="answer-name">
                {{ answer.uid }}
              </div>
            </div>
            <div class="answer-text">
              {{answer.acontent}}
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </el-card>
</template>

<script>

import studentInfo from "@/store/modules/studentInfo";

export default {
  name: "question",
  props:['question'],
  data() {
    return {
      showAnswer:false,
      isLiked:false,
      isCollected:false,
      text: '',
      textarea: '',
      answers:[
        {
          aid:"",
          uid:"",
          acontent:"",
          atime:'',
          alikecount:'',
        }
      ]
    }
  },
  methods:{

    //展开回复
    expandAnswer(){
      this.showAnswer = !this.showAnswer;
      if (this.showAnswer){
        this.fetchAnswer();
      }
    },

    //获取回复列表
    fetchAnswer(){
      // answer/query
      this.request.post('answer/query',{
          qid:this.$props.question.qid
      })
          .then((response)=>{
            if(response.code==="200"){
              this.answers=response.data;
            } else {
              console.log("没有回复")
            }
          })
    },

    //点赞帖子与取消
    likeQuestion(){
      if (this.isLiked === false){
        this.request.post("question/like",{
            uid:studentInfo.state.stuInfo.uid,
            qid:this.$props.question.qid
        })
            .then((response)=>{
              if(response.code === "200"){
                this.isLiked = true;

                this.$message.success("点赞成功！这篇帖子将被更多同学发现~");
                this.$props.question.qlikecount= this.$props.question.qlikecount+1;

              } else{
                this.$message.error("点赞失败，请先登录！")
              }
            })
      } else {  //取消点赞
        this.request.post("question/unlike",{
            uid:studentInfo.state.stuInfo.uid,
            qid:this.$props.question.qid
        })
            .then((response)=>{
              if (response.code === "200"){
                this.isLiked = false;
                this.$message.success("已取消点赞");
                this.$props.question.qlikecount= this.$props.question.qlikecount-1;
              } else {
                this.$message.error("取消点赞失败")
              }
            })
      }
    },

    //收藏帖子与取消
    collectQuestion(){
      if (this.isCollected === false){
        this.request.post("question/coll",{
            uid:studentInfo.state.stuInfo.uid,
            qid:this.$props.question.qid
        })
            .then((response)=>{
              if(response.code === "200"){
                this.isCollected = true;
                this.$message.success("收藏成功！可以到我的收藏夹中去查看~");

              } else{
                this.$message.error("收藏失败，请先登录！")
              }
            })
      } else {  //取消收藏
        this.request.post("question/uncoll",{
            uid:studentInfo.state.stuInfo.uid,
            qid:this.$props.question.qid
        })
            .then((response)=>{
              if (response.code === "200"){
                this.isCollected = false;
                this.$message.success("已取消收藏");
              } else {
                this.$message.error("取消收藏失败")
              }
            })
      }
    }
  },
  mounted() {
    if(studentInfo.state.stuInfo ){
      this.request.post("question/find1",{
          qid:this.$props.question.qid,
          uid:studentInfo.state.stuInfo.uid
      })
          .then((response)=>{
            if(response.code === "200"){
              {
                this.isLiked = response.data.cnt1 === 1;
                this.isCollected = response.data.cnt2 === 1;
              }
            } else {
              console.log("获取当前帖子的点赞收藏情况失败")
            }
          })
    } else {
      this.$message.error("当前用户未登录，请先登录！")
    }

  }
}
</script>

<style scoped>

</style>
