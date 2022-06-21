package kr.co.automl;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    @GetMapping(value = {
            "/dashboard",
            "/metadata/**",
            "/user/**"
    })
    public String getIndex() {
        return "/index.html";
    }

}
