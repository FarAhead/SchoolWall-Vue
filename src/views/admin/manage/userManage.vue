<template>
<div>
  <div class="user-operation">

  </div>
  <el-table
      :data="tableData"
      style="width: 100% ;height: 100%">
    <el-table-column label="学号" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.uid }}</span>
      </template>
    </el-table-column>

    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.uname }}</span>
      </template>
    </el-table-column>

    <el-table-column label="性别" width="100">
      <template slot-scope="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.usex==="male"? "男":"女" }}</span>
      </template>
    </el-table-column>

    <el-table-column label="密码" width="180">
      <template slot-scope="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.upwd }}</span>
      </template>
    </el-table-column>

    <el-table-column label="邮箱" width="220">
      <template slot-scope="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.umail }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-popover
            placement="top"
            width="160"
            v-model="scope.row.visible1">
          <el-input placeholder="请输入新密码：" v-model="newPwd"></el-input>

          <div style="text-align: right; margin: 5px">
            <el-button size="mini" type="text" @click="scope.row.visible1 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="changePwd(scope.row)">确定</el-button>
          </div>
          <el-button slot="reference" size="mini">更改密码</el-button>
        </el-popover>

        <el-popover
            placement="top"
            width="160"
            v-model="scope.row.visible2">
          <p>你确定要删除当前用户吗？该操作不可逆！</p>
          <div style="text-align: right; margin: 5px">
            <el-button size="mini" type="text" @click="scope.row.visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
          </div>
          <el-button slot="reference" size="mini" type="danger">删除用户</el-button>
        </el-popover>

      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
import pwdPop from "@/components/popover/newPwdPopover.vue"

export default {
  name: "userManage",
  data() {
    return {
      tableData: [{
        uid: '',
        uname: '',
        usex:'',
        upwd:'',
        umail:'',
        visible1: false,
        visible2: false,
      }],
      newPwd:''
    }
  },
  components:{
    pwdPop
  },
  methods: {
    loadForm(){
      this.request.post("user/query")
          .then(res=>{
            this.tableData = res.data
            console.log("用户加载完毕")
          })
    },
    changePwd(row) {
      this.request.post("user/updpwd",{
          uid:row.uid,
          upwd:this.newPwd
      })
          .then(res=>{
            row.visible1 = false;
            if (res.code==="200"){
              this.$message.success("密码修改成功");
              this.loadForm();
            } else {
              this.$message.error("修改失败");
            }
          })
    },


    deleteUser(row){
      this.request.post("user/delete",{
          uid:row.uid
      })
          .then(res=>{
            if (res.code ==="200"){
              row.visible2 = false;
              this.$message.success("用户删除成功");
              this.loadForm();
            } else {
              this.$message.error("删除错误！")
            }
          })
    }
  },
  mounted() {
    this.loadForm();
  }
}
</script>

<style scoped>

</style>
