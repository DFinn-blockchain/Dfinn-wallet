import { StyleProp, TouchableOpacity, TouchableOpacityProps, View, ImageBackground } from 'react-native';
import React from 'react';
import Text from 'components/Text';
import { ArrowRight, CaretRight, IconProps } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { FontMedium, FontRegular, FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { BUTTON_ACTIVE_OPACITY } from 'constants/index';
import { getRandom } from 'assets/logo_bg';

interface ActionItemProps extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  color?: string;
  wrapperStyle?: StyleProp<any>;
  hasRightArrow?: boolean;
  // isBusy?: boolean;
  icon: (iconProps: IconProps) => JSX.Element;
  showIcon?: boolean;
  subTitle?: string;
  paddingLeft?: number;
  subTextColor?: string;
}

function getWrapperStyle(
  backgroundColor: string = ColorMap.dark2,
  style: StyleProp<any> = {},
  paddingLeft: number = 52,
): StyleProp<any> {
  return {
    position: 'relative',
    height: 80,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    ...style,
  };
}

function getTextStyle(color: string = ColorMap.light) {
  return {
    ...sharedStyles.mediumText,
    ...FontMedium,
    fontSize: 18,
    color,
  };
}

function getSubTextStyle(color: string = ColorMap.disabled) {
  return {
    ...sharedStyles.mainText,
    ...FontMedium,
    color,
    maxWidth: 150,
  };
}

const iconStyle: StyleProp<any> = {
  //position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  // left: 25,
  width: 40,
  height: 40,
};

const arrowStyle: StyleProp<any> = {
  //position: 'absolute',
  // right: 16,
  backgroundColor: ColorMap.dark,
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 20,
};

export const ActionItem = (actionProps: ActionItemProps) => {
  const {
    icon: Icon,
    color,
    subTextColor,
    title,
    subTitle,
    backgroundColor = ColorMap.dark2,
    paddingLeft,
    style,
    showIcon = true,
    hasRightArrow,
    disabled,
  } = actionProps;

  return (
    <TouchableOpacity
      activeOpacity={BUTTON_ACTIVE_OPACITY}
      {...actionProps}
      style={getWrapperStyle(backgroundColor, style, paddingLeft)}>
      <View style={{ flexDirection: 'row' }}>
        {showIcon && (
          <ImageBackground
            imageStyle={{ borderRadius: 10, opacity: disabled ? 0.5 : 1 }}
            source={getRandom()}
            style={iconStyle}>
            <Icon size={20} color={ColorMap.dark} weight={'bold'} />
          </ImageBackground>
        )}
        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 20 }}>
          <Text style={getTextStyle(color)}>{title}</Text>
          {!!subTitle && (
            <Text style={getSubTextStyle(subTextColor)} numberOfLines={1}>
              {subTitle}
            </Text>
          )}
        </View>
      </View>
      {hasRightArrow && (
        <View style={arrowStyle}>
          <ArrowRight size={20} color={color || ColorMap.light} weight={'bold'} />
        </View>
      )}
    </TouchableOpacity>
  );
};
