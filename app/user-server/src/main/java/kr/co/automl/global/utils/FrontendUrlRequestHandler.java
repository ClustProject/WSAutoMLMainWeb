package kr.co.automl.global.utils;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendUrlRequestHandler {

    @GetMapping(value = {
            "/"
    })
    public String returnToIndexHtml() {
        return "/index.html";
    }
}
