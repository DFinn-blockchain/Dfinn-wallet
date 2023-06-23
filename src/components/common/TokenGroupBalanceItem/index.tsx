import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { TokenBalanceItemType } from 'types/balance';
import { Icon, Logo, Number, Typography } from 'components/design-system-ui';
import { CaretRight } from 'phosphor-react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import TokenGroupBalanceItemStyles from './style';
import { FontBold, FontMedium, FontSemiBold } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';

interface Props extends TokenBalanceItemType, TouchableOpacityProps {
  isShowBalance?: boolean;
}

export const TokenGroupBalanceItem = ({
  symbol,
  isTestnet,
  priceValue,
  total,
  priceChangeStatus,
  isShowBalance,
  ...wrapperProps
}: Props) => {
  const theme = useSubWalletTheme().swThemes;
  const _style = TokenGroupBalanceItemStyles(theme);
  const isTotalBalanceDecrease = priceChangeStatus === 'decrease';

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        borderBottomWidth: 0.25,
        paddingBottom: 5,
        backgroundColor: ColorMap.dark,
        borderColor: ColorMap.disabled,
      }}
      {...wrapperProps}>
      <View style={_style.chainBalanceMainArea}>
        <View style={_style.chainBalancePart1}>
          <Logo size={40} token={symbol.toLowerCase()} />
        </View>

        <View style={_style.chainBalanceMetaWrapper}>
          <Text style={_style.textStyle} numberOfLines={1}>
            {symbol}
          </Text>

          <Number
            value={isTestnet ? 0 : priceValue}
            decimal={0}
            prefix={'$'}
            intColor={isTotalBalanceDecrease ? theme.colorError : ColorMap.primary}
            decimalColor={isTotalBalanceDecrease ? theme.colorError : ColorMap.primary}
            unitColor={isTotalBalanceDecrease ? theme.colorError : ColorMap.primary}
            size={theme.fontSizeSM}
            textStyle={{ ...FontSemiBold, lineHeight: theme.lineHeightSM * theme.fontSizeSM }}
          />
        </View>

        <View style={_style.chainBalancePart2Wrapper}>
          <View style={_style.chainBalancePart2}>
            {isShowBalance && (
              <>
                <Number
                  value={total.value}
                  decimal={0}
                  decimalOpacity={0.45}
                  size={theme.fontSizeLG}
                  textStyle={{ ...FontBold, lineHeight: theme.lineHeightLG * theme.fontSizeLG }}
                />
                <Number
                  value={total.convertedValue}
                  decimal={0}
                  intOpacity={0.45}
                  unitOpacity={0.45}
                  decimalOpacity={0.45}
                  prefix={'$'}
                  size={theme.fontSizeSM}
                  textStyle={{
                    ...FontSemiBold,
                    lineHeight: theme.lineHeightSM * theme.fontSizeSM,
                    //color: ColorMap.disabled,
                  }}
                />
              </>
            )}

            {!isShowBalance && (
              <>
                <Typography.Text
                  style={{
                    fontSize: theme.fontSizeLG,
                    ...FontSemiBold,
                    lineHeight: theme.lineHeightLG * theme.fontSizeLG,
                    color: theme.colorTextLight1,
                  }}>
                  ******
                </Typography.Text>
                <Typography.Text
                  style={{
                    ...FontMedium,
                    fontSize: theme.fontSizeSM,
                    lineHeight: theme.lineHeightSM * theme.fontSizeSM,
                    color: theme.colorTextLight4,
                  }}>
                  ******
                </Typography.Text>
              </>
            )}
          </View>
          <View style={_style.iconWrapper}>
            <Icon type="phosphor" phosphorIcon={CaretRight} size={'sm'} iconColor={theme.colorTextLight3} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
