import React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Text from '../components/Text';
import { FontMedium } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';

interface Props extends TouchableOpacityProps {
  label: string;
  icon: JSX.Element;
  buttonWrapperStyle: any;
}

const buttonContainerStyle: StyleProp<any> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginHorizontal: 15,
};

const buttonWrapperStyle: StyleProp<any> = {
  //backgroundColor: ColorMap.secondary,
  width: 60,
  height: 60,
  borderRadius: 50,
  borderWidth: 2,
  borderColor: ColorMap.dark,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function getButtonTextStyle(disabled: boolean) {
  return {
    color: ColorMap.dark,
    fontSize: 15,
    lineHeight: 26,
    ...FontMedium,
    paddingTop: 8,
  };
}

const disabledOverlay: StyleProp<any> = {
  position: 'absolute',
  right: 0,
  top: 0,
  left: 0,
  bottom: 0,
  borderRadius: 18,
  backgroundColor: ColorMap.disabledOverlay,
};

const ActionButton = (actionButtonProps: Props) => {
  const { label, icon, disabled } = actionButtonProps;
  return (
    <View style={{ alignItems: 'center', opacity: disabled ? 0.5 : 1 }}>
      <TouchableOpacity style={buttonContainerStyle} {...actionButtonProps} disabled={disabled} activeOpacity={0.5}>
        <View style={buttonWrapperStyle}>{icon}</View>
        {/* {disabled && <View style={disabledOverlay} />} */}
      </TouchableOpacity>
      <Text style={getButtonTextStyle(!!disabled)}>{label}</Text>
    </View>
  );
};

export default ActionButton;
