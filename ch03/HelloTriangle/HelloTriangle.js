// HelloTriangle.js
// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
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
 * WebGL可以绘制的基本图形
 * 点 gl.POINTS 一系列点，绘制在v0, v1, v2 ...处
 * 线段 gl.LINES 一系列单独的线段，绘制在(v0, v1) (v2, v3) ...处，如果点的个数是单数，最后一个点将被忽略
 * 线条 gl.LINE_STRIP 一系列链接的线段，被绘制在(v0, v1) (v1, v2) ... 处，第一个点是第一条线段的起点，
 *     第二个点是第一条线段的终点和第二条线段的起点，第i个点是第i-1条线段的终点和第i条线段的起点，以此类推，最有一个点是最后一条线段的终点
 * 回路 gl.LINE_LOOP 一系列连接的线段，与gl.LINE_STRIP绘制的线条相比，增加了一条从最后一个点再第一个点的线段
 * 三角形 gl.TRIANGLES 一系列单独的三角形，绘制在(v0, v1, v2) (v3, v4, v5)处，如果点的个数不是3的整倍数，最后剩下的一个或两个点将被忽略
 * 三角带 gl.TRIANGLES_STRIP 一系列袋装的三角形，前三个点构成第一个三角形，从第2个点开始的三个点构成了第2个三角形，
 *       以此类推，这些三角形被绘制在(v0, v1, v2) (v2, v1, v3) (v2, v3, v4)处， 此处请注意点的顺序
 * 三角扇 gl.TRIANGLES_FAN 一系列三角形组成的类似于扇形的图形，前三个点构成了第一个三角形，接下来的一个点和前一个三角形的最后一条边组成接
 *       下来的一个三角形，这些三角形被绘制在(v0, v1, v2) (v0, v2, v3) (v0, v3, v4)处
 */
