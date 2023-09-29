<template>
  <el-card class="content-item-content" shadow="hover" style="margin: 20px;background-color:aliceblue" >
    <div ref="questionItem">
    <div class="content-info" style="display: grid; grid-template-columns: 150px 1fr">
      <div class="questioner-info">
        <div class="questioner-avatar" style="justify-items: center;margin: 10px">
          <el-avatar :src=question.user.uavatar :size="70"></el-avatar>
        </div>
        <div class="questioner-name"><span>{{question.user.uname}}</span></div>
      </div>
      <div class="questiion-info">
        <div class="question-title">{{question.qtitle}}</div>
        <div class="question-content">
          <div class="question-content-text">
            {{shortContent}}
          </div>
          <el-button v-if="showButton" type="text" class="show-all-content" @click="expandContent">展开全文</el-button>
        </div>
      </div>
    </div>
    <div class="comment-item" style="display: flex;justify-content: space-between">
      <div class="comment-button">
        <el-button icon="el-icon-search" @click="likeQuestion"  :type="isLiked ? 'primary' : 'default'"> {{ isLiked ? '已点赞' : '点赞' }} {{question.qlikecount}}</el-button>
        <el-button icon="el-icon-search" @click="expandAnswer">评论 {{question.qanswercount}}</el-button>
        <el-button icon="el-icon-search" @click="collectQuestion" :type="isCollected ? 'warning':'default'">{{isCollected?'已收藏':'收藏'}}</el-button>
        <el-button icon="el-icon-search" >举报</el-button>
        <el-button icon="el-icon-search" v-if="this.$props.isSelf===true" type="danger" @click="deleteQuestion">删除帖子</el-button>
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
          <el-button type="primary" @click="submitAnswer" style="height: 50px">提交</el-button>
        </div>

        <div class="answer-list">
          <div class="answer-list-item" v-for="answer in answers" :key="answer.aid" style="display: grid;grid-template-columns: 80px 1fr" >
            <div class="answer-info">
              <div class="answer-avatar">
                <el-avatar :src=answer.aavatar :size="50"></el-avatar>
              </div>
            </div>
            <div class="answer-content">
              <div class="answer-name">
                {{ answer.aname || "未知用户" }}
              </div>
              <div class="answer-text">
                {{answer.acontent}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    </div>
  </el-card>
</template>

<script>

import studentInfo from "@/store/modules/studentInfo";
import {getDateTime} from "@/utils/getDateTime";


export default {
  name: "question",
  props:['question','isSelf'],
  data() {
    return {
      showAnswer:false,
      isLiked:false,
      isCollected:false,
      isExpanded:false,
      observer:null,
      text: '',
      textarea: '',
      answers:[
        {
          aid:"",
          uid:"",
          aname:"",
          aavatar:"",
          acontent:"",
          atime:'',
          alikecount:'',
        }
      ]
    }
  },
  computed:{
    //显示全文相关
    shortContent(){
      if (this.isExpanded || this.$props.question.qcontent.length <= 100) {
        return this.$props.question.qcontent;
      } else {
        return this.$props.question.qcontent.slice(0, 100) + '...';
      }
    },
    showButton() {
      return this.$props.question.qcontent.length > 100 && !this.isExpanded;
    }
  },
  methods:{
    //展开全文
    expandContent() {
      this.isExpanded = true;
    },

    expandAnswer() {
      this.showAnswer = !this.showAnswer; // 切换状态
      if (this.showAnswer){
        this.fetchAnswer(); // 等待fetchAnswer完成
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
              this.getNameById();
              } else {
              console.log("没有回复")
            }
          })
    },

    getNameById(){
      for(let i=0;i<this.answers.length;i++){
        const answer = this.answers[i];
        //console.log("当前answer的uid："+answer.uid)
        this.request.post("user/query1",{
          uid:answer.uid
        })
            .then(res=>{
              //见下文，一定要用$set方法！
              this.$set(this.answers[i], 'aname', res.data.uname);
              this.$set(this.answers[i], 'aavatar', res.data.uavatar);
              //console.log(this.answers[i].uname)
            })
      }
    },
/*
改了一下午的bug，渲染出来的东西死活不更新

new bing的回答:
在 Vue 中，如果你在实例创建之后添加新的根级响应式属性，它不会触发视图更新。
这是因为 Vue 在初始化实例时会对根级数据进行响应式转换，而在这之后添加的新属性不会被转换。
在你的代码中，你在 getNameById 方法中为 answers 数组中的每个对象添加了一个新的 uname 属性。
这个属性是在实例创建之后添加的，所以它不是响应式的，当它的值改变时，视图不会更新。
你可以通过 Vue.set 或者 this.$set 方法来解决这个问题，这两个方法可以用来向响应式对象添加一个属性，并确保新属性同样是响应式的，触发视图更新。
* */


    //提交自己的回答
    submitAnswer(){
      if (this.$props.question.qid){
        this.request.post("answer/reply",{
          qid:this.$props.question.qid,
          uid:studentInfo.state.stuInfo.uid,
          acontent: this.textarea,
          atime:getDateTime()
        })
            .then(res=>{
              if(res.code === "200"){
                this.textarea = "";
                this.fetchAnswer();
                this.$message.success("回复成功")
              }
            })
      }else {
        this.$message.error("请先登录")
        this.textarea ="";
      }

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
    },

    //增加浏览量
    increaseViewCount(questionId){
      this.request.post("question/browse",{
        qid:questionId
      })
      .then(res=>{
        if (res.code === "200") {
          console.log("id为"+questionId+"的帖子浏览量+1")
        } else {
          console.log("浏览量增加失败");
        }
      })
    },

    //删除帖子（仅限查看自己的帖子）
    deleteQuestion(){
      if(studentInfo.state.stuInfo.uid === this.$props.question.uid){
        this.request.post("question/del",{
          qid:this.question.qid
        })
            .then(res=>{
              if (res.code === "200"){
                this.$message.success("删除成功！");
                location.reload();
              } else {
                this.$message.error("删除失败！")
              }
            })
      } else {
        this.$message.error("只有帖子作者可以删除帖子哦~")
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


    //当前item进入浏览器窗口使开始观察，实现浏览量的增加
    this.$nextTick(() => {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.increaseViewCount(this.question.qid);
            // 取消观察
            this.observer.unobserve(entry.target);
          }
        });
      });

      // 开始观察
      this.observer.observe(this.$refs.questionItem);
    });
  },

  beforeDestroy() {
    // 组件销毁前取消观察
    if (this.observer) {
      this.observer.disconnect();
    }
  },
}
</script>

<style scoped>

</style>
