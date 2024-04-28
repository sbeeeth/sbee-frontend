import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { ApiAirdropAccountResponse, ApiAirdropResponse } from '@type/api'

import axios from '../axios/client'

export const getAirdrop = async (address?: string) => {
  if (!address) {
    return undefined
  }

  const url = `/airdrop/${address}`

  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw error
  }
}

export const useGetAirdrop = (
  address?: string,
  options?: Partial<UseQueryOptions<ApiAirdropResponse, any, any>> //eslint-disable-line
) => {
  return useQuery<ApiAirdropResponse, Error>({
    queryKey: ['airdrop', address],
    queryFn: () => getAirdrop(address),
    ...options
  })
}

export const getAirdropAccount = async (address?: string) => {
  if (!address) {
    return undefined
  }

  const url = `/airdrop/account/${address}`

  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw error
  }
}

export const useGetAirdropAccount = (
  address?: string,
  options?: Partial<UseQueryOptions<ApiAirdropAccountResponse, any, any>> //eslint-disable-line
) => {
  return useQuery<ApiAirdropAccountResponse, Error>({
    queryKey: ['airdrop', 'account', address],
    queryFn: () => getAirdropAccount(address),
    ...options
  })
}
