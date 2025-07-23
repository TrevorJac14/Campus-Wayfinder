import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Sample campus buildings with lat/lng
const buildings = [
  { label: 'Select a building...', value: null },
  { label: 'Library', value: { latitude: 43.8185, longitude: -111.7834 } },
  { label: 'Science Hall', value: { latitude: 43.8197, longitude: -111.7860 } },
  { label: 'Student Center', value: { latitude: 43.8170, longitude: -111.7845 } },
  // Add more buildings here as needed
];

export default function HomeScreen({ navigation }) {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  const onGenerateRoute = () => {
    if (!startLocation || !endLocation) {
      Alert.alert('Please select both start and end locations.');
      return;
    }
    navigation.navigate('Map', { startLocation, endLocation });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Start Location:</Text>
      <Picker
        selectedValue={startLocation}
        onValueChange={(itemValue) => setStartLocation(itemValue)}
        style={styles.picker}
      >
        {buildings.map((b) => (
          <Picker.Item key={b.label} label={b.label} value={b.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Select End Location:</Text>
      <Picker
        selectedValue={endLocation}
        onValueChange={(itemValue) => setEndLocation(itemValue)}
        style={styles.picker}
      >
        {buildings.map((b) => (
          <Picker.Item key={b.label} label={b.label} value={b.value} />
        ))}
      </Picker>

      <Button title="Generate Route" onPress={onGenerateRoute} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  picker: { marginBottom: 20 },
});
