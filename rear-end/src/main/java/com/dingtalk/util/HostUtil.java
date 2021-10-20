package com.dingtalk.util;

import org.springframework.stereotype.Component;

@Component
public class HostUtil {

    public static String getOriginUrlParam(String origin) {
        return "origin=" + origin;
    }

    public static String getUrlSymbol(String url){
        return url.contains("?") ? "&" : "?";
    }
}
