<template>
<div>
  <el-descriptions class="margin-top" title="组织信息" :column="3" border>
    <template slot="extra">
      <el-button type="primary" size="small">修改</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        组织名
      </template>
      {{organizationInfo.state.orgInfo.zname}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        组织id
      </template>
      {{organizationInfo.state.orgInfo.uid}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        组织负责人
      </template>
      {{organizationInfo.state.orgInfo.zstudent}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        联系电话
      </template>
      {{organizationInfo.state.orgInfo.zphone}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        账户密码
      </template>
      {{organizationInfo.state.orgInfo.upwd}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系邮箱
      </template>
      {{organizationInfo.state.orgInfo.zmail}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        账户类型
      </template>
        社团组织
    </el-descriptions-item>
  </el-descriptions>
  <el-form class="upload-avatar">
    <h4>上传新头像</h4>
    <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="uploadFile">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form>
</div>
</template>

<script>
import organizationInfo from "../../store/modules/organizationInfo";
import studentInfo from "@/store/modules/studentInfo";

export default {
  name: "ManageInfo",
  data(){
    return{
      imageUrl: ''
    }
  },
  computed: {
    organizationInfo() {
      return organizationInfo
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.success('上传成功');
    },
    beforeAvatarUpload(file) {

      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadFile(uploadFile){
      let formData = new FormData();
      formData.append('uid',organizationInfo.state.orgInfo.uid);
      formData.append('file', uploadFile.file);

      return this.request.post('user/upload2',formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
</script>

<style scoped>
avatar-uploader .el-upload {
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
</style>
