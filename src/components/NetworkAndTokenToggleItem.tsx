import React from 'react';
import { StyleProp, Switch, View } from 'react-native';
import Text from 'components/Text';
import { getNetworkLogo } from 'utils/index';
import { ColorMap } from 'styles/color';
import { FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { Divider } from './Divider';
import GradientCheck from './GradientCheck';

interface Props {
  itemName: string;
  itemKey: string;
  isEnabled: boolean;
  onValueChange: () => void;
  isDisableSwitching?: boolean;
}

const itemArea: StyleProp<any> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 16,
  alignItems: 'center',
  paddingHorizontal: 16,
  flex: 1,
};

const itemBodyArea: StyleProp<any> = {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  paddingRight: 16,
};

const itemSeparator: StyleProp<any> = {
  backgroundColor: ColorMap.dark2,
  height: 1,
  marginLeft: 64,
  marginRight: 16,
};

const itemTextStyle: StyleProp<any> = {
  paddingLeft: 16,
  color: ColorMap.light,
  ...sharedStyles.mediumText,
  ...FontSemiBold,
  flex: 1,
};

const logoWrapperStyle: StyleProp<any> = {
  backgroundColor: ColorMap.dark,
  borderRadius: 40,
};

export const NetworkAndTokenToggleItem = ({
  itemKey,
  itemName,
  isEnabled,
  onValueChange,
  isDisableSwitching,
}: Props) => {
  return (
    <View style={{}}>
      <View style={itemArea}>
        <View style={itemBodyArea}>
          <View style={logoWrapperStyle}>{getNetworkLogo(itemKey, 40)}</View>

          <Text numberOfLines={1} style={itemTextStyle}>
            {itemName}
          </Text>
        </View>
        <GradientCheck checked={isEnabled} disabled={isDisableSwitching} onPress={onValueChange} />
        {/* <Switch
          disabled={isDisableSwitching}
          ios_backgroundColor={ColorMap.switchInactiveButtonColor}
          value={isEnabled}
          onValueChange={onValueChange}
        /> */}
      </View>

      <Divider style={{ paddingLeft: 72, paddingRight: 16, paddingBottom: 1 }} color={ColorMap.dark2} />
    </View>
  );
};
