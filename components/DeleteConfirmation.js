import React from 'react';
import {View, } from 'react-native';
import { Dialog, Button,} from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import { ALERT_TYPE, Toast,} from 'react-native-alert-notification';
import { ref, remove } from 'firebase/database';
import { database } from '../FirebaseConfig';
import styles from '../Styles';

export default function DeleteConfirmation(props){

    const {dogId, deleteConfirmationVisible, toggleConfirmation,} = props;
           
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