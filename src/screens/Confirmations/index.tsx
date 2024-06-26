import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AccountJson,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@subwallet/extension-base/background/types';
import { ConfirmationHeader } from 'components/common/ConfirmationHeader';
import { NEED_SIGN_CONFIRMATION } from 'constants/transaction';
import useHandlerHardwareBackPress from 'hooks/screen/useHandlerHardwareBackPress';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RootStackParamList } from 'routes/index';
import { ConfirmationType } from 'stores/base/RequestState';
import useConfirmationsInfo from 'hooks/screen/Confirmation/useConfirmationsInfo';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleProp, View } from 'react-native';
import { RootState } from 'stores/index';
import { useSelector } from 'react-redux';
import { ConfirmationDefinitions, ExtrinsicType } from '@subwallet/extension-base/background/KoniTypes';
import { ColorMap } from 'styles/color';
import { isRawPayload } from 'utils/confirmation/request/substrate';

import {
  AddNetworkConfirmation,
  AddTokenConfirmation,
  AuthorizeConfirmation,
  EvmSignatureConfirmation,
  EvmTransactionConfirmation,
  MetadataConfirmation,
  NotSupportConfirmation,
  TransactionConfirmation,
  SignConfirmation,
} from './variants';
import { STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import ConnectWalletConnectConfirmation from './variants/ConnectWalletConnectConfirmation';

const confirmationPopupWrapper: StyleProp<any> = {
  maxHeight: '100%',
  width: '100%',
  backgroundColor: ColorMap.dark1,
  borderTopLeftRadius: 32,
  borderTopRightRadius: 32,
  alignItems: 'center',
  paddingTop: Platform.OS === 'ios' ? 8 : STATUS_BAR_HEIGHT + 8,
};

const subWalletModalSeparator: StyleProp<any> = {
  width: 56,
  height: 4,
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};

const titleMap: Record<ConfirmationType, string> = {
  addNetworkRequest: 'Add Network Request',
  addTokenRequest: 'Add Token Request',
  authorizeRequest: 'Connect to Dfinn Wallet',
  evmSendTransactionRequest: 'Transaction Request',
  evmSignatureRequest: 'Signature request',
  metadataRequest: 'Update Metadata',
  signingRequest: 'Signature request',
  switchNetworkRequest: 'Add Network Request',
  connectWCRequest: 'Connect using WalletConnect',
} as Record<ConfirmationType, string>;

export const Confirmations = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { confirmationQueue, numberOfConfirmations } = useConfirmationsInfo();
  const { transactionRequest } = useSelector((state: RootState) => state.requestState);
  const [index, setIndex] = useState(0);
  const confirmation = confirmationQueue[index] || null;
  useHandlerHardwareBackPress(true);

  const nextConfirmation = useCallback(() => {
    setIndex(val => Math.min(val + 1, numberOfConfirmations - 1));
  }, [numberOfConfirmations]);

  const prevConfirmation = useCallback(() => {
    setIndex(val => Math.max(0, val - 1));
  }, []);

  const headerTitle = useMemo((): string => {
    // TODO: i18n
    if (!confirmation) {
      return '';
    }

    if (confirmation.item.isInternal) {
      const transaction = transactionRequest[confirmation.item.id];

      if (!transaction) {
        return titleMap[confirmation.type] || '';
      }

      switch (transaction.extrinsicType) {
        case ExtrinsicType.TRANSFER_BALANCE:
        case ExtrinsicType.TRANSFER_TOKEN:
        case ExtrinsicType.TRANSFER_XCM:
          return 'Transfer confirmation';
        case ExtrinsicType.SEND_NFT:
          return 'NFT Transfer confirmation';
        case ExtrinsicType.STAKING_JOIN_POOL:
        case ExtrinsicType.STAKING_BOND:
          return 'Add to bond confirm';
        case ExtrinsicType.STAKING_LEAVE_POOL:
        case ExtrinsicType.STAKING_UNBOND:
          return 'Unbond confirmation';
        case ExtrinsicType.STAKING_WITHDRAW:
          return 'Withdraw confirm';
        case ExtrinsicType.STAKING_CLAIM_REWARD:
          return 'Claim reward confirm';
        case ExtrinsicType.STAKING_CANCEL_UNSTAKE:
          return 'Cancel unstake confirm';
        default:
          return 'Transaction confirm';
      }
    } else {
      return titleMap[confirmation.type] || '';
    }
  }, [confirmation, transactionRequest]);

  const content = useMemo((): React.ReactNode => {
    if (!confirmation) {
      return null;
    }

    if (NEED_SIGN_CONFIRMATION.includes(confirmation.type)) {
      let account: AccountJson | undefined;
      let canSign = true;
      let isMessage = false;

      if (confirmation.type === 'signingRequest') {
        const request = confirmation.item as SigningRequest;
        const _isMessage = isRawPayload(request.request.payload);

        account = request.account;
        canSign = !_isMessage || !account.isHardware;
        isMessage = _isMessage;
      } else if (confirmation.type === 'evmSignatureRequest' || confirmation.type === 'evmSendTransactionRequest') {
        const request = confirmation.item as ConfirmationDefinitions[
          | 'evmSignatureRequest'
          | 'evmSendTransactionRequest'][0];

        account = request.payload.account;
        canSign = request.payload.canSign;
        isMessage = confirmation.type === 'evmSignatureRequest';
      }

      if (account?.isReadOnly || !canSign) {
        return (
          <NotSupportConfirmation
            account={account}
            isMessage={isMessage}
            request={confirmation.item}
            type={confirmation.type}
          />
        );
      }
    }

    if (confirmation.item.isInternal) {
      return <TransactionConfirmation confirmation={confirmation} />;
    }

    switch (confirmation.type) {
      case 'addNetworkRequest':
        return (
          <AddNetworkConfirmation request={confirmation.item as ConfirmationDefinitions['addNetworkRequest'][0]} />
        );
      case 'addTokenRequest':
        return <AddTokenConfirmation request={confirmation.item as ConfirmationDefinitions['addTokenRequest'][0]} />;
      case 'evmSignatureRequest':
        return (
          <EvmSignatureConfirmation
            request={confirmation.item as ConfirmationDefinitions['evmSignatureRequest'][0]}
            type={confirmation.type}
          />
        );
      case 'evmSendTransactionRequest':
        return (
          <EvmTransactionConfirmation
            request={confirmation.item as ConfirmationDefinitions['evmSendTransactionRequest'][0]}
            type={confirmation.type}
          />
        );
      case 'authorizeRequest':
        return <AuthorizeConfirmation request={confirmation.item as AuthorizeRequest} />;
      case 'metadataRequest':
        return <MetadataConfirmation request={confirmation.item as MetadataRequest} />;
      case 'signingRequest':
        return <SignConfirmation request={confirmation.item as SigningRequest} />;
      case 'connectWCRequest':
        return <ConnectWalletConnectConfirmation request={confirmation.item} />;
    }

    return null;
  }, [confirmation]);

  useEffect(() => {
    if (numberOfConfirmations) {
      if (index >= numberOfConfirmations) {
        setIndex(numberOfConfirmations - 1);
      }
    }
  }, [index, numberOfConfirmations]);

  useEffect(() => {
    if (!confirmation && navigation.isFocused()) {
      const state = navigation.getState();
      const confirmationRoute = state.routes.find(route => route.name === 'Confirmations');
      if (!confirmationRoute) {
        navigation.goBack();
      } else {
        navigation.pop(state.index - state.routes.indexOf(confirmationRoute) + 1);
      }
    }
  }, [confirmation, navigation]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
        <View style={confirmationPopupWrapper}>
          {(!confirmation || !confirmation.item.isInternal) && <View style={subWalletModalSeparator} />}
          <ConfirmationHeader
            index={index}
            numberOfConfirmations={numberOfConfirmations}
            title={headerTitle}
            onPressPrev={prevConfirmation}
            onPressNext={nextConfirmation}
            isFullHeight={confirmation && confirmation.item.isInternal}
          />
          {content}
          <SafeAreaView />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
