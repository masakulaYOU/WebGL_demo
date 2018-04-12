// OrthoView.js 正射投影

var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  uniform mat4 u_ProjMatrix;
  varying vec4 v_Color;
  void main() {
    gl_Position = u_ProjMatrix * a_Position;
    v_Color = a_Color;
  }
`;

var FSHADER_SOURCE = `
  precision mediump float;
  varying vec4 v_Color;
  void main() {
    gl_FragColor = v_Color;
  }
`;

function main() {
  var canvas = document.getElementById('webgl');
  var nf = document.getElementById('nearFar');
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  var u_projMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if (!u_projMatrix) {
    console.log('Failed to get the location of u_projMatrix');
    return;
  }

  // 创建视图矩阵的Matrix4对象
  var projMatrix = new Matrix4();
  document.onkeydown = function(ev) {
    keydown(ev, gl, n, u_projMatrix, projMatrix);
  }

  // gl.drawArrays(gl.TRIANGLES, 0, n);
  draw(gl, n, u_projMatrix, projMatrix);
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
    -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
    0.5, -0.5,  -0.4,  1.0,  0.4,  0.4, 
   
    0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
    -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
    0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 

    0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
    -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
    0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
  ]);

  var n = 9;

  var vertexColorbuffer = gl.createBuffer();
  if (!vertexColorbuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}

var g_eyeX = 0.20, g_eyeY = 0.25, g_eyeZ = 0.25;  // 视点
var g_near = 0.0, g_far = 0.5;
function keydown(ev, gl, n, u_ViewMatrix, viewMatrix) {
  if (ev.keyCode == 39) { // 按下右键
    g_eyeX += 0.01;
  } else if (ev.keyCode == 37) {  // 按下左键
    g_eyeX -= 0.01;
  } else {
    return;
  }

  draw(gl, n, u_ViewMatrix, viewMatrix);
}

function draw(gl, n, u_ViewMatrix, viewMatrix) {
  // 设置视点和视线
  viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0);

  // 将视图矩阵传递给u_ViewMatrix变量
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
