## 概念

### schema

用来约束字段的, 比如哪些字段是必须项, 哪些字段是可选项, 字段的默认值...

### model

一个model对应一个collection, 后端要通过model去操作collection

## 使用

### 1. 安装

```cmd
npm i mongoose
```

### 2. 

```注: 集合名都是复数的，比如使用user，那么集合名会自动加上s，变成users（真垃圾）```

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 1. 连接数据库
const db = mongoose.connect('mongodb://username:password@localhost:port/database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) {
        console.log('--------------------------------------')
        console.log('数据库连接失败: ', err)
        console.log('--------------------------------------')
        return
    }
    console.log('数据库连接成功')
})

// 2. 创建model的第一种方法: 先创建schema
// schema的类型有: String, Number, Date, Buffer, Mixed, ObjectId, Array
const blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
})
const Blog = mogoose.model('Blog', blogSchema)

// 2. 创建model的第二种方法(简写): 直接创建model
const model_user = mongoose.model('user', {
    name: {type: String, default: "username"},
    age: Number,
    sex: String
})

// 3. CRUD
// 3.1 C
const insertObj = new model_user({
    name: "juln",
    age: 20,
    sex: "男"
})
insertObj.save()
.then(res => {})
.catch(err => {})
// 3.2 R
model_user.findOne({})
.then(res => {})
model_user.find({}).skip(10).limit(10)
.then(res => {})
// 3.3 U

// 3.4 D
```

