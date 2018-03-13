// RotatedTranslatedTriangle.js
// 复合变换

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

function main() {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas);
  // 旋转角度
  const ANGLE = 90.0;
  // 平移距离
  const Tx = 0.5;
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
  const modelMatrix = new Matrix4();
  // modelMatrix设置
  modelMatrix.setRotate(ANGLE, 0, 0, 1); //设置为旋转矩阵
  modelMatrix.translate(Tx, 0, 0)
  const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix or u_SinB');
    return;
  }

  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  
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
 * 坐标转换公式
 * 1. <"平移"后的坐标> = <平移矩阵> * <原始坐标>
 * 2. <"平移后旋转"的坐标> = <旋转矩阵> * <平移后的坐标>
 * =>
 * <"平移后旋转"的坐标> = <旋转矩阵> * (<平移矩阵> * <原始坐标>)
 *                    = (<旋转矩阵> * <平移矩阵>) * <原始坐标>
 */
