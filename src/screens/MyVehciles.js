import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,StyleSheet,
  ScrollView,View,
  Text,ImageBackground,
  FlatList,
  TextInput,Switch,
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
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { SliderBox } from "react-native-image-slider-box";
import { Icon} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { Appbar } from 'react-native-paper';


const images = [

  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", 
    
    
    
];


let imageBasePath;
const MyVehicles = ({ navigation }) => {


  const [vin , setvin] = useState(true)
  const[spinner , setspinner] = useState(false)
  const[data , setdata] = useState([])
  const [ page , setpage] = useState(1)
  const[isFooterLoading, setisFooterLoading] = useState(false)
  const[noMoreDataFound , setnoMoreDataFound] = useState(true)
  const [FilteredDataSource , setFilteredDataSource ] = useState([])
  const [vehicleList , setvehicleList] = useState([])
  const [ Search , setSearch ] = useState()
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
  
          const itemData = item.vin
            ? item.vin.toUpperCase()
            : ''.toUpperCase();

        const textData = text.toUpperCase();
        itemData.indexOf(textData) > -1  

                 return itemData.indexOf(textData) > -1;   
               
   
      });
      setvehicleList(newData);
      setSearch(text);
      console.log('text is '+text);
    } else {
      // Inserted text is blank
      console.log('blank');
      // Update FilteredDataSource with masterDataSource
      setvehicleList(FilteredDataSource);
      setSearch(text);
    }
  };

  const callingVehicleApi = async (isFirstTimeCaling) => {
    setspinner(true)
    var url = ''
    if (isFirstTimeCaling == true) {
      setisFooterLoading(false)
        // this.setState({ isLoading: true, isFooterLoading: false })
        url = AppUrlCollection.VEHILE_LIST
    } else {
      setisFooterLoading(true)
        // this.setState({ isLoading: false, isFooterLoading: true })
        url = AppUrlCollection.VEHILE_LIST 
    }

    // + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId,
    fetch(AppUrlCollection.VEHILE_LIST  +'page=' + page ,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.data !=  '' || responseJson.data !=  null) {
                let data = responseJson.data;
               
                // this.setState({ isLoading: false, isFooterLoading: false })
                if (data.length > 0) {
                  setspinner(false)
                  setisFooterLoading(false)
                  setvehicleList(data)
                  setFilteredDataSource(data)
                    // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                    // this.setState({ vehicleList: this.state.vehicleList.concat(data), vehicleList2: this.state.vehicleList2.concat(data),noMoreDataFound: false })
                } else {
                  setnoMoreDataFound(true)
                  setisFooterLoading(false);
                setisStopCallingAPI(true)

                    // this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
                }
               
                // this.setState({ noMoreDataFound: false })
            } else {
                // this.setState({ isLoading: false, isFooterLoading: false })
                // this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
                // AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            // this.setState({ isLoading: false })
          setspinner(false)
            console.warn(error)
        });
}


  const  renderVehicle = ({ item, index }) => {

    var img = [];

    if (item.photo_urls != undefined && item.photo_urls != null) {
      // setimg(responseJson.data.vehicle.images)
      for (let index = 0; index < item.photo_urls.length; index++) {
          const element = item.photo_urls[index];
          img.push(element)
          console.log(element);
      }
    
      
  
    }

  
    return(
      <TouchableOpacity style={{width:'100%',
      
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
      
      backgroundColor:'white',borderTopLeftRadius:10 , borderBottomRightRadius:10,  marginTop:15, borderWidth:0.3,borderColor:AppColors.toolbarColor, flexDirection:'column'}}
      
      onPress={()=>navigation.navigate('MyVehicleDetails', {'item' : item})}
      >

 <SliderBox 
          images={img}
          sliderBoxHeight={160}
          
          imageLoadingColor={AppColors.toolbarColor}

          dotColor={AppColors.toolbarColor}
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    marginHorizontal: -4,

    
  }}
          resizeMethed={'resize'}  
          resizeMode={'cover'}
  circleLoop

  // currentImageEmitter={index => { setimgpos(index); 
  //  }}

          // onCurrentImagePressed={index =>
          // //setcurrentimg()
          //   // console.warn(`image ${index} pressed`)
          //   setSliderModel(true)
          // }
 
  ImageComponentStyle={{borderTopLeftRadius:10 ,width:'95%',marginLeft:-21,}}
        />
        {/* :null} */}
 
 <View style={{width:'94%',flexDirection:'row', justifyContent:'space-between',marginVertical:5, alignSelf:'center'}}>
<View style={{width:'35%'}}>
<Text style={{paddingVertical:2,fontWeight:'500'}}>VIN NO:</Text>
<Text style={{paddingVertical:2,fontWeight:'500'}}>CUSTOMER:</Text>
<Text style={{paddingVertical:2,fontWeight:'500'}}>LOT NO:</Text>
</View>
<View style={{width:'68%', }}>
<Text style={{paddingVertical:2,}}>{item.vin}</Text>
<Text style={{paddingVertical:2,}}>{item.customer_name}</Text>
<Text style={{paddingVertical:2,}}>{item.lot_number}</Text>
</View>
 </View>
 
             </TouchableOpacity>
    
    
    );
  
  }


  useEffect(() => {
    callingVehicleApi(true)
    // setspinner(true)
    // callingdashboardApi()
    // setspinner(false)
  
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
              <Text style={{alignSelf:'center',color:'grey',fontWeight:'bold', fontSize:20}}>Vehciles</Text>
              </View>

                
                
          <View>
            <Text></Text>

          </View>
     
      </Appbar>


   


<View style={{marginHorizontal:17,justifyContent:'center',      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5, borderRadius:20,backgroundColor:'white',marginTop:20, flexDirection:'row'}}>
  <TextInput style={{backgroundColor:'white',width:'90%', height:40,paddingHorizontal:10, borderRadius:20}}
  onChangeText={text => searchFilterFunction(text)}
  onSubmitEditing={(Text) => searchFilterFunction(Text)}
  // this.callingVehicleContainerService()
  placeholder="Enter vin or lot number"
  placeholderTextColor='grey'
  
    underlineColorAndroid="transparent"
  ></TextInput>
  
  <Feather style={{alignSelf:'center',}} size={18} color='grey'  name='search'/>

</View>

{/* <View style={{flexDirection:'row', width:'90%', justifyContent:'space-between', alignSelf:'center', marginVertical:10,}}>

  <Text style={{alignSelf:'center', color:'white', fontWeight:'300', fontSize:16}}>Search By Vin</Text>
  <Switch 
  onValueChange={toggleSwitch}
  value ={vin}
  />
</View> */}


<View>

  
</View>
<FlatList

                        data={vehicleList}
                        contentContainerStyle={{marginHorizontal:10,alignSelf:'center',justifyContent:'center',paddingBottom:10,marginTop:10, paddingHorizontal:10, width:deviceWidth}}
                        renderItem={renderVehicle}
                        keyExtractor={(item, index) => index}
                      //   onEndReached={loadMoreData}
                      //   ListFooterComponent={renderFooter}
                      //  onEndReachedThreshold={0.01}
                      
                    />
                


</SafeAreaView>

  );
};









export default MyVehicles;
