/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import Store from './Store';

import NavigationContainer from './NavigationContainer';

const App = () => {
  return (
    <Provider store={Store}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer />
    </Provider>
  );
};

export default App;
