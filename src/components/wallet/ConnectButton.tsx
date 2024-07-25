import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {Account} from './Account';
import {WalletOptions} from './Wallet-options';

function ConnectWallet() {
  const { isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once component has mounted
  }, []);

  // Only attempt to render based on isConnected after component has mounted
  if (!isClient) return null; // Render nothing until client-side

  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default ConnectWallet;
