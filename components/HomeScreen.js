import React, {useState,} from 'react';
import {ImageBackground, Text, View,} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AddDog from './AddDog';
import DeleteAndEditDog from './DeleteAndEditDog';
import { auth } from '../FirebaseConfig';
import {useNavigation} from '@react-navigation/core';
import { Header, Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, } from 'react-native-alert-notification';
import styles from '../Styles'; 

export default function HomeScreen() {

  const [testInformation, setTestInformation]= useState({
  date:'', 
  place:'',
  breed:'',
  offname:'',
  registration:'',
  capability:'',
  behaviour:'',
  defence:'',
  fight:'',
  nerves:'',
  temperament:'',
  hardness:'',
  accessibility:'',
  shot:'',
  result:'',
});

const [testDate, setTestDate]= useState(new Date());

const navigation = useNavigation();

const handleSignOut = () =>{
    auth.signOut()
    .then(()=> {
        navigation.replace('Login')
    })
    .catch(err =>console.error(err))
};

const changePassword = () => {
  const userEmail = auth.currentUser.email;
  auth
  .sendPasswordResetEmail(userEmail)
  .then(() =>{
      Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Password reset',
          textBody: 'Password reset email sent!',
      })     
  })
  .catch((error) => {
      console.log(error.code)              
  })
};  

const openInformation= async() => {
  await WebBrowser.openBrowserAsync('https://www.kennelliitto.fi/kasvatus-ja-terveys/koiran-luonne-ja-kayttaytyminen/luonnetesti');
};

  return (
    <AlertNotificationRoot>
    <View style={styles.homecontainer}>
      <ImageBackground
      source={require('../assets/Jetro_head.jpg')}
      style={styles.backgroundimage}/>
      <Header 
      backgroundColor='#000000'
      leftComponent={
        <View style={styles.headerleftcomponent}>
          <TouchableOpacity
              onPress={handleSignOut}>
              <Icon  type="simple-line-icon" name="logout" color="#FFFFFF"/>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={changePassword}
              style={styles.resetbutton}>
              <Icon  type="font-awesome" name="key" color="#FFFFFF"/>
          </TouchableOpacity>
              
        </View>      
      }

      centerComponent={
        <View>
          <Text style={styles.firstheadercenter}>Dog character test app</Text>
          <Text style={styles.secondheadercenter}>User: {auth.currentUser?.email}</Text>
        </View>
      }
      rightComponent={
        <TouchableOpacity
              style={styles.headerrightbutton}
              onPress={openInformation}>
              <Icon  type="font-awesome" name="info-circle" color="#FFFFFF"/>
              </TouchableOpacity>
      }/>
        <View style={styles.addposition}>
        <AddDog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        testDate={testDate}
        setTestDate={setTestDate}
        />
      </View>   
      <View style={styles.deleteeditposition}>
      <DeleteAndEditDog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        testDate={testDate}
        setTestDate={setTestDate}
        />
      </View>      
      </View>
      </AlertNotificationRoot>
  );
};

