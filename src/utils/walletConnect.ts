import { _ChainInfo } from '@subwallet/chain-list/types';
import { AbstractAddressJson, AccountJson } from '@subwallet/extension-base/background/types';
import { SessionTypes } from '@walletconnect/types';

import { findAccountByAddress } from './account';
import { WalletConnectChainInfo } from 'types/walletConnect';
import { validWalletConnectUri } from 'utils/scanner/walletConnect';
import { addConnection } from 'messaging/index';
import { ToastType } from 'react-native-toast-notifications';
import i18n from 'utils/i18n/i18n';
import { ProposalTypes } from '@walletconnect/types/dist/types/sign-client/proposal';
import { _getSubstrateGenesisHash } from '@subwallet/extension-base/services/chain-service/utils';

export const WALLET_CONNECT_EIP155_NAMESPACE = 'eip155';
export const WALLET_CONNECT_POLKADOT_NAMESPACE = 'polkadot';
export const findChainInfoByHalfGenesisHash = (
  chainMap: Record<string, _ChainInfo>,
  halfGenesisHash?: string,
): _ChainInfo | null => {
  if (!halfGenesisHash) {
    return null;
  }

  for (const chainInfo of Object.values(chainMap)) {
    if (
      _getSubstrateGenesisHash(chainInfo)
        ?.toLowerCase()
        .substring(2, 2 + 32) === halfGenesisHash.toLowerCase()
    ) {
      return chainInfo;
    }
  }

  return null;
};

export const findChainInfoByChainId = (chainMap: Record<string, _ChainInfo>, chainId?: number): _ChainInfo | null => {
  if (!chainId) {
    return null;
  }

  for (const chainInfo of Object.values(chainMap)) {
    if (chainInfo.evmInfo?.evmChainId === chainId) {
      return chainInfo;
    }
  }

  return null;
};

export const WALLET_CONNECT_SUPPORT_NAMESPACES: string[] = [
  WALLET_CONNECT_EIP155_NAMESPACE,
  WALLET_CONNECT_POLKADOT_NAMESPACE,
];
export const isProposalExpired = (params: ProposalTypes.Struct): boolean => {
  const timeNum = params.expiry;
  const expireTime = new Date(timeNum > 10 ** 12 ? timeNum : timeNum * 1000);
  const now = new Date();

  return now.getTime() >= expireTime.getTime();
};

export const isSupportWalletConnectNamespace = (namespace: string): boolean => {
  return WALLET_CONNECT_SUPPORT_NAMESPACES.includes(namespace);
};

export const isSupportWalletConnectChain = (chain: string, chainInfoMap: Record<string, _ChainInfo>): boolean => {
  const [namespace, info] = chain.split(':');

  if (namespace === WALLET_CONNECT_POLKADOT_NAMESPACE) {
    return !!findChainInfoByHalfGenesisHash(chainInfoMap, info);
  } else if (namespace === WALLET_CONNECT_EIP155_NAMESPACE) {
    return !!findChainInfoByChainId(chainInfoMap, parseInt(info));
  } else {
    return false;
  }
};
export const chainsToWalletConnectChainInfos = (
  chainMap: Record<string, _ChainInfo>,
  chains: string[],
): Array<WalletConnectChainInfo> => {
  return chains.map(chain => {
    const [namespace, info] = chain.split(':');

    if (namespace === WALLET_CONNECT_EIP155_NAMESPACE) {
      const chainInfo = findChainInfoByChainId(chainMap, parseInt(info));

      return {
        chainInfo,
        slug: chainInfo?.slug || chain,
        supported: !!chainInfo,
      };
    } else if (namespace === WALLET_CONNECT_POLKADOT_NAMESPACE) {
      const chainInfo = findChainInfoByHalfGenesisHash(chainMap, info);

      return {
        chainInfo,
        slug: chainInfo?.slug || chain,
        supported: !!chainInfo,
      };
    } else {
      return {
        chainInfo: null,
        slug: chain,
        supported: false,
      };
    }
  });
};

export const getWCAccountList = (
  accounts: AccountJson[],
  namespaces: SessionTypes.Namespaces,
): AbstractAddressJson[] => {
  const rawMap: Record<string, string> = {};
  const rawList = Object.values(namespaces)
    .map(namespace => namespace.accounts || [])
    .flat();

  rawList.forEach(info => {
    const [, , address] = info.split(':');

    rawMap[address] = address;
  });

  const convertMap: Record<string, AbstractAddressJson> = {};
  const convertList = Object.keys(rawMap).map((address): AbstractAddressJson | null => {
    const account = findAccountByAddress(accounts, address);

    if (account) {
      return {
        address: account.address,
        name: account.name,
      };
    } else {
      return null;
    }
  });

  convertList.forEach(info => {
    if (info) {
      convertMap[info.address] = info;
    }
  });

  return Object.values(convertMap);
};

export const isValidUri = (uri: string) => {
  return !validWalletConnectUri(uri);
};

const runned: Record<string, boolean> = {};

export const connectWalletConnect = (wcUrl: string, toast?: ToastType) => {
  if (isValidUri(wcUrl)) {
    if (!runned[wcUrl]) {
      runned[wcUrl] = true;
      addConnection({ uri: wcUrl }).catch(e => {
        const errMessage = (e as Error).message;
        const message = errMessage.includes('Pairing already exists')
          ? i18n.errorMessage.connectionAlreadyExist
          : i18n.errorMessage.failToAddConnection;
        toast?.show(message, { type: 'danger' });
      });
    }
  } else {
    toast?.show('Invalid uri');
  }
};
