# Hello Canvas
## 步骤

1. 获取`<canvas>`元素
2. 获取`WebGL`绘图上下文
3. 设置背景色
4. 清空`<canvas>`

### 获取`<canvas>`元素
``` javascript
const canvas = document.getElementById('webgl');
``` 

### 获取`WebGL`绘图上下文
  
```javascript
const gl = getWebGLContext(canvas);
// getWebGLContext函数位于cuon-utils.js文件中
``` 

<table border="1" frame="void">

<tr>
<td>方法</td>
<td colspan="2">getWebGLContext(element[, debug])</td>
</tr>

<tr>
<td>描述</td>
<td colspan="2">获取WebGL上下文，如果开启了debug属性，遇到错误时将在控制台显示错误消息</td>
</tr>


<tr>
<td rowspan="2">参数</td>
<td>element</td>
<td>指定&lt;canvas&gt;元素</td>
</tr>

<tr>
<td>debug(optional)</td>
<td>默认为false，如果设置为true，Javascript中发生的错误将被显示在控制台上。注意，在调试结束后关闭它，否则会影响性能</td>
</tr>


<tr>
<td rowspan="2">返回值</td>
<td>non-null</td>
<td> WebGL绘图上下文</td>
</tr>

<tr>
<td>null</td>
<td>WebGL不可用</td>
</tr>


</table>






### 设置canvas背景色
```javascript
gl.clearColor(r, g, b, a)
```
<table border="1" frame="void">

<tr>
<td>方法</td>
<td colspan="2">gl.clearColor(red, green, blue, alpha)</td>
</tr>

<tr>
<td>描述</td>
<td colspan="2">指定绘图区域的背景色</td>
</tr>


<tr>
<td rowspan="5">参数</td>
<td>red</td>
<td>指定红色值(0.0到1.0)</td>
</tr>

<tr>
<td>green</td>
<td>指定绿色值(0.0到1.0)</td>
</tr>

<tr>
<td>blue</td>
<td>指定蓝色值(0.0到1.0)</td>
</tr>

<tr>
<td>alpha</td>
<td>指定透明度值(0.0到1.0)</td>
</tr>

<tr>
<td colspan="2">如果任何值小于0.0或大于1.0，那么就会分别截断为0.0和1.0</td>
</tr>

<tr>
<td>返回值</td>
<td colspan="2">无</td>
</tr>

<tr>
<td>错误</td>
<td colspan="2">无</td>
</tr>


</table>

程序中执行了`gl.clearColor(0.0, 0.0, 0.0, 1.0)`,背景色被指定为黑色，还可以指定为其他颜色
- `(1.0, 0.0, 0.0, 1.0)` 红色
- `(0.0, 1.0, 0.0, 1.0)` 绿色
- `(0.0, 0.0, 1.0, 1.0)` 蓝色
- `(1.0, 1.0, 0.0, 1.0)` 黄色
- `(1.0, 0.0, 1.0, 1.0)` 紫色
- `(0.0, 1.0, 1.0, 1.0)` 青色
- `(1.0, 1.0, 1.0, 1.0)` 白色



### 清空canvas
用之前的背景色填充，擦除已经绘制的内容
```javascript
gl.clear(gl.COLOR_BUFFER_BIT)
```
<table border="1" frame="void">

<tr>
<td>方法</td>
<td colspan="2">gl.clear(buffer)</td>
</tr>

<tr>
<td>描述</td>
<td colspan="2">将指定缓冲区设定为预定的值。如果清空的是颜色缓冲区，那么将使用gl.clearColor()指定的值（作为预设值）</td>
</tr>


<tr>
<td rowspan="4">参数</td>
<td>buffer</td>
<td>指定待清空的缓冲区，位操作符OR(|)可以用来指定多个缓冲区</td>
</tr>

<tr>
<td>gl.COLOR_BUFFER_BIT</td>
<td>指定颜色缓存</td>
</tr>

<tr>
<td>gl.DEPTH_BUFFER_BIT</td>
<td>指定深度缓冲区</td>
</tr>

<tr>
<td>gl.STENCIL_BUFFER_BIT</td>
<td>指定模板缓冲区</td>
</tr>


<tr>
<td>返回值</td>
<td colspan="2">无</td>
</tr>

<tr>
<td>错误</td>
<td>INVALID_VALUE</td>
<td>缓冲区不是以上三种类型</td>
</tr>


</table>

如果没有指定背景色(没有调用`gl.clearColor`)，那么使用的默认值如下：

缓冲区名称|默认值|相关函数
--|--|--
颜色缓冲区|(0.0, 0.0, 0.0, 0.0)|gl.clearColor(red, green, blue, alpha)
深度缓冲区|1.0|gl.clearDepth(depth)
模板缓冲区|0|gl.clearStencil(s)
