import React, { Component } from 'react';
import { View ,ScrollView, SafeAreaView, Modal, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ActivityIndicator, BackHandler } from 'react-native'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DialogLoader from './DialogLoder';
import { heightPercentageToDP } from '../styles/ResponsiveScreen';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { Appbar } from 'react-native-paper';
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';



var imageBasePath = ''
class ContainerTrackingOne extends Component {
    
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isDisplayView: 0,
            tabIndex: 0,
            selectFilterName: '',
            isModalVisible: false,
            searchLotNumber: '',
            isLoading: false,
            drawerview:false,

            locationList: [],
            vehicleList: [

            ],
            vehicleList2: [

            ],
            categoryList: [
                'New Purchase', 'On Hand', 'Ready to Ship', 'Car on the way', 'Arrived', ''
            ],
            isFooterLoading: false,
            refreshing: false,
            page: 1,
            isStopCallingAPI: false,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.callingContainerApi();
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
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
      }


      searchFilterFunction = (text) => {
        if (text) {
      
          const newData = this.state.vehicleList2.filter(
            function (item) {
              
              const itemData =  item.container_number
                ?  item.container_number.toUpperCase()
                :''.toUpperCase();
      
                const itemData2 =  item.lot_number
                ?  item.lot_number.toUpperCase()
                : ''.toUpperCase();
      
              const textData = text.toUpperCase();
      
              if(itemData.indexOf(textData) > -1){
                return  itemData.indexOf(textData) > -1;
              }else{
                return  itemData2.indexOf(textData) > -1;
              }
          });

          this.setState({vehicleList: newData})
        //   setFilteredDataSource(newData);

        //   setSearch(text);
          console.log('text is '+text);
        } else {
          // Inserted text is blank

          console.log('blank');
          this.setState({vehicleList: this.state.vehicleList2})
        //   setFilteredDataSource(data);
        //   setSearch(text);
        }
      };

    //Check internet connection
   

    callingVehicleContainerService = () => {
                this.ccallingLocationApi();
                this.setState({ isLoading: false })
                console.log('api calling ::', AppUrlCollection.CONTAINER_TRACKING + 'search=' + this.state.searchLotNumber + '&page=1')
                this.callingContainerApi(true)
            
         
        };



    //calling location api
    ccallingLocationApi = () => {
        fetch(AppUrlCollection.LOCATION2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ locationList: responseJson.data })
                } else {
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    callingVehicleDetailSCreen = (item) => {
        if (item.exportImages.length > 0) {
            this.props.navigation.navigate('ExportImageListScreen', { 'itemObj': item, 'baseImagePath': imageBasePath,'vehicleList': this.state.vehicleList })
        } else {
         
             alert("no image found")


        }
    }

    //render Vehicle
    renderVehicle = ({ item, index }) => {
        let locationName = this.state.locationList.find((location) => location.id == item.location)
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}>
            <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
                // onPress = {()=>this.callingVehicleDetailSCreen(item)}
            >
                {item.thumbnail.length > 0 ?
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={{ uri: item.thumbnail }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />}

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                onPress={() =>
                    this.props.navigation.push('ExportDetailsScreen', { 'itemObj': item, 'baseImagePath': imageBasePath, 'vehicleList': this.state.vehicleList, 'isCallingWithoutLogin': true })}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Container NO : </Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.container_number}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{  color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Port of loading : </Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 13, flex: 2 }}>{item.port != undefined && item.port != null && item.port.port_name != null && item.port.port_name != '' ? item.port.port_name : '-'}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>ETA : </Text>
                    <Text style={{  color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.eta}</Text>
                </View>

            </TouchableOpacity>
        </Elavation>
    }

    onTabChange = (event) => {
        this.setState({ tabIndex: event.i })
    }


    //set filter name
    setFiltername = (text) => {
        this.setState({ selectFilterName: text, isModalVisible: false })
    }

    //Rener Category Content
    renderCategoryContent = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ width: deviceWidth, height: 50, alignItems: 'center', alignContent: 'center', flexDirection: 'row', paddingLeft: 10 }}
                onPress={() => this.setFiltername(item)}
            >
                {this.state.selectFilterName == item ? <MaterialCommunityIcons name='check' color={AppColors.textColor} size={18} />
                    : <View style={{ width: 18 }} />}

                <Text style={{ color: AppColors.textColor, fontSize: 15, paddingLeft: 10 }}>{item}</Text>
            </TouchableOpacity>
        );
    }

    //here is modal content
    renderModalContent = () => {
        return (
            <View style={styles.modalViewStyle}>
                <View style={{ flexDirection: 'row', height: 50, width: deviceWidth, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Text style={{ color: AppColors.textColor, flex: 1, fontSize: 18 }}>Select Category</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ isModalVisible: false, selectFilterName: '' })}
                    >
                        <Image source={require('../Images/close_icon.png')} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>
                </View>
                {this.state.categoryList.length > 0 ?
                    <View style={{ flex: 1 }}>

                    </View> :
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            
                            color: AppColors.textColor, fontSize: 15
                        }}>Data not found</Text>
                    </View>
                }

            </View>
        );
    }

    isOpenFilterDialog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    //Render Footer
    renderFooter = () => {
        if (this.state.isFooterLoading) {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        } else {
            return null;
        }
    }

    loadMoreData = () => {
        setTimeout(() => {
            if (this.state.vehicleList.length >= 4) {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ page: this.state.page + 1 }, () => this.callingContainerApi(false))
                }
            }
        }, 100)
    }

    callingContainerApi = (isFirstTimeCaling) => {
        var url = ''
        if (isFirstTimeCaling) {
            this.setState({isLoading: true})

            this.setState({ isLoading: true, isFooterLoading: false })
            url = AppUrlCollection.EXPORT_LIST + '&page=' + this.state.page
        } else {
            this.setState({ isLoading: false, isFooterLoading: true })
            url = AppUrlCollection.EXPORT_LIST  + '&page=' + this.state.page
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                //  'authkey': AppConstance.USER_INFO.USER_TOKEN
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,

            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Response data viw :: ', responseJson)
                if (responseJson.data != '' || responseJson.data != null) {
                    this.setState({ isLoading: false })

                    let data = responseJson.data
                    if (data.length > 0) {
                        if (isFirstTimeCaling) {
                            this.setState({ vehicleList: data, vehicleList2:data , noMoreDataFound: false, isFooterLoading: false })
                        } else {
                            this.setState({ vehicleList: this.state.vehicleList.concat(data),vehicleList2: this.state.vehicleList2.concat(data), noMoreDataFound: false, isFooterLoading: false })
                        }
                    } else {
                        if (isFirstTimeCaling) {
                            this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                        } else {
                            this.setState({ isFooterLoading: false, noMoreDataFound: true })
                        }

                    }
                } else {
                    this.setState({ isLoading: false })

                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false })

                console.warn(error)
            });
    }

    callingSearchContainerApi = (isFirstTimeCaling) => {
        if(this.state.searchLotNumber != ''){
            var url = ''
            if (isFirstTimeCaling) {
                this.setState({ isLoading: true, isFooterLoading: false })
                url = AppUrlCollection.CONTAINER_TRACKING + 'export_global_search=' + this.state.searchLotNumber 
            } else {
                this.setState({ isLoading: false, isFooterLoading: true })
                url = AppUrlCollection.CONTAINER_TRACKING + 'export_global_search=' + this.state.searchLotNumber 
            }
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
    
                    //  'authkey': AppConstance.USER_INFO.USER_TOKEN
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ isLoading: false })
                    console.log('Response data viw :: ', responseJson)
                    if (responseJson.data != '' || responseJson.data != null) {
                        if (responseJson.data.length > 0) {
                            if (isFirstTimeCaling) {
                                this.setState({ vehicleList: responseJson.data, noMoreDataFound: false, isFooterLoading: false })
                            } else {
                                this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data), noMoreDataFound: false, isFooterLoading: false })
                            }
                        } else {
                            if (isFirstTimeCaling) {
                                this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                            } else {
                                this.setState({ isFooterLoading: false, noMoreDataFound: true })
                            }
    
                        }
                    } else {
                        AppConstance.showSnackbarMessage(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.warn(error)
                });
        }else{
            this.setState({vehicleList: vehicleList2})
        }
      
    }

    render() {
        return (
          
<SafeAreaView style={styles.screen}>
<DialogLoader loading={this.state.isLoading} />

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


            
                
                    <View style={{ width: deviceWidth, height: heightPercentageToDP('24%'),  }}>
                            
                <Image
                        source={require('../Images/containn.png')}
                          style={{alignSelf:'center', width: '100%',
                           height:120,}}
                        />    

                        <Elavation
                            elevation={0}
                            style={styles.searchElavationStyle}>
                            <View style={styles.searchElvationViewStyle}>
                                <TextInput style={styles.searchTxtInputStyle}
                                    placeholder='Search '
                                    placeholderTextColor='blue'
                                    selectionColor="white"
                                    autoFocus={true}
                                    // onSubmitEditing={() => this.callingVehicleContainerService()}
                                    // onSubmitEditing={(text) => { this.callingSearchContainerApi(false)}}

                                    returnKeyType='search'
                                    onChangeText={(text) => {this.setState({ searchLotNumber: text }); this.searchFilterFunction(text)} }
                                />
                                <AntDesign name='search1'  size={20} />
                            </View>
                        </Elavation>
                    </View>


              
                {this.state.vehicleList.length > 0 ? <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.vehicleList}
                        renderItem={this.renderVehicle}
                        keyExtractor={(item, index) => index}
                        extraData={this.state.vehicleList}
                        onEndReached={this.loadMoreData}
                        onEndThreshold={0}
                        ListFooterComponent={this.renderFooter}
                    />
                </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                           
                             fontSize: 15
                        }}>Container data not found</Text>
                    </View>}


                {/* <ModalDialog
                    isVisible={this.state.isModalVisible}
                    style={{
                        justifyContent: "flex-end",
                        margin: 0
                    }}
                    onBackButtonPress={() => this.setState({ isModalVisible: false })}
                    backdropOpacity={0.5}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    {this.renderModalContent()}
                </ModalDialog> */}

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    vehicleHaxNoTxtStyle: {
        width: 30,  color: AppColors.textColor, fontSize: 16
    },
    vehicleCustNameTxtStyle: {
        flex: 1, color: AppColors.textColor, fontSize: 16
    }, vehicleInnerTxtHeadinStyle: {
         fontSize: 14, color: AppColors.textColor, flex: 1.5
    }, vehicleInnerTxtValueStyle: {
       color: AppColors.textColor, fontSize: 15, flex: 2
    },
    vehicleInnerMainViewStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    vehicleStatusTxtStyle: {
        color: AppColors.textColor, fontSize: 14, marginRight: 10
    },
    vehicleInnreActionOpacityStyle: {
        borderRadius: 10, borderColor: AppColors.toolbarColor, borderWidth: 1,
    },
    vehicleInnreActionTxtStyle: {
    paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, color: AppColors.textColor, fontSize: 12,
    }, modalViewStyle: {
        backgroundColor: AppColors.white,
        borderRadius: 4, flex: 0,
        //  height:deviceHeight*0.4,
        borderColor: AppColors.white, marginBottom: '-12%'
    },

screen:{

    flex:1,
    height:deviceHeight,
    width:deviceWidth,
    backgroundColor:'white'
 },
 
    
    dialogMenuTxtStyle: {
        width: deviceWidth, height: 50,
        justifyContent: 'center',
        alignContent: 'center'
    }, dialogMenuTxtViewStyle: {
       
        color: AppColors.textColor,
        fontSize: 15,
        paddingLeft: 10
    }, dividerViewStyle: {
        width: deviceWidth,
        height: 0.5,
        backgroundColor: AppColors.textColor
    },
    searchBarMainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 5
    },
    searchElavationStyle: {
        width: deviceWidth * 0.91, height: 40,
        borderRadius: 1,
        borderColor:'grey',
        marginTop: 8,
        marginLeft: 5,
        borderWidth:0.5,
        backgroundColor:'white',
        marginRight: 5,
        alignSelf: 'center', borderRadius: 10
    },
    searchElvationViewStyle: {
        flexDirection: 'row', flex: 1,
        
        alignContent: 'center', alignItems: 'center',
        paddingLeft: 5, marginLeft: 5,
        marginRight: 5, paddingRight: 5
    },
    searchTxtInputStyle: {
        flex: 1,
        
     fontSize: 15, paddingVertical: 0,
    },
    filterIconViewStyle: {
        marginLeft: 5, marginRight: 5,
        justifyContent: 'center', alignContent: 'center',
        alignItems: 'center', alignSelf: 'center', marginTop: 5
    }, filterIconStyle: {
        width: 25, height: 25
    }
})
export default ContainerTrackingOne;