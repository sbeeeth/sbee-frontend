import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'
import { Image, Input } from '@nextui-org/react'
import * as ethers from 'ethers'
import { Address } from 'viem'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import SbeeStakingABI from '@abis/SbeeStaking.json'
import SbeeABI from '@abis/SbeeToken.json'
import Button from '@components/Button/Button'
import { CopyIcon } from '@components/Icon/CopyIcon'
import { InfoIcon } from '@components/Icon/InfoIcon'
import { ShareIcon } from '@components/Icon/ShareIcon'
import { formatAddress } from '@utils/common'
import { diffDate } from '@utils/date'
import { convertAmount } from '@utils/number'

const startDate = '4/17/24 00:00 AM EST'
const endDate = '7/17/24 00:00 AM EST'
const dateDiff = diffDate(new Date(), new Date(endDate))

export interface SbeeStakingProps {}

const SbeeStaking: FC<SbeeStakingProps> = () => {
  const { address } = useAccount()
  const [, copyTokenAddress] = useCopyToClipboard()
  const [, copyStakingAddress] = useCopyToClipboard()

  const [amount, setAmount] = useState('0')
  const [userStaked, setUserStaked] = useState('0')
  const [totalStaked, setTotalStaked] = useState('0')
  const [totalStakers, setTotalStakers] = useState('0')
  const [totalEarned, setTotalEarned] = useState('0')
  const [userReward, setUserReward] = useState('0')

  const { data: balanceData, refetch: getBalance } = useBalance({
    address,
    token: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Address
  })

  const { data: allowanceData, refetch: getAllowance } = useReadContract({
    address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Address,
    abi: SbeeABI,
    functionName: 'allowance',
    args: [address, process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address],
    query: { enabled: !!address }
  })

  const { data: userStakedData, refetch: getUserStaked } = useReadContract({
    address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
    abi: SbeeStakingABI,
    functionName: 'userStake',
    args: [address],
    query: { enabled: !!address }
  })
  const { data: totalStakedData, refetch: getTotalStaked } = useReadContract({
    address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
    abi: SbeeStakingABI,
    functionName: 'totalStaked'
  })
  const { data: userRewardData, refetch: getUserReward } = useReadContract({
    address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
    abi: SbeeStakingABI,
    functionName: 'currentUserRewards',
    args: [address],
    query: { enabled: !!address }
  })
  const { data: totalEarnedData } = useReadContract({
    address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
    abi: SbeeStakingABI,
    functionName: 'accumulatedRewards',
    args: [address],
    query: { enabled: !!address }
  })
  const { data: totalStakersData, refetch: getTotalStakers } = useReadContract({
    address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
    abi: SbeeStakingABI,
    functionName: 'totalStakers'
  })

  useEffect(() => {
    if (totalEarnedData !== undefined) {
      const totalEarn = _.last(totalEarnedData as Array<number>)
      setTotalEarned(totalEarn?.toString() ?? '0')
    }
  }, [totalEarnedData])

  useEffect(() => {
    if (userRewardData !== undefined) {
      setUserReward(userRewardData?.toString() ?? '0')
    }
  }, [userRewardData])

  useEffect(() => {
    if (userStakedData !== undefined) {
      setUserStaked(userStakedData?.toString() ?? '0')
    }
  }, [userStakedData])

  useEffect(() => {
    if (totalStakedData !== undefined) {
      setTotalStaked(totalStakedData?.toString() ?? '0')
    }
  }, [totalStakedData])

  useEffect(() => {
    if (totalStakersData !== undefined) {
      setTotalStakers(totalStakersData?.toString() ?? '0')
    }
  }, [totalStakersData])

  const isStake =
    allowanceData &&
    BigNumber(allowanceData as string).isGreaterThanOrEqualTo(
      ethers.parseUnits(amount === '' ? '0' : amount, 18).toString()
    )

  const {
    data: approveData,
    isPending: isApproving,
    writeContract: approveAmount
  } = useWriteContract()

  const { data: approveTxData, isLoading: isApproveConfirming } =
    useWaitForTransactionReceipt({
      hash: approveData,
      query: { enabled: !!approveData }
    })

  const {
    data: stakeData,
    isPending: isStaking,
    writeContract: stakeAmount
  } = useWriteContract()

  const { data: stakeTxData, isLoading: isStakeConfirming } =
    useWaitForTransactionReceipt({
      hash: stakeData,
      query: { enabled: !!stakeData }
    })

  useEffect(() => {
    if (approveTxData) {
      getAllowance()
      toast.success('Approve successfully')
    }
  }, [approveTxData, getAllowance, getTotalStaked, getUserStaked])

  useEffect(() => {
    if (stakeTxData) {
      getAllowance()
      getBalance()
      getUserStaked()
      getTotalStaked()
      getTotalStakers()
      toast.success('Staked successfully')
    }
  }, [
    stakeTxData,
    getAllowance,
    getUserStaked,
    getTotalStaked,
    getTotalStakers,
    getBalance
  ])

  const {
    data: unstakeData,
    isPending: isUnstaking,
    writeContract: unstakeAmount
  } = useWriteContract()

  const { data: unstakeTxData, isLoading: isUnstakeConfirming } =
    useWaitForTransactionReceipt({
      hash: unstakeData,
      query: { enabled: !!unstakeData }
    })

  useEffect(() => {
    if (unstakeTxData) {
      getAllowance()
      getBalance()
      getUserStaked()
      getTotalStaked()
      getTotalStakers()
      toast.success('Unstaked successfully')
    }
  }, [
    unstakeTxData,
    getAllowance,
    getUserStaked,
    getTotalStaked,
    getTotalStakers,
    getBalance
  ])

  const {
    data: claimData,
    isPending: isClaiming,
    writeContract: claimAmount
  } = useWriteContract()

  const { data: claimTxData, isLoading: isClaimConfirming } =
    useWaitForTransactionReceipt({
      hash: claimData,
      query: { enabled: !!claimData }
    })

  useEffect(() => {
    if (claimTxData) {
      getUserReward()
      toast.success('Claimed successfully')
    }
  }, [claimTxData, getUserReward])

  const handleStake = () => {
    if (!isStake) {
      approveAmount({
        address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Address,
        abi: SbeeABI,
        functionName: 'approve',
        args: [
          process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
          ethers.parseUnits(amount, 18).toString()
        ]
      })
    } else {
      stakeAmount({
        address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
        abi: SbeeStakingABI,
        functionName: 'stake',
        args: [ethers.parseUnits(amount, 18).toString()]
      })
    }
  }

  const handleUnstake = () => {
    unstakeAmount({
      address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
      abi: SbeeStakingABI,
      functionName: 'unstake',
      args: [userStaked]
    })
  }

  const handleClaim = () => {
    claimAmount({
      address: process.env.NEXT_PUBLIC_STAKING_ADDRESS as Address,
      abi: SbeeStakingABI,
      functionName: 'claim'
    })
  }

  return (
    <>
      <div className='rounded-2xl border bg-co-bg-white w-full p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-lg'>Stake</span>
          <div className='flex items-end flex-col'>
            <span className='text-co-text-yellow-2 text-xs'>Staked</span>
            <div className='flex items-center justify-center gap-2 text-sm'>
              <span>{convertAmount(userStaked)}</span>
              <Image
                src='/images/svg/coin.svg'
                alt='coin'
                width={24}
                height={24}
              ></Image>
              <span>$SBEE</span>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2 text-sm mt-4'>
          <span>Stake tokens</span>
          <div>
            <InfoIcon />
          </div>
        </div>

        <div className='relative flex items-center mt-2'>
          <Input
            variant='bordered'
            placeholder='0.00 $SBEE'
            className='rounded-lg'
            type='number'
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value ? e.target.value : '')
            }}
          />
          <button
            className='absolute right-3 text-sm cursor-pointer hover:bg-co-gray-5 px-4 py-2
              rounded-full'
            onClick={() =>
              setAmount(
                balanceData?.value.toString()
                  ? BigNumber(balanceData?.value.toString())
                      .div(10 ** 18)
                      .decimalPlaces(2, BigNumber.ROUND_DOWN)
                      .toFixed(2)
                  : '0'
              )
            }
          >
            MAX
          </button>
        </div>
        <div className='text-left text-sm text-co-text-9 mt-1'>
          Available Balance: {convertAmount(balanceData?.value.toString())}{' '}
          $SBEE
        </div>

        <Button
          size='lg'
          className='rounded-lg shadow-button w-full text-lg mt-6'
          onClick={handleStake}
          isLoading={
            isApproving || isApproveConfirming || isStaking || isStakeConfirming
          }
        >
          {isStake ? 'Stake' : 'Approve'}
        </Button>
      </div>

      <div className='rounded-2xl border bg-co-bg-white w-full p-6 mt-4'>
        <div className='flex items-center justify-between'>
          <span className='text-lg'>Reward</span>
          <div className='flex items-end flex-col'>
            <span className='text-co-text-yellow-2 text-xs'>Earned</span>
            <div className='flex items-center justify-center gap-2 text-sm'>
              <span>{convertAmount(totalEarned)}</span>
              <Image
                src='/images/svg/coin.svg'
                alt='coin'
                width={24}
                height={24}
              ></Image>
              <span>$SBEE</span>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between mt-8 mb-4'>
          <span className='text-sm'>Total Staking Rewards</span>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <span>{convertAmount(userReward)}</span>
            <Image
              src='/images/svg/coin.svg'
              alt='coin'
              width={24}
              height={24}
            ></Image>
            <span>$SBEE</span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-sm'>Claimable Staking Rewards</span>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <span>{convertAmount(userReward)}</span>
            <Image
              src='/images/svg/coin.svg'
              alt='coin'
              width={24}
              height={24}
            ></Image>
            <span>$SBEE</span>
          </div>
        </div>

        <Button
          size='lg'
          className='rounded-lg shadow-button w-full text-lg mt-6'
          disabled={BigNumber(userReward).isLessThanOrEqualTo('0')}
          onClick={handleClaim}
          isLoading={isClaiming || isClaimConfirming}
        >
          Claim Rewards
        </Button>
        <Button
          size='lg'
          disabled={BigNumber(userStaked).isLessThanOrEqualTo('0')}
          className='rounded-lg shadow-button-light w-full text-lg mt-4 bg-co-bg-white border'
          onClick={handleUnstake}
          isLoading={isUnstaking || isUnstakeConfirming}
        >
          Unstake
        </Button>
      </div>

      <div className='rounded-2xl border bg-co-bg-white w-full p-6 mt-4'>
        <div className='flex items-center justify-between'>
          <span className='text-lg'>Stake Statistics</span>
        </div>

        <div className='flex items-center justify-between text-sm mt-6'>
          <span>Start Date</span>
          <div className='flex items-center justify-center gap-2 text-sm font-bold'>
            {startDate}
          </div>
        </div>

        <div className='flex items-center justify-between text-sm mt-4'>
          <span>End Date</span>
          <div className='flex items-center justify-center gap-2 text-sm font-bold'>
            {endDate}
          </div>
        </div>

        <div className='flex items-center justify-between text-sm mt-4'>
          <span>Time Remaining</span>
          <div className='flex items-center justify-center gap-2 text-sm font-bold'>
            {dateDiff.days}d {dateDiff.hours}h {dateDiff.minutes}m
          </div>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <span className='text-sm text-left'>Total Staked Value</span>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <span>{convertAmount(totalStaked)}</span>
            <Image
              src='/images/svg/coin.svg'
              alt='coin'
              width={24}
              height={24}
            ></Image>
            <span>$SBEE</span>
          </div>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <span className='text-sm text-left'>
            Your Stake (0.0% participation)
          </span>
          <div className='flex items-center justify-center gap-2 text-sm'>
            <span>
              {BigNumber(userStaked)
                .div(BigNumber(totalStaked))
                .multipliedBy(100)
                .toFixed(2)}
              %
            </span>
            <Image
              src='/images/svg/coin.svg'
              alt='coin'
              width={24}
              height={24}
            ></Image>
            <span>$SBEE</span>
          </div>
        </div>

        <div className='flex items-center justify-between text-sm mt-4'>
          <span>Stakers</span>
          <div className='flex items-center justify-center gap-2 text-sm font-bold'>
            {totalStakers}
          </div>
        </div>

        <div className='flex items-center justify-between text-sm mt-4'>
          <span className='text-sm text-left'>Staking Contract Address</span>
          <div className='flex items-center justify-center gap-2 text-sm font-bold'>
            <span>
              {formatAddress(process.env.NEXT_PUBLIC_STAKING_ADDRESS)}
            </span>
            <button
              className='cursor-pointer'
              onClick={() =>
                copyStakingAddress(
                  process.env.NEXT_PUBLIC_STAKING_ADDRESS as string
                )
              }
            >
              <CopyIcon />
            </button>
            <a
              href={`https://etherscan.io/address/${process.env.NEXT_PUBLIC_STAKING_ADDRESS}`}
              target='_blank'
              className='cursor-pointer'
            >
              <ShareIcon />
            </a>
          </div>
        </div>

        <div className='flex items-center justify-between text-sm mt-4'>
          <span className='text-sm text-left'>Stake</span>
          <div className='flex items-center justify-center gap-2 text-sm font-bold'>
            <Image
              src='/images/svg/coin.svg'
              alt='coin'
              width={24}
              height={24}
            ></Image>
            <span>$SBEE</span>
            <span>{formatAddress(process.env.NEXT_PUBLIC_TOKEN_ADDRESS)}</span>
            <button
              className='cursor-pointer'
              onClick={() =>
                copyTokenAddress(
                  process.env.NEXT_PUBLIC_TOKEN_ADDRESS as string
                )
              }
            >
              <CopyIcon />
            </button>
            <a
              href={`https://etherscan.io/address/${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`}
              target='_blank'
              className='cursor-pointer'
            >
              <ShareIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default SbeeStaking
