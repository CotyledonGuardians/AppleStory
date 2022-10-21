import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

// interface ILocation {
//   latitude: number;
//   longitude: number;
// }

const Map = () => {
  const [location, setLocation] = useState({
    latitude: 36.355588,
    longitude: 127.372095,
  });
  console.log('FEFEF');
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        console.log('뜨냐?');
      },
      error => {
        console.log(1);
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MapView
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 10,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{latitude: 36.355588, longitude: 127.372095}}
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
