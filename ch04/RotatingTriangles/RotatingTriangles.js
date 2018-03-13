// RotatingTriangles.js
// 旋转动画

// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  void main() {
    gl_Position = u_ModelMatrix * a_Position;
  }
`;

// 片元着色器
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

// 旋转速度(度/秒)
let ANGLE_STEP = 45.0;

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);
  // 初始化旋转角度
  let currentAngle = 0.0;
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  // 设置顶点位置
  const n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the position of the verteces');
    return;
  }

  const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix or u_SinB');
    return;
  }

  //为旋转矩阵创建Matrix4对象
  const modelMatrix = new Matrix4();

  // 开始绘制三角形
  var tick = function(){
    currentAngle = animate(currentAngle); // 更新旋转角
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
    requestAnimationFrame(tick); // 请求浏览器调用tric
  }

  tick();
}

function initVertexBuffers(gl) {

  const vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5,
  ]);

  const n = 3;

  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // 将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  //向缓冲区对象中写入对象
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }

  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 链接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix){
  // 设置旋转矩阵
  modelMatrix.setRotate(currentAngle, 0, 0, 1);

  // 将旋转矩阵传输给顶点着色器
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // 清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

// 记录上一次调用函数的时刻
var g_last = Date.now();
function animate(angle){
  var now = Date.now();
  var elapsed = now - g_last; //毫秒
  g_last = now;
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}