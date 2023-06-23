import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ColorMap } from 'styles/color';
import { Images } from 'assets/index';
import { Check } from 'phosphor-react-native';

interface GradientCheckProps extends TouchableOpacityProps {
  checked: boolean;
}

const containerStyle = (disabled?: boolean): ViewStyle => {
  return {
    opacity: disabled ? 0.5 : 1,
    backgroundColor: ColorMap.dark,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  };
};

const GradientCheck = (gradientCheckProps: GradientCheckProps) => {
  const { checked, disabled } = gradientCheckProps;

  return (
    <TouchableOpacity {...gradientCheckProps}>
      {checked ? (
        <ImageBackground source={Images.radialBg1} style={containerStyle(disabled)} imageStyle={{ borderRadius: 20 }}>
          <Check weight={'bold'} />
        </ImageBackground>
      ) : (
        <View style={[containerStyle(disabled), { borderWidth: 2, borderColor: ColorMap.dark2 }]}>
          <Check />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GradientCheck;
