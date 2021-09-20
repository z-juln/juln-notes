    后端(Java):
​        servlet+filter+listener+jdbc+jackson
​        maven
​        tomcat
​        mysql
​        spring全家桶


## 前言

```在使用express前, 最好懂得原生Node.js是如何做后端服务的```

## express的搭建

1. express-generator工具的使用

    1. 先安装express-generator

        npm i -g express-generator

    2. 构建项目(连项目的文件结构都搞好了)

        express 项目名 [-e]

        -e 即支持-ejs


2. 传统方法-手动搭建express

    1. npm init

    2. 安装express
        npm i express -S

    3. 自己敲代码

## express的所有用法

express-myconnection中间件 和 mysql连接池还没有

```javascript
    // 搭建服务的用法
    const express = require('express') // www.js
    const path = require('path') // www.js
    const fs = require('fs') // www.js
    const app = express() // www.js
    const port = 3000 // www.js
    app.listen(port, () => console.log('server is running...')) // www.js

    // 允许跨越
    app.all('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });

    // 开放静态资源
    app.use("/public", express.static(path.join(__dirname,"public")))

	// 404（这一段必须放在router后面）
	app.use(function (req, res, next) {
  		res.status(404).send("Sorry can't find that!")
	})

	// 避免服务器裂开（这一段必须放在router后面）
    app.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Something broke!')
    })

    // get用法
    app.get('/', (req,res) => {
        const id = req.query.id
        res.json() // => 原生的res.setHeader('content-type','application/json')
        res.send() // => 原生的res.end(), 但可以自动转换任何类型, 所以就可以不需要res.json()
    })
    .get('/', (req,res) => {
        res.end('welcome juln')
    })
    .get('*', (req, resp) => {
        resp.redirect('/404.html')
    })

    // post的body的用法
    const bodyParser = require('body-parser') // www.js
    // 如果是json就转换
    app.use( bodyParser.json() ) // www.js
    // 如果是urlencoded数据(form传过来的数据)就转换, 官方推荐{extended: false}, 表示用系统模块queryString来处理数据
    app.use( bodyParser.urlencoded( {extended: false} ) ) // www.js
    /**
    * 如果post请求体的数据非常大的话, 要替换成下面两行, 因为express请求体的默认limit很小
    * app.use( bodyParser.json( {limit: '50mb'} ) )
    * app.use( bodyParser.urlencoded( {limit: '50mb', extended: false} ) )
    */
    app.post('/postTest', (req,res) => {
        console.log(req.body)
        res.end()
    })

    // router分模块的用法
    const router = express.Router()
    app.use(router) // www.js
    const userRouter = express.Router()
    const blogRouter = express.Router()
    router.use(userRouter) // 等同于router.use('/',userRouter), 即路由的拼接
    router.use(blogRouter)

    // 每个router的get和post用法
    userRouter.get('/login', (req,res) => {
        res.end('login page')
    })

    // 图片的响应 (可以用multer模块或者multiparty模块)
    // form的图片媒体传输问题 (前端: form[enctype="multipart/form-data"])
    // multer会将上传的文件信息写到req.file中，表单的文本域信息放到 req.body中（所以不需要再引入body-parser）
    const multer = require('multer') // www.js
    const objMulter = multer({dest: path.join(__dirname,'../public/uploadImages')}) // 如果不添加dest属性，这些文件将保存在内存中，永远不会写入磁盘; 目录不存在则自动创建
    // app.use(objMulter.any()) // 接受任意input[type=file][name=*]的图片
    app.use(objMulter.single('img')) // 只接受input[type=file][name=img]的图片
    let avatorRouter = express.Router()
    app.use(avatorRouter)
    avatorRouter.post(
        '/postAvator', 
        objMulter.single('img'), // 针对本路由的中间件
        (req,res) => {
            console.log(req.files[0]) // 如果multer是singe,就是req.file, 如果multer是any,就是req.files[0]，且req.files[0].fieldname就是前段input的name属性
            const newname = path.join(req.files[0].destination, Date.now() + path.parse(req.files[0].originalname).ext)
            fs.rename(req.files[0].path,newname,function(err){
                if(err){
                    res.send('上传失败')
                }else{
                    res.send('上传成功')
                }
            })
        }
    )
    // 图片的请求和响应
    .get('/getAvator', (req,res) => {
        const rs = fs.createReadStream(path.join(__dirname,'../public/a.jpg'))
        rs.pipe(res)
    })

    // express-jwt的使用
    // npm install express-jwt jwt中间件
    // npm install jsonwebtoken 生成token
    // 加入中间件
    const expressJwt = require('express-jwt')
    app.use(expressJwt({
        secret: 'secret12345',  // 签名的密钥 或 PublicKey
        credentialsRequired: false, // 是否允许不带token, 默认为false
        algorithms: ['HS256'], // 设置jwt的算法
        requestProperty: 'auth', // 修改请求头参数, 默认为Authorization
    }).unless({
        path: ['/login', '/signup']  // 指定路径不经过 Token 解析
    }))
    // 生成token
    const jwt = require('jsonwebtoken')
    app.post('/login', function (req, res) {
        // 注意默认情况 Token 必须以 Bearer+空格 开头
        const token = 'Bearer ' + jwt.sign(
            {
                id: user._id,
                admin: user.role === 'admin'
            },
            'secret12345',
            {
                expiresIn: 3600 * 24 * 3
            }
        )
        res.json({
            status: 'ok',
            data: { token: token }
        })
    })
    // 获取解析内容
    app.get('/xxx', function(req, res) {
        console.log(req.user); // req.user 实际就是 JWT 的 payload 部分：
    })
    // 解析失败
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {   
            res.status(401).send('invalid token')
        }
    })

    /* ================== mysql连接配置 =================== */

    const dbConfig = {
        host: '127.0.0.1',
        port: '3306',
        database: 'blog',
        user: 'root',
        password: '1234'
    }

    module.exports = dbConfig

    /* ================== mysql连接配置 =================== */

    /* =================== mysql连接 ====================== */

    const mysql = require('mysql')
    const dbConfig = require('../config/db')

    const con = mysql.createConnection(dbConfig)
    con.connect()

    const query = function(sqlStr) {
        return new Promise( (resolve,reject) => {
            con.query(sqlStr, (err,result) => {
                if(err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }
    
    module.exports = query

    /* =================== mysql连接 ====================== */
    
    /* =================== dbQuery的使用 ================== */
    const dbQuery = require('./dbQuery.js')

    dbQuery('select * from user').then( result => {
        if(result.affectedRows > 0) {
            console.log(result)
        }
    })
    /* =================== dbQuery的使用 ================== */
```

使用模板引擎ejs
```ejs
// npm i ejs 但不需要引入， 因为配置了view engine后express会自动引入

// app.set('views', path.join(__dirname, 'views')) // 默认就是views目录
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
	res.render('index', {content: 'hello'}) // 前提是views目录下有index.ejs这个文件
})

/* ejs标签含义
    <% '脚本' 标签，用于流程控制，无输出。
    <%_ 删除其前面的空格符
    <%= 输出数据到模板（输出是转义 HTML 标签），即存字符串
    <%- 输出非转义的数据到模板，即支持innerHTML的渲染
    <%# 注释标签，不执行、不输出内容
    <%% 输出字符串 '<%'
    %> 一般结束标签
    -%> 删除紧随其后的换行符
    _%> 将结束标签后面的空格符删除
	<%- include('组件名') -%> 组件也是ejs文件, 组件名也可以是路径，比如./组件名
	<%- include('组件名', {foo: 'foo'}) -%> 传递数据
*/
```

express-session的用法

```js
const session = require("express-session")
app.use(session({
    secret: 'keyboard cat', // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name:'session_id', // 保存在本地cookie的一个名字 默认connect.sid  可以不设置
    resave: true, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
    saveUninitialized: true, // 强制将未初始化的 session 存储。  默认值是true  建议设置成true
    cookie: {
        secure: false, // secure=true https这样的情况才可以访问cookie
        maxAge: 1000*30*60 // 过期时间
    },
    rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))
设置值 req.session.username = "张三"
获取值 req.session.username
req.session.destroy(function(err){ // 销毁 session
    
})


/* 负载均衡配置Session，把Session保存到数据库里面
* 
* 1.安装模块
npm install express-session  --save
npm install connect-mongo  --save


2.引入
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);


3.设置中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

    store:new MongoStore({
        url: 'mongodb://127.0.0.1:27017/student', // 数据库的地址
        touchAfter: 24 * 3600 // time period in seconds
    })
}))


4.使用
设置值
req.session.username = "张三";
获取值 req.session.username

* */
```

