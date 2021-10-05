import React, { Component } from 'react';
import { View, Text, Modal,TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Image, Alert, AppState, BackHandler, BackAndroid, ScrollView, FlatList,ImageBackground, SafeAreaView } from 'react-native';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../styles/ResponsiveScreen';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

// import { Icon } from 'react-native-vector-icons/Icon';


class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            all: 0,
            onHand: 0,
            manifest: 0,
            pickUp: 0,
            carOnTheWay: 0,
            newPurchase: 0,
            drawerview:false,
            shipped: 0,
            role:AppConstance.USER_ROLE,
            arrived: 0,
            allContainer:0,
            dashboardSection: [
                {
                    id: 1,
                    name: 'All Vehicle',
                    icon: require('../Images/vehicle_icon_black.png'),
                    number: 2
                },
                {
                    id: 2,
                    name: 'New Purchased',
                    icon: require('../Images/vehicle_icon_black.png'),
                    number: 2
                },
                {
                    id: 3,
                    name: 'On Hand',
                    icon: require('../Images/car_onhand.png'),
                    number: 2
                },
                {
                    id: 4,
                    name: 'Ready to Ship',
                    icon: require('../Images/ready_for_rent_icon.png'),
                    number: 3
                },

                {
                    id: 5,
                    name: 'On the way',
                    icon: require('../Images/tow_truck.png'),
                    number: 2
                },
                {
                    id: 6,
                    name: 'Arrived',
                    icon: require('../Images/google_map_marker.png'),
                    number: 2
                }, {
                    id: 7,
                    name: 'Container',
                    icon: require('../Images/container_left_menu_icon.png'),
                    number: 2
                }, {
                    id: 8,
                    name: 'Accounting',
                    icon: require('../Images/accounting_icon.png'),
                    number: 5
                }
            ]
        }
      alert(AppConstance.USER_ROLE)
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


  AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);
       this.setState({drawerview : false})
  this.props.navigation.navigate('AppDrawer1');

    }
    //render dashboard backicon 
    dashboardiconUI = (item, index) => {
        if (index == 0) {
            return <Image source={item.icon} style={{ width: 60, height: 48, alignSelf: 'center' }} resizeMode='contain' />
        } if (index == 2) {
            return <Image source={item.icon} style={{ width: 60, height: 49, alignSelf: 'center' }} resizeMode='contain' />
        } if (index == 3) {
            return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='cover' />
        }
        if (index == 5) {
            return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        }
        else {
            return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        }
        // if (index == 0) {
        //     return <Image source={item.icon} style={{ width: 60, height: 48, alignSelf: 'center' }} resizeMode='contain' />
        // } if (index == 2) {
        //     return <Image source={item.icon} style={{ width: 60, height: 49, alignSelf: 'center' }} resizeMode='contain' />
        // } if (index == 3) {
        //     return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        // }
        // if (index == 5) {
        //     return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        // }
        // else {
        //     return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        // }
    }

    callingDashbard = (item) => {
        if (item.id == 7) {
            this.props.setProps.navigation.push('ExportListScreen', { 'itemObj': item })
        } else if (item.id == 8) {
            this.props.setProps.navigation.push('AccountListScreen')
        } else if (item.id == 1) {
            this.props.setProps.navigation.push('VehcileScreen', { 'itemObj': item, 'setProps': this.props.setProps });
        } else {
            //https://erp.gwwshipping.com/webapi/vehicle?page=1&location=1&search_str=&status=0
            this.props.setProps.navigation.push('VehcileScreen', { 'itemObj': item, 'setProps': this.props.setProps })
        }
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AppState.addEventListener('change', this._handleAppStateChange);

        this.callingCounterAPI();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    callingCounterAPI = () => {
        fetch(AppUrlCollection.GET_COUNTER, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                console.log('Load more data :: ', responseJson)
                if (responseJson != '' || responseJson != null) {


                    for (var i =0 ; i< responseJson.status_overview.length ; i++){
                        let element = responseJson.status_overview[i].status
                        console.log(element);
                        switch(element) {
 
                            // case 0:
                            //   this.setState({all : responseJson.status_overview[i].total})
                            //   break;
                            
                            case 3:
                                this.setState({carOnTheWay : responseJson.status_overview[i].total})
                                break;
                       
                            case 1:
                                this.setState({onHand : responseJson.status_overview[i].total})
                              break;
                       
                            case 2:
                                this.setState({manifest : responseJson.status_overview[i].total})
                              break;

                              case 5:
                                this.setState({pickUp : responseJson.status_overview[i].total})
                              break;

                              case 4:
                                this.setState({shipped : responseJson.status_overview[i].total})
                              break;

                              case 6:
                                this.setState({arrived : responseJson.status_overview[i].total})
                              break;
                       
                            default:
                          
                            }
    
                    }

                  


                   
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            console.log('App has come to the foreground!');
        }
        this.setState({ appState: nextAppState });
        console.log('APPP STATE ::: ', this.state.appState)
    };


    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        BackHandler.exitApp();
        return true;
    }


    henlo=()=>{
        alert("henlo")
    }

    dahboardCounter = (item, index) => {
        if (index == 0) {
            return <Text style={{  color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.all + ')'}</Text>
        } if (index == 1) {
            return <Text style={{  color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.newPurchase + ')'}</Text>
        } if (index == 2) {
            return <Text style={{ color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.onHand + ')'}</Text>
        } if (index == 3) {
            return <Text style={{  color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.shipped + ')'}</Text>
        } if (index == 4) {
            return <Text style={{  color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.carOnTheWay + ')'}</Text>
        } if (index == 5) {
            return <Text style={{  color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.arrived + ')'}</Text>
        }
        // if(index==6){
        //     return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.allContainer + ')'}</Text>
        // }

         
        
    }

    renderDashboard = ({ item, index }) => {
        return <TouchableOpacity
            onPress={() => this.callingDashbard(item)}
        >
            <Elavation
                elevation={5}
                style={{ width: wp('28%'), height: hp('19%'), borderRadius: 5, borderColor: AppColors.toolbarColor, borderWidth: 0, marginTop: hp('1.5%'), marginBottom: hp('1.5%'), marginLeft: '2.3%', marginRight: '2.3%', paddingTop: 16 }}
            >
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    {this.dashboardiconUI(item, index)}
                    <Text style={{  color: AppColors.black, fontSize: 14, paddingTop: 15, }}>{item.name}</Text>
                    {this.dahboardCounter(item, index)}

                    {/* <Text style={{ fontFamily: AppFonts.SourceSansProLight, color: AppColors.black, fontSize: 28,paddingTop:15,paddingLeft:25 }}>{item.number}</Text> */}
                    {/* {this.dashboardiconUI(item, index)} */}
                </View>
            </Elavation>
        </TouchableOpacity>
    }


    render() {
        return(
                



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
                                //   onPress={() => this.props.navigation.navigate('LoginScreen')}
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
            
            onPress={() => this.setState({drawerview:true})}         

            >
                 <Image source={ require('../Images/d-2.png')}
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
     
      </Appbar>



          <View 
          style={{ 
              marginTop:10,
            height:39,
        backgroundColor:AppColors.Headercolor,
flexDirection:'row',
justifyContent:"center",
        
        
        }}

          >
          <Image source={ require('../Images/d_preview_rev_1.png')} 
            style={{ width: 26, height:26, alignSelf: 'center' }} resizeMode='contain'
           />
              <Text  style={{marginTop:4, fontSize:16,color:AppColors.Signincolor,alignSelf:"center"
            
            }}>Dashboard</Text>
          </View>
         
          <ScrollView  style={{backgroundColor:'white'}}>


          <View style={styles.main_item}>

            <TouchableOpacity 
            onPress={()=> {this.props.navigation.navigate('VehicleList',{type:'5'})}}
            style={styles.item}>
                <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                PICKED UP
                </Text>
                <Image source={ require('../Images/car-2.jpg')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>
                    {this.state.pickUp}
                </Text>

            </TouchableOpacity>


            <TouchableOpacity
                        onPress={()=> {this.props.navigation.navigate('VehicleList',{type:'3'})}}

            style={styles.item}>
            <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                    ON THE WAY
                </Text>
                <Image source={ require('../Images/car-2.jpg')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>
           {this.state.carOnTheWay}

                </Text>

            </TouchableOpacity>

</View>



            <View style={styles.main_item}>

            <TouchableOpacity 
          onPress={()=> {this.props.navigation.navigate('VehicleList',{type:'1'})}}

            style={styles.item}>
            <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                    ON HAND
                </Text>
                <Image source={ require('../Images/onhand-3.jpg')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>
                    {this.state.onHand}
                </Text>

            </TouchableOpacity>


            <TouchableOpacity 
              onPress={()=> {this.props.navigation.navigate('VehicleList',{type:'2'})}}

            style={styles.item}>
            <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                    MANIFEST
                </Text>
                <Image source={ require('../Images/edit.png')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>
           {this.state.manifest}

                </Text>

            </TouchableOpacity>

            </View>



            <View style={styles.main_item}>

            <TouchableOpacity 
             onPress={()=> {this.props.navigation.navigate('VehicleList',{type:'4'})}}

            style={styles.item}>
            <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                    SHIPPED
                </Text>
                <Image source={ require('../Images/ship-2.png')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>
           {this.state.shipped}

                </Text>

            </TouchableOpacity>


            <TouchableOpacity
             onPress={()=> {this.props.navigation.navigate('VehicleList',{type:'6'})}}

            style={styles.item}>
            <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                   ARRIVED
                </Text>
                <Image source={ require('../Images/arrive.png')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>
           {this.state.arrived}

                </Text>

            </TouchableOpacity>

            </View>



            <View style={styles.main_item}>

            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Container1')}}
            style={styles.item}>
            <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                    CONTAINER
                </Text>
                <Image  source={ require('../Images/contain.png')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>

                </Text>

            </TouchableOpacity>


            <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('Accounts')}}

            style={styles.item}>
            <Text style={{alignSelf:'center' , color:AppColors.Signincolor}}>
                   ACCOUNTING
                </Text>
                <Image source={ require('../Images/upgraph.png')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
           <Text style={{color:'grey', alignSelf:'center'}}>
                    
                </Text>

            </TouchableOpacity>

            </View>

            {this.state.role == '1' ?
            <View style={styles.main_item}>

            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('TabScreen2')}}
            style={{
                backgroundColor:'white',
                borderWidth:0.8,
                borderColor:AppColors.Signincolor,
                width:'90%',
                padding:20,
                alignSelf:'center',
                marginBottom:10,
                borderRadius:10,
                }}>
            <Text style={{alignSelf:'center' ,fontSize:16, textAlign:'center', color:AppColors.Signincolor}}>
                    Custom
                
                </Text>
             
            </TouchableOpacity>

         


            

            </View>
             : null
            } 

</ScrollView>


     
     </SafeAreaView>
            
            
   )
       
}
   




}

export default DashboardScreen;

const styles = StyleSheet.create({


screen:{

   flex:1,
   height:deviceHeight,
   width:deviceWidth,
   backgroundColor:'white'
},
item:{
backgroundColor:'white',
borderWidth:0.8,
borderColor:AppColors.Signincolor,
width:'40%',
padding:20,
borderRadius:10,
},

main_item:{
    flexDirection:'row',
    width:'90%' ,
    marginTop:20, 
    alignSelf:'center', 
    justifyContent:'space-around',  
},


button:{

height:150,
width:150,
backgroundColor:'white',
borderColor:'white',
borderWidth:3,
padding:2,
marginTop:10,
marginBottom:10,
marginLeft:20,
marginRight:20,
padding:9,

},
txxt:{
color:'#228B22',
fontSize: 20 , 
paddingTop:2,
},

headertext:{
color:"green",
alignItems:'center',
justifyContent:'center',
fontSize:30,
fontWeight:'bold',
},
heading :{
marginLeft:70,
marginRight:70,
marginTop:20,
padding:8,
paddingEnd:2,

},

cardsview:{
flexDirection:"row",
alignContent:"space-between",
marginBottom:20,
marginTop:20,

},

cardsvieww:{

    flexDirection:"row-reverse",
    
        marginTop:20,
    
    },
textincards:{
fontSize:14,
color:'#17b9b7',
textAlign: 'center',
marginVertical:5,
},





})
