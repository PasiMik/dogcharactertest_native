import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button, Input, ListItem, Icon } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
//import * as WebBrowser from 'expo-web-browser';
import MapView, {Marker} from 'react-native-maps';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import {MAP_API_TOKEN} from '@env';
//import EditDogDialog from './EditDogDialog';
//import DeleteConfirmation from './DeleteConfirmation';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
//import { getDatabase, push, ref, onValue, update,remove } from 'firebase/database';
//import { database } from '../FirebaseConfig';
import styles from '../Styles'; 

export default function MapDialog(props){

    const {foundPlace, mapDialogVisible, closeMapDialog,} = props;

    const mapRef =useRef();
    
return(
    <View>
        <Dialog isVisible={mapDialogVisible} onBackdropPress={closeMapDialog} overlayStyle={styles.mapdialog}>
            <DialogTitle title='Place of test'/>
                <View style={styles.mapview}>
                    <MapView 
                    ref={mapRef}
                    style={styles.mapsize}
                    region={foundPlace}>
                        <Marker
                            coordinate={{
                            latitude: Number(foundPlace.latitude),
                            longitude: Number(foundPlace.longitude)
                            }}
                            title={foundPlace.place}/>
                    </MapView>                    
                </View>
                <View style ={styles.closebuttoncontainer}  >
                    <Button 
                    buttonStyle={styles.closebutton}
                    title='Close'
                    iconRight
                    icon = {{
                    name: 'times',
                    type: 'font-awesome',
                    size: 15,
                    color: '#FFFFFF',
                    }} 
                    onPress={closeMapDialog} />
                </View>
            </Dialog>
    </View>        

)

};