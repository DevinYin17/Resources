# `$location.path()`和`$location.url()`的区别

------

url：http://{path}？{query string}

`$location.path()`和`$location.url()`都包setter和getter

**getter：**
```
$location.path() = {path}
$location.url() = {path}？{query string}
```
**setter：**
```
newUrl = /a/b?c=d
$location.path(newUrl) -> http://{path:/a/b?c=d}？{query string} （path中的特殊字符被转义）
$location.url(newUrl) -> http://{path:/a/b}？{query string:c=d}
```
**结论：**
```
if(newUrl.hasQueryString()) {
     if(oldUrl.hasQueryString()) {
          oldQueryString = $location.search()
          $location.url(newUrl).search(Object.assign($location.search(), oldQueryString))
     } else {
          $location.url(newUrl)
     }
} else {
     if(oldUrl.hasQueryString()) {
          $location.url(newUrl)  // oldQueryString loss
          $location.path(newUrl) // oldQueryString still exist
     } else {
          $location.url(newUrl) or $location.path(newUrl)
     }
}

$location.url('/a/b?c=d') = $location.path('/a/b').search({c: 'd'})
```
