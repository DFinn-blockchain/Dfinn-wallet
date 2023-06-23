import React, { useMemo } from 'react';
import { ImageBackground, Platform, StyleSheet, View } from 'react-native';
import ActionButton from 'components/ActionButton';
import i18n from 'utils/i18n/i18n';
import { CaretLeft } from 'phosphor-react-native';
import { SwNumberProps } from 'components/design-system-ui/number';
import { BalancesVisibility } from 'components/BalancesVisibility';
import { Button, Icon, Typography } from 'components/design-system-ui';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { FontSemiBold } from 'styles/sharedStyles';
import { getAccountType } from 'utils/index';
import { PREDEFINED_TRANSAK_TOKEN } from '../../../predefined/transak';
import { RootState } from 'stores/index';
import { useSelector } from 'react-redux';
import { ThemeTypes } from 'styles/themes';
import { ButtonIcon } from 'screens/Home/Crypto/shared/Button';
import { Images } from 'assets/index';

interface Props {
  balanceValue: SwNumberProps['value'];
  groupSymbol: string;
  onClickBack: () => void;
  onOpenSendFund?: () => void;
  onOpenBuyTokens?: () => void;
  onOpenReceive?: () => void;
}

export const TokenGroupsDetailUpperBlock = ({
  onOpenBuyTokens,
  onOpenReceive,
  onOpenSendFund,
  onClickBack,
  balanceValue,
  groupSymbol,
}: Props) => {
  const theme = useSubWalletTheme().swThemes;
  const accounts = useSelector((state: RootState) => state.accountState.accounts);
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  const isAllAccount = useSelector((state: RootState) => state.accountState.isAllAccount);
  const _style = createStyleSheet(theme);

  const isSupportBuyTokens = useMemo(() => {
    if (Platform.OS === 'ios') {
      return false;
    }
    const transakInfoItems = Object.values(PREDEFINED_TRANSAK_TOKEN);

    for (const infoItem of transakInfoItems) {
      if (infoItem.symbol === groupSymbol) {
        const supportType = infoItem.support;

        if (isAllAccount) {
          for (const account of accounts) {
            if (supportType === getAccountType(account.address)) {
              return true;
            }
          }
        } else {
          if (currentAccount?.address && supportType === getAccountType(currentAccount?.address)) {
            return true;
          }
        }
      }
    }

    return false;
  }, [accounts, currentAccount?.address, isAllAccount, groupSymbol]);

  return (
    <ImageBackground
      source={Images.radialBg1}
      style={_style.containerStyle}
      imageStyle={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: 10 }}>
      <View style={_style.topArea}>
        <Button
          type="ghost"
          size="xs"
          icon={<Icon size="md" phosphorIcon={CaretLeft} iconColor={theme.colorTextLight1} />}
          onPress={onClickBack}
        />
        <View style={_style.tokenDisplay}>
          <Typography.Title level={4} style={FontSemiBold}>
            {`${i18n.title.token}: ${groupSymbol}`}
          </Typography.Title>
        </View>
      </View>

      <BalancesVisibility value={balanceValue} startWithSymbol subFloatNumber />

      <View style={[_style.actionButtonWrapper]} pointerEvents="box-none">
        <ActionButton
          icon={ButtonIcon.Receive}
          onPress={onOpenReceive}
          buttonWrapperStyle={{ paddingHorizontal: theme.marginXS }}
        />
        <ActionButton
          icon={ButtonIcon.SendFund}
          onPress={onOpenSendFund}
          buttonWrapperStyle={{ paddingHorizontal: theme.marginXS }}
        />
        <ActionButton
          disabled={!isSupportBuyTokens}
          icon={ButtonIcon.Buy}
          onPress={onOpenBuyTokens}
          buttonWrapperStyle={{ paddingHorizontal: theme.marginXS }}
        />
      </View>
    </ImageBackground>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createStyleSheet(theme: ThemeTypes) {
  return StyleSheet.create({
    actionButtonWrapper: {
      paddingTop: 24,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
    containerStyle: {
      height: 214,
      alignItems: 'center',
      paddingBottom: 2,
      marginLeft: -8,
      marginRight: -8,
    },
    topArea: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 16,
    },
    tokenDisplay: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 40,
      justifyContent: 'center',
    },
  });
}
