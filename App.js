import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import AddDog from './components/AddDog';




export default function App() {
const [testInformation, setTestInformation]= useState({
  date:'', 
  place:'',
  breed:'',
  name:'',
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

const addDog = () =>{
  setTestList([...testList, testInformation])
  setTestInformation({  date:'', 
  date:'', 
  place:'',
  breed:'',
  name:'',
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
})
}

console.log(testList)


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
      <View>
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
            <Text style={{color:'white'}}>{item.date} {item.place} {item.breed} 
            {item.name} {item.registration} {item.capability} {item.behaviour} {item.defence} {item.fight}
            {item.nerves} {item.temperament} {item.hardness} {item.accessibility} {item.shot} {item.result}</Text>
          </View>
        )}
        />
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
