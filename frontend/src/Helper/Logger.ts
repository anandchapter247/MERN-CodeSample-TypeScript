export function logger(...arg: any): void {
  if (process.env.NODE_ENV === "development") {
    for (const key in arg) {
      if (arg.hasOwnProperty(key)) {
        const element = arg[key];
        console.log("====================================");
        console.log(element);
        console.log("====================================");
      }
    }
  }
}

export function dataURLtoFile(dataurl: any, filename: any) {
  var arr = dataurl.split(","),
    mime,
    bstr,
    n,
    u8arr;
  if (arr[0]) {
    let mimeTemp = arr[0].match(/:(.*?);/);
    if (mimeTemp && mimeTemp[1]) {
      mime = mimeTemp[1];
    }
  }
  if (arr[1]) {
    bstr = atob(arr[1]);
    n = bstr.length;
    u8arr = new Uint8Array(n);
  }
  if (mime && bstr && n && u8arr) {
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  return false;
}
