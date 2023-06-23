import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IconButton } from 'components/IconButton';
import { SubWalletAvatar } from 'components/SubWalletAvatar';
import { Gear, List, MagnifyingGlass, Plus, QrCode } from 'phosphor-react-native';
import React, { useCallback } from 'react';
import { ActivityIndicator, Settings, StyleProp, TouchableOpacity, View } from 'react-native';
import { RESULTS } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { RootStackParamList } from 'routes/index';
import { RootState } from 'stores/index';
import { ColorMap } from 'styles/color';
import { FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { SpaceStyle } from 'styles/space';
import { requestCameraPermission } from 'utils/permission/camera';
import Text from '../components/Text';
import AccountSelectField from './common/Account/AccountSelectField';
import { useNavigation } from '@react-navigation/native';

export interface HeaderProps {
  //navigation: NativeStackNavigationProp<RootStackParamList>;
  onPressSearchButton?: () => void;
}

const headerWrapper: StyleProp<any> = {
  backgroundColor: ColorMap.dark,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 40,
  position: 'relative',
  zIndex: 10,
};

const accountName: StyleProp<any> = {
  ...sharedStyles.mediumText,
  color: ColorMap.light,
  ...FontSemiBold,
  paddingLeft: 8,
};

export const Header = ({ onPressSearchButton }: HeaderProps) => {
  const navigation = useNavigation();
  const _onPressSearchButton = () => {
    onPressSearchButton && onPressSearchButton();
  };

  const onPressQrButton = useCallback(async () => {
    const result = await requestCameraPermission();

    if (result === RESULTS.GRANTED) {
      navigation.navigate('SigningAction', {
        screen: 'SigningScanPayload',
      });
    }
  }, [navigation]);

  return (
    <View style={[SpaceStyle.oneContainer, headerWrapper]}>
      <View style={{ marginLeft: -10 }}>
        <IconButton icon={QrCode} onPress={onPressQrButton} />
        {/* <IconButton
          icon={Gear}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        /> */}
      </View>

      <AccountSelectField onPress={() => navigation.navigate('AccountsScreen')} />
      {/* <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AccountsScreen');
          }}>
          <View style={{ flexDirection: 'row' }}>
            <SubWalletAvatar address={currentAccount?.address || ''} size={16} />
            {isAccountWaiting && (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: ColorMap.disabledOverlay,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={4} />
              </View>
            )}
            <Text style={accountName} numberOfLines={1}>
              {currentAccount ? currentAccount.name : ''}
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          //position: 'absolute',
          width: '24%',
          justifyContent: 'space-between',
          marginRight: -10,
        }}>
        <IconButton
          icon={Plus}
          onPress={() => {
            navigation.navigate('AccountsScreen');
          }}
        />
        {/* <IconButton icon={QrCode} onPress={onPressQrButton} /> */}
        <IconButton icon={MagnifyingGlass} onPress={_onPressSearchButton} />
      </View>
    </View>
  );
};
