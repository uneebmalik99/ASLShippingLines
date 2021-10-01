import React, { useState,useEffect,useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  Switch,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { SliderBox } from "react-native-image-slider-box";
import { Icon} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";


const images = [

  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
    
    
    
];


const MyContainerList = ({ navigation }) => {

  const refRBSheet = useRef();

const [vin , setvin] = useState(true)
  const[spinner , setspinner] = useState(false)
  const[isFooterLoading, setisFooterLoading] = useState(false)
  const[noMoreDataFound , setnoMoreDataFound] = useState(true)
  const[page , setpage] = useState(1)
  const [FilteredDataSource, setFilteredDataSource]= useState([])
  const[data , setdata] = useState([])
  const [vehicleList , setvehicleList] = useState([])

  const toggleSwitch = (value) => {
    //To handle switch toggle
    console.warn(value);
    setvin(value)
    // setvin(value);
    //State changes according to switch
  };




  const searchFilterFunction = (text) => {
    if (text) {
      console.log(text);
     
      const newData = vehicleList.filter(
        function (item) {
          const itemData =  item.container_number
          ?  item.container_number.toUpperCase()
          :''.toUpperCase();

          const itemData2 =  item.booking_number
          ?  item.booking_number.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();

        if(itemData.indexOf(textData) > -1){
          return  itemData.indexOf(textData) > -1;
        }else{
          return  itemData2.indexOf(textData) > -1;
        }  
               
   
      });
      setvehicleList(newData);
      // setSearch(text);
      console.log('text is '+text);
    } else {
      // Inserted text is blank
      console.log('blank');
      setvehicleList(FilteredDataSource)
      // Update FilteredDataSource with masterDataSource
      // setSearch(text);
    }
  };

  const callingContainerApi = (isFirstTimeCaling) => {
    setspinner(true)
    var url = ''
    url = AppUrlCollection.EXPORT_LIST + '&page=' + page

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
        },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.data != '' || responseJson.data != null) {

            let data = responseJson.data
            if (data.length > 0) {
              setspinner(false)
               setvehicleList(data)
               setFilteredDataSource(data)
            } else {
                setvehicleList()
                setFilteredDataSource()
                setspinner(false)
            }
        } else {
          setspinner(false)

            AppConstance.showSnackbarMessage(responseJson.message)
        }
    })
    .catch((error) => {
      setspinner(false)

        console.warn(error)
    });
  } 

  const  renderVehicle = ({ item, index }) => {
    return(
      <TouchableOpacity style={{width:'100%',      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,   backgroundColor:'white',borderTopLeftRadius:10 , borderBottomRightRadius:10,  marginTop:15,  borderWidth:0.3,borderColor:AppColors.toolbarColor, flexDirection:'column'}}
      
      onPress={()=>navigation.navigate('MyContainerDetails',{'item':item})}
      >
 
 
 
 <View style={{width:'94%',flexDirection:'row', justifyContent:'space-between',marginVertical:5, alignSelf:'center'}}>
<View style={{width:'45%'}}>
<Text style={{paddingVertical:2,fontWeight:'500'}}>AR no:</Text>
<Text style={{paddingVertical:2,fontWeight:'500'}}>Container no:</Text>
<Text style={{paddingVertical:2,fontWeight:'500'}}>Broker Name:</Text>
<Text style={{paddingVertical:2,fontWeight:'500'}}>Booking no:</Text>
<Text style={{paddingVertical:2,fontWeight:'500'}}>Destination:</Text>
</View>
<View style={{width:'55%'}}>
<Text style={{paddingVertical:2,}}>{item.ar_number}</Text>
<Text style={{paddingVertical:2,}}>{item.container_number}</Text>
<Text style={{paddingVertical:2,}}>{item.broker_name}</Text>
<Text style={{paddingVertical:2,}}>{item.booking_number}</Text>
<Text style={{paddingVertical:2,}}>{item.destination}</Text>
</View>
 </View>
 
             </TouchableOpacity>
    );
  
  }



  useEffect(() => {

    
    callingContainerApi()
    return () => {
      
    }
  }, [])

  return (
    <SafeAreaView style={{flex:1, width:deviceWidth, backgroundColor: 'white', height: deviceHeight, }}>
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

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
            </TouchableOpacity>
            </View>

      </Appbar>

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
           



{/* <View

style={{height:100,marginTop:50,}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logofinal.jpg')}/>

</View> */}

<View style={{marginHorizontal:17,    shadowColor: "#000",
shadowOffset: {
	width: 0,

	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5, justifyContent:'center', borderRadius:20,backgroundColor:'white',marginTop:20,marginBottom:10, flexDirection:'row'}}>
  <TextInput style={{backgroundColor:'white',width:'90%',height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => searchFilterFunction(text)}
  onSubmitEditing={(Text) => searchingApi(Text)}
  // this.callingVehicleContainerService()
  placeholder="Enter Booking or Container number"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  
  <Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

</View>


<View>

  
</View>
<FlatList

                        data={vehicleList}
                        contentContainerStyle={{marginHorizontal:10,alignSelf:'center',justifyContent:'center',paddingBottom:10, paddingHorizontal:10, width:deviceWidth}}
                        renderItem={renderVehicle}
                        keyExtractor={(item, index) => index}
                      //   onEndReached={loadMoreData}
                      //   ListFooterComponent={renderFooter}
                      //  onEndReachedThreshold={0.01}
                      
                    />
                


</SafeAreaView>

  );
};









export default MyContainerList;
