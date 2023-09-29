<template>
<div>
  <el-table
      :data="tableData"
      style="width: 100% ;height: 100%">
    <el-table-column label="提问id" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.qid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="提问者id" width="140">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.uid}}</span>
      </template>
    </el-table-column>
    <el-table-column label="提问者姓名" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.user.uname }}</span>
      </template>
    </el-table-column>
    <el-table-column label="提问标题" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.qtitle }}</span>
      </template>
    </el-table-column>
    <el-table-column label="发布时间" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.qtime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="浏览量" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.qbrowsecount }}</span>
      </template>
    </el-table-column>
    <el-table-column label="点赞数" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.qlikecount }}</span>
      </template>
    </el-table-column>
    <el-table-column label="评论数" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.qanswercount }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-popover
            placement="top"
            width="160"
            v-model="scope.row.PopVisible">
          <p>你确定要删除当前提问吗？</p>
          <div style="text-align: right; margin: 5px">
            <el-button size="mini" type="text" @click="scope.row.PopVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteQuestion(scope.row)">确定</el-button>
          </div>
          <el-button slot="reference" size="mini" type="danger">删除提问</el-button>
        </el-popover>

      </template>
    </el-table-column>
  </el-table>
</div>

</template>

<script>
export default {
  name: "questionManage",
  data(){
    return{
      tableData:[{
        PopVisible:false,
        qid:'',
        uid:'',
        qtitle:'',
        qtime:'',
        user:{
          uname:'',
        },
        qbrowsecount:'',
        qlikecount:'',
        qanswercount:'',
      }],
    }
  },
  methods:{
    getQuestion(){
      this.request.post("question/queryall")
          .then(res=>{
            this.tableData=res.data;
          })
    },
    deleteQuestion(row){
      this.request.post("question/del",{
        qid:row.qid
      })
          .then(res=>{
            row.PopVisible = false;
            this.$message.success("删除成功");
            this.getQuestion();
          })
    }
  },
  mounted() {
    this.getQuestion();
  }
}
</script>

<style scoped>

</style>
