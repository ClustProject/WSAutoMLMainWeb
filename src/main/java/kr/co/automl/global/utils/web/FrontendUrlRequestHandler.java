package kr.co.automl.global.utils.web;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
public class FrontendUrlRequestHandler {

    @GetMapping(value = {
            "/dashboard",
            "/metadata/**",
            "/user/**"
    })
    public String returnToIndexHtml() {
        return "/index.html";
    }

}
