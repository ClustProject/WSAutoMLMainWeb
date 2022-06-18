package kr.co.automl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "index.html";
    }

}
