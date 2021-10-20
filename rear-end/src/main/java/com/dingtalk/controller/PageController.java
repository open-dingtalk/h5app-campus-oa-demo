package com.dingtalk.controller;

import com.dingtalk.util.HostUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
public class PageController {

    @Autowired
    private HostUtil hostUtil;


    @GetMapping("/toWork")
    public String toWork(@RequestParam("bizId") String bizId, @RequestParam("origin") String origin){
        return "redirect:" + origin + "/index.html?bizId=" + bizId;
    }
}
