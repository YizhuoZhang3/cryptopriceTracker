import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}) {
  const [userName, setUserName] = useState('');

  const handlePress = () => {
    if (!userName.trim()) {
      alert('Please Enter an User Name');
      return;
    }

    if(userName){
      AsyncStorage.setItem('username', userName);
      setUserName('');
    }
    navigation.navigate('Home');
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
      <TextInput
          placeholder="username"
          value={userName}
          onChangeText={text => setUserName(text)}
          style={styles.input}
          required
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handlePress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '60%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LoginScreen;