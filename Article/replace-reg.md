# String.prototype.replace 和 regexp
---
**/()..()/ 每个括号对应一个`$n`**

```
'tom jerry'.replace(/(\w+)\s(\w+)/, '$2-$1') // "jerry-tom"
'tom jerry'.replace(/(\w+)(\s)(\w+)/, '$3-$2-$1') // "jerry- -tom"
```

**$&：当前匹配的字符串；$`：当前匹配字符串左侧的内容；$'：当前匹配字符创右侧内容**
```
'tom jerry'.replace(/\s/, '$`') // "tomtomjerry"
'tom jerry'.replace(/\s/, "$'") // "tomjerryjerry"
'tom jerry'.replace(/\s(\w+)/, "$&$1") // "tom jerryjerry"
```

**String.prototype.replace第二个参数可以是function，function的第一个参数相当于`$&`，后面的参数相当与`$n`**
```
info.replace(/font-size:(\s?)(\d+)px/g, (fontSizeAttr) => {
  const fontSize = fontSizeAttr.match(/\d+/g)[0]
  return `font-size: ${fontSize * window.dpr * 1.2}px`
})
```

```
str = 'x-x_'
str.replace(/(x_*)|(-)/g, function(match, p1, p2) {
    console.log(match, p1, p2)
});
// x x undefined
// - undefined -
// x_ x_ undefined
```
