// <!--
//       name 输入框提交到后台的名字 input file原生属性
//       action: 提交到后台的地址
//       limit: 限制上传的数量
//       multile: 是否支持文件多选上传 input file原生属性
//       accept: 接受上传的文件类型, input file原生属性
//       fileList: 已经上传的文件列表, 用于回显

//       钩子函数
//       handleExceed: 处理多个文件超出个数限制的回调
//       handleChange: 如果当前上传的状态发生改变，会触发该事件, 如用户选择了文件, 上传成功, 失败
//       handleSuccess: 文件上传成功时的回调
//       handleError: 文件上传失败时的回调
//       handleProgress: 文件上传时的回调, 多次触发, 进度条

//     -->
import { PropType } from "vue";
import ajax from "../request/ajax";
const uploadProp = {
  name: {
    type: String,
    default: "avatar"
  },
  fileList: {
    type: Array as PropType<File[]>,
    default: () => []
  },
  accept: String,
  action: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    default: 3
  },
  multiple: {
    type: Boolean,
    default: true
  },
  // 下面的类似于生命周期函数, 在特定的时期调用这些函数
  onExceed: {
    type: Function,
    default: () => {}
  },
  onChange: {
    type: Function,
    default: () => {}
  },
  onSuccess: {
    type: Function,
    default: () => {}
  },
  onError: {
    type: Function,
    default: () => {}
  },
  onProgress: {
    type: Function,
    default: () => {}
  },
  beforeUpload: {
    type: Function,
    default: () => {}
  },
  httpRequest: {
    // 默认提供一个ajxa请求, 如果传入的话就使用传入的
    type: Function,
    default: ajax
  },
  drag: {
    type: Boolean,
    default: false
  }
};
export default uploadProp;
