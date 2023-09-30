<template>
<el-card class="notice-item" style="margin: 20px">
  <div v-if="this.permission==='admin'" class="notice-poster">
    id：{{notice.uid}}
  </div>
  <div style="display: grid;grid-template-columns: 80px 1fr">
    <div v-if="this.permission==='student'" class="notice-poster">
      <div>{{notice.organization.zname}}</div>
      <el-avatar :src="notice.organization.zavatar" :size="70"></el-avatar>
    </div>
    <div v-else></div>
    <div class="notice-info">
      <div class="notice-title">{{notice.ntitle}}</div>
      <div class="notice-content">{{notice.ncontent}}</div>
    </div>
  </div>
  <div class="notice-footer">
    {{notice.ntime}}
  </div>
  <div class="manage-button" v-if="this.permission==='admin'" style="float: right">
    <el-button type="primary" @click="noticePass">审核通过</el-button>
    <el-button type="danger" @click="noticeNotPass">审核不通过</el-button>
  </div>

  <div class="edit-button" v-if="this.permission==='org'" style="float: right">
    <el-button type="primary" @click="dialogVisible = true">编辑内容</el-button>
    <el-dialog
        title="修改公告信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-input v-model="inputContent"  autosize></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editContent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <div class="del-button" v-if="this.permission==='org'" style="float: right">
    <el-button type="danger" @click="dialogVisible2 = true">删除公告</el-button>
    <el-dialog
        title="删除公告"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose">
      <span>您确认要删除此条公告吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2=false">取 消</el-button>
        <el-button type="primary" @click="deleteNotice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</el-card>
</template>

<script>
import admin from "@/views/admin/index.vue";
import student from "@/views/student/index.vue";

export default {
  name: "noticeItem",
  computed: {
    student() {
      return student
    },
    admin() {
      return admin
    }
  },
  props:['notice','permission'],
  data(){
    return{
      dialogVisible: false,
      dialogVisible2:false,
      inputContent:'',
    }
  },
  methods:{
    noticePass() {
      this.request.post("notice/agree",{
        nid:this.notice.nid
      })
          .then(res=>{
            if (res.code==="200"){
              this.$message.success("审核通过");
              this.$parent.fetchNotice();
            } else {
              this.$message.error("error")
            }
          })
    },
    noticeNotPass() {
      this.request.post("notice/disagree",{
        nid:this.notice.nid
      })
          .then(res=>{
            if (res.code==="200"){
              this.$message.success("审核不通过，已成功删除");
              this.$parent.fetchNotice();
            }else {
              this.$message.error("error")
            }
          })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    editContent(){
      this.request.post("notice/change",{
        nid:this.notice.nid,
        ncontent:this.inputContent
      })
          .then(res=>{
            if (res.code==="200"){
              this.$message.success("修改成功");
              this.dialogVisible=false;
              this.$parent.fetchNotice();
            }else {
              this.$message.error("error")
            }
          })
    },
    cancelEdit(){
      this.dialogVisible = false;
      this.inputContent = this.$props.notice.ncontent;
    },

    deleteNotice(){
      this.request.post("notice/del",{
        nid:this.notice.nid
      })
          .then(res=>{
            if (res.code==="200"){
              this.$message.success("删除成功");
              this.dialogVisible2=false;
              this.$parent.fetchNotice();
            }else {
              this.$message.error("error")
            }
          })
    },
  },
  mounted() {
    this.inputContent=this.$props.notice.ncontent;
  }
}
</script>

<style scoped>

</style>
