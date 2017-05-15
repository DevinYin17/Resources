## 安装brew，mac上的apt-get
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## 安装nginx
```
brew install nginx
```
安装目录 `/usr/local/Cellar/nginx/{版本}`
conf目录 `/usr/local/etc/nginx/nginx.conf`
log目录 `/usr/local/var/log/nginx/*.log`

浏览器访问`http://localhost:8080`，用于测试安装是否成功

## nginx命令
nginx -h 查看 nginx 命令参数
nginx -s reopen | quit | reload | stop 开启 退出 重启 停止
重启 `nginx -c /usr/local/etc/nginx/nginx.conf`


## nginx错误
报错 `nginx: [emerg] bind() to 0.0.0.0:8080 failed (48: Address already in use)`

原因 80端口已被占用(可能因为未成功关闭一些服务，如nginx服务等)

解决 sudo nginx -s stop(或者:sudo nginx -s quit)，然后重新启动(sudo nginx)
    当然，如果是因为其他服务占用了80端口，如Apache服务等，则把对应服务器关掉(sudo apachectl stop)
