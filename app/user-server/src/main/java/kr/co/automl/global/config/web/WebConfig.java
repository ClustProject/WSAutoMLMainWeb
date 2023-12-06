package kr.co.automl.global.config.web;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ShallowEtagHeaderFilter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final LoginUserArgumentResolver loginUserArgumentResolver;

    /**
     * 메서드 인자에서 처리할 리졸버를 추가합니다.
     */
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(loginUserArgumentResolver);
    }

    /**
     * 구글 로그인 과정에서의 CORS 문제를 해결합니다.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청 경로에 대해
                .allowedOrigins("https://admin.wsautoml.com")
                .allowedMethods("*") // 모든 HTTP 메소드
                .allowedHeaders("*") // 허용할 헤더
                .allowCredentials(true);
    }

    /**
     * Polling with Conditional Requests : 서버의 데이터가 변경될 때만 실제 데이터를 가져오는 방식
     * 서버의 응답에 ETag 헤더를 자동으로 포함시킵니다.
     */
    @Bean
    public ShallowEtagHeaderFilter shallowEtagHeaderFilter() {
        return new ShallowEtagHeaderFilter();
    }
}
