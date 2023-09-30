<template>
  <el-card class="orderItem-container" style="margin: 20px">
    <el-descriptions :title="this.$props.mySold.cname" border>
      <template slot="extra">
        <el-popover
            placement="top"
            width="160"
            v-model="popoverShow"
            >
          <el-input placeholder="请输入新的价格" v-model="newPrice" ref="newPriceInput"></el-input>
          <div style="text-align: right; margin: 5px">
            <el-button size="mini" type="text" @click="popoverShow = false">取消</el-button>
            <el-button type="primary" size="mini" @click="changePrice">确定</el-button>
          </div>
          <el-button slot="reference" size="small" type="primary" v-if="isUnsold" @click="this.popoverShow = true">修改价格</el-button>
        </el-popover>

      </template>
      <el-descriptions-item label="订单编号">{{this.$props.mySold.oid}}</el-descriptions-item>
      <el-descriptions-item label="卖方id">{{studentInfo.state.stuInfo.uid}}</el-descriptions-item>
      <el-descriptions-item label="买方id">{{this.$props.mySold.obid?this.$props.mySold.obid:'暂无数据'}}</el-descriptions-item>
      <el-descriptions-item label="商品价格">￥{{this.$props.mySold.price}}</el-descriptions-item>
      <el-descriptions-item label="创建日期">{{this.$props.mySold.ocreatedate}}</el-descriptions-item>
      <el-descriptions-item label="成交日期">{{this.$props.mySold.obid?this.$props.mySold.ofinishdate:'暂无数据'}}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import studentInfo from "@/store/modules/studentInfo";
export default {
  data(){
    return{
      newPrice:'',
      popoverShow:false,
    }
  },
  computed: {
    studentInfo() {
      return studentInfo
    },
    isUnsold() {
      return !this.$props.mySold.obid;
    }
  },
  props:['mySold'],
  methods:{
    changePrice(){
      if(this.newPrice){
        this.request.post("commodity/up",{
          cid:this.$props.mySold.cid,
          price:this.newPrice
        }).then(res=>{
          if (res.code === "200"){
            this.$message.success("修改成功");
            this.popoverShow = false;
          }
        })
      } else {
        this.$message.error("请输入价格");
      }
    },
  }
}
</script>

<style scoped>

</style>
