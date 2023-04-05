import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import AddDog from './components/AddDog';
import DeleteAndEditDog from './components/DeleteAndEditDog';
import firebaseConfig from './FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';

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

const [testList, setTestList] = useState([]);

/*useEffect(() => {
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


console.log(testList)*/


  return (
    
    <View style={styles.container}>
      <ImageBackground
      source={require('./assets/Jetro_head.jpg')}
      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}/>
      <View style={{flex:1, marginTop:50}}>
        <AddDog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        testList={testList}
        setTestList={setTestList}
        />
      </View>    
      <View style={{flex:1}}>
      <DeleteAndEditDog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        testList={testList}
        setTestList={setTestList}
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
});