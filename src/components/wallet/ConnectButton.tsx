import React from 'react';
import { ConnectKitButton } from 'connectkit';

export default function ConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        if (isConnected && address) {
          return (
            <button
              onClick={show}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              {ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}
            </button>
          );
        }

        return (
          <button
            onClick={show}
            disabled={isConnecting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? '连接中...' : '连接钱包'}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}