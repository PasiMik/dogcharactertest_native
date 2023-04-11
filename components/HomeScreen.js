import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
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




  return (
    
    <View style={styles.homecontainer}>
      <ImageBackground
      source={require('../assets/Jetro_head.jpg')}
      style={styles.backgroundimage}/>
      <Header 
      leftComponent={
        <TouchableOpacity
              onPress={handleSignOut}>
              <Icon  type="simple-line-icon" name="logout" color="#FFFFFF"/>
              </TouchableOpacity>
      }
      centerComponent={{text:'Dog character app ', style:styles.header,}} 
      backgroundColor='#000000'
      />
        <View style={styles.addposition}>
        <AddDog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        resultList={resultList}
        setResultList={setResultList}
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

