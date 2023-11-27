package kr.co.automl.global.config.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger springdoc-ui 구성 파일
 */
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("WS-AutoML User API Document")
                .version("v0.0.1")
                .description("WS-AutoML 사용자 API 명세서입니다.");
        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
