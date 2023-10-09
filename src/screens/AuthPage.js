import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ipAddress = "https://mjrdbqqw-5000.usw3.devtunnels.ms/";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigation = useNavigation();

  const authenticateUser = async () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Create Account'}</Text>

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
        title={isLogin ? 'Login' : 'Register'}
        onPress={authenticateUser}
      />

      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 8,
  },
  toggleText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default AuthPage;
