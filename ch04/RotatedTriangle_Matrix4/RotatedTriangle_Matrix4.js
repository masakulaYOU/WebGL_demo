// RotatedTriangle_Matrix4.js
// 使用cuon-matrix.js矩阵库
// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_xformMatrix;
  void main() {
    gl_Position = u_xformMatrix * a_Position;
  }
`;

// 片元着色器
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);
  // 旋转角度
  const ANGLE = 90.0;
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

  //为旋转矩阵创建Matrix4对象
  const xformMatrix = new Matrix4();
  // 将xformMatrix设置为旋转矩阵
  xformMatrix.setRotate(ANGLE, 0, 0, 1);
  const u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  if (!u_xformMatrix) {
    console.log('Failed to get the storage location of u_xformMatrix or u_SinB');
    return;
  }

  gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
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

/**
 * Matrix4对象所支持的方法和属性
 * Matrix4.setIdentity() 将Matrix4实例初始化为单位阵
 * Matrix4.setTranslate(x, y, z) 将Matrix4实例设置为平移变换矩阵
 * Matrix4.setRotate(angle, x, y, z) 将Matrix4实例设置为旋转变换矩阵，旋转的角度为angle，旋转轴为(x, y, z)，无需归一化
 * Matrix4.setScale(x, y, z) 将Matrix4实例设置为缩放变换矩阵，在三个轴上的缩放因子分别为x y z
 * Matrix4.translate(x, y, z) 将Matrix4实例乘以一个平移变换矩阵，所得的结果还保存在Matrix4中
 * Matrix4.rotate(angle, x, y, z) 将Matrix4实例乘以一个旋转变换矩阵
 * Matrix4.scale(x,y,z) 将Matrix4实例乘以一个缩放变换矩阵
 * Matrix4.set(m) 将Matrix4实例设置为m，m必须是一个Matrix4实例
 * Matrix4.elements 类型化数组(Float32Array) 包含了Matrix4实例的矩阵元素
 */
