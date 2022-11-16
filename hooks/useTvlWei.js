import React, { useState } from 'react';
import { BigNumber } from 'ethers';
import { weiToUsdWeiVal } from '../utils/bnDisplay';
import { getLpTokenValueUsdWad } from '../utils/getLpTokenValueUsdWad';
import { CHRONO_POOL } from "../constants/chronoPool";
import { EXOTIC_FARMS } from "../constants/exoticFarms";
import { FARM_V2 } from "../constants/famsv2";
import { POOLS_V1 } from "../constants/poolsv1";
import { TRIBE_POOLS } from "../constants/tribepools";
import useDeepCompareEffect from '../utils/useDeepCompareEffect';


function useTvlWei(czfPrice, czusdPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo) {
  const [chronoTvlWei, setChronoTvlWei] = useState(BigNumber.from(0));
  const [exoticTvlWei, setExoticTvlWei] = useState(BigNumber.from(0));
  const [farmsV2TvlWei, setFarmsv2TvlWei] = useState(BigNumber.from(0));
  const [poolsV1TvlWei, setPoolsV1TvlWei] = useState(BigNumber.from(0));
  const [tribePoolsTvlWei, setTribePoolsTvlWei] = useState(BigNumber.from(0));

  useDeepCompareEffect(() => {
    if (!czfPrice || !czusdPrice || !chronoVestingsTotalVesting || !poolsV1TokenBalance || !v2FarmsLpBal || !lpInfos || !tribePoolsInfo) {
      setChronoTvlWei(BigNumber.from(0));
      setExoticTvlWei(BigNumber.from(0));
      setFarmsv2TvlWei(BigNumber.from(0));
      setPoolsV1TvlWei(BigNumber.from(0));
      setTribePoolsTvlWei(BigNumber.from(0));
      return;
    }

    setChronoTvlWei(
      weiToUsdWeiVal(CHRONO_POOL.map((pool) => pool.chronoVesting)
        .reduce((prev, curr) => prev.add(chronoVestingsTotalVesting?.[curr] ?? 0), BigNumber.from(0)), czfPrice)
    );
    setExoticTvlWei(
      weiToUsdWeiVal(EXOTIC_FARMS.flatMap((farmSet) => farmSet.farms.map(farm => farm.chronoVesting))
        .reduce((prev, curr) => prev.add(chronoVestingsTotalVesting?.[curr] ?? 0), BigNumber.from(0)), czfPrice)
    );
    setFarmsv2TvlWei(FARM_V2.reduce((prev, curr, index) => prev.add(
      getLpTokenValueUsdWad(curr.tokens[0].symbol ?? "CZF", lpInfos?.[curr.lp], v2FarmsLpBal?.[index]?.lpBal, czfPrice, czusdPrice)
    ), BigNumber.from(0)));
    setPoolsV1TvlWei(
      POOLS_V1.reduce((prev, curr, index) => prev.add(
        weiToUsdWeiVal(poolsV1TokenBalance?.[index]?.tokenBal, curr.baseAssetName == "CZF" ? czfPrice : czusdPrice)
      ), BigNumber.from(0))
    );
    setTribePoolsTvlWei(
      TRIBE_POOLS.reduce((prev, curr, index) => prev.add(
        weiToUsdWeiVal(tribePoolsInfo?.[index]?.totalStaked, czfPrice)
      ), BigNumber.from(0))
    );
  }, [czfPrice, czusdPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo])
  return {
    chronoTvlWei,
    exoticTvlWei,
    farmsV2TvlWei,
    poolsV1TvlWei,
    tribePoolsTvlWei
  }
}


export default useTvlWei;