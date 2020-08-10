import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainScreen from './screens/main';

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
