import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query'

import { ApiAuthResponse, ApiMessageResponse } from '@type/api'

import axios from '../axios/client'

export const getAuth = async () => {
  try {
    const { data } = await axios.get('/auth')
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const useGetAuth = (
  options?: Partial<UseQueryOptions<ApiAuthResponse, any, any>> //eslint-disable-line
) => {
  return useQuery<ApiAuthResponse, Error>({
    queryKey: ['auth', 'status'],
    queryFn: () => getAuth(),
    ...options
  })
}

export const getGoogleSignIn = async () => {
  try {
    const { data } = await axios.get('/auth/google')
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const usePostGoogleSignIn = (
  options?: UseQueryOptions<ApiMessageResponse, any, any> //eslint-disable-line
) => {
  return useQuery<ApiMessageResponse, Error>({
    queryKey: ['google', 'signin'],
    queryFn: () => getGoogleSignIn(),
    ...options
  })
}

export const postLogout = async () => {
  try {
    const { data } = await axios.post('/auth/logout')
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const usePostLogout = (
  options?: UseMutationOptions<ApiMessageResponse, any, any> //eslint-disable-line
) => {
  return useMutation<ApiMessageResponse, Error>({
    mutationKey: ['logout'],
    mutationFn: () => postLogout(),
    ...options
  })
}
