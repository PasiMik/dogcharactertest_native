import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button,Input } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import firebaseConfig from '../FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const resultRef = ref(database, 'testresults/')

export default function AddDog(props){
    const {testInformation, setTestInformation, resultList, setResultList,} = props;
    const [visible, setVisible] =useState(false);

    const addDog = () =>{
        push(
            resultRef,
            {'testInformation': testInformation});
        toggleDialog();        
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
      };

      const toggleDialog =()=>{
        setVisible(!visible);
      };
      
     
      //console.log(testList)

      return(
        <View style={styles.container}>
            <View style={styles.addbuttoncontainer}>
            <Button 
            title='ADD A NEW DOG'
            buttonStyle={styles.addbutton}
            iconRight
            icon = {{
                name: 'dog',
                type: 'font-awesome-5',
                size: 15,
                color: 'white',
            }}
            onPress={toggleDialog}/>
            </View>
             <View>
            <Dialog isVisible={visible} onBackdropPress={toggleDialog} >
                <ScrollView style={styles.scrollview}>
                <View>
                <DialogTitle title='Add a new dog'/>               
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
            title='SAVE'
            buttonStyle={styles.addbutton}
            iconRight
            icon = {{
                name: 'check',
                type: 'font-awesome',
                size: 15,
                color: 'white',
            }}
            onPress={addDog}
            />
            </View>
            </ScrollView>
            </Dialog>
            </View> 
        </View>
      )
      

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
     
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
  });