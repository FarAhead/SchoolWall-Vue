<template>
<el-card class="orderItem-container" style="margin: 20px">
  <el-descriptions :title="this.$props.myOrder.cname" border>
    <el-descriptions-item label="订单编号">{{this.$props.myOrder.oid}}</el-descriptions-item>
    <el-descriptions-item label="卖方id">{{this.$props.myOrder.osid}}</el-descriptions-item>
    <el-descriptions-item label="买方id">{{studentInfo.state.stuInfo.uid}}</el-descriptions-item>
    <el-descriptions-item label="订单金额">￥{{this.$props.myOrder.price}}</el-descriptions-item>
    <el-descriptions-item label="成交日期">{{this.$props.myOrder.ofinishdate}}</el-descriptions-item>
  </el-descriptions>
</el-card>
</template>

<script>
import studentInfo from "../../store/modules/studentInfo";

export default {
  computed: {
    studentInfo() {
      return studentInfo
    }
  },
  props:['myOrder']

}
</script>

<style scoped>

</style>
