## 基本概念

`mongodb` 中基本的概念是文档、集合、数据库，让我由外而内和大家聊聊。

和`MySQL`对比来看就是

- 数据库——>数据库
- 表————>**集合(collection)**
- 行————>**文档(Document)**
- 列 ————>字段

命令mongo是客户端的命令, mongod是服务端的命令

mongodb的默认端口为 <mark>27017</mark>



## 优缺点

### 优点

随意, 开发过程中可不断迭代. 性能更高，更快，而且更方便.

### 缺点

mongodb的这种随意性是把双刃剑，能带来高效，也能造成灾难。尤其当项目涉及的开发人员越多，需求变化越频繁，mongodb存储的数据就越容易变成一个屎坑，你无法完全知道某一个集合中的文档哪些字段是有用的，哪些字段是没用的，你的程序不得不去配合这些未知的数据，从而造成不必要的繁琐，以及带来更多的BUG。



## 外部命令

mongodb底层是基于js引擎实现的, 所以支持大部分js语句, 比如for,if

mongo登录
以下成功都会返回{ok: 1}
show databases;
use db1;也可创建, 但若db1中没有数据, show databases是查看不到db1的
show collections;
db.createCollection('c1');
db.c1.drop();
db.dropDatabase();删除当前所在的数据库



## crud命令

### C insert

<mark>mongodb会给每条数据自动创建一个_id的字段, 以确保唯一 (所以千万不要去动它)</mark>

<mark>insert之后返回的数据: {"nInserted": 1}</mark>

db.user.insert(json数据); 集合c1不存在会自动创建

```mongo
如 db.user.insert({name: 'juln', password: 'juln123', age: 21});
```

db.user.insert(数组); 一次性插入多条数据; 返回{"nInserted": 数组长度}

for语句可快速插入多条, 一般用于数据库创建初始数据, 以便测试

```mongo
for(var i = 1; i <= 10; i++) {
	db.user.insert({name: ""+i, password: ""+i});
}
```



### R find

<mark>与sql语句不同, 这里不是select, 而是find</mark>

db.user.find(); 查看全部

db.user.find().pretty(); 格式化结果, 类似与JSON.Stringify(data, null, 2)

db.user.find( {name: 'juln', password: 'juln123'}, {name: 1, password: 0} ); 第一个参数是条件, 第二个参数是要查询的字段名(0为不查询,1为查询)

db.user.find( {}, {name: 1} ); 查看所有用户的用户名

db.user.find( {}, {password: 0} ); 查看所有用户的信息, 除了password字段不看之外, 其它都查看

比较查询: db.user.find({age: { $gte: 18 }}); 查询大于等于18岁的用户

#### 运算符

| 运算符 | 作用   | 例子                                  |
| :----- | :----- | ------------------------------------- |
| $gt    | >      |                                       |
| $gte   | >=     | db.user.find({age: { $gte: 18 }});    |
| $lt    | <      |                                       |
| $lte   | <=     |                                       |
| $ne    | !===   |                                       |
| $in    | in     | db.user.find({age: { in: [18,20] }}); |
| $nin   | not in |                                       |

#### 排序 sort

db.user.find().sort({age: 1}); 1为整序, -1为倒序

#### 分页查询 skip limit

db.user.find().limit(10); 获取前十条

db.user.find().skip(10).limit(10); 跳过前10条，获取10条数据，即获取第11到第20条数据

#### 计数 count

db.user.find().count(); 获取数量

### U update

<mark>update之后返回的数据: {"nMatched": 1}</mark>

db.user.update( {}, {} ); 第一个参数是条件, 第二个参数是要修改的新数据

db.user.update({name: 'juln'}, {name: 'juln', password: '123'}); 把用户juln的那整条数据直接改成{name: 'juln', password: '123'}, 但是注意: 本来的age字段丢了, 因为它是直接替换而不是修改

如果要修改, 得引入一个修改器.

#### 修改器

| 修改器  | 作用     | 例子                                                         |
| :------ | :------- | ------------------------------------------------------------ |
| $inc    | 递增     | db.user.update( {name: 'juln'}, {$inc: {age: 1}}}); 把用户user的age+1 |
| $rename | 重命名列 | db.user.update( {}, {$rename: {name: 'username'}}}); 把name字段名改成username |
| $set    | 修改列值 | db.user.update( {name: 'juln'}, {$set: {password: '123'}}); 把用户user的密码改为'123', 其它字段不变 |
| $unset  | 删除列   | db.user.update( {}, {$unset: {age: true}}}); 把age字段去掉   |

### D remove

<mark>与sql语句不同, 这里不是delete, 而是remove</mark>

db.user.remove( {}, false ); 第一个参数是条件, 第二个参数是: 是否只删除一条, 建议都只用全部删除的功能

缺省第二个参数默认为false, 即全部删除

即直接使用 db.user.remove({})



## 进阶



### 聚合查询 aggregate

db.c1.aggregate([

​	{管道: 表达式}

])

>  <img src="../../Typora/my-images/image-20210330125812917.png" alt="image-20210330125812917" style="zoom:80%;margin-left: 0;" />

> <img src="../../Typora/my-images/image-20210330125859586.png" alt="image-20210330125859586" style="margin-left: 0px;zoom: 80%;" />

> <img src="../../Typora/my-images/image-20210330125935169.png" alt="image-20210330125859586" style="margin-left: 0px;zoom: 70%;" />

> <img src="../../Typora/my-images/image-20210330125935169.png" alt="image-20210330125859586" style="margin-left: 0px;zoom: 70%;" />

> <img src="../../Typora/my-images/A61EDD378036B3BA03EFBBA1904610E4-1617080449274.jpg" alt="img" style="margin-left: 0px;zoom: 50%;" />

> <img src="../../Typora/my-images/image-20210330130546034.png" alt="img" style="margin-left: 0px;zoom: 70%;" />



### 索引

- 索引的概念: 如果集合中有某一列添加了索引功能, 那么数据库会针对这一列的数据形成二叉树(按照值的大小进行左右排序)的数据结构, 以便于加快搜索速度
- mongodb默认有个索引: _id
- 应用场景: 比如有42亿条数据, 没有索引的情况下如果要查询最后一条数据要42亿次, 而有索引的情况下只要32次 (2的32次方是42亿)
- 索引的缺点: 索引相当于是空间换时间, 搜索速度快了, 但是索引功能需要花很多磁盘空间, 而且每次修改或增删数据时, 都需要更新索引树
- 创建

> db.user.createIndex({age: 1}); 1为升序, -1为降序, 索引名默认就是列名\_1或列名\_-1, 即age_1
>
> db.user.createIndex({age: 1}, {name: 'age_index'}); 自定义索引名
>
> db.user.createIndex({name: 1, age: 1}); 组合索引
>
> db.user.createIndex({age: 1}, {unique: 'age'}); 唯一索引, 即值唯一, 不能重复

- 删除

> db.user.dropIndexes(); 删除全部索引, _id字段不会被删
>
> db.user.dropIndex("age"); 删除指定索引

- 查看索引

> db.user.getIndexes();

- 分析索引

> db.user.find({id: 1}).explain('executionStats'); 查看数据库执行的相关信息, 比如过滤条件, 搜索了多久, 搜索时过滤了多少条数据, 用的是哪种搜索方式(全表扫描还是索引扫描)...



### 权限机制

- 使用场景: 因为mongodb默认是不需要登录就能使用的, 所以要保护数据库的安全, 使用权限机制, 限制登录
- 使用: <https://www.bilibili.com/video/BV17z4y1D7Yj?p=576>

### 数据库的备份和还原

<https://www.bilibili.com/video/BV17z4y1D7Yj?p=577>



## 可视化管理工具

可视化管理工具:

1. Robo 3T				软件
2. adminMongo      网页
3. MongoVUE          网页

Robo 3T的使用: <https://www.bilibili.com/video/BV17z4y1D7Yj?p=578>