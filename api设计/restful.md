restful是api设计的规范



api的url: http://api.foo.com/v1/xxx 或 http://www.foo.com/api/v1/xxx (v1是版本1)



<img src="../../Typora/my-images/image-20210331213033019.png" alt="image-20210331213033019" style="zoom:60%;margin-left: 0;" />



get

post: 新增数据

put: 修改数据

delete

...



获取学生列表: 	get			/user

新增学生: 			post		/user

修改学生:			put 			/user



为啥分页查询要用get:  便于用户分享链接，内容不变

