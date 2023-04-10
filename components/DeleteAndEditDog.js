import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Dialog, Button, Input, ListItem, Icon } from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import * as WebBrowser from 'expo-web-browser';
import MapView, {Marker} from 'react-native-maps';
import {MAP_API_TOKEN} from '@env';
//import firebaseConfig from '../FirebaseConfig';
//import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, update,remove } from 'firebase/database';
import { database } from '../FirebaseConfig';

//const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);

const resultRef = ref(database,'testresults/')


export default function DeleteAndEditDog(props) {
const {testInformation, setTestInformation, resultList, setResultList, testDate, setTestDate,} = props;
const [visible, setVisible] =useState(false);
const [dogId, setDogId] = useState('');
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);
const [registerNumber, setRegisterNumber] = useState('');
const [place, setPlace] =useState('');
const [dialogVisible, setDialogVisible] = useState(false)
const[foundPlace, setFoundPlace]=useState({
  latitude: 60.17116,
  longitude: 24.93265,
  place:'Helsinki',
  latitudeDelta: 1,
  longitudeDelta: 1,
});


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

    console.log(dogId)
    console.log(testInformation)

    const updateDog = (dogId, testInformation) =>{
      console.log(dogId)
      const resultRef = ref(database, 'testresults/' + dogId)
      update(resultRef, {testInformation})
      toggleDialog();
    };
  
  
    const deleteDog =(id)=>{
      const resultRef = ref(database, 'testresults/' + id)
      remove(resultRef);
  
    };

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

  const openDialog =(place)=>{
    setDialogVisible(true);
    findPlace(place);
    
};
  
  
  const closeDialog =()=>{
      setDialogVisible(false);
      setPlace('');  
      
  };

  
  
  
  console.log(resultList)

  return(    
  <View style={styles.container}>
  <View>
    <Text>{registerNumber}</Text>
    <FlatList
    data={resultList}    
    renderItem={({item}) => 
    <ListItem
    bottomDivider
    containerStyle={{backgroundColor:'transparent', width:400,}}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.listitem}>Registration number: <Text style={{color: '#FFAA33'}}onPress={()=>{handleWebBrowser(item.testInformation.registration)}}>{item.testInformation.registration}</Text></ListItem.Title>
        <ListItem.Title style={styles.listitem}>Official name: {item.testInformation.offname}</ListItem.Title>
        <ListItem.Title style={styles.listitem}>Breed: {item.testInformation.breed}</ListItem.Title>
        <ListItem.Title style={styles.listitem}>Date: {item.testInformation.date}</ListItem.Title>
        <ListItem.Title style={styles.listitem}>Place: <Text style={{color:'#FFAA33'}} onPress={()=>openDialog(item.testInformation.place)}>{item.testInformation.place}</Text></ListItem.Title>
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
        <View style={{flex:1, flexDirection:'row', justifyContent: 'flex-end'}}>
        <View style={{flex: 1}} />
        <Button
        title='Edit'
        buttonStyle={[styles.editbutton, {marginHorizontal: 5}]}
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
        buttonStyle={[styles.deletebutton, {marginHorizontal: 5}]}
        iconRight
        icon = {{
            name: 'trash',
            type: 'font-awesome-5',
            size: 15,
            color: 'white',
        }}
        onPress={()=> deleteDog(item.testInformation.id)}       
        />
        </View>        
    </ListItem.Content>
    </ListItem>}
    />
  </View>
  <View>
            <Dialog isVisible={visible} onBackdropPress={toggleDialog} >
            <ScrollView style={styles.scrollview}>
                <View>
                <DialogTitle title='Edit the dog'/>
                <View style={{flexDirection:'row', marginRight:55}}>                
           <Input
                placeholder='Date'
                label='Date'
                labelStyle={{fontSize:20}}
                value={testInformation.date}
                onChangeText={text =>setTestInformation({...testInformation, date:text})}
            /> 
             <View style={{alignContent:'flex-start', width:50,}}>
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
                label="Result"
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
            {show && (
        <DateTimePicker
             value={testDate}
             mode={mode}
             onChange={onChange}
        />
        )}
         <View>
            <Dialog isVisible={dialogVisible} onBackdropPress={closeDialog} overlayStyle={{backgroundColor:'#E5E4E2', height:'60%', }}>
                <DialogTitle title='Place of test'/>
                <View style={styles.mapview}>
                <MapView 
                ref={mapRef}
                style={{width:'100%', height:'100%'}}
                region={foundPlace}>
                <Marker
                coordinate={{
                latitude: Number(foundPlace.latitude),
                longitude: Number(foundPlace.longitude)
                }}
                title={foundPlace.place}/>
            </MapView>                    
                </View>
                <View style ={{flexDirection: 'row', justifyContent: 'center',}}  >
                <Button 
                buttonStyle={styles.closebutton}
                title='Close'
                iconRight
                icon = {{
                  name: 'times',
                  type: 'font-awesome',
                  size: 15,
                  color: 'white',
              }} 
                onPress={closeDialog} />
                </View>
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
        backgroundColor:'#32CD32',    
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
    },
    cancelbutton:{
        backgroundColor:'#FFA500',    
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
    },
    editbutton:{
      backgroundColor:'#FFD700',    
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
  },
  deletebutton:{
    backgroundColor:'#FF2400',    
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  closebutton:{
    backgroundColor:'#FFA500',    
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
    alignItems: 'center',
    marginTop:5,
    justifyContent:'center',
  },
  listitem:{
    color:'#0F52BA',
  },
  mapview:{
    height:'85%',
  },
  mapsize:{

  }

  });