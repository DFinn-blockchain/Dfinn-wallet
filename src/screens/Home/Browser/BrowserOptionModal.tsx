import { SubWalletModal } from 'components/Modal/Base/SubWalletModal';
import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Linking, StyleProp, Text, View } from 'react-native';
import { FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import { ArrowsOutSimple, Star, StarHalf } from 'phosphor-react-native';
import { SelectItem } from 'components/SelectItem';
import { getLeftSelectItemIcon } from 'utils/index';
import { SiteInfo } from 'stores/types';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { addBookmark, removeBookmark } from 'stores/updater';
import i18n from 'utils/i18n/i18n';

interface Props {
  visibleModal: boolean;
  onClose: () => void;
}

interface OptionType {
  key: string;
  icon: JSX.Element;
  label: string;
  onPress: () => void;
}

export interface BrowserOptionModalRef {
  onUpdateSiteInfo: (siteInfo: SiteInfo) => void;
}

const titleStyle: StyleProp<any> = {
  ...sharedStyles.mediumText,
  ...FontSemiBold,
  color: ColorMap.light,
  textAlign: 'center',
  paddingBottom: 16,
};

const Component = ({ visibleModal, onClose }: Props, ref: ForwardedRef<BrowserOptionModalRef>) => {
  const bookmarks = useSelector((state: RootState) => state.browser.bookmarks);

  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    url: '',
    name: '',
  });
  const isBookmarked = bookmarks.some(b => b.url === siteInfo.url);

  useImperativeHandle(ref, () => ({
    onUpdateSiteInfo: (_siteInfo: SiteInfo) => {
      setSiteInfo(_siteInfo);
    },
  }));

  const OPTIONS: OptionType[] = [
    {
      key: 'openInBrowser',
      icon: getLeftSelectItemIcon(ArrowsOutSimple),
      label: i18n.common.openInBrowser,
      onPress: () => {
        if (siteInfo.url) {
          Linking.canOpenURL(siteInfo.url).then(() => Linking.openURL(siteInfo.url));
        }

        onClose();
      },
    },
    {
      key: 'toggleFavouriteSite',
      icon: getLeftSelectItemIcon(isBookmarked ? StarHalf : Star),
      label: isBookmarked ? i18n.common.removeFromFavourites : i18n.common.addToFavourites,
      onPress: () => {
        if (isBookmarked) {
          removeBookmark(siteInfo);
        } else {
          addBookmark(siteInfo);
        }
        onClose();
      },
    },
  ];

  return (
    <SubWalletModal modalVisible={visibleModal} onChangeModalVisible={onClose}>
      <View style={{ width: '100%' }}>
        <Text style={titleStyle}>More options</Text>
        {OPTIONS.map(opt => (
          <SelectItem key={opt.key} isSelected={false} label={opt.label} leftIcon={opt.icon} onPress={opt.onPress} />
        ))}
      </View>
    </SubWalletModal>
  );
};

export const BrowserOptionModal = forwardRef(Component);
