package com.cotyledon.mail.domain.util;

import com.cotyledon.mail.domain.dto.Content;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class ContentConverter implements AttributeConverter<Content, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Content attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Content convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, Content.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}

