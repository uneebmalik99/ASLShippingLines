import React, { Component } from 'react';
import { View,ScrollView, SafeAreaView,Modal, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, BackHandler, ActivityIndicator } from 'react-native'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
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

class VehicleList extends Component {
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
            statusId: props.route.params.type,
            locationId: 0
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
                // onPress={() => this.switchToImageGrid(item)}
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

                    <Text style={{color:'white', fontSize:16, fontWeight:'bold', alignSelf:'center'}}>{this.state.statusId == '1'? 'ON HAND' : this.state.statusId == '2'? 'MANIFEST': this.state.statusId == '3'? 'ON THE WAY' :this.state.statusId == '4'? 'SHIPPED' : this.state.statusId == '5'? 'PICKED UP'  :this.state.statusId == '6'? 'ARRIVED': ''  }</Text>
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
        );
    }
}

export default VehicleList;

const styles = StyleSheet.create({
    vehicleHaxNoTxtStyle: {
        width: 30,  color: AppColors.textColor, fontSize: 16
    },
    screen:{
    
        flex:1,
        height:deviceHeight,
        width:deviceWidth,
        backgroundColor:'white'
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


