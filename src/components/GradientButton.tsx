import React, { FunctionComponent } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground, StyleProp, ViewStyle, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ColorMap } from 'styles/color';
import { Images } from 'assets/index';

interface GradientProps extends TouchableOpacityProps {
  viewStyle?: StyleProp<any>;
}

const GradientButton = (gradientProps: GradientProps) => {
  const { viewStyle } = gradientProps;
  return (
    <TouchableOpacity {...gradientProps} style={{ opacity: gradientProps.disabled ? 0.5 : 1 }}>
      <ImageBackground source={Images.radialBg1} style={viewStyle} imageStyle={viewStyle}>
        <View
          style={{
            flex: 1,
            borderRadius: 40,
            margin: 2,
            borderWidth: 2,
            borderColor: ColorMap.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {gradientProps.children}
        </View>
      </ImageBackground>
    </TouchableOpacity>
    // <LinearGradient
    //   colors={[ColorMap.primary, ColorMap.light, ColorMap.tertiary, ColorMap.light, ColorMap.secondary]}
    //   style={viewStyle}>
    //   {children}
    // </LinearGradient>
  );
};

export default GradientButton;
