import React, { useCallback } from 'react';
import DocumentPicker, { DirectoryPickerResponse, DocumentPickerResponse } from 'react-native-document-picker';
import { StyleProp, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import { FileArrowUp } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';
import i18n from 'utils/i18n/i18n';

interface Props {
  onChangeResult: (value: Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null) => void;
}

const inputFileContainer: StyleProp<any> = {
  alignItems: 'center',
  backgroundColor: ColorMap.dark2,
  borderRadius: 5,
  paddingVertical: 50,
  marginBottom: 8,
};

const inputFileLabel: StyleProp<any> = {
  ...sharedStyles.mainText,
  color: ColorMap.light,
  ...FontMedium,
  paddingTop: 8,
  paddingBottom: 4,
};

export const InputFile = ({ onChangeResult }: Props) => {
  const onChangeFile = useCallback(async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      onChangeResult([pickerResult]);
    } catch (e) {
      console.log('e', e);
    }
  }, [onChangeResult]);

  return (
    <TouchableOpacity style={inputFileContainer} onPress={onChangeFile}>
      <FileArrowUp size={32} weight={'regular'} color={ColorMap.light} />
      <Text style={inputFileLabel}>{i18n.common.inputFileLabel}</Text>
    </TouchableOpacity>
  );
};
