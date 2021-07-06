package com.dingtalk.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dingtalk.api.request.OapiMessageCorpconversationAsyncsendV2Request;
import com.dingtalk.api.request.OapiWorkrecordAddRequest;
import com.dingtalk.api.response.*;
import com.dingtalk.model.Course;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.service.CampusManager;
import com.dingtalk.service.WorkRecordManager;
import com.dingtalk.util.CourseUtil;
import com.dingtalk.util.RandomUtil;
import com.dingtalk.util.TimeUtil;
import com.taobao.api.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RequestMapping("/campus")
@RestController
public class CampusController {

    @Autowired
    WorkRecordManager workRecordManager;

    @Autowired
    CampusManager campusManager;

    /**
     * 获取课程列表
     *
     * @return
     */
    @GetMapping("/courseList")
    public RpcServiceResult courseList(@RequestParam String userid){
        List<Course> courses = CourseUtil.list();
        Map<String, List<Course>> map = new HashMap<>();
        List<Course> myCourses = courses.stream().filter(course -> course.getTeacherUserid().equals(userid)).collect(Collectors.toList());
        List<Course> otherCourses = courses.stream().filter(course -> !course.getTeacherUserid().equals(userid)).collect(Collectors.toList());
        map.put("myCourses", myCourses);
        map.put("otherCourses", otherCourses);
        return RpcServiceResult.getSuccessResult(map);
    }

    /**
     *  同意/不同意换课
     *
     * @return
     */
    @GetMapping("/agree")
    public String agree(@RequestParam Integer type,@RequestParam String myCourseCode, @RequestParam String otherCourseCode) throws ApiException {
        List<Course> courses = CourseUtil.list();
        Course myCourse = courses.stream().filter(course -> course.getCourseCode().equals(myCourseCode)).findFirst().get();
        Course otherCourse = courses.stream().filter(course -> course.getCourseCode().equals(otherCourseCode)).findFirst().get();
        // 发通知
        String userid = myCourse.getTeacherUserid();
        String content = "**调课申请结果：**" + otherCourse.getTeacherName() + "";
        // 换课
        String result = "";
        if(type == 0){
            result = "已同意";
            CourseUtil.exchange(myCourse, otherCourse);
        }
        if(type == 1){
            result = "已拒绝";
        }
        content += result;
        List<OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList> btnJsonListList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList btnJsonList = new OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList();
        btnJsonList.setTitle("收到");
        btnJsonList.setActionUrl("http://abcdefg.vaiwan.com/confirm");//此处可替换成服务相关链接
        btnJsonListList.add(btnJsonList);
        OapiMessageCorpconversationAsyncsendV2Response rsp = campusManager.sendNotification(userid, "调课申请结果", content, btnJsonListList);
        return result;
    }

    /**
     * 发起换课申请
     *
     * @return
     */
    @PostMapping("/adjust")
    public RpcServiceResult courseList(@RequestBody Map paramMap) throws ApiException {
        String myCourseCode = paramMap.get("myCourseCode").toString();
        String otherCourseCode = paramMap.get("otherCourseCode").toString();
        List<Course> courses = CourseUtil.list();
        Course myCourse = courses.stream().filter(course -> course.getCourseCode().equals(myCourseCode)).findFirst().get();
        Course otherCourse = courses.stream().filter(course -> course.getCourseCode().equals(otherCourseCode)).findFirst().get();
        // 发通知
        List<OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList> btnJsonListList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList btnJsonList0 = new OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList();
        btnJsonList0.setTitle("同意");
        btnJsonList0.setActionUrl("http://abcdefg.vaiwan.com/campus/agree?type=0&myCourseCode=" + myCourseCode + "&otherCourseCode=" + otherCourseCode);
        OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList btnJsonList1 = new OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList();
        btnJsonList1.setTitle("拒绝");
        btnJsonList1.setActionUrl("http://abcdefg.vaiwan.com/campus/agree?type=1&myCourseCode=" + myCourseCode + "&otherCourseCode=" + otherCourseCode);
        btnJsonListList.add(btnJsonList0);
        btnJsonListList.add(btnJsonList1);
        String content = "#### " + myCourse.getTeacherName() + "老师申请换课：\n" +
                "##### 申请调换课程：" + myCourse.getTeacherName() + myCourse.getStartTime() + "~" + myCourse.getEndTime() + "的" + myCourse.getName() + "课\n" +
                "##### 被申请调换课程：" + otherCourse.getTeacherName() + otherCourse.getStartTime() + "~" + otherCourse.getEndTime() + "的" + otherCourse.getName() + "课\n" +
                "##### 随机串：" + RandomUtil.getRandomString(5);
        campusManager.sendNotification(otherCourse.getTeacherUserid(), "调课申请", content, btnJsonListList);
        return RpcServiceResult.getSuccessResult(courses);
    }

    /**
     * 获取部门列表
     *
     * @param deptId
     * @return
     * @throws ApiException
     */
    @GetMapping("/deptList")
    public RpcServiceResult deptList(@RequestParam("deptId") Long deptId) throws ApiException {
        if(deptId == 0L){
            deptId = null;
        }
        OapiEduDeptListResponse rsp = campusManager.deptList(1L, 30L, deptId);
        return RpcServiceResult.getSuccessResult(rsp);
    }

    /**
     * 获取老师
     *
     * @param classId
     * @return
     * @throws ApiException
     */
    @GetMapping("/classUserList")
    public RpcServiceResult getClassUserList(@RequestParam("classId") Long classId) throws ApiException {
        OapiEduUserListResponse rsp = campusManager.eduUserList(1L, 30L, "teacher" , classId);
        System.out.println(JSON.toJSONString(rsp));
        return RpcServiceResult.getSuccessResult(rsp);
    }


    /**
     * 发送消息
     *
     * @param paramMap
     * @return
     * @throws ApiException
     */
    @PostMapping("/sendMsg")
    public RpcServiceResult sendMsg(@RequestBody Map paramMap) throws ApiException {
        System.out.println(paramMap);
        String content = paramMap.get("text").toString();
        String title = paramMap.get("title").toString();
        Long classId = Long.parseLong(paramMap.get("classId").toString());
        String userList = JSON.toJSONString(paramMap.get("teacherList"));
        List<Map> list = JSONArray.parseArray(userList, Map.class);
        // 消息按钮
        List<OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList> btnJsonListList = new ArrayList<>();
        OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList btnJsonList = new OapiMessageCorpconversationAsyncsendV2Request.BtnJsonList();
        btnJsonList.setTitle("收到");
        btnJsonList.setActionUrl("http://abcdefg.vaiwan.com/confirm");//此处可替换成服务相关链接
        btnJsonListList.add(btnJsonList);
        list.forEach(e -> {
            String id = e.get("id").toString();
            String name = e.get("name").toString();
            try {
                campusManager.sendNotification(id, title,"### " + name + "老师，" + content, btnJsonListList);
            } catch (ApiException apiException) {
                apiException.printStackTrace();
            }
        });
        return RpcServiceResult.getSuccessResult(null);
    }


    /**
     * 新建待办
     */
    @PostMapping("/newWork")
    public RpcServiceResult newWork(@RequestBody Map paramMap) {
        try {
            // 待办时间
            Long createTime = TimeUtil.stringDateToTimestamp(paramMap.get("createTime").toString());
            // 待办标题
            String title = paramMap.get("title").toString();
            // 任务链接
            String url = paramMap.get("url").toString();
            // 表单标题
            String formTitle = paramMap.get("formTitle").toString();
            // 表单内容
            String formContent = paramMap.get("formContent").toString();
            // userid list
            String idStr = paramMap.get("ids").toString();
            idStr = idStr.substring(1, idStr.length() - 1);
            String[] ids = idStr.split(",");
            for (String id : ids) {
                // 通过角色id获取角色下的用户
                OapiWorkrecordAddRequest request = new OapiWorkrecordAddRequest();
                request.setUserid(id);
                request.setCreateTime(createTime);
                request.setTitle(title);
                request.setUrl(url);
                // 创建待办
                workRecordManager.newWork(request, formTitle, formContent);
            }
            return RpcServiceResult.getSuccessResult(null);
        }catch (Exception ex){
            return RpcServiceResult.getFailureResult("-1", "newLearnToDo Exception");
        }
    }

    /**
     * 更新待办
     *
     * @return
     * @throws ApiException
     */
    @PostMapping("/updateWork")
    public RpcServiceResult updateWork(@RequestBody Map<String, String> param) throws ApiException {
        String userId = param.get("userId");
        String bizId = param.get("bizId");
        return RpcServiceResult.getSuccessResult(workRecordManager.updateWork(userId, bizId));
    }

}
