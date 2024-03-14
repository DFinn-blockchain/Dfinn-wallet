// Copyright 2019-2022 @subwallet/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0
import useStoreStakeUnlockingInfo from 'hooks/store/useStoreStakeUnlockingInfo';
import useStoreStaking from 'hooks/store/useStoreStaking';
import useStoreStakingReward from 'hooks/store/useStoreStakingReward';
import { ExternalRequestContextProvider } from 'providers/ExternalRequestContext';
import { QrSignerContextProvider } from 'providers/QrSignerContext';
import { ScannerContextProvider } from 'providers/ScannerContext';
import { SigningContextProvider } from 'providers/SigningContext';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinkingOptions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { CreateAccount } from 'screens/Account/CreateAccount';
import { AppState, Platform, StatusBar, StyleProp, View } from 'react-native';
import { ThemeContext } from 'providers/contexts';
import ImportNft from 'screens/ImportToken/ImportNft';
import SigningScreen from 'screens/Signing/SigningScreen';
// import CompoundActionScreen from 'screens/Staking/Compound/CompoundActionScreen';
// import WithdrawActionScreen from 'screens/Staking/Withdraw/WithdrawActionScreen';
import { THEME_PRESET } from 'styles/themes';
import { ToastProvider } from 'react-native-toast-notifications';
import { RootStackParamList } from 'routes/index';
import { Home } from 'screens/Home';
import { AccountsScreen } from 'screens/Account/AccountsScreen';
import { AccountDetail } from 'screens/Account/AccountDetail';
import { RestoreJson } from 'screens/Account/RestoreJson';
import { ImportSecretPhrase } from 'screens/Account/ImportSecretPhrase';
import { NetworksSetting } from 'screens/NetworksSetting';
import { STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import { Settings } from 'screens/Settings';
import { Languages } from 'screens/Settings/Languages';
import { Invite } from 'screens/Settings/Invite';
import { Security } from 'screens/Settings/Security';
import { ImportPrivateKey } from 'screens/Account/ImportPrivateKey';
import { PinCodeScreen } from 'screens/Settings/Security/PinCodeScreen';
import { WebViewDebugger } from 'screens/WebViewDebugger';
import { StoreStatus } from 'stores/types';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import useAppLock from 'hooks/useAppLock';
import useCryptoReady from 'hooks/init/useCryptoReady';
import useSetupI18n from 'hooks/init/useSetupI18n';
import useStoreAccounts from 'hooks/store/useStoreAccounts';
import useStoreSettings from 'hooks/store/useStoreSettings';
import useStoreNetworkMap from 'hooks/store/useStoreNetworkMap';
import useStoreChainRegistry from 'hooks/store/useStoreChainRegistry';
import useStorePrice from 'hooks/store/useStorePrice';
import useStoreBalance from 'hooks/store/useStoreBalance';
import useStoreTransactionHistory from 'hooks/store/useStoreTransactionHistory';
import SplashScreen from 'react-native-splash-screen';
import { LockScreen } from 'screens/LockScreen';
import { LoadingScreen } from 'screens/LoadingScreen';
import useStoreCrowdloan from 'hooks/store/useStoreCrowdloan';
import { BrowserSearch } from 'screens/Home/Browser/BrowserSearch';
import useStoreConfirmation from 'hooks/store/useStoreConfirmation';
import useStoreNftCollection from 'hooks/store/useStoreNftCollection';
import useStoreNft from 'hooks/store/useStoreNft';
import useStoreAuthUrls from 'hooks/store/useStoreAuthUrls';
import { ConfirmationPopup } from 'screens/Home/Browser/ConfirmationPopup';
import { FavouritesDetail } from 'screens/Home/Browser/FavouritesDetail';
import { HistoryDetail } from 'screens/Home/Browser/HistoryDetail';
import { ColorMap } from 'styles/color';
import { DAppAccessScreen } from 'screens/Settings/Security/DAppAccess';
import { DAppAccessDetailScreen } from 'screens/Settings/Security/DAppAccess/DAppAccessDetailScreen';
import { BrowserTabsManager } from 'screens/Home/Browser/BrowserTabsManager';
import { AutoLockState } from 'utils/autoLock';
import { getValidURL } from 'utils/browser';
import { ConfigureToken } from 'screens/Tokens/ConfigureToken';
import useStoreCustomToken from 'hooks/store/useStoreCustomToken';
import { ImportToken } from 'screens/ImportToken/ImportToken';
// import StakeActionScreen from 'screens/Staking/Stake/StakeActionScreen';
// import UnStakeActionScreen from 'screens/Staking/UnStake/UnStakeActionScreen';
import { AccountExport } from 'screens/Account/AccountExport';
import useStoreBackgroundService from 'hooks/store/useStoreBackgroundService';
// import ClaimActionScreen from 'screens/Staking/Claim/ClaimActionScreen';
import { NetworkConfig } from 'screens/Settings/NetworkConfig';
import { NetworkConfigDetail } from 'screens/Settings/NetworkConfigDetail';
import { CustomTokenSetting } from 'screens/Tokens';
import { HIDE_MODAL_DURATION, TOAST_DURATION } from 'constants/index';
import { SendFund } from 'screens/Transaction/SendFund';

export let prevDeeplinkUrl = '';
export function setPrevDeeplinkUrl(value: string) {
  prevDeeplinkUrl = value;
}

const viewContainerStyle: StyleProp<any> = {
  position: 'relative',
  flex: 1,
};

const layerScreenStyle: StyleProp<any> = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  backgroundColor: ColorMap.dark1,
  zIndex: 10,
};

function checkRequiredStoresReady(
  accountsStoreStatus: StoreStatus,
  settingsStoreStatus: StoreStatus,
  networkMapStoreStatus: StoreStatus,
): boolean {
  return ![accountsStoreStatus, settingsStoreStatus, networkMapStoreStatus].includes('INIT');
}

AutoLockState.isPreventAutoLock = false;
const autoLockParams: { pinCodeEnabled: boolean; faceIdEnabled: boolean; autoLockTime?: number; lock: () => void } = {
  pinCodeEnabled: false,
  faceIdEnabled: false,
  autoLockTime: undefined,
  lock: () => {},
};
let timeout: NodeJS.Timeout | undefined;
let lockWhenActive = false;
AppState.addEventListener('change', (state: string) => {
  const { pinCodeEnabled, faceIdEnabled, autoLockTime, lock } = autoLockParams;
  if (!pinCodeEnabled || autoLockTime === undefined) {
    return;
  }

  if (state === 'background') {
    timeout = setTimeout(() => {
      if (AutoLockState.isPreventAutoLock) {
        return;
      }
      if (faceIdEnabled) {
        lockWhenActive = true;
      } else {
        lockWhenActive = false;
        Platform.OS === 'android' ? setTimeout(() => lock(), HIDE_MODAL_DURATION) : lock();
      }
    }, autoLockTime);
  } else if (state === 'active') {
    if (lockWhenActive) {
      if (!AutoLockState.isPreventAutoLock) {
        Platform.OS === 'android' ? setTimeout(() => lock(), HIDE_MODAL_DURATION) : lock();
      }
      lockWhenActive = false;
    }
    timeout && clearTimeout(timeout);
    timeout = undefined;
  }
});

let firstTimeCheckPincode: boolean | undefined;

const config: LinkingOptions<RootStackParamList>['config'] = {
  screens: {
    BrowserTabsManager: {
      path: 'browser',
      parse: {
        url: url => {
          try {
            return getValidURL(decodeURIComponent(url));
          } catch (e) {
            console.log('Cannot decode url ' + url);
            return getValidURL(url);
          }
        },
        name: name => name || '',
      },
      stringify: {
        url: url => url,
        name: name => name || '',
      },
    },
  },
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['dfinnwallet://'],
  config,
};

export const App = () => {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isDarkMode = true;
  const theme = isDarkMode ? THEME_PRESET.dark : THEME_PRESET.light;
  StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');

  const { pinCodeEnabled, faceIdEnabled, autoLockTime } = useSelector((state: RootState) => state.mobileSettings);
  const { isLocked, lock } = useAppLock();

  const isCryptoReady = useCryptoReady();
  const isI18nReady = useSetupI18n().isI18nReady;
  // Fetching data from web-runner to redux
  const accountsStoreStatus = useStoreAccounts();
  const settingsStoreStatus = useStoreSettings();
  const networkMapStoreStatus = useStoreNetworkMap();

  useStoreBackgroundService();

  // Nft
  useStoreNftCollection();
  useStoreNft();

  useStoreChainRegistry();
  useStorePrice();
  useStoreBalance();
  useStoreTransactionHistory();
  useStoreCrowdloan();
  useStoreAuthUrls();
  useStoreConfirmation();
  useStoreCustomToken();

  // Staking
  useStoreStaking();
  useStoreStakingReward();
  useStoreStakeUnlockingInfo();
  // const networkMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);
  // const disconnectedProviders = Object.values(networkMap).filter(
  //   item => item.apiStatus && item.apiStatus !== NETWORK_STATUS.CONNECTED,
  // );

  // useEffect(() => {
  //   if (disconnectedProviders && disconnectedProviders.length) {
  //     const disconnectedProvidersStr = disconnectedProviders.map(item => item.chain);
  //     Alert.alert(
  //       'Warning',
  //       `${i18n.common.providerErrorMessagePart1}${disconnectedProvidersStr.join(', ')}${
  //         i18n.common.providerErrorMessagePart2
  //       }`,
  //       [
  //         { text: i18n.common.cancel, style: 'cancel' },
  //         { text: i18n.common.goToNetworkConfig, onPress: () => navigationRef.navigate('NetworkConfig') },
  //       ],
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [navigationRef]);

  // Enable lock screen on the start app
  useEffect(() => {
    if (!firstTimeCheckPincode && pinCodeEnabled) {
      lock();
    }
    firstTimeCheckPincode = true;
  }, [lock, pinCodeEnabled]);

  useEffect(() => {
    autoLockParams.lock = lock;
    autoLockParams.autoLockTime = autoLockTime;
    autoLockParams.pinCodeEnabled = pinCodeEnabled;
    autoLockParams.faceIdEnabled = faceIdEnabled;
  }, [autoLockTime, faceIdEnabled, lock, pinCodeEnabled]);

  const isRequiredStoresReady = checkRequiredStoresReady(
    accountsStoreStatus,
    settingsStoreStatus,
    networkMapStoreStatus,
  );

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, []);

  const isAppReady = isRequiredStoresReady && isCryptoReady && isI18nReady;

  return (
    <View style={viewContainerStyle}>
      <View style={{ flex: 1 }}>
        <ToastProvider
          duration={TOAST_DURATION}
          placement="top"
          normalColor={theme.colors.notification}
          textStyle={{ textAlign: 'center' }}
          successColor={theme.colors.primary}
          warningColor={theme.colors.notification_warning}
          offsetTop={STATUS_BAR_HEIGHT + 40}
          dangerColor={theme.colors.notification_danger}>
          <ThemeContext.Provider value={theme}>
            <SigningContextProvider>
              <ExternalRequestContextProvider>
                <QrSignerContextProvider>
                  <ScannerContextProvider>
                    <NavigationContainer linking={linking} ref={navigationRef} theme={theme}>
                      <Stack.Navigator
                        screenOptions={{
                          animation: 'fade',
                        }}>
                        {isAppReady && (
                          <>
                            <Stack.Group screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
                              <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
                              <Stack.Screen name="NetworksSetting" component={NetworksSetting} />
                              <Stack.Screen name="Settings" component={Settings} />
                              <Stack.Screen name="SendFund" component={SendFund} options={{ gestureEnabled: false }} />
                              <Stack.Screen name="BrowserSearch" component={BrowserSearch} />
                              <Stack.Screen name="BrowserTabsManager" component={BrowserTabsManager} />
                              <Stack.Screen name="FavouritesGroupDetail" component={FavouritesDetail} />
                              <Stack.Screen name="HistoryGroupDetail" component={HistoryDetail} />
                              <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
                            </Stack.Group>
                            <Stack.Group screenOptions={{ headerShown: false, animation: 'default' }}>
                              <Stack.Screen name="CreateAccount" component={CreateAccount} />
                              <Stack.Screen name="Invite" component={Invite} />
                              <Stack.Screen name="EditAccount" component={AccountDetail} />
                              <Stack.Screen name="RestoreJson" component={RestoreJson} />
                              <Stack.Screen name="ImportSecretPhrase" component={ImportSecretPhrase} />
                              <Stack.Screen name="ImportPrivateKey" component={ImportPrivateKey} />
                              <Stack.Screen name="DAppAccess" component={DAppAccessScreen} />
                              <Stack.Screen name="DAppAccessDetail" component={DAppAccessDetailScreen} />
                              <Stack.Screen name="Languages" component={Languages} />
                              <Stack.Screen name="Security" component={Security} />
                              <Stack.Screen name="PinCode" component={PinCodeScreen} />
                              <Stack.Screen name="AccountExport" component={AccountExport} />
                              <Stack.Screen name="CustomTokenSetting" component={CustomTokenSetting} />
                              <Stack.Screen name="NetworkConfig" component={NetworkConfig} />
                              <Stack.Screen name="NetworkConfigDetail" component={NetworkConfigDetail} />
                              <Stack.Screen name="ConfigureToken" component={ConfigureToken} />
                              <Stack.Screen name="ImportToken" component={ImportToken} />
                              {/* <Stack.Screen
                                name="StakeAction"
                                component={StakeActionScreen}
                                options={{ gestureEnabled: false }}
                              /> */}
                              <Stack.Screen name="ImportNft" component={ImportNft} />
                              <Stack.Screen name="WebViewDebugger" component={WebViewDebugger} />
                              {/* <Stack.Screen
                                name="UnStakeAction"
                                component={UnStakeActionScreen}
                                options={{ gestureEnabled: false }}
                              />
                              <Stack.Screen
                                name="ClaimStakeAction"
                                component={ClaimActionScreen}
                                options={{ gestureEnabled: false }}
                              />
                              <Stack.Screen
                                name="WithdrawStakeAction"
                                component={WithdrawActionScreen}
                                options={{ gestureEnabled: false }}
                              /> */}
                              {/* <Stack.Screen
                                name="CompoundStakeAction"
                                component={CompoundActionScreen}
                                options={{ gestureEnabled: false }}
                              /> */}
                              <Stack.Screen
                                name="SigningAction"
                                component={SigningScreen}
                                options={{ gestureEnabled: false }}
                              />
                            </Stack.Group>
                            <Stack.Group
                              screenOptions={{
                                presentation: 'transparentModal',
                                contentStyle: { backgroundColor: ColorMap.modalBackDropDarkColor },
                                headerShown: false,
                              }}>
                              <Stack.Screen name="ConfirmationPopup" component={ConfirmationPopup} />
                            </Stack.Group>
                          </>
                        )}
                        {!isAppReady && <Stack.Screen name="LoadingScreen" component={LoadingScreen} />}
                      </Stack.Navigator>
                    </NavigationContainer>
                  </ScannerContextProvider>
                </QrSignerContextProvider>
              </ExternalRequestContextProvider>
            </SigningContextProvider>
          </ThemeContext.Provider>
        </ToastProvider>
      </View>
      {!isAppReady && (
        <View style={layerScreenStyle}>
          <LoadingScreen />
        </View>
      )}
      {isLocked && (
        <View style={layerScreenStyle}>
          <LockScreen />
        </View>
      )}
    </View>
  );
};

export default App;
