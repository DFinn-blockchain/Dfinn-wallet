import React, { useEffect, useState } from 'react';
import { StyleProp, Text, View } from 'react-native';
import { ColorMap } from 'styles/color';
import { IconButton } from 'components/IconButton';
import { ArrowLeft, ArrowRight } from 'phosphor-react-native';
import useConfirmations from 'hooks/useConfirmations';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'types/routes';
import { AuthorizeConfirmation } from 'screens/Home/Browser/ConfirmationPopup/AuthorizeConfirmation';
import { AuthorizeRequest, MetadataRequest } from '@subwallet/extension-base/background/types';
import { MetadataConfirmation } from 'screens/Home/Browser/ConfirmationPopup/MetadataConfirmation';
import { EvmSignConfirmation } from 'screens/Home/Browser/ConfirmationPopup/EvmSignConfirmation';
import { ConfirmationsQueue } from '@subwallet/extension-base/background/KoniTypes';

const subWalletModalSeparator: StyleProp<any> = {
  width: 56,
  height: 4,
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
};

const confirmationPopupWrapper: StyleProp<any> = {
  height: '66%',
  width: '100%',
  backgroundColor: ColorMap.dark2,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  alignItems: 'center',
  paddingTop: 8,
  paddingHorizontal: 16,
};

const confirmationHeader: StyleProp<any> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  marginTop: 8,
  marginBottom: 16,
};

const authorizeIndexTextStyle: StyleProp<any> = { ...sharedStyles.mainText, ...FontMedium, color: ColorMap.light };

export const ConfirmationPopup = () => {
  const {
    confirmationItemsLength,
    isEmptyRequests,
    approveRequest,
    cancelRequest,
    rejectRequest,
    confirmationItems,
    isDisplayConfirmation,
  } = useConfirmations();
  const navigation = useNavigation<RootNavigationProps>();
  const [confirmationIndex, setConfirmationIndex] = useState<number>(0);
  const currentConfirmationItem = confirmationItems[confirmationIndex];

  const onPressPrevButton = () => {
    if (confirmationIndex > 0) {
      setConfirmationIndex(confirmationIndex - 1);
    }
  };

  const onPressNextButton = () => {
    if (confirmationIndex < confirmationItemsLength - 1) {
      setConfirmationIndex(confirmationIndex + 1);
    }
  };

  const renderConfirmation = () => {
    if (!currentConfirmationItem) {
      return null;
    }

    if (currentConfirmationItem.type === 'authorizeRequest') {
      return (
        <AuthorizeConfirmation
          payload={currentConfirmationItem.payload as AuthorizeRequest}
          approveRequest={approveRequest}
          cancelRequest={cancelRequest}
          rejectRequest={rejectRequest}
        />
      );
    } else if (currentConfirmationItem.type === 'metadataRequest') {
      return (
        <MetadataConfirmation
          payload={currentConfirmationItem.payload as MetadataRequest}
          approveRequest={approveRequest}
          cancelRequest={cancelRequest}
        />
      );
    } else if (currentConfirmationItem.type === 'evmSignatureRequest') {
      return (
        <EvmSignConfirmation
          payload={currentConfirmationItem.payload as ConfirmationsQueue['evmSignatureRequest'][0]}
          approveRequest={approveRequest}
          cancelRequest={cancelRequest}
        />
      );
    }

    return null;
  };

  useEffect(() => {
    if (!isDisplayConfirmation || isEmptyRequests) {
      navigation.canGoBack() && navigation.goBack();
    }
  }, [isEmptyRequests, isDisplayConfirmation, navigation]);

  useEffect(() => {
    if (confirmationIndex && (confirmationIndex < 0 || confirmationIndex > confirmationItemsLength - 1)) {
      setConfirmationIndex(0);
    }
  }, [confirmationIndex, confirmationItemsLength]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
      <View style={confirmationPopupWrapper}>
        <View style={subWalletModalSeparator} />
        <View style={confirmationHeader}>
          <IconButton icon={ArrowLeft} color={ColorMap.disabled} onPress={onPressPrevButton} />
          <Text style={authorizeIndexTextStyle}>
            <Text>{confirmationIndex + 1}</Text>/<Text>{confirmationItemsLength}</Text>
          </Text>
          <IconButton icon={ArrowRight} color={ColorMap.disabled} onPress={onPressNextButton} />
        </View>
        {renderConfirmation()}
      </View>
    </View>
  );
};
