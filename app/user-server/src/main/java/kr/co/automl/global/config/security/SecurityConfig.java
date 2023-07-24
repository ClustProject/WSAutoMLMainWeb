package kr.co.automl.global.config.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().ignoringAntMatchers("/h2-console/**").disable()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/health-check").permitAll() // health check 302 error 제거
                .antMatchers("/loginPage").permitAll() // 로그인 페이지는 모든 사용자가 접근 가능
                .antMatchers("/login/oauth2/code/google").permitAll()
                .antMatchers("/**").access("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
                .anyRequest().authenticated() // 나머지 페이지는 인증된 사용자만 접근 가능
                .and()
                .exceptionHandling().accessDeniedPage("/loginPage") // 권한이 없는 사용자가 접근을 시도했을 때 리다이렉트될 페이지
                .and()
                .oauth2Login()
                .loginPage("/loginPage")
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .failureHandler((request, response, exception) -> {
                    response.sendRedirect("/loginPage");
                }) // 로그인 실패 시 리다이렉트될 페이지
                .defaultSuccessUrl("/");
        // .defaultSuccessUrl("http://localhost:3000"); // local settings
    }
}
