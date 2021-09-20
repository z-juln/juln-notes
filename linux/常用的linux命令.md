## 常用的linux命令

### 1. 文件、目录操作

1. ```cd``` 
2. ```ls``` ```ls -a```
3. ```ll``` 即 ```ls -l```
4. ```touch``` 创建文件
5. ```move``` 迁移文件，也可重命名
6. ```copy``` copy文件
7. ```>``` 重定向
8. ```|``` 

### 2. vi

1. 默认是命令模式
2. 点击 ```i``` 键，从命令模式进入插入模式
3. 点击 ```:``` 键，然后按 ```wq!``` 键退出插入模式，进入命令模式
4. 点击 ```esc``` 键，从插入模式退回命令模式

### 3. 文本文件读取

1. ```tail``` 显示文件的尾部信息
2. ```cat``` 显示文件信息

### 4. 用户、权限

1. ```sudo```
2. ```su```

### 5. shell

> 变量类型:
> **1) 局部变量** 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
> **2) 环境变量** 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
> **3) shell变量** shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

1. $0 $1 ...

   $0 $1 ... 获取执行脚本或函数时携带的参数

   say-hello.sh

   ```shell
   #!/bin/bash
   
   echo "hello $1"
   ```

   chmod +x ./say-hello.sh  #使脚本具有执行权限

   ./say-hello.sh 鞠婧祎

   打印: hello 鞠婧祎

   $# 是获取参数的总数

   $@ 或 $* 是以数组形式获取参数

2. 局部变量

   ```shell
   your_name="qinjx" # 等号左右两边不能有空格
   echo $your_name
   echo ${your_name}
   echo "${your_name}"
   unset your_name # 删除变量
   
   your_name="qinjx"
   your_name="alibaba" # 随时重新赋值
   readonly your_name # 设为常量
   ```

   建议使用变量的时候都加 ```{}``` , 养成编程好习惯
   
3. 单引号

   单引号里的任何字符都会原样输出, 对单引号不能使用转义符

   ```shell
   str='this is a string'
   ```

4. 字符串拼接

   ```shell
   your_name="runoob"
   # 使用双引号拼接
   greeting="hello, "$your_name" !"
   greeting_1="hello, ${your_name} !"
   echo $greeting  $greeting_1
   # 使用单引号拼接
   greeting_2='hello, '$your_name' !'
   greeting_3='hello, ${your_name} !'
   echo $greeting_2  $greeting_3
   ```

5. 获取字符串长度

   ```shell
   string="abcd"
   echo ${#string} #输出 4
   ```

6. 提取子字符串

   以下实例从字符串第 **2** 个字符开始截取 **4** 个字符：

   ```shell
   string="runoob is a great site"
   echo ${string:1:4} # 输出 unoo
   ```

7. 查找子字符串

   ```shell
   # 查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)：
   
   string="runoob is a great site"
   echo `expr index "$string" io`  # 输出 4
   ```

8. 数组

   ```shell
   arr=("hello" 8 9 10) # 声明数组
   
   echo ${arr[0]} # 打印hello
   echo ${arr[@]} # 打印"hello" 8 9 10
   echo ${arr[*]} # 打印"hello" 8 9 10
   echo ${#arr[@]} # 打印arr的数组长度,注意:${#arr}不是获取数组长度,不知道这是啥
   arr[100]=123
   echo ${arr[100]} # 打印123
   ```

9. 多行注释

   > shell不支持多行注释, 只能靠一些技巧来实现相同的功能

   - ```shell
     :<<EOF
     注释内容...
     上面的EOF也可以换成其它符号
     注释内容...
     EOF
     ```

   - ```shell
     # 通过函数来实现,只要函数不调用就没问题
     EOF() {
         注释内容...
         注释内容...
     }
     ```

10. 流程控制

    ```shell
    read num
    
    if [ $num == 1 ]
    then
    	echo "$num  == 1, res: $[$num==1]"
    elif [ $num == 2 ]
    then
    	echo "$num  == 2, res: $[$num==2]"
    else
    	echo "???"
    fi
    ```

    ```shell
    for i in 1 2 3
    do
      echo "i: $i"
    done
    ```

    ```shell
    while [ 1 ]
    do
      echo "???"
    done
    ```

11. 函数

    ./sayHello.sh

    ```shell
    #!/bin/bash
    
    # 最好注释说明一下参数,因为shell的函数声明是不声明参数的
    sayHello() {
      echo "hello $1"
    }
    sayHello # 函数的使用
    sayHello $1 # 携带参数
    ```

    执行 ./sayHello.sh juln 输出 hello 和 hello juln 两行

12. 运算符

    > 略

13. 转义

    ```shell
    echo -n "hello world -c" # 双引号默认不转义,-n是开启转义,-c是不换行

### 6. 其它功能

1. ```ps -ef``` ```-e```是列出当前进行的所有进程 ```-f```是full，即展示出每个进程的所有详情信息
2. ```ssh``` 远程登录，如 ```ssh root@127.0.0.1``` ssh的默认端口是22
3. ```curl``` 进行web请求，如 ```curl http://www.baidu.com```
4. ```tcpdump -nn -i eth0 icmp``` 网络抓包工具
5. ```clear``` 清屏

