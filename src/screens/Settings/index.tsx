import React, { useCallback, useMemo, useState } from 'react';
import { SubScreenContainer } from 'components/SubScreenContainer';
import { useNavigation } from '@react-navigation/native';
import { Linking, ScrollView, StyleProp, ViewStyle } from 'react-native';
import Text from 'components/Text';
import { ActionItem } from 'components/ActionItem';
import {
  BookBookmark,
  Coin,
  FileText,
  GitFork,
  Globe,
  IconProps,
  LockKeyOpen,
  ShieldCheck,
  User,
} from 'phosphor-react-native';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { RootNavigationProps } from 'routes/index';
import i18n from 'utils/i18n/i18n';
import { PRIVACY_AND_POLICY_URL, TERMS_OF_SERVICE_URL, WEBSITE_URL } from 'constants/index';
import { useToast } from 'react-native-toast-notifications';
import VersionNumber from 'react-native-version-number';
import useAppLock from 'hooks/useAppLock';

const settingTitleStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  color: ColorMap.disabled,
  ...FontMedium,
  paddingVertical: 12,
};

const versionAppStyle: StyleProp<any> = {
  textAlign: 'center',
  color: ColorMap.light,
  ...FontMedium,
  ...sharedStyles.mainText,
};

const settingRowStyle: ViewStyle = {
  marginVertical: 2,
  borderStyle: 'dotted',
  borderWidth: 1,
  borderBottomColor: ColorMap.dark2,
};

type settingItemType = {
  icon: ({ weight, color, size, style, mirrored }: IconProps) => JSX.Element;
  title: string;
  hasRightArrow: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export const Settings = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const toast = useToast();
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  const pinCodeEnabled = useSelector((state: RootState) => state.mobileSettings.pinCodeEnabled);
  const { lock } = useAppLock();
  const onPressComingSoonFeature = useCallback(() => {
    toast.hideAll();
    toast.show('Coming Soon');
  }, [toast]);
  const [hiddenCount, setHiddenCount] = useState(0);

  const settingList: settingItemType[][] = useMemo(
    () => [
      [
        {
          icon: ShieldCheck,
          title: 'Security',
          hasRightArrow: true,
          onPress: () => navigation.navigate('Security'),
        },
        {
          icon: BookBookmark,
          title: 'Manage Address Book',
          onPress: () => navigation.navigate('ManageAddressBook'),
          hasRightArrow: true,
        },
        // {
        //   icon: GlobeHemisphereWest,
        //   title: i18n.title.language,
        //   hasRightArrow: true,
        //   onPress: onPressComingSoonFeature,
        // },
        // {
        //   icon: BellRinging,
        //   title: i18n.settings.notifications,
        //   hasRightArrow: true,
        //   onPress: onPressComingSoonFeature,
        // },
      ],
      [
        {
          icon: GitFork,
          title: 'Networks',
          hasRightArrow: true,
          onPress: () => navigation.navigate('NetworksSetting'),
        },
        {
          icon: Coin,
          title: i18n.settings.manageTokens,
          hasRightArrow: true,
          onPress: () => navigation.navigate('CustomTokenSetting'),
        },
      ],
      // [
      //   {
      //     icon: TelegramLogo,
      //     title: i18n.settings.telegram,
      //     hasRightArrow: true,
      //     onPress: () => Linking.openURL(TELEGRAM_URL),
      //   },
      //   {
      //     icon: TwitterLogo,
      //     title: i18n.settings.twitter,
      //     hasRightArrow: true,
      //     onPress: () => Linking.openURL(TWITTER_URL),
      //   },
      //   {
      //     icon: DiscordLogo,
      //     title: i18n.settings.discord,
      //     hasRightArrow: true,
      //     onPress: () => Linking.openURL(DISCORD_URL),
      //   },
      // ],
      [
        {
          icon: Globe,
          title: i18n.settings.website,
          hasRightArrow: true,
          onPress: () => Linking.openURL(WEBSITE_URL),
        },
        // {
        //   icon: FileText,
        //   title: i18n.settings.documentation,
        //   hasRightArrow: true,
        //   onPress: () => Linking.openURL(WIKI_URL),
        // },
        {
          icon: FileText,
          title: i18n.settings.termOfService,
          hasRightArrow: true,
          onPress: () => Linking.openURL(TERMS_OF_SERVICE_URL),
        },
        {
          icon: FileText,
          title: i18n.settings.privacyPolicy,
          hasRightArrow: true,
          onPress: () => Linking.openURL(PRIVACY_AND_POLICY_URL),
        },
      ],
      [
        {
          icon: LockKeyOpen,
          title: i18n.settings.lock,
          hasRightArrow: true,
          onPress: lock,
          disabled: !pinCodeEnabled,
        },
      ],
    ],
    [lock, navigation, onPressComingSoonFeature, pinCodeEnabled],
  );

  const onPressVersionNumber = () => {
    if (hiddenCount > 9) {
      navigation.navigate('WebViewDebugger');
    }
    setHiddenCount(hiddenCount + 1);
  };

  return (
    <SubScreenContainer title={'Settings'} navigation={navigation} showLeftBtn={false}>
      <>
        <ScrollView
          style={{ paddingHorizontal: 16, flex: 1, marginBottom: 16 }}
          contentContainerStyle={{ paddingTop: 16 }}>
          <ActionItem
            icon={User}
            title={'Accounts'}
            subTitle={currentAccount ? currentAccount.name : ''}
            hasRightArrow
            paddingLeft={16}
            // backgroundColor={ColorMap.dark2}
            // style={{ marginBottom: 16, borderRadius: 20 }}
            onPress={() => navigation.navigate('AccountsScreen')}
          />

          {settingList[0].map(setting => (
            <ActionItem
              key={setting.title}
              style={settingRowStyle}
              icon={setting.icon}
              title={setting.title}
              hasRightArrow={setting.hasRightArrow}
              onPress={setting.onPress}
              disabled={setting.disabled}
              color={setting.disabled ? ColorMap.disabledTextColor : ColorMap.light}
            />
          ))}

          <Text style={settingTitleStyle}>{'Network and Assets'}</Text>

          {settingList[1].map(setting => (
            <ActionItem
              key={setting.title}
              style={settingRowStyle}
              icon={setting.icon}
              title={setting.title}
              hasRightArrow={setting.hasRightArrow}
              onPress={setting?.onPress}
            />
          ))}

          {/* <Text style={settingTitleStyle}>{i18n.settings.communityAndSupport}</Text>

          {settingList[2].map(setting => (
            <ActionItem
              key={setting.title}
              style={settingRowStyle}
              icon={setting.icon}
              title={setting.title}
              hasRightArrow={setting.hasRightArrow}
              onPress={setting.onPress}
            />
          ))} */}

          <Text style={settingTitleStyle}>{'About'}</Text>

          {settingList[2].map(setting => (
            <ActionItem
              key={setting.title}
              style={settingRowStyle}
              icon={setting.icon}
              title={setting.title}
              hasRightArrow={setting.hasRightArrow}
              onPress={setting.onPress}
            />
          ))}

          {settingList[3].map(setting => (
            <ActionItem
              key={setting.title}
              style={{ marginTop: 23 }}
              icon={setting.icon}
              title={setting.title}
              hasRightArrow={setting.hasRightArrow}
              onPress={setting.onPress}
              disabled={setting.disabled}
              color={setting.disabled ? ColorMap.disabledTextColor : ColorMap.light}
            />
          ))}
        </ScrollView>
        <Text
          onPress={onPressVersionNumber}
          style={versionAppStyle}>{`Dfinn Wallet v${VersionNumber.appVersion} (${VersionNumber.buildVersion})`}</Text>
        <Text style={{ color: ColorMap.disabled, textAlign: 'center', paddingBottom: 16 }}>Powered by Subwallet</Text>
      </>
    </SubScreenContainer>
  );
};
