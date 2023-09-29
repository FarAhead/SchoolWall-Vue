<template>
<div>
  <el-table
      :data="tableData"
      style="width: 100% ;height: 100%">
    <el-table-column label="订单id" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.oid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="买方id" width="140">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.obid}}</span>
      </template>
    </el-table-column>
    <el-table-column label="卖方id" width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.osid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单金额" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column label="完成时间" width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ofinishdate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-popover
            placement="top"
            width="160"
            v-model="scope.row.PopVisible">
          <p>你确定要删除当前订单吗？</p>
          <div style="text-align: right; margin: 5px">
            <el-button size="mini" type="text" @click="scope.row.PopVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteOrder(scope.row)">确定</el-button>
          </div>
          <el-button slot="reference" size="mini" type="danger">删除订单</el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "orderManege",
  data(){
    return{
      tableData:[{
        PopVisible:false,
        oid:0,
        obid:0,
        osid:0,
        price:0,
        cname:"",
        ofinishdate:"",
      }],
    }
  },
  methods:{
    getOrder(){
      this.request.post("order/query")
          .then(res=>{
            this.tableData=res.data;
          })
    },
    deleteQuestion(row){
      this.request.post("order/del",{
        oid:row.oid
      })
          .then(res=>{
            row.PopVisible = false;
            this.$message.success("删除成功");
            this.getOrder();
          })
    }
  },
  mounted() {
    this.getOrder();
  }
}
</script>

<style scoped>

</style>
