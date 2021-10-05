import React,{useState,useEffect, useRef} from 'react';
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
import { Icon} from 'react-native-elements'
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
import { TextInput } from 'react-native-gesture-handler';
import Feather from  'react-native-vector-icons/dist/Feather'
import RadioButtonRN from 'radio-buttons-react-native';
import AppUrlCollection from '../UrlCollection/AppUrlCollection'
// import DatePicker from 'react-native-datepicker';
import Animated, { cond } from 'react-native-reanimated';
import RBSheet from "react-native-raw-bottom-sheet";
// import ImageCropPicker from 'react-native-image-crop-picker';
import { RadioButton } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
// import BarcodeScanner from 'react-native-scan-barcode';



const EditVehicle = ({route, navigation }) => {
  const refRBSheet = useRef();

  const { item } = route.params;
const [details , setdetails] = useState(item)

const picture = [
  {
    label: 'PICTURES'
  }
  ]  
  const [images , setimages] = useState([
    

  ])
  const [add , setadd] = useState(true)
  const [imgposition, setimgposition] = useState(0)
  const [ vin , setvin] = useState(item.vin == ''? '':item.vin)
  const [Customerlist , setCustomerlist ] = useState([])
  const [Filteredcustomer , setFilteredcustomer ] = useState([])
  const[Search , setSearch]= useState()
  const [customername , setcustomername] = useState(item.customer_name)
  const [location_id ,setlocation_id ] = useState(item.location)
  const [location_name, setlocation_name] = useState()
  const [location , setlocation ] = useState(item.location);
  const [vehicletype , setvehicletype] =useState(item.vehicle_type)
  const [make , setmake ] = useState(item.make);
  const [model , setmodel ] = useState(item.model);
  const [color , setcolor ] = useState(item.color);
  const [weight , setweight ] = useState(item.weight);
  const [year , setyear ] = useState(item.year);
  const [hatnumber , sethatnumber ] = useState(item.hat_number);
  const [licensenumber , setlicensenumber ] = useState(item.hat_number);
  const [lotnumber , setlotnumber ] = useState(item.lot_number);
  const [containernmber , setcontainernmber] = useState(item.container_number)
  const [status , setstatus ] = useState(item.status);
  const [condition , setcondition ] = useState(item.condition);
  const [damaged , setdamaged ] = useState(item.damaged);
  const [titlenumber , settitlenumber ] = useState(item.title_number);
  const [pictures , setpictures] = useState();
  const [deliverdate , setdeliverdate ] = useState(item.deliver_date);
  const [pickupdate , setpickupdate] = useState(item.pickup_date);
  const [note , setnote ] = useState();
  const [checkoption , setcheckoption ] = useState();
  const [ KEYS ,setKEYS ] = useState('');
  const [ CDPLAYER ,setCDPLAYER ] = useState('');
  const [ SPEAKER ,setSPEAKER ] = useState('');
  const [ WHEELCAPS ,setWHEELCAPS] = useState('');
  const [ MIRROR ,setMIRROR] = useState('');
  const [ OTHERS ,setOTHERS ] = useState('');

  const [frontwindshiled , setfrontwindshiled ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[2]: '');
  const [bonnet , setbonnet ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[3]: '');
  const [grill , setgrill ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[4]: '');
  const [frontbumper , setfrontbumper ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[5]: '');
  const [frontheadlight , setfrontheadlight ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[6]: '');
  const [rearwindshield , setrearwindshield ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[7]: '');
  const [trunkdoor , settrunkdoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[8]: '');
  const [rearbumper , setrearbumper ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[9]: '');
  const [rearbumpersupport , setrearbumpersupport ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[10]: '');
  const [taillamp , settaillamp ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[11]: '');
  const [frontleftfender , setfrontleftfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[12]: '');
  const [leftfrontdoor , setleftfrontdoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[13]: '');
  const [leftreardoor , setleftreardoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[14]: '');
  const [leftrearfender , setleftrearfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[15]: '');
  const [pillar , setpillar ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[16]: '');
  const [roof, setroof] =useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[17]: '');
  const [rightrearfender , setrightrearfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[18]: '');
  const [rightreardoor , setrightreardoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[19]: '');
  const [rightfrontdoor , setrightfrontdoor ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[20]: '');
  const [frontrightfender , setfrontrightfender ] = useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[21]: '');
  const [fronttyres , setfronttyres]= useState(item.vehicle_conditions.length > 0 ? item.vehicle_conditions[22]: '');
  const Damaged = [
    {
      label: 'Yes'
     },
     {
      label: 'NO'
     },
    ];
  const [vehicleDetails , setvehicleDetails] = useState([''])
  const [locationslist , setlocationslist] = useState([
    {
      id:1

    },
    {
      id:2
    },
    {
      id:1

    },
    {
      id:2
    },
    {
      id:1

    },
    {
      id:2
    },
    {
      id:1

    },
    {
      id:2
    }

  ])
  const [locmodal,setlocmodal]= useState(false)
  const [custmodal,setcustmodal]= useState(false)
  const [imgpos, setimgpos] = useState(0)
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)
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
const [torchMode ,settorchMode] = useState('off')
const [cameraType ,setcameraType] = useState('back')
const [barcodemodal , setbarcodemodal] = useState(false)
const [date, setDate] = useState('09-10-2020');

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
searchFilterFunction = (text) => {
  if (text) {

    const newData = Customerlist.filter(
      function (item) {
        
        const itemData =  item.customer_name
          ?  item.customer_name.toUpperCase()
          :''.toUpperCase();

         
        const textData = text.toUpperCase();

        if(itemData.indexOf(textData) > -1){
          return  itemData.indexOf(textData) > -1;
        }
    });

    setCustomerlist(newData)
  //   setFilteredDataSource(newData);

  //   setSearch(text);
    console.log('text is '+text);
  } else {
    // Inserted text is blank
    setCustomerlist(Filteredcustomer)
    console.log('blank');
  //   this.setState({vehicleList: vehicleList2})
  //   setFilteredDataSource(data);
  //   setSearch(text);
  }
};



const searchingCustomer = (text) => {
  if (text) {
    console.log('text is '+text);
console.log('-----==---'+Customerlist.length);
    const newData = Customerlist.filter(
      function (item) {

        const itemData = item.text
          ? item.text.toUpperCase()
          : ''.toUpperCase();

          console.log('--'+itemData);
      const textData = text.toUpperCase();
      // itemData.indexOf(textData) > -1  
      return itemData.indexOf(textData) > -1;

      //  if(itemData.indexOf(textData)  -1){
      //   return  itemData.indexOf(textData)  -1;
      // }             
    });
    setFilteredcustomer(newData);
    setSearch(text);
    console.log('text is '+text);
  } else {
    // Inserted text is blank
    console.log('blank');
    // Update FilteredDataSource with masterDataSource
    setFilteredcustomer(data);
    setSearch(text);
  }
};

const callinglocation =() =>{
  let url = AppUrlCollection.LOCATION
  fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
    },
})
    .then((response) => response.json())
    .then((responseJson) => {
        // this.setState({ isLoading: false })
      setspinner(false)
      setlocationslist(responseJson.data)
        console.log('Response data viw :: ', responseJson)
        console.log('detail --------------'+details);

       
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    }); 

}

const barcodeReceived =(e)=> {
  console.log('Barcode: ' + e.data);
  console.log('Type: ' + e.type);
}

const callingCustomer =() =>{
  let url = AppUrlCollection.BASE_URL+'customers'
  fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
      },
})
    .then((response) => response.json())
    .then((responseJson) => {
        // this.setState({ isLoading: false })
      setspinner(false)
      setCustomerlist(responseJson.data)
      setFilteredcustomer(responseJson.data)
      // setlocationslist(responseJson.data)
        console.log('Response data viw :: ', responseJson)
        console.log('detail --------------'+details);

       
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    }); 

}

const callingContainerApi = () => {
  setspinner(true)
  var url = AppUrlCollection.VEHICLE_DETAIL + '?id='+ item.id; 
  // if (isFirstTimeCaling) {
  //   setspinner(false)
  //   setisFooterLoading(false)
  //     // this.setState({ isLoading: true, isFooterLoading: false })
  //     url = AppUrlCollection.VEHILE_LIST
  // } else {
  //   setspinner(false)
  //   setisFooterLoading(true)
  //     // this.setState({ isLoading: false, isFooterLoading: true })
  //     url = AppUrlCollection.VEHILE_LIST 
  // }
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
        },
  })
      .then((response) => response.json())
      .then((responseJson) => {
          // this.setState({ isLoading: false })
        setspinner(false)
          console.log('Response data viw :: ', responseJson)
          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              imageBasePath = responseJson.data.other.vehicle_image
              
              // if (responseJson.data.vehicle ) {
                let data1= responseJson.data.vehicle;
                setdata(responseJson.data.vehicle)

                sethatnumber(data1.hat_number)

                setyear(data1.year)
                setcolor(data1.color)
                setmodel(data1.model)
                setmake(data1.make)
                setweight(data1.weight)

                setlicensenumber(data1.license_number)
                setlotnumber(data1.lot_number)

                setcontainernmber(data1.containernmber)

                let towingRequest = responseJson.data.vehicle.towingRequest;
                // console.log('--=-=-=-=-=-=-'+responseJson.data.vehicle.towingRequest);

                settitlenumber(towingRequest.title_number)
                setdeliverdate(towingRequest.deliver_date)
                setpickupdate(towingRequest.pickup_date)
                setpictures(towingRequest.pictures)
                setdamaged(towingRequest.damaged)
                setcondition(towingRequest.condition)

                setstatus(data1.status)


                switch(data1.location) {
 
                  case '1':
                    setlocation_name('LA')
                      break;
                      case '2':
                        setlocation_name('GA')
                          break;
                      
       
                          case '3':
                            setlocation_name('NY')
                              break;
                          
           
                              case '4':
                                setlocation_name('TX')
                                  break;
                              
               
                                  case '8':
                                    setlocation_name('TORONTO')
                                      break;
                                  
                   
                                      case '9':
                                        setlocation_name('MONTREAL')
                                          break;
                                      
                       
                                          case '10':
                                            setlocation_name('HALIFAX')
                                              break;
                                          
                           
                                              case '11':
                                                setlocation_name('EDMONTON')
                                                  break;
                                              
                                                  case '12':
                                                    setlocation_name('CALGARY')
                                                      break;
                                                  
                                   
                                                      case '13':
                                                        setlocation_name('Afghanistan')
                                                          break;
                                                      
                                       
                                                          case '15':
                                                            setlocation_name('Turkamanistan')
                                                              break;
                                                          
                                           
                                                              case '19':
                                                                setlocation_name('VANCOUVER')
                                                                  break;
                                                                  case '20':
                                                                    setlocation_name('MANITOBA')
                                                                      break;
                                                                      case '21':
                                                                        setlocation_name('WA')
                                                                          break;
                                                              
  

                  default:
                    // alert("NUMBER NOT FOUND");
                    setlocation_name('Please Select Location')
                
                  }


                let condition = responseJson.data.vehicle.vehicleConditions



                for ( var i=0 ; i<condition.length ; i++ ){
                  let element = condition[i].condition.name
                

                switch(element) {
 
                  case 'FRONT WINDSHILED':
                    setfrontwindshiled(condition[i].value)
                      break;
                  
                  case 'BONNET':
                    setbonnet(condition[i].value)
                  
                    break;
             
                  case 'GRILL':
                    setgrill(condition[i].value)
                    break;
             
                  case 'FRONT BUMPER':
                    setfrontbumper(condition[i].value)
                    break;
             
                    case 'FROTN HEAD LIGHT':
                    setfrontheadlight(condition[i].value)
                    break;
                  
                  case 'REAR WINDSHIELD':
                    setrearwindshield(condition[i].value)
                    break

                    case 'TRUNK DOOR':
                    settrunkdoor(condition[i].value)
                    break;
                  
                  case 'REAR BUMPER':
                    setrearbumper(condition[i].value)
                    break

                    case 'REAR BUMPER SUPPORT':
                    setrearbumpersupport(condition[i].value)
                    break;
                  
                  case 'TAIL LAMP':
                    settaillamp(condition[i].value)
                    break

                    case 'FRONT LEFT FENDER':
                    setfrontleftfender(condition[i].value)
                    break;
                  
                  case 'LEFT FRONT DOOR':
                    setleftfrontdoor(condition[i].value)
                    break


                    case 'LEFT REAR DOOR':
                    setleftreardoor(condition[i].value)
                    break;
                  
                  case 'LEFT REAR FENDER':
                    setleftrearfender(condition[i].value)
                    break;







                    case 'PILLAR':
                      setpillar(condition[i].value)
                      break;
                    
                    case 'ROOF':
                      setroof(condition[i].value)
                      break
  
                      case 'RIGHT REAR FENDER':
                      setrightrearfender(condition[i].value)
                      break;
                    
                    case 'RIGHT REAR DOOR':
                      setrightreardoor(condition[i].value)
                      break
  
  
                      case 'RIGHT FRONT DOOR':
                      setrightfrontdoor(condition[i].value)
                      break;
                    
                    case 'FRONT RIGHT FENDER':
                      setfrontrightfender(condition[i].value)
                      break;


                  default:
                    // alert("NUMBER NOT FOUND");
                
                  }
             
                }

                
                
                  // if (isFirstTimeCaling) {
                  //   setvehicleList(responseJson.data.vehicleList)
                  //   setnoMoreDataFound(false)
                  //   setisFooterLoading(false)
                  //   setspinner(false)
                  //     // this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                  // } else {
                    
                  //   setvehicleList(old =>[...old, ...responseJson.data.vehicleList])
                  //   setdata(old => [...old, ...data]);

                  //   setnoMoreDataFound(false)
                  //   setisFooterLoading(false)
                  //     // this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                  // }
              } else {
                setdata(responseJson.data.vehicle)

                  // if (isFirstTimeCaling) {
                  //   setvehicleList([])
                  //   setnoMoreDataFound(true);
                  //   setisFooterLoading(false)
                  //     // this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                  // } else {
                  //   setisFooterLoading(false)
                  // setnoMoreDataFound(true)
                  //     // this.setState({ isFooterLoading: false, noMoreDataFound: true })
                  // }

              }
          // } else {
          //     AppConstance.showSnackbarMessage(responseJson.message)
          // }
      })
      .catch((error) => {
          console.warn(error)
      });
}

useEffect(() => {


console.log('===='+JSON.stringify());

callingContainerApi()
callinglocation()
callingCustomer()

if (item.photos != undefined && item.photos != null) {
  // setimg(responseJson.data.vehicle.images)
  for (let index = 0; index < item.photos.length; index++) {
      const element = item.photos[index];
      images.push(element)
      console.log(element);
  }

  

}

  return () => {
    
  }
}, [])

const renderlist = ({item}) =>{

  return(
    <TouchableOpacity 
    onPress={()=>{setlocation_id(item.id); setlocation_name(item.name); setlocmodal(false) }}
    style={{marginVertical:5,justifyContent:'space-around', flexDirection:'row'}}>
      <Text>{item.id}</Text>
<Text>{item.name}</Text>

    </TouchableOpacity>
  
  
  )
  
   }


const renderCustomerlist = ({item}) =>{

    let c ;
    if(customername == item.customer_name){
      c = 1
    }
    return(
      
<TouchableOpacity 
onPress={()=> { setcustmodal(false); setcustomername(item.customer_name)}}
style={{marginVertical:5,borderWidth:0.5,flexDirection:'row', borderColor:'grey', borderRadius:10,paddingVertical:12,paddingHorizontal:10,}}>

{c == null ? 
  <Ionicons name='ios-radio-button-off-sharp'  color='grey' style={{alignSelf:'center'}}  size={20} />:
  <Ionicons name='ios-radio-button-on'  color={AppColors.Signincolor} style={{alignSelf:'center'}}  size={20} />
}


  <Text style={{alignSelf:'center',color:AppColors.Signincolor, marginLeft:5,}}>{item.customer_name}</Text>
{/* <Text>sfsdfn</Text> */}
</TouchableOpacity>    
    
    )
    
     }  




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
                <Text style={{alignSelf:'center',color:'black',fontWeight:'bold', fontSize:20}}>Edit Vehicle</Text>
                </View>

                
                
                <View style={{width:'10%',justifyContent:'center' }}>
              <TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}
              onPress={()=>{
                alert('j')
              }}
              >
              <AntDesign  size={20} style={{alignSelf:'center'}} color='black' name='check'/>
              </TouchableOpacity>
              </View>

      </Appbar>

        <Modal
          transparent={true}
          animationType={'slide'}
          visible={custmodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <SafeAreaView
            style={{
              flex: 1,
              width:deviceWidth,
              justifyContent:'flex-start',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:AppColors.Signincolor,
              flexDirection: 'column',
              alignItems: 'center',
            }}>

{/* <ImageBackground source={require('../images/backgroundimage.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height:deviceHeight, position: 'absolute' }} >
</ImageBackground> */}

                 <View
style={{width:deviceWidth,flexDirection:'row', paddingHorizontal:13,paddingVertical:15, height:55}}>

<TouchableOpacity
style={{justifyContent:'center',width:'15%', }}
onPress={()=> setcustmodal(false) }

>
<Text style={{color:'white', fontSize:16}}>Cancel</Text>


</TouchableOpacity>

<View style={{width:'70%',justifyContent:'center', }}>
<Text style={{alignSelf:'center',color:'white',fontWeight:'bold', fontSize:20}}>Customer</Text>
</View>

<View style={{width:'10%',justifyContent:'center' }}>
<TouchableOpacity style={{alignSelf:'center', justifyContent:'center'}}>
{/* <AntDesign  size={20} style={{alignSelf:'center'}} color='white' name='check'/> */}
</TouchableOpacity>
</View>
</View>



<View style={{marginHorizontal:10,justifyContent:'center',paddingHorizontal:5, borderRadius:10,backgroundColor:'white', flexDirection:'row'}}>
<Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

  <TextInput style={{backgroundColor:'white',width:'90%',height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => searchFilterFunction(text)}
  onSubmitEditing={(Text) => searchFilterFunction(Text)}
  // this.callingVehicleContainerService()
  placeholder="Search Customer"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  

</View>

            <View
              style={{
                width: '100%',
                marginTop:12,
                height:deviceHeight,
                flexDirection: 'column',
                backgroundColor:'white',
                borderTopRightRadius:10,
                borderTopLeftRadius:10,
              }}>
    
    <FlatList
         contentContainerStyle={{ paddingHorizontal:1, paddingVertical:5,}}
         
      data={Customerlist}
     renderItem={renderCustomerlist}
     keyExtractor={(item,index) => index.toString()}
    

          />


          <View style={{height:180}}>


            </View>
    {/* <RadioButtonRN
  data={datacustomer}
  color="#2c9dd1"
  textStyle={{color:'grey'}}
  box={true}
  boxDeactiveBgColor='white'
  textColor='grey'
  selectedBtn={(e) => console.log(e)}
/> */}
        {/* <FlatList
         contentContainerStyle={{ paddingHorizontal:20, paddingVertical:5,}}
         
      data={locationslist}
     renderItem={rendercustomerlist}
     keyExtractor={(item,index) => index.toString()}
    

          /> */}

           

            
           
            </View>
         
          </SafeAreaView>
        </Modal>

        <Modal
          transparent={true}
          animationType={'none'}
          visible={locmodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:'#0005',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '65%',
                flexDirection: 'column',
                backgroundColor:'white',
                borderRadius:15,
              }}>
    
           <View style={{borderBottomWidth:0.3,paddingVertical:7, borderColor:'#D0D3D4'}}>
             <Text style={{alignSelf:'center',fontSize:18, fontWeight:'bold', paddingVertical:10,}}>Location</Text>
           </View>

        <FlatList
         contentContainerStyle={{ paddingHorizontal:20, paddingVertical:15,}}
         
      data={locationslist}
     renderItem={renderlist}
     keyExtractor={(item,index) => index.toString()}
    

          />

              <View style={{flexDirection:'row',borderTopWidth:0.5,borderColor:'grey',  width:'100%'}}>
                <TouchableOpacity style={{width:'50%',height:40,alignSelf:'center',justifyContent:'center', borderRightWidth:0.5,borderColor:'grey'}}
                onPress={()=>{setlocmodal(false)}}
                >
                  <Text style={{alignSelf:'center', fontSize:15}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity  style={{width:'50%', height:40, justifyContent:'center', alignSelf:'center'}}
                                onPress={()=>{setlocmodal(false)}}

                >
                  <Text style={{fontWeight:'bold',fontSize:15, alignSelf:'center'}}>OK</Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                  flexDirection:'row',
                }}>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    marginLeft:10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
             
              </View> */}
           
            </View>
         
          </View>
        </Modal>


        <Modal
          transparent={true}
          animationType={'none'}
          visible={barcodemodal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:'#0005',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '65%',
                flexDirection: 'column',
                backgroundColor:'white',
                borderRadius:15,
              }}>
    
    {/* <BarcodeScanner
        onBarCodeRead={barcodeReceived}
        style={{ flex: 1 }}
        torchMode={torchMode}
        cameraType={cameraType}
      /> */}
        
            
            </View>
         
          </View>
        </Modal>

        
    <ScrollView style={{width:deviceWidth }}>

    <View>
 {item.photos.length> 0?

 <SliderBox 
          images={images}
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
            showimagemodel(true)
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{ width: '100%', marginTop: 0}}

        />
        :
        
        <View style={{height:260}}>
          </View>
          
          }


{item.photos.length> 0?

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
 <ActionButton position='left'  size={43} buttonColor="rgba(271,74,60,1)">
 <ActionButton.Item buttonColor='#9b59b6'  size={33} onPress={() => {chooseFile('photo')}}>
   <Ionicons name="ios-images-outline" size={20} style={styles.actionButtonIcon} />
 </ActionButton.Item>
 <ActionButton.Item buttonColor='#3498db' size={33} onPress={() => {}}>
 <Ionicons name="ios-camera-outline" size={20} style={styles.actionButtonIcon} />
 </ActionButton.Item>

</ActionButton>
:
null

}

 

</View>


</View>

    {/* <View >

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
        // alert(index)
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



    </View> */}


    <View style={{width:'100%',flexDirection:'row',marginTop:2, paddingVertical:10, paddingHorizontal:10, backgroundColor:'#2C3E50', justifyContent:'center', alignSelf:'center'}}>
              <View style={{width:'20%', }}>
              <Text style={{color:'white'}}>VIN #:</Text>
              </View>

              <View style={{width:'50%'}}>
                <TextInput 
                style={{color:'white'}}
                placeholderTextColor='#D0D3D4'
                placeholder={item.vin == '' ? 'Enter VIN or scan':item.vin}
                onChangeText={(text)=> {setvin(text)}}
                />
              </View>
              <View style={{width:'20%'}}>
                <TouchableOpacity 
                onPress={()=> {setbarcodemodal(true)}}
                style={{alignSelf:'flex-end'}}
                >
                  <MaterialIcons name='qr-code-scanner' color='white' size={18} />
                  </TouchableOpacity>
              </View>

            </View>

        
    <View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'#F2F3F4',   shadowColor: 'grey',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 1,
        elevation: 5,alignSelf:'center',borderRadius:10,borderWidth:0.2, marginTop:10,paddingHorizontal:10, width:'95%',}} >





    <View style={{width:'100%',flexDirection:'column', borderBottomWidth:0.3,paddingVertical:5,borderColor:'#B3B6B7', justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CUSTOMER </Text>
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}}
    onPress={()=>{
      setcustmodal(true)
    }}
    >
    <Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{customername}</Text>
    <AntDesign  name='caretdown' color='grey'/>
    </TouchableOpacity></View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2, fontWeight:'bold',fontSize:14,}}>LOCATION</Text>
    <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}}
    onPress={()=>{
      setlocmodal(true)
    }}
    >
    <Text style={{color:'grey',paddingVertical:2, fontSize:14,}}>{location}</Text>
    <AntDesign  name='caretdown' color='grey'/>
    </TouchableOpacity>
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>HAT NUMBER</Text>
    <TextInput  
    placeholder={hatnumber}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>VEHICLE TYPE</Text>
    <TextInput  
    placeholder={vehicletype}
    placeholderTextColor='grey'
    onChangeText = {(Text)=> {setvehicletype(Text)}}
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>YEAR </Text>
    <TextInput  
    placeholder={year}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>COLOR </Text>
    <TextInput  
    placeholder={color}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5, borderColor:'#B3B6B7', justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MODEL </Text>
    <TextInput  
    placeholder={model}
    placeholderTextColor='grey'
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>MAKE</Text>
    <TextInput  
    placeholder={make}
    placeholderTextColor='grey'
    />
    </View>





    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>WEIGHT</Text>
    <TextInput  
    placeholder={weight}
    placeholderTextColor='grey'
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LICENSE NUMBER</Text>
    <TextInput  
    placeholder={weight}
    placeholderTextColor='grey'
    />
    </View>






    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LOT NUMBER</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LOAD STATUS</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CONTAINER NUMBER</Text>
    <TextInput  
    placeholder={containernmber}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>KEY NOTE</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PREPAREDBY</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>AUCTION AT</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>VCR</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>NOTE2</Text>
    <TextInput  
    placeholder={lotnumber}
    placeholderTextColor='grey'
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>STATUS</Text>
    {/* <RadioButtonRN
      data={datacustomer}
      color="#2c9dd1"
      box={false}
      boxDeactiveBgColor='white'
      textColor='grey'
      selectedBtn={(e) => console.log(e)}
    /> */}


    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column', marginLeft:5,   }}>
      <TouchableOpacity
      
      onPress={()=>{setstatus('1')}}
      >

    <Text style={{fontWeight:'500'}}>ON HAND</Text>
    </TouchableOpacity >

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('2')}}
    >

    <Text style={{fontWeight:'500'}}>MANIFEST</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('3')}}
    >

    <Text style={{fontWeight:'500'}}>ON THE WAY</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('4')}}
    >

    <Text style={{fontWeight:'500'}}>SHIPPED</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('6')}}
    >

    <Text style={{fontWeight:'500'}}>ARRIVED</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('7')}}
    >

    <Text style={{fontWeight:'500'}}>Handed Over</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setstatus('5')}}
    >

    <Text style={{fontWeight:'500'}}>PICKED UP</Text>
    </TouchableOpacity>

   

    </View>


    <View style={{flexDirection:'column',  marginLeft:10, width:'60%' }}>
      
      <TouchableOpacity 
      onPress={()=>{setstatus('1')}}
      >
    {status == '1' ? 
    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus('2')}}
    >
    {status == '2' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>



    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus('3')}}
    >
    {status == '3' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    /> 

    }
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus('6')}}
    >
    {status == '4' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:8,}}

      onPress={()=>{setstatus('10')}}
    >
    {status == '6' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:8}}

      onPress={()=>{setstatus('11')}}
    >
    {status == '7' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:5,}}

      onPress={()=>{setstatus('12')}}
    >
    {status == '5' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:7,}}

      onPress={()=>{setstatus('15')}}
    >
  
    </TouchableOpacity> 
    {/*
    <TouchableOpacity
    style={{marginTop:10,backgroundColor:'yellow'}}

      onPress={()=>{setstatus('10')}}
    >
    {status == '10' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>



    <TouchableOpacity
    style={{marginTop:10,backgroundColor:'grey'}}

      onPress={()=>{setstatus('11')}}
    >
    {status == '11' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}

      onPress={()=>{setstatus('12')}}
    >
    {status == '12' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}

      onPress={()=>{setstatus('15')}}
    >
    {status == '15' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <AntDesign name='check' color='transparent' size={20}
    />}
    </TouchableOpacity> */}


    </View>


    </View>

    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CONDITION</Text>
    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column', marginLeft:5,   }}>
      <TouchableOpacity
      
      onPress={()=>{setcondition('0')}}
      >

    <Text style={{fontWeight:'500'}}>NON-OP</Text>
    </TouchableOpacity >

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setcondition('1')}}
    >

    <Text style={{fontWeight:'500'}}>OPERABLE</Text>
    </TouchableOpacity>

    </View>


    <View style={{flexDirection:'column', marginLeft:10, width:'60%' }}>
      
      <TouchableOpacity 
      onPress={()=>{setcondition('0')}}
      >
    {condition == '0' ? 
    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:8,}}

      onPress={()=>{setcondition('1')}}
    >
    {condition == '1' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    </View>


    </View>

    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DAMAGED</Text>

    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column',   width:'12%' }}>
      <TouchableOpacity
      
      onPress={()=>{setdamaged('1')}}
      >

    <Text style={{alignSelf:'center' ,fontWeight:'500'}}>YES</Text>
    </TouchableOpacity >

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{setdamaged('0')}}
    >

    <Text style={{alignSelf:'center' ,fontWeight:'500'}}>NO</Text>
    </TouchableOpacity>

    </View>


    <View style={{flexDirection:'column',  width:'60%' }}>
      
      <TouchableOpacity 
      onPress={()=>{setdamaged('1')}}
      >
    {damaged == '1' ? 
    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:8,}}

      onPress={()=>{setdamaged('0')}}
    >
    {damaged == '0' ? 

    <AntDesign name='check' color='#1a9bef' size={20} /> :
    <Text style={{alignSelf:'center' ,fontWeight:'500'}}></Text>
    }
    </TouchableOpacity>

    </View>


    </View>


    {/* <RadioButton.Group onValueChange={newValue => setdamaged(newValue)} value={damaged}>

          <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center' ,fontWeight:'500'}}>Yes</Text>

          <RadioButton value='1' color='#1a9bef'/>

          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
          <Text style={{alignSelf:'center',marginRight:5, fontWeight:'500'}}>No</Text>

          <RadioButton value='0'  color="#1a9bef" />

          </View>
        </RadioButton.Group> */}

    {/* <RadioButtonRN
      data={Damaged}
      color="#2c9dd1"
      box={false}
      boxDeactiveBgColor='white'
      textColor='grey'
      selectedBtn={(e) => console.log(e)}
    /> */}
    </View>


    {/* <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <RadioButtonRN
      data={datacustomer}
      color="#2c9dd1"
      box={false}
      boxDeactiveBgColor='white'
      textColor='grey'
      selectedBtn={(e) => console.log(e)}
    />
    </View> */}

    {/* <View style={{width:'100%',backgroundColor:'red', flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <RadioButton
            value='1'
            status={ picture == '1' ? 'checked' : 'unchecked' }
            onPress={() => setpictures('1')}
          />
    </View> */}



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TITLE NUMBER</Text>
    <TextInput  
    placeholder={titlenumber}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>DELIVER DATE</Text>
    <TextInput  
    placeholder={deliverdate}
    placeholderTextColor='grey'
    />
    </View>




    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PICKUP DATE</Text>
    {/* <DatePicker
              style={{width: 200,
        marginTop: 20,}}
              date={date} // Initial date from state
              mode="datetime" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="2016-05-01"
              maxDate="2025-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 1,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 0,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            /> */}
    <TextInput  
    placeholder={pickupdate}
    multiline={true}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>CHECK OPTIONS INCLUDED ON THE ..</Text>
    <View style={{flexDirection:'row', marginVertical:10,}}>

    <View style={{flexDirection:'column',  marginLeft:10, width:'10%' }}>
      
      <TouchableOpacity 
      onPress={()=>{KEYS == 1 ? setKEYS('0'):setKEYS('1')}}
      >
    {KEYS == '1' ? 
    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:5,}}

    onPress={()=>{ CDPLAYER == 1 ? setCDPLAYER('0'):setCDPLAYER('1')}}
    >
    {CDPLAYER == '1' ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>



    <TouchableOpacity
    style={{marginTop:5,}}

    onPress={()=>{SPEAKER == 1 ? setSPEAKER('0'):setSPEAKER('1')}}
    >
    {SPEAKER == '1' ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    /> 

    }
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:5,}}

    onPress={()=>{ WHEELCAPS == 1 ? setWHEELCAPS('0') : setWHEELCAPS('1')}}
    >
    {WHEELCAPS == '1' ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:5,}}

    onPress={()=>{MIRROR == 1 ? setMIRROR('0'):setMIRROR('1') }}
    >
    {MIRROR == '1' ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity>





    <TouchableOpacity
    style={{marginTop:7,justifyContent:'center'}}

    onPress={()=>{OTHERS == 1 ? setOTHERS('0'):setOTHERS('1')}}
    >
    {OTHERS == '1' ? 

    <Ionicons name='ios-radio-button-on' style={{alignSelf:'center'}}  color='#1a9bef' size={20} /> :
    <Ionicons name='ios-radio-button-off-sharp' style={{alignSelf:'center'}}  color='#1a9bef' size={20}
    />}
    </TouchableOpacity> 

    </View>

    <View style={{flexDirection:'column', marginLeft:5,   }}>
      <TouchableOpacity
      
      onPress={()=>{KEYS == 1 ? setKEYS('0'):setKEYS('1')}}
      >

    <Text style={{fontWeight:'500'}}>KEYS</Text>
    </TouchableOpacity >

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{ CDPLAYER == 1 ? setCDPLAYER('0'):setCDPLAYER('1')}}
    >

    <Text style={{fontWeight:'500'}}>CD PLAYER</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{SPEAKER == 1 ? setSPEAKER('0'):setSPEAKER('1')}}
    >

    <Text style={{fontWeight:'500'}}>SPEAKER</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{ WHEELCAPS == 1 ? setWHEELCAPS('0') : setWHEELCAPS('1')}}
    >

    <Text style={{fontWeight:'500'}}>WHEEL CAPS</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{MIRROR == 1 ? setMIRROR('0'):setMIRROR('1') }}
    >

    <Text style={{fontWeight:'500'}}>MIRROR</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={{marginTop:10,}}
      onPress={()=>{OTHERS == 1 ? setOTHERS('0'):setOTHERS('1')}}
    >

    <Text style={{fontWeight:'500'}}>OTHERS</Text>
    </TouchableOpacity>




    </View>




    </View>

    </View>





    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:8,borderColor:'#B3B6B7',  justifyContent:'center'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold',alignSelf:'center', fontSize:14,}}>CONDITION OF VEHICLE</Text>

    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT WINDSHILED</Text>
    <TextInput  
      onChangeText={text =>setfrontwindshiled(text) }

    placeholder={frontwindshiled}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>BONNET</Text>
    <TextInput  
      onChangeText={text =>  setbonnet(text)}

    placeholder={bonnet}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>GRILL</Text>
    <TextInput  
      onChangeText={text =>  setgrill(text)}

    placeholder={grill}
    placeholderTextColor='grey'
    />
    </View>



    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT BUMPER</Text>
    <TextInput  
      onChangeText={text => setfrontbumper(text) }

    placeholder={frontbumper}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT HEAD LIGHT</Text>
    <TextInput  
      onChangeText={text =>  setfrontheadlight(text)}

    placeholder={frontheadlight}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR WINDSHIELD</Text>
    <TextInput  
      onChangeText={text =>  setrearwindshield(text)}

    placeholder={rearwindshield}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TRUNK DOOR</Text>
    <TextInput  
      onChangeText={text =>settrunkdoor(text) }

    placeholder={trunkdoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER</Text>
    <TextInput  
      onChangeText={text => setrearbumper(text)}

    placeholder={rearbumper}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>REAR BUMPER SUPPORT</Text>
    <TextInput  
      onChangeText={text => setrearbumpersupport(text) }

    placeholder={rearbumpersupport}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>TAIL LAMP</Text>
    <TextInput  
      onChangeText={text =>  settaillamp(text)}

    placeholder={taillamp}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT LEFT FENDER</Text>
    <TextInput  
      onChangeText={text =>  setfrontleftfender(text)}

    placeholder={frontleftfender}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT FRONT DOOR</Text>
    <TextInput  
      onChangeText={text =>setleftfrontdoor(text) }

    placeholder={leftfrontdoor}
    placeholderTextColor='grey'
    />
    </View>




    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR DOOR</Text>
    <TextInput  
      onChangeText={text => setleftreardoor(text) }

    placeholder={leftreardoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>LEFT REAR FENDER</Text>
    <TextInput  
      onChangeText={text => setleftrearfender(text)}

    placeholder={leftrearfender}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>PILLAR</Text>
    <TextInput  
      onChangeText={text => setpillar(text)}

    placeholder={pillar}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>ROOF</Text>
    <TextInput  
      onChangeText={text => setroof(text) }

    placeholder={roof}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR FENDER</Text>
    <TextInput  
      onChangeText={text => setrightrearfender(text)}

    placeholder={rightrearfender}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT REAR DOOR</Text>
    <TextInput  
      onChangeText={text => setrightreardoor(text)}

    placeholder={rightreardoor}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>RIGHT FRONT DOOR</Text>
    <TextInput  
      onChangeText={text =>setrightfrontdoor(text) }

    placeholder={rightfrontdoor}
    placeholderTextColor='grey'
    />
    </View>

    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT RIGHT FENDER</Text>
    <TextInput  
      onChangeText={text => setfrontrightfender(text)}

    placeholder={frontrightfender}
    placeholderTextColor='grey'
    />
    </View>


    <View style={{width:'100%',flexDirection:'column',borderBottomWidth:0.3, paddingVertical:5,borderColor:'#B3B6B7',  justifyContent:'space-between'}}>
    <Text style={{color:'black',paddingVertical:2,fontWeight:'bold', fontSize:14,}}>FRONT TYRES</Text>
    <TextInput  
      onChangeText={text => setfronttyres(text)}

    placeholder={fronttyres}
    placeholderTextColor='grey'
    />
    </View>





    </View>

    </ScrollView>


    </SafeAreaView>


  );
};


export default EditVehicle;


const styles = StyleSheet.create({
  actionButtonIcon: {
    alignSelf:'center',
    color:'white'
  },


  })