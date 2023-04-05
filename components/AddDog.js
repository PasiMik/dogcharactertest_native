import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { Dialog } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import firebaseConfig from '../FirebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const resultRef = ref(database, 'testresults/')

export default function AddDog(props){
    const {testInformation, setTestInformation, testList, setTestList,} = props;
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
      
     
      console.log(testList)

      return(
        <View style={styles.container}>
            <View style={{flex:1, marginTop:50}}>
            <Button 
            title='ADD A NEW DOG'
            onPress={toggleDialog}/>
            </View>
            <View>
            <Dialog isVisible={visible} onBackdropPress={toggleDialog} >
                <View style={styles.dialog}>
                <DialogTitle title='Add a new dog'/>               
           <TextInput
                placeholder='Date'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.date}
                onChangeText={text =>setTestInformation({...testInformation, date:text})}
            />      
            <TextInput
                placeholder='Place'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.place}
                onChangeText={text =>setTestInformation({...testInformation, place:text})}
                        />
            <TextInput
                placeholder='Breed'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.breed}
                onChangeText={text =>setTestInformation({...testInformation, breed:text})}
            />
            <TextInput
                placeholder='Official name'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.offname}
                onChangeText={text =>setTestInformation({...testInformation, offname:text})}
                />
            <TextInput
                placeholder='Registration number'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.registration}
                onChangeText={text =>setTestInformation({...testInformation, registration:text})}
            />
            <TextInput
                placeholder='Capability to function'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.capability}
                onChangeText={text =>setTestInformation({...testInformation, capability:text})}
            />
            <TextInput
                placeholder='Tendency to aggressive behaviour'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.behaviour}
                onChangeText={text =>setTestInformation({...testInformation, behaviour:text})}
            />
            <TextInput
                placeholder='Desire for defence'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.defence}
                onChangeText={text =>setTestInformation({...testInformation, defence:text})}/>
            <TextInput
                placeholder='Desire to fight'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.fight}
                onChangeText={text =>setTestInformation({...testInformation, fight:text})}
            />
            <TextInput
                placeholder='Nerves'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.nerves}
                onChangeText={text =>setTestInformation({...testInformation, nerves:text})}
            />
            <TextInput
                placeholder='Temperamant'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.temperament}
                onChangeText={text =>setTestInformation({...testInformation, temperament:text})}
            />
            <TextInput
                placeholder='Mental hardness'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.hardness}
                onChangeText={text =>setTestInformation({...testInformation, hardness:text})}
            />
            <TextInput
                placeholder='Accessibility'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.accessibility}
                onChangeText={text =>setTestInformation({...testInformation, accessibility:text})}
            />
            <TextInput
                placeholder='Reaction to shots'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.shot}
                onChangeText={text =>setTestInformation({...testInformation, shot:text})}
            />
            <TextInput
                placeholder='Result'
                style={{width:220, borderColor: "gray", borderWidth:1, color:'white'}}
                value={testInformation.result}
                onChangeText={text =>setTestInformation({...testInformation, result:text})}/> 
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor:'silver' }}>
            <Button
            title='Cancel'
            onPress={toggleDialog}        
            />
            <Button
            title='ADD DOG'
            onPress={addDog}
            />
            </View>
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

    dialog:{
      backgroundColor: 'silver'  
    }
  });