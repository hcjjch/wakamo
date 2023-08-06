<template>
  <div class="app">
    <!--
      name 输入框提交到后台的名字 input file原生属性
      action: 提交到后台的地址
      limit: 限制上传的数量
      multiple: 是否支持文件多选上传 input file原生属性
      accept: 接受上传的文件类型, input file原生属性

      钩子函数
      handleExceed: 处理多个文件超出个数限制的回调
      handleChange: 如果当前上传的状态发生改变，会触发该事件, 如用户选择了文件, 上传成功, 失败
      handleSuccess: 文件上传成功时的回调
      handleError: 文件上传失败时的回调
      handleProgress: 文件上传时的回调, 多次触发, 进度条

    -->
    <serina-upload
      name="avatar"
      action="http://localhost:3000/get"
      :file-list="fileList"
      :limit="3"
      :multiple="true"
      accept="image/jpeg"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :beforeUpload="beforeUpload"
      :drag="true"
    >
      <serina-button icon="serina-icon-fund" type="primary"
        >上传文件</serina-button
      >
      <template #tip>
        <div>只能上传jpg/png文件，且不超过500kb</div>
      </template>
    </serina-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Message from "./packages/message";

// 定义一个用于存储上传文件的数组, 响应式的
const fileList = ref<File[]>([]);
const handleExceed = (files: FileList, filelist: File[]) => {};
const handleChange = (files: File[]) => {
  console.log("更新了", files);
};
// 文件要上传的时候的函数
const beforeUpload = (file: File) => {
  let limit = file.size > 500 * 1024;
  if (limit) {
    Message({
      type: "error",
      message: `当前上传的文件超过了 500kb, 请重新选择`,
      duration: 3000
    });
    return false;
  } else if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/jpg"
  ) {
    console.log(typeof file.type);

    // 在这里鉴定类型是否符合标准
    Message({
      type: "error",
      message: `当前上传的文件类型不符合要求, 请重新选择`,
      duration: 3000
    });
    return false;
  }
  return true;
};
const handleSuccess = () => {};
const handleError = () => {};
const handleProgress = () => {};
</script>

<style lang="scss"></style>
