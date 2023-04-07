import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button, Input, ListItem } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import firebaseConfig from '../FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, update,remove } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const resultRef = ref(database,'testresults/')

export default function DeleteAndEditDog(props) {
const {testInformation, setTestInformation, resultList, setResultList,} = props;
const [visible, setVisible] =useState(false);
const [dogId, setDogId] = useState('');

useEffect(() => {
    onValue(resultRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    let list = Object.values(data)
    console.log(list)
    list.forEach((item, index) => {
      item.testInformation.id = Object.keys(data)[index]
    })
    console.log(list)
    setResultList(list);
    })
    }, []);

    
    const toggleDialog =()=>{
      setVisible(!visible);   
    };

    const populateEdit = (item) =>{
      setDogId(item.testInformation.id);      
      setTestInformation({
        date:item.testInformation.date, 
        place:item.testInformation.place,
        breed:item.testInformation.breed,
        offname:item.testInformation.offname,
        registration:item.testInformation.registration,
        capability:item.testInformation.capability,
        behaviour:item.testInformation.behaviour,
        defence:item.testInformation.defence,
        fight:item.testInformation.fight,
        nerves:item.testInformation.nerves,
        temperament:item.testInformation.temperament,
        hardness:item.testInformation.hardness,
        accessibility:item.testInformation.accessibility,
        shot:item.testInformation.shot,
        result:item.testInformation.result,
      })
    };

    console.log(dogId)
    console.log(testInformation)

    const updateDog = (dogId, testInformation) =>{
      console.log(dogId)
      const resultRef = ref(database, 'testresults/' + dogId)
      update(resultRef, {testInformation})
      setTestInformation({  
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
      toggleDialog();
    };
  
  
    const deleteDog =(id)=>{
      const resultRef = ref(database, 'testresults/' + id)
      remove(resultRef);
  
    };
  
  
  console.log(resultList)

  return(
  <View style={styles.container}>    
  <View style={{ width:400, backgroundColor: "rgba(0, 0, 0, 0)" }}>
    <FlatList
    data={resultList}    
    renderItem={({item}) => 
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>Registration number: <Text style={{color:'blue'}}>{item.testInformation.registration}</Text></ListItem.Title>
        <ListItem.Title>Official name: {item.testInformation.offname}</ListItem.Title>
        <ListItem.Title>Breed: {item.testInformation.breed}</ListItem.Title>
        <ListItem.Title>Date: {item.testInformation.date}</ListItem.Title>
        <ListItem.Title>Place: {item.testInformation.place}</ListItem.Title>
        <ListItem.Subtitle>Capability to function: {item.testInformation.capability}</ListItem.Subtitle>
        <ListItem.Subtitle>Tendency to aggressive behaviour: {item.testInformation.behaviour}</ListItem.Subtitle>
        <ListItem.Subtitle>Desire to defence: {item.testInformation.defence}</ListItem.Subtitle>
        <ListItem.Subtitle>Desire to fight: {item.testInformation.fight}</ListItem.Subtitle>
        <ListItem.Subtitle>Nerves: {item.testInformation.nerves}</ListItem.Subtitle>
        <ListItem.Subtitle>Temperament:{item.testInformation.temperament}</ListItem.Subtitle>
        <ListItem.Subtitle>Mental hardness: {item.testInformation.hardness}</ListItem.Subtitle>
        <ListItem.Subtitle>Accessibility: {item.testInformation.accessibility}</ListItem.Subtitle>
        <ListItem.Subtitle>Reaction to shots: {item.testInformation.shot}</ListItem.Subtitle>
        <ListItem.Subtitle>Result:{item.testInformation.result}</ListItem.Subtitle>
        <ListItem.Subtitle style={{color:'orange'}} onPress={()=> {toggleDialog(); populateEdit(item)}}>Edit</ListItem.Subtitle>
        <ListItem.Subtitle style={{color:'red'}} onPress={()=> deleteDog(item.testInformation.id)}>Delete</ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>}
    />
  </View>
  <View>
            <Dialog isVisible={visible} onBackdropPress={toggleDialog} >
            <ScrollView style={styles.scrollview}>
                <View>
                <DialogTitle title='Edit the dog'/>               
           <Input
                placeholder='Date'
                label="Form"
                labelStyle={{fontSize:20}}
                value={testInformation.date}
                onChangeText={text =>setTestInformation({...testInformation, date:text})}
            />      
            <Input
                placeholder='Place'
                value={testInformation.place}
                onChangeText={text =>setTestInformation({...testInformation, place:text})}
                        />
            <Input
                placeholder='Breed'
                value={testInformation.breed}
                onChangeText={text =>setTestInformation({...testInformation, breed:text})}
            />
            <Input
                placeholder='Official name'
                value={testInformation.offname}
                onChangeText={text =>setTestInformation({...testInformation, offname:text})}
                />
            <Input
                placeholder='Registration number'
                value={testInformation.registration}
                onChangeText={text =>setTestInformation({...testInformation, registration:text})}
            />
            <Input
                placeholder='Capability to function'
                value={testInformation.capability}
                onChangeText={text =>setTestInformation({...testInformation, capability:text})}
            />
            <Input
                placeholder='Tendency to aggressive behaviour'
                value={testInformation.behaviour}
                onChangeText={text =>setTestInformation({...testInformation, behaviour:text})}
            />
            <Input
                placeholder='Desire for defence'
                value={testInformation.defence}
                onChangeText={text =>setTestInformation({...testInformation, defence:text})}/>
            <Input
                placeholder='Desire to fight'
                value={testInformation.fight}
                onChangeText={text =>setTestInformation({...testInformation, fight:text})}
            />
            <Input
                placeholder='Nerves'
                value={testInformation.nerves}
                onChangeText={text =>setTestInformation({...testInformation, nerves:text})}
            />
            <Input
                placeholder='Temperamant'
                value={testInformation.temperament}
                onChangeText={text =>setTestInformation({...testInformation, temperament:text})}
            />
            <Input
                placeholder='Mental hardness'
                value={testInformation.hardness}
                onChangeText={text =>setTestInformation({...testInformation, hardness:text})}
            />
            <Input
                placeholder='Accessibility'
                value={testInformation.accessibility}
                onChangeText={text =>setTestInformation({...testInformation, accessibility:text})}
            />
            <Input
                placeholder='Reaction to shots'
                value={testInformation.shot}
                onChangeText={text =>setTestInformation({...testInformation, shot:text})}
            />
            <Input
                placeholder='Result'
                value={testInformation.result}
                onChangeText={text =>setTestInformation({...testInformation, result:text})}/> 
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
            title='Cancel'
            buttonStyle={styles.cancelbutton}
            iconRight
            icon = {{
                name: 'times',
                type: 'font-awesome',
                size: 15,
                color: 'white',
            }}
            onPress={toggleDialog}        
            />
            <Button
            title='EDIT DOG'
            buttonStyle={styles.editbutton}
            iconRight
            icon = {{
                name: 'pencil',
                type: 'font-awesome',
                size: 15,
                color: 'white',
            }}
            onPress={()=>updateDog(dogId, testInformation)}
            />
            </View>
            </ScrollView>
            </Dialog>
            </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    scrollview:{
      backgroundColor: '#E5E4E2', 
      marginHorizontal:-20,
      marginVertical:-20,
    },
    addbuttoncontainer:{
        flex:1,
        marginTop:20,
    },
    addbutton:{
        backgroundColor:'green',    
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
    },
    cancelbutton:{
        backgroundColor:'orange',    
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
    },
    editbutton:{
      backgroundColor:'gold',    
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
  },
  });