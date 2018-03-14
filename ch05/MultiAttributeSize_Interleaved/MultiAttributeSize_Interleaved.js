// MultiAttributeSize_Interleaved.js
// 将两种数据打包到一个缓冲区中

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
  // 顶点坐标和点的尺寸
  const verticesSizes = new Float32Array([
    0.0, 0.5, 10.0, // 第一个点
    -0.5, -0.5, 20.0, // 第二个点
    0.5, -0.5, 30.0 // 第三个点
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
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

  var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }



  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);


  gl.enableVertexAttribArray(a_Position);



  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return -1;
  }



  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);

  gl.enableVertexAttribArray(a_PointSize);



  gl.bindBuffer(gl.ARRAY_BUFFER, null)

  return n;
}

/**
 * @name gl.vertexAttribPointer()
 * @param location 指定待分配attribute变量的存储位置
 * @param size 指定缓冲区中每个顶点的分量个数（1-4）
 * @param type 指定数据格式
 * @param normalize 是否归一化
 * @param stride  指定相邻两个顶点间的字节数
 * @param offset 指定缓冲区对象中的偏移量
 */