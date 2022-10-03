import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StakeActionProps } from 'routes/index';
import { StakeActionStackParamList } from 'routes/staking/stakeAction';
import StakeAuth from 'screens/Staking/Stake/StakeAuth';
import StakeConfirm from 'screens/Staking/Stake/StakeConfirm';
import StakeResult from 'screens/Staking/Stake/StakeResult';

const StakeActionScreen = ({ route: { params: stakeParams } }: StakeActionProps) => {
  const StakeActionStack = createNativeStackNavigator<StakeActionStackParamList>();

  return (
    <StakeActionStack.Navigator screenOptions={{ headerShown: false }}>
      <StakeActionStack.Screen name="StakeConfirm" component={StakeConfirm} initialParams={stakeParams} />
      <StakeActionStack.Screen name="StakeAuth" component={StakeAuth} />
      <StakeActionStack.Screen name="StakeResult" component={StakeResult} />
    </StakeActionStack.Navigator>
  );
};

export default React.memo(StakeActionScreen);
