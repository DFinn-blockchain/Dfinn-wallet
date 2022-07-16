import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NFTTab } from './NFTTab';
import { CrowdloansTab } from './CrowdloansTab';
import { StakingTab } from './StakingTab';

import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { TouchableHighlight } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Aperture, CurrencyCircleDollar, Database, GlobeSimple, Rocket } from 'phosphor-react-native';
import { CryptoTab } from 'screens/Home/CtyptoTab';
import { FontMedium } from 'styles/sharedStyles';
import { BrowserTab } from 'screens/Home/BrowserTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BOTTOM_BAR_HEIGHT } from '../../constant';

type HomeStackParamList = {
  Crypto: undefined;
  NFT: undefined;
  Crowdloans: undefined;
  Staking: undefined;
  Browser: undefined;
};

export type HomeNavigationProps = NativeStackScreenProps<HomeStackParamList>['navigation'];
export type HomeRouteProps = NativeStackScreenProps<HomeStackParamList>['route'];

export const Home = () => {
  const Tab = createBottomTabNavigator<HomeStackParamList>();
  const swThemeColor = useSubWalletTheme().colors;
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={'Crypto'}
      screenOptions={{
        headerShown: false,
        tabBarButton: props => {
          let customStyle = {
            opacity: !props.accessibilityState?.selected ? 0.2 : 1,
          };
          if (props.accessibilityState?.selected) {
            customStyle = {
              ...customStyle,
              // @ts-ignore
              borderTopWidth: 2,
              borderTopColor: swThemeColor.secondary,
              marginTop: -2,
            };
          }
          // @ts-ignore
          props.style = [[...props.style], customStyle];
          if (!props.accessibilityState?.selected) {
            return <TouchableHighlight disabled={true} {...props} />;
          } else {
            return <TouchableHighlight {...props} />;
          }
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarLabelStyle: {
          paddingBottom: insets.bottom + 2,
          fontSize: 12,
          lineHeight: 25,
          ...FontMedium,
        },
        tabBarStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: swThemeColor.background,
          borderTopWidth: 1,
          paddingLeft: 16,
          paddingRight: 16,
          height: BOTTOM_BAR_HEIGHT + insets.bottom,
        },
        tabBarActiveTintColor: swThemeColor.secondary,
        tabBarInactiveTintColor: swThemeColor.textColor,
      }}>
      <Tab.Screen
        name={'Crypto'}
        component={CryptoTab}
        options={{
          tabBarIcon: ({ color }) => {
            return <CurrencyCircleDollar size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'NFT'}
        component={NFTTab}
        options={{
          tabBarIcon: ({ color }) => {
            return <Aperture size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Crowdloans'}
        component={CrowdloansTab}
        options={{
          tabBarIcon: ({ color }) => {
            return <Rocket size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Staking'}
        component={StakingTab}
        options={{
          tabBarIcon: ({ color }) => {
            return <Database size={24} color={color} weight={'bold'} />;
          },
        }}
      />
      <Tab.Screen
        name={'Browser'}
        component={BrowserTab}
        options={{
          tabBarIcon: ({ color }) => {
            return <GlobeSimple size={24} color={color} weight={'bold'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
