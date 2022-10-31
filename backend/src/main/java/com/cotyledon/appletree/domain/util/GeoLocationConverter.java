package com.cotyledon.appletree.domain.util;

import com.cotyledon.appletree.domain.dto.GeoLocation;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class GeoLocationConverter implements AttributeConverter<GeoLocation, String> {

    @Override
    public String convertToDatabaseColumn(GeoLocation attribute) {
        return String.join(",", attribute.getLat().toString(), attribute.getLng().toString());
    }

    @Override
    public GeoLocation convertToEntityAttribute(String dbData) {
        String[] strings = dbData.split(",");
        return GeoLocation.builder().lat(Double.parseDouble(strings[0])).lng(Double.parseDouble(strings[1])).build();
    }
}
