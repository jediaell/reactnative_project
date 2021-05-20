import React, { useContext, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { NavigationContainerRef } from '@react-navigation/core';
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NavigationState, PartialState } from '@react-navigation/routers';
import { createStackNavigator } from '@react-navigation/stack';
import { Analytics } from '~/services';
import * as NavigationActions from './actions';
import { Routes, Stacks } from './routes';
import { ModalsStack, PrivateStack, PublicStack } from './stacks';

const getActiveRouteName = (
  state: NavigationState | PartialState<NavigationState>,
): string => {
  if (state.index != null) {
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  }
  return '';
};

const MainStack = createStackNavigator();

type Props = {
  setNavigationTop: (navigatorRef: NavigationContainerRef) => void;
  token?: string;
};

export const Navigation: React.FC<Props> = ({ setNavigationTop, token }) => {
  const routeNameRef = useRef<any>();
  const { primary } = useContext(ThemeContext);
  const contextTheme = {
    dark: false,
    colors: {
      primary: primary.main,
      background: 'transparent',
      card: primary.main,
      text: primary.contrast,
      border: primary.main,
      notification: primary.main,
    },
  };

  const onNavigationStateChange = (state?: NavigationState) => {
    if (state) {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = getActiveRouteName(state);
      if (previousRouteName !== currentRouteName) {
        Analytics.logScreen(currentRouteName);
      }
      routeNameRef.current = currentRouteName;
    }
  };

  return (
    <NavigationContainer
      ref={setNavigationTop}
      theme={contextTheme}
      onStateChange={onNavigationStateChange}
    >
      <MainStack.Navigator
        headerMode="none"
        mode="modal"
        initialRouteName={token ? Stacks.PRIVATE : Stacks.PUBLIC}
      >
        <MainStack.Screen name={Stacks.PRIVATE} component={PrivateStack} />
        <MainStack.Screen name={Stacks.PUBLIC} component={PublicStack} />
        <MainStack.Screen name={Stacks.MODAL} component={ModalsStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export {
  Stacks,
  Routes,
  NavigationActions,
  useNavigation,
  useRoute,
  useFocusEffect,
};
