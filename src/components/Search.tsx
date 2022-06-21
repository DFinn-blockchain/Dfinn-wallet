import React from 'react';
import {StyleProp, TextInput, TextInputProps, View} from 'react-native';
import { MagnifyingGlass, X } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';

interface Props extends TextInputProps {
  onSearch: (text: string) => void;
  searchText: string;
}

const searchContainerStyle: StyleProp<any> = {
  backgroundColor: ColorMap.dark2,
  borderRadius: 5,
  alignItems: 'center',
  paddingVertical: 14,
  paddingRight: 16,
  paddingLeft: 16,
  flexDirection: 'row',
  height: 48,
}

export const Search = ({ onSearch, searchText, style }: Props) => {
  const SearchIcon = MagnifyingGlass;
  const CancelIcon = X;

  return (
    <View style={[searchContainerStyle, style]}>
      <SearchIcon size={20} color={ColorMap.light} weight={'bold'} />
      <TextInput
        style={{
          marginHorizontal: 8,
          ...sharedStyles.mainText,
          lineHeight: 20,
          ...FontMedium,
          color: ColorMap.disabled,
          flexDirection: 'row',
          flex: 1,
        }}
        onChangeText={text => onSearch(text)}
        placeholder={'Search'}
        placeholderTextColor={ColorMap.disabled}
      />
      {!!searchText && <CancelIcon size={20} color={ColorMap.light} weight={'bold'} />}
    </View>
  );
};
