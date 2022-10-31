package com.cotyledon.appletree.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    public static final String BROKER_DESTINATION_PREFIX = "/topic";
    public static final String APPLICATION_DESTINATION_PREFIX = "/app";
    public static final String ENDPOINT_PATH = "/api/websocket";

    private final ChannelInterceptor channelInterceptor;

    @Value("${spring.rabbitmq.host}")
    private String host;
    @Value("${com.cotyledon.appletree.rabbitmq.stomp-port}")
    private Integer port;
    @Value("${spring.rabbitmq.username}")
    private String login;
    @Value("${spring.rabbitmq.password}")
    private String passcode;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(ENDPOINT_PATH).setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setPathMatcher(new AntPathMatcher("."));
        registry.setApplicationDestinationPrefixes(APPLICATION_DESTINATION_PREFIX);
        registry.enableStompBrokerRelay(BROKER_DESTINATION_PREFIX)
                .setRelayHost(host)
                .setRelayPort(port)
                .setClientLogin(login)
                .setClientPasscode(passcode)
                .setSystemLogin(login)
                .setSystemPasscode(passcode);
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(channelInterceptor);
    }
}
