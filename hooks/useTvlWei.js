import { useCall } from '@usedapp/core';
import { BigNumber, Contract } from 'ethers';
import { useState } from 'react';
import CzusdNotesAbi from "../abi/CzusdNotes.json";
import { ADDRESS_CZUSDNOTES } from '../constants/addresses';
import { BANDIT_FARMS, BANDIT_FARMS_SINGLES } from '../constants/banditfarms';
import { CHRONO_POOL } from "../constants/chronoPool";
import { CZB_FARMS, CZB_FARMS_SINGLES } from '../constants/czbfarms';
import { EXOTIC_FARMS } from "../constants/exoticFarms";
import { FARM_V2 } from "../constants/famsv2";
import { POOLS_V1 } from "../constants/poolsv1";
import { TRIBE_POOLS } from "../constants/tribepools";
import { weiToUsdWeiVal } from '../utils/bnDisplay';
import { getLpTokenValueUsdWad } from '../utils/getLpTokenValueUsdWad';
import useDeepCompareEffect from '../utils/useDeepCompareEffect';


function useTvlWei(czfPrice, czrPrice, czusdPrice, czbPrice, banditPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo,
  czbFarmsPoolInfo, banditFarmsPoolInfo) {
  const [chronoTvlWei, setChronoTvlWei] = useState(BigNumber.from(0));
  const [exoticTvlWei, setExoticTvlWei] = useState(BigNumber.from(0));
  const [farmsV2TvlWei, setFarmsv2TvlWei] = useState(BigNumber.from(0));
  const [poolsV1TvlWei, setPoolsV1TvlWei] = useState(BigNumber.from(0));
  const [tribePoolsTvlWei, setTribePoolsTvlWei] = useState(BigNumber.from(0));

  const [czbFarmsTvlWei, setCzbFarmsTvlWei] = useState(BigNumber.from(0));
  const [banditFarmsTvlWei, setBanditFarmsTvlWei] = useState(BigNumber.from(0));
  const [czusdNotesTvlWei, setCzusdNotesTvlWei] = useState(BigNumber.from(0));

  const { value: outstandingPrinciple, error: outstandingPrincipleError } = useCall({
    contract: new Contract(ADDRESS_CZUSDNOTES, CzusdNotesAbi),
    method: 'outstandingPrinciple',
    args: []
  }) ?? {}

  useDeepCompareEffect(() => {
    if (!czfPrice || !czusdPrice || !czrPrice || !chronoVestingsTotalVesting || !poolsV1TokenBalance || !v2FarmsLpBal || !lpInfos || !tribePoolsInfo) {
      setChronoTvlWei(BigNumber.from(0));
      setExoticTvlWei(BigNumber.from(0));
      setFarmsv2TvlWei(BigNumber.from(0));
      setPoolsV1TvlWei(BigNumber.from(0));
      setTribePoolsTvlWei(BigNumber.from(0));
      setCzusdNotesTvlWei(BigNumber.from(0));
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
        weiToUsdWeiVal(tribePoolsInfo?.[index]?.totalStaked, czrPrice)
      ), BigNumber.from(0))
    );

    setCzbFarmsTvlWei(CZB_FARMS.reduce((prev, curr, index) => prev.add(
      getLpTokenValueUsdWad(curr.tokens[0].symbol, lpInfos?.[curr.lp], czbFarmsPoolInfo?.[index + CZB_FARMS_SINGLES.length]?.totalDeposit, czbPrice, czusdPrice, (
        curr.tokens[1].symbol == "CZF"
      ))
    ), BigNumber.from(0)).add(
      CZB_FARMS_SINGLES.reduce((prev, curr, index) => prev.add(
        weiToUsdWeiVal(czbFarmsPoolInfo?.[index]?.totalDeposit, curr.tokenName == "CZUSD" ? czusdPrice : czbPrice)
      ), BigNumber.from(0))
    ));


    setBanditFarmsTvlWei(BANDIT_FARMS.reduce((prev, curr, index) => prev.add(
      getLpTokenValueUsdWad(curr.tokens[0].symbol, lpInfos?.[curr.lp], banditFarmsPoolInfo?.[index + BANDIT_FARMS_SINGLES.length]?.totalDeposit, banditPrice, czusdPrice, (
        curr.tokens[1].symbol == "CZB"
      ))
    ), BigNumber.from(0)).add(
      BANDIT_FARMS_SINGLES.reduce((prev, curr, index) => prev.add(
        weiToUsdWeiVal(banditFarmsPoolInfo?.[index]?.totalDeposit, banditPrice)
      ), BigNumber.from(0))
    ));

    //TODO: refactor so outstanding principle is handled in context to avoid multiple calls
    setCzusdNotesTvlWei(outstandingPrinciple?.[0] ?? BigNumber.from(0))

  }, [czfPrice, czusdPrice, czrPrice, czbPrice, banditPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo, czbFarmsPoolInfo, banditFarmsPoolInfo, outstandingPrinciple?.[0].toString()])

  return {
    chronoTvlWei,
    exoticTvlWei,
    farmsV2TvlWei,
    poolsV1TvlWei,
    tribePoolsTvlWei,
    czbFarmsTvlWei,
    banditFarmsTvlWei,
    czusdNotesTvlWei
  }
}


export default useTvlWei;