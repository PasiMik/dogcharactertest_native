import React, {useState, useEffect,} from 'react';
import {Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, ListItem, } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser';
import {MAP_API_TOKEN} from '@env';
import EditDogDialog from './EditDogDialog';
import DeleteConfirmation from './DeleteConfirmation';
import { ref, onValue,} from 'firebase/database';
import { database } from '../FirebaseConfig';
import styles from '../Styles'; 
import MapDialog from './MapDialog';
import { AlertNotificationRoot, } from 'react-native-alert-notification';
import * as MailComposer from 'expo-mail-composer';
import { SearchBar } from '@rneui/themed';

const resultRef = ref(database,'testresults/')


export default function DeleteAndEditDog(props) {
    const {testInformation, setTestInformation, testDate, setTestDate,} = props;
    const [visible, setVisible] =useState(false);
    const [dogId, setDogId] = useState('');
    const [mapDialogVisible, setMapDialogVisible] = useState(false)
    const [foundPlace, setFoundPlace]=useState({
        latitude: 60.17116,
        longitude: 24.93265,
        place:'Helsinki',
        latitudeDelta: 1,
        longitudeDelta: 1,
    });
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =useState(false);  
    const [resultList, setResultList] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [search, setSearch] = useState(false);
    
   
    

    useEffect(() => {
        
        onValue(resultRef, (snapshot) => {
        const data = snapshot.val();
        if(data===null){
           setResultList([]);
           setOriginalList([]);
           setSearch(false);
        }
        else{
        let list = Object.values(data)
        list.forEach((item, index) => {
            item.testInformation.id = Object.keys(data)[index]
        })
        setResultList(list);
        setOriginalList(list);
        }
        })
        }, []);

    const handleSearch = (query) => {
       
        setSearchQuery(query);
        if (query === '') {            
            setResultList(originalList)            
            return;
        }
        const filteredResults = resultList.filter((result) =>
            result.testInformation.offname
            .toLowerCase()
            .includes(query.toLowerCase())
        );

        if (filteredResults.length === 0) {
            setSearch(true);
            console.log('hei')
        } 
        setResultList(filteredResults);
        
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

    const toggleConfirmation =()=>{
        setDeleteConfirmationVisible(!deleteConfirmationVisible);
    };

    const getDogRegisterNumber = (item) =>{
        const registerNumber = item.testInformation.registration
        handleWebBrowser(registerNumber)
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

    const openMapDialog =(item)=>{
        const testPlace = item.testInformation.place;
        setMapDialogVisible(true);
        findPlace(testPlace);    
    };  
    
    const closeMapDialog =()=>{
        setMapDialogVisible(false);     
    };    

    const sendEmail = (item) => {
        const body =
        `Here are the character tests results,
            
        Registration number: 
        ${item.testInformation.registration}
                        
        Official name: 
        ${item.testInformation.offname}
                        
        Breed: 
        ${item.testInformation.breed}
                    
        Date: 
        ${item.testInformation.date}
                        
        Place: 
        ${item.testInformation.place}
                        
        Capability to function: 
        ${item.testInformation.capability}
                        
        Tendency to aggressive behaviour: 
        ${item.testInformation.behaviour}
                        
        Desire to defence: 
        ${item.testInformation.defence}
                        
        Desire to fight: 
        ${item.testInformation.fight}
                        
        Nerves: 
        ${item.testInformation.nerves}
                        
        Temperament: 
        ${item.testInformation.temperament}
                        
        Mental hardness: 
        ${item.testInformation.hardness}
                        
        Accessibility: 
        ${item.testInformation.accessibility}
                        
        Reaction to shots: 
        ${item.testInformation.shot}
                        
        Result: 
        ${item.testInformation.result}`

        MailComposer.composeAsync({
            subject:`${item.testInformation.registration} ${item.testInformation.offname} character test results`,
            body: body, 
        });
    };

  return(    
    <AlertNotificationRoot>
  <View style={styles.editdeletecontainer}>
    <View> 
     <View>  
    <SearchBar 
        placeholder = "Dog's official name" 
        round={true} containerStyle={styles.searchbarcontainer} 
        inputContainerStyle={styles.searchbarinput}
        value={searchQuery}
        onChangeText={handleSearch}
        />
     </View>      
        {resultList.length>0 && 
        <FlatList
        data={resultList}    
        renderItem={({item}) => 
            <ListItem
            bottomDivider
            containerStyle={styles.listitemcontainer}
            >
                <ListItem.Content>
                    <ListItem.Title style={styles.listitem}>Registration number: <Text onPress={()=>getDogRegisterNumber(item)} style={styles.pressabletext}>{item.testInformation.registration}</Text></ListItem.Title>
                    <ListItem.Title style={styles.listitem}>Official name: {item.testInformation.offname}</ListItem.Title>
                    <ListItem.Title style={styles.listitem}>Breed: {item.testInformation.breed}</ListItem.Title>
                    <ListItem.Title style={styles.listitem}>Date: {item.testInformation.date}</ListItem.Title>
                    <ListItem.Title style={styles.listitem}>Place: <Text onPress={()=>openMapDialog(item)}style={styles.pressabletext}>{item.testInformation.place}</Text></ListItem.Title>
                    <ListItem.Subtitle style={styles.listitem}>Capability to function: {item.testInformation.capability}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Tendency to aggressive behaviour: {item.testInformation.behaviour}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Desire to defence: {item.testInformation.defence}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Desire to fight: {item.testInformation.fight}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Nerves: {item.testInformation.nerves}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Temperament: {item.testInformation.temperament}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Mental hardness: {item.testInformation.hardness}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Accessibility: {item.testInformation.accessibility}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Reaction to shots: {item.testInformation.shot}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.listitem}>Result: {item.testInformation.result}</ListItem.Subtitle>
                        <View style={styles.firstendbutton}>
                            <View style={styles.secondendbutton} />
                                <Button
                                title='Send email'
                                buttonStyle={styles.emailbuttonlist}
                                iconRight
                                icon = {{
                                    name: 'envelope',
                                    type: 'font-awesome',
                                    size: 15,
                                    color: 'white',
                                }}
                                onPress={() => sendEmail(item)}        
                                />
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
        />}
        <View style={styles.datatextcontainer}>
        {resultList.length === 0 && !search && <Text style={styles.emptydata}>No test results in the database!</Text>}
        {resultList.length === 0 && search && <Text style={styles.emptydata}>No search results!</Text>}
        </View>
    </View>
    <View>
        <EditDogDialog
        testInformation={testInformation}
        setTestInformation={setTestInformation}
        testDate={testDate}
        setTestDate={setTestDate}
        visible={visible}
        toggleDialog={toggleDialog}
        dogId={dogId}
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
        <MapDialog
        foundPlace={foundPlace}
        mapDialogVisible={mapDialogVisible}
        closeMapDialog={closeMapDialog}
        />
    </View>            
</View>
</AlertNotificationRoot>
  )
};
