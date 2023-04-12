import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Dialog, Button,Input } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove } from 'firebase/database';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { database } from '../FirebaseConfig';
import styles from '../Styles';

const resultRef = ref(database, 'testresults/')

export default function AddConfirmation(props){

    const {testInformation, setTestInformation, toggleDialog, addConfirmationVisible, toggleConfirmation,} = props;

        const addDog = () =>{
            push(
                resultRef,
                {'testInformation': testInformation});
            toggleConfirmation();
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
    
    

    return(
        <View>            
            <Dialog isVisible={addConfirmationVisible} onBackdropPress={toggleConfirmation}>
            <DialogTitle title='Are you sure you want to add a new dog?'/>                               
            <View style={styles.bottombuttoncontainer}>
            <Button
                title = 'Cancel'
                buttonStyle={styles.cancelbutton}
                iconRight
                icon = {{
                    name: 'times',
                    type: 'font-awesome',
                    size: 15,
                    color: '#FFFFFF',
                }}
            onPress={toggleConfirmation}
            />
             <Button
                title='Yes'
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
            </Dialog>
        </View>
    )
};