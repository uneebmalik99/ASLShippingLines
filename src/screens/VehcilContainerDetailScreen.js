import React, { Component } from 'react';
<<<<<<< HEAD
import { View,ScrollView, SafeAreaView,Modal, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, BackHandler, ActivityIndicator } from 'react-native'
=======
import { View, Dimensions, SafeAreaView, Modal, Text,ImageSlider, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView, Share, BackHandler } from 'react-native'
>>>>>>> 31e47b7307a8d8c093a052fe4d445ed652ccb26e
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
<<<<<<< HEAD
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toolbar from './Toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  Header, Tab, Tabs,Content,List, Body, ScrollableTab, TabHeading, ListItem, Container, Left, Right,  } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

let filterItemObj = null;
let setProps = null;

let page = 1;
let onEndReachedCalledDuringMomentum = false;
let vehilceImageBasePath = null;
var baseImagePath = '';
var locationId = 0;
var statusId = 0;
var searchTxt = '';
let locationList = [];

class VehicleScreen extends Component {
    constructor(props) {
        super(props)
        this.onEndReachedCalledDuringMomentum = true;
      
        this.state = {
            isLoading: false,
            isDisplayView: 0,
            drawerview:false,
            tabIndex: 0,
            selectFilterName: '',
            isModalVisible: false,
            locationList: [],
            vehicleList: [],
            vehicleList2: [],
            searchTxt: '',
            isStopCallingAPI: false,
            isFilterOrSerachEnable: false,
            page: 1,
            isFooterLoading: false,
            noMoreDataFound: false,
            categoryList: [
                'New Purchased', 'On Hand', 'Ready to Ship', 'On the way', 'Arrived', ''
            ],
            refreshing: false,
            statusId: '0',
            locationId: 0
        }

    }

    componentDidMount() {
        

                this.setState({ isLoading: true })
                // this.ccallingLocationApi();
                // if (filterItemObj != null) {
                //     let gettingStatusId = AppConstance.gettingStatusIfFromName(filterItemObj.name.toUpperCase())
                //     console.log('My sdadhas ', gettingStatusId)
                //     if (gettingStatusId != undefined && gettingStatusId != 'undefined' && gettingStatusId != '') {
                //         this.setState({ statusId: gettingStatusId })
                //         statusId = gettingStatusId
                //     } else {
                //         this.setState({ statusId: 0 })
                //         statusId = 0
                //     }

                //     this.callingAPIWithLocation(locationId, this.state.searchTxt, statusId)
                //     this.setState({ selectFilterName: filterItemObj.name })
                // } else {
                    this.callingVehicleApi(true)
                // }

            
            


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
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    _handleConnectivityChange = state => {
        if (state.isConnected == true) {
            this.setState({ isInternetNotFound: false })
        }
        else {
            this.setState({ isInternetNotFound: true })
        }
    };
 
    //calling location api
    ccallingLocationApi = () => {
        this.setState({ locationList: [] })

        fetch(AppUrlCollection.LOCATION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var allData = {
                    id: 0,
                    name: 'ALL'
                }
                this.state.locationList.push(allData)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ locationList: this.state.locationList.concat(responseJson.data), locationId: responseJson.data[0].id })
                    locationList.push(this.state.locationList)
                } else {
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //calling Vehicle list
    callingVehicleApi = async (isCallingFirsttime) => {
        if (isCallingFirsttime) {
            this.setState({ isLoading: true, isFooterLoading: false })
        } else {
            this.setState({ isLoading: false, isFooterLoading: true })
        }

        // + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId,
        fetch(AppUrlCollection.VEHILE_LIST  +'page=' + this.state.page +  '&status=' + this.state.statusId,{
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
                    this.setState({ isLoading: false, isFooterLoading: false })
                    if (data.length > 0) {
                        // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                        this.setState({ vehicleList: this.state.vehicleList.concat(data), vehicleList2: this.state.vehicleList2.concat(data),noMoreDataFound: false })
                    } else {
                        this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
                    }
                   
                    this.setState({ noMoreDataFound: false })
                } else {
                    this.setState({ isLoading: false, isFooterLoading: false })
                    this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
                    // AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    callingVehicleDetailSCreen = (item) => {
        // if (filterItemObj != null) {
        //     console.log('Filter Obj::: ',filterItemObj)
        //    this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
        // } else {
        //     this.props.setProps.navigation.navigate('VehicleImageListScreen', { 'itemObj': item })
        // }
    }

    switchToImageGrid = (item) => {
        if (item.images.length > 0) {
            this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item, 'baseImagePath': baseImagePath })
        } else {
            AppConstance.showSnackbarMessage('Image Not Found')
        }

    }

    handleBackPress = () => {
        // this.props.navigation.goBack();
        this.props.navigation("DashboardScreen");

     
    }

    //render Vehicle
    renderVehicle = ({ item, index }) => {
        // uri:vehilceImageBasePath + item.image
        let locationName = this.state.locationList.find((location) => location.id == item.location)

        return <Elavation
                  elevation={2}

          style={{   paddingHorizontal:10, borderRadius:20, width: deviceWidth * 0.95, height: 106, flexDirection:'column', marginBottom: 10, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}>

<View 
style={{paddingLeft:10, flexDirection:'row'}}>


<TouchableOpacity style={{  flex: 1, justifyContent: 'space-between',  }}
                onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
            
            
            >
<ImageBackground 
style={{justifyContent: 'center',  width:55,height:28}}
source={require('../Images/year2.png')}
>

<Text style={{ textAlign: 'center', color:'white', fontSize: 12 }}>{item.year != undefined && item.year != null && item.year != ''  ? item.year : '-'}</Text>


</ImageBackground>
                <Text style={{   color: AppColors.Signincolor, fontSize: 12 }}>{item.make != undefined && item.make != null && item.make != '' ?   item.make.toUpperCase() : '-'}</Text>
                <Text style={{  color: AppColors.Signincolor, fontSize: 12 }}>{item.model != undefined && item.model != null && item.model != '' ? item.model.toUpperCase()  : '-'}</Text>

                {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.location != undefined && item.location != null && item.location != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? locationName.name + ' | ' + item.lot_number : '-'}</Text> */}
                {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{'Status : ' + item.status != undefined && item.status != null && item.status != '' ? AppConstance.gettingStatusNameFromId(item.status) : '-'}</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={{ borderRadius:5,  width: deviceWidth * 0.42, height:80 }}
                onPress={() => this.switchToImageGrid(item)}
            >
                {item.photo.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                    source={{ uri:item.photo }} /> :
                    <Image style={{  width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />}

            </TouchableOpacity>



</View>
<View
  style={{
    borderBottomColor: '#d4eeeb',
    borderBottomWidth: 1,
  }}
/>
<View 
style={{ flexDirection:'row'}}>


<TouchableOpacity style={{  flex: 1, justifyContent: 'space-between',  paddingBottom: 5, paddingLeft: 10 }}
                onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
            
            
            >


            </TouchableOpacity>

            <TouchableOpacity style={{ borderRadius:5, paddingVertical:3, width: deviceWidth * 0.38, }}
            >
        <Text style={{   color: AppColors.Signincolor, fontSize: 12 }}>{item.vin != undefined && item.vin != null && item.vin != ''  ? item.vin : '-'}</Text>

            </TouchableOpacity>



</View>


</Elavation>        
        
        
        
        
//         <Elavation
//             elevation={2}
//             style={{   paddingRight:5, borderRadius:20, width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
//         >


// <View 
//             style={{   paddingRight:5, borderRadius:20, width: deviceWidth * 0.95, height: 80, flexDirection: 'column', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}

//  >


// <View style={{flexDirection:'row'}}>



//         {/* <Text>{item.year+item.make+item.model+item.name+item.allData}</Text> */}
            

//             {/* AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath }) */}
//             <TouchableOpacity style={{  flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
//                 onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': baseImagePath })}
            
            
//             >

            
//                 <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13 }}>{item.model != undefined && item.model != null && item.model != '' ? item.model.toUpperCase() + ' ' + item.make.toUpperCase() : '-'}</Text>
//                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.year != undefined && item.year != null && item.year != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? item.year : '-'}</Text>

//                 {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.location != undefined && item.location != null && item.location != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? locationName.name + ' | ' + item.lot_number : '-'}</Text> */}
//                 {/* <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{'Status : ' + item.status != undefined && item.status != null && item.status != '' ? AppConstance.gettingStatusNameFromId(item.status) : '-'}</Text> */}
//             </TouchableOpacity>

//             <TouchableOpacity style={{ borderRadius:5, paddingVertical:5, width: deviceWidth * 0.3, height: 80 }}
//                 onPress={() => this.switchToImageGrid(item)}
//             >
//                 {item.images.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
//                     source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
//                     <Image style={{  width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />}

//             </TouchableOpacity>
// </View>






// </View>
//         </Elavation>
    }

    onTabChange = (event) => {
        let locationvalue = this.state.locationList[event.i]
        locationId = locationvalue.id
        this.setState({ tabIndex: event.i, locationId: locationvalue.id, searchTxt: '', page: 1,isStopCallingAPI:false })
        console.log('ALlTab Selct Vale:: ', event.i, locationvalue.id)
        setTimeout(() => {
            this.callingAPIWithLocation(locationvalue.id, this.state.searchTxt, statusId)
        }, 100)


    }

    //callingApi 
    callingAPIWithLocation = async (location, search, status) => {
        var url = null;
        var locationUrl = null;
        var searchUrl = null;
        var statusUrl = null;
        var baseUrlMain = AppUrlCollection.VEHILE_LIST;
        this.setState({ isLoading: true, isFooterLoading: false })

        url = baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1'
        console.log('STATUS API :;', baseUrlMain + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId + '&page=1')
        // if (this.state.locationId > 0) {
        //     locationUrl = baseUrlMain + '&location=' + locationId
        //     url = locationUrl;
        //     console.log('url :location : ', locationUrl)
        // } else if (this.state.searchTxt.trim().length > 0) {
        //     searchUrl = locationUrl != null ? locationUrl.concat('&search_str=' + this.state.searchTxt) : baseUrlMain + '&search_str=' + this.state.searchTxt
        //     url = searchUrl;
        //     console.log('url :search : ', searchUrl)
        // } else if (this.state.statusId > 0) {
        //     statusUrl = searchUrl != null ? searchUrl.concat('&status=' + statusId) : baseUrlMain + '&status=' + statusId
        //     //url = AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID
        //     url = statusUrl;
        //     console.log('url :status : ', statusUrl)
        // }


        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AppConstance.USER_INFO.USER_TOKEN,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                this.setState({ isLoading: false, page: 1, vehicleList: [], vehicleList2: [],  isFooterLoading: false })
                console.log('Load more data :: ', url)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    baseImagePath = responseJson.data.other.vehicle_image;
                    let vehicleList = responseJson.data.vehicleList;
                    if (vehicleList.length > 0) {
                        this.setState({ vehicleList: vehicleList , vehicleList2:vehicleList })
                        //this.setState({ vehicleList: responseJson.data.vehicleList, isFilterOrSerachEnable: false })
                        this.setState({ noMoreDataFound: false })

                    } else {
                        this.setState({ noMoreDataFound: true })
                        //   AppConstance.showSnackbarMessage(responseJson.message)
                    }
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //set filter name
    setFiltername = (text) => {
        page = 0;
        let gettingStatusId = AppConstance.gettingStatusIfFromName(text.toUpperCase())
        this.setState({ statusId: gettingStatusId, searchTxt: '', page: 1 })
        statusId = gettingStatusId;
        this.callingAPIWithLocation(locationId, this.state.searchTxt, statusId)
        this.setState({ selectFilterName: text, isModalVisible: false, isFilterOrSerachEnable: true })
    }

    //Rener Category Content
    renderCategoryContent = ({ item, index }) => {
        return (<TouchableOpacity style={{ width: deviceWidth, height: 50, alignItems: 'center', alignContent: 'center', flexDirection: 'row', paddingLeft: 10 }}
            onPress={() => this.setFiltername(item)}
        >
            {this.state.selectFilterName == item ? <MaterialCommunityIcons name='check' color={AppColors.textColor} size={18} />
                : <View style={{ width: 18 }} />}

            <Text style={{  color: AppColors.textColor, fontSize: 15, paddingLeft: 10 }}>{item}</Text>
        </TouchableOpacity>
        );
    }

    //clear filter data
    clearFilterData = () => {

        // page = 0;
        // this.setState({ statusId: 0, searchTxt: '', page: 1 })
        // statusId = 0;
        // this.setState({ isFilterOrSerachEnable: true })

        // this.callingAPIWithLocation(0, this.state.searchTxt, 0)
        // this.setState({ tabIndex: 0, locationId: 0, searchTxt: '', vehicleList: [], page: 1 })
        this.setState({ isModalVisible: false })
        this.props.navigation.replace('VehcileScreen', { 'itemObj': filterItemObj, 'setProps': this.props });
    }

    //here is modal content
    renderModalContent = () => {
        return (
            <View style={styles.modalViewStyle}>
                <View style={{ flexDirection: 'row', height: 50, width: deviceWidth, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Text style={{  color: AppColors.textColor, flex: 1, fontSize: 18 }}>Select Category</Text>
                   
                   
                    <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginRight: 10 }}
                        onPress={() => this.clearFilterData()}
                    >
                        <Text style={{  color: AppColors.textColor, fontSize: 15 }}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ isModalVisible: false })}
                    >
                        <Image source={require('../Images/close_icon.png')} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.categoryList}
                    renderItem={this.renderCategoryContent}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                />
            </View>
        );
    }

    isOpenFilterDialog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    allServiceCalling = () => {
        setTimeout(() => {
            if (this.state.noMoreDataFound) {

            } else {
                this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
            }
        }, 100)
    }

    //Render Footer
    renderFooter = () => {
        // if (this.state.paidServiceCallStop) {
        // } else {
        //     if (this.state.isFooterLoading) {
        //         return <View>
        //             <ActivityIndicator color={AppColors.toolbarColor} size='large' />
        //         </View>
        //     } else {
        //         return <View>
        //             <TouchableOpacity style={{ width: 150, height: 40, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15, marginTop: 10 }}
        //                 onPress={() => this.allServiceCalling()}
        //             >
        //                 <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 15, paddingBottom: 4 }}>Load More</Text>
        //             </TouchableOpacity>
        //             {/* <ActivityIndicator color={AppColors.toolbarColor} size='large' /> */}
        //         </View>
        //     }
        // }
        if (this.state.isStopCallingAPI) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    //calling  free search
   searchFilterFunction = (text) => {
        if (text) {
      
          const newData = this.state.vehicleList2.filter(
            function (item) {
              
              const itemData =  item.vin
                ?  item.vin.toUpperCase()
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
        //   this.setState({vehicleList: vehicleList2})
        //   setFilteredDataSource(data);
        //   setSearch(text);
        }
      };


    //LoadMore data
    loadMoreData = () => {
        //   console.log('APO CALLING :: ', AppUrlCollection.VEHILE_LIST + 'customerId=' + AppConstance.USER_INFO.USER_ID + '&page=' + page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)

        //page += 1;
        setTimeout(() => {
            if (this.state.isStopCallingAPI) {

            } else {
                if (this.state.noMoreDataFound) {

                } else {
                    this.setState({ page: this.state.page + 1 }, () => this.callingVehicleApi(false))
                }
            }
        }, 100);
    }


    renderMyTablayout = () => {
        let locationTabGenrate = [];
        for (let index = 0; index < this.state.locationList.length; index++) {
            const element = this.state.locationList[index];
            locationTabGenrate.push(
                <Tab
                    heading={<TabHeading
                        activeTabStyle={{ backgroundColor: AppColors.white, }}
                        activeTextStyle={{ color: AppColors.white, }}
                        tabStyle={{ width: 250 }}
                        textStyle={{ flex: 1 }}
                        style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor, }}
                    >
                        <Text style={{
                            color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white,
                            width: 48, fontSize: 12, textAlign: 'center'
                        }}>
                            {element.name}
                        </Text></TabHeading>}
                    activeTabStyle={{ backgroundColor: AppColors.toolbarColor }}
                    tabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                    textStyle={{ color: AppColors.white,  }}
                    activeTextStyle={{ color: AppColors.toolbarColor, }}

                >
                    <View style={{ flex: 1 }}>
                        <View style={styles.searchBarMainView}>
                            <Elavation
                                elevation={3}
                                style={styles.searchElavationStyle}>
                                <View style={styles.searchElvationViewStyle}>
                                    <TextInput style={styles.searchTxtInputStyle}
                                        placeholder='Search'
                                        placeholderTextColor={AppColors.toolbarColor}
                                        selectionColor={AppColors.toolbarColor}
                                        onChangeText={(text) => this.setState({ searchTxt: text })}
                                        onSubmitEditing={() => this.callingSearchAPI()}
                                        returnKeyType='search'
                                    />
                                    <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                </View>
                            </Elavation>
                            <TouchableOpacity
                                style={styles.filterIconViewStyle}
                                onPress={() => this.setState({ isModalVisible: true })}
                            >
                                <Image source={require('../Images/filter_iconn.png')} style={styles.filterIconStyle} />
                            </TouchableOpacity>
                        </View>
                        {this.state.vehicleList.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    style={{ paddingTop: 5 }}
                                    data={this.state.vehicleList}
                                    renderItem={this.renderVehicle}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.loadMoreData}
                                    onEndReachedThreshold={0.5}
                                />
                            </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                            </View>}
                    </View>
                </Tab>
            )
        }


        return (<Tabs
            ref={(ref) => { this.tabView = ref; }}
            tabBarUnderlineStyle={{ height: 4, backgroundColor: AppColors.white }}
            tabContainerStyle={{ backgroundColor: AppColors.toolbarColor, height: 50, elevation: 0 }}
            style={{ backgroundColor: AppColors.white, elevation: 0 }}
            tabBarTextStyle={{ color: AppColors.white,  fontSize: 25 }}
            tabBarActiveTextColor={AppColors.white}
            tabBarInactiveTextColor={AppColors.black}
            tabBarBackgroundColor={AppColors.toolbarColor}

            onChangeTab={(event) => this.onTabChange(event)}
            renderTabBar={() => <ScrollableTab />}
        >
            {locationTabGenrate}
        </Tabs >);
    }


    render() {
        return (
            <SafeAreaView style={styles.screen}>

=======
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
                        for (let index = 0; index < vehicleDetailObj.photos.length; index++) {
                            const element = vehicleDetailObj.photos[index];
                            this.state.images.push(element.url)
                        }
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


>>>>>>> 31e47b7307a8d8c093a052fe4d445ed652ccb26e
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
            onPress={() =>  { this.setState({drawerview:false});this.props.navigation.navigate('ContainerTrackingOne')}} selected>
            <Image source={ require('../Images/ww.jpeg')} 
                        style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
                       />
               
            <Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTAINER</Text>        
            
            </ListItem>
            <ListItem noBorder
            style={{height:40,
            }}
<<<<<<< HEAD
            onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('AccountSectionMainScreen')}} selected>
=======
            onPress={() => {this.setState({drawerview:false}); this.props.navigation.navigate('Accounts')}} selected>
>>>>>>> 31e47b7307a8d8c093a052fe4d445ed652ccb26e
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
            
<<<<<<< HEAD
            
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




 <View style={{ width:deviceWidth,flexDirection:'row', paddingHorizontal:20, justifyContent:'space-between', backgroundColor: AppColors.toolbarColor }}>
{/* <ImageBackground
                        source={require('../Images/ontheway.jpg')}
                          style={{width:"100%", alignSelf:'center', 
                           height:55
                        ,}}
                        > */}
{/* <View style={{ width:deviceWidth, backgroundColor: AppColors.toolbarColor }}>
                </View> */}
<TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('NotificationVehicleDetailscreen')}
                                            >
                                                <Image
                                                style={{ resizeMode:'contain',marginVertical:13, height:25,width:25}}
                                            
                                                source={require(
                                                '../Images/bell.png'
                                                )}

                                                />


                                             
                    </TouchableOpacity>

                    <Text style={{color:'white', fontSize:16, fontWeight:'bold', alignSelf:'center'}}>{this.state.statusId == '0'? 'ALL VEHICLES' : this.state.statusId == '1' ? 'ON HAND' : this.state.statusId == '2'? 'MANIFEST': this.state.statusId == '3'? 'ON THE WAY' :this.state.statusId == '4'? 'SHIPPED' : this.state.statusId == '5'? 'PICKED UP'  :this.state.statusId == '6'? 'ARRIVED': ''  }</Text>
<View>
    </View>
{/* <Image
source={require('../Images/bell.png')}
                          style={{width:20,marginVertical:15, marginLeft:20, justifyContent:"center",
                           height:20
                        ,}}
>


</Image> */}

                        {/* </ImageBackground> */}


</View>
   

                <View style={{ flex: 1 }}>
                        <View style={styles.searchBarMainView}>
                            <Elavation
                                elevation={3}
                                style={styles.searchElavationStyle}>
                                <View style={styles.searchElvationViewStyle}>
                                    <TextInput style={styles.searchTxtInputStyle}
                                        placeholder='Search'
                                        placeholderTextColor={AppColors.toolbarColor}
                                        selectionColor={AppColors.toolbarColor}
                                        onChangeText={(text) =>{ this.setState({ searchTxt: text }); this.searchFilterFunction(text) } }
                                        onSubmitEditing={() => this.callingSearchAPI()}
                                        returnKeyType='search'
                                    />
                                    <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                </View>
                            </Elavation>
                            
                        </View>
                        {this.state.vehicleList.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    style={{ paddingTop: 5 }}
                                    data={this.state.vehicleList}
                                    renderItem={this.renderVehicle}
                                    keyExtractor={(item, index) => index}
                                    extraData={this.state}
                                    ListFooterComponent={this.renderFooter}
                                    onEndReached={this.loadMoreData}
                                    onEndReachedThreshold={0.5}
                                />
                            </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{  fontSize: 15 }}>Vehicle Not Found.</Text>
                            </View>}
                    </View>


            </SafeAreaView >
=======




            <Modal 
            visible={this.state.showimagemodel}
            animationType='fade'
            
            >

                 <View style={{width:"100%",justifyContent:'center',marginVertical:10,  alignSelf:'center', alignItems:'center', height:'90%'}}
>
                <SliderBox 
                        images={this.state.images}
                        sliderBoxHeight={deviceHeight*0.4}
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
<SliderBox 
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
        />
</View>

      ) : (

          <View style={{width:"100%",  height:deviceHeight*0.23}}>
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
>>>>>>> 31e47b7307a8d8c093a052fe4d445ed652ccb26e
        );
    }
}

<<<<<<< HEAD
export default VehicleScreen;

const styles = StyleSheet.create({
    vehicleHaxNoTxtStyle: {
        width: 30,  color: AppColors.textColor, fontSize: 16
    },
    screen:{
    
=======
const styles = StyleSheet.create({
    detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center',
    },
    screen:{

>>>>>>> 31e47b7307a8d8c093a052fe4d445ed652ccb26e
        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
     },
<<<<<<< HEAD
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
        flex: 1, height: 50,
        borderRadius: 10,
        borderColor:'black',
        marginTop: 8,
        marginLeft: 5,
        borderWidth:0.5,
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
    filterIconViewStyle: {
        marginLeft: 5, marginRight: 5,
        justifyContent: 'center', alignContent: 'center',
        alignItems: 'center', alignSelf: 'center', marginTop: 1
    }, filterIconStyle: {
        width: 25, height: 25
    }
})


=======
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
>>>>>>> 31e47b7307a8d8c093a052fe4d445ed652ccb26e
