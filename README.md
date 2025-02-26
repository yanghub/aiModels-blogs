报错 `<template v-for> key should be placed on the <template> tag`现已修复，感谢提交

# 一键启动

```bash
npm i
npm run serve
```

## 技术栈

技术栈

前端：

- 👉 vue2 + elementUI 
- ⚙️ markdown-it，axios

后端：

- 🔑 Spring Boot
- 💡 vs code编辑器自动格式化
- 🔌MyBatis plus, Shiro, redis
-  📦hibernate， validatior  ，FastDFS

[前端](https://github.com/yanghub/aiModels-blogs/tree/master)     [后端]()

## 大模型本地部署

使用LM studio运行本地测试，非流式回复测试，测试模型`deepseek-r1-distill-qwen-1.5b`

[📦huggingface模型网📦](https://huggingface.co/models)  后端默认地址http://127.0.0.1:1234

如需在线下载替换源

安装目录搜索

```
findstr /s /i /m /c:"huggingface.co" *.*
```

nodepat++替换

```
把所有的huggingface.co都替换成hf-mirror.com
```

## 

# 部署步骤

1.启动nginx   -->配置开机启动

vim /usr/local/nginx/conf

## nginx配置

nginx没有启动,则为   Network Error

再通过反向代理配置

```
location / {
            root   /usr/local/nginx/dist;
			proxy_pass http://localhost:8081;   //配置的后端
            index  index.html index.htm;
			try_files $uri $uri/ /index.html?s=$uri&$args;
        }
        
```

或者

```
location / {
            root   /usr/local/nginx/dist;
            index  index.html index.htm;
			try_files $uri $uri/ /index.html?s=$uri&$args;
        }
location ^~ /equipment {
    proxy_pass hhttp://localhost:8081;
  }
```

查看运行端口

```
ps aux|grep nginx
```

kill  端口号

1.先停止再启动（推荐）：
对 nginx 进行重启相当于先停止再启动，即先执行停止命令再执行启动命令。如下：

```
./nginx -s quit
./nginx
```

重新启动

```
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

## win启动

版本Redis-x64-3.2.100   **点击**redis-cli.exe

## 启动redis

3.跨域控制层方法必须加  @CrossOrigin

4.部署时  vue  axios前置请求换成 

5.springboot打包jar包，无需修改启动类（部署tomcat需要）

pom指定名称

```
<build>
    <finalName>vueblog</finalName>
</build>
```

使用Maven package

jdbcURL路径

```xml
url: jdbc:mysql://localhost:3306/blog?useUnicode=true&serverTimezone=UTC
```

pom依赖

```xml
<version>0.0.1-SNAPSHOT</version>
<packaging>jar</packaging>     /*打包成jar包*/



<build>
        <finalName>vueblog</finalName>   /*jar包名*/
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>        /*添加此依赖*/
                    <fork>true</fork>
                </configuration>
            </plugin>
        </plugins>
</build>
```

6.使用npm run build打包前端dist即可，可不打包成静态资源

```
npm run build
```

7.阿里云上传指令

前端vue

```
source /etc/profile
jps   -ml. |grep  dist |xargs. kill
nohup java -jar /usr/local/nginx/dist > nohup.log 2>&1 &
```

后端springboot

```
source /etc/profile
jps   -ml. |grep  shirodemo |xargs. kill
nohup java -jar /myprojectjar/shirodemo.jar > nohup.log 2>&1 &
```

8.配置一致的数据库名和表，mysql

```xml
username: user
password: ******
```

9.花生壳在centos自启动

10.解决部署保存数据乱码

