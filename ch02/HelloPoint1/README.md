# HelloPoint1
## 步骤
1. 获取`<canvas>`元素
2. 获取`WebGL`绘图上下文
3. 初始化着色器
4. 设置`<canvas>`背景色
5. 清除`<canvas>`
6. 绘图

### 获取`<canvas>`元素
```javascript
const canvas = document.getElementById('webgl');
const gl = getWebGLContext(canvas);

if (!gl) {
  console.log('Failed to get the rendering context for WebGL');
  return;
}
```

### 定义顶点着色器、片段着色器
```javascript
// 顶点着色器
const VSHADER_SOURCE = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`;

// 片段着色器
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;
```

### 初始化着色器

```javascript
initShaders(gl, vshader, fshader)
```

[*initShaders的运作原理*]()

### 设置`<canvas>`背景色

```javascript
gl.clearColor(0.0,0.0,0.0,1.0)
```

### 清空`<canvas>`

```javascript
gl.clear(gl.COLOR_BUFFER_BIT);
```

### 绘图

```javascript
gl.drawArrays(gl.POINTS, 0, 1)
```

## 相关函数

`gl.drawArrays`

```javascript
gl.drawArrays(mode, first, count)
/*
执行顶点着色器，按照mode参数指定的方式绘制图形

参数  
mode 指定绘制的方式，可接收以下常量符号:gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLES_STRIP, gl.TRIANGLES_FAN
first 指定从哪个顶点开始绘制(整型数)
count 指定绘制需要用到多少个顶点(整型数)

返回值 无

错误 INVALID_ENUM 传入的mode不是前述参数之一
     INVALID_VALUE 参数first或count是负数
*/
```