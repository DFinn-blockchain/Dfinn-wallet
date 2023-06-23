import { ImageBackground, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import React from 'react';
import { ColorMap } from 'styles/color';
import { SeedWord } from 'components/SeedWord';
import Text from 'components/Text';
import { Images } from 'assets/index';
import i18n from 'utils/i18n/i18n';
import { FontSemiBold, sharedStyles } from 'styles/sharedStyles';

export type SelectedWordType = {
  wordKey: string;
  word: string;
};

interface SeedPhraseAreaProps extends ViewProps {
  onTapWord: (word: string, wordKey: string) => void;
  originWords: string[];
  currentWords: SelectedWordType[];
}

export function getWordKey(word: string, index: number) {
  return `${index}-${word}`;
}

function getWrapperStyle(style: StyleProp<any> = {}): StyleProp<any> {
  return {
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: ColorMap.dark2,
    minHeight: 170,
    ...style,
  };
}

const innerViewStyle: StyleProp<any> = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const seperatorStyle: ViewStyle = {
  height: 6,
  width: 6,
  borderRadius: 10,
  backgroundColor: ColorMap.light,
  marginHorizontal: 5,
};

const label: ViewStyle = {
  height: 30,
  //width: 100,
  paddingHorizontal: 5,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  alignSelf: 'center',
  top: -15,
};
const seedWordStyle = {
  margin: 2,
};

const isWordCorrect = (word: string, index: number, originWords: string[]) => {
  const currentOriginWord = originWords[index];

  return !!(currentOriginWord && currentOriginWord === word);
};

export const SeedPhraseArea = (seedPhraseAreaProps: SeedPhraseAreaProps) => {
  const { currentWords, originWords, onTapWord, style } = seedPhraseAreaProps;

  const _onTapWord = (word: string, wordKey: string) => {
    return () => {
      onTapWord(word, wordKey);
    };
  };

  const renderSeedWord = ({ item, index }: { item: SelectedWordType; index: number }) => {
    const { wordKey, word } = item;

    return (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <SeedWord
          style={seedWordStyle}
          backgroundColor={ColorMap.dark1}
          key={wordKey}
          title={word}
          removeBoundary={true}
          isError={!isWordCorrect(word, index, originWords)}
          onPress={_onTapWord(word, wordKey)}
        />
        {currentWords.length > 1 && index !== currentWords.length - 1 && <View style={seperatorStyle} />}
      </View>
    );
  };

  return (
    <View style={getWrapperStyle(style)}>
      <ImageBackground source={Images.radialBg1} imageStyle={{ borderRadius: 50 }} style={label}>
        <Text style={{ ...sharedStyles.smallText, ...FontSemiBold, color: ColorMap.dark }}>
          {i18n.title.yourSeedPhrase}
        </Text>
      </ImageBackground>
      <View style={innerViewStyle}>{currentWords.map((item, index) => renderSeedWord({ item, index }))}</View>
      {/* <FlatList
        scrollEnabled={false}
        data={currentWords}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={seperatorStyle} />}
        renderItem={renderSeedWord}
        contentContainerStyle={innerViewStyle}
      /> */}
    </View>
  );
};
