package kr.co.automl.global.utils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/health-check")
    public Long healthCheck() {
        return System.currentTimeMillis();
    }
}
