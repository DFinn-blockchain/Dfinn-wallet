import { StyleProp, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import Text from '../components/Text';
import { ColorMap } from 'styles/color';
import { FontBold, FontMedium, FontSemiBold, FontSize1, sharedStyles } from 'styles/sharedStyles';
import { BUTTON_ACTIVE_OPACITY } from 'constants/index';

interface SeedWordProps extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  color?: string;
  wrapperStyle?: StyleProp<any>;
  prefixText?: string;
  isActivated?: boolean;
  isError?: boolean;
  small?: boolean;
  removeBoundary?: boolean;
}

function getWrapperStyle(seedWordProps: SeedWordProps): StyleProp<any> {
  const { prefixText, backgroundColor, style, isActivated, isError, small, removeBoundary } = seedWordProps;
  const styleMap: StyleProp<any> = {
    position: 'relative',
    height: removeBoundary ? 25 : small ? 40 : 55,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: removeBoundary ? 'transparent' : backgroundColor || ColorMap.dark2,
    borderColor: 'transparent',
    paddingLeft: prefixText ? 12 : 0,
    //paddingRight: 12,
    minWidth: removeBoundary ? '20%' : small ? '40%' : '45%',
  };

  if (isActivated) {
    styleMap.backgroundColor = 'transparent';
    styleMap.borderStyle = 'dashed';
    styleMap.borderColor = backgroundColor || ColorMap.dark2;
  }

  if (isError) {
    styleMap.borderColor = ColorMap.danger;
  }

  if (!prefixText) {
    styleMap.justifyContent = 'center';
  }

  if (style) {
    Object.assign(styleMap, style);
  }

  return styleMap;
}

const textStyle = {
  ...FontSize1,
};

function getPrefixTextStyle(isActivated?: boolean): StyleProp<any> {
  return {
    color: ColorMap.disabled,
    ...FontSemiBold,
    marginRight: 8,
    opacity: isActivated ? 0 : 1,
  };
}

function getTitleStyle(color: string = ColorMap.light, isActivated?: boolean) {
  return {
    color,
    ...FontSemiBold,
    ...textStyle,
    opacity: isActivated ? 0 : 1,
  };
}

export const SeedWord = (seedWordProps: SeedWordProps) => {
  const { color, prefixText, title, isActivated } = seedWordProps;

  return (
    <TouchableOpacity
      disabled={isActivated}
      activeOpacity={BUTTON_ACTIVE_OPACITY}
      {...seedWordProps}
      style={getWrapperStyle(seedWordProps)}>
      {!!prefixText && <Text style={getPrefixTextStyle(isActivated)}>{prefixText}</Text>}
      <Text style={getTitleStyle(color, isActivated)}>{title}</Text>
    </TouchableOpacity>
  );
};
