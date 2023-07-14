// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageLogosMap } from 'assets/logo';
import { UnlockModal } from 'components/common/Modal/UnlockModal';
import { ContainerWithSubHeader } from 'components/ContainerWithSubHeader';
import { Button, Icon, Image } from 'components/design-system-ui';
import { SWImageProps } from 'components/design-system-ui/image';
import DualLogo from 'components/Logo/DualLogo';
import QrAddressScanner from 'components/Scanner/QrAddressScanner';
import { SCAN_TYPE } from 'constants/qr';
import useUnlockModal from 'hooks/modal/useUnlockModal';
import useModalScanner from 'hooks/qr/useModalScanner';
import useGoHome from 'hooks/screen/useGoHome';
import useGetDefaultAccountName from 'hooks/useGetDefaultAccountName';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { checkPublicAndPrivateKey, createAccountWithSecret } from 'messaging/index';
import { QrCode, Scan } from 'phosphor-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { RootStackParamList } from 'routes/index';
import { QrAccount } from 'types/qr/attach';
import { backToHome } from 'utils/navigation';
import createStyle from './styles';
import { Images } from 'assets/index';
import { SubmitButton } from '../../../components/SubmitButton';

type Props = {};

const checkAccount = (qrAccount: QrAccount): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    checkPublicAndPrivateKey(qrAccount.genesisHash, qrAccount.content)
      .then(({ isEthereum, isValid }) => {
        if (isValid) {
          resolve(isEthereum);
        } else {
          reject(new Error('Invalid qr'));
        }
      })
      .catch((e: Error) => {
        reject(e);
      });
  });
};

const imageProps: Omit<SWImageProps, 'src'> = {
  squircleSize: 56,
  style: { width: 56, height: 56 },
  resizeMode: 'contain',
};

const ImportQrCode: React.FC<Props> = (props: Props) => {
  const {} = props;
  const goHome = useGoHome();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useSubWalletTheme().swThemes;
  const toast = useToast();

  const accountName = useGetDefaultAccountName();

  const styles = useMemo(() => createStyle(theme), [theme]);

  const onComplete = useCallback(() => {
    backToHome(goHome, true);
  }, [goHome]);

  const onBack = navigation.goBack;

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    (_account: QrAccount) => {
      setLoading(true);

      setTimeout(() => {
        checkAccount(_account)
          .then(isEthereum => {
            createAccountWithSecret({
              name: accountName,
              isAllow: true,
              secretKey: _account.content,
              publicKey: _account.genesisHash,
              isEthereum: isEthereum,
            })
              .then(({ errors, success }) => {
                if (success) {
                  onComplete();
                } else {
                  toast.show(errors[0].message);
                }
              })
              .catch((error: Error) => {
                toast.show(error.message);
              })
              .finally(() => {
                setLoading(false);
              });
          })
          .catch((error: Error) => {
            toast.show(error.message);
            setLoading(false);
          });
      }, 300);
    },
    [accountName, onComplete, toast],
  );

  const { onOpenModal, onScan, isScanning, onHideModal } = useModalScanner(onSubmit);
  const {
    visible: unlockVisible,
    onPasswordComplete,
    onPress: onPressSubmit,
    onHideModal: onHidePasswordModal,
  } = useUnlockModal();

  return (
    <ContainerWithSubHeader title="Import your wallet by QR" onPressBack={onBack}>
      <View style={styles.body}>
        <Text style={styles.subTitle}>
          Please make sure that you have granted Dfinn Wallet the access to your device's camera.
        </Text>
        <View>
          <DualLogo
            leftLogo={<Image {...imageProps} src={Images.subwalletDappLogo} />}
            linkIcon={<Icon phosphorIcon={Scan} size="md" />}
            rightLogo={<Image {...imageProps} src={ImageLogosMap.__qr_code__} />}
          />
        </View>
        <View>
          <Text style={styles.description}>
            Click the "Scan the QR code" button, or read this instruction for more details.
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <SubmitButton
          leftIcon={QrCode}
          isBusy={loading}
          onPress={onPressSubmit(onOpenModal)}
          title={loading ? 'Creating' : 'Scan the QR code'}
        />
        {/* <Button
          icon={<Icon phosphorIcon={QrCode} weight="fill" />}
          onPress={onPressSubmit(onOpenModal)}
          loading={loading}
          disabled={loading}>
          {loading ? 'Creating' : 'Scan the QR code'}
        </Button> */}
      </View>
      <QrAddressScanner visible={isScanning} onHideModal={onHideModal} onSuccess={onScan} type={SCAN_TYPE.SECRET} />
      <UnlockModal onPasswordComplete={onPasswordComplete} visible={unlockVisible} onHideModal={onHidePasswordModal} />
    </ContainerWithSubHeader>
  );
};

export default ImportQrCode;
