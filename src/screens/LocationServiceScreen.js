import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground,TextInput, StyleSheet, BackHandler, Easing, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppMainStylesSheet from '../styles/AppMainStylesSheet';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import DialogLoader from './DialogLoder';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';


class LocationServiceScreen extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  

        this.state = {
            isLoading: false,
            saveYadData: []
          
        }
    }


  


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    handleBackButtonClick() {
       
        this.props.navigation.goBack(null);
        return true;
      }
   
  /*  callingYardAPI = () => {
        this.setState({ isLoading: true })
        let url = AppUrlCollection.GET_YARD
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.text())
            .then((responseJson) => {
                console.log('Invocie ::', responseJson)
                if (responseJson != undefined && responseJson != null && responseJson != '') {
                    let value = responseJson.replace(/<\/?[^>]+(>|$\n)/g, '')
                    let newVal = JSON.parse(value)
                    this.setState({ isLoading: false })
                    this.setState({ saveYadData: newVal })
                    console.log('Invocie dadasdasdd::', JSON.parse(value))
                } else {

                }

                // if (responseJson.length > 0) {
                //     this.setState({ saveYadData: responseJson })
                // } else {
                //     this.setState({ saveYadData: [] })
                //     AppConstance.showSnackbarMessage('Data not found')
                // }
            })
            .catch((error) => {
                console.warn(error)
            });
    }*/
   

    renderYardCell = ({ item, index }) => {
        return (
            <View>
                <Text style={[styles.addressTextStyle, { marginBottom: 5,  fontSize: 16 }]}>{item.title}</Text>
                <Elavation
                    elevation={3}
                    style={styles.appHeaderElavationStyle}
                >
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='map-marker-circle'  size={21} />
                        <Text style={styles.addressTextStyle}>{item.address}</Text>
                    </View>
                    <View style={styles.addressDividerStyle} />
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='email-outline'  size={21} />
                        <Text style={styles.addressTextStyle}>{item.email}</Text>
                    </View>
                    <View style={styles.addressDividerStyle} />
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='phone'size={21} />
                        <Text style={styles.addressTextStyle}>{item.phone}</Text>
                    </View>

                </Elavation>
                <View style={{ marginTop: 25 }} />
            </View>

        );
    }

    render() {
        return (
            <SafeAreaView style={AppMainStylesSheet.appMainContainer}>
                     


<Appbar
                            style={{backgroundColor:AppColors.Headercolor,
                        flexDirection:'row',
                        width:deviceWidth,
                        backgroundColor:'white',
                            justifyContent:'space-between',
                            padding:10,

                        }}
                        >  


        <TouchableOpacity 
                    style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
                                  onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
                    <Image source={ require('../Images/logo_final.png')} 
                    style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
                />
                </TouchableOpacity>
                
                
          
           <TouchableOpacity style={{
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            
            onPress={() => {
                this.props.navigation.openDrawer();

                // this.props.navigation.dispatch(DrawerActions.openDrawer());

                // this.props.navigation.navigate('RightDrawer')
            }}
            >
                 <Image source={ require('../Images/baru.jpg')} 
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
                           </Appbar>


               
               
                <DialogLoader loading={this.state.isLoading} />

                <ScrollView>

                <Image
                        source={require('../Images/location.png')}
                          style={{width:"100%", alignSelf:'center', 
                           height:85
                        ,}}
                        />
               <ImageBackground 
                  style={{flex:1,
                    width: null,
                    height: null,
                    resizeMode:'contain',
marginHorizontal:10                  
                  
                } }

               
                 source={require('../Images/backgroundimage4.png')}
                >




          
<Text style={{fontSize:16, marginTop:18,fontWeight:'600', marginBottom:5, marginLeft:0,}}>{`\u2022 AMAYA SHIPPING LINE LLC,DUBAI`}</Text>
               
               <View style={{marginHorizontal:0,borderRadius:7,borderWidth:0.7, marginHorizontal:5, borderColor:'grey', paddingHorizontal:7,paddingVertical:5}}>
               
               <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
                           {/* <MaterialCommunityIcons
                             style={{alignSelf: 'center'}}
                             name="map-marker"
                             size={26}
                             color={AppColors.textColor}
                           /> */}
                                 <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:30,height:30}}
                          source={require('../Images/phonelocation2.png')}></Image>
                           <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               width:'85%',
                               marginLeft: 5,
                               
                             }}>
Office No: 1207, Block – A, Centurion Star, Port Saeed, Opp. Deira City Center, Near Flora Creek Hotel, Deira, P.O. Box: 172497, Dubai               </Text>
                         </View>
                         <View style={{flexDirection: 'row',marginLeft:0, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                          
                         <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:37,height:37}}
                          source={require('../Images/timelocation2.png')}></Image>
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
              MON – FRI     9:00 AM - 6:00 PM
                      </Text>
               
                      <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
               
                             }}>
                  Sat:                 9:00 AM - 2:00 PM
                        </Text>
                      </View>
                         </View>


                         
                         <View style={{flexDirection: 'row',marginLeft:3, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
              
                       <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:35,height:35}}
                          source={require('../Images/phonelocation3.png')}></Image>
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                             }}>
               +971-4-224-9714
                      </Text>
               
                      <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                               marginTop:2,

                             }}>
               +971-4-224-1592
                      </Text>
                      </View>
                         </View>

                         <View style={{flexDirection: 'row',marginLeft:6, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                        
                        <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:30,height:30}}
                          source={require('../Images/emaillocation2.png')}></Image>
                         <View style={{flexDirection:'column',marginLeft:0, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                               marginTop:2,
                             }}>
               Cservice @aslshippingline.com
                      </Text>
               
                      <Text
                             style={{
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
              Sales @aslshippingline.com
                      </Text>
                      </View>
                         </View>
                        
                      
                        
                       </View>
               
               
               </ImageBackground>
                       
                       

                       <Text style={{ fontSize:14,marginTop:15,fontWeight:'600', marginBottom:5, marginLeft:10,}}>{`\u2022 New Jersey (NJ), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 Houston (TX), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 Savannah (GA), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 BALTIMORE, USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 California (CA), USA`}</Text>
                       <Text style={{ fontSize:14,marginTop:5,marginBottom:5,fontWeight:'600', marginLeft:10,}}>{`\u2022 Amaya used cars TR, Sharjah-UAE`}</Text>


                               </ScrollView>
               
                           </SafeAreaView>
                       );
                   }
               }
               
               const styles = StyleSheet.create({
                   addressTxtHeader: {
                        color: AppColors.textColor,
                       fontSize: 15, height: 80, textAlign: 'center', textAlignVertical: 'center'
                   },
                   appHeaderElavationStyle: {
                       width: deviceWidth * 0.9,
                       paddingLeft: 15, paddingRight: 15,
                       borderRadius: 10, marginBottom:200,
                   },
                   appHeaderEmailmainViewStyle: {
                       flexDirection: 'row',
                       paddingTop: 15, paddingBottom: 15,
                       alignContent: 'center',
                       alignItems: 'center'
                   },
                   addressTextStyle: {
                       
                       fontSize: 15, color: AppColors.textColor,
                       marginLeft: 8
                   },
                   addressDividerStyle: {
                       width: deviceWidth * 0.80,
                       height: 0.5, backgroundColor: AppColors.toolbarColor,
                       alignContent: 'center', alignItems: 'center',
                       justifyContent: 'center', alignSelf: 'center'
                   }
               })
               
               export default LocationServiceScreen;
               