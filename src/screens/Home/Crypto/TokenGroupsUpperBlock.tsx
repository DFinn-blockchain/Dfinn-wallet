import React from 'react';
import { StyleProp, View, TouchableOpacity, Platform, ImageBackground, Dimensions } from 'react-native';
import ActionButton from 'components/ActionButton';
import i18n from 'utils/i18n/i18n';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { SwNumberProps } from 'components/design-system-ui/number';
import { BalancesVisibility } from 'components/BalancesVisibility';
import { Icon, Number, Tag, Typography } from 'components/design-system-ui';
import { FontBold, FontMedium } from 'styles/sharedStyles';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { toggleBalancesVisibility } from 'messaging/index';
import { updateToggleBalance } from 'stores/base/Settings';
import style from 'components/design-system-ui/avatar/style';
import {
  ArrowDown,
  ArrowFatLinesDown,
  ArrowUpRight,
  PaperPlaneTilt,
  PlusCircle,
  ShoppingCartSimple,
} from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { Images } from 'assets/index';

interface Props {
  totalValue: SwNumberProps['value'];
  totalChangeValue: SwNumberProps['value'];
  totalChangePercent: SwNumberProps['value'];
  isPriceDecrease: boolean;
  onOpenSendFund?: () => void;
  onOpenBuyTokens?: () => void;
  onOpenReceive?: () => void;
}

const actionButtonWrapper: StyleProp<any> = {
  paddingTop: 24,
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'center',
  paddingBottom: 25,
};

const containerStyle: StyleProp<any> = {
  height: 238,
  paddingHorizontal: 16,
  paddingTop: 32,
  alignItems: 'center',
  marginTop: -2,
  paddingBottom: 2,
  //width: Dimensions.get('window').width,
  marginBottom: -2,
};

export const TokenGroupsUpperBlock = ({
  isPriceDecrease,
  onOpenBuyTokens,
  onOpenReceive,
  onOpenSendFund,
  totalChangePercent,
  totalChangeValue,
  totalValue,
}: Props) => {
  const theme = useSubWalletTheme().swThemes;
  const isShowBalance = useSelector((state: RootState) => state.settings.isShowBalance);
  const _toggleBalances = () => {
    updateToggleBalance();
    toggleBalancesVisibility().catch(console.log);
  };

  const ButtonIcon = {
    Receive: <ArrowDown color={ColorMap.dark} size={24} weight={'bold'} />,
    SendFund: <ArrowUpRight color={ColorMap.dark} size={24} weight={'bold'} />,
    Buy: <PlusCircle color={ColorMap.dark} size={24} weight={'bold'} />,
  };

  return (
    <ImageBackground
      source={Images.radialBg1}
      style={containerStyle}
      //pointerEvents="box-none"
      imageStyle={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: 10 }}>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={_toggleBalances}>
        <BalancesVisibility value={totalValue} startWithSymbol subFloatNumber />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, height: 40 }}>
          <View style={{ marginRight: 8 }}>
            <Icon size="md" phosphorIcon={isShowBalance ? Eye : EyeSlash} iconColor={ColorMap.dark} weight={'bold'} />
          </View>
          {isShowBalance && (
            <Number
              size={theme.fontSize}
              textStyle={{
                ...FontMedium,
                lineHeight: theme.fontSize * theme.lineHeight,
                paddingBottom: theme.paddingXXS / 2,
                color: ColorMap.dark,
              }}
              decimal={0}
              value={totalChangeValue}
              prefix={isPriceDecrease ? '- $' : '+ $'}
            />
          )}

          {!isShowBalance && (
            <Typography.Text
              style={{
                fontSize: theme.fontSize,
                lineHeight: theme.fontSize * theme.lineHeight,
                ...FontMedium,
                color: ColorMap.dark,
                // color: theme.colorTextLight1,
              }}>
              {'******'}
            </Typography.Text>
          )}

          <Tag
            style={{ marginLeft: 8, height: 22 }}
            color={isPriceDecrease ? 'error' : 'success'}
            shape={'round'}
            closable={false}>
            <>
              {isShowBalance && (
                <Number
                  textStyle={{ ...FontBold, lineHeight: 18, color: ColorMap.dark }}
                  size={10}
                  value={totalChangePercent}
                  decimal={0}
                  prefix={isPriceDecrease ? '- ' : '+ '}
                  suffix={'%'}
                />
              )}

              {!isShowBalance && (
                <Typography.Text
                  style={{
                    ...FontMedium,
                    lineHeight: 18,
                    fontSize: 10,
                    color: ColorMap.dark,
                  }}>
                  {'******'}
                </Typography.Text>
              )}
            </>
          </Tag>
        </View>
      </TouchableOpacity>

      <View style={[actionButtonWrapper]} pointerEvents="box-none">
        <ActionButton
          label={i18n.cryptoScreen.receive}
          icon={ButtonIcon.Receive}
          onPress={onOpenReceive}
          buttonWrapperStyle={{ paddingHorizontal: theme.sizeSM }}
        />
        <ActionButton
          label={i18n.cryptoScreen.send}
          icon={ButtonIcon.SendFund}
          onPress={onOpenSendFund}
          buttonWrapperStyle={{ paddingHorizontal: theme.sizeSM }}
        />
        <ActionButton
          disabled={Platform.OS === 'ios'}
          label={i18n.cryptoScreen.buy}
          icon={ButtonIcon.Buy}
          onPress={onOpenBuyTokens}
          buttonWrapperStyle={{ paddingHorizontal: theme.sizeSM }}
        />
      </View>
    </ImageBackground>
  );
};
