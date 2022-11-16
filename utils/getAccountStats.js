import { BigNumber } from 'ethers';
import { FARM_V2 } from "../constants/famsv2";
import { POOLS_V1 } from "../constants/poolsv1";
import { TRIBE_POOLS } from "../constants/tribepools";

export const getCzfHarvestableChrono = (chronoPoolAccountInfo) => {
  const currentEpoch = BigNumber.from(Math.floor(Date.now() / 1000));
  return chronoPoolAccountInfo.reduce((acc, curr) => curr?.emissionRate?.mul(currentEpoch.sub(curr?.updateEpoch ?? currentEpoch)).add(acc), BigNumber.from(0)) ?? BigNumber.from(0);
}
export const getCzfHarvestableExotic = (exoticFarmAccountInfo) => {
  const currentEpoch = BigNumber.from(Math.floor(Date.now() / 1000));
  return exoticFarmAccountInfo.reduce((acc, curr) => curr?.emissionRate?.mul(currentEpoch.sub(curr?.updateEpoch ?? currentEpoch)).add(acc), BigNumber.from(0)) ?? BigNumber.from(0);
}
export const getCzfHarvestableFarmsV2 = (v2FarmsPendingCzf) => {
  return v2FarmsPendingCzf.reduce((acc, curr) => acc.add(curr?.pendingCzf ?? BigNumber.from(0)), BigNumber.from(0)) ?? BigNumber.from(0);
}
export const getCzfHarvestablePoolsV1 = (poolsV1AccountInfo) => {
  return poolsV1AccountInfo.reduce(
    (acc, curr, index) => {
      if (POOLS_V1?.[index].rewardAssetName != "CZF") return acc; //Only acc CZF harvest
      return curr?.pendingReward?.add(acc) ?? BigNumber.from(0);
    }
    , BigNumber.from(0)) ?? BigNumber.from(0);
}

export const getCzfHarvestable = (v2FarmsPendingCzf, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1AccountInfo) => {
  const czfFromV2Farms = getCzfHarvestableFarmsV2(v2FarmsPendingCzf);
  const czfFromChrono = getCzfHarvestableChrono(chronoPoolAccountInfo);
  const czfFromExotic = getCzfHarvestableExotic(exoticFarmAccountInfo);
  const czfFromPoolsV1 = getCzfHarvestablePoolsV1(poolsV1AccountInfo);
  return czfFromV2Farms.add(czfFromChrono).add(czfFromExotic).add(czfFromPoolsV1);
}

export const getSingleV2FarmCzfPerSecondWei = (v2FarmsSettings, singleV2FarmsLpBal, singleV2FarmsPoolInfo, singleV2FarmsUserInfo) => {
  const v2CzfPerSecondPerAllocPoint = v2FarmsSettings?.czfPerBlock?.div(3).div(v2FarmsSettings?.totalAllocPoint) ?? BigNumber.from(0); //3 seconds per block
  return v2CzfPerSecondPerAllocPoint?.mul(singleV2FarmsPoolInfo?.allocPoint ?? BigNumber.from(0)).mul(singleV2FarmsUserInfo?.amount ?? BigNumber.from(0)).div(singleV2FarmsLpBal?.lpBal ?? BigNumber.from(1));
}

export const getDailyCzfWei = (v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo) => {
  try {//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    const v2FarmsRps = v2FarmsUserInfo.reduce(
      (acc, curr, index) => getSingleV2FarmCzfPerSecondWei(v2FarmsSettings, v2FarmsLpBal?.[index], v2FarmsPoolInfo?.[index], curr).add(acc)
      , BigNumber.from(0)) ?? BigNumber.from(0);


    const currentEpoch = Math.floor(Date.now() / 1000);
    const poolsV1Rps = poolsV1AccountInfo.reduce(
      (acc, curr, index) => {
        let poolInfo = poolsV1Info?.[index];
        if (POOLS_V1?.[index].rewardAssetName != "CZF") return acc; //Only acc CZF rewards
        let totalStaked = poolsV1TokenBalance?.[index]?.tokenBal ?? BigNumber.from(0);
        if (poolInfo?.timestampStart > currentEpoch || poolInfo?.timestampEnd < currentEpoch || totalStaked.eq(0)) return acc; //Do not acc inactive pools
        return curr?.amount?.mul(poolInfo.rewardPerSecond).div(totalStaked).add(acc);
      }
      , BigNumber.from(0)) ?? BigNumber.from(0);

    const chronoRps = chronoPoolAccountInfo.reduce((acc, curr) => curr?.emissionRate?.add(acc), BigNumber.from(0)) ?? BigNumber.from(0);
    const exoticRps = exoticFarmAccountInfo.reduce((acc, curr) => curr?.emissionRate?.add(acc), BigNumber.from(0)) ?? BigNumber.from(0);

    return chronoRps.add(exoticRps).add(v2FarmsRps).add(poolsV1Rps).mul(86400); //86400 seconds per day
  } catch (e) {
    return BigNumber.from(0)
  }
}

export const getTokensHarvestable = (poolsV1AccountInfo, tribePoolAccountInfo) => {
  let tokensHarvestableList = [];
  try {//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    poolsV1AccountInfo.forEach((pool, index) => {
      if (POOLS_V1?.[index].rewardAssetName == "CZF") return; //dont need CZF
      const tokenIndex = tokensHarvestableList.findIndex((elem) => elem.name == POOLS_V1?.[index].rewardAssetName);
      const tokenHarvestable = pool?.pendingReward ?? BigNumber.from(0);
      if (tokenHarvestable.eq(0)) return; //No harvest
      if (tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name: POOLS_V1?.[index].rewardAssetName,
          tokenHarvestable: tokenHarvestable
        }
        if (POOLS_V1?.[index].rewardAssetName == "CZUSD") { //CZUSD must be first
          tokensHarvestableList.unshift(tokenWei);
        } else {
          tokensHarvestableList.push(tokenWei);
        }
      } else {
        tokensHarvestableList[tokenIndex].tokenHarvestable = tokensHarvestableList[tokenIndex].tokenHarvestable.add(tokenHarvestable);
      }

    });
    tribePoolAccountInfo.forEach((pool, index) => {
      if (TRIBE_POOLS?.[index].rewardAssetName == "CZF") return; //dont need CZF
      const tokenIndex = tokensHarvestableList.findIndex((elem) => elem.name == TRIBE_POOLS?.[index].rewardAssetName);
      const tokenHarvestable = pool?.pendingReward ?? BigNumber.from(0);
      if (tokenHarvestable.eq(0)) return; //No harvest
      if (tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name: TRIBE_POOLS?.[index].rewardAssetName,
          tokenHarvestable: tokenHarvestable
        }
        if (TRIBE_POOLS?.[index].rewardAssetName == "CZUSD") { //CZUSD must be first
          tokensHarvestableList.unshift(tokenWei);
        } else {
          tokensHarvestableList.push(tokenWei);
        }
      } else {
        tokensHarvestableList[tokenIndex].tokenHarvestable = tokensHarvestableList[tokenIndex].tokenHarvestable.add(tokenHarvestable);
      }

    });
  } catch (e) { }
  return tokensHarvestableList;
}

export const getDailyAccountTokensWei = (poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo, tribePoolInfo, tribePoolAccountInfo) => {
  let dailyTokensList = []
  const currentEpoch = Math.floor(Date.now() / 1000);
  try {//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    poolsV1AccountInfo.forEach((pool, index) => {
      if (POOLS_V1?.[index].rewardAssetName == "CZF") return; //dont need CZF
      const poolInfo = poolsV1Info?.[index];
      const tokenIndex = dailyTokensList.findIndex((elem) => elem.name == POOLS_V1?.[index].rewardAssetName);
      const totalStaked = poolsV1TokenBalance?.[index]?.tokenBal ?? BigNumber.from(0);
      if (poolInfo?.timestampStart > currentEpoch || poolInfo?.timestampEnd < currentEpoch || totalStaked.eq(0)) return; //inactive
      const rewardPerSecond = pool?.amount?.mul(poolInfo.rewardPerSecond).div(totalStaked);
      if (rewardPerSecond.eq(0)) return; //No earnings
      const rewardPerDay = rewardPerSecond.mul(86400);
      if (tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name: POOLS_V1?.[index].rewardAssetName,
          rewardPerDay: rewardPerDay
        }
        if (POOLS_V1?.[index].rewardAssetName == "CZUSD") { //CZUSD must be first
          dailyTokensList.unshift(tokenWei);
        } else {
          dailyTokensList.push(tokenWei);
        }
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    });
    tribePoolAccountInfo.forEach((pool, index) => {
      if (TRIBE_POOLS?.[index].rewardAssetName == "CZF") return; //dont need CZF
      const tokenIndex = dailyTokensList.findIndex((elem) => elem.name == TRIBE_POOLS?.[index].rewardAssetName);
      const poolInfo = tribePoolInfo?.[index];
      const totalStaked = poolInfo?.totalStaked ?? BigNumber.from(0);
      const rewardPerSecond = pool?.stakedBal?.mul(poolInfo?.rewardPerSecond).div(totalStaked) ?? BigNumber.from(0);
      if (rewardPerSecond.eq(0)) return; //No earnings
      const rewardPerDay = rewardPerSecond.mul(86400);
      if (tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name: TRIBE_POOLS?.[index].rewardAssetName,
          rewardPerDay: rewardPerDay
        }
        if (TRIBE_POOLS?.[index].rewardAssetName == "CZUSD") { //CZUSD must be first
          dailyTokensList.unshift(tokenWei);
        } else {
          dailyTokensList.push(tokenWei);
        }
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    });
  } catch (e) { }
  console.log("dailyTokensList", dailyTokensList)
  return dailyTokensList;
}