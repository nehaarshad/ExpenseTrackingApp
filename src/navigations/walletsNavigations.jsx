import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Wallets from '../views/(tabs)/myWallet';
import AddWallet from '../views/wallets/addWallet';
import EditWallet from '../views/wallets/editWallet';

const WalletStack = createNativeStackNavigator();

const WalletNavigator = () => {

  return (
      <WalletStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='myWallets'>
        
            <WalletStack.Screen name="myWallets" component={Wallets} />
            <WalletStack.Screen name="addWallets" component={AddWallet} />
            <WalletStack.Screen name="editWallets" component={EditWallet} />
       
      </WalletStack.Navigator>
  );
};

export default WalletNavigator;