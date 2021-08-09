/**
 * @module SignUp navigator
 * @description navigation for signup flow screens
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Country, SignUp, Thanks} from '../screens';

const ROUTE = {
  COUNTRY: 'Country',
  SIGNUP: 'SignUp',
  THANKS: 'Thanks',
};

const SignUpStack = createStackNavigator();

const Stack = () => {
  return (
    <SignUpStack.Navigator screenOptions={{title: ''}}>
      <SignUpStack.Screen name={ROUTE.COUNTRY} component={Country} />
      <SignUpStack.Screen name={ROUTE.SIGNUP} component={SignUp} />
      <SignUpStack.Screen
        name={ROUTE.THANKS}
        component={Thanks}
        options={{headerLeft: () => null}}
      />
    </SignUpStack.Navigator>
  );
};

export default Stack;
export {ROUTE};
