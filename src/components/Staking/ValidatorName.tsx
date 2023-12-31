import { ValidatorInfo } from '@subwallet/extension-base/background/KoniTypes';
import { CircleWavyCheck, Trophy } from 'phosphor-react-native';
import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { ColorMap } from 'styles/color';
import { toShort } from 'utils/index';

interface Props {
  validatorInfo: ValidatorInfo;
  isBonding?: boolean;
  textStyle: StyleProp<TextStyle>;
  iconSize?: number;
  iconColor?: string;
  outerWrapperStyle?: StyleProp<any>;
}

const WrapperStyle: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
};

const ValidatorNameContainerStyle: StyleProp<ViewStyle> = {
  maxWidth: '100%',
  flexShrink: 1,
};

const ValidatorIconContainerStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  alignItems: 'center',
};

const IconStyle: StyleProp<ViewStyle> = {
  marginLeft: 8,
};

const ValidatorName = ({
  outerWrapperStyle,
  validatorInfo,
  iconSize = 16,
  textStyle,
  iconColor = ColorMap.primary,
  isBonding = false,
}: Props) => {
  const { identity, address, isVerified } = validatorInfo;

  return (
    <View style={[WrapperStyle, outerWrapperStyle]}>
      <View style={ValidatorNameContainerStyle}>
        <Text style={textStyle} numberOfLines={1} ellipsizeMode={'middle'}>
          {identity ? identity : toShort(address)}
        </Text>
      </View>
      <View style={ValidatorIconContainerStyle}>
        {isVerified && <CircleWavyCheck size={iconSize} color={iconColor} style={IconStyle} />}
        {isBonding && <Trophy size={iconSize} color={iconColor} style={IconStyle} />}
      </View>
    </View>
  );
};

export default React.memo(ValidatorName);
