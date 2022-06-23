import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase'
import { TextInput } from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log('coucou')
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('coucou2')
      // Signed in 
      const user = userCredential.user;
      navigation.navigate("HomeScreen");
      // ...
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  return (
    <View>
      <Button title="Register" onPress={() => navigation.navigate("RegisterScreen")} />
      <Text>login</Text>
      <TextInput value={email} placeholder="Email" onChangeText={setEmail} />
      <TextInput value={password} placeholder="Password" onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}

export default Login