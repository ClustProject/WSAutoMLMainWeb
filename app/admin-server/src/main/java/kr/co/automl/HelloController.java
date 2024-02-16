package kr.co.automl;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("hello")
public class HelloController {

    @GetMapping
    public String hello() {
        return "Hello, WS-AutoML!";
    }
}
