#CSS笔记#

* 减少重复代码，善用em

* 善用`inherit`，从父级继承相应样式
```
background: inherit;
border: inherit;
```

* background会延生至border下
```
background-clip: padding-box; // 用于限制背景显示区域
```

* box-shadow支持多值，可以用于实现多边框
```
box-shadow: 0 0 0 5px red,
              0 0 0 10px green;
```

* outline可以用于实现外边框，距边框的距离可以为负值，即为内边框

 但是outline不贴合于border-radius产生的圆角
```
outline: -5px solid black;
```

* 背景图片距右下角10px的实现方式
```
background-position: right 10px bottom 10px; // position的扩展语法
padding: 0 10px 10px 0;
background-origin: content-box;
background-position: calc(100% - 10px) calc(100% - 10px);
```
