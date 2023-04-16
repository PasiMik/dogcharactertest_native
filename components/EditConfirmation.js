import React from 'react';
import {View,} from 'react-native';
import { Dialog, Button,} from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import { ALERT_TYPE, Toast,} from 'react-native-alert-notification';
import { ref, update } from 'firebase/database';
import { database } from '../FirebaseConfig';
import styles from '../Styles';

const resultRef = ref(database, 'testresults/')

export default function EditConfirmation(props){

    const {testInformation, toggleDialog, dogId, editConfirmationVisible, toggleConfirmation} = props;
      
    const updateDog = (dogId, testInformation) =>{
        const resultRef = ref(database, 'testresults/' + dogId)
        update(resultRef, {testInformation})        
        .then(() =>{    
            toggleConfirmation()
            toggleDialog()         
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Dog updated',
                    textBody: 'Dog updated succesfully!',
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
            <Dialog isVisible={editConfirmationVisible} onBackdropPress={toggleConfirmation} overlayStyle={styles.confirmationdialog}>
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
