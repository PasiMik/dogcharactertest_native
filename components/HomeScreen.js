import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import AddDog from './AddDog';
import DeleteAndEditDog from './DeleteAndEditDog';
import { auth } from '../FirebaseConfig';
import {useNavigation} from '@react-navigation/core';
import { Header, Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native';


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
    
    <View style={styles.container}>
      <ImageBackground
      source={require('../assets/Jetro_head.jpg')}
      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}/>
      <Header 
      leftComponent={
        <TouchableOpacity
              onPress={handleSignOut}>
              <Icon  type="simple-line-icon" name="logout" color="white"/>
              </TouchableOpacity>
      }
      centerComponent={{text:'Dog character app ', style:styles.header}} 
      backgroundColor='black'
      />
        <View style={{flex:1}}>
        <AddDog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        resultList={resultList}
        setResultList={setResultList}
        testDate={testDate}
        setTestDate={setTestDate}
        />
      </View>   
      <View style={{flex:10}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header:{
    fontSize:16,
    color:'#FFFFFF',
    backgroundColor:'#000000',
  },
});