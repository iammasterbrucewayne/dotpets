'use client';

import { AlertCircle } from 'lucide-react';
import { InjectedPolkadotAccount } from 'polkadot-api/pjs-signer';

import { useEffect, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { getWalletExtensions } from '@/lib/wallet';

import { useWallet } from '@/providers/WalletProvider';

export default function Home() {
  // Utility functions to connect, disconnect, and get the state of the wallet
  const { extension, connect, disconnect } = useWallet();

  // List of wallet extensions installed in the user's browser
  const [availableExtensions, setAvailableExtensions] = useState<string[]>([]);
  // List of accounts authorized to connect to the application by the wallet
  const [accounts, setAccounts] = useState<InjectedPolkadotAccount[]>([]);
  // Error message to display to the user
  const [error, setError] = useState<string | null>(null);

  // Get the list of wallet extensions installed in the user's browser
  useEffect(() => {
    const extensions = getWalletExtensions();
    setAvailableExtensions(extensions);
  }, []);

  // Subscribe to account changes when wallet is connected
  useEffect(() => {
    if (extension) {
      const unsubscribe = extension.subscribe((accounts) => {
        setAccounts(accounts);
      });
      return () => unsubscribe();
    }
  }, [extension]);

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Connection</CardTitle>
          <CardDescription>Connect your wallet to interact with the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {extension ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Connected Wallet</h3>
                  <p className="text-muted-foreground text-sm">{extension.name}</p>
                </div>
                <Button variant="destructive" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Connected Accounts</h3>
                <div className="space-y-2">
                  {accounts.map((account) => (
                    <div className="bg-muted rounded-md p-2" key={account.address}>
                      {account.address}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-medium">Available Wallets</h3>
              <div className="grid gap-2">
                {availableExtensions.map((extension) => (
                  <Button
                    key={extension}
                    onClick={() =>
                      connect(extension)
                        .then(() => setError(null))
                        .catch((error) => setError(error.message))
                    }
                  >
                    Connect {extension}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
