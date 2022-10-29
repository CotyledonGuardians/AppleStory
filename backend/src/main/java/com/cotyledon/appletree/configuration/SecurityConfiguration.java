package com.cotyledon.appletree.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.*;

import static org.springframework.http.HttpMethod.*;

@Configuration
public class SecurityConfiguration {

    @Value("${com.cotyledon.appletree.firebase-project-id}")
    private String firebaseProjectId;
    private final List<String> EMPTY_LIST = Collections.emptyList();
    private final String ROLE_USER = "ROLE_USER";
    private final Collection<GrantedAuthority> USER_AUTHORITY = Set.of(new SimpleGrantedAuthority(ROLE_USER));
    private final Collection<GrantedAuthority> NO_AUTHORITY = Collections.emptySet();
    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            /* websocket */
            WebSocketConfiguration.ENDPOINT_PATH + "/**/*"
    };
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors().disable()
                .csrf().disable()

                .authorizeRequests(authorizeRequests -> authorizeRequests
                        // 화이트리스트에서 블랙리스트로 바꿨음
                        // OPTIONS 허용하지 않을 시 preflight 거부되어 아무것도 못함
                        // .antMatchers("/**/*").permitAll()
                        .antMatchers(GET, PERMIT_URL_ARRAY).permitAll()
                        .antMatchers(POST, PERMIT_URL_ARRAY).permitAll()
                        .antMatchers(PUT, PERMIT_URL_ARRAY).permitAll()
                        .antMatchers(DELETE, PERMIT_URL_ARRAY).permitAll()
                        .antMatchers(GET).hasAuthority(ROLE_USER)
                        .antMatchers(POST).hasAuthority(ROLE_USER)
                        .antMatchers(PUT).hasAuthority(ROLE_USER)
                        .antMatchers(DELETE).hasAuthority(ROLE_USER)
                        .anyRequest().permitAll())

                .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(converter())))

                .build();
    }

    private JwtAuthenticationConverter converter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> Optional.ofNullable(jwt.getAudience())
                .orElse(EMPTY_LIST).contains(firebaseProjectId) ? USER_AUTHORITY : NO_AUTHORITY);

        return converter;
    }
}
