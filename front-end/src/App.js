import * as dd from "dingtalk-jsapi"
import axios from "axios"
import React from "react"
import "./App.css"
import { message } from "antd"
import { Link, withRouter } from "react-router-dom"
import Work from "./components/Work"
import Classes from "./components/Classes"
import Courses from "./components/Courses"
import "antd/dist/antd.min.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //内网穿透工具介绍:
      // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
      // 替换成后端服务域名
      domain: "",
      corpId: "",
      authCode: "",
      userId: "",
      userName: "",
      deptList: [],
      deptId: 0,
      teachers: [],
      myCourses: [
        {
          name: 1111,
          startTime: "22222",
          endTime: "33333",
          teacherName: "4444",
          courseCode: "5555",
        },
        {
          name: 333,
          startTime: "444",
          endTime: "555",
          teacherName: "999",
          courseCode: "5500055",
        },
      ],
      otherCourses: [
        {
          name: 1111,
          startTime: "22222",
          endTime: "33333",
          teacherName: "4444",
          courseCode: "6665",
        },
      ],
      adjustCourse: {
        myCourseCode: "",
        otherCourseCode: "",
      },
      showType: 0,
      className: "",
      classId: "",
      bizId: "",
      finish: false,
      sendMessage: {
        teacherList: [],
        title: "通知",
        text: "",
        time: "",
      },
      origin: "",
      displayType: 0,
    }
  }
  showWork(e) {
    this.setState({
      showType: 2,
    })
  }
  addUser(e) {
    let msg = this.state.sendMessage
    msg.teacherList.push({
      id: e.target.value,
      name: e.target.name,
    })
    this.setState({
      sendMessage: msg,
    })
    console.log(JSON.stringify(this.state.sendMessage))
  }
  setText(e) {
    let msg = this.state.sendMessage
    msg.text = e.target.value
    this.setState({
      sendMessage: msg,
    })
  }
  sendMsg(e) {
    let msg = this.state.sendMessage
    msg.classId = this.state.classId
    this.setState({
      sendMessage: msg,
    })
    let data = this.state.sendMessage
    data.origin = window.location.origin
    axios
      .post(this.state.domain + "/campus/sendMsg", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        message.success("通知已发出！")
      })
      .catch((error) => {
        alert("tongzhi err " + JSON.stringify(error))
      })
  }
  getBizId(param) {
    if (param) {
      let arr = param.split("=")
      if (arr) {
        if (arr[0].indexOf("?bizId") !== -1) {
          this.setState({
            bizId: arr[1],
          })
        }
      }
    } else {
      alert("param error!!!", param)
    }
  }
  finishWork() {
    if (this.state.finish) {
      message.success("已完成")
      return
    }
    axios
      .post(
        this.state.domain + "/campus/updateWork",
        {
          userId: this.state.userId,
          bizId: this.state.bizId,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        alert("完成任务")
        this.setState({
          finish: true,
        })
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  render() {
    if (this.state.userId === "") {
      this.login()
    }
    let param = this.props.location.search
    if (param) {
      if (this.state.bizId === "") {
        this.getBizId(param)
      }
      let status = this.state.finish ? (
        <div>已完成</div>
      ) : (
        <div>
          任务页面。。。
          <br />
          <br />
          <br />
          <br />
          <br />
          <button type="button" onClick={() => this.finishWork()}>
            完成任务
          </button>
        </div>
      )
      return <div>{status}</div>
    } else {
      let body
      if (this.state.displayType === 0) {
        body = (
          <div>
            <a onClick={(e) => this.displayType(e, 1)} className="AppLink">
              发送通知/待办
            </a>
            <a onClick={(e) => this.displayType(e, 2)} className="AppLink">
              调换课
            </a>
          </div>
        )
      } else if (this.state.displayType === 1) {
        let deptOptions
        if (this.state.showType === 0) {
          deptOptions = (
            <div>
              <h3 className="title">选择部门：</h3>
              {this.state.deptList.map((item, i) => (
                <div key={i}>
                  <p>
                    <a className="AppLink">
                      <span
                        onClick={(e) =>
                          this.chooseDept(
                            e,
                            item.deptId,
                            item.deptType,
                            item.name
                          )
                        }
                      >
                        {item.name}
                      </span>
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )
        } else {
          deptOptions = <div></div>
        }
        body = (
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
              onClick={(e) => this.newWorkRecord(e)}
            />
          </div>
        )
      } else if (this.state.displayType === 2) {
        body = (
          <div>
            <Courses
              myCourses={this.state.myCourses}
              otherCourses={this.state.otherCourses}
              chooseMy={(e) => this.chooseMy(e)}
              chooseOther={(e) => this.chooseOther(e)}
              onClick={() => this.adjust()}
            />
          </div>
        )
      }
      return <div className="App">{body}</div>
    }
  }
  adjust() {
    let data = this.state.adjustCourse
    data.origin = window.location.origin
    axios
      .post(this.state.domain + "/campus/adjust", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        message.success("调课申请已发出，请留意通知消息!")
      })
      .catch((error) => {
        alert("adjust err " + JSON.stringify(error))
      })
  }
  chooseOther(e) {
    let value = e.target.value
    let adjustCourse = this.state.adjustCourse
    adjustCourse.otherCourseCode = value
    this.setState({
      adjustCourse: adjustCourse,
    })
  }
  chooseMy(e) {
    let value = e.target.value
    let adjustCourse = this.state.adjustCourse
    adjustCourse.myCourseCode = value
    this.setState({
      adjustCourse: adjustCourse,
    })
  }
  courseList() {
    axios
      .get(this.state.domain + "/campus/courseList?userid=" + this.state.userId)
      .then((res) => {
        this.setState({
          myCourses: res.data.data.myCourses,
          otherCourses: res.data.data.otherCourses,
          displayType: 2,
        })
      })
      .catch((error) => {
        alert("courseList err " + JSON.stringify(error))
      })
  }
  displayType(e, type) {
    if (type === 2) {
      this.courseList()
    } else {
      this.setState({
        displayType: type,
      })
    }
  }
  newWorkRecord(data) {
    let ids = []
    for (let i = 0; i < this.state.sendMessage.teacherList.length; i++) {
      ids.push(this.state.sendMessage.teacherList[i].id)
    }
    data.ids = ids
    data.url = window.location.origin + data.url
    data.origin = window.location.origin
    axios
      .post(this.state.domain + "/campus/newWork", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.success) {
          message.success("创建任务待办成功！")
        } else {
          message.error("创建任务待办失败！")
        }
        this.setState({
          showType: 1,
        })
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }
  chooseDept(e, deptId, deptType, name) {
    console.log("chooseDept deptId : " + deptId)
    if (deptType === "class") {
      this.setState({
        classId: deptId,
        className: name,
      })
      this.getClassUserList(deptId)
    } else {
      this.setState({
        deptId: deptId,
      })
      this.getDeptList(deptId)
    }
  }
  getClassUserList(classId) {
    axios
      .get(this.state.domain + "/campus/classUserList?classId=" + classId)
      .then((res) => {
        this.setState({
          teachers: res.data.data.result.details,
          showType: 1,
        })
      })
      .catch((error) => {
        alert("class err " + JSON.stringify(error))
      })
  }
  getDeptList(deptId) {
    axios
      .get(this.state.domain + "/campus/deptList?deptId=" + deptId)
      .then((res) => {
        this.setState({
          deptList: res.data.data.result.details,
          showType: 0,
        })
      })
      .catch((error) => {
        alert("dept err " + JSON.stringify(error))
      })
  }

  login() {
    axios
      .get(this.state.domain + "/getCorpId")
      .then((res) => {
        if (res.data) {
          this.loginAction(res.data)
        }
      })
      .catch((error) => {
        alert("corpId err, " + JSON.stringify(error))
      })
  }
  loginAction(corpId) {
    let _this = this
    dd.runtime.permission.requestAuthCode({
      corpId: corpId, //企业 corpId
      onSuccess: function (res) {
        // 调用成功时回调
        _this.state.authCode = res.code
        axios
          .get(_this.state.domain + "/login?authCode=" + _this.state.authCode)
          .then((res) => {
            if (res && res.data.success) {
              let userId = res.data.data.userId
              let userName = res.data.data.userName
              message.success("登录成功，你好:" + userName)
              setTimeout(function () {
                _this.setState({
                  userId: userId,
                  userName: userName,
                })
              }, 0)
              _this.getDeptList(0)
            } else {
              alert("login failed --->" + JSON.stringify(res))
            }
          })
          .catch((error) => {
            alert("httpRequest failed --->" + JSON.stringify(error))
          })
      },
      onFail: function (err) {
        // 调用失败时回调
        alert("requestAuthCode failed --->" + JSON.stringify(err))
      },
    })
  }
}

export default withRouter(App)
