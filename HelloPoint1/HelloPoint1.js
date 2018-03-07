// HelloPoint1.js
// 顶点程序着色器
const VSHADER_SOURCE = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`;

const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}


/**
 * 顶点着色器
 * 描述顶点特性（位置，颜色等）的程序
 * 顶点是指二维或者三维空间中的一个点，比如二维或三维图形的端点或交点
 * 内置变量：
 * vec4 gl_Position 表示顶点位置
 * float gl_PointSize 表示点的尺寸
 * 
 * @name vec4 根据参数创建一个由三个浮点数组成的矢量
 * @param v0,v1,v2,v3 指定的4个浮点分量
 * @return  由参数组成大呢vec4对象
 * 
 * 片元着色器
 * 进行逐片元处理过程如光照的程序，可以理解为像素
 * 内置变量：
 * vec4 gl_FragColor 指定片元颜色（RGBA格式）
 * 
 * 初始化着色器
 * @name initShaders
 * @param gl 指定渲染上下文
 * @param vshader 指定顶点着色器程序代码
 * @param fshader 指定片元着色器程序代码
 * @return Boolean 成功或失败
 * 
 * 绘制操作
 * @name gl.drawArrays
 * @param mode  NUMBER 指定绘制的方式，可以接收以下常量符号：gl.POINTS gl.LINES gl.LINE_STRIP gl.LINE_LOOP gl.TRIANGLES gl.TRIANGLE_STRIP gl.TRIANGLE_FAN
 * @param first NUMBER 指定从哪个顶点开始绘制(整型数)
 * @param count NUMBER 指定绘制需要用到多少个点(整型数)
 * @return 无
 * @error INVALID_ENUM 传入的mode参数不是前述参数之一
 * @error INVALID_VALUE 参数first或count是负数
 */
