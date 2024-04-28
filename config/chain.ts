export type NetworkObject = {
  name: string
  chainId: number
  rpcUrl: string
  logoUrl: string
  explorerUrl: string
  explorerName: string
  nativeCoin: string
  type: 'mainnet' | 'testnet'
}

export const defaultNetworks: NetworkObject[] = [
  {
    name: 'ETH',
    chainId: 1,
    rpcUrl: `https://rpc.ankr.com/eth`,
    logoUrl: '/images/svg/eth.svg',
    explorerUrl: 'https://etherscan.io',
    explorerName: 'EtherScan',
    nativeCoin: 'ETH',
    type: 'mainnet'
  },
  {
    name: 'Polygon',
    chainId: 137,
    logoUrl: '/images/svg/polygon-logo.svg',
    rpcUrl: 'https://polygon-rpc.com/',
    explorerUrl: 'https://explorer-mainnet.maticvigil.com/',
    explorerName: 'PolygonScan',
    nativeCoin: 'MATIC',
    type: 'mainnet'
  }
]
