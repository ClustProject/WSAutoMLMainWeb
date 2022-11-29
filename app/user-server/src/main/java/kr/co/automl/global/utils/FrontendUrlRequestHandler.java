package kr.co.automl.global.utils;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 프론트엔드(웹) 경로 요청 처리 담당
 */
@Controller
public class FrontendUrlRequestHandler {

    @GetMapping(value = {
            "/"
    })
    public String returnToIndexHtml() {
        return "/index.html";
    }
}
