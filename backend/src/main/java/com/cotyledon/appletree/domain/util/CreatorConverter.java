package com.cotyledon.appletree.domain.util;

import com.cotyledon.appletree.domain.dto.Creator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class CreatorConverter implements AttributeConverter<Creator, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(Creator creator) {
        try {
            return objectMapper.writeValueAsString(creator);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Creator convertToEntityAttribute(String jsonCreator) {
        try {
            System.out.println("json creator" + jsonCreator);
            return objectMapper.readValue(jsonCreator, Creator.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
