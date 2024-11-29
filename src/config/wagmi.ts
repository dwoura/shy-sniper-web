import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { getDefaultConfig } from 'connectkit';
import { env } from './env';

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, sepolia],
    connectors: [injected()],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
    walletConnectProjectId: env.walletConnectProjectId,
    appName: 'Shy-Sniper',
  })
);