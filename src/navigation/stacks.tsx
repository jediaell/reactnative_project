import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScene, LoginScene } from '~/scenes';
import { Routes } from './routes';

const Private = createStackNavigator<PrivateStackParams>();
const Public = createStackNavigator<PublicStackParams>();
const Modals = createStackNavigator<ModalsStackParams>();

export const PublicStack = (): JSX.Element => (
  <Public.Navigator headerMode="none">
    <Public.Screen name={Routes.LOGIN} component={LoginScene} />
  </Public.Navigator>
);

export const PrivateStack = (): JSX.Element => (
  <Private.Navigator>
    <Private.Screen name={Routes.HOME} component={HomeScene} />
  </Private.Navigator>
);

export const ModalsStack = (): JSX.Element => (
  <Modals.Navigator headerMode="none" mode="modal">
    <Modals.Screen name={Routes.INFO} component={HomeScene} />
  </Modals.Navigator>
);
