import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  const navigateToAquaticGame = () => {
    navigation.navigate('CleanOcean');
  };

  const navigateToWaterConservationGame = () => {
    navigation.navigate('Faucet');
  };

  const MyCard = ({ title, content }) => {
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          {content}
        </Text>
      </Card>
    );
  };

  const data = [
    {
      title: 'Lesson 1: Seas of Plastic',
      content: ' Oceanic waters are being inundated with millions of tons of plastic waste annually, posing a threat to marine life and ecosystems. Adopting responsible consumption habits and enhancing waste management systems is imperative to shield our seas.'
    },
    {
      title: 'Lesson 2: Ocean Acidification',
      content: 'The ocean absorption of CO2 is altering its pH, negatively impacting marine organisms, especially those reliant on calcification like corals and mollusks. It is vital to mitigate greenhouse gas emissions to safeguard marine biodiversity.'
    },
    {
      title: 'Lesson 3: The Significance of Marine Protected Areas',
      content: 'Establishing and maintaining Marine Protected Areas (MPAs) is vital for preserving marine ecosystems and the species that inhabit them. These zones serve as safe havens for biodiversity and help sustain fish populations, benefiting fishing communities as well.'
    },
    {
      title: 'Lesson 4: Overflow of Contaminants into the Ocean',
      content: 'Oil spills, agricultural fertilizer runoff, and other pollutants regularly enter the ocean, causing long-term damage to marine fauna and flora. Implementing cleaner industrial and agricultural practices is vital to curtail ocean pollution.'
    },
    {
      title: 'Lesson 5: Overfishing: An Ocean on the Brink of Depletion',
      content: 'Overexploitation of fishing resources threatens the sustainability of oceanic ecosystems and the food security of millions of people. Adopting sustainable fishing practices and strict regulations is essential for preserving marine species.'
    },
    {
      title: 'Lesson 6: The Crucial Role of Mangroves',
      content: 'Mangroves play a pivotal role in protecting coastlines, nurturing fish populations, and sequestering carbon, providing vital services to both marine ecosystems and human communities. Protecting and rehabilitating mangrove forests is key to maintaining these benefits and supporting healthy oceans.'
    }
  ];

  const CardList = ({ data }) => {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        {data.map((item, index) => (
          <MyCard
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>Minigames:</Text>
        </View>
        <TouchableOpacity style={styles.roundButton} onPress={navigateToAquaticGame}>
          <Text style={styles.buttonText}>Start Aquatic Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButton} onPress={navigateToWaterConservationGame}>
          <Text style={styles.buttonText}>Start Water Conservation Game</Text>
        </TouchableOpacity>
        <View style={styles.remindersContainer}>
          <CardList data={data} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  subtitleContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roundButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Adjust the value to control the roundness
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  remindersContainer: {
    marginTop: 20,
    padding: 10,
  },
});

export default HomeScreen;
