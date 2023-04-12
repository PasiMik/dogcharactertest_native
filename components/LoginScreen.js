import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { Button,Input } from '@rneui/themed';
import { Avatar } from '@rneui/themed';
import { auth } from '../FirebaseConfig';
import styles from '../Styles'; 
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
//mport { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

//const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);

export default function LoginScreen(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] =useState('');

    const navigation = useNavigation();

    useEffect(()=>{
        fetch('https://dog.ceo/api/breed/australian/images/random')
    .then(response=>response.json())
    .then(data=>{
        setImage(data.message)
        
    })
    .catch(err=>console.error(err))
    }, [])

    useEffect(()=> {
        auth.onAuthStateChanged(user =>{
            if(user){
                navigation.replace('Home')
            };
        });
    }, []);


    const handleSignUp = () =>{
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials =>{
           const user = userCredentials.user;
           console.log('Registered with',user.email) 
        })
        .catch(err => console.error(err))
    
        setEmail('');
        setPassword(''); 
    };

    const handleLogin = () =>{
        auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials =>{
           const user = userCredentials.user;
           console.log('Logged in with',user.email) 
        })
        .catch(err => console.error(err))
    
        setEmail('');
        setPassword(''); 
    };   


    return(      
          
        <KeyboardAvoidingView
        style={styles.logincontainer}
        behavior='padding'>            
            <View style={styles.inputContainer}>
                <View style={styles.avatar}>
                <Avatar
                rounded
                size={100}
                source={image ? { uri: image } : null}//if there is a image it will be shown, otherwise nothing
                />
                </View>
                <Input
                placeholder='Email'
                label='Email'
                value={email}
                onChangeText={text =>setEmail(text)}
                />
                <Input
                placeholder='Password'
                label='Password'
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                />
            </View>
            <View style={styles.inputButtons}>
                <Button
                title='Login'
                buttonStyle={styles.loginbutton}
                onPress={handleLogin}
                />
                <Button
                title='Register'
                buttonStyle ={styles.registerbutton}
                onPress={handleSignUp}
                />
            </View>
        </KeyboardAvoidingView>       

    )

};

