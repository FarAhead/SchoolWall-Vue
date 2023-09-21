<template>
  <div>
    <el-card class="box-card">
      <h2>注册</h2>
      <el-form
          :model="newUser"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-position="left"
          label-width="80px"
          class="demo-ruleForm"
      >
        <el-form-item label="用户类型" prop="utype" >
          <el-radio label="student" v-model="newUser.utype">学生</el-radio>
          <el-radio label="organization" v-model="newUser.utype">社团组织</el-radio>
        </el-form-item>

        <el-form-item label="学号" prop="uid" v-if="this.newUser.utype==='student'">
          <el-input v-model="newUser.uid"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="uname" v-if="this.newUser.utype==='student'">
          <el-input v-model="newUser.uname"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="usex" v-if="this.newUser.utype==='student'">
          <el-radio label="male" v-model="newUser.usex">男</el-radio>
          <el-radio label="female" v-model="newUser.usex">女</el-radio>
        </el-form-item>

        <el-form-item label="组织编号" prop="zid" v-if="this.newUser.utype==='organization'">
          <el-input v-model="newUser.zid"></el-input>
        </el-form-item>

        <el-form-item label="组织名称" prop="zname" v-if="this.newUser.utype==='organization'">
          <el-input v-model="newUser.zname"></el-input>
        </el-form-item>

        <el-form-item label="负责人名" prop="zuname" v-if="this.newUser.utype==='organization'">
          <el-input v-model="newUser.zuname"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUser.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
          <el-input
              type="password"
              v-model="newUser.upwd"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cupwd">
          <el-input
              type="password"
              v-model="newUser.cupwd"
              autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('newUser')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //检查密码是否填写
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.newUser.upwd !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //检验两次密码是否一致
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.newUser.upwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      newUser: {
        uid: "",
        zid: "",
        uname: "",
        zname:"",
        zuname:"",
        email:"",
        usex:"",
        utype:"student",
        upwd: "",
        cupwd:""
      },
      rules: {
        uid: [{ required: true, message: "学号不能为空", trigger: "blur" }],
        uname: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        zname: [{ required: true, message: "请填写", trigger: "blur" }],
        zuname: [{ required: true, message: "请填写", trigger: "blur" }],
        usex: [{ required: true, message: "请填写", trigger: "blur" }],
        zid: [{ required: true, message: "请填写"}],
        upwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        cupwd: [{ required: true, validator: validateCheckPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["registerForm"].resetFields();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
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
