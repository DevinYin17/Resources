# `<img />` 和 `background-image`
---
`<img />`html的标签，通常配合width、height、max/min-width、max/min-height属性使用

单独设置width或height某一个值时，显示时会固定该值，图片会按比例缩放
按理，同时两者设置时，就回在指定区域内进行拉伸

`background-image`css属性，通常配合background-repeat、background-size、background-position使用

首先，讲background-size最常用的两个值，contain和cover。
contain：包含，用背景图片的最大边去适配显示区域
cover：覆盖，用背景图片的最小边去适配显示区域
通常两种情况都会加上background-position: canter;但是只有contain时才需要使用background-repeat: no-repeat;因为cover已经是裁切了，显示区域不够一张图片的显示，谈何repeat。
cover大多数的使用场景就是居中裁切，比如显示用户头像时
contain则用在图片需要完整显示的区域

`background-image`是需要明确该元素的width、height，图片没有能力去涉及或者说是改变元素的width、height
`<img />`作为元素，其width、height则完全可以有图片来决定

Firefox不支持background-position-x/background-position-y

object-fit
object-position

background-attachment
background-clip: padding-box; // 用于限制背景显示区域
background-origin
background-position: right 10px bottom 10px; // position的扩展语法
