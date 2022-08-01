import React, { useMemo } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, View } from 'react-native';
import Text from '../components/Text';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { SpaceStyle } from 'styles/space';
import { FontBold, FontSize4, sharedStyles } from 'styles/sharedStyles';
import { ArrowLeft, IconProps } from 'phosphor-react-native';
import { IconButton } from 'components/IconButton';
import { ColorMap } from 'styles/color';

export interface SubHeaderProps {
  showRightBtn?: boolean;
  title: string;
  onPressBack: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  rightIcon?: (iconProps: IconProps) => JSX.Element;
  onPressRightIcon?: ((event: GestureResponderEvent) => void) | undefined;
  disableRightButton?: boolean;
  headerContent?: () => JSX.Element;
  backgroundColor?: string;
}

function getSubHeaderWrapperStyle(backgroundColor: string = ColorMap.dark1): StyleProp<any> {
  return {
    backgroundColor: backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: 40,
    zIndex: 10,
  };
}

const headerTitle: StyleProp<any> = {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
};

export const SubHeader = ({
  headerContent,
  onPressBack,
  disabled,
  rightIcon,
  onPressRightIcon,
  title,
  backgroundColor,
  disableRightButton,
}: SubHeaderProps) => {
  const swThemeColor = useSubWalletTheme().colors;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        subHeaderTitle: {
          ...sharedStyles.mediumText,
          ...FontSize4,
          ...FontBold,
          color: swThemeColor.textColor,
        },
      }),
    [swThemeColor],
  );

  return (
    <View style={[SpaceStyle.oneContainer, getSubHeaderWrapperStyle(backgroundColor)]}>
      {!!headerContent ? (
        headerContent()
      ) : (
        <View style={headerTitle}>
          <Text style={styles.subHeaderTitle}>{title}</Text>
        </View>
      )}

      <IconButton
        icon={ArrowLeft}
        color={disabled ? ColorMap.disabled : ColorMap.light}
        disabled={disabled}
        onPress={onPressBack}
        style={{ position: 'absolute', left: 16, top: 0 }}
      />

      {!!rightIcon && (
        <IconButton
          icon={rightIcon}
          onPress={onPressRightIcon}
          style={{ position: 'absolute', right: 16, top: 0 }}
          disabled={disableRightButton}
          color={disableRightButton ? ColorMap.disabledTextColor : ColorMap.light}
        />
      )}
    </View>
  );
};
