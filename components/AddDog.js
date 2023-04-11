import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button,Input } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';
import { database } from '../FirebaseConfig';
import styles from '../Styles'; 


//const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);

const resultRef = ref(database, 'testresults/')

export default function AddDog(props){
    const {testInformation, setTestInformation, resultList, setResultList, testDate, setTestDate} = props;
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

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

    const onChange = (e, selectedDate)=>{
        const currentDate = selectedDate
        setShow(false);
        setTestDate(currentDate)
        setTestInformation({...testInformation, date: currentDate.toLocaleDateString()});
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
    const showDatepicker = () => {
        showMode('date');
      };
      
     
      //console.log(testList)

      return(
        <View style={styles.adddogcontainer}>
            <View style={styles.addbuttoncontainer}>
            <Button 
            title='ADD A NEW DOG'
            buttonStyle={styles.addbutton}
            iconRight
            icon = {{
                name: 'dog',
                type: 'font-awesome-5',
                size: 15,
                color: '#FFFFFF',
            }}
            onPress={toggleDialog}/>
            </View>
             <View>
            <Dialog isVisible={visible} onBackdropPress={toggleDialog} >
                <ScrollView style={styles.scrollview}>
                <View>
                <DialogTitle title='Add a new dog'/>
                <View style={styles.calendarbuttonposition}>               
           <Input
                placeholder='Date'
                label='Date'
                value={testInformation.date}
                onChangeText={text =>setTestInformation({...testInformation, date:text})}
            />
            <View style={styles.calendarbutton}>
            <Button
            iconRight
            icon = {{
                name: 'calendar',
                type: 'font-awesome',
                size: 15,
                color: 'white',
            }}
            onPress={showDatepicker}
            />
            </View>
            </View>      
            <Input
                placeholder='Place'
                label='Place'
                value={testInformation.place}
                onChangeText={text =>setTestInformation({...testInformation, place:text})}
            />
            <Input
                placeholder='Breed'
                label='Breed'
                value={testInformation.breed}
                onChangeText={text =>setTestInformation({...testInformation, breed:text})}
            />
            <Input
                placeholder='Official name'
                label='Official name'
                value={testInformation.offname}
                onChangeText={text =>setTestInformation({...testInformation, offname:text})}
                />
            <Input
                placeholder='Registration number'
                label='Registration number'
                value={testInformation.registration}
                onChangeText={text =>setTestInformation({...testInformation, registration:text})}
            />
            <Input
                placeholder='Capability to function'
                label='Capability to function'
                value={testInformation.capability}
                onChangeText={text =>setTestInformation({...testInformation, capability:text})}
            />
            <Input
                placeholder='Tendency to aggressive behaviour'
                label='Tendency to aggressive behaviour'
                value={testInformation.behaviour}
                onChangeText={text =>setTestInformation({...testInformation, behaviour:text})}
            />
            <Input
                placeholder='Desire for defence'
                label='Desire to defence'
                value={testInformation.defence}
                onChangeText={text =>setTestInformation({...testInformation, defence:text})}/>
            <Input
                placeholder='Desire to fight'
                label='Desire to fight'
                value={testInformation.fight}
                onChangeText={text =>setTestInformation({...testInformation, fight:text})}
            />
            <Input
                placeholder='Nerves'
                label='Nerves'
                value={testInformation.nerves}
                onChangeText={text =>setTestInformation({...testInformation, nerves:text})}
            />
            <Input
                placeholder='Temperamant'
                label='Temperament'
                value={testInformation.temperament}
                onChangeText={text =>setTestInformation({...testInformation, temperament:text})}
            />
            <Input
                placeholder='Mental hardness'
                label='Mental hardness'
                value={testInformation.hardness}
                onChangeText={text =>setTestInformation({...testInformation, hardness:text})}
            />
            <Input
                placeholder='Accessibility'
                label='Accessibility'
                value={testInformation.accessibility}
                onChangeText={text =>setTestInformation({...testInformation, accessibility:text})}
            />
            <Input
                placeholder='Reaction to shots'
                label='Reaction to shots'
                value={testInformation.shot}
                onChangeText={text =>setTestInformation({...testInformation, shot:text})}
            />
            <Input
                placeholder='Result'
                label='Result'
                value={testInformation.result}
                onChangeText={text =>setTestInformation({...testInformation, result:text})}/> 
            </View>
            <View style={styles.bottombuttoncontainer}>
            <Button
            title='Cancel'
            buttonStyle={styles.cancelbutton}
            iconRight
            icon = {{
                name: 'times',
                type: 'font-awesome',
                size: 15,
                color: '#FFFFFF',
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
                color: '#FFFFFF',
            }}
            onPress={addDog}
            />
            </View>
            </ScrollView>
            </Dialog>
            </View>
            {show && (
        <DateTimePicker
             value={testDate}
             mode={mode}
             onChange={onChange}
        />
        )} 
        </View>
      ) 
};

