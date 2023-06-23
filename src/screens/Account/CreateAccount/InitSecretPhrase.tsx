import React, { useMemo } from 'react';
import { GestureResponderEvent, ScrollView, StyleProp, TextStyle, TouchableOpacity, View } from 'react-native';
import Text from 'components/Text';
import { SeedWord } from 'components/SeedWord';
import {
  ContainerHorizontalPadding,
  FontMedium,
  MarginBottomForSubmitButton,
  ScrollViewStyle,
  sharedStyles,
} from 'styles/sharedStyles';
import { SubmitButton } from 'components/SubmitButton';
import { Warning } from 'components/Warning';
import { LeftIconButton } from 'components/LeftIconButton';
import { CopySimple } from 'phosphor-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToast } from 'react-native-toast-notifications';
import { ColorMap } from 'styles/color';
import i18n from 'utils/i18n/i18n';
import { SeedWordDataType } from 'screens/CreateAccount/types';
import GradientButton from 'components/GradientButton';
import { DEVICE } from 'constants/index';
import { FlatList } from 'react-native';
interface Props {
  onPressSubmit: (event: GestureResponderEvent) => void;
  seed: string;
}

const bodyAreaStyle: StyleProp<any> = {
  flex: 1,
  justifyContent: 'center',
};

const footerAreaStyle: StyleProp<any> = {
  marginTop: 16,
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  ...MarginBottomForSubmitButton,
};

const infoBlockStyle: StyleProp<any> = {
  ...ContainerHorizontalPadding,
  marginBottom: 24,
};

const infoTextStyle: StyleProp<any> = {
  color: ColorMap.disabledTextColor,
  textAlign: 'center',
};

const phraseBlockStyle: StyleProp<any> = {
  paddingLeft: 14,
  paddingRight: 14,
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 24,
  justifyContent: 'center',
};

const seedWordStyle = {
  margin: 2,
};

const copyButtonWrapperStyle: StyleProp<any> = {
  alignItems: 'center',
  marginBottom: 24,
};

const buttonTextStyle: TextStyle = {
  ...sharedStyles.smallText,
  textAlign: 'center',
};

const renderSeedWord = ({ item }) => {
  return <SeedWord style={seedWordStyle} key={item.key} prefixText={item.prefixText} title={item.title} disabled />;
};

export const InitSecretPhrase = ({ seed, onPressSubmit }: Props) => {
  const toast = useToast();
  const seedItems = useMemo<SeedWordDataType[]>(() => {
    return seed.split(' ').map((word, index) => {
      return {
        key: `${index}-${word}`,
        title: word,
        prefixText: `${index + 1}. `, //`${index + 1}`.padStart(2, '0'),
      };
    });
  }, [seed]);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    toast.hideAll();
    toast.show(i18n.common.copiedToClipboard + ' ');
  };
  //console.log(seed);
  return (
    <View style={sharedStyles.layoutContainer}>
      <View style={bodyAreaStyle}>
        {/* <ScrollView style={{ ...ScrollViewStyle }}> */}
        {/* <View style={infoBlockStyle}>
            <Text style={infoTextStyle}>{i18n.warningMessage.initSecretPhrase}</Text>
          </View> */}
        <FlatList
          scrollEnabled={false}
          //style={{ alignSelf: 'center' }}
          contentContainerStyle={{ alignItems: 'center' }}
          keyExtractor={(x, i) => i.toString()}
          numColumns={2}
          data={seedItems}
          renderItem={renderSeedWord}
        />
        {/* <View style={phraseBlockStyle}>{seedItems.map(renderSeedWord)}</View> */}
        {/* <View style={copyButtonWrapperStyle}>
            <LeftIconButton
              icon={CopySimple}
              title={i18n.common.copyToClipboard}
              onPress={() => copyToClipboard(seed)}
            />
          </View> */}
        {/* </ScrollView> */}
        {/* <Warning
          style={{ marginTop: 16 }}
          title={i18n.warningTitle.doNotShareSecretPhrase}
          message={i18n.warningMessage.secretPhraseWarning}
        /> */}
      </View>

      <View style={footerAreaStyle}>
        <TouchableOpacity
          onPress={() => copyToClipboard(seed)}
          style={{
            borderWidth: 1,
            borderColor: ColorMap.disabled,
            height: 70,
            borderRadius: 40,
            marginBottom: 10,
            justifyContent: 'center',
            width: DEVICE.width / 2.4,
          }}>
          <Text style={{ color: ColorMap.light, ...buttonTextStyle }}>{i18n.common.copyToClipboard}</Text>
        </TouchableOpacity>
        <GradientButton
          onPress={onPressSubmit}
          viewStyle={{
            height: 70,
            borderRadius: 40,
            width: DEVICE.width / 2.4,
          }}>
          <Text style={{ color: ColorMap.dark, ...buttonTextStyle }}>{i18n.common.continue}</Text>
        </GradientButton>
        {/* <SubmitButton title={i18n.common.continue} onPress={onPressSubmit} /> */}
      </View>
    </View>
  );
};
