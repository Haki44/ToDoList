import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Navigation from './Navigation';
import Task from './src/components/Task';

export default function App() {
  return (
    <NavigationContainer>
      <Navigation /> 
    </NavigationContainer>
  )
};
