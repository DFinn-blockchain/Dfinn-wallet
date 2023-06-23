import React, { useEffect, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  ScrollView,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from 'components/Text';
import { SeedWord } from 'components/SeedWord';
import { ColorMap } from 'styles/color';
import { ContainerHorizontalPadding, FontMedium, MarginBottomForSubmitButton, sharedStyles } from 'styles/sharedStyles';
import { getWordKey, SeedPhraseArea, SelectedWordType } from 'components/SeedPhraseArea';
import { SubmitButton } from 'components/SubmitButton';
import { shuffleArray } from 'utils/index';
import i18n from 'utils/i18n/i18n';
import GradientButton from 'components/GradientButton';
import { DEVICE } from 'constants/index';
import useUnlockModal from 'hooks/modal/useUnlockModal';
import { UnlockModal } from 'components/common/Modal/UnlockModal';

interface Props {
  onPressSubmit: () => void;
  seed: string;
  isBusy: boolean;
}

const bodyAreaStyle: StyleProp<any> = {
  flex: 1,
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
  ...sharedStyles.mainText,
  ...FontMedium,
  color: ColorMap.disabled,
  textAlign: 'center',
};

const phraseAreaStyle: StyleProp<any> = {
  marginVertical: 20,
  borderRadius: 40,
};

const phraseBlockStyle: StyleProp<any> = {
  paddingLeft: 14,
  paddingRight: 14,
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: 24,
};

const seedWordStyle = {
  margin: 2,
};

const isCorrectWord = (selectedWords: SelectedWordType[], seed: string) => {
  return selectedWords.map(item => item.word).join(' ') === seed;
};

const buttonTextStyle: TextStyle = {
  ...sharedStyles.smallText,
  textAlign: 'center',
};
export const VerifySecretPhrase = ({ onPressSubmit, seed, isBusy }: Props) => {
  const [selectedWords, setSelectedWords] = useState<SelectedWordType[]>([]);
  const [shuffleWords, setShuffleWords] = useState<string[] | null>(null);
  const seedWords: string[] = seed.split(' ');

  useEffect((): void => {
    const words = seed.split(' ');
    shuffleArray(words);
    setShuffleWords(words);
  }, [seed]);

  const onSelectWord = (word: string, wordKey: string) => {
    return () => {
      const newSelectedWord: SelectedWordType[] = [...selectedWords];
      newSelectedWord.push({ word, wordKey });
      setSelectedWords(newSelectedWord);
    };
  };

  const onUnSelectWord = (word: string, wordKey: string) => {
    const newSelectedWord: SelectedWordType[] = selectedWords.filter(
      item => !(item.word === word && item.wordKey === wordKey),
    );

    setSelectedWords(newSelectedWord);
  };

  const undoSelect = (e: any) => {
    if (selectedWords.length === 1) return setSelectedWords([]);
    setSelectedWords(s => s.slice(1));
  };

  const renderSeedWord = (word: string, index: number) => {
    const wordKey = getWordKey(word, index);

    return (
      <SeedWord
        style={seedWordStyle}
        key={wordKey}
        title={word}
        small={true}
        onPress={onSelectWord(word, wordKey)}
        isActivated={selectedWords.some(item => item.word === word && item.wordKey === wordKey)}
      />
    );
  };

  const { visible, onPasswordComplete, onPress: onSubmit, onHideModal } = useUnlockModal();

  return (
    <View style={sharedStyles.layoutContainer}>
      <View style={bodyAreaStyle}>
        {/* <View style={infoBlockStyle}>
          <Text style={infoTextStyle}>{i18n.warningMessage.initSecretPhrase}</Text>
        </View> */}
        <SeedPhraseArea
          currentWords={selectedWords}
          onTapWord={onUnSelectWord}
          originWords={seedWords}
          style={phraseAreaStyle}
        />
        <FlatList
          //scrollEnabled={false}
          //style={{ alignSelf: 'center' }}
          contentContainerStyle={{ alignItems: 'center' }}
          keyExtractor={(x, i) => i.toString()}
          numColumns={2}
          data={shuffleWords}
          renderItem={({ item, index }) => renderSeedWord(item, index)}
        />
        {/* <View style={phraseBlockStyle}>{shuffleWords && shuffleWords.map(renderSeedWord)}</View> */}
      </View>
      <View style={footerAreaStyle}>
        <TouchableOpacity
          onPress={undoSelect}
          disabled={selectedWords.length === 0}
          style={{
            borderWidth: 1,
            borderColor: ColorMap.disabled,
            height: 80,
            borderRadius: 40,
            marginBottom: 10,
            justifyContent: 'center',
            width: DEVICE.width / 2.4,
            opacity: selectedWords.length === 0 ? 0.5 : 1,
          }}>
          <Text style={{ color: ColorMap.light, ...buttonTextStyle }}>{i18n.common.undo}</Text>
        </TouchableOpacity>
        {/* <SubmitButton
          onPress={onSubmit(onPressSubmit)}
          disabled={!isCorrectWord(selectedWords, seed)}
          title={i18n.common.continue}
          isBusy={isBusy}
        /> */}
        <GradientButton
          disabled={!isCorrectWord(selectedWords, seed)}
          onPress={onSubmit(onPressSubmit)}
          viewStyle={{
            height: 80,
            borderRadius: 40,
            width: DEVICE.width / 2.4,
          }}>
          <Text style={{ color: ColorMap.dark, ...buttonTextStyle }}>{i18n.common.continue}</Text>
        </GradientButton>
        {/* <SubmitButton
          disabled={!isCorrectWord(selectedWords, seed)}
          title={i18n.common.continue}
          onPress={onPressSubmit}
        /> */}
      </View>
      <UnlockModal onPasswordComplete={onPasswordComplete} visible={visible} onHideModal={onHideModal} />
    </View>
  );
};
