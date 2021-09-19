import React, { Component } from 'react';
import { View, Dimensions, SafeAreaView, Modal, Text,ImageSlider, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView, Share, BackHandler } from 'react-native'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';
import renderIf from './renderif';
import { SliderBox } from "react-native-image-slider-box";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';
import Slideshow from 'react-native-image-slider-show-razzium';


const images1 = [

    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
    // require('../Images/car_image1.jpg'),
    // require('../Images/car_image2.jpg'),
    // require('../Images/download.jpg'),
    // require('../Images/download1.jpg')
];


let source = {uri:'', cache:true}


let vehicleObj = null;
let locationList = []
var baseImagePath = null;
var isCallingWithoutLogin = ''
var Exportdata = ''

let imageBasePath = null;


class VehcilContainerDetailScreen extends Component {
    constructor(props) {
        super(props);
        vehicleObj =  props.route.params.vehicleObj;
     
        this.state = {

            exortList: [

            ],
            drawerview:false,

            imagesq: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree",
               // require('./assets/images/girl.jpg'),
              ],

              Exportdata,
              img:false,
            isLoading: false,
            tabIndex: 0,
            V_cr:false,
            V_PDF:false,
            V_VEHICLEDETAIL:true,
            V_Export:false,
            isInternetNotConnected: false,
            images: [],
            imageSLiderPos: 0,
            isConnected:true,
            vehicleDetail: [],
            vehicle_conditions:[],
            invoice_pdf : '',
            show:false,
            showimagemodel : false,
        }


    }

    Logout =() => {

        AsyncStorage.setItem('ISUSERLOGIN', '0');
        AppConstance.IS_USER_LOGIN = '0'
      
        AsyncStorage.setItem('auth_key', ' ');
        AppConstance.USER_TOKEN_KEY = ' '
      
        AsyncStorage.setItem('user_id', ' ');
        AppConstance.USER_ID = ' '
      
        
      
      
        AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);
             this.setState({drawerview : false})
        this.props.navigation.navigate('AppDrawer1');
      
          }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.callingVehicleDetailApi();
        

    }

    

    //check internet connection
   
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

  callingExportApin=() =>{
    fetch(AppUrlCollection.EXPORT_LIST, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ isLoding: false })
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                imageBasePath = responseJson.data.other.export_image
                console.log('image da ', responseJson)
                this.setState({ exortList: responseJson.data.export })

            } else {
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
  }

    callingVehicleDetailApi = () => {
       
            fetch(AppUrlCollection.VEHICLE_DETAIL  + vehicleObj.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({ isLoading: false })
                  
                    if (responseJson.status == 'SUCCESS') {
                        // alert(responseJson.data.vehicle_conditions[3])
                        this.setState({ vehicleDetail: responseJson.data , vehicle_conditions:responseJson.data.vehicle_conditions })
                       source.uri = '';
                       if(responseJson.data.invoice_photos.length > 0){
                        source.uri = responseJson.data.invoice_photos[0].url
                        this.setState({show: true})
                       }else{
                        this.setState({show: false})
   
                       }
                        
                        let vehicleDetailObj = responseJson.data;
                        console.log('Loation testing list ::', vehicleDetailObj)
                        this.setState({ images: [] })
                       


                        var a =[];
            
                        for (let index = 0; index < vehicleDetailObj.photos.length; index++) {
                            const element = vehicleDetailObj.photos[index];
                            // this.state.images.push(element.url)
                            var b ={};
                            b.url = element
                            a.push(b)
                        }

                        this.setState({images:a})


                        this.setState({ images: this.state.images })
                    } else {
                        AppConstance.showSnackbarMessage(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.warn(error)
                });
        


    }

    renderVehicleDetail = ({ item, index }) => {
        if (this.state.V_VEHICLEDETAIL == true) {
            // {renderIf(this.state.V_VEHICLEDETAIL)(
               return <View

            >
             
                <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>

             <Elavation
                 elevation={4}
                     style={{ width: deviceWidth * 0.95, backgroundColor: AppColors.white, marginBottom: 7, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, borderRadius: 10, padding: 10 }}
                 >
                     <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}> Vehicle : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vehicle}</Text>
                        </View>


                         <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Color : </Text>
                           <Text style={styles.detailValueTxtStyle}>{item.color}</Text>
                     </View>

          

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Make : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.make}</Text>
</View>


<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>model : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.model}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>keys : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.keys}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Towing Titles : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towing_titles}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>towing date </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towingDate}</Text>
</View>


<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Delivered date</Text>
  <Text style={styles.detailValueTxtStyle}>{item.deliveredDate}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Tow Location </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towLocation}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Tow Amount  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towAmount}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Storage </Text>
  <Text style={styles.detailValueTxtStyle}>{item.storage}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}> Title Type   </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleType}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title status   </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleStatus}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title Amount  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleAmount}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}> Title no.  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleNo}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title State  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleState}</Text>
</View>

                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}>Location : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vehicleLocation}</Text>
                         </View>


                         <View style={styles.detailMainViewStyle}>
                         <Text style={styles.detailHeadingTxtStyle}>Lot NO : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.lotNo}</Text>
                       </View>



                         <View style={styles.detailMainViewStyle}>
                         <Text style={styles.detailHeadingTxtStyle}>Vin : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.vin}</Text>
                         </View>


                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}>Keys : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.keys}</Text>
                     </View>
                     </View>
                 </Elavation>
         </View>
          
          // )}
    } 
//     else  if (renderIf(this.state.V_VEHICLEDETAIL)
//         ) {
//             // return <View>

//             // <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>
//             // <Elavation
//             //        elevation={4}
//             //        style={styles.dataChildViewElavationContainer}
//             //    >
//             //         <View style={{ paddingLeft: 10, paddingRight: 10 }}>
//             //         <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>frontwindshield </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.frontWindshiled}</Text>
//             //           </View>
//             //           <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>bonet </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.bonnet}</Text>
//             //           </View>
//             //           <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>grill</Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.grill}</Text>
//             //           </View>

   
//             //         <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>front bumper </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.frontBumper}</Text>
//             //           </View>


//             //             <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front HeadeLight </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.fromHeadLight}</Text>
//             //            </View>
                      

//             //             <View style={styles.detailMainViewStyle}>
//             //                 <Text style={styles.detailHeadingTxtStyle}>Rear WindShield </Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearWindshield}</Text>
//             //         </View>


//             //         <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>trunk Door </Text>
//             //                <Text style={styles.detailValueTxtStyle}>{item.trunkDoor}</Text>
//             //             </View>


//             //     <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>rear Bumper</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearBumper}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>rear Bumper Support</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearBumperSupport}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>tail lamp</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.tailLamp}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Front Left Fendar</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontLeftFendar}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Front Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftFrontDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Rear Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftRearDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Rear Fender</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftRearFender}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Pillar</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.pillar}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>roof</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.roof}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Rear Finder</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightRearFinder}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Rear Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightRearDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Front Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightFrontDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front Right Fender</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontRightFender}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front tyres</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontTyres}</Text>
//             //        </View>


//             //         </View>
//             //    </Elavation>
//             // </View>
   
// } else if (index == 2) { 
//     }else{
//         alert('hj');
  //  }
    }

    switchTabWithScoll = (tabIndex, tabTitle) => {
        let scrollIndex = 0;
        for (let index = 0; index < this.state.vehicleDetail.length; index++) {
            const element = this.state.vehicleDetail[index];
            console.log('tabIndex id ', tabTitle.toUpperCase() + ' == ' + element.tabTitle.toUpperCase())
            if (tabIndex == 0 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 0 })
                break;
            } else if (tabIndex == 1 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 1 })
                break;
            } else if (tabIndex == 2 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 2 })
                break;
            } else if (tabIndex == 3 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 3 })
                break;
            }
        }
        setTimeout(() => this.refs.flatList.scrollToIndex({ animated: true, index: scrollIndex }));
    }


    saveImageFromLocal = () => {
        Share.share({
            message: this.state.images[this.state.imageSLiderPos],
            url: this.state.images[this.state.imageSLiderPos], // add image array 
            title: 'Galaxy APP' // add link 
        }, {
                // Android only:
                dialogTitle: 'Share BAM goodness',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
        // CameraRoll.saveToCameraRoll(this.state.images[0], 'photo')
    }

    scrollFlatList = (e) => {
        let offset = e.nativeEvent.contentOffset.y;
        let index = parseInt(offset / 300);   // your cell height
        this.setState({ tabIndex: index })
         if (index == 3) {
            this.refs.headingScrollView.scrollToEnd({ animated: true });
         } else if (index == 1 || index == 2) {
         this.refs.headingScrollView.scrollTo({ x: 0, y: 0, animated: true })
         }
    }

    render() {

        return (
            <SafeAreaView style={styles.screen}>


            <Modal 
            visible={this.state.drawerview}
            animationType='fade'
            >
                <SafeAreaView>
            <ScrollView>
            
            
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
                                style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
                                              onPress={() =>{ this.setState({drawerview:false}); this.props.navigation.navigate('DashboardScreen') }}
                    >
                                <Image source={ require('../Images/logo_final.png')} 
                                style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
                            />
                            </TouchableOpacity>
            
            
                    <TouchableOpacity 
                                style={{width:60,height:60 ,alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                            //   onPress={() => this.props.navigation.navigate('LoginScreen')}
                    >
                                <Image  source={require('../Images/home-icon-23.png')}
                                style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                            />
                            </TouchableOpacity>
                            
                            
                      
                       <TouchableOpacity style={{
                         alignContent:"flex-end",alignSelf:"flex-end",
                        }  
                        }
                        
                        onPress={() => this.setState({drawerview:false})}        
            
                        >
                             <Image source={ require('../Images/d-2.png')}
                        style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
                       />
                         </TouchableOpacity>
                 
                  </Appbar>
            
            
            
            
            <Header
            
            
             style={{ width:"105%", height:130}}>
            
            
            <Image source={ require('../Images/image.jpg')} 
                        style={{ width: "105%", height:130,  }} 
                       />
            <Left/>
            <Body>
            </Body>
            <Right />
            </Header>
            <Content>
            <List>
            
            
            <ListItem noBorder
             style={{height:40, marginTop:10,
               }}
            onPress={() => { this.setState({drawerview:false});this.props.navigation.navigate('DashboardScreen')}} selected>
            <Image source={ require('../Images/d.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{ fontSize:14, color:'black', marginLeft:10}}>DASHBOARD      </Text>
            
            </ListItem>
            <ListItem noBorder
            style={{height:40,
            }}
             onPress={() => { this.setState({drawerview:false});this.props.navigation.navigate('VehicleScreen')}} selected>
            <Image source={ require('../Images/car.png')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>VEHICLE</Text>        
            
            </ListItem>
            <ListItem noBorder
            style={{height:40,
            }}
            onPress={() =>  { this.setState({drawerview:false});this.props.navigation.navigate('Container1')}} selected>
            <Image source={ require('../Images/ww.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTAINER</Text>        
            
            </ListItem>
            <ListItem noBorder
            style={{height:40,
            }}
            onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('Accounts')}} selected>
            <Image source={ require('../Images/acc.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>ACCOUNT</Text>        
            
            </ListItem>
            
            <ListItem noBorder
            style={{height:40,
            }}
            onPress={() =>  {this.setState({drawerview:false}); this.props.navigation.navigate('OurServiceOne')}} selected>
            <Image source={ require('../Images/j.jpeg')} 
                        style={{  width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>SERVICES</Text>        
            
            </ListItem>
            
            <ListItem noBorder
            style={{height:40,
            }}
            onPress={() =>{this.setState({drawerview:false}); this.props.navigation.navigate('ContactUsOne')}} selected>
            <Image source={ require('../Images/c.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTACT US </Text>        
            
            </ListItem>
            
            
            <ListItem noBorder
            style={{height:40,
            }}
            onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('WishListScreen')}} selected>
            <Image source={ require('../Images/ann.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>ANNOUNCEMENT</Text>        
            
            </ListItem>
            
            
            <ListItem noBorder
                style={{height:40,
                }}
            onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('LocationServiceOne')}} selected>
               
            <Image source={ require('../Images/w.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>OUR LOCATION</Text>        
            
            </ListItem>
            
            <ListItem noBorder
                style={{height:40,marginTop:25, marginBottom:20,
                }}
                 onPress={() =>  this.Logout()}>
            
            <Image source={ require('../Images/l.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, marginLeft:10}}>LOGOUT</Text>        
            
            </ListItem>
            
            
            
            
            
            
            
            </List>
            </Content>
            </ScrollView>
            </SafeAreaView>
            
            </Modal>
            



            <Modal
        visible={this.state.showimagemodel}
        animationType='fade'
        >
            <View style={{ justifyContent:'center',backgroundColor:'black', height:deviceHeight}}>
                <View style={{backgroundColor:'black'}}>
                <Slideshow 
                height={deviceHeight*0.65}
                   dataSource={this.state.images}/>
        
            <TouchableOpacity 
            onPress={()=> { this.setState({showimagemodel: false})}}
            style={{alignSelf:'center', marginTop:10}}
            >
                <MaterialCommunityIcons color='red'  name='close-circle-outline' size={40}/>
            </TouchableOpacity>
                    </View>
            </View>
        </Modal>
            {/* <Modal 
            visible={this.state.showimagemodel}
            animationType='fade'
            style={{justifyContent:'center', alignItems:'center'}}
            >

                 <View style={{width:"100%",justifyContent:'center',marginVertical:10,  alignSelf:'center', alignItems:'center', height:'90%'}}
>
                <SliderBox 
                        images={images1}
                        sliderBoxHeight={deviceHeight*0.4}
                        dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                dotStyle={{
                    width: 13,
                    height: 13,
                    borderRadius: 15,
                    marginHorizontal: -6,
                    
                }}
                        resizeMethod={'resize'}  
                        resizeMode='stretch'
                        autoplay
                        circleLoop
                       
                        />

            <TouchableOpacity 
            onPress={()=> {this.setState({showimagemodel:false})}}
            style={{alignSelf:'center', marginTop:10}}
            >
                <MaterialCommunityIcons color='red'  name='close-circle-outline' size={40}/>
            </TouchableOpacity>

            </View>
           
            
            </Modal> */}
            
                    
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
                                            style={{width:60,height:60 , justifyContent:'center'}}
                                                          onPress={() =>{ this.props.navigation.goBack()}}
                                >
                                            <Ionicons name='ios-chevron-back' color='grey' size={30}/> 
                                        </TouchableOpacity>
            
            
                    <TouchableOpacity 
                                style={{width:60,height:60 ,alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                            //   onPress={() => this.props.navigation.navigate('LoginScreen')}
                    >
                               
                            </TouchableOpacity>
                            
                            
                      
                       <TouchableOpacity style={{
                         alignContent:"flex-end",alignSelf:"flex-end",
                        }  
                        }
                        
                        onPress={() => this.setState({drawerview:true})}         
            
                        >
                             <Image source={ require('../Images/d-2.png')}
                        style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
                       />
                         </TouchableOpacity>
                 
                  </Appbar>
            
            

                <DialogLoader loading={this.state.isLoading} />


              

<View style={ {justifyContent:"center", paddingVertical:10, borderTopWidth:0.5, borderTopColor:'black',  backgroundColor:AppColors.Headercolor,  flexDirection:'row'}}>

<Text style={{fontSize:12, marginLeft:5, color:AppColors.Signincolor}}>
    {this.state.vehicleDetail.year}
</Text>
<Text style={{fontSize:12, marginLeft:15 ,color:AppColors.Signincolor}}>

    {this.state.vehicleDetail.make +"  "+ this.state.vehicleDetail.model}
</Text>



</View>

                

    {this.state.images.length > 0 ? (
        <View style={{width:"100%"}}
>
<Slideshow 
                height={deviceHeight*0.25}
                onPress={()=> {this.setState({showimagemodel:true})}}
                   dataSource={this.state.images}/>
{/* <SliderBox 
          images={this.state.images}
          sliderBoxHeight={deviceHeight*0.23}
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 13,
    height: 13,
    borderRadius: 15,
    marginHorizontal: -6,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
          autoplay
  circleLoop
          onCurrentImagePressed={index =>
            this.setState({showimagemodel: true})
          }
        /> */}
</View>

      ) : (

          <View style={{width:"100%",  height:deviceHeight*0.25}}>
          <Image source={ require('../Images/logo_final.png')} 
         style={{ height:'100%',width:'100%',  alignSelf: 'center', }} resizeMode='stretch' resizeMethod='resize'
        />
      
       </View>
      )}








                {vehicleObj != undefined && vehicleObj != '' ?
                    <View style={{ flex: 1 }}>
                
                    
                        <View style={{ flex: 1 }}>

                        
                            <View style={{ height: 53 }}>
                              
                                    <View style={{borderColor:'black',borderWidth:0.7, paddingHorizontal:7, paddingVertical:7, flex: 1, height: 50, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#d4eeeb' }}>
                                        <TouchableOpacity
                                            style={{ paddingHorizontal:18, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            // onPress={() => this.switchTabWithScoll(0, 'Vehicle Details')}

                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:true});   this.setState({V_cr:false});  this.setState({V_Export:false}); this.setState({V_PDF:false}); }}

                                        >
                                            <Text style={styles.tabHeadingTxt}>VEHICLE</Text>
                                            {/* {this.state.tabIndex == 0 ? <View style={styles.tabDividerStyle} /> : null} */}

                                        </TouchableOpacity>



                                        <TouchableOpacity
                                            style={{ marginLeft:3, paddingHorizontal:22, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:true});  this.setState({V_Export:false}); this.setState({V_PDF:false}); }}
                                        >
                                            <Text style={styles.tabHeadingTxt}>CR</Text>
                                            {/* {this.state.tabIndex == 1 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ marginLeft:3, paddingHorizontal:20, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:false});  this.setState({V_Export:true}); this.setState({V_PDF:false}); }}
                                        >
                                            <Text style={styles.tabHeadingTxt}>EXPORT</Text>
                                            {/* {this.state.tabIndex == 2 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ marginLeft:3, paddingHorizontal:20, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:false});  this.setState({V_Export:false}); this.setState({V_PDF:true}); }}
                                        >
                                            <Text style={styles.tabHeadingTxt}>PDF</Text>
                                            {/* {this.state.tabIndex == 2 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>
                                    </View>
                            </View> 


               
        {renderIf(this.state.V_VEHICLEDETAIL)(


             <ScrollView>
 
    {/* <Text style={styles.appDetailTitle}>{vehicleObj.tabTitle}</Text> */}

         <View
    
         style={ { width: deviceWidth, backgroundColor: AppColors.white, marginBottom: 7,   marginBottom: 5, borderRadius: 10, padding: 10 }}
           >
         <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            


             <View style={styles.detailMainViewStyle}>
                <Text style={styles.detailHeadingTxtStyle}>YEAR </Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.year}</Text>
             </View>



<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>MAKE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.make}</Text>
</View>


<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>MODEL </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.model}</Text>
</View>


<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>VIN </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.vin}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>KEYS </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.keys}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>COLORS </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.color}</Text>
</View>



<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>LOT NO </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.lot_number}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>BUYER NO </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.buyer_id}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TOWING REQUEST </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.towing_request_date}</Text>
</View>









<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>PICK UP DATE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.pickup_date}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>DELIVERY DATE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.deliver_date}</Text>
</View>


<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TOW FROM  </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.towed_from}</Text>
</View>

<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>TOW AMOUNT </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.towed_amount}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>STORAGE  </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.storage_amount}</Text>
</View>
<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TITLE </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.title_type_name}</Text>
</View>
<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}> TITLE AMOUNT </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.title_amount}</Text>
</View>
<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>LOCATION   </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.location}</Text>
</View>

<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginBottom:25}}><Text style={styles.detailHeadingTxtStyle}>NOTE  </Text>
<Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.note}</Text>
</View>             
         </View>
         </View>
    
</ScrollView>
































        )}









        {renderIf(this.state.V_cr)(

     <ScrollView

>

<Elavation
      elevation={4}
      style={styles.dataChildViewElavationContainer}
  >
       <View style={{ paddingLeft: 10, paddingRight: 10 }}>
       <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>frontwindshield </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[2]}</Text>
         </View>
         <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>bonet </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[3]}</Text>
         </View>
         <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>grill</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[4]}</Text>
         </View>


       <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>front bumper </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[5]}</Text>
         </View>


           <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front HeadeLight </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[6]}</Text>
          </View>
         

           <View style={styles.detailMainViewStyle}>
               <Text style={styles.detailHeadingTxtStyle}>Rear WindShield </Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[7]}</Text>
       </View>


       <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>trunk Door </Text>
              <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[8]}</Text>
           </View>


   <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>rear Bumper</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[9]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>rear Bumper Support</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[10]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>tail lamp</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[11]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Front Left Fendar</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[12]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Front Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[13]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Rear Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[14]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Rear Fender</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[15]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Pillar</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[16]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>roof</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[17]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Rear Finder</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[18]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Rear Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[19]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Front Door</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[20]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front Right Fender</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[21]}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front tyres</Text>
               <Text style={styles.detailValueTxtStyle}>{this.state.vehicle_conditions[22]}</Text>
      </View>


       </View>
  </Elavation>
</ScrollView>

       )}











       {renderIf(this.state.V_Export)(

        <ScrollView
>
<View
   style={styles.dataChildViewElavationContainer}
>
   <View style={{ paddingLeft: 10, paddingRight: 10 }}>
   <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>status</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.status_name}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>loded Form</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.load_status}</Text>
  </View>

  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>export Date</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.export_date}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>eta</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.eta}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>BOOKING NO</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.booking_number}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>CONTAINER NO</Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.container_number}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>SIZE </Text>
           <Text style={styles.detailValueTxtStyle}>{this.state.vehicleDetail.arNo }</Text>
  </View>



  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>POL</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.destination }</Text>
  </View>


  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>POD</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.destination }</Text>
  </View>

  

 
   </View>
</View>
</ScrollView>

       )}









       {renderIf(this.state.V_PDF)(

<ScrollView
>
            {this.state.show ==  true ?   
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                        this.setState({show:false})
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{ flex:1,
                        width:Dimensions.get('window').width,
                        height:Dimensions.get('window').height,}}/>
                       :
                        <View style={{justifyContent:'center',height:deviceHeight*0.5, alignItems:'center', alignSelf:'center'}}>
                            <Text style={{alignSelf:'center'}}>No Invoice Found</Text>
                        </View>
                    } 
</ScrollView>

)}










                           





                        </View>
                    </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15 }}>No data found</Text>
                    </View>}




            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center',
    },
    screen:{

        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
     },
    detailHeadingTxtStyle: {
        fontSize: 14,
        color: AppColors.textColor, flex: 0.95,

    }, detailValueTxtStyle: {
        fontSize: 14,
        color: AppColors.textColor, flex: 1
    },
    dividerStyleView: {
        width: deviceWidth * 0.85, height: 1, backgroundColor: '#A9A9A9', marginTop: 8, marginBottom: 8
    },
    dataHeadingTxtStyle: {
        flex: 1,
        fontSize: 22,
        color: AppColors.textColor,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10
    },
    dataChildViewElavationContainer: {
        width: deviceWidth,
        backgroundColor: AppColors.white,
        marginBottom: 7,
    
        borderRadius: 10,
        padding: 10
    },
    tabHeadingTxt: {
        color: AppColors.Signincolor,
        fontSize: 15, textAlign: 'center'
    }, tabDividerStyle: {
        width: deviceWidth * 0.3,
        position: 'absolute',
        bottom: 0,
        height: 4, marginBottom: -1,
        backgroundColor: AppColors.white
    },
    appDetailTitle: {
        flex: 1,
        fontSize: 15,
        color: AppColors.textColor,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'center'
    }
})

export default VehcilContainerDetailScreen;