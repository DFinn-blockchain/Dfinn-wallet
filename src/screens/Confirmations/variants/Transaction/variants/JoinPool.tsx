import { ConfirmationContent } from 'components/Confirmation';
import React from 'react';
import { CommonTransactionInfo } from 'components/common/Confirmation/CommonTransactionInfo';
import { BaseTransactionConfirmationProps } from 'screens/Confirmations/variants/Transaction/variants/Base';
import { RequestStakePoolingBonding } from '@subwallet/extension-base/background/KoniTypes';
import useGetNativeTokenBasicInfo from 'hooks/useGetNativeTokenBasicInfo';
import MetaInfo from 'components/MetaInfo';

type Props = BaseTransactionConfirmationProps;

const StakeTransactionConfirmation = ({ transaction }: Props) => {
  const data = transaction.data as RequestStakePoolingBonding;
  const { decimals, symbol } = useGetNativeTokenBasicInfo(transaction.chain);

  return (
    <ConfirmationContent isFullHeight>
      <CommonTransactionInfo address={transaction.address} network={transaction.chain} />

      <MetaInfo style={{ marginTop: 12 }} hasBackgroundWrapper>
        <MetaInfo.Number decimals={decimals} label={'Amount'} suffix={symbol} value={data.amount} />
        <MetaInfo.Number
          decimals={decimals}
          label={'Estimated fee'}
          suffix={symbol}
          value={transaction.estimateFee?.value || 0}
        />
      </MetaInfo>
    </ConfirmationContent>
  );
};

export default StakeTransactionConfirmation;
