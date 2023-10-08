import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { ActivityIndicator, ThemeProvider } from 'react-native-paper';
import { NativeBaseProvider, Box, extendTheme, Button, Card, Modal, VStack, HStack, Spinner, Heading} from "native-base";

const GpsView = () => {

    const theme = extendTheme({
        colors: {
          // Add new color
            primary: {    
            50: "#000080",
            100: "#f5fffa",
            200: "#000000",
            300: "#7AC1E4",
            400: "#47A9DA",
            500: "#0088CC",
            600: "#007AB8",
            700: "#006BA1",
            800: "#005885",
            900: "#003F5E"
          },
          // Redefining only one shade, rest of the color will remain same.
          amber: {
            400: "#d97706"
          }
        },
        config: {
          // Changing initialColorMode to 'dark'
          initialColorMode: "dark"
        }
      });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let coordx ;
  let coordy ;
  if (errorMsg) {
    let text = errorMsg;
    coordx = null;
    coordy = null;
  } else if (location) {
    coordx = location.coords.latitude;
    coordy = location.coords.longitude;
  }else{
    coordx = null;
    coordy = null;
  }

  const openCard = () => {
    setShowCard(true);
  };

  const closeCard = () => {
    setShowCard(false);
  };

  if (coordx !== null && coordy !== null && coordx !== "undefined") {
    return (
        <NativeBaseProvider theme={theme}>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: coordx,
                    longitude: coordy,
                    latitudeDelta: 2.0000,
                    longitudeDelta: 2.0000,
                }}
                followsUserLocation={true}
                >
                <Marker
                    coordinate={{ latitude: coordx, longitude: coordy }}
                    title="My location"
                    description="This is where you live"
                />
                </MapView>

                <Button bg="primary.50" onPress={openCard}>What's up with my water?</Button>

                <Modal isOpen={showCard} onClose={closeCard}>
                    <VStack p={4} space={2} bg="primary.100" style={{ borderRadius: 10, width: 200, height: 200}}>
                        
                        <Text>My water</Text>
                        <Text>Info</Text>
                        <Button bg="primary.200" onPress={closeCard}>Close</Button>
                    </VStack>
                </Modal>
            
        </NativeBaseProvider>
    );
  } else {
    return (
    <NativeBaseProvider>
      <Spinner color="primary.50" accessibilityLabel="Loading posts"/>
    </NativeBaseProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16, // Ajusta esto para la posición vertical deseada
    alignSelf: 'center', // Centra horizontalmente el botón
  },
  helpButton: {
    justifyContent: 'center',
    width: '100px',
    height: 'auto',
    backgroundColor: "#590D8C"
  },
});

export default GpsView;