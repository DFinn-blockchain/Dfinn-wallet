import React, { useState } from 'react';
import { ScrollView, StyleProp, TouchableOpacity, View } from 'react-native';
import { SubScreenContainer } from 'components/SubScreenContainer';
import { SubmitButton } from 'components/SubmitButton';
import { CopySimple, FingerprintSimple } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import Text from '../components/Text';
import {
  ContainerHorizontalPadding,
  FontBold,
  FontMedium,
  MarginBottomForSubmitButton,
  ScrollViewStyle,
  sharedStyles,
} from 'styles/sharedStyles';
import { LeftIconButton } from 'components/LeftIconButton';
import { BUTTON_ACTIVE_OPACITY } from '../constant';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToast } from 'react-native-toast-notifications';
import { ExportPrivateKeyProps, RootNavigationProps } from 'types/routes';
import { exportAccountPrivateKey } from '../messaging';
import { PasswordField } from 'components/Field/Password';
import { Warning } from 'components/Warning';
import i18n from 'utils/i18n/i18n';

const layoutContainerStyle: StyleProp<any> = {
  ...ContainerHorizontalPadding,
  flex: 1,
  marginTop: 8,
};

const bodyAreaStyle: StyleProp<any> = {
  flex: 1,
  ...ScrollViewStyle,
};

const footerAreaStyle: StyleProp<any> = {
  marginLeft: -4,
  marginRight: -4,
  flexDirection: 'row',
  paddingTop: 12,
  ...MarginBottomForSubmitButton,
};

const warningBlockStyle: StyleProp<any> = {
  ...sharedStyles.blockContent,
  backgroundColor: ColorMap.warningOverlay,
  paddingBottom: 14,
  paddingTop: 17,
  marginBottom: 16,
};

const warningBlockTextStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  color: ColorMap.warning,
  textAlign: 'center',
};

const warningBlockTitleStyle: StyleProp<any> = {
  ...warningBlockTextStyle,
  ...FontBold,
  marginBottom: 8,
};

const privateBlockStyle: StyleProp<any> = {
  ...sharedStyles.blockContent,
  height: 238,
  backgroundColor: ColorMap.dark2,
  marginBottom: 16,
};

const privateBlockOverlayStyle: StyleProp<any> = {
  flex: 1,
  justifyContent: 'center',
};

const privateBlockTextStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  ...FontMedium,
  color: ColorMap.disabled,
  textAlign: 'center',
};

const privateBlockIconStyle: StyleProp<any> = {
  alignItems: 'center',
};

const copyButtonWrapperStyle: StyleProp<any> = {
  alignItems: 'center',
};

const buttonStyle: StyleProp<any> = {
  margin: 4,
  flex: 1,
};

const ViewStep = {
  HIDE_PK: 1,
  ENTER_PW: 2,
  SHOW_PK: 3,
};
const PrivateBlockIcon = FingerprintSimple;

export const ViewPrivateKey = ({
  route: {
    params: { address },
  },
}: ExportPrivateKeyProps) => {
  const navigation = useNavigation<RootNavigationProps>();
  const [privateKey, setPrivateKey] = useState<string>('');
  const toast = useToast();
  const [password, setPassword] = useState<string>('');
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentViewStep, setCurrentViewStep] = useState<number>(1);
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    toast.hideAll();
    toast.show(i18n.common.copiedToClipboard);
  };

  const onTapPrivate = () => {
    setCurrentViewStep(ViewStep.ENTER_PW);
  };

  const onTypePassword = (pass: string) => {
    setPassword(pass);
    setErrorMessage('');
  };

  const onSetPassword = () => {
    setIsBusy(true);
    exportAccountPrivateKey(address, password)
      .then(({ privateKey: resPrivateKey }) => {
        setPrivateKey(resPrivateKey);
        setIsBusy(false);
        setCurrentViewStep(ViewStep.SHOW_PK);
      })
      .catch((error: Error) => {
        setErrorMessage(error.message);
        setIsBusy(false);
      });
  };

  const onPressDone = () => {
    navigation.goBack();
  };

  const isPasswordError = !password || password.length < 6;

  return (
    <SubScreenContainer navigation={navigation} title={i18n.title.yourPrivateKey}>
      <View style={layoutContainerStyle}>
        <ScrollView style={bodyAreaStyle}>
          <View style={warningBlockStyle}>
            <Text style={warningBlockTitleStyle}>{i18n.warningTitle.doNotSharePrivateKey}</Text>
            <Text style={warningBlockTextStyle}>{i18n.warningMessage.privateKeyWarning}</Text>
          </View>

          {currentViewStep === ViewStep.HIDE_PK && (
            <TouchableOpacity activeOpacity={BUTTON_ACTIVE_OPACITY} style={privateBlockStyle} onPress={onTapPrivate}>
              <View style={privateBlockOverlayStyle}>
                <Text style={{ ...privateBlockTextStyle, marginBottom: 4, color: ColorMap.light }}>
                  {i18n.common.tapToRevealPrivateKey}
                </Text>
                <Text style={{ ...privateBlockTextStyle, marginBottom: 8 }}>{i18n.common.viewPrivateKeyTitle}</Text>
                <View style={privateBlockIconStyle}>
                  <PrivateBlockIcon size={32} color={ColorMap.light} />
                </View>
              </View>
            </TouchableOpacity>
          )}

          {currentViewStep === ViewStep.ENTER_PW && (
            <>
              <PasswordField
                label={i18n.common.passwordForThisAccount}
                onChangeText={onTypePassword}
                isError={isPasswordError}
                value={password}
              />

              {!!errorMessage && (
                <Warning isDanger style={{ ...sharedStyles.mainText, marginTop: 10 }} message={errorMessage} />
              )}
            </>
          )}

          {currentViewStep === ViewStep.SHOW_PK && (
            <View style={privateBlockStyle}>
              <Text style={privateBlockTextStyle}>{privateKey}</Text>
            </View>
          )}

          {currentViewStep === ViewStep.SHOW_PK && (
            <View style={copyButtonWrapperStyle}>
              <LeftIconButton
                icon={CopySimple}
                title={i18n.common.copyToClipboard}
                onPress={() => copyToClipboard(privateKey)}
              />
            </View>
          )}
        </ScrollView>

        <View style={footerAreaStyle}>
          {currentViewStep === ViewStep.ENTER_PW ? (
            <SubmitButton
              title={i18n.common.continue}
              disabled={isPasswordError}
              isBusy={isBusy}
              style={buttonStyle}
              onPress={onSetPassword}
            />
          ) : (
            <SubmitButton title={i18n.common.done} disabled={isBusy} style={buttonStyle} onPress={onPressDone} />
          )}
        </View>
      </View>
    </SubScreenContainer>
  );
};
