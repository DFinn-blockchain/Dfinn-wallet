import React, { forwardRef, useState } from 'react';
import { StyleProp, TextInput, TouchableOpacity, View } from 'react-native';
import { ColorMap } from 'styles/color';
import { FontMedium, FontSize2 } from 'styles/sharedStyles';
import { FieldBase, FieldBaseProps } from 'components/Field/Base';
import { BUTTON_ACTIVE_OPACITY } from 'constants/index';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { Warning } from 'components/Warning';

interface Props extends FieldBaseProps {
  onChangeText?: (text: string) => void;
  onEndEditing?: () => void;
  onBlur?: () => void;
  errorMessages?: string[];
  isBusy?: boolean;
  autoFocus?: boolean;
  onSubmitField?: () => void;
  defaultValue?: string;
}

const blockContentStyle: StyleProp<any> = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingBottom: 8,
};

function getInputStyle(isError: boolean) {
  return {
    ...FontSize2,
    paddingTop: 0,
    paddingBottom: 0,
    height: 25,
    flex: 1,
    paddingRight: 16,
    ...FontMedium,
    color: isError ? ColorMap.danger : ColorMap.light,
  };
}

export const PasswordField = forwardRef((passwordFieldProps: Props, ref: React.Ref<TextInput>) => {
  const {
    defaultValue,
    onChangeText,
    onEndEditing,
    onBlur,
    errorMessages,
    isBusy,
    autoFocus,
    onSubmitField,
    ...fieldBase
  } = passwordFieldProps;
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <FieldBase {...fieldBase}>
        <View style={blockContentStyle}>
          <TextInput
            ref={ref}
            autoCorrect={false}
            autoFocus={autoFocus}
            style={getInputStyle(!!(errorMessages && errorMessages.length))}
            placeholderTextColor={ColorMap.disabled}
            selectionColor={ColorMap.disabled}
            secureTextEntry={!isShowPassword}
            blurOnSubmit={false}
            onSubmitEditing={onSubmitField}
            onChangeText={onChangeText}
            onEndEditing={onEndEditing}
            defaultValue={defaultValue || ''}
            onBlur={onBlur}
            textContentType="oneTimeCode"
            editable={!isBusy}
            selectTextOnFocus={!isBusy}
          />

          {isShowPassword ? (
            <TouchableOpacity
              disabled={isBusy}
              activeOpacity={BUTTON_ACTIVE_OPACITY}
              onPress={() => setShowPassword(false)}>
              <EyeSlash color={isBusy ? ColorMap.disabled : ColorMap.light} weight={'bold'} size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={isBusy}
              activeOpacity={BUTTON_ACTIVE_OPACITY}
              onPress={() => setShowPassword(true)}>
              <Eye color={isBusy ? ColorMap.disabled : ColorMap.light} weight={'bold'} size={20} />
            </TouchableOpacity>
          )}
        </View>
      </FieldBase>

      {!!(errorMessages && errorMessages.length) &&
        errorMessages.map((message, index) => (
          <Warning key={index} isDanger message={message} style={{ marginBottom: 8 }} />
        ))}
    </>
  );
});
