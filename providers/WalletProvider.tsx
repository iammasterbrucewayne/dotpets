'use client';

import { InjectedExtension, InjectedPolkadotAccount } from 'polkadot-api/pjs-signer';

import { createContext, useContext, useState } from 'react';

import { connectWallet } from '@/lib/wallet';

// Context for the wallet provider to store the wallet extension, connect function, and accounts
const WalletContext = createContext<{
  extension: InjectedExtension | null;
  accounts: InjectedPolkadotAccount[];
  connect: (extension: string) => Promise<void>;
  disconnect: () => void;
}>({
  extension: null,
  accounts: [],
  connect: async () => {},
  disconnect: () => {},
});

// Provider for the wallet context
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [extension, setExtension] = useState<InjectedExtension | null>(null);
  const [accounts, setAccounts] = useState<InjectedPolkadotAccount[]>([]);

  const connect = async (extension: string) => {
    const connected = await connectWallet(extension);
    setExtension(connected);
    setAccounts(connected.getAccounts());
  };

  const disconnect = () => {
    extension?.disconnect();
    setExtension(null);
    setAccounts([]);
  };

  return (
    <WalletContext.Provider value={{ extension, connect, accounts, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

// Hook to use the wallet context
export const useWallet = () => useContext(WalletContext);
