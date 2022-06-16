package kr.co.automl.global.config;

import kr.co.automl.domain.user.User;
import kr.co.automl.domain.user.UserRepository;
import kr.co.automl.global.config.dto.OAuthAttributes;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

/**
 * 인증 완료 이후 작업들을 처리.
 */
@RequiredArgsConstructor
@Component
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final HttpSession httpSession;
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService()
                .loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();

        User user = saveOrUpdateUser(attributes);
        httpSession.setAttribute("user", user.toSessionUser());

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(user.getRoleName())),
                attributes,
                userRequest.getClientRegistration()
                        .getProviderDetails()
                        .getUserInfoEndpoint()
                        .getUserNameAttributeName()
        );
    }

    private User saveOrUpdateUser(Map<String, Object> attributes) {
        OAuthAttributes oAuthAttributes = createOAuthAttributes(attributes);

        User user = userRepository.findByEmail(oAuthAttributes.email())
                .orElse(User.of(oAuthAttributes));

        return userRepository.save(user);
    }

    private OAuthAttributes createOAuthAttributes(Map<String, Object> attributes) {
        String name = (String) attributes.get("name");
        String imageUrl = (String) attributes.get("picture");
        String email = (String) attributes.get("email");

        return new OAuthAttributes(name, imageUrl, email);
    }
}
