import React from 'react';
import {
  ArrowDown,
  ArrowFatLinesDown,
  ArrowUpRight,
  PaperPlaneTilt,
  PlusCircle,
  ShoppingCartSimple,
} from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { getButtonIcon } from 'utils/button';

export const ButtonIcon = {
  Receive: <ArrowDown color={ColorMap.dark} size={24} weight={'bold'} />,
  SendFund: <ArrowUpRight color={ColorMap.dark} size={24} weight={'bold'} />,
  Buy: <PlusCircle color={ColorMap.dark} size={24} weight={'bold'} />,
};
