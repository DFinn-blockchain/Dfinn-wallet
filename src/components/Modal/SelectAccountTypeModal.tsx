import React from 'react';
import { SubWalletModal } from 'components/Modal/Base/SubWalletModal';
import { Image, StyleProp, View } from 'react-native';
import Text from '../Text';
import { TitleFont } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import { SecretTypeItem } from 'components/SecretTypeItem';
import i18n from 'utils/i18n/i18n';
import { AccountActionType } from 'types/ui-types';
import { NewLogosMap } from 'assets/new_logo';

interface Props {
  modalVisible: boolean;
  onChangeModalVisible: () => void;
  onModalHide?: () => void;
  onSelectSubstrateAccount: () => void;
  onSelectEvmAccount: () => void;
}

const modalTitle: StyleProp<any> = {
  ...TitleFont,
  color: ColorMap.light,
  paddingBottom: 16,
  textAlign: 'center',
};

export const SelectAccountTypeModal = ({
  modalVisible,
  onChangeModalVisible,
  onModalHide,
  onSelectSubstrateAccount,
  onSelectEvmAccount,
}: Props) => {
  const ACCOUNT_TYPE: AccountActionType[] = [
    {
      icon: () => <Image source={NewLogosMap.substrate} style={{ width: 40, height: 40, borderRadius: 10 }} />,
      title: i18n.common.substrateAccount,
      onCLickButton: onSelectSubstrateAccount,
    },
    {
      icon: () => <Image source={NewLogosMap.evm} style={{ width: 40, height: 40, borderRadius: 10 }} />,
      title: i18n.common.evmAccount,
      onCLickButton: onSelectEvmAccount,
    },
  ];

  return (
    <SubWalletModal modalVisible={modalVisible} onModalHide={onModalHide} onChangeModalVisible={onChangeModalVisible}>
      <View style={{ width: '100%' }}>
        <Text style={modalTitle}>{i18n.title.selectAccountType}</Text>
        {ACCOUNT_TYPE.map(item => (
          <SecretTypeItem key={item.title} title={item.title} icon={item.icon} onClickButton={item.onCLickButton} />
        ))}
      </View>
    </SubWalletModal>
  );
};
