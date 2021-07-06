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



### 运行

**下载项目**

```shell
git clone https://github.com/open-dingtalk/h5app-campus-oa-demo.git
```

**修改企业id**

![image-20210706173519037](https://img.alicdn.com/imgextra/i3/O1CN01bia0MI1k3fgUVsxrr_!!6000000004628-2-tps-863-381.png)



**react编译打包**

```shell
cd front-end
npm install
npm run build
```

**静态资源放入后端**

![image-20210706173224172](https://img.alicdn.com/imgextra/i2/O1CN01QLp1Qw1TCVrPddfjZ_!!6000000002346-2-tps-322-521.png)



**修改app_key、app_secret、agent_id**

![image-20210706173701248](https://img.alicdn.com/imgextra/i4/O1CN013T5AIB1XgWH2FAV9O_!!6000000002953-2-tps-848-380.png)



**启动后端服务，使用钉钉访问首页**



### 页面展示

**进入首页自动登陆**

![image-20210706174029703](https://img.alicdn.com/imgextra/i3/O1CN01sQ4hTv1p7rNrR1TDC_!!6000000005314-2-tps-331-519.png)



**点击“调换课”查看课表**

![image-20210706174139748](https://img.alicdn.com/imgextra/i4/O1CN01TuurDn1VnGsdkQVih_!!6000000002697-2-tps-332-565.png)

**勾选我的课程和其他老师课程，点击申请换课**

![image-20210706174256165](https://img.alicdn.com/imgextra/i1/O1CN0135Qi2E1WaHG8lsYKm_!!6000000002804-2-tps-317-463.png)

**被申请老师收到消息**

![image-20210706174357055](https://img.alicdn.com/imgextra/i3/O1CN01V92vfD28tveTRyK7o_!!6000000007991-2-tps-910-438.png)

**点击“同意/拒绝”，申请换课老师收到通知**

![image-20210706174519695](https://img.alicdn.com/imgextra/i2/O1CN01TYzfsj1XIhg90WTRx_!!6000000002901-2-tps-450-192.png)

**重新查看课表**

![image-20210706174636405](https://img.alicdn.com/imgextra/i1/O1CN01hZdXZs22fpll5QVGU_!!6000000007148-2-tps-336-586.png)

**被申请人点“同意”后，上课时间已经调换，“拒绝”时则无变化**



**ps：首页“发起待办/通知”含“家校通讯录”相关接口和功能，上述步骤未配置则不可用， demo中功能为选择进入家校班级，选择老师发送待办或通知，详情可参考：https://github.com/open-dingtalk/h5app-homeschool-comm-demo**

**demo中部分页面展示：**

![image-20210706175116982](https://img.alicdn.com/imgextra/i3/O1CN01vFSNMe1g9OABUIwIU_!!6000000004099-2-tps-332-452.png)

<center>发送通知</center>



![image-20210706175308359](https://img.alicdn.com/imgextra/i3/O1CN01LFr3fm1Rr9m8k2Lej_!!6000000002164-2-tps-428-110.png)

<center>收到通知</center>



![image-20210706175435321](https://img.alicdn.com/imgextra/i1/O1CN01mfh2gA1lTbj7Ixxzl_!!6000000004820-2-tps-330-562.png)

<center>发起待办</center>



![image-20210706175532571](https://img.alicdn.com/imgextra/i2/O1CN01NtE9PW1uYwtC1yGPi_!!6000000006050-2-tps-315-188.png)

<center>收到待办</center>



### 参考文档

1. 获取家校通讯录部门列表，文档链接：https://developers.dingtalk.com/document/app/obtains-the-department-node-list
2. 获取家校班级人员列表（学生/老师/家长），文档链接：https://developers.dingtalk.com/document/app/obtains-a-list-of-home-school-user-identities
3. 获取家校班级人员关系列表，文档链接：https://developers.dingtalk.com/document/app/queries-the-list-of-relationships
4. 发送通知，文档链接：https://developers.dingtalk.com/document/app/asynchronous-sending-of-enterprise-session-messages
