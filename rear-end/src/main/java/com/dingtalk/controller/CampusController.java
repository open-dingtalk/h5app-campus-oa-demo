package com.dingtalk.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dingtalk.api.request.OapiWorkrecordAddRequest;
import com.dingtalk.api.response.*;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.service.CampusManager;
import com.dingtalk.service.WorkRecordManager;
import com.dingtalk.util.TimeUtil;
import com.taobao.api.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequestMapping("/campus")
@RestController
public class CampusController {

    @Autowired
    WorkRecordManager workRecordManager;

    @Autowired
    CampusManager campusManager;

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
        list.forEach(e -> {
            String id = e.get("id").toString();
            String name = e.get("name").toString();
            try {
                campusManager.sendNotification(id, title,"### " + name + "老师，" + content);
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
