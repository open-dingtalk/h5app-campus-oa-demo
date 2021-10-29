# 校园oa场景--demo
> 此demo主要展示校园内部教师相关人员oa操作，包括发起待办/通知，查看课表、申请调课等。
>
> ps：此demo中课程表数据使用假数据，开发者使用时可替换成自己数据库中的数据，要点是teacherUserid属性对应钉钉userid即可。



### 项目结构

**rear-end**：后端模块，springboot构建，接口功能包括：模拟课程数据、调课请求、查询家校部门列表、查询班级人员列表、查询班级人员关系、发送消息通知等。

**front-end**：前端模块，react构建，场景功能包括：免登操作、展示课程、发起调课申请、展示家校部门、展示班级学生、设置放学时间、选中学生、发送放学通知等。



### 开发前配置

**设置应用首页地址**

访问此应用的首页地址

![image-20210706171740868](https://img.alicdn.com/imgextra/i4/O1CN01C9ta8k1L3KzzYEPiH_!!6000000001243-2-tps-953-517.png)



**申请权限**

申请以下权限：“通讯录用户信息读取、消息通知、待办任务读写、新教育-家校通讯录读取等”

![image-20210706172027870](https://img.alicdn.com/imgextra/i3/O1CN016WCr6428wDdBhkWi6_!!6000000007996-2-tps-1358-571.png)

**创建家校通讯录**

钉钉oa家校通讯录：录入学区/学段/年级/班级、老师、学生、家长等信息（此处是展示家校相关接口，不需要可省略此步骤）

![image-20210706172905949](https://img.alicdn.com/imgextra/i2/O1CN01x92Pc71fGQdVsqmJA_!!6000000003979-2-tps-829-525.png)



### 运行前准备

 下载demo

```shell
git clone https://github.com/open-dingtalk/h5app-scene-group-demo.git
```

### 获取相应参数

获取到以下参数，修改后端application.yaml

```yaml
app:
  app_key: *****
  app_secret: *****
  agent_id: *****
  corp_id: *****
```

参数获取方法：登录开发者后台

1. 获取corpId：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

### 修改前端页面

**打开项目，命令行中执行以下命令，编译打包生成build文件**

```shell
cd front-end
npm install
npm run build
```

**将打包好的静态资源文件放入后端**

![image-20210706173224172](https://img.alicdn.com/imgextra/i2/O1CN01QLp1Qw1TCVrPddfjZ_!!6000000002346-2-tps-322-521.png)

### 启动项目

- 启动springboot
- 移动端钉钉点击工作台，找到创建的应用，进入应用

### 页面展示

**进入首页自动登陆**

![image-20210706174029703](https://img.alicdn.com/imgextra/i4/O1CN017ExZDY1sF8Y5TOgJD_!!6000000005736-2-tps-446-165.png)

**查看课表，申请换课**

![image-20210706174139748](https://img.alicdn.com/imgextra/i4/O1CN01KtRIKK1Y5FgQobJiP_!!6000000003007-2-tps-447-728.png)

**被申请老师收到消息**

![image-20210706174357055](https://img.alicdn.com/imgextra/i3/O1CN01V92vfD28tveTRyK7o_!!6000000007991-2-tps-910-438.png)

**点击“同意/拒绝”，申请换课老师收到通知**

![image-20210706174519695](https://img.alicdn.com/imgextra/i2/O1CN01TYzfsj1XIhg90WTRx_!!6000000002901-2-tps-450-192.png)



*ps：首页“发起待办/通知”含“家校通讯录”相关接口和功能，上述步骤未配置则不可用*

**Demo家校功能页面展示：**

![image-20210706175116982](https://img.alicdn.com/imgextra/i2/O1CN01utUs6t1qWsf9wkJFI_!!6000000005504-2-tps-443-493.png)

<center>发送通知</center>



![image-20210706175308359](https://img.alicdn.com/imgextra/i3/O1CN01LFr3fm1Rr9m8k2Lej_!!6000000002164-2-tps-428-110.png)

<center>收到通知</center>



![image-20210706175435321](https://img.alicdn.com/imgextra/i2/O1CN01I7dxZj1zZvq4wSDV9_!!6000000006729-2-tps-446-815.png)

<center>发起待办</center>



![image-20210706175532571](https://img.alicdn.com/imgextra/i2/O1CN01NtE9PW1uYwtC1yGPi_!!6000000006050-2-tps-315-188.png)

<center>收到待办</center>



### 参考文档

1. 获取家校通讯录部门列表，文档链接：https://developers.dingtalk.com/document/app/obtains-the-department-node-list
2. 获取家校班级人员列表（学生/老师/家长），文档链接：https://developers.dingtalk.com/document/app/obtains-a-list-of-home-school-user-identities
3. 获取家校班级人员关系列表，文档链接：https://developers.dingtalk.com/document/app/queries-the-list-of-relationships
4. 发送通知，文档链接：https://developers.dingtalk.com/document/app/asynchronous-sending-of-enterprise-session-messages
