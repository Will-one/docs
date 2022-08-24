---
title: '教程'
categories:
- Command
tags:
- git
---


## p2 开始使用
搜索官方下载地址进行下载

最开始需要配置个人的用户名称和电子邮箱

```
git config --global user.name "willone"
git config --global user.email "xxx@example.com"
```
检查已有的配置
```
git config --list
```

###
初始化仓库
```
git init
```

## p3 简介
### 区域
  工作区
  暂存区
  版本库

### 对象
  git对象
  树对象
  提交对象

## p4 git对象
Git的核心部分是一个简单的键值对数据库，可以通过命令想数据库中插入任意类型的内容，会返回一个键值，
通过该键值可以在任意时刻再次检索该内容
### 向数据库中写入内容 并返回对应键值
* 命令：
```
echo 'content' | git hash-object -w --stdin
```
选项说明：
  1. -w 选项指示 hash-object 命令存储数据对象，若不指定此选项，则该命令仅仅返回对应的键值
  2. --stdin （standard input）选项则指示该命令 该命令从标准输入读取内容，若不指定此选项，则需在命令尾部给出待存储文件的路径
  ```
  // 存文件
  git hash-object -w 文件路径

  // 返回对应文件的键值
  git hash-object 文件路径
  ```

* 返回
  该命令输出一个长度为40个字符的效验和。这是一个SHA-1 哈希值

### 查看 git 如何存储数据
* 命令：
  find .git/objects -type f
* 返回：
  .git/object/d6/dlsafajfld8faj3leafjl4afmd4femalj32
  这就是 git 存储内容的方式：一个文件对应一条内容。效验和的两个字符用于命名子目录，余下的38个祖父用于作为文件名

### 根据键值拉去数据
* 命令：
  git cat-file -p d6dlsafajfld8faj3leafjl4afmd4femalj32
  -p 选项可指示该命令自动判断内容的类型，并显式为格式友好的内容
* 返回：
  对应文件的内容

## p5 树对象
树对象（tree object），它能解决文件名保存的问题，也允许我们将对个文件组织到一起。Git以一种类似于UNIX文件系统的方式存储内容。所有内容均以树对象和数据存储对象（git对象）的形式存储，其中树对象对应了UNIX 中的目录项，数据对象（git对象）则大致上对应文件内容。一个树对象包含了一条或者多条记录（每条记录含有一个指向git对象或者子树对象的 SHA-1 指针，以及相应的模式、类型、文件名信息）。一个树对象也可以包含另一个树对象。
### 查看树对象
* 命令：
  git cat-file -p master^{tree}(或者是数对象的hash)
    master^{tree} 语法便是 master 分支上最新的提交所指向的树对象。
* 返回：


### 构建树对象
可以通过 update-index、write-tree、read-tree等命令来构建一个树对象并放入暂存区。
* 操作
  1. 利用update-index命令 为 test.txt 文件的首个版本创建一个暂存区。并通过write-tree命令生成树对象。
    * 命令：
      git update-index --add --cacheinfo 100622 \
           d6dlsafajfld8faj3leafjl4afmd4femalj32
      git write-tree
      文件模式为 100644，表明这是一个普通文件
                100755，表明一个可执行文件
                120000，表明一个符号链接
      --add选项：
        因为此前文件并不在暂存区中，首次需要 --add
      --cacheinfo选项：
        因为将要添加的文件位于git数据库中，而不是位于当前目录下 所以需要 --cacheinfo
  2. 新增 new.txt 将new.txt 和 test.txt 文件的第二个版本放入暂存区。
   。。。。
  
## p6 提交对象
我们可以通过调用commit-tree命令创建一个提交对象，为此需要指定一个树对象的 SHA-1 值，以及本次提交的 父提交对象 （如果有的话，暂存区的首次快照就没有父对象）
* 创建提交对象
  echo 'first commit' | git commit-tree d8239f
  返回：d6dlsafajfld8faj3leafjl4afmd4femalj32
* 查看提交对象
  git cat-file -p fdf4c3

* 提交对象的格式
  提交对象的格式很简单：它先指定一个顶层树对象，代表当前项目快照；然后是作者/提交者信息（依据user.name 和 user.email 配置来设定，外加一个时间戳），留空一行，最后是提交注释


## p7 高层命令
git操作最基本的流程
1. 创建工作目录，对工作目录和里面的文件进行修改
2. git add ./
   这个命令相当于以下命令的集合
   ```
   //修改了多少个工作目录中的文件，此命令就被执行多少次
   git hash-object -w 文件名

   //创建暂存区
   git update-index ....
   ```

3. git commit -m "注释"
   这个命令相当于以下命令的集合
   ```
   // 生成树对象
   git write-tree
   // 生成提交对象
   git commit-tree
   ```


## p8-p9 高层命令（CRUD）
### git status
查看文件的状态

### git diff
1. 当前做了哪些修改还没有暂存
   命令：git diff
2. 哪些更新已经暂存好了准备下次提交
   命令：git diff --cached 或者 git diff --staged（1.6.1版本以上）

### git commit -a
加上-a可以将跟踪的文件暂存起来一并提交，相当执行了
git add .
git commit 

### git log
查看日志，q键退出
1. git log --pretty=oneline
2. git log --oneline
3. git reflog  ：显示所有操作

### git rm
可以使用： git rm 文件名
相当于：
1. 删除文件
2. git add . 

### git mv
将工作目录中的文件改名并放入暂存区
git mv 原文件名 新文件名

## p10 分支
* 显示分支
  git branch
  git branch -v 查看每一个分支最后一次提交
  git branch name commitHash 新建一个分支并且指向commitHash 提交对象
  git branch --merged 查看哪些分支已经合并到当前分支
  git branch --no-merged 查看所有包含未合并工作的分支

* 创建一个分支
  git branch 分支名
  :::tip 原理
    在当前的提交对象上创建创建一个指针
  :::

* 删除一个分支
  git branch -d 分支名

### 切换分支
:::tip
注意：切换分支的时候，如果当前分支上有 未暂存的修改 或者 有未提价的暂存
分支可以切换，但是这种操作可能会污染其他分支
:::
git checkout 分支名

新建并切换分支
git checkout -b 分支名

### 合并分支
切换到主分支，然后
git merge 分支名

## 分支存储
有时，当你在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状态。而此时需要切换到另一个分支工作。但是，不想将当前这些代码创建一次提交。这个时候可以用git stash
* git stash
  git stash 命令会将未完成的修改保存到一个栈上，可以在任何时候重新应用这些改动（git stash apply）

git stash list 查看存储
git stash apply stash@{2}
    如果不指定一个存储，git认为指定的是最近的存储
git stash pop 应用存储然后立即从栈上扔掉它【用的多】
git stash drop stash@{0}加上要溢出的存储的名字来溢出它


## Git 回退【后悔药】
注意：回退的前提是文件已经被跟踪
### 工作区
* 如何撤回自己在工作目录中的修改：git checkout -- filename
* 新版本已经改为：git restore filename

### 暂存区
* 如何撤回自己的缓存：git reset HEAD filename

### 版本库
* 一个提交对象多次提交：
  1. 注释写错了 git commit --amend
  2. 多次提交，只生产一个提交对象git commit --amend

* 重置提交对象
  1. git reset --soft HEAD^
  2. git reset --soft HEAD~3
  3. git reset --soft commitID

选项说明
--hard 删除改动代码，撤销git add
--soft 不删除改动的代码，不撤销git add
--mixed 不删除改动代码，撤销git add


## p11 git设置签名
* 项目级别/仓库级别：仅在当前本地库范围内有效
  * git config user.name willone
  * git config user.email willone@gmail.com
  * 信息保存的位置：./.git/config
* 系统用户级别：登录当前操作系统的用户范围
  * git config --global user.name willone
  * git config --global user.email willone@gmail.com
  * 信息保存的位置：~/.gitconfig 文件
* 查看配置信息：git config --list

## p12 添加提交并查看状态
### 状态查看操作
* git status
  查看工作区、暂存区状态
### 添加操作
* git add [file name]
  将工作区的 “新建/修改” 添加到暂存区
### 提交操作
* git commit -m "commit message" [file name]
  将暂存区的内容提交到本地库

## p15 查看历史记录的几种不同方式
* git log 
  * 显示的很详细
  * 多屏显示的控制方式：空格向下翻页、b向上翻页、q退出
* git log --pretty=oneline
  * 显示简洁
* git log --oneline 
  * 更简洁，hash取了前7位
* git reflog
  * HEAD@{移动到对应版本需要的步数}

## p17-p19 版本穿搜
先通过git reflog 查看想要去的版本
* 基于索引值（提交对象hash）操作【推荐】
  * git reset --hard [提交对象hash]
* 使用^，几个^退几步
  * git reset --hard HEAD^
* 使用~，~n退n步
  * git reset --hard HEAD~3

### reset 命令的三个选项
* --soft
  * 在本地库移动HEAD指针
* --mixed
  * 在本地库移动HEAD指针
  * 重置暂存区
* --hard
  * 在本地库移动HEAD指针
  * 重置暂存区
  * 重置工作区


## p20-p22 删除文件找回
* 前提：删除前，文件存在时的版本提交到本地库过
* 操作：git reset --hard [文件存在的版本]

## p23 git diff 比较文件
* git diff [文件名]
  * 比较工作区和暂存区
* git diff [本地库某个版本] [文件名]
  * 将工作区中的文件和本地库历史记录比较
* 不带文件名就比较多个文件

## p25 分支操作
* 创建分支
  * git branch [分支名]
  * git checkout -b [分支名]
* 查看分支
  * git branch -v
* 切换分支
  * git checkout [分支名]
* 合并分支
  * 第一步：切换到接受修改的分支上（被合并，增加新内容） 
  * 第二步：git merge [要合并的分支名]
* 解决冲突 
  * 冲突的表现，以===分隔，<<<至===为当前分支，===至>>>为另一分支
  * 冲突的解决：
    * 第一步：删除特殊符号并编辑文件[选择保留某一分支的修改/整体优化到满意为止]
    * 第二步：git add [文件名]
    * 第三部：git commit -m "日志信息"。!!注意：此时的commit 不能带具体文件名


## 远程库相关，不使用ssh情况
### 创建本地库并推送关联远程库

* 创建本地和远程库
  * 创建了本地库
  * 创建一个远程库(新建一个repository即可，README本地可能会有，不默认添加)
* 推送需要知道往哪个远程地址推送（去远程库复制https的地址）
  * git remote add origin [远程库https地址]
    * 添加一个远程库，别名origin
  * 查看远程库地址 git remote show origin
* 推送本地库到远程
  * git push origin [要推送的分支]

### p37 克隆操作
* 命令
  * git clone [远程https的地址]
* 效果
  * 完整的把远程库下载到本地
  * 创建origin远程地址别名
  * 初始化本地库

### p38 拉取
* pull = fetch + merge
* git fetch [远程库地址别名] [远程分支名]
* git merge [远程库地址别名/远程分支名]

### p40 解决冲突
要点
* 如果不是基于Github远程库最新版本做的修改，不能推送，必须先拉去。
* 如果拉去后有冲突，则先解决冲突后，再推送

### p41 跨团队协作
* Fork
 * A的项目a需要B来跨团队协作，那么B就去github访问项目地址，并点击项目页面的【Fork】
 * Fork完成之后，B也有了项目的远程库b，可以clone到本地进行修改。然后push到B的远程库b
 * B要将修改推送到A，需要发起Pull requests（位置在B的远程库b头部选项）
 * 然后点击【New Pull request】进入页面，点击【Create pull request】。输入标题和内容，然后发送信息
 * 此时A在项目a的页面的Pull requests就有一个信息，在其中可以进行沟通，代码审核和代码合并


## 远程库相关，使用ssh
* 进入当前用户的家目录
  * cd ~
* 删除.ssh目录
  * rm -rvf .ssh
* 运行命令生成.ssh秘钥目录
  * ssh-keygen -t ras -C willone@gmail.com
  * 【注意：-C 是大写】
* 进入.ssh目录查看文件列表
  * cd .ssh
  * ls -IF
* 查看id_rsa.pub文件内容
  * cat id_rsa.pub
* 复制id_rsa.pub文件内容，登录Github，点击用户头像--》Settings--》SSH and GPG keys
* New SSH Keys 输入复制的秘钥信息
* 回到Git bush创建远程库地址别名
  * git remote add origin_ssh [远程库SSH地址]
  * git push origin_ssh [要推送的分支]