import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace this with your actual authentication logic
    const user = fakeUsers.find(
      u => u.username === username && u.password === password,
    );
    if (user) {
      // Authentication successful, navigate to HomeScreen
      navigation.navigate('HomeScreen');
    } else {
      // Authentication failed, handle accordingly (show an error message, for example)
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};
