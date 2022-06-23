import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/Home"
import Login from "./src/Login"
import Register from "./src/Register"

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">  
            <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: true }}/>
            <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: true }}/>
            <Stack.Screen name="RegisterScreen" component={Register} options={{ headerShown: true }}/>
        </Stack.Navigator>
    )
}

export default Navigation