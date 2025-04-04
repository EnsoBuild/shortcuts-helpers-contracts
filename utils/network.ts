import 'dotenv/config';
import {HDAccountsUserConfig, HttpNetworkUserConfig, NetworksUserConfig} from 'hardhat/types';

export function nodeUrl(networkName: string): string {
  if (networkName) {
    const uri = process.env['ETH_NODE_URI_' + networkName.toUpperCase()];
    if (uri && uri !== '') {
      return uri;
    }
  }

  if (networkName === 'localhost') {
    // do not use ETH_NODE_URI
    return 'http://localhost:8545';
  }

  let uri = process.env.ETH_NODE_URI;
  if (uri) {
    uri = uri.replace('{{networkName}}', networkName);
  }
  if (!uri || uri === '') {
    // throw new Error(`environment variable "ETH_NODE_URI" not configured `);
    return '';
  }
  if (uri.indexOf('{{') >= 0) {
    throw new Error(`invalid uri or network not supported by node provider : ${uri}`);
  }
  return uri;
}

export function nodeHeaders(networkName: string): HttpNetworkUserConfig["httpHeaders"] | undefined {
  if (networkName) {
    const authToken = process.env['AUTH_TOKEN_' + networkName.toUpperCase()];
    if (authToken && authToken !== '') {
      return {
        "Authorization": `Bearer ${authToken}`
      }
    }
  }

  return undefined;
}

export function getMnemonic(networkName?: string): string {
  if (networkName) {
    const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== '') {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === '') {
    return 'Magenta Floppy Magenta Western Eyedroppers Knit Fuzzy Malodorous Khaki Late Eels When Mad Eastern Recipes Kick Fallen Malingering Wet Eggshells';
  }
  return mnemonic;
}

export function getPrivateKey(networkName?: string): string | undefined {
  if (networkName) {
    const privateKey = process.env['PRIVATE_KEY_' + networkName.toUpperCase()];
    if (privateKey && privateKey !== '') {
      return privateKey;
    }
  }

  const privateKey = process.env.PRIVATE_KEY;
  if (privateKey === '') {
    return;
  }
  return privateKey;
}

export function accounts(networkName?: string): any {
  const privateKey = getPrivateKey(networkName);
  if (privateKey) {
    return [privateKey];
  }
  const mnemonic = getMnemonic(networkName);

  return {mnemonic};
}

export function addForkConfiguration(networks: NetworksUserConfig): NetworksUserConfig {
  // While waiting for hardhat PR: https://github.com/nomiclabs/hardhat/pull/1542
  if (process.env.HARDHAT_FORK) {
    process.env.HARDHAT_DEPLOY_FORK = process.env.HARDHAT_FORK;
  }

  const currentNetworkName = process.env.HARDHAT_FORK;
  let forkURL: string | undefined = currentNetworkName && nodeUrl(currentNetworkName);
  let hardhatAccounts: HDAccountsUserConfig | undefined;
  if (currentNetworkName && currentNetworkName !== 'hardhat') {
    const currentNetwork = networks[currentNetworkName] as HttpNetworkUserConfig;
    if (currentNetwork) {
      forkURL = currentNetwork.url;
      if (
        currentNetwork.accounts &&
        typeof currentNetwork.accounts === 'object' &&
        'mnemonic' in currentNetwork.accounts
      ) {
        hardhatAccounts = currentNetwork.accounts;
      }
    }
  }

  const newNetworks = {
    ...networks,
    hardhat: {
      ...networks.hardhat,
      ...{
        accounts: hardhatAccounts,
        forking: forkURL
          ? {
              url: forkURL,
              blockNumber: process.env.HARDHAT_FORK_NUMBER ? parseInt(process.env.HARDHAT_FORK_NUMBER) : undefined,
            }
          : undefined,
        mining: process.env.MINING_INTERVAL
          ? {
              auto: false,
              interval: process.env.MINING_INTERVAL.split(',').map((v) => parseInt(v)) as [number, number],
            }
          : undefined,
      },
    },
  };
  return newNetworks;
}
