import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    logincontainer: {//login styling
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D3D3D3',
    },
    inputContainer:{
        width:'80%',      
    },
    inputButtons:{
        width:'50%',
    },
    loginbutton:{
        backgroundColor:'#DA70D6',
        borderWidth: 0,
        borderRadius: 30,
        marginBottom:10
    },
    registerbutton:{
        backgroundColor:'#5D3FD3',
        borderWidth: 0,
        borderRadius: 30,
    },
    avatar:{
        alignItems:'center',
        marginBottom:25,
    },
    forgetcontainer:{
        marginTop:20,
    },
    forgettext:{
        color:'#5D3FD3',
        fontWeight: 'bold', 
    },

    homecontainer: {//home styling
        flex: 1,
        alignItems: 'center',
    },
    headerleftcomponent:{
        flexDirection:'row',
    },
    resetbutton:{
        marginLeft:25,
    },
    firstheadercenter:{
        fontSize:16,
        color:'#FFFFFF',
        backgroundColor:'#000000',
    },
    secondheadercenter:{
        fontSize:10,
        color:'#FFFFFF',
        backgroundColor:'#000000',
    },
    headerrightbutton:{
       alignSelf:'center',                  
    },
    backgroundimage:{
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0
    },
    addposition:{
        flex:1,
    },
    deleteeditposition:{
        flex:10,
    },

    adddogcontainer: {//Add components' styling
        flex: 1,    
        justifyContent:'center',
        alignContent:'center',     
    },
    scrollview:{
        backgroundColor: '#E5E4E2', 
        marginHorizontal:-20,
        marginVertical:-20,
    },
    addbutton:{
          backgroundColor:'#32CD32',    
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
    },
    calendarbuttonposition:{
          flexDirection:'row', 
          marginRight:55,
    },
    calendarbutton:{
          alignContent:'flex-start', 
          width:50,
    },
    cancelbutton:{
          backgroundColor:'#FFA500',    
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
    },
    bottombuttoncontainer:{
          flexDirection: 'row', 
          justifyContent: 'space-around',
    },

    editdeletecontainer: { //edit and delete components' styling
        flex: 1,
        alignItems: 'center',
    },
    emptydata:{
        color:'#FFFFFF',
        fontSize:20,
    },
    scrollview:{
        backgroundColor: '#E5E4E2', 
        marginHorizontal:-20,
        marginVertical:-20,
    },
    listitemcontainer:{
        backgroundColor:'transparent', 
        width:400,
    },
    pressabletext:{
        color: '#FFAA33',
    },
    firstendbutton:{
        flex:1, 
        flexDirection:'row', 
        justifyContent: 'flex-end',
        marginTop:5,
    },
    secondendbutton:{
        flex:1,
    },
    emailbuttonlist:{
        backgroundColor:'#6495ED',    
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        marginHorizontal: 5,
    },
    editbuttoninlist:{
        backgroundColor:'#FFD700',    
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        marginHorizontal: 5,
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
        marginHorizontal: 5,
    },
    closebuttoncontainer:{
        flexDirection: 'row', 
        justifyContent: 'center',
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
        color:'#40B5AD',
    },
    mapdialog:{
        backgroundColor:'#E5E4E2', 
        height:'60%', 
    },
    mapview:{
        height:'85%',
    },
    mapsize:{
        width:'100%', 
        height:'100%',
    },
});