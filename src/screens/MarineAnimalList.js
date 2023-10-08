import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const MarineAnimalList = () => {
  const [marineAnimals, setMarineAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://marinebio.org/api/species')
      .then((response) => response.json())
      .then((data) => {
        setMarineAnimals(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : (
        <FlatList
          data={marineAnimals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MarineAnimalList;
