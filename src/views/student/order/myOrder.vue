<template>
<div>
  <el-empty v-if="isEmpty" description="暂无数据"></el-empty>
  <order-item v-else v-for="myOrder in myOrders" :key="myOrder.oid" :myOrder="myOrder"></order-item>
</div>
</template>

<script>
import orderItem from "@/components/card/orderItem.vue";
import studentInfo from "@/store/modules/studentInfo";
export default {
  name: "myOrder",
  data(){
    return{
      isEmpty:true,
      myOrders:[
        {
          oid:'',
          osid:'',
          price: '',
          cname:'',
          cid:'',
          ofinishdate:''
        }
      ],
    }
  },
  components:{
    orderItem
  },
  methods:{
    fetchMyOrder(){
      this.request.post("order/query1",{
        obid:studentInfo.state.stuInfo.uid
      })
          .then(res=> {
              if(res.code==="200"){
                if (res.data){
                  this.isEmpty=false;
                  this.myOrders =  res.data;
                }
              } else {
                this.$message.error("获取数据失败！")
              }
          })
    },
  },
  mounted() {
    this.fetchMyOrder();
  }
}
</script>

<style scoped>

</style>
