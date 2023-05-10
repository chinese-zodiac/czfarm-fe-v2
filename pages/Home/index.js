
import { useEthers, useTokenBalance } from '@usedapp/core';
import { BigNumber, utils } from 'ethers';
import React, { useContext, useState } from 'react';
import CollapsibleCard from '../../components/CollapsibleCard';
import ManageChronoPool from '../../components/ManageChronoPool';
import ManageCzusdNotes from '../../components/ManageCzusdNotes';
import ManageExoticFarm from '../../components/ManageExoticFarm';
import ManageFarmV2 from '../../components/ManageFarmV2';
import ManagePoolV1 from '../../components/ManagePoolV1';
import ManageTribePool from '../../components/ManageTribePool';
import ManageTribePoolNft from '../../components/ManageTribePoolNft';
import ManageXxxFarm from '../../components/ManageXxxFarm';
import ManageXxxFarmSingle from '../../components/ManageXxxFarmSingle';
import WalletStatsBar from '../../components/WalletStatsBar';
import { ADDRESS_BANDIT, ADDRESS_BANDITMASTER, ADDRESS_CZB, ADDRESS_CZBMASTER, ADDRESS_CZF, ADDRESS_CZR, ADDRESS_CZUSD } from '../../constants/addresses';
import { BANDIT_FARMS, BANDIT_FARMS_SINGLES } from '../../constants/banditfarms';
import { CHRONO_POOL } from "../../constants/chronoPool";
import { CZB_FARMS, CZB_FARMS_SINGLES } from '../../constants/czbfarms';
import { EXOTIC_FARMS } from "../../constants/exoticFarms";
import { FARM_V2 } from "../../constants/famsv2";
import { POOLS_V1 } from "../../constants/poolsv1";
import { TRIBE_POOLS } from '../../constants/tribepools';
import CZFarmContext from '../../contexts/CZFarmContext';
import useAccountLpBals from '../../hooks/useAccountLpBals';
import useChronoPoolAccountInfo from '../../hooks/useChronoPoolAccountInfo';
import useChronoPoolInfo from '../../hooks/useChronoPoolInfo';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useExoticFarmAccountInfo from '../../hooks/useExoticFarmAccountInfo';
import useExoticFarmInfo from '../../hooks/useExoticFarmInfo';
import usePoolsV1AccountInfo from '../../hooks/usePoolsV1AccountInfo';
import usePoolsV1Info from '../../hooks/usePoolsV1Info';
import useTribePoolAccountInfo from '../../hooks/useTribePoolAccountInfo';
import useTribePoolInfo from '../../hooks/useTribePoolInfo';
import useV2FarmsPendingCzf from '../../hooks/useV2FarmsPendingCzf';
import useV2FarmsPoolInfo from '../../hooks/useV2FarmsPoolInfo';
import useV2FarmsSettings from '../../hooks/useV2FarmsSettings';
import useV2FarmsUserInfo from '../../hooks/useV2FarmsUserInfo';
import useXxxFarmsPendingXxx from '../../hooks/useXxxFarmsPendingXxx';
import useXxxFarmsSettings from "../../hooks/useXxxFarmsSettings";
import useXxxFarmsUserInfo from '../../hooks/useXxxFarmsUserInfo';
import { weiToShortString, weiToUsdWeiVal } from '../../utils/bnDisplay';
import { czCashAddLink } from '../../utils/dexBuyLink';
import { getLpTokenValueUsdWad } from '../../utils/getLpTokenValueUsdWad';
import useDeepCompareEffect from '../../utils/useDeepCompareEffect';
import styles from "./index.module.scss";
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const { account, library, chainId } = useEthers();
  const { czbFarmsPoolInfo, banditFarmsPoolInfo,
    czfPrice, czusdPrice, czrPrice, czbPrice, banditPrice, bnbPrice,
    czbFarmsTvlWei,
    chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, accountEtherBalance, chronoTvlWei, exoticTvlWei, farmsV2TvlWei, poolsV1TvlWei, tribePoolsTvlWei } = useContext(CZFarmContext);
  const currentEpoch = useCurrentEpoch();

  const czfBal = useTokenBalance(ADDRESS_CZF, account);
  const czrBal = useTokenBalance(ADDRESS_CZR, account);
  const czbBal = useTokenBalance(ADDRESS_CZB, account);
  const czusdBal = useTokenBalance(ADDRESS_CZUSD, account);
  const banditBal = useTokenBalance(ADDRESS_BANDIT, account);

  const v2FarmsSettings = useV2FarmsSettings(library);
  const v2FarmsPoolInfo = useV2FarmsPoolInfo(library);
  const v2FarmsPendingCzf = useV2FarmsPendingCzf(library, account);
  const v2FarmsUserInfo = useV2FarmsUserInfo(library, account);
  const czbFarmsSettings = useXxxFarmsSettings(library, ADDRESS_CZBMASTER, 'czbPerSecond');
  const czbFarmsPendingCzb = useXxxFarmsPendingXxx(library, account, ADDRESS_CZBMASTER, CZB_FARMS_SINGLES, CZB_FARMS, 'pendingCzb');
  const czbFarmsUserInfo = useXxxFarmsUserInfo(library, account, ADDRESS_CZBMASTER, CZB_FARMS_SINGLES, CZB_FARMS);
  const banditFarmsSettings = useXxxFarmsSettings(library, ADDRESS_BANDITMASTER, 'banditPerSecond');
  const banditFarmsPendingBandit = useXxxFarmsPendingXxx(library, account, ADDRESS_BANDITMASTER, BANDIT_FARMS_SINGLES, BANDIT_FARMS, 'pendingBandit');
  const banditFarmsUserInfo = useXxxFarmsUserInfo(library, account, ADDRESS_BANDITMASTER, BANDIT_FARMS_SINGLES, BANDIT_FARMS);
  const chronoPoolInfo = useChronoPoolInfo(library);
  const chronoPoolAccountInfo = useChronoPoolAccountInfo(library, account);
  const exoticFarmInfo = useExoticFarmInfo(library);
  const exoticFarmAccountInfo = useExoticFarmAccountInfo(library, account);
  const poolsV1Info = usePoolsV1Info(library);
  const poolsV1AccountInfo = usePoolsV1AccountInfo(library, account);
  const tribePoolInfo = useTribePoolInfo(library);
  const tribePoolAccountInfo = useTribePoolAccountInfo(library, account);
  const accountLpBals = useAccountLpBals(library, account);

  const [chronoAccountStakeWei, setChronoAccountStakeWei] = useState(BigNumber.from(0));
  const [exoticAccountStakeWei, setExoticAccountStakeWei] = useState(BigNumber.from(0));
  const [farmsV2AccountStakeWei, setFarmsv2AccountStakeWei] = useState(BigNumber.from(0));
  const [poolsV1AccountStakeWei, setPoolsV1AccountStakeWei] = useState(BigNumber.from(0));
  const [tribePoolAccountStakeWei, setTribePoolAccountStakeWei] = useState(BigNumber.from(0));

  useDeepCompareEffect(() => {
    if (!account || !chronoPoolAccountInfo || !exoticFarmAccountInfo || !lpInfos || !v2FarmsUserInfo || !tribePoolAccountInfo) {
      setChronoAccountStakeWei(BigNumber.from(0));
      setExoticAccountStakeWei(BigNumber.from(0));
      setFarmsv2AccountStakeWei(BigNumber.from(0));
      setPoolsV1AccountStakeWei(BigNumber.from(0));
      setTribePoolAccountStakeWei(BigNumber.from(0));
      return;
    }

    setChronoAccountStakeWei(
      weiToUsdWeiVal(chronoPoolAccountInfo.reduce((prev, curr) => prev.add(curr?.totalVesting ?? 0), BigNumber.from(0)), czfPrice)
    );

    setExoticAccountStakeWei(
      weiToUsdWeiVal(exoticFarmAccountInfo.reduce((prev, curr) => prev.add(curr?.totalVesting ?? 0), BigNumber.from(0)), czfPrice)
    );

    setFarmsv2AccountStakeWei(
      FARM_V2.reduce((prev, curr, index) => {
        const symbol = curr.tokens[0].symbol;
        const lpInfo = lpInfos?.[curr.lp];
        const lpBal = v2FarmsUserInfo?.[index]?.amount;
        return prev.add(getLpTokenValueUsdWad(symbol, lpInfo, lpBal, czfPrice, czusdPrice) ?? 0);
      }, BigNumber.from(0))
    );

    setPoolsV1AccountStakeWei(
      poolsV1AccountInfo.reduce((prev, curr, index) => prev.add(weiToUsdWeiVal(curr?.amount, POOLS_V1[index].baseAssetName == "CZF" ? czfPrice : czusdPrice)), BigNumber.from(0))
    )

    setTribePoolAccountStakeWei(
      tribePoolAccountInfo.reduce((prev, curr, index) => prev.add(weiToUsdWeiVal(curr?.stakedBal, czrPrice)), BigNumber.from(0))
    )



  }, [account, chronoPoolAccountInfo, exoticFarmAccountInfo, lpInfos, v2FarmsUserInfo, poolsV1AccountInfo, tribePoolAccountInfo, czfPrice, czrPrice, czusdPrice]);

  return (<>
    <main id="main" className="hero has-text-centered has-background-special p-3 pb-5 is-justify-content-flex-start " style={{ minHeight: "100vh" }}>

      <WalletStatsBar {...{
        czfPrice, czrPrice, czusdPrice, banditPrice, czbPrice, czfBal, czusdBal, czrBal, banditBal, czbBal, account, library, v2FarmsPendingCzf, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo, tribePoolInfo, tribePoolAccountInfo, lpInfos, currentEpoch,
        chronoAccountStakeWei, exoticAccountStakeWei, farmsV2AccountStakeWei, poolsV1AccountStakeWei, tribePoolAccountStakeWei
      }} />

      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/BlueFarm.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>Blue Farms<br />
          <span className='is-size-6' >Stake LP, Get CZBLUE every second.</span>
        </p>
      </div>
      )}>
        {CZB_FARMS_SINGLES.map((farm, index) => (
          <ManageXxxFarmSingle key={farm.pid}
            {...{ account, library, farm, accountLpBals, czusdPrice }}
            xxxFarmsSettings={czbFarmsSettings}
            xxxFarmsPoolInfo={czbFarmsPoolInfo?.[index]}
            xxxFarmsPendingXxx={czbFarmsPendingCzb?.[index]}
            xxxFarmsUserInfo={czbFarmsUserInfo?.[index]}
            xxxPrice={czbPrice}
            address_xxx_master={ADDRESS_CZBMASTER}
            xxx_Symbol="CZB"
            xxxLogo="./static/assets/images/tokens/CZB.png"
          />
        ))}
        {CZB_FARMS.map((farm, index) => (
          <ManageXxxFarm key={farm.pid}
            {...{ account, library, farm, czusdPrice }}
            xxxFarmsSettings={czbFarmsSettings}
            xxxFarmsPoolInfo={czbFarmsPoolInfo?.[index + CZB_FARMS_SINGLES.length]}
            xxxFarmsPendingXxx={czbFarmsPendingCzb?.[index + CZB_FARMS_SINGLES.length]}
            xxxFarmsUserInfo={czbFarmsUserInfo?.[index + CZB_FARMS_SINGLES.length]}
            xxxPrice={czbPrice}
            address_xxx_master={ADDRESS_CZBMASTER}
            xxx_Symbol="CZB"
            xxxLogo="./static/assets/images/tokens/CZB.png"
            lpInfo={lpInfos?.[farm?.lp]}
            accountLpBal={accountLpBals?.[farm?.lp]}
          />
        ))}
        <p className="has-text-right pr-2">Your Blue Farms Staked: TBD{/*${weiToShortString(farmsV2AccountStakeWei, 2)}*/}</p>
        <p className="has-text-right pr-2">Blue Farms TVL: ${weiToShortString(czbFarmsTvlWei, 2)}</p>
      </CollapsibleCard>


      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/BanditFarm.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>🎭🔫💰🏴‍☠️👤 Farms<br />
          <span className='is-size-6' >Stake LP, Get 🎭🔫💰🏴‍☠️👤 every second.</span>
        </p>
      </div>
      )}>
        {BANDIT_FARMS_SINGLES.map((farm, index) => (
          <ManageXxxFarmSingle key={farm.pid}
            {...{ account, library, farm, accountLpBals, czusdPrice }}
            xxxFarmsSettings={banditFarmsSettings}
            xxxFarmsPoolInfo={banditFarmsPoolInfo?.[index]}
            xxxFarmsPendingXxx={banditFarmsPendingBandit?.[index]}
            xxxFarmsUserInfo={banditFarmsUserInfo?.[index]}
            xxxPrice={banditPrice}
            address_xxx_master={ADDRESS_BANDITMASTER}
            xxx_Symbol="BANDIT"
            xxxLogo="./static/assets/images/tokens/BANDIT.png"
          />
        ))}
        {BANDIT_FARMS.map((farm, index) => (
          <ManageXxxFarm key={farm.pid}
            {...{ account, library, farm, czusdPrice }}
            xxxFarmsSettings={banditFarmsSettings}
            xxxFarmsPoolInfo={banditFarmsPoolInfo?.[index + BANDIT_FARMS_SINGLES.length]}
            xxxFarmsPendingXxx={banditFarmsPendingBandit?.[index + BANDIT_FARMS_SINGLES.length]}
            xxxFarmsUserInfo={banditFarmsUserInfo?.[index + BANDIT_FARMS_SINGLES.length]}
            xxxPrice={banditPrice}
            address_xxx_master={ADDRESS_BANDITMASTER}
            xxx_Symbol="BANDIT"
            xxxLogo="./static/assets/images/tokens/BANDIT.png"
            lpInfo={lpInfos?.[farm?.lp]}
            accountLpBal={accountLpBals?.[farm?.lp]}
          />
        ))}
        <p className="has-text-right pr-2">Your Bandit Farms Staked: TBD{/*${weiToShortString(farmsV2AccountStakeWei, 2)}*/}</p>
        <p className="has-text-right pr-2">Bandit Farms TVL: ${weiToShortString(farmsV2TvlWei, 2)}</p>
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/Tribe.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>Red Pools<br />
          <span className='is-size-6' >Stake CZR, Get fairtribe tokens every second.</span>
        </p>
      </div>
      )}>
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>Want no tax? Visit: <a target="_blank" href="https://bad.rabbitcatch.com">ONE BAD RABBIT</a></h4>

        {TRIBE_POOLS.map((pool, index) => {
          const poolInfo = poolsV1Info?.[index];
          return (<ManageTribePool key={pool.address}
            {...{ pool, czrBal, czrPrice, czusdPrice }}
            rewardAddress={pool?.rewardAddress}
            accountInfo={tribePoolAccountInfo?.[index]}
            poolInfo={tribePoolInfo?.[index]}
            lpInfos={lpInfos}
          />)
        })}
        <p className="has-text-right pr-2">Your Tribe Pools Staked: ${weiToShortString(tribePoolAccountStakeWei, 2)}</p>
        <p className="has-text-right pr-2">Tribe Pools TVL: ${weiToShortString(tribePoolsTvlWei, 2)}</p>
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/Farm.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>Green Farms<br />
          <span className='is-size-6' >Stake LP, Get CZF every second.</span>
        </p>
      </div>
      )}>
        {FARM_V2.map((farm, index) => (
          <ManageFarmV2 key={farm.pid}
            {...{ account, library, farm, accountLpBals, czfPrice, czusdPrice, v2FarmsSettings }}
            v2FarmsLpBal={v2FarmsLpBal?.[index]}
            v2FarmsPoolInfo={v2FarmsPoolInfo?.[index]}
            v2FarmsPendingCzf={v2FarmsPendingCzf?.[index]}
            v2FarmsUserInfo={v2FarmsUserInfo?.[index]}
            lpInfo={lpInfos?.[farm?.lp]}
            accountLpBal={accountLpBals?.[farm?.lp]}
          />
        ))}
        <p className="has-text-right pr-2">Your Farms V2 Staked: ${weiToShortString(farmsV2AccountStakeWei, 2)}</p>
        <p className="has-text-right pr-2">Farms V2 TVL: ${weiToShortString(farmsV2TvlWei, 2)}</p>
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/CzusdNotes.jpg" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>CzusdNotes<br />
          <span className='is-size-6' >Maximize earnings with minimal risk on DeFi.</span>
        </p>
      </div>
      )}>
        <ManageCzusdNotes
          {...{ account, library, currentEpoch, czusdBal }}
        />
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/NftPools.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>NFT Pools<br />
          <span className='is-size-6' >Stake NFTs, earn CZR every second.</span>
        </p>
      </div>
      )}>
        <ManageTribePoolNft
          {...{ czrPrice }}
        />
      </CollapsibleCard>

      {/*<CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/CzusdGate.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>CZUSD Gate<br />
          <span className='is-size-6' >Swap BUSD and CZUSD.</span>
        </p>
      </div>
      )}>
        <ManageCzusdGate
          {...{ account, library, currentEpoch, czusdBal }}
        />
      </CollapsibleCard>*/}

      {/*<CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/BurnPool.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>Burn Pools<br />
          <span className='is-size-6' >Burn CZF or CZUSD, Get CZRed every second.</span>
        </p>
      </div>
      )}>
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>ACTIVE</h4>
        {BURN_POOLS.map((pool, index) => {
          const poolInfo = burnPoolInfo?.[index];
          if (!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampStart.lte(currentEpoch) && poolInfo.timestampEnd.gte(currentEpoch)) {
            return (<ManageBurnPool key={pool.address}
              {...{ currentEpoch, pool, czfBal, czusdBal, czfPrice, czusdPrice, czrPrice }}
              accountInfo={burnPoolAccountInfo?.[index]}
              poolInfo={poolInfo}
              isActive
            />)
          }
        })}
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>LAUNCHING</h4>
        {BURN_POOLS.map((pool, index) => {
          const poolInfo = burnPoolInfo?.[index];
          if (!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampStart.gte(currentEpoch)) {
            return (<ManageBurnPool key={pool.address}
              {...{ currentEpoch, pool, czfBal, czusdBal, czfPrice, czusdPrice, czrPrice }}
              accountInfo={burnPoolAccountInfo?.[index]}
              poolInfo={poolInfo}
              isLaunching
            />)
          }
        })}
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>EXPIRED</h4>
        {BURN_POOLS.map((pool, index) => {
          const poolInfo = burnPoolInfo?.[index];
          if (!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampEnd.lte(currentEpoch)) {
            return (<ManageBurnPool key={pool.address}
              {...{ currentEpoch, pool, czfBal, czusdBal, czfPrice, czusdPrice, czrPrice }}
              accountInfo={burnPoolAccountInfo?.[index]}
              poolInfo={poolInfo}
              isExpired
            />)
          }
        })}
        <p className="has-text-right pr-2">Your Total Burned: ${weiToShortString(burnPoolAccountTvb, 2)}</p >
        <p className="has-text-right pr-2">Burn Pools Total Value Burned (TVB): ${weiToShortString(burnPoolsTvbWei, 2)}</p>
      </CollapsibleCard>*/}

      <hr />

      <h2 style={{ color: "#888", fontSize: "3em", borderTop: "solid 4px" }} className="mt-5 pt-2">LEGACY</h2>
      <subtitle style={{ color: "#888" }}>Deprecated defi tools for CZF</subtitle>

      <CollapsibleCard className={"mt-5 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/Chrono.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>CZF Chrono Pools<br />
          <span className='is-size-6' >Burn CZF, Get CZF every second.</span>
        </p>
      </div>)}>
        {CHRONO_POOL.map((pool, index) => (
          <ManageChronoPool key={pool.pid}
            {...{ account, library, pool, currentEpoch, czfBal, czfPrice }}
            poolInfo={chronoPoolInfo?.[index]}
            poolAccountInfo={chronoPoolAccountInfo?.[index]}
            totalVesting={chronoVestingsTotalVesting?.[pool.chronoVesting]}
          />
        ))}
        <p className="has-text-right pr-2">Your Chrono Vesting: ${weiToShortString(chronoAccountStakeWei, 2)}</p>
        <p className="has-text-right pr-2">Chrono Pools TVL: ${weiToShortString(chronoTvlWei, 2)}</p>
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/Exotic.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>CZF Exotic Farms<br />
          <span className='is-size-6' >Give LP to CZodiac Treasury, Get CZF every second.</span>
        </p>
      </div>
      )}>
        {EXOTIC_FARMS.map((farmSet, farmSetIndex) => (<div className='m-0 p-0' key={"farmset-" + farmSetIndex}>
          <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>{farmSet?.title}</h4>
          <a className="has-text-primary" style={{ textDecoration: "underline" }}
            href={czCashAddLink(farmSet?.tokens?.[0]?.address, farmSet?.tokens?.[1]?.address)} target="_blank">
            Mint {farmSet?.tokens?.[0]?.symbol}/{farmSet?.tokens?.[1]?.symbol} on CZ.Cash <span className="icon"><i className="fa-solid fa-up-right-from-square"></i></span>
          </a>
          {farmSet?.farms.map((farm, farmIndex) => {
            const infoIndex = farmSetIndex * 3 + farmIndex;
            return (
              <ManageExoticFarm key={farmSetIndex + "-" + farm.pid}
                {...{ account, library, currentEpoch, farm, farmSet, czusdPrice, czfPrice }}
                farmInfo={exoticFarmInfo?.[infoIndex]}
                farmAccountInfo={exoticFarmAccountInfo?.[infoIndex]}
                lpBal={accountLpBals?.[farmSet.lp]}
                lpInfo={lpInfos?.[farmSet.lp]}
                totalVesting={chronoVestingsTotalVesting?.[farm.chronoVesting]}
              />)
          })}
        </div>))}
        <p className="has-text-right pr-2">Your Exotic Vesting: ${weiToShortString(exoticAccountStakeWei, 2)}</p>
        <p className="has-text-right pr-2">Exotic Farms TVL: ${weiToShortString(exoticTvlWei, 2)}</p>
      </CollapsibleCard>



      <CollapsibleCard className={"mt-3 mb-3 has-text-left " + styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{ width: "100%" }}>
        <img className="column is-3 m-2 ml-3" src="./static/assets/images/sections/Pools.png" style={{ objectFit: "contain", background: "#1b142b", padding: "0px 0.5em", borderRadius: "0.5em" }} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{ lineHeight: "1em" }}>Pools V1<br />
          <span className='is-size-6' >Stake CZF or CZUSD, Get partner tokens every second.</span>
        </p>
      </div>
      )}>
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>Want no tax? Visit: <a target="_blank" href="https://bad.rabbitcatch.com">ONE BAD RABBIT</a></h4>
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>ACTIVE</h4>
        {POOLS_V1.map((pool, index) => {
          const poolInfo = poolsV1Info?.[index];
          if (!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampStart.lte(currentEpoch) && poolInfo.timestampEnd.gte(currentEpoch)) {
            return (<ManagePoolV1 key={pool.address}
              {...{ currentEpoch, pool, czfBal, czusdBal, czfPrice, czusdPrice }}
              accountInfo={poolsV1AccountInfo?.[index]}
              poolInfo={poolInfo}
              poolTokenBalance={poolsV1TokenBalance?.[index]}
              isActive
            />)
          }
        })}
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>LAUNCHING</h4>
        {POOLS_V1.map((pool, index) => {
          const poolInfo = poolsV1Info?.[index];
          if (!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampStart.gte(currentEpoch)) {
            return (<ManagePoolV1 key={pool.address}
              {...{ account, library, currentEpoch, pool, czfBal, czusdBal, czfPrice, czusdPrice }}
              accountInfo={poolsV1AccountInfo?.[index]}
              poolInfo={poolInfo}
              poolTokenBalance={poolsV1TokenBalance?.[index]}
              isLaunching
            />)
          }
        })}
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>EXPIRED</h4>
        {POOLS_V1.map((pool, index) => {
          const poolInfo = poolsV1Info?.[index];
          if (!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampEnd.lte(currentEpoch)) {
            return (<ManagePoolV1 key={pool.address}
              {...{ account, library, currentEpoch, pool, czfBal, czusdBal, czfPrice, czusdPrice }}
              accountInfo={poolsV1AccountInfo?.[index]}
              poolInfo={poolInfo}
              poolTokenBalance={poolsV1TokenBalance?.[index]}
              isExpired
            />)
          }
        })}
        <p className="has-text-right pr-2">Your Pools V1 Staked: ${weiToShortString(poolsV1AccountStakeWei, 2)}</p>
        <p className="has-text-right pr-2">Pools V1 TVL: ${weiToShortString(poolsV1TvlWei, 2)}</p>
      </CollapsibleCard>

    </main>

  </>);
}

export default Home
