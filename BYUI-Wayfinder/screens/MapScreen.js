import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

// Set your Mapbox access token here
MapboxGL.setAccessToken('pk.eyJ1Ijoic2hhcmt0YXRvIiwiYSI6ImNtZGF3MjA1MzBueXgybW9pZGN2ZnptbHUifQ.Q1-o6C7ffwx9H9LKeBA_OQ');

export default function MapScreen({ navigation, route }) {
  const { startLocation, endLocation } = route.params || {};

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          centerCoordinate={startLocation ? [startLocation.longitude, startLocation.latitude] : [-111.7834, 43.8145]} // default to BYUI
          zoomLevel={15}
        />

        {startLocation && (
          <MapboxGL.PointAnnotation
            id="start"
            coordinate={[startLocation.longitude, startLocation.latitude]}
          />
        )}

        {endLocation && (
          <MapboxGL.PointAnnotation
            id="end"
            coordinate={[endLocation.longitude, endLocation.latitude]}
          />
        )}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
