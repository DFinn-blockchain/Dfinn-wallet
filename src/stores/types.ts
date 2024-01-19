import {
  ActiveCronAndSubscriptionMap,
  AddressBookState,
  AssetSetting,
  ChainStakingMetadata,
  ConfirmationDefinitions,
  ConfirmationsQueue,
  ConfirmationType,
  CrowdloanItem,
  KeyringState,
  LanguageType,
  NftCollection,
  NftItem,
  NominatorMetadata,
  PriceJson,
  StakingItem,
  StakingRewardItem,
  TransactionHistoryItem,
  UiSettings,
  ValidatorInfo,
  BalanceItem,
  NominationPoolInfo,
} from '@subwallet/extension-base/background/KoniTypes';
import {
  AccountJson,
  AccountsContext,
  AuthorizeRequest,
  MetadataRequest,
  SigningRequest,
} from '@subwallet/extension-base/background/types';
import { AuthUrlInfo } from '@subwallet/extension-base/background/handlers/State';
import { SettingsStruct } from '@polkadot/ui-settings/types';
import { SWTransactionResult } from '@subwallet/extension-base/services/transaction-service/types';
import { _AssetRef, _ChainAsset, _ChainInfo, _MultiChainAsset } from '@subwallet/chain-list/types';
import { _ChainState } from '@subwallet/extension-base/services/chain-service/types';
import { SessionTypes } from '@walletconnect/types';
import { MissionInfo } from 'types/missionPool';
import { DAPPCategory, DAppInfo } from 'types/browser';

export type StoreStatus = 'INIT' | 'CACHED' | 'SYNCED' | 'WAITING';

export type StoreSlice = {
  isReady?: boolean;
};

export type AccountsSlice = {
  accounts: AccountJson[];
  currentAccountAddress: string;
  currentAccount?: AccountJson;
  isWaiting?: boolean;
} & StoreSlice;

export type AppStateSlice = {
  isLocked: boolean;
  isDisplayConfirmation: boolean;
};

export type AppVersionSlice = {
  buildNumber: number;
};

export type SelectedActionType = 'createAcc' | 'importAcc' | 'attachAcc' | 'migratePassword';

export type PasswordModalSlice = {
  isShowModal: boolean;
  selectedAction?: SelectedActionType;
};

export type AuthUrlsSlice = {
  details: Record<string, AuthUrlInfo>;
} & StoreSlice;

export type ConfirmationSlice = {
  details: {
    authorizeRequest?: Record<string, AuthorizeRequest>;
    signingRequest?: Record<string, SigningRequest>;
    metadataRequest?: Record<string, MetadataRequest>;
  } & {
    [P in keyof ConfirmationsQueue]?: ConfirmationsQueue[P];
  };
} & StoreSlice;

export type MobileSettingsSlice = {
  language: string;
  pinCodeEnabled: boolean;
  faceIdEnabled: boolean; // deprecated
  isUseBiometric: boolean;
  timeAutoLock: LockTimeout;
  isPreventLock: boolean;
};

export enum LockTimeout {
  NEVER = -1,
  ALWAYS = 0,
  _1MINUTE = 1,
  _5MINUTE = 5,
  _10MINUTE = 10,
  _15MINUTE = 15,
  _30MINUTE = 30,
  _60MINUTE = 60,
}

export type SiteInfo = {
  name: string;
  url: string;
};

export type StoredSiteInfo = {
  id: string;
} & SiteInfo;

export type BrowserSliceTab = {
  id: string;
  url: string;
  screenshot?: string;
};

export type BrowserSlice = {
  activeTab: null | string;
  tabs: BrowserSliceTab[];
  whitelist: string[];
  history: StoredSiteInfo[];
  bookmarks: StoredSiteInfo[];
};

export type BackgroundServiceSlice = {
  activeState: ActiveCronAndSubscriptionMap;
};

export enum ReduxStatus {
  INIT = 'init',
  CACHED = 'cached',
  READY = 'ready',
}
export interface BaseReduxStore {
  reduxStatus: ReduxStatus;
}

// todo: merge with UiSettings later
export interface LocalUiSettings {
  language: LanguageType;
  isShowZeroBalance: boolean;
}

export interface AppSettings
  extends LocalUiSettings,
    UiSettings,
    Omit<SettingsStruct, 'camera' | 'notification'>,
    BaseReduxStore {
  authUrls: Record<string, AuthUrlInfo>;
  mediaAllowed: boolean;
  isDeepLinkConnect: boolean;
  isShowBuyToken: boolean;
  browserDApps: {
    dApps: DAppInfo[] | undefined;
    dAppCategories: DAPPCategory[] | undefined;
  };
}

export interface AccountState extends AccountsContext, KeyringState, AddressBookState, BaseReduxStore {
  currentAccount: AccountJson | null;

  isAllAccount: boolean;
}

export interface RequestState extends ConfirmationsQueue, BaseReduxStore {
  authorizeRequest: Record<string, AuthorizeRequest>;
  metadataRequest: Record<string, MetadataRequest>;
  signingRequest: Record<string, SigningRequest>;
  hasConfirmations: boolean;
  hasInternalConfirmations: boolean;
  numberOfConfirmations: number;
  transactionRequest: Record<string, SWTransactionResult>;
  connectWCRequest: Record<string, any>;
}

export interface UpdateConfirmationsQueueRequest extends BaseReduxStore {
  type: ConfirmationType;
  data: Record<string, ConfirmationDefinitions[ConfirmationType][0]>;
}

export interface AssetRegistryStore extends BaseReduxStore {
  assetRegistry: Record<string, _ChainAsset>;
  multiChainAssetMap: Record<string, _MultiChainAsset>;
  assetSettingMap: Record<string, AssetSetting>;
  xcmRefMap: Record<string, _AssetRef>;
}

export interface ChainStore extends BaseReduxStore {
  chainInfoMap: Record<string, _ChainInfo>;
  chainStateMap: Record<string, _ChainState>;
}

export interface BalanceStore extends BaseReduxStore {
  balanceMap: Record<string, BalanceItem>;
}

export type PriceStore = PriceJson;

export interface CrowdloanStore extends BaseReduxStore {
  crowdloanMap: Record<string, CrowdloanItem>;
}

export interface NftStore extends BaseReduxStore {
  nftItems: NftItem[];
  nftCollections: NftCollection[];
}

export interface StakingStore extends BaseReduxStore {
  stakingMap: StakingItem[];
  stakingRewardMap: StakingRewardItem[];
  chainStakingMetadataList: ChainStakingMetadata[];
  nominatorMetadataList: NominatorMetadata[];
}

export interface BondingStore extends BaseReduxStore {
  nominationPoolInfoMap: Record<string, NominationPoolInfo[]>;
  validatorInfoMap: Record<string, ValidatorInfo[]>;
}

export interface ChainValidatorParams {
  chain: string;
  validators: ValidatorInfo[];
}

export interface ChainNominationPoolParams {
  chain: string;
  pools: NominationPoolInfo[];
}

export type TransactionHistoryReducerType = {
  historyList: TransactionHistoryItem[];
};

export interface WalletConnectStore extends BaseReduxStore {
  sessions: Record<string, SessionTypes.Struct>;
}

export interface MissionPoolStore extends BaseReduxStore {
  missions: MissionInfo[];
}

export interface BuyServiceStore extends BaseReduxStore {
  tokens: Record<string, any>;
  services: Record<string, any>;
}
