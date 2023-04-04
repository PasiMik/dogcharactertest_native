import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import firebaseConfig from '../FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

ref(database,'testresults/')

export default function DeleteAndEditDog(props) {
const {testInformation, setTestInformation, testList, setTestList,} = props;

useEffect(() => {
    const itemsRef = ref(database, 'testresults/');
    onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    let list = Object.values(data)
    list.forEach((item, index) => {
      item.testInformation.id = Object.keys(data)[index]
    })
    setTestList(list);
    })
    }, []);
  
    const deleteDog =(id)=>{
      const itemsRef = ref(database, 'testresults/' + id)
      remove(itemsRef);
  
    };
  
  
  console.log(testList)

  return(
    <View style={styles.container}>
    <View style={{flex:2}}>
    {testList.length>0 &&
  <Text style={{color:'white'}}>Date Place Breed Official name Registration number Capability to function
  Tendency to aggressive behaviour Desire for defence Desire to fight Nerves Temperament Mental hardness
  Accessibility Reaction to shots Result
   </Text>}
  </View>
  <View style={{flex:1, flexDirection:'row'}}>
    <FlatList
    data={testList}
    renderItem={({item}) => (
      <View>
        <Text style={{color:'black'}}>{item.testInformation.date} {item.testInformation.place} {item.testInformation.breed} 
        {item.testInformation.name} {item.testInformation.registration} {item.testInformation.capability} {item.testInformation.behaviour} {item.testInformation.defence} {item.testInformation.fight}
        {item.testInformation.nerves} {item.testInformation.temperament} {item.testInformation.hardness} {item.testInformation.accessibility} {item.testInformation.shot} {item.testInformation.result}</Text>
      <Text style={{color:'red'}} onPress={()=> deleteDog(item.testInformation.id)}>Delete</Text>
      </View>
    )}
    />
  </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
  });
  