import { useNavigation } from '@react-navigation/native';
import { Images, SVGImages } from 'assets/index';
import { SelectAccountTypeModal } from 'components/Modal/SelectAccountTypeModal';
import { SelectImportAccountModal } from 'components/Modal/SelectImportAccountModal';
import QrAddressScanner from 'components/Scanner/QrAddressScanner';
import { SubmitButton } from 'components/SubmitButton';
import { EVM_ACCOUNT_TYPE, HIDE_MODAL_DURATION, SUBSTRATE_ACCOUNT_TYPE } from 'constants/index';
import { SCAN_TYPE } from 'constants/qr';
import useModalScanner from 'hooks/qr/useModalScanner';
import {
  ArchiveTray,
  ArrowRight,
  Article,
  Eye,
  FileArrowUp,
  HardDrives,
  LockKey,
  QrCode,
  UserCirclePlus,
} from 'phosphor-react-native';
import React, { Suspense, useCallback, useMemo, useRef, useState } from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { RESULTS } from 'react-native-permissions';
import ToastContainer from 'react-native-toast-notifications';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import { ColorMap } from 'styles/color';
import {
  FontBold,
  FontMedium,
  FontSize4,
  FontSize5,
  sharedStyles,
  STATUS_BAR_LIGHT_CONTENT,
  TitleFont,
} from 'styles/sharedStyles';
import { QrAccount } from 'types/qr/attach';
import i18n from 'utils/i18n/i18n';
import { requestCameraPermission } from 'utils/permission/camera';
import Text from 'components/Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GradientButton from 'components/GradientButton';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';

const imageBackgroundStyle: StyleProp<any> = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingBottom: Platform.OS === 'ios' ? 56 : 20,
  position: 'relative',
};

const logoStyle: StyleProp<any> = {
  width: '100%',
  flex: 1,
  justifyContent: 'flex-end',
  position: 'relative',
  alignItems: 'center',
};

const firstScreenNotificationStyle: StyleProp<any> = {
  color: ColorMap.light,
  textAlign: 'center',
  paddingHorizontal: 16,
  paddingTop: 0,
};

const buttonStyle: StyleProp<ViewStyle> = {
  marginBottom: 16,
  width: '100%',
};

const gradientButtonStyle: ViewStyle = {
  height: 70,
  width: 70,
  borderRadius: 40,
};

const subHeaderTextStyle: StyleProp<TextStyle> = {
  ...TitleFont,
  ...FontSize5,
  color: ColorMap.light,
  marginTop: '20%',
  marginLeft: 20,
};

export const FirstScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const [importSelectModalVisible, setSelectModalVisible] = useState<boolean>(false);
  const [selectTypeModalVisible, setSelectTypeModalVisible] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<keyof RootStackParamList | null>(null);
  const [scanType, setScanType] = useState<SCAN_TYPE.QR_SIGNER | SCAN_TYPE.SECRET>(SCAN_TYPE.SECRET);
  const { accounts, hasMasterPassword } = useSelector((state: RootState) => state.accountState);

  const onSuccess = useCallback(
    (data: QrAccount) => {
      switch (scanType) {
        case SCAN_TYPE.QR_SIGNER:
          navigation.navigate('AttachAccount', {
            screen: 'AttachQrSignerConfirm',
            params: data,
          });
          break;
        case SCAN_TYPE.SECRET:
          navigation.navigate('AttachAccount', {
            screen: 'ImportAccountQrConfirm',
            params: data,
          });
          break;
        default:
          break;
      }
    },
    [navigation, scanType],
  );

  const { onOpenModal, onScan, isScanning, onHideModal } = useModalScanner(onSuccess);
  const toastRef = useRef<ToastContainer>(null);
  const show = useCallback((text: string) => {
    if (toastRef.current) {
      // @ts-ignore
      toastRef.current.hideAll();
      // @ts-ignore
      toastRef.current.show(text);
    }
  }, []);
  const SECRET_TYPE = useMemo(
    () => [
      {
        title: i18n.common.importAccount,
        data: [
          {
            icon: Article,
            title: i18n.title.importBySecretPhrase,
            onCLickButton: () => {
              setSelectModalVisible(false);
              if (hasMasterPassword) {
                navigation.navigate('ImportSecretPhrase');
              } else {
                navigation.navigate('CreatePassword', { pathName: 'ImportSecretPhrase' });
              }
            },
          },
          {
            icon: LockKey,
            title: i18n.title.importByPrivateKey,
            onCLickButton: () => {
              if (hasMasterPassword) {
                navigation.navigate('ImportPrivateKey');
              } else {
                navigation.navigate('CreatePassword', { pathName: 'ImportPrivateKey' });
              }
              setSelectModalVisible(false);
            },
          },
          {
            icon: FileArrowUp,
            title: i18n.title.importFromJson,
            onCLickButton: () => {
              if (hasMasterPassword) {
                navigation.navigate('RestoreJson');
              } else {
                navigation.navigate('CreatePassword', { pathName: 'RestoreJson' });
              }
              setSelectModalVisible(false);
            },
          },
          {
            icon: QrCode,
            title: i18n.title.importByQrCode,
            onCLickButton: async () => {
              // const result = await requestCameraPermission();

              // if (result === RESULTS.GRANTED) {
              //   setScanType(SCAN_TYPE.SECRET);
              //   setSelectModalVisible(false);
              //   setTimeout(() => {
              //     onOpenModal();
              //   }, HIDE_MODAL_DURATION);
              // }
              if (hasMasterPassword) {
                navigation.navigate('ImportQrCode');
              } else {
                navigation.navigate('CreatePassword', { pathName: 'ImportQrCode' });
              }
              setSelectModalVisible(false);
            },
          },
        ],
      },
      {
        title: i18n.common.attachAccount,
        data: [
          {
            icon: Eye,
            title: i18n.title.attachReadonlyAccount,
            onCLickButton: () => {
              setTimeout(() => {
                if (hasMasterPassword) {
                  navigation.navigate('AttachReadOnly');
                } else {
                  navigation.navigate('CreatePassword', { pathName: 'AttachReadOnly' });
                }
              }, 200);
              setSelectModalVisible(false);
            },
          },
          {
            icon: QrCode,
            title: i18n.title.attachQRSignerAccount,
            onCLickButton: async () => {
              // const result = await requestCameraPermission();

              // if (result === RESULTS.GRANTED) {
              //   setScanType(SCAN_TYPE.QR_SIGNER);
              //   setSelectModalVisible(false);
              //   setTimeout(() => {
              //     onOpenModal();
              //   }, HIDE_MODAL_DURATION);
              // }
              if (hasMasterPassword) {
                navigation.navigate('ConnectParitySigner');
              } else {
                navigation.navigate('CreatePassword', { pathName: 'ConnectParitySigner' });
              }
              setSelectModalVisible(false);
            },
          },
          {
            icon: HardDrives,
            title: i18n.title.connectLedgerDevice,
            onCLickButton: () => {
              show(i18n.common.comingSoon);
            },
          },
        ],
      },
    ],
    [navigation, onOpenModal, show, hasMasterPassword],
  );

  const onSelectSubstrateAccount = useCallback(() => {
    setSelectTypeModalVisible(false);
    !!selectedAction && navigation.navigate(selectedAction, { keyTypes: SUBSTRATE_ACCOUNT_TYPE });
  }, [navigation, selectedAction]);

  const onSelectEvmAccount = useCallback(() => {
    setSelectTypeModalVisible(false);
    !!selectedAction && navigation.navigate(selectedAction, { keyTypes: EVM_ACCOUNT_TYPE });
  }, [navigation, selectedAction]);

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <StatusBar barStyle={STATUS_BAR_LIGHT_CONTENT} translucent={true} backgroundColor={'transparent'} />
      {/* <ImageBackground source={Images.loadingScreen} resizeMode={'cover'} style={imageBackgroundStyle}> */}
      <SafeAreaView />

      <Text style={subHeaderTextStyle}>{i18n.common.welcomeSafe}</Text>
      <View style={logoStyle}>
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 16 }}>
          <Suspense fallback={<View style={{ width: 300, height: 300 }} />}>
            <SVGImages.FirstPageImg width={300} height={300} />
          </Suspense>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginBottom: '10%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectModalVisible(true);
            }}>
            <Text
              style={{
                color: ColorMap.disabledTextColor,
                textDecorationLine: 'underline',
                textDecorationColor: ColorMap.disabled,
              }}>
              {i18n.common.importAlreadyAccount}
            </Text>
          </TouchableOpacity>

          <GradientButton
            viewStyle={gradientButtonStyle}
            onPress={() => {
              setSelectedAction('CreateAccount');
              setSelectTypeModalVisible(true);
            }}>
            <ArrowRight size={20} weight={'bold'} />
          </GradientButton>
        </View>
        {/* <SubmitButton
            leftIcon={UserCirclePlus}
            title={i18n.common.createNewWalletAccount}
            style={{ ...buttonStyle, marginTop: 48 }}
            onPress={() => {
              setSelectedAction('CreateAccount');
              setSelectTypeModalVisible(true);
            }}
          />

          <SubmitButton
            leftIcon={ArchiveTray}
            title={i18n.common.importAlreadyAccount}
            style={buttonStyle}
            backgroundColor={ColorMap.dark2}
            onPress={() => {
              setSelectModalVisible(true);
            }}
          /> */}
      </View>
      {/*//TODO: add hyperlink for T&C and Privacy Policy*/}
      {/* <Text style={firstScreenNotificationStyle}>{i18n.common.firstScreenMessagePart1}</Text>
      <Text style={firstScreenNotificationStyle}>{i18n.common.firstScreenMessagePart2}</Text> */}

      <SelectImportAccountModal
        modalTitle={i18n.common.selectYourImport}
        secretTypeList={SECRET_TYPE}
        modalVisible={importSelectModalVisible}
        toastRef={toastRef}
        onChangeModalVisible={() => setSelectModalVisible(false)}
      />

      <SelectAccountTypeModal
        modalVisible={selectTypeModalVisible}
        onChangeModalVisible={() => setSelectTypeModalVisible(false)}
        onSelectSubstrateAccount={onSelectSubstrateAccount}
        onSelectEvmAccount={onSelectEvmAccount}
      />

      <QrAddressScanner visible={isScanning} onHideModal={onHideModal} onSuccess={onScan} type={scanType} />
      <SafeAreaView />
      {/* </ImageBackground> */}
    </View>
  );
};
