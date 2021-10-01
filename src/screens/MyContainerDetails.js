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



const images = [

  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
    
    
    
];

const MyContainerDetails = ({route, navigation }) => {


  const [vehicleDetails , setvehicleDetails] = useState([''])

  const { item   } = route.params;
  
  const refRBSheet = useRef();
  const [add , setadd] = useState(true)
  const [imgposition, setimgposition] = useState(0)
  const [images , setimages] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree", 


  ])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)

  
// bs = React.createRef()
// fall = new Animated.Value(1)

// renderInner = () =>(
//   <Text>HEllo</Text>
// );

// RenderHeader =() =>(
//   <View style={{backgroundColor:'white', shadowColor:'#333333', shadowOffset:{width:-1, height:-3}, 
//   shadowRadius:2,shadowOpacity:0.4, paddingTop:20, borderTopLeftRadius:20, borderTopRightRadius:20} } >
//       <View style={{alignItems:'center', }}>
//           <View style={{width:40, height:8, borderRadius:4, backgroundColor:'red', marginBottom:10}}>

//           </View>

//       </View>

//   </View>
// )

  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#008B8B',
        title: 'Image Downloaded Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);
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
const [width, setwidth] =useState('100%')
  const [currentimg, setcurrentimg] = useState('')
const [Export, setExport] = useState(false)
const [data, setdata] = useState([])




const deleteimage =() =>{
  let pos = imgposition;
  let img1 = []
  // alert(imgposition)
  for(var i = 0 ; i< images.length ; i++){
    if(i != pos){
      img1.push(images[i])
    }
   }
   setimages(img1)
   alert(JSON.stringify(img1))
  // let im = images
  // let removedItems = im.splice(pos)
  // console.log(JSON.stringify(removedItems));



}



useEffect(() => {



  return () => {
    
  }
}, [])



return (
   
  <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
  



  <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        container: {
                            // backgroundColor: '#ECF0F1',
                            backgroundColor:'white',
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                            paddingTop:15,

                        },
                        draggableIcon: {
                            backgroundColor: "grey"
                        }
                    }}
                >
                    <View>

                   
             
                    <TouchableOpacity
                    onPress={()=> {}}
                    >
                        <View style={{ borderWidth: 0.5 , borderRadius:12,marginTop:10, borderColor: 'red', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center',fontWeight:'600', padding: 12, color: 'red', }}>Delete</Text>
                        </View>

                    </TouchableOpacity>
               
                    <TouchableOpacity
                                        onPress={()=> refRBSheet.current.close()}

                    >
                        <View style={{ borderWidth: 1, borderRadius:12,marginTop:10, borderColor: 'grey', width: '80%', alignSelf: 'center' }}>
                            <Text style={{ alignSelf: 'center', padding: 12, color: 'grey',fontWeight:'bold' }}>Cancel</Text>
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
           


  {/* <Toolbar toggle={this.props.toggle} headerName='DASHBOARD' isFilterIconShow={false} isInnerScreen={false} /> */}
 
 
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
            <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}>
            <AntDesign  size={20} style={{alignSelf:'center'}} color='black' name='check'/>
            </TouchableOpacity>
            </View>

      </Appbar>


      


<ScrollView style={{width:deviceWidth }}>
 

 <View>

 <SliderBox 
          images={images}
          sliderBoxHeight={250}
          
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
    alert(index)
    setimgposition(index); 
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
     
     <View style={{marginTop:15,position:'absolute',alignSelf:'flex-end', paddingHorizontal:40, }}>
    <TouchableOpacity
    onPress={()=> {   refRBSheet.current.open()}}
    style={{alignSelf:'center',borderRadius:5, borderWidth:1, borderColor:AppColors.toolbarColor }}>

     <Ionicons name="close" color={AppColors.toolbarColor}  size={25}  />
  </TouchableOpacity>
       </View>
<View style={{marginTop:-85, width:deviceWidth, paddingHorizontal:50, height:35,width:35, marginBottom:30,alignSelf:'flex-end',justifyContent:'center', }}>
  {/* <TouchableOpacity 
          onPress={() => refRBSheet.current.open()}
          style={{backgroundColor:'grey' , borderRadius: 50,height:'100%',width:'100%',  justifyContent:'center', }}>
  <Text style={{color:'white', alignSelf:'center'}}>+</Text>

  </TouchableOpacity> */}



{add == true ?
 <ActionButton position='left'  size={40} buttonColor="rgba(231,76,60,1)">
 <ActionButton.Item buttonColor='#9b59b6'  size={30} onPress={() => console.log("notes tapped!")}>
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