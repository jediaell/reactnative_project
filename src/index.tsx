import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { ThemeType } from '@platformbuilders/react-elements/native';
import { NavigationContainerRef } from '@react-navigation/core';
import '~/utils/config/reactotron';
import { If } from '~/components';
import { Navigation, NavigationActions } from '~/navigation';
import { LoadingScene } from '~/scenes';
import { Crashlytics, RemoteConfig } from '~/services';
import store from '~/stores';
import { animations, colors, radius, spacings, typography } from '~/theme';
import { REMOTE_CONFIG_DEFAULT_VALUES, ToastMessage } from '~/utils';
import CodePush from './CodePush';

const theme: ThemeType = {
  ...colors,
  ...spacings,
  ...radius,
  ...animations,
  ...typography,
};

ToastMessage.setColorTheme({
  success: colors.success,
  info: colors.info,
  warning: colors.warning,
  danger: colors.failure,
});

export default class AppContainer extends Component {
  state = {
    token: undefined,
    loading: true,
  };

  setToken = (token: Token): void => this.setState({ token });
  setLoading = (loading: boolean): void => this.setState({ loading });

  async componentDidMount(): Promise<void> {
    await RemoteConfig.setup(REMOTE_CONFIG_DEFAULT_VALUES);
  }

  componentDidCatch(error: Error): void {
    Crashlytics.recordError(error);
  }

  render(): JSX.Element {
    const { loading, token } = this.state;
    return (
      <Provider {...store}>
        <StatusBar animated barStyle="light-content" />
        <ThemeProvider theme={theme}>
          <>
            <If condition={loading}>
              <LoadingScene />
            </If>
            <If condition={!loading}>
              <Navigation
                token={token}
                setNavigationTop={(
                  navigatorRef: NavigationContainerRef,
                ): void => NavigationActions.setTopLevelNavigator(navigatorRef)}
              />
            </If>
            <ToastMessage position="top" />
            <CodePush setToken={this.setToken} setLoading={this.setLoading} />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}
