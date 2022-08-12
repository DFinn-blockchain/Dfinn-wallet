import BigN from 'bignumber.js';
import React from 'react';
import { StyleProp, View } from 'react-native';
import Text from '../components/Text';
import { FontBold, sharedStyles } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import { getRoundedDecimalNumber } from 'utils/index';

type BalanceViewProps = {
  value: string | BigN;
  symbol?: string;
  startWithSymbol?: boolean;
  withComma?: boolean;
  withSymbol?: boolean;
  balanceValTextStyle?: object;
  style?: StyleProp<any>;
};

const balanceValWrapper: StyleProp<any> = {
  flexDirection: 'row',
};

const balanceValText: StyleProp<any> = {
  ...sharedStyles.largeText,
  ...FontBold,
  color: ColorMap.light,
};

function getDisplayedBalance(value: string | BigN): string {
  const number = value.toString();

  if (+number < 1) {
    return getRoundedDecimalNumber(number, 4);
  } else {
    return getRoundedDecimalNumber(number);
  }
}

export const BalanceVal = ({
  balanceValTextStyle,
  startWithSymbol = false,
  symbol,
  value,
  withComma = true,
  withSymbol = true,
  style,
}: BalanceViewProps) => {
  let [prefix, postfix] = getDisplayedBalance(value).split('.');

  const lastSymbol = postfix?.slice(-1);
  const isString = /^[KMB]/.test(lastSymbol);
  const postfixValue = postfix || '00';
  const symbolView = prefix && <Text>{`${startWithSymbol ? '' : ' '}${symbol}`}</Text>;
  const formatPrefix = new Intl.NumberFormat().format(Number(prefix));

  return (
    <View style={[balanceValWrapper, style]}>
      <Text style={[balanceValText, balanceValTextStyle]}>{startWithSymbol && withSymbol && symbolView}</Text>
      <Text style={[balanceValText, balanceValTextStyle]}>
        {withComma ? formatPrefix.replace(/[. ]+/g, ',') : prefix}.
      </Text>
      <Text style={[balanceValText, balanceValTextStyle]}>{isString ? postfixValue.slice(0, -1) : postfixValue}</Text>
      <Text style={[balanceValText, balanceValTextStyle]}>{isString && lastSymbol}</Text>
      <Text style={[balanceValText, balanceValTextStyle]}>{!startWithSymbol && withSymbol && symbolView}</Text>
    </View>
  );
};
