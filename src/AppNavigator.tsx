import { NavigationState } from '@react-navigation/routers';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-base/constants';
import React, { useCallback, useEffect, useMemo, useState, ComponentType, useRef } from 'react';
import { LinkingOptions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import AttachReadOnly from 'screens/Account/AttachReadOnly';
import ConnectKeystone from 'screens/Account/ConnectQrSigner/ConnectKeystone';
import ConnectParitySigner from 'screens/Account/ConnectQrSigner/ConnectParitySigner';
import ImportQrCode from 'screens/Account/ImportQrCode';
import { AppNavigatorDeepLinkStatus, Home } from 'screens/Home';
import { setPrevDeeplinkUrl } from './App';
import Login from 'screens/MasterPassword/Login';
import { NetworksSetting } from 'screens/NetworksSetting';
import { Settings } from 'screens/Settings';
import { SendFund } from 'screens/Transaction/SendFund';
import TransferNftScreen from 'screens/TransferNft/TransferNftScreen';
import { BrowserSearch } from 'screens/Home/Browser/BrowserSearch';
import { BrowserTabsManager } from 'screens/Home/Browser/BrowserTabsManager';
import { FavouritesDetail } from 'screens/Home/Browser/FavouritesDetail';
import { HistoryDetail } from 'screens/Home/Browser/HistoryDetail';
import { AccountsScreen } from 'screens/Account/AccountsScreen';
import CreateMasterPassword from 'screens/MasterPassword/CreateMasterPassword';
import { CreateAccount } from 'screens/Account/CreateAccount';
import { AccountDetail } from 'screens/Account/AccountDetail';
import { RestoreJson } from 'screens/Account/RestoreJson';
import { ImportSecretPhrase } from 'screens/Account/ImportSecretPhrase';
import { ImportPrivateKey } from 'screens/Account/ImportPrivateKey';
import { DAppAccessScreen } from 'screens/Settings/Security/DAppAccess';
import { ConnectionList } from 'screens/Settings/WalletConnect/ConnectionList';
import { ConnectWalletConnect } from 'screens/Settings/WalletConnect/ConnectWalletConnect';
import { ConnectionDetail } from 'screens/Settings/WalletConnect/ConnectionDetail';
import { DAppAccessDetailScreen } from 'screens/Settings/Security/DAppAccess/DAppAccessDetailScreen';
import { Languages } from 'screens/Settings/Languages';
import { Security } from 'screens/Settings/Security';
import { ManageAddressBook } from 'screens/Settings/AddressBook';
import { PinCodeScreen } from 'screens/Settings/Security/PinCodeScreen';
import { transformUniversalToNative } from 'utils/deeplink';
import { AccountExport } from 'screens/Account/AccountExport';
import { CustomTokenSetting } from 'screens/Tokens';
import { NetworkConfig } from 'screens/Settings/NetworkConfig';
import { NetworkConfigDetail } from 'screens/Settings/NetworkConfigDetail';
import { ConfigureToken } from 'screens/Tokens/ConfigureToken';
import { ImportToken } from 'screens/ImportToken/ImportToken';
import ImportNft from 'screens/ImportToken/ImportNft';
import { WebViewDebugger } from 'screens/WebViewDebugger';
import SigningScreen from 'screens/Signing/SigningScreen';
import { LoadingScreen } from 'screens/LoadingScreen';
import { RootRouteProps, RootStackParamList } from './routes';
import { THEME_PRESET } from 'styles/themes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getValidURL } from 'utils/browser';
import ErrorBoundary from 'react-native-error-boundary';
import ApplyMasterPassword from 'screens/MasterPassword/ApplyMasterPassword';
import { NetworkSettingDetail } from 'screens/NetworkSettingDetail';
import { Confirmations } from 'screens/Confirmations';
import { TransactionDone } from 'screens/Transaction';
import ErrorFallback from 'components/common/ErrorFallbackScreen';
import ChangeMasterPassword from 'screens/MasterPassword/ChangeMasterPassword';
import { ImportNetwork } from 'screens/ImportNetwork';
import History from 'screens/Home/History';
import withPageWrapper from 'components/pageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { AddProvider } from 'screens/AddProvider';
import TransactionScreen from 'screens/Transaction/TransactionScreen';
import SendNFT from 'screens/Transaction/NFT';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Linking, Platform } from 'react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import urlParse from 'url-parse';
import queryString from 'querystring';
import { connectWalletConnect } from 'utils/walletConnect';
import { useToast } from 'react-native-toast-notifications';
import { updateIsDeepLinkConnect } from 'stores/base/Settings';

interface Props {
  isAppReady: boolean;
}

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

const HistoryScreen = (props: JSX.IntrinsicAttributes) => {
  return withPageWrapper(History, ['transactionHistory'])(props);
};

const ConnectionListScreen = (props: JSX.IntrinsicAttributes) => {
  return withPageWrapper(ConnectionList as ComponentType, ['walletConnect'])(props);
};

const AppNavigator = ({ isAppReady }: Props) => {
  const isDarkMode = true;
  const theme = isDarkMode ? THEME_PRESET.dark : THEME_PRESET.light;
  const appTheme = useSubWalletTheme().swThemes;
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [currentRoute, setCurrentRoute] = useState<RootRouteProps | undefined>(undefined);
  const toast = useToast();
  const { hasConfirmations } = useSelector((state: RootState) => state.requestState);
  const { accounts, hasMasterPassword, isReady } = useSelector((state: RootState) => state.accountState);
  const isPreventDeepLinkRef = useRef(!hasMasterPassword || hasConfirmations);
  const appNavigatorDeepLinkStatus = useRef<AppNavigatorDeepLinkStatus>(AppNavigatorDeepLinkStatus.AVAILABLE);
  const dispatch = useDispatch();
  const finishLoginProgressRef = useRef<Function | null>(null);
  const waitForLoginProcessRef = useRef<Promise<boolean> | null>(null);

  const needMigrate = useMemo(
    () =>
      !!accounts.filter(acc => acc.address !== ALL_ACCOUNT_KEY && !acc.isExternal).filter(acc => !acc.isMasterPassword)
        .length,
    [accounts],
  );

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['dfinnwallet://'],
    config,
  };

  const onError = (error: Error, stackTrace: string) => {
    console.log('AppNavigator.tsx / Error boundary: ', error, stackTrace);
  };

  const onUpdateRoute = useCallback((state: NavigationState | undefined) => {
    setCurrentRoute(state?.routes[state?.index]);
  }, []);
  useEffect(() => {
    if (isReady) {
      Linking.addEventListener('url', ({ url }) => {
        let currentUrl = url;
        if (url.startsWith('wc:')) {
          if (url.includes('?requestId')) {
            const query = encodeURIComponent(url.split('wc')[2]);
            currentUrl = `dfinnwallet://wc${query}`;
          } else {
            const query = encodeURIComponent(url);
            currentUrl = `dfinnwallet://wc?uri=${query}`;
          }
        }

        const _url = transformUniversalToNative(currentUrl);
        if (isPreventDeepLinkRef.current) {
          return;
        }
        if (appNavigatorDeepLinkStatus.current === AppNavigatorDeepLinkStatus.BLOCK) {
          appNavigatorDeepLinkStatus.current = AppNavigatorDeepLinkStatus.RESET;
        }
        const urlParsed = new urlParse(_url);
        setPrevDeeplinkUrl('');

        if (urlParsed.hostname === 'wc') {
          dispatch(updateIsDeepLinkConnect(true));
          if (urlParsed.query.startsWith('?requestId')) {
            return;
          }
          const decodedWcUrl = queryString.decode(urlParsed.query.slice(5));
          const finalWcUrl = Object.keys(decodedWcUrl)[0];
          connectWalletConnect(finalWcUrl, toast);
        }

        if (appNavigatorDeepLinkStatus.current === AppNavigatorDeepLinkStatus.AVAILABLE) {
          waitForLoginProcessRef.current = new Promise(resolve => {
            finishLoginProgressRef.current = resolve;
          });
          (async () => {
            await waitForLoginProcessRef.current;
            Linking.openURL(_url);
            appNavigatorDeepLinkStatus.current = AppNavigatorDeepLinkStatus.BLOCK;
            waitForLoginProcessRef.current = null;
            finishLoginProgressRef.current = null;
          })();
        }
        if (appNavigatorDeepLinkStatus.current === AppNavigatorDeepLinkStatus.RESET) {
          appNavigatorDeepLinkStatus.current = AppNavigatorDeepLinkStatus.AVAILABLE;
        }
      });
      return () => Linking.removeAllListeners('url');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);


  useEffect(() => {
    isPreventDeepLinkRef.current = !hasMasterPassword || hasConfirmations;
  }, [hasConfirmations, hasMasterPassword]);

  useEffect(() => {
    let amount = true;
    if (hasConfirmations && currentRoute && amount) {
      if (currentRoute.name !== 'Confirmations' && amount) {
        if (currentRoute.name !== 'CreateAccount' && amount) {
          navigationRef.current?.navigate('Confirmations');
        }
      }
    }

    return () => {
      amount = false;
    };
  }, [hasConfirmations, navigationRef, currentRoute]);

  useEffect(() => {
    let amount = true;
    if (needMigrate && hasMasterPassword && currentRoute && amount) {
      if (currentRoute.name !== 'MigratePassword' && amount) {
        navigationRef.current?.navigate('MigratePassword');
      }
    }
    return () => {
      amount = false;
    };
  }, [currentRoute, hasMasterPassword, navigationRef, needMigrate]);

  return (
    <NavigationContainer linking={linking} ref={navigationRef} theme={theme} onStateChange={onUpdateRoute}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <Stack.Navigator
          screenOptions={{
            animation: 'fade',
          }}
          screenListeners={{
            focus: e => {
              if (Platform.OS === 'android') {
                if (e.target?.split('-')[0] === 'Home') {
                  changeNavigationBarColor(appTheme.colorBgSecondary);
                } else {
                  changeNavigationBarColor(appTheme.colorBgDefault);
                }
              }
            },
          }}>
          {isAppReady && (
            <>
              <Stack.Group screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
                <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
                <Stack.Screen name="NetworksSetting" component={NetworksSetting} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="SendFund" component={SendFund} options={{ gestureEnabled: false }} />
                <Stack.Screen name="SendNFT" component={SendNFT} options={{ gestureEnabled: false }} />
                <Stack.Screen name="TransferNft" component={TransferNftScreen} options={{ gestureEnabled: false }} />
                <Stack.Screen name="BrowserSearch" component={BrowserSearch} />
                <Stack.Screen name="BrowserTabsManager" component={BrowserTabsManager} />
                <Stack.Screen name="FavouritesGroupDetail" component={FavouritesDetail} />
                <Stack.Screen name="HistoryGroupDetail" component={HistoryDetail} />
                <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
              </Stack.Group>
              <Stack.Group screenOptions={{ headerShown: false, animation: 'default' }}>
                <Stack.Screen
                  name="CreatePassword"
                  component={CreateMasterPassword}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="NetworkSettingDetail" component={NetworkSettingDetail} />
                <Stack.Screen name="ImportNetwork" component={ImportNetwork} options={{ gestureEnabled: false }} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen
                  name="MigratePassword"
                  component={ApplyMasterPassword}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="AddProvider" component={AddProvider} />
                <Stack.Screen name="EditAccount" component={AccountDetail} />
                <Stack.Screen name="RestoreJson" component={RestoreJson} options={{ gestureEnabled: false }} />
                <Stack.Screen
                  name="ImportSecretPhrase"
                  component={ImportSecretPhrase}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="ImportPrivateKey"
                  component={ImportPrivateKey}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="DAppAccess" component={DAppAccessScreen} />
                <Stack.Screen name="DAppAccessDetail" component={DAppAccessDetailScreen} />
                <Stack.Screen name="Languages" component={Languages} />
                <Stack.Screen name="Security" component={Security} />
                <Stack.Screen name="ManageAddressBook" component={ManageAddressBook} />
                <Stack.Screen name="ConnectList" component={ConnectionListScreen} />
                <Stack.Screen name="ConnectDetail" component={ConnectionDetail} />
                <Stack.Screen name="ConnectWalletConnect" component={ConnectWalletConnect} />
                <Stack.Screen name="PinCode" component={PinCodeScreen} />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangeMasterPassword}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen name="AccountExport" component={AccountExport} />
                <Stack.Screen name="CustomTokenSetting" component={CustomTokenSetting} />
                <Stack.Screen name="NetworkConfig" component={NetworkConfig} />
                <Stack.Screen name="NetworkConfigDetail" component={NetworkConfigDetail} />
                <Stack.Screen name="ConfigureToken" component={ConfigureToken} />
                <Stack.Screen name="ImportToken" component={ImportToken} options={{ gestureEnabled: false }} />
                <Stack.Screen name="ImportNft" component={ImportNft} options={{ gestureEnabled: false }} />
                <Stack.Screen name="WebViewDebugger" component={WebViewDebugger} />
                <Stack.Screen name="SigningAction" component={SigningScreen} options={{ gestureEnabled: false }} />
                <Stack.Screen name="TransactionDone" component={TransactionDone} options={{ gestureEnabled: false }} />
                <Stack.Screen name="ConnectParitySigner" component={ConnectParitySigner} />
                <Stack.Screen name="ConnectKeystone" component={ConnectKeystone} />
                <Stack.Screen name="AttachReadOnly" component={AttachReadOnly} options={{ gestureEnabled: false }} />
                <Stack.Screen name="ImportQrCode" component={ImportQrCode} />
                <Stack.Screen
                  name="TransactionAction"
                  component={TransactionScreen}
                  options={{ gestureEnabled: false }}
                />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  presentation: 'transparentModal',
                  contentStyle: { backgroundColor: theme.swThemes.colorBgMask },
                  headerShown: false,
                }}>
                <Stack.Screen
                  name="Confirmations"
                  component={Confirmations}
                  options={{ gestureEnabled: false, animationDuration: 100 }}
                />
                <Stack.Screen name="Login" component={Login} />
              </Stack.Group>
            </>
          )}
          {!isAppReady && <Stack.Screen name="LoadingScreen" component={LoadingScreen} />}
        </Stack.Navigator>
      </ErrorBoundary>
    </NavigationContainer>
  );
};

export default AppNavigator;
