# Week02 作业
## 写一个正则表达式匹配所有Number直接量
### 二进制
```
/^0[bB][01]+$/
```
### 八进制
```
/^0[oO][0-7]+$/
```
### 十六进制
```
/^0[xX][0-9a-fA-F]+$/
```
### 整数
```
/(^[-+]?[1-9]+$)|^0$/
```
### 指数
```
/^[-+]?([0-9]|\.[0-9])+[eE]([-+]?)[0-9]+$/
```
### 所有 Number直接量的正则
```
/(^0[bB][01]+$)|(^0[oO][0-7]+$)|(^0[xX][0-9a-fA-F]+$)|(^[-+]?[1-9]+$)|^0$|(^[-+]?([0-9]|\.[0-9])+[eE]([-+]?)[0-9]+$)/
```

## 写一个 UTF-8 Encoding 的函数
```javascript
function encodeUtf8(text) {
  const code = encodeURIComponent(text);
  const bytes = [];
  for (let i = 0; i < code.length; i++) {
    const c = code.charAt(i);
    if (c === '%') {
      const hex = code.charAt(i + 1) + code.charAt(i + 2);
      const hexVal = parseInt(hex, 16);
      bytes.push(hexVal);
      i += 2;
    } else {
      bytes.push(c.charCodeAt(0));
    }
  }
  return bytes;
}
```

## 匹配所有的字符串直接量，单引号和双引号
这个实在是写不出来
