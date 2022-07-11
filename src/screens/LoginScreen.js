import React, { Component,useEffect, useState } from 'react';
import { View, Text,Modal, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
// import DeviceInfo from 'react-native-device-info';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DialogLoder from '../screens/DialogLoder'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { Appbar } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";



  




  
const LoginScreen = ({ navigation }) => {

    // const [email ,setemail] = useState('nooraljabal1133@gmail.com')
    // const [email ,setemail] = useState('uneeb@impulsiontechnologies.com')
    const [email ,setemail] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    // const [pass ,setpass] =useState('info@asl1001')
    // const [pass ,setpass] =useState('Admin@123')
    const [pass ,setpass] =useState('')
  
    const [spinner , setspinner] =useState(false)

    useEffect(() => {




      const backAction = () => {
        BackHandler.exitApp() 
        
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);

    
   
   const  callingLoginApi = () => {
    NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
  setspinner(true)
      if (email.trim().length == 0) {
  
      alert('username can not be blank'); 
      setspinner(false)
  
      } else if (pass.trim().length == 0) {
          alert("password can not be blank"); 
          setspinner(false)
  
      } 
      
      else {
       
                  var url = AppUrlCollection.LOGIN
                 var  token =AppConstance.USER_TOKEN;
                  let value = {};
                  value.email = email,
                  value.password = pass,
                  value.source = 'asl_phone_app';
                  value.device_id_token = token;
                  console.log('Login_key_vale ',JSON.stringify(value))
                  fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type':   'application/json',
                      },
                      body: JSON.stringify(value),
                  })
                      .then((response) =>  response.json() )
                      .then((responseJson) => {
                          if(responseJson.status == 200){
                            console.log('login data response',responseJson);
                         loginServiceCall( responseJson , responseJson.user.role, responseJson.user.username, responseJson.user.role_name, responseJson.user.photo)

                          }else if(responseJson.status == 422){
                            alert(responseJson.errors.password)
                          }else if(responseJson.status == 401){
                            alert(responseJson.error)
                          }
                      console.log('login data response',responseJson);
                      setspinner(false)  
                      })
                      .catch((error) => {
                        setspinner(false)
                        alert(error)
                          console.warn(error)
                      });
      }
    } else setModalVisible(true);
});
  }
  
  
  const loginServiceCall = (responseJson, role, username, rolename, userprofilepic) => {
    console.warn(responseJson)
  
     if (responseJson != null || responseJson != '') {
  
     AppConstance.IS_USER_LOGIN='1';
        // this.props.navigation.push('Dashboard');
        
        //AppConstance.showSnackbarMessage(responseJson.message)
      callingUserService(responseJson.access_token, role, username, rolename, userprofilepic)
    } else {
         setspinner(false)
        alert(responseJson.message);
    }
  }
  
  const GotoNextScreen  =async  (responseJson,auth_key, role,username, rolename, userprofilepic) => {
    await AsyncStorage.setItem(AppConstance.USER_INFO_OBJ, JSON.stringify(responseJson))
   await  AsyncStorage.setItem('ISUSERLOGIN', '1')
   await  AsyncStorage.setItem('auth_key', auth_key)

   AppConstance.AUTH_KEY = auth_key;


   await AsyncStorage.setItem('username', username)
   await AsyncStorage.setItem('rolename', rolename)
   await AsyncStorage.setItem('userprofilepic',userprofilepic )

   AppConstance.USERNAME = username;
   AppConstance.ROLENAME = rolename;
   AppConstance.USERPHOTO = userprofilepic;
   
//0 for Master Admin

// 1 for Super Admin

// 2  ADMIN

// 3 CUSTOMER 

// 4 EMPLOYYYE 

// 5 ACCOUNT 

   console.log();
   if(role == "2" || role == '0' || role == '1'){
    // if(role_name == "Admin" || role_name == 'MASTER ADMIN' || role_name == 'SUPER_ADMIN'){

    await AsyncStorage.setItem('user_role', '1')
    AppConstance.USER_ROLE = '1'
    // alert(role)

    }else{
    await AsyncStorage.setItem('user_role',  '0')
    // alert('--no---'+role)

    AppConstance.USER_ROLE = '0'

}
 
   AppConstance.USER_TOKEN_KEY = auth_key;
   let userid = responseJson.id;
   userid = userid.toString();
   await  AsyncStorage.setItem('user_id', userid)

   AppConstance.IS_USER_LOGIN = '1'
  //  this._storeData();
  
    

    let data = responseJson
    console.warn('json value', data)
    AppConstance.USER_INFO.USER_ID = data.id;
    AppConstance.USER_INFO.USER_NAME = data.username;
    AppConstance.USER_INFO.USER_TOKEN = auth_key;
    AppConstance.USER_INFO.USER_EMAIL = data.email;
    AppConstance.USER_INFO.USER_STATUS = data.status;
    AppConstance.USER_INFO.USER_DELETED = data.is_deleted;
    AppConstance.USER_INFO.USER_ADDRESS1 = data.address_line_1;
    AppConstance.USER_INFO.USER_ADDRESS2 = data.address_line_2;
    AppConstance.USER_INFO.USER_CITY = data.city;
    AppConstance.USER_INFO.USER_STATE = data.state;
    AppConstance.USER_INFO.USER_ZIP_CODE = data.zip_code;
    AppConstance.USER_INFO.USER_MOBILE = data.phone;
    AppConstance.USER_INFO.USER_FAX = data.fax;
    AppConstance.USER_INFO.USER_CUSTOMER_NAME = data.customer_name;
    AppConstance.USER_INFO.USER_IS_BLOCK = data.is_blocked;
    setspinner(false)

    navigation.navigate('TabScreen')
    // navigation.navigate('DashboardScreen')

  
  }
  
  const callingUserService = (authKey, role, username,rolename,userprofilepic) => {
    var url = AppUrlCollection.USER;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + authKey,
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
          
            console.warn('USER::: ', responseJson)
  
            GotoNextScreen(responseJson,authKey, role, username, rolename, userprofilepic);
  
            // //this.props.navigation.goBack();
            // this.props.navigation.navigate('NavigationSideScreen')
        })
        .catch((error) => {
             setspinner(false)
            // this.setState({ isLoading: false })
            console.warn(error)
        });
  }
  
  
  
  
  
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white', width:deviceWidth}}>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Connect to the Internet and Retry
            </Text>
            <View style={styles.modalBtn}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  callingLoginApi();
                }}
              >
                <Text style={styles.textStyle}>Retry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
                <DialogLoder loading={spinner} />
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
                                        //   onPress={() => this.props.navigation.navigate('LoginScreen')}
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
                        navigation.openDrawer();
        
                        // this.props.navigation.dispatch(DrawerActions.openDrawer());
        
                        // this.props.navigation.navigate('RightDrawer')
                    }}
                    >
                         <Image source={ require('../Images/baru.jpg')} 
                    style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
                   />
                     </TouchableOpacity>
                                   </Appbar>
        
        
        
                <ScrollView>
                    
                    
                 
        
                    
                    
                    
                    
                    <View style={{ flex: 1, backgroundColor: AppColors.white, height: deviceHeight }}>
                        {/* <DialogLoder loading={this.state.isLoading} /> */}
                        
        
        
        
                                <ImageBackground style={{  flex: 1,
            resizeMode: 'cover',} } 
                         resizeMode='cover' 
                         source={require('../Images/dubia.jpg')}>
                 
        
                      
        
                        <View 
                                            style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}
                        >
        
                            <Elavation
                             
                                elevation={3}
                                style={{   backgroundColor:AppColors.bg,marginBottom: 3, paddingTop: 8, paddingBottom: 8, borderRadius: 15, marginTop: 102 }}
                            >
        
                     <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 50, borderRadius: 20, paddingLeft: 10 }}>
                                    <Text
                                        style={{ width: deviceWidth * 0.8, height: 50,fontSize:22,fontWeight: "bold", color:AppColors.Signincolor, marginTop:13,paddingLeft: 10 }}
                                    >Sign in </Text>
                                </View>
        
        
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 50, borderRadius: 20, paddingLeft: 10 }}>
                                    <TextInput
                                        style={{ width: deviceWidth * 0.8, height: 50, color: '#323232', paddingLeft: 10 }}
                                        placeholder='Username or Email'
                                        placeholderTextColor={AppColors.signinplaceholdercolor}
                                        onChangeText={(text) => {setemail(text) }}

                                    />
                                </View>
        
                                <View style={{ width: deviceWidth * 0.8, height: 1, paddingHorizontal:20, backgroundColor: AppColors.signindivider, alignSelf: 'center', marginTop: 5}} />
        
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 50, borderRadius: 20, paddingLeft: 10 }}>
                                    <TextInput
                                        style={{ width: deviceWidth * 0.8, height: 50, color: '#323232', paddingLeft: 10 }}
                                        placeholder='Password'
                                        placeholderTextColor={AppColors.signinplaceholdercolor}                                secureTextEntry={true}
                                        onChangeText={(text) =>  setpass(text)}
                                        />
                                </View>
                                <View style={{ width: deviceWidth * 0.8, height: 20, paddingHorizontal:20, alignSelf: 'center', marginTop: 5, marginBottom: 5 }} />
        
                            </Elavation>
        
                            <TouchableOpacity
                       
                            
                            style={{ width: deviceWidth * 0.81, height: 45, justifyContent: 'center',  marginTop: 8 }}
                                onPress={() => callingLoginApi()}
                            >
                            <Image
                            style={{ width: deviceWidth * 0.8, height: 45, justifyContent: 'center', borderRadius: 50, marginTop: 25 }}
                                           source={ require('../Images/picture2.png')} 
        ></Image>
                                {/* <Text style={{ color: AppColors.white, fontFamily: AppFonts.SourceSansProBold, textAlign: 'center', textAlignVertical: 'center', fontSize: 16 }}>LOG IN</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 1,  marginTop: 10,color: AppColors.blue }}
                                onPress={() => navigation.navigate('ForgotPasswordScreen')}
                            >
                                <Text style={{ color: AppColors.white, marginBottom: 20, fontSize: 15, marginTop: 10, justifyContent: 'center', paddingRight: 10 }}>Forgot Password?</Text>
                            </TouchableOpacity>
        
                        </View>
        
        
                        </ImageBackground>
        
                    </View>
                </ScrollView>
                </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin: 5,
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    modalBtn: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });

  
  export default LoginScreen;
