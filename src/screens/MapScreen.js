import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { ActivityIndicator, ThemeProvider } from 'react-native-paper';
import { NativeBaseProvider, Box, extendTheme, Button, Modal, VStack,  Container,
  Header,
  Content,
  CardItem,
  Card,
  Text,
  Heading,
  Body,} from "native-base";


const GpsView = () => {

    const theme = extendTheme({
        colors: {
          // Add new color
            primary: {    
            50: "#00bfff",

          }
        },
        config: {
          // Changing initialColorMode to 'dark'
          initialColorMode: "dark"
        }
      });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);


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
    setModalVisible(true);
  };
  

  const closeCard = () => {
    setModalVisible(false);
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

                <Button bg="primary.50" onPress={openCard}>
                  <Heading style={{color: 'white'}}>
                  What's up with my water?
                  </Heading>
                </Button>

                <Modal isOpen={isModalVisible} onClose={closeCard}>
                  <Modal.Content maxWidth="100%">
                    <Modal.Header>
                      <Heading style={{color: '#00bfff'}}>
                      What's up with my water?
                        </Heading>
                    </Modal.Header>
                    <Modal.Body>

                      <Heading size="md" style={{paddingTop: 10, color: '#696969'}}>Where does it come from?</Heading>
                      <Text>Colorado River</Text>

                      <Heading  size="md" style={{paddingTop: 10, color: '#696969'}}>What's up with the quality?</Heading>
                      <Text>For human consumption</Text>

                      <Heading  size="md" style={{paddingTop: 10, color: '#696969'}}>Can I swim today?</Heading>
                      <Text>There's no swimming places at this area</Text>

                      <Heading  size="md" style={{paddingTop: 10, color: '#696969'}}>What about marine species?</Heading>
                      <Box style={{alignItems: 'center', paddingTop: 10}}>
                        <Image source={require('../../assets/whale.jpg')} style={{width: 240, height: 200}} />
                        <Heading size="xs" style={{color: '#696969'}}>Vaquit  a Porpoise (Phocoena sinus)</Heading>
                        <Text style={{color: '#ff0000'}}>Critically endangered</Text>

                        <Image source={require('../../assets/laudturtle.jpg')} style={{width: 240, height: 240}} />
                        <Heading size="xs" style={{color: '#696969'}}>Leatherback Sea Turtle (Dermochelys coriacea)</Heading>
                        <Text  style={{color: '#ff0000'}}>Critically endangered</Text>

                        <Image source={require('../../assets/greenturtle.jpeg')} style={{width: 240, height: 240}} />
                        <Heading size="xs" style={{color: '#696969'}}>Green Sea Turtle(Chelonia mydas)</Heading>
                        <Text  style={{color: '#ff0000'}}>Critically endangered</Text>

                        <Image source={require('../../assets/totoaba.jpg')} style={{width: 240, height: 240}} />
                        <Heading size="xs" style={{color: '#696969'}}>Totoaba (Totoaba macdonaldi)</Heading>
                        <Text  style={{color: '#ff0000'}}>Critically endangered</Text>

                        <Image source={require('../../assets/bluewhale.jpg')} style={{width: 240, height: 240}} />
                        <Heading size="xs" style={{color: '#696969'}}git >Blue Whale (Balaenoptera musculus)</Heading>
                        <Text  style={{color: '#ff0000'}}>Critically endangered</Text>
                      </Box>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onPress={closeCard}>Close</Button>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>

            
        </NativeBaseProvider>
    );
  } else {
    return (
    <NativeBaseProvider>
      <Box style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color='black'/>
        <Text style={styles.loadingText}>Loading...</Text>
      </Box>   
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