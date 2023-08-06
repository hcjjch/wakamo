<template>
  <div class="serina-upload">
    <template v-if="!uploadProps.drag">
      <!-- 拖曳上传直接将文件交给upLoadFiles函数处理 -->
      <div class="serina-upload-btn" @click="handleClick">
        <slot></slot>
      </div>

      <div class="serina-update-input">
        <input
          type="file"
          :accept="uploadProps.accept"
          :multiple="uploadProps.multiple"
          @change="handleFileChange($event)"
          :name="uploadProps.name"
          ref="inputRef"
          class="input"
        />
      </div>
    </template>
    <template v-else>
      <uploadDragger
        :accept="uploadProps.accept"
        @file="upLoadFiles"
      ></uploadDragger>
    </template>

    <div class="serina-update-tip">
      <slot name="tip"></slot>
    </div>

    <div class="serina-update-list">
      <ol>
        <li v-for="item in Files" :key="item.uid">
          <i class="serina-icon-image"></i>
          <span>{{ item.FileName }}</span>
          <span>{{ item.status }}</span>
          <serina-progress :percentage="item.percentage"></serina-progress>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import uploadProp from "../props/uploadProps";
import Message from "@/packages/message";
import ICustomProgressEvent from "./progress.type";
import uploadDragger from "./upload-dragger.vue";
const uploadProps = defineProps(uploadProp);
// 用于存储传过来的fileList每次添加的file文件
const Files = ref<File[]>([]);
// 使用ref拿到原生的input, 对原生的input进行操作
const inputRef = ref<HTMLInputElement | null>(null);
const reqs = new Map(); // 用于存储ajax请求, 进行映射

// 1. 点击完按钮后就将上次传输的内容清空
const handleClick = () => {
  // 当inputRef绑定了对象的时候就将ref清空
  if (inputRef.value) {
    inputRef.value.value = "";
    // 清空文件的同时触发input框的点击事件
    inputRef.value.click();
  }
};

// 监控fileList并且立即执行一次，并且为其执行handleStart函数
watchEffect(() => {
  if (uploadProps.fileList) {
    Files.value = uploadProps.fileList.map((item) => {
      item.uid = Date.now() + Math.random();
      item.status = "success";
      return item;
    });
  }
});

// 3. 多个文件上传, 这里采用每个文件进行一个Ajax请求
const upLoadFiles = (files: FileList) => {
  // 如果超出了限制数量或者上传的文件和fileList的长度之和超出了限制数量
  if (
    uploadProps.limit &&
    files.length + uploadProps.fileList.length > uploadProps.limit
  ) {
    // 调用handleExceed函数, 并且使用用户传入的处理长度超出的钩子函数
    uploadProps.onExceed &&
      uploadProps.onExceed(files, uploadProps.fileList as File[]);
    Message({
      type: "error",
      message: `当前上传的文件超过了 ${uploadProps.limit} 个文件, 请重新选择`,
      duration: 3000
    });
    return;
  } else {
    [...files].forEach((rawFile) => {
      // 用户的文件, 我需要进行一些处理, 可能用户频繁的上传同一个文件
      // 将文件格式化成我想要的结果
      handleStart(rawFile); // 上传之前对文件进行处理
      upLoad(rawFile); // 上传文件, 每个文件一个ajax请求
    });
  }
};

// 4. 定义handleStart和upLoad函数
const handleStart = (rawFile: File) => {
  // 如何解决rawFile上没有uid的问题
  rawFile.uid = Date.now() + Math.random(); // 为每个文件添加一个唯一的id, 可以通过这个uid拿到对应的file文件
  // 自己定义一个rawFileObj对象, 用来存储文件的信息
  const rawFileObj = {
    stasus: "ready", // 默认准备上传
    FileName: rawFile.name, // 文件名
    size: rawFile.size, // 文件大小
    percentage: 0, // 上传的百分比, 一开始为0
    uid: rawFile.uid, // 文件的唯一标识
    raw: rawFile // 原始的文件
  };
  // 将rawFileObj对象添加到Files数组中
  Files.value.push(rawFileObj as any); // 将文件添加到数组中
  uploadProps.onChange && uploadProps.onChange(Files.value); // 文件成功添加完毕, 说明选择文件成功, 需要调用onChange钩子函数
};

// 5. 上传文件
const upLoad = (rawFile: File) => {
  // 首先判断这个文件是否能够上传, 若没有限制, 直接上传即可
  if (!uploadProps.beforeUpload) {
    // 直接上传
    post(rawFile);
  }
  // 否则需要调用用户传入的beforeUpload函数, 获取其返回值
  const flag = uploadProps.beforeUpload(rawFile);
  // 用户返回true, 表示需要上传
  if (flag) {
    post(rawFile);
  }
};

// 通过uid获取到对应的文件
const getFile = (raw: File) => {
  // 通过uid拿到对应的file文件, 并且将这个文件进行返回
  return Files.value.find((item) => item.uid === raw.uid);
};

// 定义handleProgress函数, handleSuccess函数和handleError函数
const handleProgress = (ev: ICustomProgressEvent, raw: File) => {
  // 给不同的状态
  // 通过源文件 用户上传的文件, 我格式化的文件
  // 拿到的就是格式化的文件
  const file = getFile(raw);
  if (file) {
    file.status = "uploading"; // 文件为上传中
    file.percentage = ev.percent || 0; // 上传的百分比

    uploadProps.onProgress && uploadProps.onProgress(ev, file); // 触发onProgress钩子函数, 调用用户的回调
  }
};
const handleSuccess = (res: any, raw: File) => {
  // 上传成功
  const file = getFile(raw);
  if (file) {
    file.status = "success"; // 文件上传成功
    uploadProps.onSuccess && uploadProps.onSuccess(res, file); // 触发onSuccess钩子函数, 调用用户的回调
    // 这里文件上传成功, 也就意味着文件状态发生改变, 需要调用onChange钩子函数
    uploadProps.onChange && uploadProps.onChange(Files.value);
  }
};
const handleError = (err: ProgressEvent<EventTarget>, raw: File) => {
  // 上传失败
  const file = getFile(raw);
  if (file) {
    file.status = "fail"; // 文件上传失败
    uploadProps.onError && uploadProps.onError(err, file); // 触发onError钩子函数, 调用用户的回调
    // 这里文件上传失败, 也就意味着文件状态发生改变, 需要调用onChange钩子函数
    uploadProps.onChange && uploadProps.onChange(Files.value);
    // 失败的ajax请求需要从reqs中删除, 不再请求
    reqs.delete(raw.uid);
  }
};

// 6. 真正上传的函数的逻辑
const post = (raw: File) => {
  // 真正的上传逻辑
  // 调用ajax方法
  // 需要整合一下参数, 调用ajax需要传递参数, 处理上传的整个逻辑
  const uid = raw.uid; // 这里可能稍后上传, 可能会后悔, 所以需要将uid保存起来
  // 对参数进行调整
  const options = {
    file: raw,
    fileName: raw.name,
    action: uploadProps.action,
    onprogress: (ev: ICustomProgressEvent) => {
      // 处理上传的状态
      handleProgress(ev, raw);
    },
    // 上传成功的回调
    onSuccess: (res: any) => {
      handleSuccess(res, raw);
    },
    // 失败的回调
    onError: (err: ProgressEvent<EventTarget>) => {
      handleError(err, raw);
      console.log(err);
    }
  };
  // req就是当前的请求
  const req = uploadProps.httpRequest(options);
  // 将当前的请求存储到reqs中, 将对应的uid和req进行映射, 稍后可以取消请求
  reqs.set(uid, req); // 一个文件对应一个请求

  // 用户有可能传输promise的axios, 也有可能传输的是自己封装的axios
  // 所以需要判断一下, 如果是promise的axios, 需要调用then方法
  // 如果是自己封装的axios, 需要调用subscribe方法
  if (req && req.then) {
    // 就直接调用options的onSuccess和onError
    req.then(options.onSuccess, options.onError);
  }
};

// 2. 定义一个handleFileChange函数且具有一个event参数
const handleFileChange = (e: Event) => {
  // 通过e.target拿到当前的input
  const target = e.target as HTMLInputElement;

  // 拿到当前的input的files
  const files = target.files;
  // 如果files存在, 就调用upLoadFiles函数
  files && upLoadFiles(files);
};
</script>

<style lang="scss">
.serina-upload {
  display: flex;
  flex-direction: column;
  // >  将当前层级的兄弟元素的margin-bottom设置为10px
  // 而不会将所有的兄弟元素的margin-bottom设置为10px
  .input {
    display: none;
  }
  > * {
    margin-bottom: 5px;
  }
  .serina-upload-btn {
    display: inline-block;
  }
  .serina-update-list {
    ol {
      list-style: none;
      padding: 0;
      margin: 0;
      border: 1px solid #ebeef5;
      li {
        display: flex;
        align-items: center;
        > * {
          margin-right: 10px;
          flex: 1;
        }
        .serina-icon-image {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
