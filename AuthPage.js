import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticateUser = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password cannot be empty');
      return;
    }

    // Example: Simple client-side authentication logic
    if (isLogin) {
      // Insert login logic here, e.g., API call to your server to validate credentials
      if (username === 'user' && password === 'pass') {
        Alert.alert('Success', 'Logged in successfully');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } else {
      // Insert register logic here, e.g., API call to your server to create a new user account
      Alert.alert('Success', 'Account created successfully');
      setIsLogin(true);
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
