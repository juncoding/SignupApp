import 'react-native-gesture-handler';
import React, {lazy, Suspense} from 'react';
import {View} from 'react-native';

const Loadable = Component => props =>
  (
    <Suspense fallback={<View backgroundColor="red" />}>
      <Component {...props} />
    </Suspense>
  );

// SignUp
const Country = Loadable(lazy(() => import('./Country')));
const SignUp = Loadable(lazy(() => import('./SignUp')));
const Thanks = Loadable(lazy(() => import('./Thanks')));

export {Country, SignUp, Thanks};
