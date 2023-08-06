<template>
  <!-- 阻止默认事件, 防止浏览器将文件给打开 -->
  <div
    class="serina-dragger"
    @drop.prevent="onDrap"
    @dragover.prevent
    @dragleave.prevent
  >
    <i class="serina-icon-wifi"></i>
    <span>将文件拖拽到此区域即可上传</span>
  </div>
</template>

<script setup lang="ts">
const draggerEmit = defineEmits(["file"]);
const onDrap = (e: DragEvent) => {
  console.log(123);
  console.log(e.dataTransfer?.files);

  draggerEmit("file", e.dataTransfer?.files);
};
</script>

<style lang="scss">
.serina-dragger {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  border: 1px dashed #ebeef5;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  color: #909399;
  font-size: 14px;
  cursor: pointer;
}
</style>
