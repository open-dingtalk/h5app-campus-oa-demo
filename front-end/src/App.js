import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';

function Work(props) {
    let usernamelist = [];
    for (let i = 0; i < props.users.length; i++) {
        usernamelist.push(props.users[i].name);
    }
    if(props.showType === 2){
        return(
            <div>
                <h4>创建任务</h4>
                <text>代办人：{usernamelist.join(",")}</text>
                <div className="page-section">
                    <div className="form-row">
                        <div className="form-row-label">任务标题</div>
                        <div className="form-row-content">
                            <input name="title" className="input" placeholder="输入标题"
                                   value={props.form.title}
                                   onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-line"/>
                    <div className="form-row">
                        <div className="form-row-label">任务链接</div>
                        <div className="form-row-content">
                            <input name="url" className="input" placeholder="输入任务链接"
                                   value={props.form.url}
                                   onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-line"/>
                    <div className="form-row">
                        <div className="form-row-label">待办时间</div>
                        <div className="form-row-content">
                            <input name="createTime" className="input" placeholder="输入格式：yyyy-MM-dd hh:mm:ss" type="datetime"
                                   value={props.form.createTime}
                                   onChange={props.onChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="page-section">
                    <div className="form-row">
                        <div className="form-row-label">小标题</div>
                        <div className="form-row-content">
                            <input name="formTitle" className="input" placeholder="输入小标题"
                                   value={props.form.formTitle}
                                   onChange={props.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-line"/>
                    <div className="form-row">
                        <div className="form-row-label">任务内容</div>
                        <div className="form-row-content">
                            <input name="formContent" className="input" placeholder="任务内容"
                                   value={props.form.formContent}
                                   onChange={props.onChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" onClick={props.onClick}>创建</button>
                </div>
            </div>
        )
    }return <div></div>
}

function Classes (props) {
    if (props.showType === 1) {
        return (
            <div>
                <h3>{props.className}</h3>
                <h4>老师列表</h4>
                {
                    props.teachers.map((item, i) =>
                        <label key={"teacher" + i}>
                            <input type="checkbox" value={item.userid} name={item.name} onChange={props.addUser}/>
                            <span>{item.name}</span>
                        </label>
                    )
                }
                <p>输入通知内容：<textarea value={props.text} onChange={props.onChange}/></p>
                <p>
                    <button onClick={props.onClick}>发送通知</button>
                </p>
                <p onClick={props.showWork}><u>创建待办</u></p>
            </div>
        )
    } else {
        return <div></div>
    }
}


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //内网穿透工具介绍:
            // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
            // 替换成后端服务域名
            domain: "http://abcdefg.vaiwan.com",
            corpId: '',
            authCode: '',
            userId: '',
            userName: '',
            deptList:[],
            deptId: 0,
            teachers: [],
            showType:0,
            className: '',
            classId: '',
            bizId:'',
            finish:false,
            sendMessage:{
                teacherList:[],
                title:"通知",
                text:"",
                time:"",
            },
            form:{
                title:"任务待办",
                url:"http://abcdefg.vaiwan.com/toWork",
                createTime:"2021-07-05 16:00:00",
                formTitle:"标题",
                formContent:"内容"
            },
        }
    }
    showWork(e){
        this.setState({
            showType: 2
        })
    }
    addUser(e){
        // alert(e.target.value);
        // console.log(e.target.name);
        let msg = this.state.sendMessage;
        msg.teacherList.push({
            id:e.target.value,
            name:e.target.name
        })
        this.setState({
            sendMessage: msg
        })
        console.log(JSON.stringify(this.state.sendMessage));

    }
    setText(e){
        // alert("text:", e.target.value)
        let msg = this.state.sendMessage;
        msg.text = e.target.value;
        this.setState({
            sendMessage: msg
        })
    }
    sendMsg(e){
        let msg = this.state.sendMessage;
        msg.classId = this.state.classId;
        this.setState({
            sendMessage: msg
        })
        axios.post(this.state.domain + "/campus/sendMsg", JSON.stringify(this.state.sendMessage),
            {headers:{"Content-Type":"application/json"}}
        ).then(res => {
            alert("通知已发出！");
        }).catch(error => {
            alert("tongzhi err " + JSON.stringify(error))
        })
    }
    getBizId(param){
        if(param){
            let arr = param.split("=");
            if(arr){
                if(arr[0].indexOf("bizId") != -1){
                    this.setState({
                        bizId:arr[1]
                    })
                }
            }
        }else{
            alert("param error!!!", param);
        }
    }
    finishWork(){
        if(this.state.finish){
            alert("已完成")
            return;
        }
        axios.post(this.state.domain + "/campus/updateWork", {
            userId:this.state.userId,
            bizId:this.state.bizId,
        },{headers:{"Content-Type":"application/json"}}).then(res => {
            alert("完成任务")
            // alert(JSON.stringify(res))
            this.setState({
                finish:true
            })
        }).catch(error => {
            alert(JSON.stringify(error))
        })

    }

    render() {
        if(this.state.userId === ''){
            this.login();
        }
        let param = this.props.location.search;
        if(param){
            if(this.state.bizId === ""){
                this.getBizId(param);
            }
            let status = this.state.finish ? <div>已完成</div> : <div>
                 任务页面。。。
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <button type="button" onClick={() => this.finishWork()}>完成任务</button>
            </div>
            return (
                <div>
                    {status}
                </div>
            );
        }else{
            let deptOptions;
            if(this.state.showType === 0){
                deptOptions =
                    <div>
                        <h3>选择部门：</h3>
                        {
                            this.state.deptList.map((item, i) =>
                                <div key={i}>
                                    <p><u><span onClick={(e) => this.chooseDept(e, item.deptId, item.deptType, item.name)}>{item.name}</span></u></p>
                                </div>
                            )
                        }
                    </div>
            }else{
                deptOptions = <div></div>
            }
            return(
                <div>
                    {deptOptions}
                    <Classes
                        showType={this.state.showType}
                        teachers={this.state.teachers}
                        className={this.state.className}
                        addUser={(e) => this.addUser(e)}
                        onChange={(e) => this.setText(e)}
                        text={this.state.sendMessage.text}
                        onClick={(e) => this.sendMsg(e)}
                        showWork={(e) => this.showWork(e)}
                    />
                    <Work
                        showType={this.state.showType}
                        users={this.state.sendMessage.teacherList}
                        form={this.state.form}
                        onChange={(e) => this.updateFormData(e)}
                        onClick={(e) => this.newWorkRecord(e)}
                    />
                </div>
            )
        }

    }
    newWorkRecord(e){
        let data = this.state.form;
        let ids = [];
        for (let i = 0; i < this.state.sendMessage.teacherList.length; i++) {
            ids.push(this.state.sendMessage.teacherList[i].id);
        }
        data.ids = ids;
        // alert(JSON.stringify(data));
        axios.post(this.state.domain + "/campus/newWork",
            JSON.stringify(data),{headers:{"Content-Type":"application/json"}}
        ).then(res => {
            // alert(JSON.stringify(res));
            if(res.data.success){
                alert("创建任务待办成功！")
            }else{
                alert("创建任务待办失败！")
            }
            this.setState({
                showType: 1,
            })
        }).catch(error => {
            alert(JSON.stringify(error))
        })
    }
    updateFormData(e){
        let form = this.state.form;
        switch (e.target.name) {
            case "title":
                form.title = e.target.value;
                this.setState({form: form});
                break;
            case "url":
                form.url = e.target.value;
                this.setState({form: form});
                break;
            case "createTime":
                form.createTime = e.target.value;
                this.setState({form: form});
                break;
            case "formTitle":
                form.formTitle = e.target.value;
                this.setState({form: form});
                break;
            case "formContent":
                form.formContent = e.target.value;
                this.setState({form: form});
                break;
        }
    }
    chooseDept(e, deptId, deptType, name){
        console.log("chooseDept deptId : " + deptId);
        if(deptType === 'class'){
            this.setState({
                classId: deptId,
                className: name
            });
            this.getClassUserList(deptId);
        }else{
            this.setState({
                deptId: deptId
            })
            this.getDeptList(deptId);
        }
    }
    getClassUserList(classId){
        axios.get(this.state.domain + "/campus/classUserList?classId=" + classId)
            .then(res => {
                // alert("class list :" + JSON.stringify(res.data.data.result.details));
                alert("teachers --- ")
                this.setState({
                    teachers: res.data.data.result.details,
                    showType:1
                });
                // alert("classUserList --- " + JSON.stringify(this.state.students))
            }).catch(error => {
            alert("class err " + JSON.stringify(error))
        })
    }
    getDeptList(deptId){
        axios.get(this.state.domain + "/campus/deptList?deptId=" + deptId)
            .then(res => {
                // alert("dept list :" + JSON.stringify(res.data.data.result.details));
                this.setState({
                    deptList: res.data.data.result.details,
                    showType:0
                });
            }).catch(error => {
            alert("dept err " + JSON.stringify(error))
        })
    }

    login() {
        let _this = this;
        dd.runtime.permission.requestAuthCode({
            corpId: "ding9f50b15bccd16741",//企业 corpId
            onSuccess : function(res) {
                // 调用成功时回调
                _this.state.authCode = res.code
                axios.get(_this.state.domain + "/login?authCode=" + _this.state.authCode
                ).then(res => {
                    if (res && res.data.success) {
                        let userId = res.data.data.userId;
                        let userName = res.data.data.userName;
                        alert('登陆成功，你好，' + userName);
                        _this.setState({
                            userId:userId,
                            userName:userName
                        })
                        _this.getDeptList(0);
                    } else {
                        alert("login failed --->", res);
                    }
                }).catch(error => {
                    alert("httpRequest failed --->",JSON.stringify(error))
                })
            },
            onFail : function(err) {
                // 调用失败时回调
                alert("requestAuthCode failed --->",JSON.stringify(err))

            }
        });
    }

}

export default withRouter(App)
