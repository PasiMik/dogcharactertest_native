import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import AddDog from './components/AddDog';
import DeleteAndEditDog from './components/DeleteAndEditDog';
import firebaseConfig from './FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';
import { Header} from '@rneui/themed';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

ref(database,'testresults/')


export default function App() {
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



  return (
    
    <View style={styles.container}>
      <ImageBackground
      source={require('./assets/Jetro_head.jpg')}
      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}/>
      <Header 
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
    color:'white'
  },
});