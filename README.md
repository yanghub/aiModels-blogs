## 部署步骤

1.启动nginx   -->配置开机启动

vim /usr/local/nginx/conf

nginx.conf配置添加跨域

```
location / {
            root   /usr/local/nginx/dist;
            index  index.html index.htm;
			try_files $uri $uri/ /index.html?s=$uri&$args;
        }
		location ^~ /equipment {
            proxy_pass  http://localhost:8081;
        }
```

重启nginx

```handlebars
ps -ef | grep nginx   //查看nginx线程
kill -9 端口号（注意，要杀两个端口号）

/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```



2.启动redis

3.跨域控制层方法必须加  @CrossOrigin

4.部署时  vue  axios前置请求换成  axios.defaults.baseURL="http://120.25.221.253:8081"  

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