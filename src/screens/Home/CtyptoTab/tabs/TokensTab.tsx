import React from 'react';
import { ListRenderItem, RefreshControl } from 'react-native';
import { TokenBalanceItemType } from 'types/ui-types';
import * as Tabs from 'react-native-collapsible-tab-view';
import { ColorMap } from 'styles/color';
import { CollapsibleFlatListStyle } from 'styles/sharedStyles';

interface Props {
  items: TokenBalanceItemType[];
  renderItem: ListRenderItem<TokenBalanceItemType> | null | undefined;
  isRefresh: boolean;
  refresh: (tabId: string) => void;
  refreshTabId: string;
}

export const TokensTab = ({ items: tokenBalanceItems, renderItem, isRefresh, refresh, refreshTabId }: Props) => {
  return (
    <Tabs.FlatList
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: ColorMap.dark1 }}
      style={{ ...CollapsibleFlatListStyle }}
      keyboardShouldPersistTaps={'handled'}
      data={tokenBalanceItems}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          style={{ backgroundColor: ColorMap.dark2, opacity: refreshTabId === 'one' ? 1 : 0 }}
          tintColor={ColorMap.light}
          refreshing={isRefresh}
          onRefresh={() => refresh('one')}
        />
      }
    />
  );
};
