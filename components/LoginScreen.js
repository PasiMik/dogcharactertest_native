import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Text, View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Button,Input } from '@rneui/themed';
import { Avatar } from '@rneui/themed';
import { auth } from '../FirebaseConfig';
import styles from '../Styles';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, } from 'react-native-alert-notification';


export default function LoginScreen(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] =useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError]= useState('');

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
        if(email.match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm)){
            if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)){
                auth
                .createUserWithEmailAndPassword(email,password)
                .then(userCredentials =>{
                    const user = userCredentials.user;
                })
                .catch(err => console.error(err))
    
                setEmail('');
                setPassword('');
                setEmailError('');
                setPasswordError('');
            }else {
                setPasswordError('Not strong enough password!')
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Not strong enough password',
                    textBody: 'The password should contain one capital letter, one small letter, one number, and one special character!',                    
                })

            };
        }else{
            setEmailError('This is not a valid email');
            
        }    
    };    

    const handleLogin = () =>{
        auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials =>{
           const user = userCredentials.user;
        })
        .catch(error => {
            console.log(error);
            if(error.code==='auth/invalid-email'){
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Wrong email',
                    textBody: "Email doesn't exist!",
                    
                });
                setEmail('');
            }
            else if(error.code==='auth/wrong-password'){
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Wrong password',
                    textBody: 'The password is invalid',                    
                });
            }
            else if(error.code==='auth/missing-password'){
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Missing password',
                    textBody: 'Please enter your password!',                    
                });
            }
            else {
                console.error(error);
            };
        }             
        );
    
        setPassword('');
        setEmailError(''); 
    }; 
    
    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailError('');
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordError('');
    }

    const forgetPassword = () => {
        auth
        .sendPasswordResetEmail(email)
        .then(() =>{
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Password reset',
                textBody: 'Password reset email sent!',
            });     
        })
        .catch((error) => {
            if(error.code === 'auth/missing-email'){
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Missing email',
                    textBody: 'Please enter your email in the email field!',
                });   
            };
        })
    };        



    return(      
        <AlertNotificationRoot>
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
                errorMessage ={`${emailError}`}
                onChangeText={handleEmailChange}
                />
                <Input
                placeholder='Password'
                label='Password'
                secureTextEntry={true}
                value={password}
                errorMessage ={`${passwordError}`}
                onChangeText={handlePasswordChange}
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
            <View style={styles.forgetcontainer}>
            <TouchableOpacity
            onPress={()=>{forgetPassword()}}>            
                <Text style={styles.forgettext}>Forgot password?</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>       
    </AlertNotificationRoot> 
    )
};

