package com.cotyledon.appletree.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.*;

@Configuration
public class SecurityConfiguration {

    @Value("${com.cotyledon.appletree.firebase_project_id}")
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
            "/swagger-ui/**"
    };
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors().disable()
                .csrf().disable()

                .authorizeRequests(authorizeRequests -> authorizeRequests
                        .antMatchers(PERMIT_URL_ARRAY).permitAll()
                        .antMatchers(HttpMethod.GET, "/api/pass").permitAll()
//                        .antMatchers("/**/*").permitAll()
                        .anyRequest().hasAuthority(ROLE_USER))

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
