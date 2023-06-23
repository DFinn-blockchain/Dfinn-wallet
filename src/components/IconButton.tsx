import React from 'react';
import { ImageBackground, StyleProp, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IconProps } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { getRandom } from 'assets/logo_bg';

interface Props extends TouchableOpacityProps {
  icon: (iconProps: IconProps) => JSX.Element;
  color?: string;
  size?: number;
  backgroundImg?: boolean;
}

const iconButtonWrapper = (backgroundImg?: boolean, disabled?: boolean): StyleProp<any> => {
  return {
    width: 40,
    opacity: disabled ? 0.5 : 1,
    height: 40,
    backgroundColor: backgroundImg ? 'transparent' : ColorMap.dark2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  };
};

export const IconButton = (iconButtonProps: Props) => {
  const { icon: Icon, color, style = { borderRadius: 40 }, size = 20, backgroundImg, disabled } = iconButtonProps;

  return (
    <TouchableOpacity {...iconButtonProps} style={[iconButtonWrapper(backgroundImg, disabled), style]}>
      {backgroundImg ? (
        <ImageBackground
          source={getRandom()}
          style={[iconButtonWrapper(null, disabled), style]}
          imageStyle={{ borderRadius: style?.borderRadius || 40 }}>
          <Icon size={size} color={ColorMap.dark} weight={'bold'} />
        </ImageBackground>
      ) : (
        <Icon size={size} color={color || ColorMap.light} weight={'bold'} />
      )}
    </TouchableOpacity>
  );
};
