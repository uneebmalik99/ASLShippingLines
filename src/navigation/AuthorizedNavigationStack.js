<<<<<<< HEAD
import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import StudentDashboard from '../screens/student/StudentDashboard';


const {
  Navigator,
  // Screen
} = createStackNavigator();

export default function AuthorizedNavigationStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}
    // initialRouteName="DashboardScreen" 
    >
      <Screen name="StudentDashboard" component={StudentDashboard} />
    </Navigator>
  );
=======
import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';

import StudentDashboard from '../screens/student/StudentDashboard';


const {
  Navigator,
  // Screen
} = createStackNavigator();

export default function AuthorizedNavigationStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}
    // initialRouteName="DashboardScreen" 
    >
      <Screen name="StudentDashboard" component={StudentDashboard} />
    </Navigator>
  );
>>>>>>> 31e47b7307a8d8c093a052fe4d445ed652ccb26e
}