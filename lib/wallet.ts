'use client';

import { connectInjectedExtension, getInjectedExtensions } from 'polkadot-api/pjs-signer';

// Get the list of installed wallet extensions
export const getWalletExtensions = () => {
  const extensions = getInjectedExtensions();
  return extensions;
};

// Connect to the specified wallet extension
export const connectWallet = async (extension: string) => {
  return await connectInjectedExtension(extension);
};
