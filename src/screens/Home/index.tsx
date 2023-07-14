import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StakingScreen from './Staking/StakingScreen';
import { View, Image, ImageStyle, Linking } from 'react-native';
import { Platform, TouchableOpacity } from 'react-native';
import { Aperture } from 'phosphor-react-native';
import { CryptoScreen } from 'screens/Home/Crypto';
import { Settings } from 'screens/Settings';
import { FontMedium } from 'styles/sharedStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BOTTOM_BAR_HEIGHT } from 'constants/index';
import { ColorMap } from 'styles/color';
import useCheckEmptyAccounts from 'hooks/useCheckEmptyAccounts';
import { FirstScreen } from 'screens/Home/FirstScreen';
//import { CrowdloansScreen } from 'screens/Home/Crowdloans';
import { BrowserScreen } from 'screens/Home/Browser';
import { HomeStackParamList } from 'routes/home';
import NFTStackScreen from 'screens/Home/NFT/NFTStackScreen';
import { Images } from 'assets/index';
import { ActivityIndicator } from 'components/design-system-ui';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';

const iconStyle: ImageStyle = {
  height: 24,
  width: 24,
};
const MainScreen = () => {
  const Tab = createBottomTabNavigator<HomeStackParamList>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={'Crypto'}
      screenOptions={{
        headerShown: false,
        tabBarButton: props => {
          let customStyle = {
            flexDirection: 'column',
            // opacity: !props.accessibilityState?.selected ? 0.2 : 1,
          };
          if (props.accessibilityState?.selected) {
            customStyle = {
              ...customStyle,
              // @ts-ignore
              backgroundColor: ColorMap.dark2,
              borderRadius: 20,
              marginBottom: 10,
            };
          }
          // @ts-ignore
          props.style = [[...props.style], customStyle];
          return <TouchableOpacity {...props} activeOpacity={1} />;
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarLabelStyle: {
          paddingBottom: insets.bottom && insets.bottom - 12,
          fontSize: 10,
          lineHeight: 25,
          ...FontMedium,
        },
        tabBarStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: ColorMap.dark1,
          borderRadius: 20,
          // borderTopWidth: 1,
          paddingLeft: 16,
          paddingRight: 16,
          height: BOTTOM_BAR_HEIGHT + (insets.bottom ? insets.bottom - 15 : insets.bottom),
        },
        tabBarActiveTintColor: ColorMap.disabled,
        tabBarInactiveTintColor: ColorMap.disabled,
      }}>
      <Tab.Screen
        name={'Crypto'}
        component={CryptoScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Image source={Images.wallet} style={iconStyle} />; //<Wallet size={24} color={color} weight={'fill'} />;
          },
          tabBarLabel: 'Wallet',
        }}
      />
      <Tab.Screen
        name={'NFT'}
        component={NFTStackScreen}
        options={{
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarIcon: ({ color }) => {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View
                  style={{ backgroundColor: 'white', borderRadius: 30, height: 17, width: 17, position: 'absolute' }}
                />
                <Aperture size={24} color={color} weight={'fill'} />
              </View>
            );
          },
        }}
      />
      {/* <Tab.Screen
        name={'Crowdloans'}
        component={CrowdloansScreen}
        options={{
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarIcon: ({ color }) => {
            return <Rocket size={24} color={color} weight={'fill'} />;
          },
        }}
      /> */}
      <Tab.Screen
        name={'Staking'}
        component={StakingScreen}
        options={{
          tabBarHideOnKeyboard: Platform.OS === 'android',
          tabBarIcon: ({ color }) => {
            return <Image source={Images.swap} style={iconStyle} />; //<Database size={24} color={color} weight={'fill'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Browser'}
        component={BrowserScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Image source={Images.browser} style={iconStyle} />; //<GlobeSimple size={24} color={color} weight={'fill'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => {
            return <Image source={Images.setting} style={iconStyle} />; //<Gear size={24} color={color} weight={'fill'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export const Home = () => {
  const isEmptyAccounts = useCheckEmptyAccounts();
  const { isReady } = useSelector((state: RootState) => state.accountState);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            Linking.openURL(url);
          }
        })
        .catch(e => console.warn('e', e));
    }
    if (isReady && isLoading) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [isReady, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator indicatorColor="white" size={30} />
      </View>
    );
  }

  return <>{isEmptyAccounts ? <FirstScreen /> : <MainScreen />}</>;
};
