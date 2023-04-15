import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button, Input, ListItem, Icon } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import * as WebBrowser from 'expo-web-browser';
import MapView, {Marker} from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MAP_API_TOKEN} from '@env';
import EditDogDialog from './EditDogDialog';
import { ALERT_TYPE, Toast, AlertNotificationRoot, } from 'react-native-alert-notification';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, update,remove } from 'firebase/database';
import { database } from '../FirebaseConfig';
import styles from '../Styles'; 

//const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);

//const resultRef = ref(database,'testresults/')

export default function DeleteConfirmation(props){

    const {dogId, deleteConfirmationVisible, toggleConfirmation, resultList, setResultList} = props;
           
    const deleteDog =(id)=>{        
            const resultRef = ref(database, 'testresults/' + id)
            remove(resultRef)
            .then(() =>{    
                toggleConfirmation();                                 
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Dog deleted',
                    textBody: 'Dog deleted succesfully!',
                    autoClose: 2000,
                }); 
            })  
            .catch((error)=>{
                    toggleConfirmation();
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Dog not added',
                        textBody: `${error.code}`,
                        autoClose: 2000,
                    });
                    console.log(error); 
            })        
    };        

    

    return(
        <View>            
            <Dialog isVisible={deleteConfirmationVisible} onBackdropPress={toggleConfirmation} overlayStyle={styles.confirmationdialog}>
            <DialogTitle title="Are you sure you want to delete the dog?"/>                               
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
            onPress={()=> deleteDog(dogId)} 
            />
            </View>
            </Dialog>
        </View>
    )
};