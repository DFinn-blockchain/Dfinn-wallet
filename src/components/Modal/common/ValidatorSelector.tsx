import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useGetValidatorList, { ValidatorDataType } from 'hooks/screen/Staking/useGetValidatorList';
import { StakingType } from '@subwallet/extension-base/background/KoniTypes';
import { FlatListScreen } from 'components/FlatListScreen';
import { FlatListScreenPaddingTop, MarginBottomForSubmitButton, STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import { Warning } from 'components/Warning';
import i18n from 'utils/i18n/i18n';
import { Button, Icon, SwFullSizeModal } from 'components/design-system-ui';
import { ListRenderItemInfo, SafeAreaView, View } from 'react-native';
import { StakingValidatorItem } from 'components/common/StakingValidatorItem';
import { getValidatorKey } from 'utils/transaction/stake';
import useGetNominatorInfo from 'hooks/screen/Staking/useGetNominatorInfo';
import { useSelectValidators } from 'hooks/screen/Transaction/useSelectValidators';
import useGetChainStakingMetadata from 'hooks/screen/Staking/useGetChainStakingMetadata';
import { _STAKING_CHAIN_GROUP } from '@subwallet/extension-base/services/chain-service/constants';
import { CheckCircle } from 'phosphor-react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { ValidatorSelectorField } from 'components/Field/ValidatorSelector';
import { ValidatorSelectorDetailModal } from 'components/Modal/common/ValidatorSelectorDetailModal';
import Toast from 'react-native-toast-notifications';
import { deviceHeight, TOAST_DURATION } from 'constants/index';
import { ColorMap } from 'styles/color';
import ToastContainer from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { _getChainSubstrateAddressPrefix } from '@subwallet/extension-base/services/chain-service/utils';
import { SubmitButton } from '../../SubmitButton';

interface Props {
  onSelectItem?: (value: string) => void;
  chain: string;
  from: string;
  isSingleSelect?: boolean;
  validatorLoading: boolean;
  selectedValidator?: string;
  disabled?: boolean;
}

const searchFunction = (items: ValidatorDataType[], searchString: string) => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return items.filter(
    ({ identity, address }) =>
      address.toLowerCase().includes(lowerCaseSearchString) ||
      (identity ? identity.toLowerCase().includes(lowerCaseSearchString) : false),
  );
};

const renderListEmptyComponent = () => {
  return (
    <Warning
      style={{ marginHorizontal: 16 }}
      title={i18n.warningTitle.warning}
      message={'No validator available'}
      isDanger={false}
    />
  );
};
const OFFSET_BOTTOM = deviceHeight - STATUS_BAR_HEIGHT - 140;
export const ValidatorSelector = ({
  chain,
  onSelectItem,
  from,
  isSingleSelect: _isSingleSelect,
  validatorLoading,
  selectedValidator,
  disabled,
}: Props) => {
  const theme = useSubWalletTheme().swThemes;
  const toastRef = useRef<ToastContainer>(null);
  const items = useGetValidatorList(chain, StakingType.NOMINATED) as ValidatorDataType[];
  const [validatorSelectModalVisible, setValidatorSelectModalVisible] = useState<boolean>(false);
  const [detailItem, setDetailItem] = useState<ValidatorDataType | undefined>(undefined);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const nominatorMetadata = useGetNominatorInfo(chain, StakingType.NOMINATED, from);
  const chainStakingMetadata = useGetChainStakingMetadata(chain);
  const maxCount = chainStakingMetadata?.maxValidatorPerNominator || 1;
  const nominations = useMemo(() => nominatorMetadata[0]?.nominations, [nominatorMetadata]);
  const isRelayChain = useMemo(() => _STAKING_CHAIN_GROUP.relay.includes(chain), [chain]);
  const isSingleSelect = useMemo(() => _isSingleSelect || !isRelayChain, [_isSingleSelect, isRelayChain]);
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);
  const chainInfo = chainInfoMap[chain];
  const networkPrefix = _getChainSubstrateAddressPrefix(chainInfo);
  const {
    changeValidators,
    onApplyChangeValidators,
    onCancelSelectValidator,
    onChangeSelectedValidator,
    onInitValidators,
  } = useSelectValidators(
    maxCount,
    onSelectItem,
    isSingleSelect,
    () => setValidatorSelectModalVisible(false),
    toastRef,
  );

  useEffect(() => {
    const defaultValue =
      nominations?.map(item => getValidatorKey(item.validatorAddress, item.validatorIdentity)).join(',') || '';
    const selected = isSingleSelect ? '' : defaultValue;
    onInitValidators(defaultValue, selected);
    onSelectItem && onSelectItem(selected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nominations, onInitValidators, isSingleSelect]);

  const nominatorValueList = useMemo(() => {
    return nominations && nominations.length
      ? nominations.map(item => getValidatorKey(item.validatorAddress, item.validatorIdentity))
      : [];
  }, [nominations]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ValidatorDataType>) => {
      const key = getValidatorKey(item.address, item.identity);
      const selected = changeValidators.includes(key);
      const nominated = nominatorValueList.includes(key);

      return (
        <StakingValidatorItem
          validatorInfo={item}
          onPress={onChangeSelectedValidator}
          onPressRightButton={() => {
            setDetailItem(item);
            setDetailModalVisible(true);
          }}
          isNominated={nominated}
          isSelected={selected}
        />
      );
    },
    [changeValidators, nominatorValueList, onChangeSelectedValidator],
  );

  return (
    <>
      <ValidatorSelectorField
        disabled={!chain || !from || disabled}
        onPressLightningBtn={() => setValidatorSelectModalVisible(true)}
        onPressBookBtn={() => setValidatorSelectModalVisible(true)}
        value={selectedValidator}
        label={'Select validator'}
        loading={validatorLoading}
      />

      <SwFullSizeModal modalVisible={validatorSelectModalVisible}>
        <FlatListScreen
          autoFocus={true}
          items={items}
          style={[FlatListScreenPaddingTop, { flex: 1 }]}
          title={'Select validator'}
          searchFunction={searchFunction}
          renderItem={renderItem}
          onPressBack={onCancelSelectValidator}
          renderListEmptyComponent={renderListEmptyComponent}
          isShowFilterBtn={false}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingTop: 16,
            ...MarginBottomForSubmitButton,
          }}>
          <SubmitButton
            disabled={!changeValidators.length}
            onPress={onApplyChangeValidators}
            title={`Apply ${changeValidators.length} validators`}
            leftIcon={CheckCircle}
            style={{ width: '100%' }}
          />
          {/* <Button
            disabled={!changeValidators.length}
            block
            onPress={onApplyChangeValidators}
            icon={
              <Icon
                phosphorIcon={CheckCircle}
                weight={'fill'}
                iconColor={!changeValidators.length ? theme.colorTextLight5 : theme.colorWhite}
              />
            }>{`Apply ${changeValidators.length} validators`}</Button> */}
        </View>

        <SafeAreaView />

        {detailItem && (
          <ValidatorSelectorDetailModal
            detailModalVisible={detailModalVisible}
            detailItem={detailItem}
            onCancel={() => setDetailModalVisible(false)}
            networkPrefix={networkPrefix}
          />
        )}

        {
          <Toast
            duration={TOAST_DURATION}
            normalColor={ColorMap.notification}
            ref={toastRef}
            placement={'bottom'}
            offsetBottom={OFFSET_BOTTOM}
          />
        }
      </SwFullSizeModal>
    </>
  );
};
