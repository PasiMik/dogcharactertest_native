import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button, Input, ListItem, Icon } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import * as WebBrowser from 'expo-web-browser';
import MapView, {Marker} from 'react-native-maps';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {MAP_API_TOKEN} from '@env';
import EditDogDialog from './EditDogDialog';
import DeleteConfirmation from './DeleteConfirmation';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, update,remove } from 'firebase/database';
import { database } from '../FirebaseConfig';
import styles from '../Styles'; 

//const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);

const resultRef = ref(database,'testresults/')


export default function DeleteAndEditDog(props) {
    const {testInformation, setTestInformation, resultList, setResultList, testDate, setTestDate,} = props;
    const [visible, setVisible] =useState(false);
    const [dogId, setDogId] = useState('');
    const [registerNumber, setRegisterNumber] = useState('');
    const [place, setPlace] =useState('');
    const [mapDialogVisible, setMapDialogVisible] = useState(false)
    const [foundPlace, setFoundPlace]=useState({
        latitude: 60.17116,
        longitude: 24.93265,
        place:'Helsinki',
        latitudeDelta: 1,
        longitudeDelta: 1,
    });
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =useState(false);  


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

    const toggleConfirmation =()=>{
        setDeleteConfirmationVisible(!deleteConfirmationVisible);
    };

    const handleWebBrowser = async(registerNumber)=>{
        await WebBrowser.openBrowserAsync(`https://jalostus.kennelliitto.fi/frmKoira.aspx?RekNo=${registerNumber}&R=342`);        
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

    const getDogId = (item) =>{
        setDogId(item.testInformation.id)
    };
        console.log(dogId)
        console.log(testInformation)  
  

    const mapRef =useRef();

    const findPlace=(place)=>{
        fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${MAP_API_TOKEN}&location=${place}`)
        .then(response => response.json())
        .then(data=>{
            setFoundPlace({
                latitude: data.results[0].locations[0].displayLatLng.lat,
                longitude:data.results[0].locations[0].displayLatLng.lng,
                place: data.results[0].locations[0].adminArea5,
                latitudeDelta: 1,
                longitudeDelta: 1,
            })     
            })
        .catch(err => console.error(err))
    };

    const openMapDialog =(place)=>{
        setMapDialogVisible(true);
        findPlace(place);    
    };  
    
    const closeMapDialog =()=>{
        setMapDialogVisible(false);
        setPlace('');       
    };

    console.log(resultList)

  return(    
  <View style={styles.editdeletecontainer}>
    <View>
        <FlatList
        data={resultList}    
        renderItem={({item}) => 
                <ListItem
                bottomDivider
                containerStyle={styles.listitemcontainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={styles.listitem}>Registration number: <Text style={styles.pressabletext}onPress={()=>{handleWebBrowser(item.testInformation.registration)}}>{item.testInformation.registration}</Text></ListItem.Title>
                        <ListItem.Title style={styles.listitem}>Official name: {item.testInformation.offname}</ListItem.Title>
                        <ListItem.Title style={styles.listitem}>Breed: {item.testInformation.breed}</ListItem.Title>
                        <ListItem.Title style={styles.listitem}>Date: {item.testInformation.date}</ListItem.Title>
                        <ListItem.Title style={styles.listitem}>Place: <Text style={styles.pressabletext} onPress={()=>openMapDialog(item.testInformation.place)}>{item.testInformation.place}</Text></ListItem.Title>
                        <ListItem.Subtitle style={styles.listitem}>Capability to function: {item.testInformation.capability}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Tendency to aggressive behaviour: {item.testInformation.behaviour}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Desire to defence: {item.testInformation.defence}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Desire to fight: {item.testInformation.fight}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Nerves: {item.testInformation.nerves}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Temperament:{item.testInformation.temperament}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Mental hardness: {item.testInformation.hardness}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Accessibility: {item.testInformation.accessibility}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Reaction to shots: {item.testInformation.shot}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.listitem}>Result:{item.testInformation.result}</ListItem.Subtitle>
                        <View style={styles.firstendbutton}>
                        <View style={styles.secondendbutton} />
                        <Button
                        title='Edit'
                        buttonStyle={styles.editbuttoninlist}
                        iconRight
                        icon = {{
                            name: 'pencil',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        onPress={()=> {toggleDialog(); populateEdit(item)}}        
                        />
                        <Button
                        title='Delete'
                        buttonStyle={styles.deletebutton}
                        iconRight
                        icon = {{
                            name: 'trash',
                            type: 'font-awesome-5',
                            size: 15,
                            color: 'white',
                        }}
                        onPress={()=> {toggleConfirmation(); getDogId(item)}}       
                        />
                        </View>        
                    </ListItem.Content>
                </ListItem>}
        />
  </View>
  <View>
        <EditDogDialog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        resultList={resultList}
        setResultList={setResultList}
        testDate={testDate}
        setTestDate={setTestDate}
        visible={visible}
        setVisible={setVisible}
        toggleDialog={toggleDialog}
        dogId={dogId}
        setDogId={setDogId}
        />    
  </View>
  <View>
    <DeleteConfirmation
    deleteConfirmationVisible={deleteConfirmationVisible}
    toggleConfirmation={toggleConfirmation}
    dogId={dogId}

    />
  </View>
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
  </View>
  )
}
