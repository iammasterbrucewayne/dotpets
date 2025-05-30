'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  // TODO: Get the `extension` state and `connect`, `disconnect` wallet functions from `useWallet` hook

  // TODO: Add state variables for:
  // - `availableExtensions` (string[])
  // - `accounts` (InjectedPolkadotAccount[])
  // - `error` (string | null)

  // TODO: Add `useEffect` to get available wallet extensions when component mounts
  // Hint: Use `getWalletExtensions()` from `lib/wallet`

  // TODO: Add `useEffect` to subscribe to account changes when wallet is connected
  // Hint: Use the `subscribe` method from the `InjectedExtension` interface

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Connection</CardTitle>
          <CardDescription>Connect your wallet to interact with the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* TODO: Add conditional rendering to show error message if error exists */}
          {false && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {/* TODO: Display the error message here */}
                Error message
              </AlertDescription>
            </Alert>
          )}

          {/* TODO: Add conditional rendering to show different UI based on whether a wallet is connected */}
          {false ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Connected Wallet</h3>
                  <p className="text-muted-foreground text-sm">
                    {/* TODO: Display the connected wallet name */}
                    Wallet Name
                  </p>
                </div>
                {/* TODO: Call the `disconnect` function when clicked */}
                <Button variant="destructive" onClick={() => {}}>
                  Disconnect
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Connected Accounts</h3>
                <div className="space-y-2">
                  {/* TODO: Map through the `accounts` array to display each account address */}
                  <div className="bg-muted rounded-md p-2">Account address will appear here</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-medium">Available Wallets</h3>
              <div className="grid gap-2">
                {/* TODOs:
                - Map through `availableExtensions` to create connect buttons for each wallet
                - Call the `connect` function when a wallet button is clicked
                - Handle any errors during the connection process */}
                <Button onClick={() => {}}>Connect Wallet</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
