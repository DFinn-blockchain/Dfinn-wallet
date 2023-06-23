import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleProp, ImageBackground, ViewStyle } from 'react-native';
import Text from '../components/Text';
import { ColorMap } from 'styles/color';
import { ArrowRight, IconProps } from 'phosphor-react-native';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';
import { IconButton } from './IconButton';
import { getRandom, LogoBgMap } from 'assets/logo_bg';

interface SecretTypeItemType extends TouchableOpacityProps {
  icon: (iconProps: IconProps) => JSX.Element;
  plainIcon?: boolean;
  title: string;
  secretTypeItemStyle?: object;
  onClickButton: () => void;
}

const secretTypeItemContainer: StyleProp<any> = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: 16,
  paddingVertical: 14,
  borderWidth: 2,
  borderColor: ColorMap.dark2,
  backgroundColor: ColorMap.dark,
  borderRadius: 30,
  marginVertical: 5,
};

const secretTypeItemText: StyleProp<any> = {
  color: ColorMap.light,
  ...sharedStyles.mainText,
  ...FontMedium,
  paddingLeft: 16,
  textAlign: 'center',
  flex: 1,
};

const Iconcontainer: ViewStyle = {
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
};

export const SecretTypeItem = (secretTypeItem: SecretTypeItemType) => {
  const { icon: Icon, title, secretTypeItemStyle, onClickButton, plainIcon } = secretTypeItem;
  return (
    <TouchableOpacity style={[secretTypeItemContainer, secretTypeItemStyle]} onPress={onClickButton}>
      {plainIcon ? (
        <ImageBackground source={getRandom()} imageStyle={{ borderRadius: 10 }} style={Iconcontainer}>
          <Icon size={22} color={ColorMap.dark} weight={'fill'} />
        </ImageBackground>
      ) : (
        <Icon size={18} color={ColorMap.disabled} weight={'bold'} />
      )}

      <Text style={secretTypeItemText}>{title}</Text>
      <IconButton icon={ArrowRight} />
    </TouchableOpacity>
  );
};
