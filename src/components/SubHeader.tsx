import React from 'react';
import { GestureResponderEvent, Image, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import Text from '../components/Text';
import { SpaceStyle } from 'styles/space';
import { FontSemiBold, TitleFont } from 'styles/sharedStyles';
import { ArrowLeft, IconProps } from 'phosphor-react-native';
import { IconButton } from 'components/IconButton';
import { ColorMap } from 'styles/color';
import { Button } from 'components/Button';
import { Images } from 'assets/index';
import LinearGradient from 'react-native-linear-gradient';

export interface SubHeaderProps {
  showRightBtn?: boolean;
  title?: string;
  onPressBack: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  rightIcon?: (iconProps: IconProps) => JSX.Element;
  rightIconColor?: string;
  onPressRightIcon?: ((event: GestureResponderEvent) => void) | undefined;
  disableRightButton?: boolean;
  headerContent?: () => JSX.Element;
  backgroundColor?: string;
  showLeftBtn?: boolean;
  rightButtonTitle?: string;
  headerContainerStyle?: ViewStyle;
}

function getSubHeaderWrapperStyle(backgroundColor: string = ColorMap.dark1): StyleProp<any> {
  return {
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    width: '100%',
  };
}

const HeaderTitleContainer = (additionStyle: ViewStyle): StyleProp<ViewStyle> => {
  return {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginTop: '10%',
    ...additionStyle,
  };
};

const headerTitleWrapperStyle: StyleProp<ViewStyle> = {
  flex: 1,
};

const subHeaderTextStyle: StyleProp<TextStyle> = {
  ...TitleFont,
  ...FontSemiBold,
  textAlign: 'center',
  color: ColorMap.light,
};

export const SubHeader = ({
  headerContent,
  onPressBack,
  disabled,
  rightIcon,
  onPressRightIcon,
  title = '',
  backgroundColor,
  disableRightButton,
  showLeftBtn = true,
  rightButtonTitle = '',
  rightIconColor,
  headerContainerStyle = {},
}: SubHeaderProps) => {
  const hideSubHeader = !headerContent && !title && !showLeftBtn && !rightIcon;

  if (hideSubHeader) {
    return <></>;
  }

  return (
    <View style={[SpaceStyle.oneContainer, getSubHeaderWrapperStyle(backgroundColor)]}>
      {(!!rightIcon || !!rightButtonTitle) && (
        <Button
          icon={rightIcon}
          onPress={onPressRightIcon}
          style={{ position: 'absolute', right: 16, top: 0, zIndex: headerContent ? 2 : 0 }}
          disabled={disableRightButton}
          color={disableRightButton ? ColorMap.disabledTextColor : rightIconColor || ColorMap.light}
          title={rightButtonTitle}
        />
      )}
      {!!showLeftBtn && (
        <IconButton
          icon={ArrowLeft}
          color={disabled ? ColorMap.disabled : ColorMap.light}
          disabled={disabled}
          onPress={onPressBack}
          style={{ position: 'absolute', left: 16, top: 0, zIndex: headerContent ? 2 : 0 }}
        />
      )}
      {headerContent ? (
        headerContent()
      ) : (
        <View style={HeaderTitleContainer(headerContainerStyle)}>
          <View style={headerTitleWrapperStyle}>
            <Text numberOfLines={1} style={subHeaderTextStyle}>
              {title}
            </Text>
            <LinearGradient
              colors={[ColorMap.primary, ColorMap.light, ColorMap.tertiary, ColorMap.light, ColorMap.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 4,
                marginTop: -2,
                marginBottom: 5,
                alignSelf: 'center',
                width: title?.length * subHeaderTextStyle.fontSize * 0.55,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};
