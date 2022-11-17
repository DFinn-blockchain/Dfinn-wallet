import {
  BaseRequestSign,
  BasicTxResponse,
  ExternalRequestSign,
  HandleTxResponse,
  NetworkJson,
  PasswordRequestSign,
} from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import PasswordRequest from 'components/Signing/Password/PasswordRequest';
import QrRequest from 'components/Signing/QR/QrRequest';
import UnknownRequest from 'components/Signing/Unknown/UnknownRequest';
import { Keyboard, StyleProp, View, ViewStyle } from 'react-native';
import { BaseSignProps, SIGN_MODE } from 'types/signer';
import { ExternalRequestContext } from 'providers/ExternalRequestContext';
import { QrContextState, QrSignerContext, QrStep } from 'providers/QrSignerContext';
import { SigningContext } from 'providers/SigningContext';

import useGetAccountSignModeByAddress from 'hooks/screen/useGetAccountSignModeByAddress';
import React, { useCallback, useContext, useEffect } from 'react';
import { noop } from 'utils/function';

interface Props<T extends BaseRequestSign, V extends BasicTxResponse> extends BaseSignProps {
  account: AccountJson | null;
  balanceError?: boolean;
  detailError?: boolean;
  // handleSignLedger?: (params: ExternalRequestSign<T>, callback: HandleTxResponse<V>) => Promise<V>;
  handleSignPassword: (params: PasswordRequestSign<T>, callback: HandleTxResponse<V>) => Promise<V>;
  handleSignQr?: (params: ExternalRequestSign<T>, callback: HandleTxResponse<V>) => Promise<V>;
  message: string;
  network: NetworkJson | null;
  onAfterSuccess?: (res: V) => void;
  onFail: (errors: string[], extrinsicHash?: string) => void;
  onSuccess: (extrinsicHash: string) => void;
  style?: StyleProp<ViewStyle>;
  params: T;
}

const SigningRequest = <T extends BaseRequestSign, V extends BasicTxResponse>({
  account,
  balanceError,
  detailError,
  // handleSignLedger,
  handleSignPassword,
  handleSignQr,
  message,
  baseProps,
  network,
  onAfterSuccess,
  onFail,
  onSuccess,
  style,
  params,
}: Props<T, V>) => {
  const { cleanSigningState, onErrors, setIsCreating, setPasswordError, setIsVisible, setIsSubmitting } =
    useContext(SigningContext);
  const { cleanQrState, updateQrState } = useContext(QrSignerContext);
  const { cleanExternalState, updateExternalState } = useContext(ExternalRequestContext);

  const signMode = useGetAccountSignModeByAddress(account?.address);

  /// Handle response

  // Base

  const handleCallbackResponseResult = useCallback(
    (data: V) => {
      if (data.passwordError) {
        setIsCreating(false);
        setIsSubmitting(false);
        setPasswordError(!!data.passwordError);
        onErrors([data.passwordError]);
        setIsVisible(true);

        cleanQrState();
        cleanExternalState();

        return;
      }

      if (balanceError && !data.passwordError) {
        setIsCreating(false);
        setIsSubmitting(false);
        onErrors(['Your balance is too low to cover fees']);
        onFail(['Your balance is too low to cover fees']);
        cleanQrState();
        cleanExternalState();

        return;
      }

      if (data.txError && data.status === undefined) {
        setIsCreating(false);
        setIsSubmitting(false);
        onErrors(['Encountered an error, please try again.']);
        onFail(['Encountered an error, please try again.'], data.extrinsicHash);
        cleanQrState();
        cleanExternalState();

        return;
      }

      if (data.status !== undefined) {
        setIsCreating(false);
        setIsSubmitting(false);

        if (data.status) {
          onSuccess(data.extrinsicHash as string);
          onAfterSuccess && onAfterSuccess(data);
        } else {
          const errors =
            detailError && data.errors ? data.errors.map(e => e.message) : ['Error submitting transaction'];

          onFail(errors, data.extrinsicHash);
        }

        cleanQrState();
        cleanExternalState();
      }
    },
    [
      balanceError,
      cleanExternalState,
      cleanQrState,
      detailError,
      onAfterSuccess,
      onErrors,
      onFail,
      onSuccess,
      setIsCreating,
      setPasswordError,
      setIsSubmitting,
      setIsVisible,
    ],
  );

  // Error

  const handleResponseError = useCallback(
    (response: V) => {
      if (response.passwordError) {
        onErrors(['Invalid password']);
        setIsCreating(false);
        setIsSubmitting(false);
      } else {
        const errorMessage = response.errors?.map(err => err.message);

        onErrors(errorMessage || []);

        if (errorMessage && errorMessage.length) {
          setIsCreating(false);
          setIsSubmitting(false);
        }
      }
    },
    [onErrors, setIsCreating, setIsSubmitting],
  );

  const catchError = useCallback(
    (error: unknown) => {
      console.log(message, error);
      setIsCreating(false);
    },
    [message, setIsCreating],
  );

  // Qr

  const handleCallbackResponseResultQr = useCallback(
    (data: V) => {
      if (data.qrState) {
        const state: QrContextState = {
          ...data.qrState,
          step: QrStep.DISPLAY_PAYLOAD,
        };

        // Create transaction complete
        updateQrState(state);
        setTimeout(() => {
          setIsCreating(false);
          setIsVisible(true);
        }, 100);
      }

      if (data.externalState) {
        updateExternalState(data.externalState);
      }

      if (data.isBusy) {
        // Submit transaction
        updateQrState({ step: QrStep.SENDING_TX });
        setIsSubmitting(true);
        setIsVisible(false);
      }

      handleCallbackResponseResult(data);
    },
    [handleCallbackResponseResult, setIsCreating, setIsSubmitting, setIsVisible, updateExternalState, updateQrState],
  );

  // Ledger

  // const handleCallbackResponseResultLedger = useCallback(
  //   (handlerSignLedger: (ledgerState: LedgerState) => void, data: V) => {
  //     if (data.ledgerState) {
  //       handlerSignLedger(data.ledgerState);
  //     }
  //
  //     if (data.externalState) {
  //       updateExternalState(data.externalState);
  //     }
  //
  //     handleCallbackResponseResult(data);
  //   },
  //   [handleCallbackResponseResult, updateExternalState],
  // );

  /// Submit

  // Password

  const onSendPassword = useCallback(
    async (password: string) => {
      setIsSubmitting(true);
      await handleSignPassword({ ...params, password: password }, handleCallbackResponseResult)
        .then(handleResponseError)
        .catch(catchError);
    },
    [setIsSubmitting, handleSignPassword, params, handleCallbackResponseResult, handleResponseError, catchError],
  );

  const onSubmitPassword = useCallback(
    (password: string) => {
      Keyboard.dismiss();

      // Create and submit transaction
      setIsCreating(true);
      setIsSubmitting(true);
      setIsVisible(false);

      setTimeout(() => {
        onSendPassword(password).then(noop);
      }, 100);
    },
    [setIsCreating, setIsSubmitting, setIsVisible, onSendPassword],
  );

  // Qr

  const onSendQr = useCallback(() => {
    handleSignQr && handleSignQr(params, handleCallbackResponseResultQr).then(handleResponseError).catch(catchError);
  }, [handleSignQr, params, handleCallbackResponseResultQr, handleResponseError, catchError]);

  const onSubmitQr = useCallback(() => {
    // Create transaction only
    setIsCreating(true);

    setTimeout(() => {
      onSendQr();
    }, 100);
  }, [onSendQr, setIsCreating]);

  // Ledger

  // const handleSendLedger = useCallback(
  //   (onSignLedger: (ledgerState: LedgerState) => void) => {
  //     const callback = (data: V) => {
  //       handleCallbackResponseResultLedger(onSignLedger, data);
  //     };
  //
  //     handleSignLedger && handleSignLedger(params, callback).then(handleResponseError).catch(catchError);
  //   },
  //   [handleSignLedger, params, handleResponseError, catchError, handleCallbackResponseResultLedger],
  // );

  // const onSubmitLedger = useCallback(
  //   (handlerSignLedger: (ledgerState: LedgerState) => void) => {
  //     if (isBusy) {
  //       return;
  //     }
  //
  //     setBusy(true);
  //
  //     // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //     setTimeout(() => {
  //       const func = () => {
  //         handleSendLedger(handlerSignLedger);
  //       };
  //
  //       func();
  //     }, 100);
  //   },
  //   [handleSendLedger, isBusy, setBusy],
  // );

  const renderContent = useCallback(() => {
    switch (signMode) {
      case SIGN_MODE.QR:
        if (handleSignQr && network) {
          return <QrRequest network={network} handlerStart={onSubmitQr} baseProps={baseProps} />;
        }
        break;
      case SIGN_MODE.LEDGER:
        //   if (handleSignLedger) {
        //     return (
        //       <Wrapper>
        //         <ExternalContainer>
        //           <LedgerRequest
        //             account={account}
        //             genesisHash={network?.genesisHash || ''}
        //             handlerSignLedger={onSubmitLedger}>
        //             {children}
        //           </LedgerRequest>
        //         </ExternalContainer>
        //       </Wrapper>
        //     );
        //   } else {
        //     break;
        //   }
        break;
      case SIGN_MODE.UNKNOWN:
        break;
      case SIGN_MODE.PASSWORD:
        return <PasswordRequest handlerStart={onSubmitPassword} baseProps={baseProps} />;
    }

    return <UnknownRequest baseProps={baseProps} />;
  }, [baseProps, handleSignQr, network, onSubmitPassword, onSubmitQr, signMode]);

  useEffect(() => {
    cleanSigningState();

    return () => {
      cleanSigningState();
    };
  }, [cleanSigningState]);

  return <View style={style}>{renderContent()}</View>;
};

export default SigningRequest;
