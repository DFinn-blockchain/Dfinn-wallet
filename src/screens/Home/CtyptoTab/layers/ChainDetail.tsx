import { ScreenContainer } from 'components/ScreenContainer';
import React, { useState } from 'react';
import { SubHeader } from 'components/SubHeader';
import { ColorMap } from 'styles/color';
import { SlidersHorizontal } from 'phosphor-react-native';
import { getNetworkLogo, getTokenBalanceKey, getTotalConvertedBalanceValue, toShort } from 'utils/index';
import * as Tabs from 'react-native-collapsible-tab-view';
import { alwaysShowedKey, renderTabBar } from 'screens/Home/CtyptoTab/layers/shared';
import { TokensTab } from 'screens/Home/CtyptoTab/tabs/TokensTab';
import { AccountInfoByNetwork, TokenBalanceItemType } from 'types/ui-types';
import { BalanceInfo } from '../../../../types';
import { ListRenderItemInfo, StyleProp, View } from 'react-native';
import Text from 'components/Text';
import { FontMedium, FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { HistoryTab } from 'screens/Home/CtyptoTab/tabs/HistoryTab';
import { BN_ZERO } from 'utils/chainBalances';
import { TokenChainBalance } from 'components/TokenChainBalance';
import TabsContainerHeader from 'screens/Home/CtyptoTab/TabsContainerHeader';
import { useRefresh } from 'hooks/useRefresh';

interface Prop {
  isShowZeroBalance?: boolean;
  tokenBalanceKeyPriceMap: Record<string, number>;
  networkBalanceMap: Record<string, BalanceInfo>;
  selectedNetworkInfo: AccountInfoByNetwork;
  onPressBack: () => void;
  handleChangeTokenItem: (tokenSymbol: string, tokenDisplayName: string, info?: AccountInfoByNetwork) => void;
}

const chainDetailHeaderStyle: StyleProp<any> = {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const chainDetailHeaderTitleStyle: StyleProp<any> = {
  ...sharedStyles.mediumText,
  ...FontSemiBold,
  color: ColorMap.light,
  paddingLeft: 4,
  maxWidth: 150,
};

const renderChainDetailHeaderContent = (selectedNetworkInfo: AccountInfoByNetwork) => {
  return () => {
    return (
      <View style={chainDetailHeaderStyle}>
        {getNetworkLogo(selectedNetworkInfo.networkKey, 20)}
        <Text style={chainDetailHeaderTitleStyle} numberOfLines={1}>
          {selectedNetworkInfo.networkDisplayName.replace(' Relay Chain', '')}
        </Text>
        <Text
          style={{
            ...sharedStyles.mainText,
            ...FontMedium,
            color: ColorMap.disabled,
            paddingLeft: 4,
          }}>
          {`(${toShort(selectedNetworkInfo.formattedAddress, 4, 4)})`}
        </Text>
      </View>
    );
  };
};

function getChainDetailItems(
  selectedNetworkInfo: AccountInfoByNetwork,
  selectedBalanceInfo: BalanceInfo,
  tokenBalanceKeyPriceMap: Record<string, number>,
): TokenBalanceItemType[] {
  const items: TokenBalanceItemType[] = [];

  const symbol = selectedBalanceInfo?.symbol || 'Unit';
  // const networkDisplayName = selectedNetworkInfo.networkDisplayName.replace(' Relay Chain', '');
  const isTestnet = selectedNetworkInfo.isTestnet;
  const itemId = getTokenBalanceKey(selectedNetworkInfo.networkKey, symbol, isTestnet);

  items.push({
    id: itemId,
    logoKey: selectedNetworkInfo.networkKey,
    networkKey: selectedNetworkInfo.networkKey,
    // networkDisplayName,
    balanceValue: selectedBalanceInfo?.balanceValue || BN_ZERO,
    convertedBalanceValue: selectedBalanceInfo?.convertedBalanceValue || BN_ZERO,
    symbol,
    displayedSymbol: symbol,
    isReady: selectedNetworkInfo && selectedBalanceInfo && selectedBalanceInfo.isReady,
    isTestnet,
    priceValue: tokenBalanceKeyPriceMap[itemId] || 0,
  });

  if (selectedBalanceInfo && selectedBalanceInfo.childrenBalances && selectedBalanceInfo.childrenBalances.length) {
    selectedBalanceInfo.childrenBalances.forEach(item => {
      const cItemId = getTokenBalanceKey(selectedNetworkInfo.networkKey, item.symbol, isTestnet);
      items.push({
        id: cItemId,
        networkKey: selectedNetworkInfo.networkKey,
        // networkDisplayName,
        logoKey: item.symbol,
        balanceValue: item.balanceValue,
        convertedBalanceValue: item.convertedBalanceValue,
        symbol: item.symbol,
        displayedSymbol: item.symbol,
        isReady: selectedNetworkInfo && selectedBalanceInfo && selectedBalanceInfo.isReady,
        isTestnet,
        priceValue: tokenBalanceKeyPriceMap[cItemId] || 0,
      });
    });
  }

  return items;
}

const ChainDetailLayer = ({
  tokenBalanceKeyPriceMap,
  networkBalanceMap,
  selectedNetworkInfo,
  handleChangeTokenItem,
  onPressBack,
  isShowZeroBalance,
}: Prop) => {
  const tokenBalanceItems = getChainDetailItems(
    selectedNetworkInfo,
    networkBalanceMap[selectedNetworkInfo.networkKey],
    tokenBalanceKeyPriceMap,
  );
  const [isRefresh, refresh] = useRefresh();
  const [refreshTabId, setRefreshTabId] = useState<string>('');
  const renderTokenTabItem = ({ item }: ListRenderItemInfo<TokenBalanceItemType>) => {
    if (!isShowZeroBalance && !alwaysShowedKey.includes(item.id) && BN_ZERO.eq(item.balanceValue)) {
      return null;
    }

    return (
      <TokenChainBalance
        key={item.id}
        onPress={() => handleChangeTokenItem(item.symbol, item.displayedSymbol)}
        {...item}
      />
    );
  };

  const renderTabContainerHeader = () => {
    return (
      <TabsContainerHeader
        balanceBlockProps={{
          balanceValue: getTotalConvertedBalanceValue(networkBalanceMap[selectedNetworkInfo.networkKey]),
        }}
        selectionProvider={{ selectedNetworkKey: selectedNetworkInfo.networkKey }}
      />
    );
  };

  const _onRefresh = (tabId: string) => {
    setRefreshTabId(tabId);
    refresh();
  };

  return (
    <ScreenContainer>
      <>
        {selectedNetworkInfo && (
          <SubHeader
            showRightBtn
            backgroundColor={ColorMap.dark2}
            disableRightButton={true}
            rightIcon={SlidersHorizontal}
            onPressBack={onPressBack}
            headerContent={renderChainDetailHeaderContent(selectedNetworkInfo)}
            title={''}
          />
        )}

        <Tabs.Container
          lazy
          containerStyle={{ backgroundColor: ColorMap.dark2 }}
          allowHeaderOverscroll={true}
          renderTabBar={renderTabBar}
          renderHeader={renderTabContainerHeader}>
          <Tabs.Tab name={'one'} label={'Token'}>
            <TokensTab
              items={tokenBalanceItems}
              renderItem={renderTokenTabItem}
              isRefresh={isRefresh}
              refresh={_onRefresh}
              refreshTabId={refreshTabId}
            />
          </Tabs.Tab>
          <Tabs.Tab name={'two'} label={'History'}>
            <HistoryTab
              networkKey={selectedNetworkInfo.networkKey}
              isRefresh={isRefresh}
              refresh={_onRefresh}
              refreshTabId={refreshTabId}
            />
          </Tabs.Tab>
        </Tabs.Container>
      </>
    </ScreenContainer>
  );
};

export default ChainDetailLayer;