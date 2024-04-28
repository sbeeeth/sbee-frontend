export type ApiResponse = {
  statusCode: number
  message?: string
}

export type ApiMessageResponse = {
  message: string
}

export type ApiAuthResponse = ApiResponse & {
  data: {
    isAuthenticated: boolean
  }
}

export type ApiUserResponse = ApiResponse & {
  user: ApiUser
}

export type ApiUser = {
  name: string | null
  firstName: string
  id: string
  lastName: string
  email: string
  profileImageUrl: string
}

export type ApiAirdrop = {
  developerAmount: string
  openSourceContributorAmount: string
  nftContractCreatorAmount: string
  gitcoinDonorAmount: string
  ensHolderAmount: string
  nftHolderAmount: string
  memeHolderAmount: string
  signature: string
}

export type ApiAirdropKeys = keyof ApiAirdrop

export type ApiAirdropResponse = ApiResponse & {
  data: ApiAirdrop
}

export type ApiAirdropAccountResponse = ApiResponse & {
  address: string
  githubUsername: string
}
