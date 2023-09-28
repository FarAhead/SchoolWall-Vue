<template>
  <el-popover placement="top" width="160" :offset="0" v-model="visible" ref="popover" trigger="click">
    <el-input v-model="newPwd" placeholder="请输入新密码"></el-input>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="submit">确定</el-button>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "deletePopover",
  props:['uid'],
  data(){
    return{
      visible:false,
      newPwd:''
    }
  },
  methods:{
    submit(){
      this.request.post("user/updpwd",{
          uid:this.$props.uid,
          upwd:this.newPwd
      })
          .then(res=>{
            if(res.code==="200"){
              this.$message.success("成功修改密码");
              this.visible = false;
              this.$parent.loadForm();
            } else {
              this.$message.error("修改密码失败");
              this.visible = false;
            }
          })
    },
    open(){
      this.visible = true
    }
  }
}
</script>
