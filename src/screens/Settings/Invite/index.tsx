import { Text, StyleProp, TextStyle, View, SafeAreaView, TouchableOpacity, Button } from "react-native"
import Share from "react-native-share";
import { TitleFont, FontSize5 } from "styles/sharedStyles";
import { ColorMap } from 'styles/color';
import { Copy } from 'phosphor-react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Suspense, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import { SubScreenContainer } from "components/SubScreenContainer";
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SVGImages } from "assets/index";
import { ScrollView } from "react-native-gesture-handler";

const firebaseConfig = {
    apiKey: 'AIzaSyAgjyn8O8O2AV5_exaRdFezLmIoW5D1mvk',
    authDomain: 'dfinn-wallet-1690480368385.firebaseapp.com',
    projectId: 'dfinn-wallet-1690480368385',
    storageBucket: 'dfinn-wallet-1690480368385.appspot.com',
    messagingSenderId: '38762172043',
    appId: '1:38762172043:web:50f9a1b4767c4e9846ce8e',
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

const subHeaderTextStyle: StyleProp<TextStyle> = {
    ...TitleFont,
    fontSize: 28,
    color: ColorMap.light,
    marginLeft: 20,
    marginTop: '10%'
  };
const textStyle: StyleProp<TextStyle> = {
    fontSize: 16,
    color: ColorMap.light,
    marginTop: '5%',
    marginLeft: 20,
};
const invitationCode: StyleProp<TextStyle> = {
    backgroundColor: ColorMap.dark2,
    borderRadius: 4,
    padding: 15,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
};
const invitationLink: StyleProp<TextStyle> = {
    backgroundColor: ColorMap.dark2,
    borderRadius: 4,
    padding: 15,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: '1%',

};
const sticyButton: StyleProp<TextStyle> = {
    width: '85%',
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 100,
    marginLeft: 30,
    marginBottom: 20,
    padding: 20,
    color: ColorMap.light,
    justifyContent: 'space-between',
    alignItems: 'center',
}
export const Invite = () => {
    const [referralCode, setReferralCode] = useState('');
    const [referralCount, setReferralCount] = useState(0);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const navigation = useNavigation<RootNavigationProps>();

  useEffect(() => {  
    fetchWalletAddress();
    handleSignUp()
  }, [walletAddress]);

  const generateReferralCode = async () => {
    try {
      let referralCode = await AsyncStorage.getItem('referralCode');
      
      if (!referralCode) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        referralCode = '';
        for (let i = 0; i < 6; i++) {
          referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        await AsyncStorage.setItem('referralCode', referralCode);
      }
      setReferralCode(referralCode)
      return referralCode;
    } catch (error) {
      console.error('Error generating referral code:', error);
      return null;
    }
  };

  const fetchWalletAddress = async () => {
    try {
      const existingAddress = await AsyncStorage.getItem('walletAddress');
  
      if (!existingAddress) {
        const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/9acab0738fcc4f959fca4f91ab73c495');
        const wallet = ethers.Wallet.createRandom();
        const address = await wallet.connect(provider).getAddress();

        await AsyncStorage.setItem('walletAddress', address);
      }
      setWalletAddress(existingAddress);
      setReferralCode(await generateReferralCode(uuidv4()));
      fetchReferralInfo(walletAddress);
    } catch (error) {
      console.error('Error fetching wallet address:', error.message);
    }
  }
  const fetchReferralInfo = async (address: any) => {
    const encodedAddress = encodeURIComponent(address);
    const doc = await db.collection('users').doc(encodedAddress).get();
    console.log(doc,'d')
    if (doc.exists) {
      const data = doc.data();
      setReferralCount(data.referralCount);
    }
  };

  const handleSignUp = async () => {
    if (walletAddress) {
      const encodedAddress = encodeURIComponent(walletAddress);
      await db.collection('users').doc(encodedAddress).set({
        walletAddress,
        referralCode,
        referralCount: 0,
      });
      setIsSignedUp(true);
    }
  };
  const shareUrl = async () => {
    try {
      const shareOptions = {
        url: `https://dfinnwallet-link.vercel.app/${referralCode}`,
      };
      console.log(shareOptions.url)
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

    return(
        <SubScreenContainer title={'Invite'} navigation={navigation}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Text style={subHeaderTextStyle}>Discover new tokens and opportunities on Dfinn Wallet</Text>
              <Text style={textStyle}>Your invited friends will also recieve 10 points</Text>
              <View style={{ justifyContent: 'center', margin: 40 }}>
                <Suspense fallback={<View style={{ width: 100, height: 100 }} />}>
                  <SVGImages.FirstPageImg width={300} height={200}/>
                </Suspense>
              </View>
              <View style={invitationCode}>
                <Text style={{ ...TitleFont, fontSize: 16, color: ColorMap.light }}>Invitation code</Text>
                <Text onPress={shareUrl} style={{ ...TitleFont, fontSize: 14, color: ColorMap.light }}>{referralCode}{'   '}<Copy size={20} color={ColorMap.light} style={{marginBottom: -5}}/>
                </Text>
              </View>
              <View style={invitationLink}>
                <Text style={{ ...TitleFont, fontSize: 16, color: ColorMap.light }}>Invitation link</Text>
                <Text style={{ ...TitleFont, fontSize: 14, color: ColorMap.light }}>http...mCode={'   '}<Copy  style={{marginBottom: -5}} size={20} color={ColorMap.light}/></Text>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={shareUrl} style={sticyButton}>
              <Text style={{fontWeight: 'bold'}}>Invite Now</Text>
            </TouchableOpacity>
           
        </SubScreenContainer>
    )
}