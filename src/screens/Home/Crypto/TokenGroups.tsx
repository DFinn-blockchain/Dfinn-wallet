import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TokenBalanceItemType } from 'types/balance';
import { CryptoNavigationProps } from 'routes/home';
import { TokensLayout } from 'screens/Home/Crypto/shared/TokensLayout';
import { ListRenderItemInfo, StyleProp, View } from 'react-native';
import { itemWrapperStyle } from 'screens/Home/Crypto/layers/shared';
import { TokenGroupBalanceItem } from 'components/common/TokenGroupBalanceItem';
import { LeftIconButton } from 'components/LeftIconButton';
import { ClockCounterClockwise, FadersHorizontal, MagnifyingGlass, SlidersHorizontal } from 'phosphor-react-native';
import i18n from 'utils/i18n/i18n';
import { TokenGroupsUpperBlock } from 'screens/Home/Crypto/TokenGroupsUpperBlock';
import { Header } from 'components/Header';
import { GradientBackgroundColorSet, ScreenContainer } from 'components/ScreenContainer';
import { Button, Icon, Typography } from 'components/design-system-ui';
import { FontSemiBold } from 'styles/sharedStyles';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { AccountSelector } from 'components/Modal/common/AccountSelector';
import { TokenSelector } from 'components/Modal/common/TokenSelector';
import { ReceiveModal } from 'screens/Home/Crypto/ReceiveModal';
import useReceiveQR from 'hooks/screen/Home/Crypto/useReceiveQR';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { useGetChainSlugs } from 'hooks/screen/Home/useGetChainSlugs';
import useTokenGroup from 'hooks/screen/useTokenGroup';
import useAccountBalance from 'hooks/screen/useAccountBalance';
import { CustomizationModal } from 'screens/Home/Crypto/CustomizationModal';
import useBuyToken from 'hooks/screen/Home/Crypto/useBuyToken';
import { ServiceModal } from 'screens/Home/Crypto/ServiceModal';
import { useToast } from 'react-native-toast-notifications';
import { TokenSearchModal } from 'screens/Home/Crypto/TokenSearchModal';
import { ColorMap } from 'styles/color';

const renderActionsStyle: StyleProp<any> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingTop: 16,
  paddingBottom: 12,
};

export const TokenGroups = () => {
  const theme = useSubWalletTheme().swThemes;
  const navigation = useNavigation<CryptoNavigationProps>();

  const chainsByAccountType = useGetChainSlugs();
  const { sortedTokenGroups, tokenGroupMap, sortedTokenSlugs } = useTokenGroup(chainsByAccountType);
  const { tokenGroupBalanceMap, totalBalanceInfo, tokenBalanceMap } = useAccountBalance(tokenGroupMap);
  const isShowBalance = useSelector((state: RootState) => state.settings.isShowBalance);
  const [accessBy, setAccessBy] = useState<'buy' | 'receive' | undefined>(undefined);
  const isTotalBalanceDecrease = totalBalanceInfo.change.status === 'decrease';
  const [isCustomizationModalVisible, setCustomizationModalVisible] = useState<boolean>(false);
  const [isTokenSearchModalVisible, setTokenSearchModalVisible] = useState<boolean>(false);
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  const {
    accountSelectorItems,
    onOpenReceive,
    openSelectAccount,
    openSelectToken,
    selectedAccount,
    selectedNetwork,
    isTokenSelectorModalVisible,
    isAccountSelectorModalVisible,
    onCloseSelectAccount,
    onCloseSelectToken,
    onCloseQrModal,
    isQrModalVisible,
    tokenSelectorItems,
  } = useReceiveQR();

  const {
    isBuyTokenSelectorModalVisible,
    isBuyAccountSelectorModalVisible,
    isBuyServiceSelectorModalVisible,
    onOpenBuyToken,
    openSelectBuyAccount,
    openSelectBuyToken,
    onCloseSelectBuyAccount,
    onCloseSelectBuyToken,
    onCloseSelectBuyService,
    selectedBuyAccount,
    selectedBuyToken,
    buyAccountSelectorItems,
    buyTokenSelectorItems,
  } = useBuyToken();

  const toast = useToast();

  const onPressItem = useCallback(
    (item: TokenBalanceItemType) => {
      return () => {
        requestAnimationFrame(() => {
          navigation.navigate('TokenGroupsDetail', {
            slug: item.slug,
          });
        });
      };
    },
    [navigation],
  );

  const onPressSearchItem = useCallback(
    (item: TokenBalanceItemType) => {
      setTokenSearchModalVisible(false);
      onPressItem(item)();
    },
    [onPressItem],
  );

  const tokenGroupBalanceItems = useMemo<TokenBalanceItemType[]>(() => {
    const result: TokenBalanceItemType[] = [];

    sortedTokenGroups.forEach(tokenGroupSlug => {
      if (tokenGroupBalanceMap[tokenGroupSlug]) {
        result.push(tokenGroupBalanceMap[tokenGroupSlug]);
      }
    });

    return result;
  }, [sortedTokenGroups, tokenGroupBalanceMap]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TokenBalanceItemType>) => (
      <View key={item.slug} style={[itemWrapperStyle, { backgroundColor: theme.colorBgSecondary }]}>
        <TokenGroupBalanceItem onPress={onPressItem(item)} {...item} isShowBalance={isShowBalance} />
      </View>
    ),
    [isShowBalance, onPressItem, theme.colorBgSecondary],
  );

  const onCloseCustomizationModal = useCallback(() => {
    setCustomizationModalVisible(false);
  }, []);

  const onOpenCustomizationModal = useCallback(() => {
    setCustomizationModalVisible(true);
  }, []);

  const onOpenTokenSearchModal = useCallback(() => {
    setTokenSearchModalVisible(true);
  }, []);

  const onOpenHistoryScreen = useCallback(() => {
    navigation.navigate('History', {});
  }, [navigation]);

  const actionsNode = useMemo(() => {
    return (
      <View style={renderActionsStyle}>
        <Typography.Title level={4} style={{ color: theme.colorTextLight1, ...FontSemiBold }}>
          {i18n.settings.tokens}
        </Typography.Title>
        <View style={{ flexDirection: 'row', marginRight: -5 }}>
          <Button
            type="ghost"
            size="xs"
            icon={<Icon size="md" phosphorIcon={MagnifyingGlass} iconColor={theme.colorTextLight3} />}
            onPress={onOpenTokenSearchModal}
          />
          <Button
            type="ghost"
            size="xs"
            icon={<Icon size="md" phosphorIcon={FadersHorizontal} iconColor={theme.colorTextLight3} />}
            onPress={onOpenCustomizationModal}
          />
          <Button
            type="ghost"
            size="xs"
            icon={<Icon size="md" phosphorIcon={ClockCounterClockwise} iconColor={theme.colorTextLight3} />}
            onPress={onOpenHistoryScreen}
          />
        </View>
      </View>
    );
  }, [onOpenHistoryScreen, onOpenCustomizationModal, onOpenTokenSearchModal, theme]);

  const _onOpenBuyTokens = useCallback(() => {
    setAccessBy('buy');
    onOpenBuyToken();
  }, [onOpenBuyToken]);

  const _onOpenReceive = useCallback(() => {
    setAccessBy('receive');
    onOpenReceive();
  }, [onOpenReceive]);

  const showNoti = useCallback(
    (text: string) => {
      toast.hideAll();
      toast.show(text, { textStyle: { textAlign: 'center' } });
    },
    [toast],
  );

  const _onOpenSendFund = useCallback(() => {
    if (currentAccount && currentAccount.isReadOnly) {
      //todo: i18n
      showNoti('The account you are using is watch-only, you cannot send assets with it');
      return;
    }

    navigation.navigate('SendFund', {});
  }, [currentAccount, navigation, showNoti]);

  const tokenSearchItems = useMemo<TokenBalanceItemType[]>(() => {
    const items: TokenBalanceItemType[] = [];

    sortedTokenSlugs.forEach(t => {
      if (tokenBalanceMap[t]) {
        items.push(tokenBalanceMap[t]);
      }
    });

    return items;
  }, [sortedTokenSlugs, tokenBalanceMap]);

  const listHeaderNode = useMemo(() => {
    return (
      <TokenGroupsUpperBlock
        onOpenReceive={_onOpenReceive}
        totalChangePercent={totalBalanceInfo.change.percent}
        totalChangeValue={totalBalanceInfo.change.value}
        totalValue={totalBalanceInfo.convertedValue}
        isPriceDecrease={isTotalBalanceDecrease}
        onOpenBuyTokens={_onOpenBuyTokens}
        onOpenSendFund={_onOpenSendFund}
      />
    );
  }, [
    _onOpenBuyTokens,
    _onOpenReceive,
    _onOpenSendFund,
    isTotalBalanceDecrease,
    totalBalanceInfo.change.percent,
    totalBalanceInfo.change.value,
    totalBalanceInfo.convertedValue,
  ]);

  const listFooterNode = useMemo(() => {
    return (
      <View style={{ width: '100%', alignItems: 'center', paddingVertical: 16 }}>
        <LeftIconButton
          icon={SlidersHorizontal}
          title={i18n.common.manageTokenList}
          onPress={() => navigation.navigate('CustomTokenSetting')}
        />
      </View>
    );
  }, [navigation]);

  return (
    <ScreenContainer
      backgroundColor={ColorMap.dark}
      //gradientBackground={isTotalBalanceDecrease ? GradientBackgroundColorSet[1] : GradientBackgroundColorSet[0]}
    >
      <>
        <Header />

        <TokensLayout
          items={tokenGroupBalanceItems}
          layoutHeader={listHeaderNode}
          stickyBackground={isTotalBalanceDecrease ? GradientBackgroundColorSet[1] : GradientBackgroundColorSet[0]}
          listActions={actionsNode}
          renderItem={renderItem}
          layoutFooter={listFooterNode}
        />

        {accessBy && (
          <AccountSelector
            modalVisible={accessBy !== 'buy' ? isAccountSelectorModalVisible : isBuyAccountSelectorModalVisible}
            onCancel={accessBy !== 'buy' ? onCloseSelectAccount : onCloseSelectBuyAccount}
            items={accessBy !== 'buy' ? accountSelectorItems : buyAccountSelectorItems}
            onSelectItem={accessBy !== 'buy' ? openSelectAccount : openSelectBuyAccount}
          />
        )}

        {accessBy && (
          <TokenSelector
            modalVisible={accessBy !== 'buy' ? isTokenSelectorModalVisible : isBuyTokenSelectorModalVisible}
            items={accessBy !== 'buy' ? tokenSelectorItems : buyTokenSelectorItems}
            onSelectItem={accessBy !== 'buy' ? openSelectToken : openSelectBuyToken}
            onCancel={accessBy !== 'buy' ? onCloseSelectToken : onCloseSelectBuyToken}
          />
        )}

        {selectedBuyAccount && selectedBuyToken && (
          <ServiceModal
            modalVisible={isBuyServiceSelectorModalVisible}
            onChangeModalVisible={onCloseSelectBuyService}
            onPressBack={onCloseSelectBuyService}
            token={selectedBuyToken}
            address={selectedBuyAccount}
          />
        )}

        <ReceiveModal
          modalVisible={isQrModalVisible}
          address={selectedAccount}
          selectedNetwork={selectedNetwork}
          onCancel={onCloseQrModal}
        />

        <TokenSearchModal
          modalVisible={isTokenSearchModalVisible}
          onSelectItem={onPressSearchItem}
          isShowBalance={isShowBalance}
          items={tokenSearchItems}
          onCancel={() => setTokenSearchModalVisible(false)}
        />

        <CustomizationModal modalVisible={isCustomizationModalVisible} onCancel={onCloseCustomizationModal} />
      </>
    </ScreenContainer>
  );
};
