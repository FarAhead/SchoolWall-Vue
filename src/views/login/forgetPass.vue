<template>
  <div>
    <el-card class="box-card">
      <h2>重置密码</h2>
      <el-form
          :model="form"
          status-icon
          label-position="left"
          label-width="70px"
          class="login-from"
      >
        <el-form-item label="用户类型" prop="utype" >
          <el-radio label="student" v-model="form.utype">学生</el-radio>
          <el-radio label="organization" v-model="form.utype">社团组织</el-radio>
        </el-form-item>
        <div v-if="form.utype==='student'">
          <el-form-item label="姓  名" prop="uname">
            <el-input v-model="form.uname"></el-input>
          </el-form-item>
          <el-form-item label="学  号" prop="uid">
            <el-input v-model="form.uid"></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="组织id" prop="uname">
            <el-input v-model="form.zid"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="uid">
            <el-input v-model="form.zstudent"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="邮  箱" prop="uid">
          <el-input v-model="form.umail"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="upwd">
          <el-input
              type="password"
              v-model="form.upwd"
              autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm()">重置密码</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "forgetPass",
  data(){
    return{
      form:{
        utype:'student',
        uid:'',
        zid:'',
        uname:'',
        zstudent:'',
        umail:'',
        upwd:''
      }
    }
  },
  methods:{
    submitForm(){
      if (this.form.utype === 'student'){
        this.request.post("user/reset",{
          uid:this.form.uid,
          uname: this.form.uname,
          umail: this.form.umail,
          upwd: this.form.upwd
        })
            .then(res=>{
              if (res.code==="200"){
                this.$message.success("密码重置成功");
                this.$router.replace("/login");
              } else {
                this.$message.error("信息有误，请重试");
              }
            })
      } else {
        this.request.post("org/reset",{
          uid:this.form.zid,
          zstudent: this.form.zstudent,
          zmail: this.form.umail,
          upwd: this.form.upwd
        })
            .then(res=>{
              if (res.code==="200"){
                this.$message.success("密码重置成功");
                this.$router.replace("/login");
              } else {
                this.$message.error("信息有误，请重试");
              }
            })
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>

<style scoped>
.box-card {
  margin: auto auto;
  width: 400px;
}
.login-from {
  margin: auto auto;
}
</style>
