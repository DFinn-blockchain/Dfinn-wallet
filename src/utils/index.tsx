import React from 'react';
import { Images, SVGImages } from 'assets/index';
import { Recoded } from 'types/ui-types';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-koni-base/constants';
import { NetworkJson } from '@subwallet/extension-base/background/KoniTypes';
import { KeypairType } from '@polkadot/util-crypto/types';
import { AccountJson, AccountWithChildren } from '@subwallet/extension-base/background/types';
import { isAccountAll } from '@subwallet/extension-koni-base/utils/utils';
import { decodeAddress, isEthereumAddress, ethereumEncode, encodeAddress } from '@polkadot/util-crypto';
import { SvgLogosMap } from 'assets/logo';
import { Image } from 'react-native';

export const defaultRecoded: Recoded = { account: null, formatted: null, prefix: 42, isEthereum: false };
export const accountAllRecoded: Recoded = {
  account: {
    address: ALL_ACCOUNT_KEY,
  },
  formatted: ALL_ACCOUNT_KEY,
  prefix: 42,
  isEthereum: false,
};

export const getIcon = (iconName: string, size: number, color?: string) => {
  // @ts-ignore
  const IconComponent = SVGImages[iconName];
  return <IconComponent width={size} height={size} color={color} />;
};

export function toShort(text: string, preLength = 6, sufLength = 6): string {
  if (text.length > preLength + sufLength + 1) {
    return `${text.slice(0, preLength)}…${text.slice(-sufLength)}`;
  }

  return text;
}

function findSubstrateAccount(accounts: AccountJson[], publicKey: Uint8Array): AccountJson | null {
  const pkStr = publicKey.toString();

  return (
    accounts
      .filter(a => !isAccountAll(a.address))
      .find(({ address }): boolean => decodeAddress(address).toString() === pkStr) || null
  );
}

export function findAccountByAddress(accounts: AccountJson[], _address: string): AccountJson | null {
  return accounts.find(({ address }): boolean => address === _address) || null;
}

export default function reformatAddress(address: string, networkPrefix: number, isEthereum = false): string {
  if (isAccountAll(address)) {
    return address;
  }

  if (isEthereumAddress(address)) {
    return address;
  }

  const publicKey = decodeAddress(address);

  if (isEthereum) {
    return ethereumEncode(publicKey);
  }

  if (networkPrefix < 0) {
    return address;
  }

  return encodeAddress(publicKey, networkPrefix);
}

export function recodeAddress(
  address: string,
  accounts: AccountWithChildren[],
  networkInfo: NetworkJson | null,
  type?: KeypairType,
): Recoded {
  const publicKey = decodeAddress(address);
  const account = findAccountByAddress(accounts, address) || findSubstrateAccount(accounts, publicKey);
  const prefix = networkInfo ? networkInfo.ss58Format : 42;
  const isEthereum = type === 'ethereum' || !!networkInfo?.isEthereum;

  return {
    account,
    formatted: reformatAddress(address, prefix, isEthereum),
    genesisHash: account?.genesisHash,
    prefix,
    isEthereum,
  };
}

export function getNetworkLogo(networkKey: string, size: number) {
  // @ts-ignore
  if (SvgLogosMap[networkKey]) {
    return getIcon(networkKey, size);
    // @ts-ignore
  } else if (Images[networkKey]) {
    // @ts-ignore
    return <Image style={{ width: size, height: size }} source={Images[networkKey]} />;
  }

  return getIcon('default', size);
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
