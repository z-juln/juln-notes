## docker概念

dockerhub（类似于github，只是个仓库，里面存放的都是docker镜像文件）

docker（虚拟技术, 可以看作是轻量的虚拟机）

镜像文件（采用洋葱卷模型进行配置、创建或安装）

uni-fs （联合文件系统，即洋葱卷模型的详细文件的文件系统）

容器（如 包含一切tomcat运行环境的tomcat，nginx，centOS，mysql、redis 等。可包含环境、可进行端口映射等）

app（一个容器上可以跑多个应用）

数据卷（数据持久化，防止容器删除后应用的数据直接没了）

数据库主要是用来进行容器和容器宿主（操作系统）间数据共享的。也可以控制权限，比如容器内目录是否可读写。

dockerFiler：由于docker是一次部署到处运行的，所以使用dockerFIler可以使数据卷不映射到宿主容器的固定的目录，而是映射到指定目录。核心文件是配置 “映射关系” 的文件。用命令可以直接在指定路径生产对应的映射文件。或者理解为，dockerFiler是用于自动创建数据卷的。

数据卷容器：即拥有数据卷功能的容器，有点像中介者模式，可以用于不同容器间的数据共享。两个父容器都继承数据卷容器（如centOS），即可数据共享。

dockerFile（用于构建docker镜像的构建文件，类似于package.json，但实际上它更像脚本文件）

## docker面向开发需知

dockerhub => dockerFile => docker镜像文件 => docker容器 => app

## docker基本命令

1. ```docker version```
2. ```docker pull nginx```
3. ```docker run -p 80:80 -v $PWD/www:/usr/share/nginx/html nginx``` 若本地没有镜像，run就会自动进行pull，再run
4. ```docker run -p 80:80 -v $PWD/www:/usr/share/nginx/html -d nginx```
5. ```docker run -d --name=mynginx -p 80:80 -v $PWD/www:/usr/share/nginx/html nginx``` --name 是给容器起名，方便stop
6. ```docker ps```
7. ```docker exec -it 3a0 /bin/bash``` 进入容器, 其中 3a0 是容器id, 用 ```exit``` 退出
8. ```docker stop 3a0``` 关闭容器
9. ```docker start 3a0```
10. ```docker rm 3a0``` 删除容器
11. ```docker build -t mynginx .``` 创建镜像

## 定制简单的镜像

项目根目录下创建 /Dockerfile 文件

```dockerfile
FROM nginx:latest
RUN echo '<h1>hello world</h1>' > /usr/share/nginx/html/index.html
```

```docker build -t mynginx .``` 创建镜像

## 最佳实战, 企业级项目的部署流程(其实应该再加上个gitlab)

### 1. 创建自己的koa项目的镜像

项目根目录下创建 /.dockerignore文件

```
node_modules
```

项目根目录下创建 /Dockerfile 文件

```dockerfile
FROM node:10-alpine # 10-alpine是精简的node的版本
ADD . /app/ # copy
WORKDIR /app # 指定当前工作目录
RUN npm install 
EXPOSE 3000 # 暴露到3000端口
```

```docker build -t mykoa .``` 创建镜像

```docker run -p 3000:3000 -d mykoa```

docker可以通过配置ARG构建参数, 来部署test1,test2,stage,pro等环境

### 2. 创建自己的pm2镜像

项目根目录下创建 /.dockerignore文件

```
node_modules
```

项目根目录下创建 /Dockerfile 文件

```dockerfile
FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org/ && \
	npm i
EXPOSE 3000
# pm2在docker中使用命令为pm2-docker
CMD ["pm2-runtime", "start", "process.yml"]
```

项目根目录下创建 /process.yml文件

```yaml
apps:
  - script : app.js
    instances : 2
    watch : true
    env :
      NODE_ENV: production
```

```docker build -t mypm2 .``` 创建镜像

```docker run -p 3000:3000 -d mypm2```

docker可以通过配置ARG构建参数, 来部署test1,test2,stage,pro等环境

## docker-compose

> 作用: 一个配置文件启动多个容器

项目根目录下创建 /docker-compose.yml文件

```yaml
version: '3.1' # yaml文件的version
services:
  mongo:
  	image: mongo
  	restart: always
  	ports:
  	  - 27017:27017
  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
```

```docker-compose up``` 启动

## docker-compose最佳实战

前后端、nginx混合, ci

docker-compose内置虚拟专网, 比如访问```协议://容器名.com:容器端口``` , 就是访问了容器的服务，比如 ```http://mykoa.com:7001``` 或 ```mongodb://mymongo:27017```

## 笔记待补充！！！

第二次刷视频后补上

## docker远程仓库

首先: 在远程仓库如 [docker官网](https://registry.hub.docker.com/) 注册自己的用户, 并创建仓库

命令:

1. ```docker login```
2. ```docker logout```
3. ```docker tag mykoa juln/mykoa:v1``` 将镜像打标签, docker标签的规范是 用户名/仓库名:标签名
4. ```docker push juln/test:v1``` 上传到 用户名/仓库名:标签名

