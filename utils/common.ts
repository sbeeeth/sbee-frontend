import BigNumber from 'bignumber.js'

import { ApiAirdrop } from '@type/api'

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const calcTotal = (data?: ApiAirdrop) => {
  if (!data) return BigNumber(0)

  const total = BigNumber(data.developerAmount)
    .plus(BigNumber(data.openSourceContributorAmount))
    .plus(BigNumber(data.nftContractCreatorAmount))
    .plus(BigNumber(data.gitcoinDonorAmount))
    .plus(BigNumber(data.nftHolderAmount))
    .plus(BigNumber(data.ensHolderAmount))
    .plus(BigNumber(data.memeHolderAmount))

  console.log(total)

  return total
}

export function formatAddress(address?: string): string {
  if (!address) return ''
  const prefix = address.slice(0, 6)
  const suffix = address.slice(-4)
  return `${prefix}...${suffix}`
}
