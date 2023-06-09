import React from 'react';
import {View, } from 'react-native';
import { Dialog, Button,} from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import { ALERT_TYPE, Toast,} from 'react-native-alert-notification';
import { push, ref, } from 'firebase/database';
import { database } from '../FirebaseConfig';
import styles from '../Styles';

const resultRef = ref(database, 'testresults/')

export default function AddConfirmation(props){

    const {testInformation, setTestInformation, toggleDialog, addConfirmationVisible, toggleConfirmation,} = props;

    const addDog = () =>{
        push(
            resultRef,
            {'testInformation': testInformation})
        .then(() =>{    
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
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Dog added',
                textBody: 'Dog added succesfully!',
                autoClose: 2000,
            }); 
         })
         .catch((error)=>{
            toggleConfirmation();
            toggleDialog(); 
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Dog not added',
                textBody: `${error.code}`,
                autoClose: 2000,
            }); 
         })        
      }; 

    return(
        
        <View>            
            <Dialog isVisible={addConfirmationVisible} onBackdropPress={toggleConfirmation} overlayStyle={styles.confirmationdialog}>
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
