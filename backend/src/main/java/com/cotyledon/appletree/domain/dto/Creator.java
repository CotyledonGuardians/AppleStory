package com.cotyledon.appletree.domain.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.List;

@Getter
@Setter
public class Creator {
    private String teamName;
    private String hostNickName;
    private List<MemberDTO> member;
}

@Converter
public class CreatorConverter implements AttributeConverter<Creator, String> {

    @Override
    public String convertToDatabaseColumn(Creator attribute) {
        return null;
    }

    @Override
    public Creator convertToEntityAttribute(String dbData) {
        return null;
    }
}