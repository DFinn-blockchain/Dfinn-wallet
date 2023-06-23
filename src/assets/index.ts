import React from 'react';
import { ImageLogosMap } from 'assets/logo';

const CheckBoxIcon = React.lazy(() => import('./checkbox.svg'));
const SignalIcon = React.lazy(() => import('./signal.svg'));
const SignalSplashIcon = React.lazy(() => import('./signal-splash.svg'));
const CheckBoxFilledIcon = React.lazy(() => import('./checkbox-filled.svg'));
const NftIcon = React.lazy(() => import('./logo-nft.svg'));
const Logo = React.lazy(() => import('./subwallet-logo.svg'));
const MenuBarLogo = React.lazy(() => import('./menu-bar.svg'));
const FirstPageImage = React.lazy(() => import('./new_splash_img.svg'));
const Scanner = React.lazy(() => import('./Scanner.svg'));

export const SVGImages = {
  Logo,
  CheckBoxIcon: CheckBoxIcon,
  CheckBoxFilledIcon: CheckBoxFilledIcon,
  NftIcon: NftIcon,
  SignalIcon: SignalIcon,
  SignalSplashIcon: SignalSplashIcon,
  MenuBarLogo: MenuBarLogo,
  FirstPageImg: FirstPageImage,
  Scanner,
};

export const Images = {
  ...ImageLogosMap,
  wallet: require('./Wallet.png'),
  browser: require('./Browser.png'),
  swap: require('./Swap.png'),
  setting: require('./Setting.png'),
  loading: require('./new_loading.gif'),
  stackingEmptyList: require('./stacking-empty-list.png'),
  successStatusImg: require('./success-status.png'),
  failStatusImg: require('./fail-status.png'),
  backgroundImg: require('./subwallet-background-img.png'),
  historyEmpty: require('./transaction-history-coming-soon.png'),
  squircleBorder: require('./squircleBorder.png'),
  avatarPlaceholder: require('./avatar-placeholder.png'),
  subwalletDappLogo: require('./dfinn_logo.png'),
  radialBg1: require('./radial_bg1.png'),
};
