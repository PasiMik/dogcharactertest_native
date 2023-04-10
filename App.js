import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';

const Stack = createNativeStackNavigator();


export default function App(){

    return (
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Login' options={{headerShown:false,}} component={LoginScreen} />        
        <Stack.Screen name='Home' options={{headerShown:false,}}component={HomeScreen} />
        </Stack.Navigator>
        </NavigationContainer>
        );
        

};


