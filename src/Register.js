import { View, Text } from 'react-native'
import { auth } from '../Firebase'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Register = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log('coucou')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigation.navigate("HomeScreen");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error)
      });
  }
  return (
    <View>
      <Text>Register</Text>
      <TextInput value={email} placeholder="Email" onChangeText={setEmail} />
      <TextInput value={password} placeholder="Password" onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  )
}

export default Register