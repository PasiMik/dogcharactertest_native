import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button,Input } from '@rneui/themed';
//import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
//import { getDatabase, push, ref, onValue,remove } from 'firebase/database';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import { database } from '../FirebaseConfig';
import styles from '../Styles';
import AddDogDialog from './AddDogDialog';
//import AddConfirmation from './AddConfirmation'; 


//const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);

//const resultRef = ref(database, 'testresults/')

export default function AddDog(props){
    const {testInformation, setTestInformation, testDate, setTestDate} = props;
    const [visible, setVisible] = useState(false);
    

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

     
      //console.log(testList)

      return(
        <View style={styles.adddogcontainer}>
            <View>
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
            <AddDogDialog
            testInformation={testInformation}
            setTestInformation={setTestInformation}
            testDate={testDate}
            setTestDate={setTestDate}
            visible={visible}
            toggleDialog={toggleDialog}
            />
            </View>
        </View>
      ) 
};

