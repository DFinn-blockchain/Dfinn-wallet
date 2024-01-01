import Input, { InputProps } from 'components/design-system-ui/input';
import React, { ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { isAddress } from '@polkadot/util-crypto';
import { Avatar, Button, Icon, Typography } from 'components/design-system-ui';
import reformatAddress, { toShort } from 'utils/index';
import { Book, Scan } from 'phosphor-react-native';
import { AddressBookModal } from 'components/Modal/AddressBook/AddressBookModal';
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import { TextInputFocusEventData } from 'react-native/Libraries/Components/TextInput/TextInput';
import { AddressScanner, AddressScannerProps } from 'components/Scanner/AddressScanner';
import { saveRecentAccountId, resolveAddressToDomain, resolveDomainToAddress } from 'messaging/index';
import { requestCameraPermission } from 'utils/permission/camera';
import { RESULTS } from 'react-native-permissions';
import createStylesheet from './style/InputAddress';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { findContactByAddress } from 'utils/account';
import i18n from 'utils/i18n/i18n';
import { setAdjustResize } from 'rn-android-keyboard-adjust';

interface Props extends InputProps {
  chain?: string;
  reValidate?: () => void;
  isValidValue?: boolean;
  showAvatar?: boolean;
  showAddressBook?: boolean;
  networkGenesisHash?: string;
  addressPrefix?: number;
  saveAddress?: boolean;
  scannerProps?: Omit<
    AddressScannerProps,
    'onChangeAddress' | 'onPressCancel' | 'qrModalVisible' | 'setQrModalVisible'
  >;
  onSideEffectChange?: () => void; // callback for address book or scan QR
}

const Component = (
  {
    chain,
    isValidValue,
    showAvatar = true,
    showAddressBook,
    networkGenesisHash,
    addressPrefix,
    scannerProps = {},
    saveAddress = true,
    value = '',
    reValidate,
    onSideEffectChange,
    ...inputProps
  }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref: ForwardedRef<TextInput>,
) => {
  const TZERO_ID_SUFFIX = '.tzero';

  const AZERO_ID_SUFFIX = '.azero';

  const CHAINS_SUPPORTED_DOMAIN = ['aleph', 'alephTest'];

  function isAzeroDomain(input: string) {
    return input.includes(AZERO_ID_SUFFIX) || input.includes(TZERO_ID_SUFFIX);
  }
  const theme = useSubWalletTheme().swThemes;
  const [domainName, setDomainName] = useState<string | undefined>(undefined);
  const [isInputBlur, setInputBlur] = useState<boolean>(true);
  const [isShowAddressBookModal, setShowAddressBookModal] = useState<boolean>(false);
  const [isShowQrModalVisible, setIsShowQrModalVisible] = useState<boolean>(false);
  const isAddressValid = isAddress(value) && (isValidValue !== undefined ? isValidValue : true);
  const { accounts, contacts } = useSelector((root: RootState) => root.accountState);
  const [error, setError] = useState<string | undefined>(undefined);
  const inputRef = useRef<TextInput | null>(null);

  const hasLabel = !!inputProps.label;
  const isInputVisible = !isAddressValid || !value || !isInputBlur;
  const stylesheet = createStylesheet(
    theme,
    isInputVisible,
    isAddressValid,
    hasLabel,
    inputProps.readonly,
    showAvatar,
    showAddressBook,
  );

  useEffect(() => setAdjustResize(), []);

  const onChangeInputText = useCallback(
    (rawText: string) => {
      const text = rawText.trim();

      if (inputProps.onChangeText) {
        inputProps.onChangeText(text);

        if (saveAddress && isAddress(text)) {
          saveRecentAccountId(text).catch(console.error);
        }
      }
    },
    [inputProps, saveAddress],
  );

  useEffect(() => {
    if (chain && value && CHAINS_SUPPORTED_DOMAIN.includes(chain)) {
      if (isAzeroDomain(value)) {
        resolveDomainToAddress({
          chain,
          domain: value,
        })
          .then(result => {
            if (result) {
              setDomainName(value);
              onChangeInputText(result);
              if (inputRef.current) {
                if (!inputRef.current.isFocused() && reValidate) {
                  reValidate();
                } else {
                  inputRef.current.blur();
                }
              }
            }
          })
          .catch(console.error);
      } else if (isAddress(value)) {
        resolveAddressToDomain({
          chain,
          address: value,
        })
          .then(result => {
            if (result) {
              setDomainName(result);
            }
          })
          .catch(console.error);
      }
    } else {
      setDomainName(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, onChangeInputText, value]);

  const _contacts = useMemo(() => [...accounts, ...contacts], [accounts, contacts]);

  const accountName = useMemo(() => {
    const account = findContactByAddress(_contacts, value);

    return account?.name;
  }, [_contacts, value]);

  const formattedAddress = useMemo((): string => {
    const _value = value || '';

    if (addressPrefix === undefined) {
      return _value;
    }

    try {
      return reformatAddress(_value, addressPrefix);
    } catch (e) {
      return _value;
    }
  }, [addressPrefix, value]);

  const LeftPart = useMemo(() => {
    return (
      <>
        {showAvatar && (
          <View style={stylesheet.avatarWrapper}>
            <Avatar value={value || ''} size={hasLabel ? 20 : 24} />
          </View>
        )}
        <Typography.Text ellipsis style={stylesheet.addressText}>
          {accountName || domainName || toShort(value, 9, 9)}
        </Typography.Text>
        {(accountName || domainName || addressPrefix !== undefined) && (
          <Typography.Text style={stylesheet.addressAliasText}>({toShort(formattedAddress, 4, 4)})</Typography.Text>
        )}
      </>
    );
  }, [
    accountName,
    addressPrefix,
    domainName,
    formattedAddress,
    hasLabel,
    showAvatar,
    stylesheet.addressAliasText,
    stylesheet.addressText,
    stylesheet.avatarWrapper,
    value,
  ]);

  const onPressQrButton = useCallback(async () => {
    Keyboard.dismiss();
    const result = await requestCameraPermission();

    if (result === RESULTS.GRANTED) {
      setTimeout(() => setIsShowQrModalVisible(true), 500);
    }
  }, []);

  const RightPart = useMemo(() => {
    return (
      <>
        {showAddressBook && (
          <Button
            disabled={inputProps.disabled || inputProps.readonly}
            size={'xs'}
            type={'ghost'}
            onPress={() => setShowAddressBookModal(true)}
            icon={
              <Icon
                phosphorIcon={Book}
                size={'sm'}
                iconColor={inputProps.readonly ? theme.colorTextLight5 : theme.colorTextLight3}
              />
            }
          />
        )}
        <Button
          style={stylesheet.scanButton}
          disabled={inputProps.disabled || inputProps.readonly}
          size={'xs'}
          type={'ghost'}
          onPress={onPressQrButton}
          icon={
            <Icon
              phosphorIcon={Scan}
              size={'sm'}
              iconColor={inputProps.readonly ? theme.colorTextLight5 : theme.colorTextLight3}
            />
          }
        />
      </>
    );
  }, [
    inputProps.disabled,
    inputProps.readonly,
    onPressQrButton,
    showAddressBook,
    stylesheet.scanButton,
    theme.colorTextLight3,
    theme.colorTextLight5,
  ]);

  const onScanInputText = useCallback(
    (data: string) => {
      if (isAddress(data)) {
        setError(undefined);
        setIsShowQrModalVisible(false);
        onChangeInputText(data);
        onSideEffectChange?.();
      } else {
        setError(i18n.errorMessage.isNotAnAddress);
      }
    },
    [onChangeInputText, onSideEffectChange],
  );

  const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputBlur(false);
    inputProps.onFocus && inputProps.onFocus(e);
  };

  const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setInputBlur(true);
    inputProps.onBlur && inputProps.onBlur(e);
  };

  const onSelectAddressBook = useCallback(
    (_value: string) => {
      onChangeInputText(_value);
      onSideEffectChange?.();
    },
    [onChangeInputText, onSideEffectChange],
  );

  const closeAddressScanner = useCallback(() => {
    setError(undefined);
    setIsShowQrModalVisible(false);
  }, []);

  return (
    <>
      <Input
        ref={myRef => {
          inputRef.current = myRef;
          // @ts-ignored
          ref = inputRef.current;
        }}
        {...inputProps}
        leftPart={LeftPart}
        leftPartStyle={stylesheet.inputLeftPart}
        rightPart={RightPart}
        isError={!isAddressValid}
        onChangeText={onChangeInputText}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        inputStyle={stylesheet.input}
        value={value}
      />

      <AddressScanner
        {...scannerProps}
        qrModalVisible={isShowQrModalVisible}
        onPressCancel={closeAddressScanner}
        onChangeAddress={onScanInputText}
        isShowError
        error={error}
        setQrModalVisible={setIsShowQrModalVisible}
      />

      {showAddressBook && (
        <AddressBookModal
          addressPrefix={addressPrefix}
          modalVisible={isShowAddressBookModal}
          networkGenesisHash={networkGenesisHash}
          onSelect={onSelectAddressBook}
          value={value}
          setVisible={setShowAddressBookModal}
        />
      )}
    </>
  );
};

export const InputAddress = forwardRef(Component);
