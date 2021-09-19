import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Image, Alert, AppState, BackHandler, BackAndroid, ScrollView, FlatList,ImageBackground, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import { DrawerContent } from './src/navigation/DrawerContent';
import ContactUsScreen from './src/screens/ContactUsScreen';
import LocationServiceScreen from './src/screens/LocationServiceScreen';
import OurServiceListScreen from './src/screens/OurServiceListScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from './src/screens/DashboardScreen';
import VehicleScreen from './src/screens/VehicleScreen'
import VehicleList from './src/screens/VehicleList';
import ContainerTrackingOne from './src/screens/ContainerTrackingOne';
import AccountSectionMainScreen from './src/screens/AccountSectionMainScreen'
import AppColors from './src/Colors/AppColors';
import All from './src/screens/All';
import Paid from './src/screens/Paid';
import Unpaid from './src/screens/Unpaid';
import PaymentHistory from './src/screens/PaymentHistory';
import AccountDetailsScreen from './src/screens/AccountDetailsScreen';
import OurServiceOne from './src/screens/OurServiceOne';
import ContactUsOne from './src/screens/ContactUsOne';
import WishListScreen from './src/screens/WishListScreen';
import LocationServiceOne from './src/screens/LocationServiceOne';
import VehcilContainerDetailScreen from './src/screens/VehcilContainerDetailScreen';
import ExportDetailsScreen from './src/screens/ExportDetailsScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();




const Drawer = createDrawerNavigator();
const AppDrawer = () =>{
  return(
    <Drawer.Navigator
    drawerPosition='right'
    drawerType='front'
     drawerContent={props => <DrawerContent {...props} />
    }
    >
            <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

      <Drawer.Screen name="ContactUsScreen" component={ContactUsScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Drawer.Screen name="LocationServiceScreen" component={LocationServiceScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Drawer.Screen name="OurServiceListScreen" component={OurServiceListScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />
    </Drawer.Navigator>
  );
}

const Accounts =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='AccountSectionMainScreen' component={AccountSectionMainScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='All' component={All}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='Paid' component={Paid}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />


<Stack.Screen name='Unpaid' component={Unpaid}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='PaymentHistory' component={PaymentHistory}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />
 <Stack.Screen name='AccountDetailsScreen' component={AccountDetailsScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />


  </Stack.Navigator>
  );
}


const Vehicle =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='VehicleScreen' component={VehicleScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='VehcilContainerDetailScreen' component={VehcilContainerDetailScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

  </Stack.Navigator>
  );
}

const Container =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='ContainerTrackingOne' component={ContainerTrackingOne}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='ExportDetailsScreen' component={ExportDetailsScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

  </Stack.Navigator>
  );
}


const Dashboard =() =>{
  return(
  <Stack.Navigator>


<Stack.Screen name='DashboardScreen' component={DashboardScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='VehicleList' component={VehicleList}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

<Stack.Screen name='VehcilContainerDetailScreen' component={VehcilContainerDetailScreen}
options={{
  headerShown:false,
  animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),
}} 
 />

  </Stack.Navigator>
  );
}



const TabScreen =()=>{
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: AppColors.Signincolor,
      keyboardHidesTabBar: true

    }}
    >

    <Tab.Screen name="DashboardScreen" component={Dashboard} options={{tabBarLabel:'Home',headerShown:false,
   tabBarIcon: ({ color, size }) => (<Image
      source={ require('./src/Images/homeicon.png')} 
style={{ width: 25, height:25, alignSelf: 'center', resizeMode:'contain'}} 
    />  )
  
  ,}} />

    <Tab.Screen name="VehicleScreen" component={Vehicle} options={{tabBarLabel:'Vehicles',headerShown:false,
   tabBarIcon: ({ color, size }) => (
    <Image
    source={ require('./src/Images/car-2.jpg')} 
style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
    />
    // <MaterialCommunityIcons name="Vehicles" color={color} size={size} />
  
  )}} />
     <Tab.Screen name="Container1" component={Container} options={{tabBarLabel:'Container',headerShown:false,
   tabBarIcon: ({ color, size }) => (
<Image
    source={ require('./src/Images/ship-2.png')} 
style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
    />  
  )}} />

<Tab.Screen name="Accounts" component={Accounts} options={{tabBarLabel:'Accounts',headerShown:false,
   tabBarIcon: ({ color, size }) => (
<Image
    source={ require('./src/Images/inventory_icon.png')} 
style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
    />  
  )}} />

  
   

    

   </Tab.Navigator>
  );
}



const App = () => {
 return (
   <NavigationContainer>
   <Stack.Navigator 
   initialRouteName="SplashScreen" 
   >
        
        {/* <Stack.Screen  name='SplashScreen'  component={SplashScreen} options={{headerShown :false}} /> */}
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />


<Stack.Screen name='AppDrawer1' component={AppDrawer} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />



<Stack.Screen name='TabScreen' component={TabScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='OurServiceOne' component={OurServiceOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='ContactUsOne' component={ContactUsOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />


<Stack.Screen name='WishListScreen' component={WishListScreen} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />

<Stack.Screen name='LocationServiceOne' component={LocationServiceOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),  }} />
        {/* <Stack.Screen name='RegisterActivation' component={RegisterActivation} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterOne' component={RegisterOne} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterTwo' component={RegisterTwo} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterThree' component={RegisterThree} options={{headerShown:false, animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }),}} />
        <Stack.Screen name='RegisterOneT' component={RegisterOneT} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
        <Stack.Screen name='RegisterTwoT' component={RegisterTwoT} options={{headerShown:false,animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), }} />
       
     <Stack.Screen name='HomeScreen' component={TabScreen} options={{ headerShown:false, headerTitleAlign:"center",animationEnabled:false,
  transitionConfig: () => ({
    transitionSpec: {
      duration:0,
      timing: 0,
    },
  }), headerLeft: null}} /> */}

   </Stack.Navigator>
   </NavigationContainer>
 );
}

export default App;