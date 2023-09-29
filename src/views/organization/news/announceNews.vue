<template>
<div>
  <el-form :model="announce" label-width="120px">
    <el-form-item label="公告标题">
      <el-input v-model="announce.title"></el-input>
    </el-form-item>
    <el-form-item label="公告内容">
      <el-input v-model="announce.content"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm">发布</el-button>
  </el-form>
</div>
</template>

<script>
import organizationInfo from "@/store/modules/organizationInfo";
import {getDateTime} from "@/utils/getDateTime";
export default {
  name: "announceNews",
  data() {
    return{
      announce:{
        title:'',
        content:'',
      }
    }
  },
  methods:{
    submitForm(){
      this.request.post("notice/add",{
        uid:organizationInfo.state.orgInfo.uid,
        ntitle:this.announce.title,
        ncontent:this.announce.content,
        ntime:getDateTime(),
        nbrowsercount:0
      })
          .then(res=>{
            if (res.code==="200"){
              this.$message.success("公告发布成功，待审核后可见~")
            } else {
              this.$message.error("公告发布失败，请重试~")
            }
          })
    }
  }
}
</script>

<style scoped>

</style>
