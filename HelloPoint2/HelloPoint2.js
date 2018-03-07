// HelloPoint2.js
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
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

  // 获取attribute变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  //将顶点位置传输给attribute变量
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}

/**
 * 声明attribute变量
 * attribute(存储限定符) vec4(类型) a_Position(变量名)
 * 
 * 获取attribute变量的存储位置
 * @name gl.getAttribLocation
 * @param program 指定包含顶点着色器和片元着色器的着色器程序对象
 * @param name 指定想要获取其存储地址的attribute变量的名称
 * @return 大于等于0 => attribute变量存储地址 -1 => 指定的attribute变量不存在，或者其命名具有gl_或webgl_前缀
 * @error INVALID_OPERATION 程序未能成功连接
 *        INVALID_VALUE name参数的长度大于attribute变量名的最大长度(默认265个字节)
 * 
 * 向attribute变量赋值
 * @name gl.vertexAttrib3f
 * @param location 指定将要修改的attribute变量的存储位置
 * @param v0 v1 v2 填充attribute三个分量的值
 * @return 无
 * @error INVALID_OPERATION 没有当前的program对象
 *        INVALID_VALUE location大于等于attribute变量的最大数目(默认为8)
 * 
 * vertexAttrib3f的同族函数
 * gl.vertexAttrib1f(location, v0)
 * gl.vertexAttrib2f(location, v0, v1)
 * gl.vertexAttrib3f(location, v0, v1, v2)
 * gl.vertexAttrib4f(location, v0, v1, v2, v3)
 */
