import React, { Component } from 'react';
import {  SafeAreaView, Modal, View, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, BackHandler,  ScrollView, TextInput, ActivityIndicator } from 'react-native'

import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../styles/ResponsiveScreen';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';


let v = []
let allInvoiceList = []
let tabp
const numColumns = 2
class UnPaid extends Component {
    constructor(props) {
        super(props)

   
        this.state = {
            user_id: props.route.params,

            tabIndex: 0,
            drawerview:false,

            item_id:0,
            allInvoiceList: [],
            unpaidInvoiceList: [],
            paidInvoiceList: [],
            isLoading: false,
            paymentHistoryList: [],
            balancePrice: 0,

            allPagination: 1,
            unPaidPage: 1,
            paidPage: 1,
            paymentHistorypage: 1,

            allPageServiceCallStop: false,
            allFooterCalling: false,

            unPaidServiceCallStop: false,
            unPaidFooterCalling: false,

            paidServiceCallStop: false,
            paidFooterCalling: false,

            paymentHisServiceCallStop: false,
            paymentHisFooterCalling: false
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
componentDidMount = () => {
    this.callingInvoceAPI11()
//   alert(AppConstance.USER_TOKEN_KEY)
}


renderInvoiceContent = ({ item }) => {
    
    
    return <Elavation
        elevation={2}
        style={{  borderColor:'black',borderRadius:18, borderWidth:0.7, paddingHorizontal:10, width: '45%', flexDirection:'column', margin: 10, backgroundColor: 'white',  }}
    >
        <TouchableOpacity style={{marginTop:5,  width: deviceWidth * 0.37, height: 100 }}
        >
            {/* {item.vehicle.image != null && item.vehicle.image.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                source={{ uri: item.vehicle.image[0].image }} /> : */}
                <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} resizeMode='contain' />
                {/* } */}

        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
            onPress={() => this.props.navigation.navigate('InvoiceDetailsScreen', { 'invoceObj': item, 'isCallingAccountScreen': true })}
        >
            <Text style={{
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
            }}>
                {item.id != '' ? 'Invoice ID # ' + item.id : '-'}</Text>
            <Text style={{
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
            }}>{item.status_name != '' && item.status_name != null ? 'Status : ' + item.status_name : 'Status : - '}</Text>
            <Text style={{ marginBottom:5,
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green',
                fontSize: 12
            }}>{item.total_amount != ' ' && item.total_amount != null ? 'Total Amount : ' + item.total_amount : 'Total Amount : - '}</Text>
        </TouchableOpacity>
    </Elavation>
}

loadMoreDataAll = () => {
    setTimeout(() => {
        if (this.state.allPageServiceCallStop) {
        } else {
            if (this.state.noMoreDataFound) {
            } else {
                this.setState({ allPagination: this.state.allPagination + 1 }, () => this.callingAllInvoceAPI())
            }
        }
    }, 100)
}

renderFooterUnpaid = () => {
    if (this.state.unPaidServiceCallStop) {
        return null;
    } else {
        return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
    }
}





generateFlatList = () => {
    if (this.state.allInvoiceList.length > 0) {
        if (this.state.allInvoiceList.length > 0) {
        
            return <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.allInvoiceList}
                    renderItem={this.renderInvoiceContent}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                //    ListFooterComponent={this.renderFooterUnpaid}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
        //            onEndReached={this.loadMoreDataAll}
                    // onEndThreshold={0}
                    onEndReachedThreshold={0.5}
                />
            </View>
        } else {
            return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{  color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
            </View>
        }
    }
    
}

callingInvoceAPI11 = () => {

  let  url = AppUrlCollection.INVOICE_UNPAID + 'customer_user_id=' + this.state.user_id
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AppConstance.USER_TOKEN_KEY,
    },
})
    .then((response) => response.json())
    .then((responseJson) => {
       
        if (responseJson.data != null || responseJson.data != '') {
            console.log(responseJson);
            this.setState({ allInvoiceList: responseJson.data, isLoading: false })
        } else {
            AppConstance.showSnackbarMessage(responseJson.message)
            this.setState({ isLoading: false })
        }
    })
    .catch((error) => {
        console.warn(error)
    });
  
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



                <Image
                    source={require('../Images/account-1.jpg')}
                      style={{ alignSelf:'center', resizeMode:'contain',
                       height:76,}}
                    />
    <View style={{width:deviceWidth}}> 

            <FlatList
                    contentContainerStyle={{alignSelf:'center', }}
                    data={this.state.allInvoiceList}
                    renderItem={this.renderInvoiceContent}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                    onEndReachedThreshold={0.5}
                />

                </View>
                {/* {this.generateFlatList()} */}


            {/* {this.generateFlatList()} */}


            {/* <View style={{ flex: 1 }}>
            <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.allInvoiceList}
                    renderItem={this.renderInvoiceContent}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                    extraData={this.state}
                    ListFooterComponent={this.renderFooterAll}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                    onEndReached={this.loadMoreDataAll}
                    // onEndThreshold={0.1}
                    onEndReachedThreshold={0.5}
                />
                                    {this.generateFlatList()}
            </View> */}
        </SafeAreaView>
    );
}
}

const styles = StyleSheet.create({
    dividerViewStyle: {
        width: deviceWidth,
        height: 0.5,
        backgroundColor: AppColors.te
    },
    screen:{
    
        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
     },
    actionMainElavationStyle: {
        width: wp('45%'), height: hp('15%'), borderRadius: 3, borderColor: AppColors.toolbarColor, borderWidth: 0,
        marginTop: hp('1.0%'),
        marginBottom: hp('0.5%'), marginLeft: '1.5%', marginRight: '1.5%',
    },
    imageIconStyle: {
        width: 30, height: 30
    },
    headingTxtStyle: {
        color: AppColors.Signincolor,
        fontSize: 15, paddingTop: 11,
    },
    searchElavationStyle: {
        height: 50, flex: 0.8,
        borderRadius: 10,
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'center'
    },
    searchElvationViewStyle: {
        flexDirection: 'row', flex: 1,
        alignContent: 'center', alignItems: 'center',
        paddingLeft: 5, marginLeft: 5,
        marginRight: 5, paddingRight: 5
    },
    searchTxtInputStyle: {
        flex: 1,
        color: AppColors.toolbarColor, fontSize: 18,
    },
    detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1, width: deviceWidth * 0.85,
        alignContent: 'center', alignItems: 'center', justifyContent: 'center'
    },
})

export default UnPaid;