package kr.co.automl.global.utils.web;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendUrlRequestHandler {

    @GetMapping(value = {
            "/dashboard",
            "/metadata/**",
    })
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public String returnToIndexHtml() {
        return "/index.html";
    }

    @GetMapping(value = {
            "/user/**"
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String returnToIndexHtmlOnlyAdmin() {
        return "/index.html";
    }
}
