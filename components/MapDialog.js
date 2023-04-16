import React, {useRef} from 'react';
import { View, } from 'react-native';
import { Dialog, Button,} from '@rneui/themed';
import { DialogTitle } from '@rneui/base/dist/Dialog/Dialog.Title';
import MapView, {Marker} from 'react-native-maps';
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