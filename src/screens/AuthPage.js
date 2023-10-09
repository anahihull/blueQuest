import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Button, NativeBaseProvider} from 'native-base';

const ipAddress = "https://mjrdbqqw-5000.usw3.devtunnels.ms/";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigation = useNavigation();

  const authenticateUser = async () => {
    let loginJson; 
    let registerJson; 

    if (!username || !password) {
      console.log("no user or password")
    }
    const userData = {
        username: username,
        password: password,
    };

    if (isLogin) {
      try{
        const data = await fetch(ipAddress+"login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        loginJson = await data.json();
      }catch(err){
        console.log("error"  + err);
      }
      if (loginJson["message"] == "user found") {
        navigation.navigate("Main", { screen: "Home" });
      } else if (loginJson["message"] == "user not found") {
        Alert.alert('Failed', 'User not found');
      } else if (loginJson["message"] == "incorrect password") {
        Alert.alert('Failed', 'Incorrect password');
      }
    } else {
      try{
        const data = await fetch(ipAddress+"register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        registerJson = await data.json();
        console.log(registerJson);
      }catch(err){
        console.log("error"  + err);
      }
      if (registerJson["message"] == "user registered") {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate("Main", { screen: "Home" });
      }
    }
  };

  return (
    <NativeBaseProvider>

    <View style={styles.container}>

        <Image
          source={require('../../assets/logo.png')} // Replace with the path to your logo
          style={styles.logo}
        />

      <TextInput 
        placeholder="Username" 
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput 
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

        <Button 
          onPress={authenticateUser}
          bg="#3498db"
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
        </Button>



      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </Text>
    </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#87cefa',
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    color: '#FFFFFF'
  },
  buttonText:{
    color: "#FFFFFF"
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 8,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'center'
  },
  toggleText: {
    marginTop: 20,
    color: 'white',
  },
});

export default AuthPage;
