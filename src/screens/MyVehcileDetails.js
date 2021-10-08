import React,{useState,useEffect,useRef} from 'react';
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
import AntDesign from 'react-native-vector-icons/dist/AntDesign'; 
import Entypo from  'react-native-vector-icons/dist/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from  'react-native-vector-icons/dist/Feather'
import { Icon} from 'react-native-elements'
import Animated from 'react-native-reanimated';
import RBSheet from "react-native-raw-bottom-sheet";
// import ImageCropPicker from 'react-native-image-crop-picker';
import { Appbar } from 'react-native-paper';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';



const dummyimages = [
  require('../Images/noimage3.jpeg') 
 ];

const MyVehcileDetails = ({route, navigation }) => {
  const [vehicleDetails , setvehicleDetails] = useState([''])

  const { item  } = route.params;

  const [imgpos, setimgpos] = useState(0)
  const[showimagemodel , setshowimagemodel] = useState(false)
  const [images , setimages] = useState([
   
  ])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)
  const[Details , setDetails] = useState(item)

  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#008B8B',
        title: 'Image Downloaded Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);
  };

  const checkPermission = async (image) => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage(image);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(image);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };


  const downloadImage = (img) => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = img;    
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        showSnackbarMessage()
        // alert('Image Downloaded Successfully.');
      });
  };


const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ?
           /[^.]+$/.exec(filename) : undefined;
};

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const refRBSheet = useRef();


const [width, setwidth] =useState('100%')
  const [currentimg, setcurrentimg] = useState('')
const [Export, setExport] = useState(false)
const [data, setdata] = useState([
  {
    date: '20-12-2020',
    Description: 'Description',
    Lot:'473890',
    N:'CA',

  },
  

  {
  date: '20-12-2020',
    Description: 'Description',
    Lot:'473890',
    N:'CA',
  },

  {
    date: '20-12-2020',
    Description: 'Description',
    Lot:'473890',
    N:'CA',
  },

]
)

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

const callingVehicledetailedApi = () =>{
setspinner(true)
  fetch(AppUrlCollection.VEHICLE_DETAIL  + item.id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
    },
})
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)

        setspinner(false)

      
        if (responseJson.status == 'SUCCESS') {
            setDetails(responseJson.data) 
            let data = responseJson.data
            if (data.photo_urls != undefined && data.photo_urls != null) {
              // setimg(responseJson.data.vehicle.images)
              for (let index = 0; index < data.photo_urls.length; index++) {
                  const element = data.photo_urls[index];
                  images.push(element)
                  console.log(element);
              }
            }
            
           }
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    });

}


useEffect(() => {

  callingVehicledetailedApi()
  if (item.photo_urls != undefined && item.photo_urls != null) {
    // setimg(responseJson.data.vehicle.images)
    for (let index = 0; index < item.photo_urls.length; index++) {
        const element = item.photo_urls[index];
        images.push(element)
        console.log(element);
    }
  }
  

  const willFocusSubscription = navigation.addListener('focus', () => {
    callingVehicledetailedApi();
});

return willFocusSubscription;


}, [])





return (
   
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
 
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
  <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        container: {
                            backgroundColor: '#ECF0F1',
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                            height: 300,
                            paddingTop:15,

                        },
                        draggableIcon: {
                            backgroundColor: "grey"
                        }
                    }}
                >
                    <View>

                    <TouchableOpacity>
                        <View style={{ borderBottomWidth: 0.6,paddingVertical:5, borderColor: '#D0D3D4', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center',  fontSize:20,fontWeight:'600', paddingVertical:5,  }}>Upload Photo</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>TakePhoto() }
                    >
                        <View style={{ borderWidth: 0.5, borderRadius:12,marginTop:10, borderColor: '#1a9bef', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', padding: 10,fontWeight:'600', color: '#1a9bef', }}>Take Photo</Text>
                        </View>

                    </TouchableOpacity>
             
                    <TouchableOpacity
                    onPress={()=> Selectphoto()}
                    >
                        <View style={{ borderWidth: 0.5 , borderRadius:12,marginTop:10, borderColor: '#1a9bef', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center',fontWeight:'600', padding: 10, color: '#1a9bef', }}>Choose From Library</Text>
                        </View>

                    </TouchableOpacity>
               
                    <TouchableOpacity
                                        onPress={()=> refRBSheet.current.close()}

                    >
                        <View style={{ borderWidth: 1, borderRadius:12,marginTop:10, borderColor: 'red', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', padding: 10, color: 'red', }}>Cancel</Text>
                        </View>

                    </TouchableOpacity>
                    </View>

               
               <View style={{  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 20
}}>

             
                    <TouchableOpacity 
                    onPress={()=> refRBSheet.current.close()}
                    style={{width:25,justifyContent:'center', height:25, backgroundColor:'grey', borderRadius:50, alignSelf:'flex-end', marginRight:30}}>
                    <Entypo   name='chevron-down' color='white' size={18} style={{alignSelf:'center'}}/>
                    </TouchableOpacity>
                    </View>

                </RBSheet>
           

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


                <View style={{width:'80%',justifyContent:'center', }}>
                <Text style={{alignSelf:'center',color:'black',fontWeight:'bold', fontSize:20}}>Vehicle</Text>
                </View>

                
                
                <View style={{width:'10%',justifyContent:'center' }}>
              <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}
              onPress={()=>{
                navigation.navigate('EditVehicle',{'item': Details  })
              }}
              >
              <MaterialIcons  size={20} style={{alignSelf:'center'}} color='black' name='mode-edit'/>
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
  currentImageEmitter={index => { setimgpos(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            setSliderModel(true)
          }
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
          


<ScrollView style={{width:deviceWidth }}>


 <SliderBox 
 
 images={images.length > 0 ?images:dummyimages}
 sliderBoxHeight={210}
          
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
  currentImageEmitter={index => { setimgpos(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            setshowimagemodel(true)
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}

        />



        <View style={{width:'100%',flexDirection:'row',paddingVertical:10, paddingHorizontal:10, backgroundColor:'#2C3E50', justifyContent:'center', alignSelf:'center'}}>
          <View style={{width:'45%'}}>
          <Text style={{color:'white'}}>VIN NUMBER</Text>
          </View>

          <View style={{width:'55%'}}>
          <Text style={{color:'white'}}>{Details.vin}</Text>
          </View>

        </View>


<View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 1,alignSelf:'center',borderRadius:1,borderWidth:0.1, marginTop:12,paddingHorizontal:10, width:'95%',}} >





<View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CUSTOMER </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.customer_name}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>LOT NUMBER </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.lot_number}</Text>
</View>

<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MAKE</Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.make}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MODEL </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.model}</Text>
</View>


<View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
<Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>YEAR </Text>
<Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{Details.year}</Text>
</View>




</View>


</ScrollView>


</SafeAreaView>





  );
};


export default MyVehcileDetails;
