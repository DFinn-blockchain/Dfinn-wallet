// Copyright 2019-2022 @subwallet/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { WebViewProvider } from 'providers/WebViewProvider';
import { Home } from 'screens/Home';
import { persistor, store } from './stores';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { CreateAccount } from 'screens/CreateAccount';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeContext } from 'providers/contexts';
import { THEME_PRESET } from 'styles/themes';
import { Header } from 'components/Header';
import { ToastProvider } from 'react-native-toast-notifications';
import { AccountList } from 'screens/AccountList';
import { PersistGate } from 'redux-persist/integration/react';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { QrScanner } from 'screens/QrScanner';
import { QrScannerProvider } from 'providers/QrScannerProvider';
import { RootStackParamList } from 'types/routes';

cryptoWaitReady().then(rs => {
  console.debug('crypto-ready', rs);
});

export const App = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? THEME_PRESET.dark : THEME_PRESET.light;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider
          placement="top"
          normalColor={theme.colors.notification}
          successColor={theme.colors.primary}
          warningColor={theme.colors.notification_warning}
          dangerColor={theme.colors.notification_danger}>
          <WebViewProvider>
            <QrScannerProvider navigationRef={navigationRef}>
              <ThemeContext.Provider value={theme}>
                <StatusBar backgroundColor={theme.colors.background} />
                <Header navigationRef={navigationRef} />
                <NavigationContainer ref={navigationRef} theme={theme}>
                  <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                      animation: 'fade_from_bottom',
                    }}>
                    <Stack.Group screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Home" component={Home} />
                      <Stack.Screen
                        name="CreateAccount"
                        component={CreateAccount}
                        options={{ title: 'Create Account' }}
                      />
                      <Stack.Screen name="AccountList" component={AccountList} options={{ title: 'Account List' }} />
                    </Stack.Group>
                    <Stack.Group
                      screenOptions={{
                        presentation: 'modal',
                        headerShown: false,
                      }}>
                      <Stack.Screen name="QrScanner" component={QrScanner} />
                    </Stack.Group>
                  </Stack.Navigator>
                </NavigationContainer>
              </ThemeContext.Provider>
            </QrScannerProvider>
          </WebViewProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
