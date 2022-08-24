---
title: 'MacOS 安装配置'
categoris:
- backend
tages:
- MongoDB
---

来源[稀土掘金-夜听风雨知花落](https://juejin.cn/post/7052585815037673479)
## 下载并安装
* 选择以下其中一种方式即可
### 方式一：官网下载
1. [官网下载地址](https://www.mongodb.com/try/download/community)，选择社区版
2. 将下载好的包解压，可以将解压缩后的文件夹重命名为mongodb（或者其他）
3. 将mongodb放到路径：/usr/local 中。自此安装完成。

### 方式二：终端curl命令下载安装
1. 进入 /usr/local
```
cd /usr/local
```
2. 下载
```
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.5.tgz
```
3. 解压
```
sudo tar -zxvf mongodb-macos-x86_64-5.0.5.tgz
```
4. 重命名
```
sudo mv mongodb-macos-x86_64-5.0.5 /mongodb
```

## 配置环境变量
1. cd ~ 进入家目录
2. 打开 /.zshrc 文件
    * 如果使用bash ，则找 .bash_profile
    * 用的是 zsh ， 找 .zshrc
3. 将上面安装的mongodb的bin目录路径添加到 PATH 中。在.zshrc添加以下内容
```
export PATH=/usr/local/mongodb/bin:$PATH
```
4. source ~/.zshrc 使配置生效

## 创建数据和日志存放的目录
* 数据和日志目录
```
sudo mkdir -p /usr/local/var/mongodb
sudo mkdir -p /usr/local/var/log/mongodb
```
* 
```
sudo chown xxx /usr/local/var/mongodb
sudo chown xxx /usr/local/var/log/mongodb
```

## 创建启动配置文件
* 打开终端，切换到 /usr/local/etc 在文件夹下
```
cd /usr/local/etc
```

* 创建 mongod.conf 文件

```
touch mongod.conf
```

* 编辑配置文件 mongod.conf 输入以下配置
```
dbpath=/usr/local/var/mongodb
logpath=/usr/local/var/log/mongodb/mongo.log
fork=true
```

## 启动mongodb
```
mongod --config /usr/local/etc/mongod.conf
```
* 如果嫌麻烦，也可以把上面的指令放到一个shell脚本里面
* 建议官网下载 MongoDB Compass 图形化界面