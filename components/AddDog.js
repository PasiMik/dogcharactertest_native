import React, {useState,} from 'react';
import {View,} from 'react-native';
import {Button,} from '@rneui/themed';
import styles from '../Styles';
import AddDogDialog from './AddDogDialog';

export default function AddDog(props){
    const {testInformation, setTestInformation, testDate, setTestDate} = props;
    const [visible, setVisible] = useState(false);
    

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
      
      return(
        <View style={styles.adddogcontainer}>
            <View>
            <Button 
            title='ADD A NEW DOG'
            buttonStyle={styles.addbutton}
            iconRight
            icon = {{
                name: 'dog',
                type: 'font-awesome-5',
                size: 15,
                color: '#FFFFFF',
            }}
            onPress={toggleDialog}/>
            </View> 
            <View>
            <AddDogDialog
            testInformation={testInformation}
            setTestInformation={setTestInformation}
            testDate={testDate}
            setTestDate={setTestDate}
            visible={visible}
            toggleDialog={toggleDialog}
            />
            </View>
        </View>
      ) 
};

