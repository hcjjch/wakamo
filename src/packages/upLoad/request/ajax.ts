import ICustomProgressEvent from "../src/progress.type";

// 自己封装的ajax请求
export default function ajax(options: any) {
  // 创建xhr对象
  const xhr = new XMLHttpRequest();
  const actions = options.action;

  // h5的api用来上传文件
  const fd = new FormData();
  // 上传的文件和文件的名字
  fd.append(options.fileName, options.file);
  // xhr错误就触发options.onError的错误的方法, 并且携带一个err的参数

  xhr.onerror = (error) => {
    options.onError(error); // 触发错误的回调
  };

  xhr.onload = () => {
    // 返回的可能是文本, 也可能是图片资源等
    const text = xhr.responseText || xhr.response;
    console.log("上传成功", text);

    // 成功调用options.onSuccess的方法, 并且携带一个text的参数
    options.onSuccess(JSON.parse(text));
  };
  xhr.upload.onprogress = (e: ICustomProgressEvent) => {
    console.log("上传中", e);

    if (e.total > 0) {
      // 进度条的百分比
      e.percent = (e.loaded / e.total) * 100;
    }
    options.onprogress(e);
  };
  // 开启请求
  xhr.open("post", actions, true);
  // 发送请求, 传递对应文件的数据
  xhr.send(fd);
  return xhr;
}
