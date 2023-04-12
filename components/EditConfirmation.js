import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Dialog, Button,Input } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue,remove, update } from 'firebase/database';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { database } from '../FirebaseConfig';
import styles from '../Styles';

const resultRef = ref(database, 'testresults/')

export default function EditConfirmation(props){

    const {testInformation, toggleDialog, dogId, editConfirmationVisible, toggleConfirmation} = props;
      
    const updateDog = (dogId, testInformation) =>{
        console.log(dogId)
        const resultRef = ref(database, 'testresults/' + dogId)
        update(resultRef, {testInformation})
        toggleConfirmation();
        toggleDialog()
    };      
    

    return(
        <View>            
            <Dialog isVisible={editConfirmationVisible} onBackdropPress={toggleConfirmation}>
            <DialogTitle title="Are you sure you want to update the dog's information?"/>                               
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
            onPress={()=>updateDog(dogId, testInformation)}
            />
            </View>
            </Dialog>
        </View>
    )
};
