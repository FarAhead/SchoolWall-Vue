<template>
  <div>
    <el-card class="box-card">
      <h2>登录</h2>
      <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-position="left"
          label-width="70px"
          class="login-from"
      >
        <el-form-item label="账  号" prop="uid">
          <el-input v-model="user.uid"></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password">
          <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-radio v-model="user.type" label="student">学生</el-radio>
          <el-radio v-model="user.type" label="organization">社团组织</el-radio>
          <el-radio v-model="user.type" label="admin">管理员</el-radio>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
        <router-link to="/register">
          <el-button style="margin-left:10px">注册</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>


import studentInfo from "@/store/modules/studentInfo";
import organizationInfo from "@/store/modules/organizationInfo";

export default {
  data() {
    return {
      user: {
        uid: "",
        password: "",
        type: "admin"
      },
      rules: {
        uid: [
          { required: true, message: "账号不能为空！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 映射 SET_USER_INFO mutation
    //...mapMutations('user',['SET_USER_INFO']),

    //提交登录表单
    submitForm() {
      this.$refs["loginForm"].validate((isValid)=>{
        if (isValid){   //表单校验合法
          if(this.user.type==="admin"){   //管理员用户
            if (this.user.uid === "admin" && this.user.password === "123456"){    //管理员用户名和密码写死了
              this.$message.success("登录成功")
              this.$router.push("/admin")
            } else {
              this.$message.error("管理员登录失败！")
              location.reload()
            }
          } else if (this.user.type==="organization"){    //社团组织
            this.request.get("https://mock.apifox.cn/m2/3303344-0-default/111733082",{
              body:{
                zid:this.user.uid,
                zpwd:this.user.password
              }
            })
                .then((response)=>{
                    if (response.code === "200"){   //成功登录
                      this.$message.success("登录成功")
                      // 保存用户信息到本地存储
                      localStorage.setItem('userInfo', JSON.stringify(response.data));
                      organizationInfo.commit('SET_ORG_INFO',response.data) ;
                      this.$router.push("/organization")
                    } else {
                      this.$message.error("用户名或密码错误")
                      this.resetForm()
                   }
                })

          } else { //学生个人
            this.request.get("https://mock.apifox.cn/m2/3303344-0-default/111435518?uid=921107820244",{
              body:{
                uid:this.user.uid,
                upwd:this.user.password
              }
            })
                .then((response)=>{
                  if (response.code === "200"){   //成功登录
                    this.$message.success("登录成功")
                    localStorage.setItem('userInfo', JSON.stringify(response.data));
                    studentInfo.commit('SET_STU_INFO',response.data);
                    this.$router.push("/student")
                  } else {
                    this.$message.error("用户名或密码错误")
                    this.resetForm()
                  }
                })

          }
        }
      })
    },
    resetForm() {
      this.$refs["loginForm"].resetFields();
    }
  }
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
