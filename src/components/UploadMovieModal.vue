<template>
  <el-dialog title="视频上传" :visible.sync="dialogVisible" :show="show">
    <div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="视频标题" prop="title">
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="视频封面" prop="cover">
          <el-upload
            :action="action"
            :show-file-list="false"
            :on-success="coverSuccess"
            :before-upload="coverBeforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" width="200" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频" prop="url">
          <el-upload
            :action="action"
            :before-upload="beforeUpload"
            :on-remove="remove"
            :on-success="success"
            :limit="1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input
            type="textarea"
            v-model="form.introduction"
            :rows="3"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="upload">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createMovie } from "@/api/movie";
export default {
  name: "UploadMovieModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show: {
      handler(n, o) {
        this.dialogVisible = n;
      },
      immediate: true,
    },
    dialogVisible: {
      handler(n, o) {
        this.$emit("update:show", n);
      },
      immediate: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      action: process.env.VUE_APP_BASE_URL + "/file/upload",
      fileList: [],
      form: {
        title: "",
        cover: "",
        url: "",
        introduction: "",
      },
      imageUrl: "",
      rules: {
        title: [
          {
            required: true,
            message: "请填写",
            trigger: "blur",
          },
        ],
        cover: [
          {
            required: true,
            message: "请填写",
            trigger: "blur",
          },
        ],
        url: [
          {
            required: true,
            message: "请填写",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    beforeUpload(file) {},
    remove(file, fileList) {
      console.log("remove", file, fileList);
      this.fileList.length = 0;
    },
    success(response, file, fileList) {
      console.log("success", file, fileList);
      this.fileList.push(response.data.url.split("?")[0]);
      this.form.url = response.data.url.split("?")[0];
    },
    cancel(data) {
      this.$emit("cancel", data);
    },
    coverBeforeUpload(file, fileList) {},
    coverSuccess(response, file, fileList) {
      this.imageUrl = response.data.url;
      this.form.cover = this.imageUrl;
    },
    upload() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请完善表单");
        }
        let params = JSON.parse(JSON.stringify(this.form));
        await createMovie(params);
        this.$message.success("上传成功");
        this.$emit("input", false);
      });
    },
  },
};
</script>

<style></style>
