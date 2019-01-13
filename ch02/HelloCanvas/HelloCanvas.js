// HelloCanvas.js
function main() {
  // 获取canvas元素
  const canvas = document.getElementById('webgl');

  // 获取WebGL上下文
  const gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // 指定清空canvas的颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
}

/*
 * @name getWebGLContext
 * @param element 指定的canvas元素
 * @param debug   可选，默认为false，设置为true，javascript中发生的错误能被显示在控制台上，非调试阶段不要打开，否则会影响性能
 * @return        WebGL绘图上下文或者NULL
 * 
 * @name gl.clearColor
 * 对应OpenGL中的glClearColor，传入rgba值
 * 
 * @name gl.clear 用之前指定的背景色清空绘图区域
 * @param buffer  指定待清空的缓冲区，位操作符OR(|)可用来指定多个缓冲区
 *    gl.COLOR_BUFFER_BIT 指定颜色缓存
 *    gl.DEPTH_BUFFER_BIT 指定深度缓冲区
 *    gl.STENCIL_BUFFER_BIT 指定模板缓冲区
*/
