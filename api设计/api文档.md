### 1. 用apiDoc生成文档

```前提：写接口的时候必须写注释，因为apiDoc是根据注释来生成文档的```



1. 全局安装apidoc

```cmd
npm i apidoc -g
```



2. 写配置文件

项目根目录下写配置文件apidoc.json

```js
{
  "name": "example",
  "version": "0.1.0",
  "description": "apiDoc basic example",
  "title": "Custom apiDoc browser title",
  "url" : "https://api.github.com/v1",
  "header": {
    "title": "文档说明",
    "filename": "header.md"
  },
  "footer": {
    "title": "文档结尾",
    "filename": "footer.md"
  }
}
```

或者直接在package.json中写配置

```js
{
  "name": "apidoc-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "Eve",
  "license": "MIT",
  "apidoc": {
    "name": "apidoc-demo",
    "description": "You write something here to describe your project",
    "title": "The title of this doc",
    "header": {
      "title": "文档说明",
      "filename": "header.md"
    },
    "footer": {
      "title": "文档结尾",
      "filename": "footer.md"
    }
  }
}
```



3. 写接口注释

```js
/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {String} name Username.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
```



4. 生成文档

```cmd
apidoc -i myapp/ -o apidoc/ -t mytemplate/
# -i是指注释文件存放的地方, -o是指文档输出的位置
```



### 2. 手写api文档

略