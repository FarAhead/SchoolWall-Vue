<template>
<div>
  <div>
    <el-button type="warning" icon="el-icon-box" @click="dialogVisible = true">点我发布商品</el-button>
  </div>

  <el-dialog title="发布商品" :visible.sync="dialogVisible" width="30%" :before-close="handleDialogClose">
    <el-form ref="commodityUpload" :model="uploadForm" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="uploadForm.cname"></el-input>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input v-model="uploadForm.description"></el-input>
      </el-form-item>

      <el-form-item label="售价">
        <el-input-number v-model="uploadForm.price" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload
            ref="uploadImg"
            action=""
            :limit=1
            :auto-upload="false"
            list-type="picture-card"
            :on-change="handleChanged"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="uploadDialogVisible">
          <img width="100%" :src="uploadForm.imageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品种类">
        <el-input v-model="uploadForm.ctype"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadCommodity">确 定</el-button>
    </span>
  </el-dialog>

  <el-row :gutter="40">
    <order-item v-for="order in orders" :key="order.cid" :order="order"></order-item>
  </el-row>
</div>
</template>

<script>
import orderItem from "@/components/card/commodityItem.vue";
import studentInfo from "@/store/modules/studentInfo";
import {getDateTime} from "@/utils/getDateTime";
export default {
  name: "orderSquare",
  data(){
    return{
      //是否显示上传对话框
      dialogVisible:false,

      uploadDialogVisible: false,



      //发布商品的表单
      uploadForm:{
        cname:'',
        description:'',
        cavatar:'',
        price:0,
        ctime:'',
        ctype:'',
        fileToUpload:null,
        imageUrl:'',
      },

      orders:[{
        cid:0,
        price:"",
        uid:0,
        cname:"",
        cavatar:"",
        description:"",
        citme:"",
        sold:0,
        ctype:""
      }],
    }
  },
  components:{
    orderItem
  },
  methods:{
    //加载所有在售商品信息
    async loadCommodity(){
      await this.request.post("commodity/query")
          .then(res=>{
            if(res.code === "200"){
              this.orders = res.data;
            } else {
              this.$message.error("加载商品信息失败！")
            }
          })
    },
    //dialog关闭
    handleDialogClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    //上传图片
    uploadImage(cid){
      //this.$refs.uploadImg.submit();
      let formData = new FormData();
      formData.append("cid",cid);
      formData.append("cavatar",this.uploadForm.fileToUpload);
      this.request.post("commodity/upload",formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        //cid:cid
      })
          .then(res=>{
            if (res.code === "200"){
              console.log("图片上传成功");
            } else {
              console.log("图片上传失败");
            }
          })
    },

    //上传商品信息
    async uploadCommodity(){
      try {
        this.request.post("commodity/add",{
          uid:studentInfo.state.stuInfo.uid,
          cname:this.uploadForm.cname,
          description:this.uploadForm.description,
          cavatar:"",
          price:this.uploadForm.price,
          ctime:getDateTime(),
          ctype:this.uploadForm.ctype
        })
            .then(res=>{
              if (res.code==="200"){
                this.uploadImage(res.data.cid)
                this.$message.success("上传商品信息成功！")
                this.dialogVisible=false;
                this.$refs['commodityUpload'].resetFields();

              } else {
                this.$message.error("上传商品信息失败！")
              }
            })

      } catch (error){
        console.error("上传失败：",error);
        this.$message.error("上传失败");
      }
    },

    //图片上传相关
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.uploadForm.imageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChanged(file){
      this.uploadForm.fileToUpload = file.raw;
      console.log("图片信息已经传到了uploadForm.fileToUpload")

    },

  },

  mounted() {
    this.loadCommodity();
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
