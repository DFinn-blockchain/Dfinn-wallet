import React, { useEffect } from 'react';
import { Keyboard, ScrollView, StyleProp, TextStyle, View } from 'react-native';
import Text from 'components/Text';
import { ColorMap } from 'styles/color';
import { FontMedium, MarginBottomForSubmitButton, ScrollViewStyle, sharedStyles } from 'styles/sharedStyles';
import { SubmitButton } from 'components/SubmitButton';
import { AccountNameAndPasswordArea } from 'components/AccountNameAndPasswordArea';
import i18n from 'utils/i18n/i18n';
import useFormControl, { FormState } from 'hooks/screen/useFormControl';
import GradientButton from 'components/GradientButton';

const bodyAreaStyle: StyleProp<any> = {
  flex: 1,
  ...ScrollViewStyle,
};

const footerAreaStyle: StyleProp<any> = {
  marginTop: 8,
  ...MarginBottomForSubmitButton,
};
const infoTextStyle: StyleProp<any> = {
  color: ColorMap.disabledTextColor,
  textAlign: 'center',
  paddingHorizontal: 20,
  paddingBottom: 26,
};

const titleStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  color: ColorMap.disabled,
  textAlign: 'center',
  paddingHorizontal: 20,
  ...FontMedium,
  paddingBottom: 26,
};
const buttonTextStyle: TextStyle = {
  ...sharedStyles.smallText,
  textAlign: 'center',
};

interface Props {
  isBusy?: boolean;
  onCreateAccount: (curName: string, password: string) => void;
}

export function checkPasswordLength(value: string) {
  return !!(value && value.length > 5);
}

export function validatePassword(value: string) {
  const isPasswordTooShort = !checkPasswordLength(value);
  if (isPasswordTooShort) {
    return [i18n.warningMessage.passwordTooShort];
  } else {
    return [];
  }
}

export function validatePasswordMatched(value: string, compareValue: string) {
  if (value !== compareValue) {
    return [i18n.warningMessage.doNotMatchPasswordWarning];
  } else {
    return [];
  }
}

function checkValidateForm(formValidated: Record<string, boolean>) {
  return formValidated.accountName && formValidated.password && formValidated.repeatPassword;
}

export const AccountNamePasswordCreation = ({ isBusy, onCreateAccount }: Props) => {
  useEffect(() => {
    focus('accountName')();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _onCreateAccount = (formState: FormState) => {
    if (checkValidateForm(formState.isValidated)) {
      onCreateAccount(formState.data.accountName, formState.data.password);
    } else {
      Keyboard.dismiss();
    }
  };

  const formConfig = {
    accountName: {
      name: i18n.common.walletName,
      value: '',
      require: true,
    },
    password: {
      name: i18n.common.walletPassword,
      value: '',
      validateFunc: validatePassword,
      require: true,
    },
    repeatPassword: {
      name: i18n.common.repeatWalletPassword,
      value: '',
      validateFunc: (value: string, formValue: Record<string, string>) => {
        return validatePasswordMatched(value, formValue.password);
      },
      require: true,
    },
  };
  const { formState, onChangeValue, onSubmitField, focus } = useFormControl(formConfig, {
    onSubmitForm: _onCreateAccount,
  });
  return (
    <View style={sharedStyles.layoutContainer}>
      <ScrollView style={bodyAreaStyle}>
        <Text style={infoTextStyle}>{i18n.common.createWalletNotification}</Text>

        <AccountNameAndPasswordArea formState={formState} onChangeValue={onChangeValue} onSubmitField={onSubmitField} />
      </ScrollView>
      <View style={footerAreaStyle}>
        {/* <GradientButton
          disabled={!checkValidateForm(formState.isValidated)}
          onPress={() => _onCreateAccount(formState)}
          viewStyle={{
            height: 60,
            borderRadius: 40,
          }}>
          <Text style={{ color: ColorMap.dark, ...buttonTextStyle }}>{i18n.common.finish}</Text>
        </GradientButton> */}
        <SubmitButton
          disabled={!checkValidateForm(formState.isValidated)}
          isBusy={isBusy}
          title={i18n.common.finish}
          onPress={() => _onCreateAccount(formState)}
        />
      </View>
    </View>
  );
};
