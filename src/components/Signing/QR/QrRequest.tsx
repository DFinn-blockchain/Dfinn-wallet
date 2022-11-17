// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetworkJson } from '@subwallet/extension-base/background/KoniTypes';
import { IGNORE_QR_SIGNER } from '@subwallet/extension-koni-base/constants';
import { SubWalletModal } from 'components/Modal/Base/SubWalletModal';
import SignatureScanner from 'components/Scanner/SignatureScanner';
import DisplayPayload from 'components/Signing/QR/DisplayPayload';
import { SubmitButton } from 'components/SubmitButton';
import { useRejectExternalRequest } from 'hooks/screen/useRejectExternalRequest';
import { WebRunnerContext } from 'providers/contexts';
import { ExternalRequestContext } from 'providers/ExternalRequestContext';
import { QrSignerContext } from 'providers/QrSignerContext';
import { SigningContext } from 'providers/SigningContext';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { RESULTS } from 'react-native-permissions';
import { ColorMap } from 'styles/color';
import { FontSemiBold, MarginBottomForSubmitButton, sharedStyles } from 'styles/sharedStyles';
import { requestCameraPermission } from 'utils/validators';
import { resolveExternalRequest } from '../../../messaging';
import { BaseSignProps, SigData } from 'types/signer';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { SignerResult } from '@polkadot/types/types';
import { hexToU8a, isHex } from '@polkadot/util';
import i18n from 'utils/i18n/i18n';
import { Warning } from 'components/Warning';

interface Props extends BaseSignProps {
  network: NetworkJson;
  handlerStart: () => void;
}

const ContainerStyle: StyleProp<ViewStyle> = {
  width: '100%',
};

const TitleTextStyle: StyleProp<TextStyle> = {
  ...sharedStyles.mediumText,
  ...FontSemiBold,
  textAlign: 'center',
  color: ColorMap.light,
  marginBottom: 24,
};

const ErrorStyle: StyleProp<ViewStyle> = {
  marginHorizontal: 16,
  marginTop: 16,
};

const CancelStyle: StyleProp<ViewStyle> = {
  backgroundColor: ColorMap.dark2,
  borderWidth: 1,
  borderColor: ColorMap.borderButtonColor,
};

const ActionModalStyle: StyleProp<ViewStyle> = {
  marginHorizontal: 0,
  display: 'flex',
  flexDirection: 'row',
  marginTop: 16,
};

const getWrapperStyle = (canCancel: boolean): StyleProp<ViewStyle> => {
  return {
    ...MarginBottomForSubmitButton,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: canCancel ? -4 : 0,
    marginTop: 16,
  };
};

const getButtonStyle = (canCancel: boolean, style?: StyleProp<ViewStyle>): StyleProp<ViewStyle> => {
  return {
    marginHorizontal: canCancel ? 4 : 0,
    flex: 1,
    ...(style as Object),
  };
};

const QrRequest = ({
  handlerStart,
  network,
  baseProps: { onCancel, cancelText, buttonText, submitText, extraLoading },
}: Props) => {
  const isSupport = useMemo((): boolean => !IGNORE_QR_SIGNER.includes(network.key), [network]);

  const { clearError, signingState, setIsVisible } = useContext(SigningContext);
  const { qrState } = useContext(QrSignerContext);
  const { createResolveExternalRequestData } = useContext(ExternalRequestContext);
  const { isNetConnected } = useContext(WebRunnerContext);

  const { handlerReject } = useRejectExternalRequest();

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isCanceling, setIsCanceling] = useState<boolean>(false);
  const [isResolving, setIsResolving] = useState(false);

  const { errors, isCreating, isVisible, isSubmitting, isLoading } = signingState;
  const { isEthereum, isQrHashed, qrAddress, qrId, qrPayload } = qrState;

  const cancelRequest = useCallback(async () => {
    setIsVisible(false);
    setIsCanceling(true);
    if (qrId) {
      setTimeout(() => {
        handlerReject(qrId);
      }, 500);
    }
    setIsCanceling(false);
  }, [handlerReject, qrId, setIsVisible]);

  const openScanner = useCallback(async () => {
    const result = await requestCameraPermission();

    if (result === RESULTS.GRANTED) {
      clearError();
      setIsScanning(true);
    }
  }, [clearError]);

  const closeScanner = useCallback(() => {
    setIsScanning(false);
    clearError();
  }, [clearError]);

  const handlerResolve = useCallback(
    async (result: SignerResult) => {
      if (qrId) {
        await resolveExternalRequest({ id: qrId, data: result });
      }
    },
    [qrId],
  );

  const handlerScanSignature = useCallback(
    async (data: SigData): Promise<void> => {
      if (isHex(data.signature) && !isResolving) {
        const resolveData = createResolveExternalRequestData(data);

        setIsResolving(true);
        await handlerResolve(resolveData);
        setIsResolving(false);
      }
    },
    [handlerResolve, createResolveExternalRequestData, isResolving],
  );

  return (
    <>
      {errors && (
        <View>
          {errors.map((error, index) => {
            return <Warning style={ErrorStyle} key={index} message={error} isDanger />;
          })}
        </View>
      )}
      {!isSupport && <Warning style={ErrorStyle} message={i18n.warningMessage.networkUnSupportQrSigner} isDanger />}
      <View style={getWrapperStyle(!!onCancel)}>
        {onCancel && (
          <SubmitButton
            backgroundColor={ColorMap.dark2}
            style={getButtonStyle(!!onCancel)}
            disabled={isLoading}
            title={cancelText ? cancelText : i18n.common.cancel}
            onPress={onCancel}
          />
        )}

        {isSubmitting ? (
          <SubmitButton
            style={getButtonStyle(!!onCancel)}
            disabled={true}
            title={submitText ? submitText : i18n.common.submitting}
            loadingLeftIcon={true}
          />
        ) : (
          <SubmitButton
            style={getButtonStyle(!!onCancel)}
            disabled={!isSupport || !isNetConnected || extraLoading}
            isBusy={isCreating}
            title={buttonText ? buttonText : i18n.common.approve}
            onPress={handlerStart}
          />
        )}
      </View>
      <SubWalletModal modalVisible={isVisible} onModalHide={cancelRequest}>
        <View style={ContainerStyle}>
          <Text style={TitleTextStyle}>{i18n.common.enterYourPassword}</Text>
          <View>
            <DisplayPayload
              isEthereum={isEthereum}
              size={250}
              payload={hexToU8a(qrPayload)}
              address={qrAddress}
              genesisHash={network.genesisHash}
              isHash={isQrHashed}
              isMessage={false}
            />
          </View>
          <View style={ActionModalStyle}>
            <SubmitButton
              backgroundColor={ColorMap.dark2}
              style={getButtonStyle(true, CancelStyle)}
              isBusy={isCanceling}
              title={cancelText ? cancelText : i18n.common.cancel}
              onPress={cancelRequest}
            />
            <SubmitButton
              title={i18n.common.scanQr}
              style={getButtonStyle(true)}
              onPress={openScanner}
              disabled={isCanceling}
            />
          </View>
        </View>
      </SubWalletModal>
      <SignatureScanner visible={isScanning} onSuccess={handlerScanSignature} onHideModal={closeScanner} />
    </>
  );
};

export default React.memo(QrRequest);
