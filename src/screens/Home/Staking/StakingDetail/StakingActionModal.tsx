import { useNavigation } from '@react-navigation/native';
import {
  ChainStakingMetadata,
  NominatorMetadata,
  StakingItem,
  StakingRewardItem,
} from '@subwallet/extension-base/background/KoniTypes';
import { ALL_KEY, deviceHeight, TOAST_DURATION } from 'constants/index';
import { ArrowArcLeft, ArrowCircleDown, IconProps, MinusCircle, PlusCircle, Wallet } from 'phosphor-react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-notifications';
import ToastContainer from 'react-native-toast-notifications';
import { ColorMap } from 'styles/color';
import { FontSemiBold, STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import {
  getStakingAvailableActionsByChain,
  getStakingAvailableActionsByNominator,
  StakingAction,
} from '@subwallet/extension-base/koni/api/staking/bonding/utils';
import { RootNavigationProps } from 'routes/index';
import { ActivityIndicator, BackgroundIcon, SwModal, Typography } from 'components/design-system-ui';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import usePreCheckReadOnly from 'hooks/account/usePreCheckReadOnly';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';

interface Props {
  visible: boolean;
  closeModal: () => void;
  openModal: () => void;
  staking?: StakingItem;
  reward?: StakingRewardItem;
  chainStakingMetadata?: ChainStakingMetadata;
  nominatorMetadata?: NominatorMetadata;
}

type ActionListType = {
  backgroundIconColor: string;
  icon: (iconProps: IconProps) => JSX.Element;
  label: string;
  action: StakingAction;
  onPress: () => void;
};

const OFFSET_BOTTOM = deviceHeight - STATUS_BAR_HEIGHT - 140;

const StakingActionModal = (props: Props) => {
  const theme = useSubWalletTheme().swThemes;
  const { chainStakingMetadata, nominatorMetadata, closeModal, visible } = props;
  const toastRef = useRef<ToastContainer>(null);
  const navigation = useNavigation<RootNavigationProps>();
  const [selected, setSelected] = useState<StakingAction | undefined>();
  const { currentAccount } = useSelector((state: RootState) => state.accountState);
  const onClickButton = usePreCheckReadOnly(toastRef, currentAccount?.address);

  const unStakeAction = useCallback(() => {
    closeModal();
    navigation.navigate('TransactionAction', {
      screen: 'Unbond',
      params: {
        type: chainStakingMetadata?.type || ALL_KEY,
        chain: chainStakingMetadata?.chain || ALL_KEY,
      },
    });
  }, [chainStakingMetadata?.chain, chainStakingMetadata?.type, closeModal, navigation]);

  const stakeAction = useCallback(() => {
    closeModal();
    navigation.navigate('TransactionAction', {
      screen: 'Stake',
      params: {
        type: chainStakingMetadata?.type || ALL_KEY,
        chain: nominatorMetadata?.chain || ALL_KEY,
      },
    });
  }, [chainStakingMetadata?.type, closeModal, navigation, nominatorMetadata?.chain]);

  const handleWithdrawalAction = useCallback(() => {
    if (!nominatorMetadata) {
      setSelected(undefined);

      return;
    }
    closeModal();

    setSelected(undefined);
    navigation.navigate('TransactionAction', {
      screen: 'Withdraw',
      params: {
        type: chainStakingMetadata?.type || ALL_KEY,
        chain: chainStakingMetadata?.chain || ALL_KEY,
      },
    });
  }, [nominatorMetadata, closeModal, navigation, chainStakingMetadata?.type, chainStakingMetadata?.chain]);

  const cancelUnstakeAction = useCallback(() => {
    closeModal();
    navigation.navigate('TransactionAction', {
      screen: 'CancelUnstake',
      params: {
        type: chainStakingMetadata?.type || ALL_KEY,
        chain: chainStakingMetadata?.chain || ALL_KEY,
      },
    });
  }, [chainStakingMetadata?.chain, chainStakingMetadata?.type, closeModal, navigation]);

  const handleClaimRewardAction = useCallback(() => {
    if (!nominatorMetadata) {
      setSelected(undefined);

      return;
    }

    setSelected(undefined);
    closeModal();
    navigation.navigate('TransactionAction', {
      screen: 'ClaimReward',
      params: {
        type: chainStakingMetadata?.type || ALL_KEY,
        chain: chainStakingMetadata?.chain || ALL_KEY,
      },
    });
  }, [chainStakingMetadata?.chain, chainStakingMetadata?.type, closeModal, nominatorMetadata, navigation]);

  const availableActions = useMemo(() => {
    if (!nominatorMetadata) {
      return [];
    }
    return getStakingAvailableActionsByNominator(nominatorMetadata);
  }, [nominatorMetadata]);

  const actionList: ActionListType[] = useMemo(() => {
    if (!chainStakingMetadata) {
      return [];
    }

    const actionListByChain = getStakingAvailableActionsByChain(chainStakingMetadata.chain, chainStakingMetadata.type);

    return actionListByChain.map(action => {
      if (action === StakingAction.UNSTAKE) {
        return {
          action: StakingAction.UNSTAKE,
          backgroundIconColor: 'magenta-6',
          icon: MinusCircle,
          label: 'Unstake funds',
          onPress: unStakeAction,
        };
      } else if (action === StakingAction.WITHDRAW) {
        return {
          action: StakingAction.WITHDRAW,
          backgroundIconColor: 'geekblue-6',
          icon: ArrowCircleDown,
          label: 'Withdraw',
          onPress: handleWithdrawalAction,
        };
      } else if (action === StakingAction.CLAIM_REWARD) {
        return {
          action: StakingAction.CLAIM_REWARD,
          backgroundIconColor: 'green-7',
          icon: Wallet,
          label: 'Claim rewards',
          onPress: handleClaimRewardAction,
        };
      } else if (action === StakingAction.CANCEL_UNSTAKE) {
        return {
          action: StakingAction.CANCEL_UNSTAKE,
          backgroundIconColor: 'purple-8',
          icon: ArrowArcLeft,
          label: 'Cancel unstake',
          onPress: cancelUnstakeAction,
        };
      }

      return {
        action: StakingAction.STAKE,
        backgroundIconColor: 'green-6',
        icon: PlusCircle,
        label: 'Stake more',
        onPress: stakeAction,
      };
    });
  }, [
    cancelUnstakeAction,
    chainStakingMetadata,
    handleClaimRewardAction,
    handleWithdrawalAction,
    stakeAction,
    unStakeAction,
  ]);

  return (
    <SwModal modalVisible={visible} modalTitle={'Actions'} onChangeModalVisible={closeModal}>
      {actionList.map(item => {
        const actionDisable = !availableActions.includes(item.action);
        const hasAnAction = !!selected;
        const isSelected = item.action === selected;
        const anotherDisable = hasAnAction && !isSelected;
        const disabled = actionDisable || anotherDisable;
        return (
          <TouchableOpacity
            style={[
              {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
                paddingHorizontal: 16,
                paddingVertical: 14,
                backgroundColor: theme.colorBgSecondary,
                borderRadius: theme.borderRadiusLG,
                marginBottom: 8,
              },
              disabled && { opacity: 0.4 },
            ]}
            key={item.label}
            activeOpacity={0.5}
            onPress={onClickButton(item.onPress)}
            disabled={disabled}>
            <BackgroundIcon
              shape={'circle'}
              phosphorIcon={item.icon}
              size={'sm'}
              weight={'fill'}
              backgroundColor={theme[item.backgroundIconColor]}
            />
            <Typography.Text
              style={{
                fontSize: theme.fontSizeLG,
                lineHeight: theme.fontSizeLG * theme.lineHeightLG,
                color: theme.colorWhite,
                paddingLeft: 12,
                ...FontSemiBold,
              }}>
              {item.label}
            </Typography.Text>
            {isSelected && <ActivityIndicator size={20} indicatorColor={theme.colorWhite} />}
          </TouchableOpacity>
        );
      })}
      <Toast
        textStyle={{ textAlign: 'center' }}
        duration={TOAST_DURATION}
        normalColor={ColorMap.notification}
        ref={toastRef}
        placement={'bottom'}
        offsetBottom={OFFSET_BOTTOM}
      />
    </SwModal>
  );
};

export default React.memo(StakingActionModal);
