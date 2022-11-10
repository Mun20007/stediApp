
import React, { useEffect,useState,useRef } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView , Share, ScrollView, Button} from 'react-native';
import { Card, CardTitle, CardContent} from 'react-native-material-cards';
import BarChart from 'react-native-bar-chart';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {camera} from 'expo-camera'
// import Share from 'react-native-share';

const Profile = (props) => {
  const [userName,setUseName] = useState("");
  const [cameraPermission, setCameraPermission] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(()=>{
    const getUserName = async ()=>{
        const cameraPermission = await camera.requestCameraPermissionsAsync();
        setCameraPermission(cameraPermission);
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);
    };
    getUserName();
  },[]);

  const myCustomerShare = async() =>{
    const shareOptions = {
      message: 'This is a test'
    }
    try{
      const shareResponse = await Share.share(shareOptions)
      console.log(shareResponse);
      }
      catch(error){
  console.log('Error', error)
      }
    }

  return (
    <SafeAreaView style={{flex: 1}}>
         <Card style={{backgroundColor:'white', borderRadius: 10, margin:20 ,width: 320, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4}}>
     <CardContent>
     <Image style={{height: 100, width:100, borderRadius: 75}}
      source={require('../image/me.jpg')} />
    <Text style={{marginTop:10,marginBottom:10,fontWeight: 'bold'}}>{userName}</Text>

    <Text style={{marginTop:20,marginBottom:2}}>This Week's progress</Text>
{/* <BarChart barColor='green' data={data} horizontalData={horizontalData} /> */}
     <View style={{ marginTop: 50 }}>
      <Button onPress={myCustomerShare} title="Share" />
    </View>
    </CardContent>
    </Card>
 </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  }
})
