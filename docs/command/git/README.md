---
title: 'Git 使用指南'
categories:
- Command
tags:
- git
---

:::tip
[Git 文档](https://git-scm.com/book/zh/v2)
:::

## 常规
---
### 1.clone
* `git clone url`  得到项目的拷贝
* `git clone git..@.....df..` 克隆主干
* `git clone -b 分支名  git..@.....df..`   克隆分支

### 2.merge
* 将一个分支 merge 到另一个分支（进入本地分支），将分支名(远程)的内容 merge 到本地的分支上。
* `git merge 分支名（远程）`
* 有提示信息的话(和vim一样)，按 :q 退出提示信息，然后在 git push 推送到远程

### 3.add
* 新增或者修改的文件提交为待修改状态
* `git add 文件路径`
* `git add .` （全部提交）

### 4.commit
* 将待提交文件提交到本地仓库
* `git commit -m "提交说明"` 

### 5.push
* 将本地仓库的 commit 提交到远程仓库
* `git push`

### 6.pull
* 拉取远程仓库中的代码，更新本地代码
* `git pull` 

强制覆盖本地代码
* `git fetch --all`
* `git reset --hard origin／master最后分支名`
* `git pull`

## 放弃本地修改
---
### 1.未git add 缓存代码
* `git checkout -- filepath` 
* `git checkout .`  放弃所有

### 2.已经git add 缓存代码
* `git reset HEAD filepathname` 
* `git reset HEAD .`

### 3.已经git commit 提交了代码
|回退操作|选项说明|
|---|---|
|`git reset --soft HEAD^` 回退至上一次|--hard 删掉改动的代码，撤销git add|
|`git reset --soft HEAD~3` 回退至3次前|--soft 不删除改动代码，不撤销git add|
|`git reset --soft commitId` 回退至任意版本（git log查看）|--mixed 不删除改动代码，撤销git add（默认值）|

## 新建、同步和查看
### 1.查看
|命令|说明|
|---|---|
|`git status`|查看分支状态。修改，添加，删除，commit都有显示|
|`git diff 具体修改` |查看具体修改的代码|
|`git branch`|查看当前本地分支，加 `-a` 选项查看全部本地和远程分支|
|`git log`|列出分支的修改记录，每条记录都有commitID|

### 2.新建并同步
|命令|说明|
|---|---|
|`git checkout -b 新分支名`|新建并切换到新分支下|
|`git branch 新分支名`|本地新建一个分支|
|`git push --set-upstream origin 新分支名`|将本地新建的分支推送到远程|
|`git push origin 分支名`|需要将本地的修改推送的远程库中（不一定需要）|
|`git remote update origin --prune`|更新远程源（新建分支后，本地 git branch -a 不显示新分支，显示后q退出）刷新本地和远程同步（不一定需要）|

### 3.删除本地分支
|命令|说明|
|---|---|
|`git branch -d 本地分支名`|删除本地分支|
|`git branch -D 本地分支名`|强制删除本地分支|

## merge申请后继续提交
---
|命令|说明|
|---|---|
|`git commit --amend -m "说明"`||
|`git push`||
|`git push --force`|如果rejected|

## 未提交想切换分支
---
* `git stash` 隐藏代码
* `git stash pop` 取消代码隐藏