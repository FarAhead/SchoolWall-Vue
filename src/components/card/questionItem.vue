<template>
  <div class="content-item-content" style="margin: 20px;background-color:aliceblue">
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
        <el-button icon="el-icon-search" >赞同 {{question.qlikecount}}</el-button>
        <el-button icon="el-icon-search" @click="showAnswer = !showAnswer">评论 {{question.qanswercount}}</el-button>
        <el-button icon="el-icon-search" >收藏</el-button>
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
          <div class="answer-list-item" style="display: grid;grid-template-columns: 80px 1fr">
            <div class="answer-info">
              <div class="answer-avatar">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"></el-avatar>
              </div>
            </div>
            <div class="answer-content">
              <div class="answer-name">
                回答者昵称
              </div>
              <div class="answer-text">
                这是回答的内容
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>
export default {
  name: "question",
  props:['question'],
  data() {
    return {
      showAnswer:false,
      text: '',
      textarea: ''
    }
  }
}
</script>

<style scoped>

</style>
