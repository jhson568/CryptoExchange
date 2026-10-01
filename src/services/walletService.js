import { ethers } from 'ethers';
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import * as bitcoin from 'bitcoinjs-lib';

// Generate new seed phrase
export const generateSeedPhrase = () => {
  return bip39.generateMnemonic();
};

// Validate seed phrase
export const validateSeedPhrase = (mnemonic) => {
  return bip39.validateMnemonic(mnemonic);
};

// Create Ethereum wallet from seed phrase
export const createEthereumWallet = (mnemonic, index = 0) => {
  const hdNode = ethers.HDNodeWallet.fromMnemonic(
    ethers.Mnemonic.fromPhrase(mnemonic),
    `m/44'/60'/0'/0/${index}`
  );
  return {
    address: hdNode.address,
    privateKey: hdNode.privateKey,
    publicKey: hdNode.publicKey,
  };
};

// Create Bitcoin wallet from seed phrase (mainnet)
export const createBitcoinWallet = (mnemonic, index = 0) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
  const path = `m/44'/0'/0'/0/${index}`;
  const child = root.derivePath(path);
  
  const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey });
  
  return {
    address,
    privateKey: child.privateKey?.toString('hex'),
    publicKey: child.publicKey.toString('hex'),
    network: 'mainnet',
  };
};

// Create Solana wallet from seed phrase (mainnet)
export const createSolanaWallet = (mnemonic, index = 0) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);
  const path = `m/44'/501'/0'/0'/${index}'`;
  const child = root.derivePath(path);
  
  // Simplified - use proper Solana derivation
  return {
    publicKey: child.publicKey.toString('hex'),
    privateKey: child.privateKey?.toString('hex'),
    network: 'mainnet-beta',
  };
};

// Create Polygon wallet (uses Ethereum derivation)
export const createPolygonWallet = (mnemonic, index = 0) => {
  const hdNode = ethers.HDNodeWallet.fromMnemonic(
    ethers.Mnemonic.fromPhrase(mnemonic),
    `m/44'/137'/0'/0/${index}`
  );
  return {
    address: hdNode.address,
    privateKey: hdNode.privateKey,
    publicKey: hdNode.publicKey,
    network: 'mainnet',
  };
};

// Create BSC wallet (uses Ethereum derivation)
export const createBSCWallet = (mnemonic, index = 0) => {
  const hdNode = ethers.HDNodeWallet.fromMnemonic(
    ethers.Mnemonic.fromPhrase(mnemonic),
    `m/44'/60'/0'/0/${index}`
  );
  return {
    address: hdNode.address,
    privateKey: hdNode.privateKey,
    publicKey: hdNode.publicKey,
    network: 'mainnet',
  };
};

// Create complete wallet with all chains
export const createMultiChainWallet = (mnemonic) => {
  if (!validateSeedPhrase(mnemonic)) {
    throw new Error('Invalid seed phrase');
  }

  return {
    seedPhrase: mnemonic,
    chains: {
      ethereum: createEthereumWallet(mnemonic),
      bitcoin: createBitcoinWallet(mnemonic),
      solana: createSolanaWallet(mnemonic),
      polygon: createPolygonWallet(mnemonic),
      bsc: createBSCWallet(mnemonic),
    },
    createdAt: new Date().toISOString(),
  };
};

// Import wallet from seed phrase
export const importWalletFromSeed = (seedPhrase) => {
  return createMultiChainWallet(seedPhrase);
};
