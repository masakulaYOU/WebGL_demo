# Hello Canvas
## 步骤

为WebGL获取绘图上下文
  
```javascript
canvas.getContext('webgl')
// webgl experimental-webgl webkit-3d moz-webgl
``` 
设置canvas背景色
```javascript
gl.clearColor(r, g, b, a)
```
清空canvas，用之前的背景色填充，擦除已经绘制的内容
```javascript
gl.clear(gl.COLOR_BUFFER_BIT)
```

## 相关函数

`gl.clearColor`

```javascript
gl.clearColor(red, green, blue, alpha)
/*
指定绘图区域的背景色

参数
red 指定红色值(0.0到1.0)
green 指定绿色值(0.0到1.0)
blue 指定蓝色值(0.0到1.0)
alpha 指定透明度值(0.0到1.0)
如果任何一个值小于0.0或大于1.0，那么就会分别断接为0.0和1.0

返回值 无

错误 无
*/
```


`gl.clear`

```javascript
gl.clear(buffer)

/*
将指定的缓冲区设定为预定的值，如果清空的是颜色缓冲区，那么将使用gl.clearColor()指定的值（作为预设值）

参数  
buffer 指定清除的缓存区，位操作符OR(|)可用来指定多个缓冲区
      gl.COLOR_BUFFER_BIT 指定颜色缓存，对应gl.clearColor(r, g, b, a)
      gl.DEPTH_BUFFER_BIT 指定深度缓存，对应gl.clearDepth(depth)
      gl.STENCIL_BUFFER_BIT 指定模板缓存，对应gl.clearStencil(s)

返回值 无

错误 INVALID_VALUE 缓冲区不是以上三种类型
*/
```

清空缓冲区的默认颜色及其相关函数

缓冲区名称|默认值|相关函数
--|--|--
颜色缓冲区|(0.0, 0.0, 0.0, 0.0)|gl.clearColor(red, green, blue, alpha)
深度缓冲区|1.0|gl.clearDepth(depth)
模板缓冲区|0|gl.clearStencil(s)