import React, { useMemo, useRef } from 'react';
import { SubWalletModal } from 'components/Modal/Base/SubWalletModal';
import { ImageBackground, Linking, ScrollView, Share, StyleProp, TouchableOpacity, View } from 'react-native';
import { ColorMap } from 'styles/color';
import { IconButton } from 'components/IconButton';
import { FontMedium, FontSemiBold, STATUS_BAR_HEIGHT, sharedStyles } from 'styles/sharedStyles';
import reformatAddress, { getNetworkLogo, getScanExplorerAddressInfoUrl, toShort } from 'utils/index';
import { Copy, CopySimple, Export, GlobeHemisphereWest, Planet, Share as ShareIcon } from 'phosphor-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { BUTTON_ACTIVE_OPACITY, deviceHeight, TOAST_DURATION } from 'constants/index';
import Toast from 'react-native-toast-notifications';
import ToastContainer from 'react-native-toast-notifications';
import i18n from 'utils/i18n/i18n';
import {
  _getBlockExplorerFromChain,
  _getChainSubstrateAddressPrefix,
} from '@subwallet/extension-base/services/chain-service/utils';
import useFetchChainInfo from 'hooks/screen/useFetchChainInfo';
import { Button, Icon, QRCode, Typography } from 'components/design-system-ui';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { SubHeader } from 'components/SubHeader';
import { Images } from 'assets/index';
import Text from 'components/design-system-ui/typography/Text';

interface Props {
  modalVisible: boolean;
  address?: string;
  selectedNetwork?: string;
  onCancel: () => void;
}

const receiveModalContentWrapper: StyleProp<any> = {
  alignItems: 'center',
  width: '100%',
};

const receiveModalGuide: StyleProp<any> = {
  color: ColorMap.disabled,
  ...sharedStyles.mainText,
  ...FontSemiBold,
  paddingVertical: 16,
};

const receiveModalAddressWrapper: StyleProp<any> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 16,
  paddingVertical: 14,
  borderWidth: 2,
  height: 70,
  borderColor: ColorMap.dark2,
  backgroundColor: ColorMap.dark,
  borderRadius: 30,
  marginVertical: 5,
};

const receiveModalAddressText: StyleProp<any> = {
  color: ColorMap.disabled,
  ...sharedStyles.mainText,
  ...FontSemiBold,
  paddingLeft: 16,
};

const OFFSET_BOTTOM = deviceHeight - STATUS_BAR_HEIGHT - 140;
export const ReceiveModal = ({ address, selectedNetwork, modalVisible, onCancel }: Props) => {
  const theme = useSubWalletTheme().swThemes;
  const toastRef = useRef<ToastContainer>(null);
  let svg: { toDataURL: (arg0: (data: any) => void) => void };
  const chainInfo = useFetchChainInfo(selectedNetwork || '');

  const copyToClipboard = (text: string) => {
    return () => {
      Clipboard.setString(text);
      if (toastRef.current) {
        // @ts-ignore
        toastRef.current.hideAll();
        // @ts-ignore
        toastRef.current.show(i18n.common.copiedToClipboard);
      }
    };
  };

  const formattedAddress = useMemo(() => {
    if (chainInfo) {
      const isEvmChain = !!chainInfo.evmInfo;
      const networkPrefix = _getChainSubstrateAddressPrefix(chainInfo);

      return reformatAddress(address || '', networkPrefix, isEvmChain);
    } else {
      return address || '';
    }
  }, [address, chainInfo]);

  const scanExplorerAddressUrl = useMemo(() => {
    let route = '';
    const blockExplorer = selectedNetwork && _getBlockExplorerFromChain(chainInfo);

    if (blockExplorer && blockExplorer.includes('subscan.io')) {
      route = 'account';
    } else {
      route = 'address';
    }

    if (blockExplorer) {
      return `${blockExplorer}${route}/${formattedAddress}`;
    } else {
      return getScanExplorerAddressInfoUrl(selectedNetwork || '', formattedAddress);
    }
  }, [selectedNetwork, formattedAddress, chainInfo]);

  const onShareImg = () => {
    if (!chainInfo?.slug) {
      return;
    }

    svg.toDataURL(data => {
      const shareImageBase64 = {
        title: 'QR',
        message: `My Public Address to Receive ${chainInfo?.slug.toUpperCase()}: ${formattedAddress}`,
        url: `data:image/png;base64,${data}`,
      };
      Share.share(shareImageBase64);
    });
  };

  return (
    <>
      <SubWalletModal
        isFullHeight={true}
        modalVisible={modalVisible}
        onChangeModalVisible={onCancel}
        onModalHide={onCancel}>
        <View style={receiveModalContentWrapper}>
          <SubHeader
            title={i18n.title.receiveAsset}
            showLeftBtn={false}
            headerContainerStyle={{ marginBottom: '15%' }}
            onPressBack={onCancel}
          />
          {/* <Text style={receiveModalTitle}>{i18n.title.receiveAsset}</Text> */}
          <ImageBackground
            source={Images.radialBg1}
            imageStyle={{ borderRadius: 50 }}
            style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
            <QRCode qrRef={(ref?) => (svg = ref)} value={formattedAddress} errorLevel={'Q'} />
          </ImageBackground>

          <Text style={receiveModalGuide}>{i18n.common.receiveModalText}</Text>

          <View style={receiveModalAddressWrapper}>
            <TouchableOpacity
              //disabled={disableReselectButton}
              activeOpacity={BUTTON_ACTIVE_OPACITY}
              onPress={() => {
                onCancel();
                //openChangeNetworkModal();
              }}>
              {getNetworkLogo(chainInfo?.slug || '', 40)}
            </TouchableOpacity>

            <Text style={receiveModalAddressText}>{toShort(formattedAddress, 10, 10)}</Text>
            <TouchableOpacity onPress={copyToClipboard(formattedAddress)}>
              <ImageBackground
                source={Images.radialBg1}
                style={{ paddingHorizontal: 5, paddingVertical: 5 }}
                imageStyle={{ borderRadius: 15 }}>
                <Copy size={30} color={ColorMap.dark} />
              </ImageBackground>
            </TouchableOpacity>
            {/* <IconButton
       style={receiveModalCopyBtn}
       icon={CopySimple}
       color={ColorMap.disabled}
       onPress={() => copyToClipboard(formattedAddress)}
     /> */}
          </View>

          <View style={{ flexDirection: 'row', marginTop: '10%' }}>
            <View>
              <IconButton
                disabled={!scanExplorerAddressUrl}
                backgroundImg={true}
                icon={Planet}
                style={{
                  height: 60,
                  width: 60,
                }}
                size={30}
                onPress={() => {
                  scanExplorerAddressUrl && Linking.openURL(scanExplorerAddressUrl);
                }}
              />
              <Text style={{ textAlign: 'center', marginTop: 10 }}>{i18n.common.explorer}</Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <IconButton
                backgroundImg={true}
                icon={Export}
                style={{
                  height: 60,
                  width: 60,
                }}
                size={30}
                onPress={onShareImg}
              />
              <Text style={{ textAlign: 'center', marginTop: 10 }}>{i18n.common.share}</Text>
            </View>
            {/* <SubmitButton
       disabled={!isSupportScanExplorer}
       disabledColor={ColorMap.buttonOverlayButtonColor}
       title={i18n.common.explorer}
       backgroundColor={ColorMap.dark2}
       style={receiveModalExplorerBtnStyle(!isSupportScanExplorer ? 'rgba(255, 255, 255, 0.5)' : ColorMap.light)}
       onPress={() => {
         isSupportScanExplorer && Linking.openURL(scanExplorerAddressUrl);
       }}
     /> */}
            {/* <SubmitButton style={{ flex: 1, marginLeft: 8 }} title={i18n.common.share} onPress={onShareImg} /> */}
          </View>
        </View>
        {
          <Toast
            duration={TOAST_DURATION}
            normalColor={ColorMap.notification}
            ref={toastRef}
            placement={'bottom'}
            offsetBottom={OFFSET_BOTTOM}
          />
        }
      </SubWalletModal>
    </>
  );
};
