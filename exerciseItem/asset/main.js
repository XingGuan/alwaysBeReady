$(function(){
  $.fn.longPress = function(fn) {
    let timeout = 0;
    const $this = this;
    for (let i = 0; i < $this.length; i++) {
      $this[i].addEventListener('touchstart', () => {
        timeout = setTimeout(fn, 800); // 长按时间超过800ms，则执行传入的方法 
      }, false);
      $this[i].addEventListener('touchend', () => {
        clearTimeout(timeout); // 长按时间少于800ms，不会执行传入的方法
      }, false);
    }
  };
  $('img').longPress(() => {
    saveImg();
  });
  function saveImg() {
    // 想要保存的图片节点
    const dom = document.querySelector('img');
  
    // 创建一个新的canvas
    const Canvas = document.createElement('canvas');
    const width = document.body.offsetWidth;  // 可见屏幕的宽
    const height = document.body.offsetHeight;  // 可见屏幕的高
    const scale = window.devicePixelRatio;  // 设备的devicePixelRatio
  
    // 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
    Canvas.width = width * scale;
    Canvas.height = height * scale;
    Canvas.getContext('2d').scale(scale, scale);
  
    html2canvas(dom, {
      canvas: Canvas,
      scale,
      useCORS: true,
      logging: true,
      width: width + 'px',
      hegiht: height + 'px',
    }).then((canvas) => {
      const context = canvas.getContext('2d');
      // 关闭抗锯齿形
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
      // canvas转化为图片
      const img = canvas2Image(canvas, canvas.width, canvas.height);
      document.body.appendChild(img);
      img.style.cssText = "width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;";
    })
  }
  function canvas2Image(canvas, width, height) {
    const retCanvas = document.createElement('canvas');
    const retCtx = retCanvas.getContext('2d');
    retCanvas.width = width;
    retCanvas.height = height;
    retCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
    const img = document.createElement('img');
    img.src = retCanvas.toDataURL('image/jpeg');  // 可以根据需要更改格式
    return img;
  }
})
