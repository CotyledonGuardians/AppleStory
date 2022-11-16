package com.cotyledon.mail.configuration;


import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.IOException;

@Configuration
public class FirebaseAuthConfiguration {

    @Value("${com.cotyledon.mail.firebase-service-account-secret}")
    private Resource serviceAccount;

    @Bean
    FirebaseAuth firebaseAuth() throws IOException {
        return FirebaseAuth.getInstance(FirebaseApp.initializeApp(FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
                .build()));
    }
}

