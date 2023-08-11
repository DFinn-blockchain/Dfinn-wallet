import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatListScreen } from 'components/FlatListScreen';
import { StakingDataType } from 'hooks/types';
import { Plus, Trophy } from 'phosphor-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard, ListRenderItemInfo, RefreshControl } from 'react-native';
import StakingBalanceItem from 'screens/Home/Staking/Balance/StakingBalanceItem';
import EmptyStaking from 'screens/Home/Staking/Shared/EmptyStaking';
import i18n from 'utils/i18n/i18n';
import { ColorMap } from 'styles/color';
import { reloadCron } from 'messaging/index';
import { useRefresh } from 'hooks/useRefresh';
import useGetStakingList from 'hooks/screen/Home/Staking/useGetStakingList';
import { StakingDetailModal } from 'screens/Home/Staking/StakingDetail/StakingDetailModal';
import StakingActionModal from 'screens/Home/Staking/StakingDetail/StakingActionModal';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { StakingType } from '@subwallet/extension-base/background/KoniTypes';
import { RootNavigationProps } from 'routes/index';
import { EmptyList } from 'components/EmptyList';
import { setAdjustPan } from 'rn-android-keyboard-adjust';
import { ScreenContainer } from 'components/ScreenContainer';

enum FilterValue {
  NOMINATED = 'nominated',
  POOLED = 'pooled',
}

const renderEmpty = (val?: string) => {
  if (val) {
    return <EmptyList title={'No staking'} icon={Trophy} message={'Your staking accounts will appear here!'} />;
  } else {
    return <EmptyStaking />;
  }
};

const filterFunction = (items: StakingDataType[], filters: string[]) => {
  if (!filters.length) {
    return items;
  }

  return items.filter(item => {
    for (const filter of filters) {
      switch (filter) {
        case FilterValue.NOMINATED:
          if (item.staking.type === StakingType.NOMINATED) {
            return true;
          }
          break;
        case FilterValue.POOLED:
          if (item.staking.type === StakingType.POOLED) {
            return true;
          }
      }
    }
    return false;
  });
};

const searchFunction = (items: StakingDataType[], searchString: string) => {
  return items.filter(({ staking }) => {
    return staking.name.replace(' Relay Chain', '').toLowerCase().includes(searchString.toLowerCase());
  });
};

const StakingBalanceList = () => {
  const theme = useSubWalletTheme().swThemes;
  const { data, priceMap } = useGetStakingList();
  const navigation = useNavigation<RootNavigationProps>();
  const [isRefresh, refresh] = useRefresh();
  const [selectedItem, setSelectedItem] = useState<StakingDataType | undefined>(undefined);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [moreActionModalVisible, setMoreActionModalVisible] = useState<boolean>(false);
  const handleOnPress = useCallback((stakingData: StakingDataType): (() => void) => {
    return () => {
      Keyboard.dismiss();
      setSelectedItem(stakingData);
      setDetailModalVisible(true);
    };
  }, []);
  const FILTER_OPTIONS = [
    { label: 'Nominated', value: FilterValue.NOMINATED },
    { label: 'Pooled', value: FilterValue.POOLED },
  ];

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setAdjustPan();
    }
  }, [isFocused]);

  const renderItem = useCallback(
    ({ item: stakingData }: ListRenderItemInfo<StakingDataType>) => {
      return (
        <StakingBalanceItem
          key={stakingData.staking.chain}
          stakingData={stakingData}
          priceMap={priceMap}
          onPress={handleOnPress}
        />
      );
    },
    [handleOnPress, priceMap],
  );

  const handlePressStartStaking = useCallback(
    () =>
      navigation.navigate('TransactionAction', {
        screen: 'Stake',
        params: {},
      }),
    [navigation],
  );

  const rightIconOption = useMemo(() => {
    return {
      icon: Plus,
      onPress: handlePressStartStaking,
    };
  }, [handlePressStartStaking]);

  return (
    <ScreenContainer backgroundColor={theme.colorBgDefault}>
      <>
        <FlatListScreen
          style={{ marginTop: -20 }}
          title={i18n.title.staking}
          titleTextAlign={'left'}
          items={data}
          showLeftBtn={false}
          autoFocus={false}
          renderListEmptyComponent={renderEmpty}
          searchFunction={searchFunction}
          filterOptions={FILTER_OPTIONS}
          filterFunction={filterFunction}
          flatListStyle={{ paddingHorizontal: theme.padding, gap: theme.sizeXS, paddingBottom: 8 }}
          renderItem={renderItem}
          rightIconOption={rightIconOption}
          isShowFilterBtn
          isShowMainHeader
          refreshControl={
            <RefreshControl
              style={{ backgroundColor: ColorMap.dark1 }}
              tintColor={ColorMap.light}
              refreshing={isRefresh}
              onRefresh={() => {
                refresh(reloadCron({ data: 'staking' }));
              }}
            />
          }
          isShowPlaceHolder={false}
          needGapWithStatusBar={false}
        />

        {selectedItem && (
          <StakingDetailModal
            modalVisible={detailModalVisible}
            onCloseDetailModal={() => setDetailModalVisible(false)}
            onOpenMoreActionModal={() => setMoreActionModalVisible(true)}
            chainStakingMetadata={selectedItem.chainStakingMetadata}
            nominatorMetadata={selectedItem.nominatorMetadata}
            rewardItem={selectedItem.reward}
            staking={selectedItem.staking}
          />
        )}

        <StakingActionModal
          closeModal={() => setMoreActionModalVisible(false)}
          openModal={() => setMoreActionModalVisible(true)}
          visible={moreActionModalVisible}
          chainStakingMetadata={selectedItem?.chainStakingMetadata}
          nominatorMetadata={selectedItem?.nominatorMetadata}
          staking={selectedItem?.staking}
          reward={selectedItem?.reward}
        />
      </>
    </ScreenContainer>
  );
};

export default React.memo(StakingBalanceList);
