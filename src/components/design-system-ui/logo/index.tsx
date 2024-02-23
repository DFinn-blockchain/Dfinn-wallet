// @ts-nocheck
import React from 'react';
import { View } from 'react-native';
import LogoStyles from './style';
import Image from '../image';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { RootState } from 'stores/index';
import { useSelector } from 'react-redux';
import { ImageLogosMap } from 'assets/logo';
import { CustomLogoMap } from './LogoMap';

type IconShapeType = 'default' | 'circle' | 'squircle';

export interface SWLogoProps {
  defaultLogoKey?: string;
  isShowSubLogo?: boolean;
  isShowSubIcon?: boolean;
  network?: string;
  shape?: IconShapeType;
  size: number;
  subLogoShape?: IconShapeType;
  subNetwork?: string;
  subToken?: string;
  token?: string;
  subIcon?: React.ReactNode;
}

const Logo: React.FC<SWLogoProps> = ({
  defaultLogoKey = 'default',
  isShowSubLogo,
  isShowSubIcon,
  network,
  shape = 'default',
  size,
  subLogoShape = 'circle',
  subNetwork,
  subIcon,
  subToken,
  token,
}) => {
  const theme = useSubWalletTheme().swThemes;
  const { chainLogoMap, assetLogoMap } = useSelector((state: RootState) => state.logoMaps);
  const _style = LogoStyles(theme);
  const subLogoSize = size / 2.5;

  let srcLogo;
  if (token) {
    srcLogo = assetLogoMap[token] || CustomLogoMap[token] || assetLogoMap[defaultLogoKey];
  } else if (network) {
    srcLogo =
      (network.includes('custom') ? CustomLogoMap[network] : chainLogoMap[network]) || chainLogoMap[defaultLogoKey];
  }

  let srcSubLogo;
  if (subToken) {
    srcSubLogo = assetLogoMap[subToken] || CustomLogoMap[subToken] || assetLogoMap[defaultLogoKey];
  } else if (subNetwork) {
    srcSubLogo =
      (subNetwork.includes('custom') ? CustomLogoMap[subNetwork] : chainLogoMap[subNetwork]) ||
      chainLogoMap[defaultLogoKey];
  }

  return (
    <View>
      <Image
        src={
          srcLogo ===
            'https://raw.githubusercontent.com/Bharathcoorg/logos/main/dfinn-logo.png' ||
          !srcLogo
            ? ImageLogosMap.default
            : { uri: srcLogo }
        }
        style={{ width: size, height: size, backgroundColor: 'transparent' }}
        squircleSize={size}
        shape={shape}
      />
      {isShowSubIcon && !isShowSubLogo && <View style={_style.subLogoContainer}>{subIcon}</View>}
      {isShowSubLogo && (
        <Image
          src={
            !srcSubLogo ||
            srcSubLogo ===
              'https://raw.githubusercontent.com/Koniverse/SubWallet-Chain/master/packages/chain-list/src/logo/default.png'
              ? ImageLogosMap.default
              : { uri: srcSubLogo }
          }
          style={{ width: subLogoSize, height: subLogoSize }}
          squircleSize={subLogoSize}
          shape={subLogoShape}
          containerStyle={_style.subLogoContainer}
        />
      )}
    </View>
  );
};

export default Logo;
