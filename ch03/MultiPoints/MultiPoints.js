// MultiPoints.js
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
 * 使用缓冲区对象向顶点着色器传入多个顶点的数据步骤
 * 1. 创建缓冲区对象  gl.createBuffer()
 * 2. 绑定缓冲区对象  gl.bindBuffer()
 * 3. 将数据写入缓冲区对象 gl.bufferData()
 * 4. 将缓冲区对象分配给一个attribute变量 gl.vertexAttribPointer()
 * 5. 开启attribute变量 gl.enableVertexAttribArray()
 * 
 * 创建缓冲区对象
 * @name gl.createBuffer()
 * @return 非null => 新建的缓冲区对象
 *         null => 创建缓冲区对象失败
 * 
 * 删除缓冲区对象
 * @name gl.deleteBuffer()
 * @param buffer 待删除的缓冲区对象
 * 
 * 绑定缓冲区
 * @name gl.bindBuffer()
 * @param target 可以是以下中的一个
 *        gl.ARRAY_BUFFER  表示缓冲区对象中包含了顶点的数据
 *        gl.ELEMENT_ARRAY_BUFFER 表示缓冲区对象中包含了顶点的索引值
 * @param buffer 指定之前由gl.createBuffer()返回的待绑定的缓冲区对象，如果指定为null，则禁用对target的绑定
 * @return 无
 * @error INVALID_ENUM target不是上述值之一，这时保持原有的绑定情况不变
 * 
 * 向缓冲区中写入数据
 * @name gl.bufferData()
 * @param target gl.ARRAY_BUFFER或gl.ELEMENT_ARRAY_BUFFER
 * @param data 写入缓冲区对象的数据（类型化数组）
 * @param usage 表示程序将如何使用存储在缓冲区对象中的数据。该参数会帮助WebGL优化操作，但是就算你传入了错误的值，也不会终止程序。
 *        gl.STATIC_DRAW 只会向缓冲区对象写入一次数据，但需要绘制很多次
 *        gl.STREAM_DRAW 只会向缓冲区对象写入一次数据，然后绘制若干次
 *        gl.DYNAMIC_DRAW 会向缓冲区对象中多次写入数据，并绘制很多次
 * @return 无
 * @error INVALID_ENUM target不是上述值之一，这是讲保持原有的绑定情况不变
 * 
 * 
 * 将缓冲区对象分配给attribute变量
 * @name gl.vertexAttribPointer()
 * @param location 指定待分配attribute变量的存储位置
 * @param size 指定缓冲区中每个顶点的分量个数(1-4)。若size比attribute变量需要的分量数小，确实分量将按照与gl.vertexAttrb[1234]f()相同的规则不全
 * @param type 用以下类型之一来指定数据格式
 *        gl.UNSIGNED_BYTE 无符号字节 Uint8Array
 *        gl.SHORT 短整型 Int16Array
 *        gl.UNSIGNED_SHORT 无符号短整型 Uint16Array
 *        gl.INT 整型 Int32Array
 *        gl.UNSIGNED_INT 无符号整型 Uint32Array
 *        gl.FLOAT 浮点型 Float32Array
 * @param normalize 出入true或false，表明是否将非浮点型的数据归一化到[0,1]或[-1,1]区间
 * @param stride 指定相邻两个顶点间的字节数，默认为0
 * @param offset 指定缓冲区对象中的偏移量（以字节量为单位）即attribute变量冲缓冲区中的何处开始存储，如果是从起始位置开始的，offset为0
 * @return 无
 * @error INVALID_OPERAION 不存在当前程序对象
 * @error INVALID_VALUE location大于等于attribute变量的最大数目（默认8），或者stride或offset为负值
 * 
 * 开启attribute变量
 * @name gl.enableVertexAttribArray()
 * @param location 指定attribute变量的存储位置
 * @return 无
 * @error INVALID_VALUE location大于等于attribute变量的最大数目（默认为8）
 * 
 * 关闭分配attribute变量
 * @name gl.disableVertexArray()
 * @param location 指定attribute变量的存储位置
 * @return 无
 * @error INVALID_VALUE location大于等于attribute变量的最大数目（默认为8）
 * 
 * gl.drawArrays()的第二个和第三个参数
 * @name gl.drawArrays()
 * @param mode 指定绘制的方式，可接收以下常量符号：gl.POINTS gl.LINES gl.LINE_STRIP gl.LINE_LOOP gl.TRIANGLES gl.TRIANGLE_STRIP gl.TRIANGLE_FAN
 * @param first 指定从哪个顶点开始绘制（整型）
 * @param count 指定绘制需要用到多少个顶点
 */

