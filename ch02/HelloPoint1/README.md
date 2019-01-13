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
```

### 获取`WebGL`绘图上下文
``` javascript
const gl = getWebGLContext(canvas);
``` 


### 初始化着色器

```javascript
// 定义顶点着色器/片段着色器
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

// 初始化着色器
initShaders(gl, vshader, fshader)
// initShaders()方法在cuon.util.js中
```

<table border="1" frame="void">

<tr>
<td>方法</td>
<td colspan="2">initShaders(gl, vshader, fshader)</td>
</tr>

<tr>
<td>描述</td>
<td colspan="2">在WebGL系统内部建立和初始化着色器</td>
</tr>


<tr>
<td rowspan="3">参数</td>
<td>gl</td>
<td>指定渲染上下文</td>
</tr>

<tr>
<td>vshader</td>
<td>指定顶点着色器程序代码（字符串）</td>
</tr>

<tr>
<td>fshader</td>
<td>指定片元着色器程序代码（字符串）</td>
</tr>


<tr>
<td rowspan="2">返回值</td>
<td>true</td>
<td>初始化着色器成功</td>
</tr>

<tr>
<td>false</td>
<td>初始化着色器失败</td>
</tr>


</table>


[*initShaders的运作原理*](./initShader.md)

[*着色器相关*](./shader.md)

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

<table border="1" frame="void">

<tr>
<td>方法</td>
<td colspan="2">gl.drawArrays(mode, first, count)</td>
</tr>

<tr>
<td>描述</td>
<td colspan="2">执行顶点着色器，按照mode参数指定的方式绘制图形</td>
</tr>


<tr>
<td rowspan="3">参数</td>
<td>mode</td>
<td>指定绘制的方式，可以接收一下常量符号：gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLES_STRIP, gl.TRIANGLES_FAN</td>
</tr>

<tr>
<td>first</td>
<td>指定从哪个顶点开始绘制（整数型）</td>
</tr>

<tr>
<td>count</td>
<td>指定绘制需要用到多少个顶点（整数型）</td>
</tr>


<tr>
<td >返回值</td>
<td colspan="2">无</td>

</tr>

<tr>
<td rowspan="2">错误</td>
<td>INVALID_ENUM</td>
<td>传入的mode参数不是前述参数之一</td>
</tr>

<tr>
<td>INVALID_VALUE</td>
<td>参数first或count是负数</td>
</td>


</table>

