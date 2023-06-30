package kr.co.automl.global.utils;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 프론트엔드(웹) 경로 요청 처리 담당
 */
@Controller
public class FrontendUrlRequestHandler {
    @GetMapping(value = {
            "/",
            "/loginPage",
            "/search",
            "/metadata/**",
            "/model-learning",
            "/model-operation"
    })
    @PreAuthorize("permitAll")
    public String returnToIndexHtml() {
        return "forward:/index.html";
    }
}