import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AddDog from './AddDog';
import DeleteAndEditDog from './DeleteAndEditDog';
import { auth } from '../FirebaseConfig';
import {useNavigation} from '@react-navigation/core';
import { Header, Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native';
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
const [resultList, setResultList] = useState([]);
const [testDate, setTestDate]= useState(new Date());

const navigation = useNavigation();

const handleSignOut = () =>{
    auth.signOut()
    .then(()=> {
        navigation.replace('Login')
    })
    .catch(err =>console.error(err))
};

const openInformation= async() => {
  await WebBrowser.openBrowserAsync('https://www.kennelliitto.fi/kasvatus-ja-terveys/koiran-luonne-ja-kayttaytyminen/luonnetesti');
};

  return (
    
    <View style={styles.homecontainer}>
      <ImageBackground
      source={require('../assets/Jetro_head.jpg')}
      style={styles.backgroundimage}/>
      <Header 
      backgroundColor='#000000'
      leftComponent={
        <TouchableOpacity
              onPress={handleSignOut}>
              <Icon  type="simple-line-icon" name="logout" color="#FFFFFF"/>
              </TouchableOpacity>
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
        resultList={resultList}
        setResultList={setResultList}
        testDate={testDate}
        setTestDate={setTestDate}
        />
      </View>      
      </View>
  );
}

