import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, bsc, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import App from './App';
import './index.css';

const config = createConfig(
  getDefaultConfig({
    alchemyId: import.meta.env.VITE_ALCHEMY_ID,
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    appName: "Shy-Sniper",
    chains: [mainnet, bsc, sepolia],
    transports: {
      [mainnet.id]: http(),
      [bsc.id]: http(),
      [sepolia.id]: http(),
    },
    autoConnect: true,
  })
);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider 
          customTheme={{
            "--ck-font-family": "system-ui, -apple-system, sans-serif",
            "--ck-border-radius": "8px",
          }}
          options={{
            language: 'zh-CN',
            hideBalance: false,
            hideTooltips: false,
          }}
        >
          <App />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);