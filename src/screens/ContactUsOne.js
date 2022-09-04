import React, {Component} from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, BackHandler, Easing, Image, ScrollView, AsyncStorage, NetInfo } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
 BackHandler,
  Easing,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Modal,
  Image,
} from 'react-native';
import AppConstance, {
  deviceHeight,
  deviceWidth, 
} from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AppColors from '../Colors/AppColors';
import AsyncStorage from '@react-native-community/async-storage';


class ContactUsOne extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      fulName: '',
      email: '',
      phone: '',
      message: '',
      drawerview:false,

    };
  }

  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  Logout =() => {

    AsyncStorage.setItem('ISUSERLOGIN', '0');
    AppConstance.IS_USER_LOGIN = '0'
  
    AsyncStorage.setItem('auth_key', ' ');
    AppConstance.USER_TOKEN_KEY = ' '
  
    AsyncStorage.setItem('user_id', '');
    AppConstance.USER_ID = ' '
  
    AsyncStorage.setItem('user_role' , '')
    AppConstance.USER_ROLE = ''
  
  
    AsyncStorage.setItem('username' , '')
    AppConstance.USERNAME = ''
  
    AsyncStorage.setItem('rolename' , '')
    AppConstance.ROLENAME = ''
  
    AsyncStorage.setItem('userprofilepic' , '')
    AppConstance.USERPHOTO = ''
    
    AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);
         this.setState({drawerview : false})
    this.props.navigation.navigate('AppDrawer1');
  
      }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
   
    this.props.navigation.goBack();
    return true;
  }


  sendContactUsData = () => {
    if (this.state.fulName.trim().length == 0) {
      alert('dont leave it blank');
    } else if (this.state.email.trim().length == 0) {
      alert('dont leave it blank');
    } else if (this.state.phone.trim().length == 0) {
      alert('dont leave it blank');
    } else if (this.state.message.trim().length == 0) {
      alert('dont leave it blank');
    } else {
      
          var formData = new FormData();
          formData.append('name', this.state.fulName);
          formData.append('email', this.state.email);
          formData.append('phone', this.state.phone);
          formData.append('message', this.state.message);

          fetch(AppUrlCollection.CONTACT_US, {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
            body: formData,
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log('Contact Us Resposne :: ', responseJson);
            })
            .catch((error) => {
              console.warn(error);
            });
       
  
    }
  };

  

  render() {
    return (
      <SafeAreaView style={{

        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
   }}>

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
                    {/* <Image  source={require('../Images/home-icon-23.png')}
                    style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                /> */}
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


<ImageBackground source={ require('../Images/image.png')} 
            style={{ width: "104%", height:130,justifyContent:'center'  }} 
           >
               <Image 
                           style={{ width: '50%',alignSelf:'center', height:'50%',  }}
                        
                           resizeMethod='resize'
                           resizeMode='contain' 

               source={{ uri:AppConstance.USERPHOTO }}

           
               />
               <Text style={{alignSelf:'center',marginTop:5, fontSize:15, color:'white'}}>{AppConstance.USERNAME}</Text>
               <Text style={{alignSelf:'center',fontSize:13, color:'white'}}>{AppConstance.ROLENAME}</Text>
               </ImageBackground>
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
onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('Notification')}} selected>
<Image source={ require('../Images/ann.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>ANNOUNCEMENT </Text>        
<View style={{backgroundColor:'grey',padding:0,paddingHorizontal:8, borderRadius:10,}}>
    <Text style={{color:'white', fontSize:12}}>{AppConstance.NOTIFICATIONCOUNTER}</Text>
</View>
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


                 <Appbar
                            style={{
                              
                              backgroundColor:AppColors.Headercolor,
                        flexDirection:'row',
                        width:deviceWidth,
                        justifyContent:'space-between',
                            padding:10,
                            elevation:0,

                        }}
                        >  


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
                                  onPress={() => this.props.navigation.navigate('DashboardScreen')}
        >
                    <Image source={ require('../Images/logo_final.png')} 
                    style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
                />
                </TouchableOpacity>


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"center", alignItems:"center", justifyContent:'center'}}
                                //   onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                    {/* <Image  source={require('../Images/home-icon-23.png')}
                    style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
                /> */}
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




                           <Image
                        source={require('../Images/Capturesfdsdf.png')}
                          style={{ alignSelf:'center', resizeMode:'contain',
                           height:76,}}
                        />
        {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='cover' style={{ width: deviceWidth, height: deviceHeight * 0.95, position: 'absolute' }} /> */}
                


        <View style={{flex: 1}}>
          



        <View style={{flexDirection: 'row',  backgroundColor: '#ccd1d1',
 paddingHorizontal:9, paddingTop: 8, paddingBottom: 8}}>
          
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 5,
              }}>We provides 24/7 assistance to our customer.
For sales,auction account towing,loading and shipping,please contact us</Text>
          </View>



          <View style={{flexDirection: 'row',marginHorizontal:10,marginTop: 10, marginBottom: 10}}>
            <MaterialCommunityIcons
              style={{alignSelf: 'center'}}
              name="map-marker"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 4,
              }}>
1207 12th Floor,Centurion Star Tower,Block A,Opp Deira City Center,Port Saeed,Po Box 172497,Dubai,United Arab Emirates</Text>
          </View>





          <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
           
           <Image 
           style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/wall-clock.png')}></Image>

           
            
          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 15,
              }}>
Mon-Thur      9.00 am - 6.00 pm
       </Text>

       <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft: 15,

              }}>
Sat:                9.00 am - 2.00 pm 
       </Text>
       </View>
          </View>



          <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
          <Image 
           style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/telephone.png')}></Image>

          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 18,
                marginLeft:15,
              }}>
+971-4-224-9714
       </Text>

       <Text
              style={{
                color: AppColors.textColor,
                fontSize: 18,
                marginLeft: 15,
              }}>
+971-4-224-9715
       </Text>
       </View>
          </View>














          <View style={{flexDirection: 'row',marginVertical:5,marginLeft:10,marginHorizontal:5,marginTop: 8, marginBottom: 13}}>
            <MaterialCommunityIcons
              style={{ marginLeft:5, alignSelf: 'center'}}
              name="fax"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 16,
                marginLeft:15,
              }}>
+971-4-224-9718
</Text>
          </View>



          <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
            <MaterialCommunityIcons
              name="email-outline"
              style={{marginLeft:5}}
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                color: AppColors.textColor,
                fontSize: 18,
                marginLeft: 15,
              }}>
24seven@aslshippingline.com</Text>
          </View>

         
        </View>
      </SafeAreaView>
    );
  }
}
export default ContactUsOne;