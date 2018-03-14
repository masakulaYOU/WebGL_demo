// MultiAttributeSize.js
// 绘制不同大小的点

// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
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

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, n);


}

function initVertexBuffers(gl) {

  const vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5,
  ]);

  // 点的大小

  var sizes = new Float32Array([
    10.0, 20.0, 30.0,
  ])

  const n = 3;

  // 创建缓冲区对象
  var vertexBuffer = gl.createBuffer();
  var sizeBuffer = gl.createBuffer();
  if (!vertexBuffer || !sizeBuffer) {
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

  // 将缓冲区对象分配给a_Position变量与a_PointSize对象
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 链接a_Position变量和a_PointSize变量与分配给它们的缓冲区对象
  gl.enableVertexAttribArray(a_Position);


  gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return -1;
  }
  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_PointSize);

  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return n;
}