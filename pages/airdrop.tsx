import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Footer from '@components/Layout/Footer'

const AirdropPage: NextPage = () => {
  return (
    <div
      className='flex pt-[16px] sm:pt-[106px] flex-1 justify-center flex-col items-center
        sm:px-[0px] overflow-hidden bg-roadmap-bg bg-no-repeat bg-top relative
        max-w-[1440px] mx-auto w-full'
    >
      <NextSeo
        title='$SBEE Roadmap | Charting Our Blockchain Journey'
        description='Explore the roadmap of SharkBee Coin, from liquidity pools to community airdrops. Be part of our journey to a vibrant blockchain future!'
        canonical='https://sharkbeecoin.com'
        openGraph={{
          url: 'https://sharkbeecoin.com/roadmap',
          title: '$SBEE Roadmap | Charting Our Blockchain Journey',
          description:
            'Explore the roadmap of SharkBee Coin, from liquidity pools to community airdrops. Be part of our journey to a vibrant blockchain future!',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'SharkBee',
              type: 'image/jpeg'
            }
          ],
          siteName: 'SharkBee Coin'
        }}
        twitter={{
          handle: '@sbeecoineth',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />
      <div
        className='max-w-[1068px] bg-white sm:pt-[64px] sm:px-[128px] justify-center relative
          sm:pb-[108px] pb-[40px] px-[16px] py-[24px] rounded-lg border border-gray-300
          mx-[16px] sm:mx-[16px] mb-[70px] w-[95%] z-10'
      >
        <Image
          src='/images/svg/airdrop-coin-4.svg'
          alt=''
          width={77}
          height={79}
          className='block sm:hidden mx-auto mb-10'
        />
        <div className='text-black text-center font-comic sm:text-40 text-xl font-bold leading-normal'>
          $SBEE Airdrop 1!
        </div>
        <div
          className='text-black opacity-50 text-left font-comic text-base font-medium sm:leading-8
            leading-normal mt-4 text-md sm:text-lg'
        >
          We are thrilled to welcome you to our first-ever airdrop! $SBEE, an
          ERC-20 token on Mainnet, rewards the planet&apos;s builders, dreamers,
          and doers. From degens to regens, your unique buzz strengthens our
          collective hive. Consider $SBEE your blockchain high-five,
          acknowledging your contributions to our vibrant community. 🙌
        </div>
        <div className='flex mt-[48px] gap-[12px] flex-col sm:flex-row'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div
              className='text-black font-comic text-base font-bold text-md sm:text-lg flex items-center
                gap-[26px]'
            >
              Important information:
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal flex items-center gap-[26px] flex-row-reverse'
            >
              Our airdrop operates on a first-come-first-serve basis. We&apos;ve
              set limits on how many people can claim rewards to ensure fair and
              efficient distribution. You can check if your wallet is eligible
              on our website during the claim period.
            </div>
            <ul className='list-disc text-co-text-black pl-8 text-wrap break-all'>
              <li>Airdrop Start: March 28, 2024.</li>
              <li>Claim Deadline: April 12, 2024</li>
              <li>
                $SBEE Contract Address:
                0x7Ae0f19D2aE2f490e710579284A58000d4E8C85f
              </li>
              <li>
                Buy on Uniswap:
                <Link
                  href='https://app.uniswap.org/swap?inputCurrency=0x7ae0f19d2ae2f490e710579284a58000d4e8c85f&outputCurrency=ETH'
                  target='_blank'
                  className='underline'
                >
                  https://app.uniswap.org/swap?inputCurrency=0x7ae0f19d2ae2f490e710579284a58000d4e8c85f&outputCurrency=ETH
                </Link>
              </li>
              <li>
                Uniswap Pair:
                <Link
                  href='https://v2.info.uniswap.org/pair/0xb74ee901c2b0a04d75d38f7f4722e8a848e613b9'
                  target='_blank'
                  className='underline'
                >
                  https://v2.info.uniswap.org/pair/0xb74ee901c2b0a04d75d38f7f4722e8a848e613b9
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div
              className='text-black font-comic text-base font-bold text-md sm:text-lg leading-normal
                sm:leading-5'
            >
              Eligibility and reward allocation limits
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal'
            >
              This airdrop is designed to celebrate everyone in our diverse
              community. From developers and open-source contributors to NFT
              creators, holders, and memecoin enthusiasts, we have something
              special for each of you. Here&apos;s a quick rundown of who&apos;s
              eligible and the maximum rewards available:
            </div>
          </div>
        </div>

        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div
              className='text-black font-comic text-base font-bold text-md sm:text-lg leading-normal
                sm:leading-5'
            >
              $SBEE Social Engagement (Max Supply = 3.6B $SBEE)
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-2 mb-[16px] text-sm sm:text-md
                font-normal'
            >
              Engage with our community to earn your share of 4 billion $SBEE!
              Stay active, share, and connect with us to find out more about
              specific allocations:
            </div>

            <ul className='list-disc text-co-text-black pl-8'>
              <li>Discord & Farcaster OGs: 1,000,000 $SBEE each (max: 888)</li>
              <li>
                Newcomer Bonus: 20,000 $SBEE for joining our Discord (max:
                15,000)
              </li>
              <li>
                10M Club: Vocal supporters can earn 10 Million $SBEE (max: 50)
              </li>
              <li>Top 50 Discord Referrers: 1,000,000 $SBEE each (max: 50)</li>
              <li>Server Boosters: Share in 250,000 $SBEE monthly</li>
              <li>Meme of the Day: Win 300,000 $SBEE in our Discord</li>
              <li>Tipping Bonanza: 1,000,000 $SBEE to tip in Discord daily</li>
            </ul>
          </div>
        </div>

        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Developers (Max Claim = 5,888)
            </div>

            <div
              className='text-black font-comic text-base mt-[16px] text-sm sm:text-md font-normal
                leading-normal sm:leading-5'
            >
              Deployed a smart contract to Mainnet in the last 12 months?
              500,000 $SBEE is waiting for you. Let’s buidl the future together
              in Buidler’s Borough!
            </div>
          </div>
        </div>
        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Open Source Contributors (Max Claim = 5,888)
            </div>
            <div
              className='text-black font-comic text-base mt-[16px] text-sm sm:text-md font-normal
                leading-normal sm:leading-5'
            >
              Contributed to one of the top 5000 open source projects on GitHub?
              Claim your 500,000 $SBEE as a token of our gratitude and come
              party in Contributor’s Cove!
            </div>
          </div>
        </div>
        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              NFT Creators (Max Claim = 5,888)
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal sm:leading-5'
            >
              Welcome to Creator’s Canvas! If you&apos;ve created NFTs on
              Mainnet and Superchain (OP Mainnet, Base, Zora), get ready for
              400,000 $SBEE! We are using a dataset from the recent Optimism
              Airdrop 4 to verify your eligibility.
            </div>
          </div>
        </div>

        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Gitcoin Donors (Max Claim = 5,888)
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal sm:leading-5'
            >
              Embrace the spirit of giving at Regen Retreat, where every
              contribution makes a difference. If you have ever donated or
              funded Gitcoin projects, you&apos;re eligible for an airdrop of
              200,000 $SBEE.
            </div>
          </div>
        </div>

        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Web3 Identity Owners (Max Claim = 18,888)
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal sm:leading-5'
            >
              Dive into decentralized identity at Profile Point, where privacy
              and self-sovereignty reign supreme. Connect and verify ENS
              holdings to determine eligibility for 50,000 $SBEE.
            </div>
          </div>
        </div>

        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Memecoin Holders (Max Claim = 18,888)
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal sm:leading-5'
            >
              Join the festivities at Meme Magic Meadow, where laughter and good
              vibes are always in bloom. Hold $BONK, $PORK, $POND, $MOG, or
              $PEPE on ETH? 100,000 $SBEE is waiting for you.
            </div>
            <div className='flex mt-4 text-co-text-black'>
              <div className='flex flex-col w-[315px] gap-1'>
                <Link
                  href='https://etherscan.io/token/0x1151cb3d861920e07a38e03eead12c32178567f6'
                  target='_blank'
                >
                  🥊BONK
                </Link>
                <Link
                  href='https://etherscan.io/token/0xb9f599ce614Feb2e1BBe58F180F370D05b39344E'
                  target='_blank'
                >
                  🐷PORK
                </Link>
                <Link
                  href='https://etherscan.io/token/0x6982508145454Ce325dDbE47a25d4ec3d2311933'
                  target='_blank'
                >
                  🐸PEPE
                </Link>
              </div>
              <div className='flex flex-col gap-1'>
                <Link
                  href='https://etherscan.io/token/0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a#balances'
                  target='_blank'
                >
                  🧙‍♂️MOG
                </Link>
                <Link
                  href='https://etherscan.io/token/0x423f4e6138E475D85CF7Ea071AC92097Ed631eea'
                  target='_blank'
                >
                  🏞️POND
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-[12px] flex-col sm:flex-row mt-6'>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              NFT Holders (Max Claim = 18,888)
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal sm:leading-5'
            >
              Welcome to Pixel Plaza, where your prized digital assets take
              center stage. Hold any of the projects listed below? A 100,000
              $SBEE reward is in store for you.
            </div>
            <div className='flex gap-2 mt-4 text-co-text-black'>
              <div className='flex flex-col gap-1'>
                <Link
                  href='https://etherscan.io/address/0x06012c8cf97bead5deae237070f9587f8e7a266d'
                  target='_blank'
                >
                  🐱 Cryptokitties (gen0 only)
                </Link>
                <Link
                  href='https://etherscan.io/token/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb#balances'
                  target='_blank'
                >
                  🤖 Cryptopunks
                </Link>
                <Link
                  href='https://etherscan.io/token/0x60e4d786628fea6478f785a6d7e704777c86a7c6#balances'
                  target='_blank'
                >
                  🦍 Mutant Ape Yacht Club
                </Link>
                <Link
                  href='https://etherscan.io/token/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
                  target='_blank'
                >
                  🛥️ Bored Ape Yacht Club
                </Link>
                <Link
                  href='https://etherscan.io/token/0xbd3531da5cf5857e7cfaa92426877b022e612cf8#balances'
                  target='_blank'
                >
                  🐧 Pudgy Penguins
                </Link>
                <Link
                  href='https://etherscan.io/token/0x5af0d9827e0c53e4799bb226655a1de152a425a5#balances'
                  target='_blank'
                >
                  👩‍🎨 Milady Maker
                </Link>
                <Link
                  href='https://etherscan.io/token/0xed5af388653567af2f388e6224dc7c4b3241c544#balances'
                  target='_blank'
                >
                  🍣 Azuki
                </Link>
                <Link
                  href='https://etherscan.io/token/0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7#balances'
                  target='_blank'
                >
                  🔶 Meebits
                </Link>
                <Link
                  href='https://etherscan.io/token/0x059edd72cd353df5106d2b9cc5ab83a52287ac3a#balances'
                  target='_blank'
                >
                  🖼️ Artblocks
                </Link>
              </div>
              <div className='flex flex-col gap-1'>
                <Link
                  href='https://etherscan.io/token/0x33fd426905f149f8376e227d0c9d3340aad17af1#balances'
                  target='_blank'
                >
                  🎭 The Memes by Punk6529
                </Link>
                <Link
                  href='https://etherscan.io/token/0x79fcdef22feed20eddacbb2587640e45491b757f#balances'
                  target='_blank'
                >
                  🔥 Mfers
                </Link>
                <Link
                  href='https://etherscan.io/token/0x364c828ee171616a39897688a831c2499ad972ec#balances'
                  target='_blank'
                >
                  🌊 Sappy Seals
                </Link>
                <Link
                  href='https://etherscan.io/address/0x6339e5e072086621540d0362c4e3cea0d643e114'
                  target='_blank'
                >
                  🌱 Opepen
                </Link>
                <Link
                  href='https://etherscan.io/token/0x34eebee6942d8def3c125458d1a86e0a897fd6f9#balances'
                  target='_blank'
                >
                  💵 Checks (VV Edition)
                </Link>
                <Link
                  href='https://etherscan.io/token/0x1a92f7381b9f03921564a437210bb9396471050c#balances'
                  target='_blank'
                >
                  😺 Cool Cats
                </Link>
                <Link
                  href='https://etherscan.io/token/0x892848074ddea461a15f337250da3ce55580ca85#balances'
                  target='_blank'
                >
                  👹 DeGods
                </Link>
                <Link
                  href='https://etherscan.io/token/0x769272677fab02575e84945f03eca517acc544cc#balances'
                  target='_blank'
                >
                  🌟 Memeland Captainz
                </Link>
                <Link
                  href='https://etherscan.io/token/0xb852c6b5892256c264cc2c888ea462189154d8d7#balances'
                  target='_blank'
                >
                  💔 rektguy
                </Link>
              </div>
              <div className='flex flex-col gap-1'>
                <Link
                  href='https://etherscan.io/token/0xacf63e56fd08970b43401492a02f6f38b6635c91#balances'
                  target='_blank'
                >
                  🐼 Kanpai Pandas
                </Link>
                <Link
                  href='https://etherscan.io/token/0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42#balances'
                  target='_blank'
                >
                  🔮 Forgotten Runes
                </Link>
                <Link
                  href='https://etherscan.io/token/0xeeca64ea9fcf99a22806cd99b3d29cf6e8d54925#balances'
                  target='_blank'
                >
                  👾 Sproto Gremlins
                </Link>
                <Link
                  href='https://etherscan.io/token/0x1b829b926a14634d36625e60165c0770c09d02b2#balances'
                  target='_blank'
                >
                  🌳 Treeverse Plots
                </Link>
                <Link
                  href='https://etherscan.io/token/0xe785e82358879f061bc3dcac6f0444462d4b5330#balances'
                  target='_blank'
                >
                  🌍 World of Women
                </Link>
                <Link
                  href='https://etherscan.io/token/0x1d20a51f088492a0f1c57f047a9e30c9ab5c07ea#balances'
                  target='_blank'
                >
                  🎨 Wassies by Wassies
                </Link>
                <Link
                  href='https://etherscan.io/token/0x338866f8ba75bb9d7a00502e11b099a2636c2c18#balances'
                  target='_blank'
                >
                  🗡️ Women and Weapons
                </Link>
                <Link
                  href='https://etherscan.io/token/0x4a537f61ef574153664c0dbc8c8f4b900cacbe5d#balances'
                  target='_blank'
                >
                  🌌 Mavia Land
                </Link>
                <Link
                  href='https://etherscan.io/token/0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d#balances'
                  target='_blank'
                >
                  💥 0N1 Force
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='text-lg my-12'>📸 Snapshot date: March 22, 2024</div>

        <div className='text-co-text-black text-sm mt-10'>
          Disclaimer: $SBEE is a meme coin. It has no functions, no utility, and
          no intrinsic value. It does not promise or offer any financial return,
          profit, interest, or dividend.
        </div>
      </div>
      <Footer></Footer>
      <Image
        src='/images/svg/roadmap-right-icon.svg'
        alt=''
        height={430}
        width={760}
        className='absolute bottom-[307px] right-[-35px] hidden sm:block sm:bottom-[1200px]
          sm:right-[-60px] w-[232px] h-[134px] sm:h-[430px] sm:w-[760px] z-0'
        style={{ zIndex: 1 }}
      ></Image>

      <Image
        src='/images/svg/airdrop-coin-3.svg'
        alt=''
        height={230}
        width={229}
        className='absolute top-0 right-[40px] z-20 hidden lg:block'
      ></Image>

      <Image
        src='/images/svg/airdrop-coin-2.svg'
        alt=''
        height={230}
        width={229}
        className='absolute top-[680px] left-[80px] z-20 hidden lg:block'
      ></Image>

      <Image
        src='/images/svg/airdrop-coin-1.svg'
        alt=''
        height={230}
        width={229}
        className='absolute bottom-[700px] right-[60px] z-20 hidden lg:block'
      ></Image>
    </div>
  )
}

export default AirdropPage
