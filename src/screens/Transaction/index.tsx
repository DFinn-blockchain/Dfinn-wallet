import React, { useCallback } from 'react';
import { ContainerWithSubHeader } from 'components/ContainerWithSubHeader';
import { View } from 'react-native';
import { Button, PageIcon, Typography } from 'components/design-system-ui';
import { CheckCircle } from 'phosphor-react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import TransactionDoneStyle from './TransactionDone/style';
import { RootNavigationProps, TransactionDoneProps } from 'routes/index';
import { useNavigation } from '@react-navigation/native';
import { MarginBottomForSubmitButton } from 'styles/sharedStyles';
import { SubmitButton } from '../../components/SubmitButton';
import { ColorMap } from '../../styles/color';

export const TransactionDone = ({
  route: {
    params: { chain, id, path },
  },
}: TransactionDoneProps) => {
  const theme = useSubWalletTheme().swThemes;
  const navigation = useNavigation<RootNavigationProps>();
  const _style = TransactionDoneStyle(theme);

  const viewInExplorer = useCallback(() => {
    if (chain && id) {
      navigation.navigate('History', { chain, transactionId: id });
    } else {
      navigation.navigate('History', {});
    }
  }, [chain, id, navigation]);

  const goHome = useCallback(() => {
    if (path === 'Staking') {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { screen: 'Staking', params: { screen: 'StakingBalances' } } }],
      });
    }

    if (path === 'NFT') {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { screen: 'NFTs', params: { screen: 'CollectionList' } } }],
      });
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { screen: 'Tokens', params: { screen: 'TokenGroups' } } }],
    });
  }, [navigation, path]);

  return (
    <ContainerWithSubHeader onPressBack={goHome} title={'Successful'}>
      <View style={_style.transactionDoneContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <PageIcon icon={CheckCircle} color={theme.colorSuccess} />
          <Typography.Title style={_style.transactionDoneTitle}>{'You’re all done!'}</Typography.Title>

          <Typography.Text style={_style.transactionDoneMessage}>
            {'Your request has been sent. You can track its progress on the Transaction History page.'}
          </Typography.Text>
        </View>

        <View style={{ width: '100%', ...MarginBottomForSubmitButton }}>
          <SubmitButton
            onPress={viewInExplorer}
            style={{ marginBottom: 16 }}
            title="View transaction"
            backgroundColor={ColorMap.dark2}
          />
          {/* <Button onPress={viewInExplorer} style={{ marginBottom: 16 }} type={'secondary'}>
            {'View transaction'}
          </Button> */}
          <SubmitButton onPress={goHome} title="Back to home" />
          {/* <Button onPress={goHome}>{'Back to home'}</Button> */}
        </View>
      </View>
    </ContainerWithSubHeader>
  );
};
