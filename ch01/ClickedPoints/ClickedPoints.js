// ClickedPoints.js
// 顶点着色器
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

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  canvas.onmousedown = function(ev) {
    click(ev, gl, canvas, a_Position);
  }

  gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = [];
function click(ev, gl, canvas, a_Position) {
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2)/(canvas.height / 2);
  y = (canvas.width/2 - (y - rect.top)) / (canvas.width / 2);

  g_points.push(x);
  g_points.push(y);

  /**
   * 此处注释后，在程序启动时，会出现黑色的画布，鼠标点击后，黑色画布消失，背景变为白色画布，并留下红色的点
   */
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for (var i = 0; i < len; i+=2) {
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);

    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
