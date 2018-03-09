// ColoredPoints.js
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (u_FragColor < 0) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  canvas.onmousedown = function(ev) {
    click(ev, gl, canvas, a_Position, u_FragColor);
  }

  gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = [];
var g_Colors = [];
function click(ev, gl, canvas, a_Position, u_FragColor) {
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2)/(canvas.height / 2);
  y = (canvas.width/2 - (y - rect.top)) / (canvas.width / 2);

  g_points.push([x, y]);

  // 将点的颜色存储在g_colors数组中
  if (x >= 0.0 && y >= 0.0) {
    // 第一象限
    g_Colors.push([1.0, 0.0, 0.0, 1.0]);
  } else if (x < 0.0 && y < 0.0) {
    // 第三象限
    g_Colors.push([0.0, 1.0, 0.0, 1.0]);
  } else {
    // 其他象限
    g_Colors.push([0.0, 0.0, 1.0, 1.0]);
  }

  /**
   * 此处注释后，在程序启动时，会出现黑色的画布，鼠标点击后，黑色画布消失，背景变为白色画布，并留下红色的点
   */
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for (var i = 0; i < len; i+=2) {
    var xy = g_points[i];
    var rgba = g_Colors[i];

    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3])

    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

/**
 * 获取uniform变量存储的地址
 * @name gl.getUniformLocation
 * @param program 指定包含顶点着色器和片元着色器的着色器程序对象
 * @param name 指定想要获得的其他存储位置的uniform变量名称
 * @return 指定Uniform的电量，或无，指定的uniform变量不存在，或者其命名具有gl_或webgl_前缀
 * @error INVALID_OPERATION 程序对象未能成功连接
 * @ERROR INVALID_VALUE name参数的长度大于uniform变量名的最大值
 * 
 * 给uniform变量赋值
 * @name gl.uniform4f
 * @param location 指定将要修改的uniform变量的存储位置
 * @param v0, V1， V2， V3 tianchong uniform的四个分量
 * @return 无
 * @error: 没有当前ppogram中，或者location是非法的变量存贮位置
 * 
 * gl.uniform4f的同族函数
 * gl.uniform1f(location, v0)
 * gl.uniform2f(location, v0 ,v1)
 * gl.uniform3f(location, v0, v1, v2)
 * gl.uniform4f(location, v0, v1, v2, v3)
 */
