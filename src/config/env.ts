interface EnvConfig {
  walletConnectProjectId: string;
  apiBaseUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const env: EnvConfig = {
  walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};