package kr.co.automl.global.utils;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 프론트엔드(웹) 경로 요청 처리 담당
 */
@Controller
public class FrontendUrlRequestHandler {

    @GetMapping(value = { "/**" }) // 모든 경로에 대한 요청을 처리 / 나머지 경로에 대한 처리는 SecurityConfig에서 처리
    public String returnToIndexHtml() {
        return "forward:/index.html";
    }
}
