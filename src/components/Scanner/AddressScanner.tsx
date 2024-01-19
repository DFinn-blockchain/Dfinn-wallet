import React, { useRef } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import { SwFullSizeModal } from 'components/design-system-ui';
import { SWModalRefProps } from 'components/design-system-ui/modal/ModalBaseV2';
import QrAddressScanner from './QrAddressScanner';
import { SCAN_TYPE } from 'constants/qr';

export interface AddressScannerProps {
  onPressCancel: () => void;
  onChangeAddress: (data: string) => void;
  qrModalVisible: boolean;
  setQrModalVisible: (value: boolean) => void;
  error?: string;
  isShowError?: boolean;
}

export const AddressScanner = ({
  onPressCancel,
  onChangeAddress,
  qrModalVisible,
  setQrModalVisible,
  error,
  isShowError = false,
}: AddressScannerProps) => {
  const addressScannerRef = useRef<SWModalRefProps>(null);
  const onSuccess = (e: BarCodeReadEvent) => {
    try {
      onChangeAddress(e.data);
      !isShowError && onPressCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const onPressLibraryBtn = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    RNQRGenerator.detect({
      uri: result.assets && result.assets[0]?.uri,
    })
      .then(response => {
        onChangeAddress(response.values[0]);
        !isShowError && onPressCancel();
      })
      .catch(err => console.log(err));
  };

  return (
    // <SwFullSizeModal
    //   //isUseModalV2
    //   modalVisible={qrModalVisible}
    //   setVisible={setQrModalVisible}
    //   modalBaseV2Ref={addressScannerRef}>
    <QrAddressScanner
      visible={qrModalVisible}
      onHideModal={onPressCancel}
      onPressLibraryBtn={onPressLibraryBtn}
      onSuccess={onSuccess}
      error={error}
      isUseSuccess={true}
      title={'Scan WalletConnect QR'}
      type={SCAN_TYPE.SECRET}
    />
    // </SwFullSizeModal>
  );
};
