import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import {SignUp} from './navigators';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>{SignUp()}</NavigationContainer>
    </Provider>
  );
}
