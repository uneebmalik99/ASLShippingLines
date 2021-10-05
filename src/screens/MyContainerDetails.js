import React,{useState,useEffect ,useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  PermissionsAndroid,
  Share,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Entypo from  'react-native-vector-icons/dist/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from  'react-native-vector-icons/dist/Feather'
import AntDesign from  'react-native-vector-icons/dist/AntDesign'
import { Icon} from 'react-native-elements'
import { Appbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import RBSheet from "react-native-raw-bottom-sheet";
import { Slider } from 'react-native-elements/dist/slider/Slider';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
// import {launchCamera, launchImageLibrary}  from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';




const dummyimages = [

 require('../Images/noimage3.jpeg') 
    
    
];

const MyContainerDetails = ({route, navigation }) => {


  const [vehicleDetails , setvehicleDetails] = useState([''])

  const { item   } = route.params;
  const [ export_details ,setexport_details] = useState()
  const [deletemodalshow ,setdeletemodalshow] =useState(false)
  const [add , setadd] = useState(true)
  const [imgposition, setimgposition] = useState(0)
  const [images , setimages] = useState([])
  const [showimagemodel ,setshowimagemodel] = useState(false)
  const[spinner , setspinner ] = useState(false)
  const [imagesurls ,setimagesurls ] = useState([])
  const [ images2 , setimages2] = useState([])

  





const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};

const chooseFile = async() => {
  ImagePicker.openPicker({
        multiple: true,
        compressImageQuality:0.7
      }).then(images1 => {
    
        var i ;
        for( i =0; i< images1.length; i++){

          let temp = {} ;
          temp.name = images1[i].filename;
          temp.size = images1[i].size;
          temp.type = images1[i].mime;
          temp.url = images1[i].path;

          images.push(temp)

      var value = new FormData();
      value.append('file',{uri:images1[i].path ,
           name:images1[i].filename,
           type:images1[i].mime
         });

         setspinner(true)

          fetch(AppUrlCollection.EXPORT_DETAIL + item.id +'/photos-upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
                'Accept': 'application/json'
            },
            body: value,
                       
        })
            .then((response) => response.json())
            .then((responseJson) => {
              // alert(JSON.stringify(responseJson))
              // console.log(responseJson.data);
              console.log(responseJson);
              imagesurls.push(responseJson.data)
              console.log('images urll is '+imagesurls);

              setspinner(false)
               
            })
            .catch((error) => {
              alert(error)
              setspinner(false)
                console.warn(error)
            });
       
        }      

      });



// const captureImage = async (type) => {
//     let options = {
//       mediaType: 'photo',
//       maxWidth: 300,
//       maxHeight: 550,
//       quality: 1,
//       videoQuality: 'low',
//       saveToPhotos: true,
//     };
//     let isCameraPermitted = await requestCameraPermission();
//     let isStoragePermitted = await requestExternalWritePermission();
//     if (isCameraPermitted && isStoragePermitted) {
//       launchImageLibrary(options, (response) => {
//         console.log('Response = ', response);
//         setspinner(true)
//         if (response.didCancel) {
//           alert('User cancelled camera picker');
//           return;
//         } else if (response.errorCode == 'camera_unavailable') {
//           alert('Camera not available on device');
//           return;
//         } else if (response.errorCode == 'permission') {
//           alert('Permission not satisfied');
//           return;
//         } else if (response.errorCode == 'others') {
//           alert(response.errorMessage);
//           return;
//         }

//       var value = new FormData();
//      value.append('file',{uri: response.assets[0].uri,
//       name:response.assets[0].uri,
//       type:response.assets[0].type
//     });
//     // alert(JSON.stringify(response.assets[0].fileName))
//     // alert(JSON.stringify(response.assets[0].type))
//     //  alert(JSON.stringify(response.assets[0].uri))


//      fetch(AppUrlCollection.EXPORT_DETAIL + item.id +'photos-upload', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
//         },
//         body: value,
        
       
//     })
//         .then((response) =>  response.json())
//         .then((responseJson) => {
//           alert(response)
//           alert(JSON.stringify(responseJson))
//           alert('jjj')
//     setspinner(false)
//             // console.log('export detail ', responseJson.data.export_details)
           
//         })
//         .catch((error) => {
//           alert(error)
//             console.warn(error)
//         });
   
  



// // alert(JSON.stringify(response.assets))


      
//         // setFilePath(response);
//       });
//     }
  // };




//   ImagePicker.openPicker({
//     multiple: true
//   }).then(images => {
//     console.log('----'+JSON.stringify(images));
//     // alert(JSON.stringify(images[0]))
//     for(var i=0; i < images.length; i++){
   
//       var value = new FormData();
//       value.append('file',images[i].sourceURL);
// alert(JSON.stringify(value))
    //   fetch(AppUrlCollection.EXPORT_DETAIL + item.id +'photos-upload', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
    //     },
    //     body: value,
        
       
    // })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       alert('ooo')
    //       alert(JSON.stringify(responseJson))
    
    // //         // console.log('export detail ', responseJson.data.export_details)
           
    //     })
    //     .catch((error) => {
    //       alert(error)
    //         console.warn(error)
    //     });
   
   // }



  // });
  
};



// const TakePhoto=()=>{
//   ImageCropPicker.openCamera({
//     width: 300,
//     height: 400,
//     cropping: false,
//   }).then(image => {
//     console.log(image1);
//     refRBSheet.current.close()

//     console.log(images1);
//     console.log(images1.length);
//     var i ;
//     for (i = 0 ; i<images1.length ; i++){
//       images.push(images1[i].sourceURL)
//     }
//   });
// }


// const Selectphoto = () =>{
//   ImageCropPicker.openPicker({
//     multiple: true
//   }).then(images1 => {
//     refRBSheet.current.close()

//     console.log(images1);
//     console.log(images1.length);
//     var i ;
//     for (i = 0 ; i<images1.length ; i++){
//       images.push(images1[i].sourceURL)
//     }


//   });
// }



const deleteimage = () =>{
  // setspinner(true)
  let pos = imgposition;
  console.log('---'+pos);
  let img1 = []
  // alert(imgposition)
  for(var i = 0 ; i< images.length ; i++){
    if(i != pos){
      img1.push(images[i])
      
    }
   }
   setimages(img1)

let img2 = []
for(var index = 0 ; index< images2.length ; index++){
  if(index != pos){
    
    if(images2[index].id ){
      img2.push(images2[index])

    }
  }
 }
 setimages2(img2)

}

const callingupdateApi = ()=>{

let array ={};
array.customer_user_id = export_details.customer_user_id
array.booking_number = item.booking_number
array.ar_number = item.ar_number;
array.vessel = item.vessel;
array.container_number = item.container_number;
array.broker_name= item.broker_name;
array.terminal = item.terminal;
array.streamship_line= export_details.streamship_line == null ? null: export_details.streamship_line == '' ? null:  export_details.streamship_line == undefined? '': export_details.streamship_line  ;
array.destination = item.destination;
array.container_type = item.container_type;
array.port_of_discharge= item.port_of_discharge;
array.port_of_loading = item.port_of_loading;
array.consignee = export_details.houstan_custom_cover_letter.consignee;
array.vehicle_ids = export_details.vehicle_ids;
if(imagesurls.length > 0){
  let container_images = imagesurls
  let img = {container_images}
  array.fileurl=img
}

if(images2 != null){
array.container_images = images2
}


  fetch(AppUrlCollection.EXPORT_DETAIL + item.id, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
    },
    
    body: JSON.stringify(array)
    
   
})
    .then((response) =>  response.json())
    .then((responseJson) => {
      setspinner(false)
      AppConstance.showSnackbarMessage(responseJson.message)

      ImagePicker.clean().then(() => {
        console.log('removed all tmp images from tmp directory');
      }).catch(e => {
        alert(e);
      });
      
        console.log('export detail ', responseJson)
       
    })
    .catch((error) => {
      alert(error)
      setspinner(false)
        console.warn(error)
    });


  }

  const callingContainerDetailsApi = () =>{

    setimages2(item.container_images)

    fetch(AppUrlCollection.EXPORT_DETAIL + item.id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
    }
   
})
    .then((response) => response.json())
    .then((responseJson) => {
      setexport_details(responseJson.data.export_details)

        console.log('export detail ', responseJson.data.export_details)
       
    })
    .catch((error) => {
      alert(error)
      setspinner(false)
        console.warn(error)
    });

}

useEffect(() => {

callingContainerDetailsApi()

  if (item.container_images != undefined && item.container_images != null ) {
    // setimg(responseJson.data.vehicle.images)
    for (let index = 0; index < item.container_images.length; index++) {
        const element = item.container_images[index];
        images.push(element)
        console.log(element);
    }

  }else{
    
  }
    
  return () => {
    
  }
}, [])



return (
   
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
   <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

  <Modal
        visible={deletemodalshow}
        animationType='fade'
        transparent={true}
        >
            <View style={{flex:1, justifyContent:'flex-end',backgroundColor:'#0005', height:deviceHeight}}>
                <View style={{bottom:30}}>
           
                <TouchableOpacity 
            onPress={()=> { setdeletemodalshow(false), deleteimage()}}
            style={{alignSelf:'center',width:'85%', backgroundColor:'#E5E7E9',paddingVertical:20, width:'90%',borderRadius:15, marginTop:10}}
            >
              <Text style={{alignSelf:'center',fontSize:18, fontWeight:'400', color:'red'}}>Delete Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=> { setdeletemodalshow(false)}}
            style={{alignSelf:'center',backgroundColor:'white',paddingVertical:20, width:'90%',borderRadius:15, marginTop:10}}
            >
              <Text style={{alignSelf:'center', fontSize:18, fontWeight:'400', }}>Cancel</Text>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>
      

  <Appbar
                            style={{backgroundColor:AppColors.Headercolor,
                        flexDirection:'row',
                        width:deviceWidth,
                        backgroundColor:AppColors.Headercolor,
                        justifyContent:'space-between',
                            padding:10,
                            elevation:0,

                        }}
                        >  


                <TouchableOpacity
                style={{justifyContent:'center', }}
                onPress={()=>navigation.goBack()}

                >
                <Ionicons  name='chevron-back' size={25} color='grey'/>



                </TouchableOpacity>


                <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={{alignSelf:'center',color:'grey',fontWeight:'bold', fontSize:20}}>Container</Text>
              </View>

                
                
              <View style={{width:'10%',justifyContent:'center' }}>
            <TouchableOpacity
            onPress={()=> {callingupdateApi()}}
            style={{alignSelf:'center', justifyContent:'center'}}>
            <AntDesign  size={20} style={{alignSelf:'center'}} color='black' name='check'/>
            </TouchableOpacity>
            </View>

      </Appbar>

     
  <Modal
        visible={showimagemodel}
        animationType='fade'
        >
            <View style={{ justifyContent:'center',backgroundColor:'black', height:deviceHeight}}>
                <View style={{backgroundColor:'black'}}>
                <SliderBox 
          images={images}
          sliderBoxHeight={deviceHeight*0.5}
          
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    marginHorizontal: -4,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
  circleLoop
  currentImageEmitter={index => {
   }}

         
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}

        />
        
            <TouchableOpacity 
            onPress={()=> { setshowimagemodel(false)}}
            style={{alignSelf:'center', marginTop:10}}
            >
                <MaterialCommunityIcons color='red'  name='close-circle-outline' size={40}/>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>
      


<ScrollView style={{width:deviceWidth , marginBottom:40}}>
 


 <View>

 <SliderBox 
          images={images.length>0 ?images:dummyimages}
          sliderBoxHeight={260}          
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    marginHorizontal: -4,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
  circleLoop
  currentImageEmitter={index => { 
    if(index == 0){
      setadd(true)
    }else{
      setadd(false)
    }
    setimgposition(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            // setshowimagemodel(true)
            {}
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}

        />
       

{images.length > 0?

     <View style={{marginTop:15,position:'absolute',alignSelf:'flex-end', paddingHorizontal:40, }}>
    <TouchableOpacity
    onPress={()=> {   setdeletemodalshow(true)}}
    style={{alignSelf:'center',borderRadius:5, borderWidth:1, borderColor:AppColors.toolbarColor }}>

     <Ionicons name="close" color={AppColors.toolbarColor}  size={25}  />
  </TouchableOpacity>
       </View>

       :null}
<View style={{marginTop:-100, width:deviceWidth, paddingHorizontal:50, height:35,width:35, marginBottom:30,alignSelf:'flex-end',justifyContent:'center', }}>
  {/* <TouchableOpacity 
          onPress={() => refRBSheet.current.open()}
          style={{backgroundColor:'grey' , borderRadius: 50,height:'100%',width:'100%',  justifyContent:'center', }}>
  <Text style={{color:'white', alignSelf:'center'}}>+</Text>

  </TouchableOpacity> */}



{add == true ?
 <ActionButton position='left'  size={40} buttonColor="rgba(231,76,60,1)">
 <ActionButton.Item buttonColor='#9b59b6'   size={30} onPress={() => {chooseFile('photo')}}>
   <Ionicons name="ios-images-outline" size={20} style={styles.actionButtonIcon} />
 </ActionButton.Item>
 <ActionButton.Item buttonColor='#3498db' size={30} onPress={() => {}}>
 <Ionicons name="ios-camera-outline" size={20} style={styles.actionButtonIcon} />
 </ActionButton.Item>

</ActionButton>
:
null

}

 

</View>


</View>




<View style={{flexDirection:'column', justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 5,alignSelf:'center',borderRadius:10,borderWidth:0.2, marginTop:50,paddingHorizontal:10, width:'95%',}} >





<View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>AR no:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.ar_number}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>Container no:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.container_number}</Text>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>Broker Name:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.broker_name}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>Booking no:</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.booking_number}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>Destination</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{item.destination}</Text>
</View>




</View>




</ScrollView>


</SafeAreaView>





  );
};


export default MyContainerDetails;




const styles = StyleSheet.create({
  actionButtonIcon: {
    alignSelf:'center',
    color:'white'
  },


  })