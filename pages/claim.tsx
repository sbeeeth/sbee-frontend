import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Spinner } from '@nextui-org/react'
import { serializeError } from 'eth-rpc-errors'
import numeral from 'numeral'
import { Address } from 'viem'
import Web3 from 'web3'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import BigNumber from 'bignumber.js'
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import ClaimABI from '@abis/SbeeTokenClaim.json'
import Button from '@components/Button/Button'
import Footer from '@components/Layout/Footer'
import { DiscordURL } from '@constants/config'
import { useGetAirdrop, useGetAirdropAccount } from '@services/api/airdrop'
import { useStore } from '@store/store'
import { calcTotal } from '@utils/common'

const Sign: NextPage = () => {
  const router = useRouter()

  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const {
    data: claimData,
    isPending: isClaimLoading,
    writeContract
  } = useWriteContract()

  const [isGithubConnected, setIsGithubConnected] = useState(false)
  const [isClaimed, setIsClaimed] = useState(false)
  const [hasAirdrop, setHasAirdrop] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)
  const [totalAirdrop, setTotalAirdrop] = useState('0')

  const setAirdrop = useStore((store) => store.setAirdrop)

  const { isLoading: isTransacting, data: resultData } =
    useWaitForTransactionReceipt({
      hash: claimData,
      query: { enabled: claimData !== undefined }
    })

  const {
    data: airdropData,
    isFetching,
    refetch
  } = useGetAirdrop(address, {
    enabled: !!hasChecked
  })

  const { data: accountData, isFetching: isAccountFetching } =
    useGetAirdropAccount(address, {
      enabled: !!address
    })

  const isLoading = isFetching

  useEffect(() => {
    if (accountData && accountData.githubUsername) {
      setIsGithubConnected(true)
    }
  }, [accountData])

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.ethereum.enable()
    }
  }, [])

  useEffect(() => {
    if (router.query?.github) {
      setIsGithubConnected(true)
    }
  }, [router.query?.github])

  useEffect(() => {
    if (resultData) {
      refetch()
      toast.success('Claim successful')
    }
  }, [refetch, resultData])

  useEffect(() => {
    if (airdropData?.data) {
      setAirdrop(airdropData?.data)

      const total = calcTotal(airdropData.data)
      if (total.isGreaterThan(0)) {
        setHasAirdrop(true)
      }

      setTotalAirdrop(total.dividedBy(10 ** 18).toString())
    }

    if (airdropData?.message === 'error.is-claimed') {
      setIsClaimed(true)
    }
  }, [setAirdrop, airdropData])

  useEffect(() => {
    if (!address) {
      setHasChecked(false)
      setIsClaimed(false)
    }
  }, [address])

  const handleWalletConnect = () => {
    openConnectModal?.()
  }

  const handleGithubConnect = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/github?wallet=${address}`,
      '_self'
    )
  }

  const handleCheckEligibility = () => {
    refetch()
    setHasChecked(true)
  }

  const handleClaim = () => {
    if (airdropData?.data) {
      writeContract(
        {
          address: process.env.NEXT_PUBLIC_CLAIM_ADDRESS as Address,
          abi: ClaimABI,
          functionName: 'claim',
          args: [
            airdropData?.data.developerAmount,
            airdropData?.data.openSourceContributorAmount,
            airdropData?.data.nftContractCreatorAmount,
            airdropData?.data.gitcoinDonorAmount,
            airdropData?.data.ensHolderAmount,
            airdropData?.data.nftHolderAmount,
            airdropData?.data.memeHolderAmount,
            airdropData?.data.signature
          ]
        },
        {
          onSuccess: () => {},
          onError: (err) => {
            const error: any = serializeError(err) // eslint-disable-line
            console.log(error)
            toast.error(error?.data?.originalError.cause.reason)
          }
        }
      )
    }
  }

  const handleAddToken = async () => {
    try {
      const wasAdded = await window.web3.currentProvider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
            symbol: 'SBEE',
            decimals: 18,
            image: ''
          }
        }
      })

      if (wasAdded) {
        console.log('Token was added')
      } else {
        console.log('Token was not added')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-[calc(100vh-70px)] flex flex-col items-center justify-center pt-4'>
      {isClaimed && BigNumber(totalAirdrop).isEqualTo(0) && (
        <div
          className='flex-1 flex items-center justify-center w-fit max-w-[100vw] relative
            overflow-hidden sm:overflow-visible'
        >
          <div
            className='bg-co-bg-white px-6 sm:px-16 pt-12 pb-16 rounded-xl text-co-text-black
              max-w-[624px] relative z-10 mx-4 sm:mx-0 flex flex-col items-center
              justify-center'
          >
            <Image
              src='/images/svg/claim-success.svg'
              alt='claimed'
              width={264}
              height={261}
              className='md:w-[264px] md:h-[261px] w-[214px] h-[210px]'
            />
            <p className='mt-10 mb-14 text-[24px] sm:text-[32px] text-center'>
              Congrats! You’ve claimed your $SBEE tokens
            </p>
            <Button
              color='primary'
              className='rounded-lg shadow-button'
              onClick={() => {
                router.push('/staking')
              }}
            >
              Stake $SBEE to earn more
            </Button>
            <Button
              color='default'
              className='rounded-lg shadow-button'
              onClick={handleAddToken}
            >
              Add $SBEE to wallet
            </Button>
          </div>
        </div>
      )}

      {(!hasChecked || isLoading) && !isClaimed && (
        <div className='flex-1 flex items-center justify-center w-fit relative'>
          <Image
            src='/images/svg/sign-sharkbee.svg'
            alt='shark bee'
            width={166}
            height={144}
            className='absolute right-[-146px] hidden sm:block'
          />
          {!isLoading && (
            <div
              className='bg-co-bg-white px-6 sm:px-16 pt-12 pb-16 rounded-xl text-co-text-black
                max-w-[624px] relative z-10 mx-4 sm:mx-0'
            >
              <h2 className='text-[24px] sm:text-[32px] font-bold text-center'>
                LET’S GET STARTED!
              </h2>
              <p className='text-md sm:text-lg text-center opacity-50 mb-12 mt-4'>
                CONNECT YOUR WALLET TO UNVEIL YOUR $SBEE REWARDS
              </p>
              <div
                className='rounded-xl p-4 bg-co-bg-6 flex flex-col sm:flex-row text-sm sm:text-lg
                  justify-between items-start sm:items-center gap-2'
              >
                <span>1. CONNECT YOUR WALLET</span>
                {isConnected ? (
                  <Image
                    src='/images/svg/connected.svg'
                    width={20}
                    height={20}
                    alt='connected'
                  />
                ) : (
                  <Button
                    color='primary'
                    className='rounded-lg shadow-button'
                    onClick={handleWalletConnect}
                  >
                    Connect
                  </Button>
                )}
              </div>
              <div
                className='rounded-xl p-4 bg-co-bg-6 flex flex-col sm:flex-row text-sm sm:text-lg
                  justify-between items-start sm:items-center gap-2 mt-4'
              >
                <span>
                  2. LINK YOUR GITHUB
                  <span className='opacity-50'>(optional)</span>
                </span>
                {isAccountFetching && <Spinner color='default' size='sm' />}
                {!isAccountFetching && isGithubConnected && (
                  <Image
                    src='/images/svg/connected.svg'
                    width={20}
                    height={20}
                    alt='connected'
                  />
                )}
                {!isAccountFetching && !isGithubConnected && (
                  <Button
                    color='primary'
                    className='rounded-lg shadow-button'
                    onClick={handleGithubConnect}
                    disabled={!isConnected}
                  >
                    Connect
                  </Button>
                )}
              </div>
              <div className='flex items-center justify-center'>
                {isConnected && (
                  <Button
                    className='rounded-lg font-bold shadow-button mt-8 py-5 w-fit mx-auto'
                    isLoading={isFetching && hasChecked}
                    onClick={handleCheckEligibility}
                  >
                    CHECK ELIGIBILITY
                  </Button>
                )}
              </div>
            </div>
          )}
          {isLoading && <Spinner label='Loading...' color='warning' />}
        </div>
      )}
      {!isLoading && hasChecked && hasAirdrop && (
        <div
          className='flex-1 flex items-center justify-center w-fit max-w-[100vw] relative
            overflow-hidden sm:overflow-visible'
        >
          <Image
            src='/images/svg/check-success-bee-1.svg'
            alt='shark bee'
            width={163}
            height={167}
            className='absolute right-[-40px] w-[103px] h-[105px] sm:w-[163px] sm:h-[167px]
              sm:right-[-98px] z-[20] bottom-[34px]'
          />
          <Image
            src='/images/svg/check-success-bee-2.svg'
            alt='shark bee'
            width={265}
            height={173}
            className='absolute left-[-211px] top-[57px] hidden sm:block'
          />
          <div
            className='bg-co-bg-white px-6 sm:px-16 pt-12 pb-16 rounded-xl text-co-text-black
              max-w-[624px] relative z-10 mx-4 sm:mx-0'
          >
            <div className='flex flex-col items-center justify-center'>
              <p className='text-center text-[24px] sm:text-[32px]'>
                Hooray! Your $SBEE reward is ready for you!
              </p>
              <div
                className='text-[24px] sm:text-[40px] text-co-text-white rounded-[20px] bg-co-bg-green
                  w-full text-center mt-10 sm:mt-4 mb-10 sm:mb-6'
              >
                {numeral(totalAirdrop).format('0,0')} $SBEE
              </div>
              <div className='flex flex-col items-center justify-center text-md gap-1'>
                <span>You qualify for:</span>

                {airdropData?.data &&
                  BigNumber(airdropData?.data.developerAmount).isGreaterThan(
                    0
                  ) && (
                    <p>
                      {numeral(
                        BigNumber(airdropData.data.developerAmount)
                          .dividedBy(10 ** 18)
                          .toString()
                      ).format('0,0')}{' '}
                      $SBEE as Contract Developers
                    </p>
                  )}
                {airdropData?.data &&
                  BigNumber(
                    airdropData?.data.openSourceContributorAmount
                  ).isGreaterThan(0) && (
                    <p>
                      {numeral(
                        BigNumber(airdropData.data.openSourceContributorAmount)
                          .dividedBy(10 ** 18)
                          .toString()
                      ).format('0,0')}{' '}
                      $SBEE as Open Source Contributor
                    </p>
                  )}
                {airdropData?.data &&
                  BigNumber(
                    airdropData?.data.nftContractCreatorAmount
                  ).isGreaterThan(0) && (
                    <p>
                      {numeral(
                        BigNumber(airdropData.data.nftContractCreatorAmount)
                          .dividedBy(10 ** 18)
                          .toString()
                      ).format('0,0')}{' '}
                      $SBEE as NFT Creator
                    </p>
                  )}
                {airdropData?.data &&
                  BigNumber(airdropData?.data.gitcoinDonorAmount).isGreaterThan(
                    0
                  ) && (
                    <p>
                      {numeral(
                        BigNumber(airdropData.data.gitcoinDonorAmount)
                          .dividedBy(10 ** 18)
                          .toString()
                      ).format('0,0')}{' '}
                      $SBEE as Gitcoin Donor
                    </p>
                  )}
                {airdropData?.data &&
                  BigNumber(airdropData?.data.ensHolderAmount).isGreaterThan(
                    0
                  ) && (
                    <p>
                      {numeral(
                        BigNumber(airdropData.data.ensHolderAmount)
                          .dividedBy(10 ** 18)
                          .toString()
                      ).format('0,0')}{' '}
                      $SBEE as ENS Holder
                    </p>
                  )}
                {airdropData?.data &&
                  BigNumber(airdropData?.data.nftHolderAmount).isGreaterThan(
                    0
                  ) && (
                    <p>
                      {numeral(
                        BigNumber(airdropData.data.nftHolderAmount)
                          .dividedBy(10 ** 18)
                          .toString()
                      ).format('0,0')}{' '}
                      $SBEE as NFT Holder
                    </p>
                  )}
                {airdropData?.data &&
                  BigNumber(airdropData?.data.memeHolderAmount).isGreaterThan(
                    0
                  ) && (
                    <p>
                      {numeral(
                        BigNumber(airdropData.data.memeHolderAmount)
                          .dividedBy(10 ** 18)
                          .toString()
                      ).format('0,0')}{' '}
                      $SBEE as Meme Coin Holder
                    </p>
                  )}
              </div>
              <Button
                color='primary'
                className='rounded-lg shadow-button mt-8 mb-6 text-lg py-5'
                onClick={handleClaim}
                isLoading={isClaimLoading || isTransacting}
                disabled={isClaimed}
              >
                CLAIM $SBEE
              </Button>
              <span
                className='text-md opacity-60 cursor-pointer'
                onClick={() => router.push('/')}
              >
                I’ll claim later
              </span>
            </div>
          </div>
        </div>
      )}
      {!isLoading && hasChecked && !isClaimed && !hasAirdrop && (
        <div
          className='flex-1 flex items-center justify-center w-fit max-w-[100vw] relative
            overflow-hidden sm:overflow-visible'
        >
          <div
            className='bg-co-bg-white px-6 sm:px-16 pt-12 pb-16 rounded-xl text-co-text-black
              max-w-[624px] relative z-10 mx-4 sm:mx-0'
          >
            <div className='flex flex-col items-center justify-center'>
              <p className='text-center text-[20px] sm:text-[32px] opacity-60 mt-4'>
                Looks like you haven’t qualified for $SBEE tokens this airdrop
              </p>
              <div className='flex flex-col items-center justify-center text-md gap-1 mt-4'>
                <span>But here&apos;s a sweet deal: </span>
                <p>1. Follow us on Twitter </p>
                <p>2. Share a tweet with hashtag #SBEE </p>
                <p>3. Join Discord to Earn 20,000 $SBEE </p>
              </div>
              <Link href={DiscordURL} target='_blank'>
                <Button
                  color='primary'
                  className='rounded-lg shadow-button mt-8 mb-6 text-lg py-5'
                >
                  JOIN $SBEE DISCORD!
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Sign
