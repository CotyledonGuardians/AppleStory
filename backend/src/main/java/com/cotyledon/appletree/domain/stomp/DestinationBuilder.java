package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.configuration.WebSocketConfiguration;

public class DestinationBuilder {

    public static String build(String... token) {
        return String.join("/",
                WebSocketConfiguration.BROKER_DESTINATION_PREFIX,
                String.join(".", token));
    }
}
