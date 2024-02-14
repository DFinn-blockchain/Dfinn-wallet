import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'routes/index';
import { Linking } from 'react-native';
import urlParse from 'url-parse';
import queryString from 'querystring';
import { connectWalletConnect } from '../walletConnect';
import { ToastType } from 'react-native-toast-notifications';

let prevDeeplinkUrl = '';
export function transformUniversalToNative(url: string) {
    return url.replace('https://dfinnwallet-link.vercel.app/', 'dfinnwallet://');
  }

export function handleDeeplinkOnFirstOpen(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  toast?: ToastType,
) {
  Linking.getInitialURL()
    .then(url => {
      if (!url || prevDeeplinkUrl === url) {
        return;
      }
      prevDeeplinkUrl = url;
      if (url === 'dfinnwallet') {
        const urlParsed = new urlParse(url);
        if (urlParsed.hostname === 'wc') {
          const decodedWcUrl = queryString.decode(urlParsed.query.slice(5));
          const finalWcUrl = Object.keys(decodedWcUrl)[0];
          connectWalletConnect(finalWcUrl, toast);
        }
        Linking.openURL(url);
      } else if (getProtocol(url) === 'https') {
        const urlParsed = new urlParse(url);
        if (urlParsed.pathname.split('/')[1] === 'browser') {
          // Format like: https://subwallet-link.vercel.app/browser?url=https://hackadot.subwallet.app/
          const finalUrl = queryString.parse(urlParsed.query)['?url'] || '';
          navigation.navigate('BrowserTabsManager', {
            url: Array.isArray(finalUrl) ? finalUrl[0] : finalUrl,
            name: '',
            isOpenTabs: false,
          });
          return;
        }

        if (urlParsed.pathname.split('/')[1] === 'wc') {
          const decodedWcUrl = queryString.decode(urlParsed.query.slice(5));
          const finalWcUrl = Object.keys(decodedWcUrl)[0];
          connectWalletConnect(finalWcUrl, toast);
        }
      }
    })
    .catch(e => console.warn('e', e));
}