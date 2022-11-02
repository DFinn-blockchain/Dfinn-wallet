import SelectAttachAccountModal from 'components/Modal/SelectAttachAccountModal';
import QrAddressScanner from 'components/Scanner/QrAddressScanner';
import { SCAN_TYPE } from 'constants/qr';
import useModalScanner from 'hooks/scanner/useModalScanner';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleProp, TouchableOpacity, View } from 'react-native';
import { SubScreenContainer } from 'components/SubScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { Account } from 'components/Account';
import { RESULTS } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { IconButton } from 'components/IconButton';
import {
  Article,
  DotsThree,
  FileArrowUp,
  LockKey,
  Plus,
  UserCirclePlus,
  QrCode,
  Download,
} from 'phosphor-react-native';
import { Warning } from 'components/Warning';
import { SubmitButton } from 'components/SubmitButton';
import { ColorMap } from 'styles/color';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import { QrAccount } from 'types/account/qr';
import i18n from 'utils/i18n/i18n';
import { SelectImportAccountModal } from 'components/Modal/SelectImportAccountModal';
import { AccountActionType } from 'types/ui-types';
import { MarginBottomForSubmitButton } from 'styles/sharedStyles';
import { SelectAccountTypeModal } from 'components/Modal/SelectAccountTypeModal';
import { EVM_ACCOUNT_TYPE, HIDE_MODAL_DURATION, SUBSTRATE_ACCOUNT_TYPE } from 'constants/index';
import { requestCameraPermission } from 'utils/validators';
import { updateCurrentAccountAddress } from '../messaging';
import { updateAccountsWaitingStatus } from 'stores/updater';
import { isAccountAll } from '@subwallet/extension-koni-base/utils';
import { Divider } from 'components/Divider';

const accountsWrapper: StyleProp<any> = {
  flex: 1,
};
const accountItemContainer: StyleProp<any> = {
  paddingHorizontal: 16,
};

export const AccountsScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const currentAccountAddress = useSelector((state: RootState) => state.accounts.currentAccountAddress);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<keyof RootStackParamList | null>(null);
  const [selectTypeModalVisible, setSelectTypeModalVisible] = useState<boolean>(false);
  const [attachModalVisible, setAttachModalVisible] = useState<boolean>(false);

  const onSuccess = useCallback(
    (qrAccount: QrAccount) => {
      navigation.navigate('AttachAccount', { screen: 'ImportAccountQrConfirm', params: qrAccount });
    },
    [navigation],
  );

  const { onOpenModal, onScan, isScanning, onHideModal } = useModalScanner(onSuccess);

  const SECRET_TYPE = useMemo(
    (): AccountActionType[] => [
      {
        icon: UserCirclePlus,
        title: i18n.common.createWalletName,
        onCLickButton: () => {
          setSelectedAction('CreateAccount');
          setModalVisible(false);
          setTimeout(() => {
            setSelectTypeModalVisible(true);
          }, HIDE_MODAL_DURATION);
        },
      },
      {
        icon: Article,
        title: i18n.title.importBySecretPhrase,
        onCLickButton: () => {
          setSelectedAction('ImportSecretPhrase');
          setModalVisible(false);
          setTimeout(() => {
            setSelectTypeModalVisible(true);
          }, HIDE_MODAL_DURATION);
        },
      },
      {
        icon: LockKey,
        title: i18n.title.importByPrivateKey,
        onCLickButton: () => {
          navigation.navigate('ImportPrivateKey');
          setModalVisible(false);
        },
      },
      {
        icon: FileArrowUp,
        title: i18n.title.importFromJson,
        onCLickButton: () => {
          navigation.navigate('RestoreJson');
          setModalVisible(false);
        },
      },
      {
        icon: QrCode,
        title: i18n.title.importByQrCode,
        onCLickButton: async () => {
          const result = await requestCameraPermission();

          if (result === RESULTS.GRANTED) {
            setModalVisible(false);
            setTimeout(() => {
              onOpenModal();
            }, HIDE_MODAL_DURATION);
          }
        },
      },
      {
        icon: Download,
        title: i18n.title.attachAccount,
        onCLickButton: async () => {
          setModalVisible(false);
          setTimeout(() => {
            setAttachModalVisible(true);
          }, HIDE_MODAL_DURATION);
        },
      },
    ],
    [navigation, onOpenModal],
  );

  const onSelectSubstrateAccount = () => {
    setSelectTypeModalVisible(false);
    !!selectedAction && navigation.navigate(selectedAction, { keyTypes: SUBSTRATE_ACCOUNT_TYPE });
  };

  const onSelectEvmAccount = () => {
    setSelectTypeModalVisible(false);
    !!selectedAction && navigation.navigate(selectedAction, { keyTypes: EVM_ACCOUNT_TYPE });
  };

  const renderListEmptyComponent = () => {
    return <Warning title={i18n.warningTitle.warning} message={i18n.warningMessage.noAccountText} isDanger={false} />;
  };

  const selectAccount = useCallback(
    (accAddress: string) => {
      if (currentAccountAddress !== accAddress) {
        updateAccountsWaitingStatus(true);
        updateCurrentAccountAddress(accAddress).catch(console.error);
      }

      if (navigation.getState()?.routes.length >= 3) {
        // back to previous 3rd screen
        navigation.pop(2);
      } else {
        navigation.navigate('Home');
      }
    },
    [navigation, currentAccountAddress],
  );

  // @ts-ignore
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={accountItemContainer} onPress={() => selectAccount(item.address)}>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
          <Account
            key={item.address}
            name={item.name || ''}
            address={item.address}
            showCopyBtn={false}
            selectAccount={() => {
              selectAccount(item.address);
            }}
            isSelected={currentAccountAddress === item.address}
          />

          {!isAccountAll(item.address) && (
            <IconButton
              icon={DotsThree}
              color={ColorMap.disabled}
              onPress={() => {
                navigation.navigate('EditAccount', { address: item.address, name: item.name });
              }}
            />
          )}
        </View>
        <Divider style={{ paddingLeft: 56 }} color={ColorMap.dark2} />
      </TouchableOpacity>
    );
  };

  const onCreateAccount = () => {
    setModalVisible(true);
  };

  const renderFooterComponent = () => {
    return (
      <View style={{ paddingHorizontal: 16, ...MarginBottomForSubmitButton, marginTop: 16 }}>
        <SubmitButton
          backgroundColor={ColorMap.dark2}
          title={i18n.common.addOrConnectAccount}
          onPress={onCreateAccount}
        />
      </View>
    );
  };

  const onHideAttachModal = useCallback(() => {
    setAttachModalVisible(false);
  }, []);

  return (
    <SubScreenContainer
      navigation={navigation}
      title={i18n.title.accounts}
      rightIcon={Plus}
      onPressRightIcon={onCreateAccount}>
      <View style={accountsWrapper}>
        <FlatList
          style={{ flex: 1 }}
          keyboardShouldPersistTaps={'handled'}
          data={accounts}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
          keyExtractor={item => item.address}
        />
        {renderFooterComponent()}

        <SelectImportAccountModal
          modalTitle={i18n.common.connectYourAccount}
          secretTypeList={SECRET_TYPE}
          modalVisible={modalVisible}
          onChangeModalVisible={() => setModalVisible(false)}
        />

        <SelectAccountTypeModal
          modalVisible={selectTypeModalVisible}
          onChangeModalVisible={() => setSelectTypeModalVisible(false)}
          onSelectSubstrateAccount={onSelectSubstrateAccount}
          onSelectEvmAccount={onSelectEvmAccount}
        />
        <SelectAttachAccountModal
          modalVisible={attachModalVisible}
          setModalVisible={setAttachModalVisible}
          onModalHide={onHideAttachModal}
        />
        <QrAddressScanner visible={isScanning} onHideModal={onHideModal} onSuccess={onScan} type={SCAN_TYPE.SECRET} />
      </View>
    </SubScreenContainer>
  );
};
