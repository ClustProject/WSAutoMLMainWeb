package kr.co.automl.global.utils.web;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 프론트엔드(웹) 경로 요청 처리 담당
 */
@Controller
public class FrontendUrlRequestHandler {

    @GetMapping(value = {
            "/home",
            "/metadata/**",
    })
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public String returnToIndexHtml() {
        return "/index.html";
    }

    @GetMapping(value = {
            "/user-management/**"
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String returnToIndexHtmlOnlyAdmin() {
        return "/index.html";
    }
}
