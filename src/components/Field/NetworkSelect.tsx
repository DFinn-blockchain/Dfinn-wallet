import { FieldBase, FieldBaseProps } from 'components/Field/Base';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { getNetworkLogo } from 'utils/index';
import { NetworkJson } from '@subwallet/extension-base/background/KoniTypes';
import { ImageBackground, StyleProp, View } from 'react-native';
import Text from '../../components/Text';
import { FontMedium, FontSize2, FontSize4, FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import { CaretDown } from 'phosphor-react-native';
import { Images } from 'assets/index';

interface Props extends FieldBaseProps {
  networkKey: string;
  disabled?: boolean;
  showIcon?: boolean;
  coloredBg?: boolean;
  outerStyle?: StyleProp<any>;
  value?: string;
}

const getNetworkName = (networkKey: string, networkMap: Record<string, NetworkJson>) => {
  if (!networkMap[networkKey]) {
    return networkKey;
  }

  return networkMap[networkKey].chain;
};

const getTextStyle = (disabled: boolean): StyleProp<any> => {
  return {
    ...FontSize2,
    ...FontMedium,
    paddingLeft: 4,
    paddingRight: 8,
    color: disabled ? ColorMap.disabled : ColorMap.light,
  };
};

const blockContentStyle: StyleProp<any> = {
  position: 'relative',
  height: 34,
  flexDirection: 'row',
  alignItems: 'center',
  paddingBottom: 10,
  justifyContent: 'space-between',
  paddingHorizontal: 16,
};

const extraStyle: StyleProp<any> = {
  height: 100,
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  justifyContent: 'space-between',
  paddingHorizontal: 10,
};

export const NetworkSelectField = ({
  networkKey,
  disabled,
  showIcon,
  outerStyle,
  value,
  coloredBg,
  ...fieldBase
}: Props) => {
  const networkMap = useSelector((state: RootState) => state.networkMap.details);

  return coloredBg ? (
    <ImageBackground
      source={Images.radialBg1}
      style={{ ...outerStyle, opacity: disabled ? 0.5 : 1 }}
      imageStyle={outerStyle}>
      <Text
        style={{
          alignSelf: 'flex-end',
          right: 10,
          top: 10,
          position: 'absolute',
          color: ColorMap.dark2,
          ...sharedStyles.mainText,
        }}>
        {fieldBase.label}
      </Text>
      <View style={{ ...blockContentStyle, ...extraStyle }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          {getNetworkLogo(value || networkKey, 40, networkKey)}
          <Text style={[getTextStyle(!!disabled), { ...FontSize4, ...FontSemiBold, color: ColorMap.dark }]}>
            {value || getNetworkName(networkKey, networkMap)}
          </Text>
        </View>

        {!!showIcon && <CaretDown size={20} color={ColorMap.dark} weight={'bold'} />}
      </View>
    </ImageBackground>
  ) : (
    <FieldBase {...fieldBase} outerStyle={outerStyle}>
      <View style={blockContentStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {getNetworkLogo(value || networkKey, 20, networkKey)}
          <Text style={getTextStyle(!!disabled)}>{value || getNetworkName(networkKey, networkMap)}</Text>
        </View>

        {!!showIcon && <CaretDown size={20} color={ColorMap.disabled} weight={'bold'} />}
      </View>
    </FieldBase>
  );
};
