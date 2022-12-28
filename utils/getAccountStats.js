import { BigNumber } from 'ethers';
import { FARM_V2 } from "../constants/famsv2";
import { POOLS_V1 } from "../constants/poolsv1";
import { TRIBE_POOLS } from "../constants/tribepools";
import { BURN_POOLS } from "../constants/burnpools";


export const getCzrHarvestableBurnPools = (burnPoolsAccountInfo) => {
  return burnPoolsAccountInfo.reduce((acc, curr) => acc.add(curr?.pendingReward ?? BigNumber.from(0)), BigNumber.from(0)) ?? BigNumber.from(0);
}

export const getSingleV2FarmCzfPerSecondWei = (v2FarmsSettings, singleV2FarmsLpBal, singleV2FarmsPoolInfo, singleV2FarmsUserInfo) => {
  const v2CzfPerSecondPerAllocPoint = v2FarmsSettings?.czfPerBlock?.div(3).div(v2FarmsSettings?.totalAllocPoint) ?? BigNumber.from(0); //3 seconds per block
  return v2CzfPerSecondPerAllocPoint?.mul(singleV2FarmsPoolInfo?.allocPoint ?? BigNumber.from(0)).mul(singleV2FarmsUserInfo?.amount ?? BigNumber.from(0)).div(singleV2FarmsLpBal?.lpBal ?? BigNumber.from(1));
}

export const getTokensHarvestable = (tribePoolAccountInfo) => {
  let tokensHarvestableList = [];
  try {//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    tribePoolAccountInfo.forEach((pool, index) => {
      const tokenIndex = tokensHarvestableList.findIndex((elem) => elem.name == TRIBE_POOLS?.[index].rewardAssetName);
      const tokenHarvestable = pool?.pendingReward ?? BigNumber.from(0);
      if (tokenHarvestable.eq(0)) return; //No harvest
      if (tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name: TRIBE_POOLS?.[index].rewardAssetName,
          tokenHarvestable: tokenHarvestable
        }
        tokensHarvestableList.push(tokenWei);
      } else {
        tokensHarvestableList[tokenIndex].tokenHarvestable = tokensHarvestableList[tokenIndex].tokenHarvestable.add(tokenHarvestable);
      }

    });
    /*tribePoolAccountInfo.forEach((pool, index) => {
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

    });*/
  } catch (e) { }
  return tokensHarvestableList;
}

export const getDailyAccountTokensWei = (tribePoolInfo, tribePoolAccountInfo, burnPoolInfo, burnPoolAccountInfo) => {
  let dailyTokensList = []
  const currentEpoch = Math.floor(Date.now() / 1000);
  try {//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    tribePoolAccountInfo.forEach((pool, index) => {
      const poolInfo = tribePoolInfo?.[index];
      const tokenIndex = dailyTokensList.findIndex((elem) => elem.name == TRIBE_POOLS?.[index].rewardAssetName);
      const totalStaked = poolInfo?.totalStaked ?? BigNumber.from(0);
      const rewardPerSecond = pool?.stakedBal?.mul(poolInfo?.rewardPerSecond).div(totalStaked);
      if (rewardPerSecond.eq(0)) return; //No earnings
      const rewardPerDay = rewardPerSecond.mul(86400);
      if (tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name: TRIBE_POOLS?.[index].rewardAssetName,
          rewardPerDay: rewardPerDay
        }
        if (TRIBE_POOLS?.[index].rewardAssetName == "CZR") { //CZR must be first
          dailyTokensList.unshift(tokenWei);
        } else {
          dailyTokensList.push(tokenWei);
        }
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    });
    burnPoolAccountInfo.forEach((poolAccountInfo, index) => {
      const poolInfo = burnPoolInfo?.[index];
      const tokenIndex = dailyTokensList.findIndex((elem) => elem.name == BURN_POOLS?.[index].rewardAssetName);
      const totalShares = burnPoolInfo?.[index]?.totalShares ?? BigNumber.from(0);
      if (burnPoolInfo?.timestampStart > currentEpoch || burnPoolInfo?.timestampEnd < currentEpoch || totalShares.eq(0)) return; //inactive
      const rewardPerSecond = poolAccountInfo?.shares?.mul(burnPoolInfo?.[index]?.rewardPerSecond ?? 0)?.div(totalShares) ?? BigNumber.from(0);
      if (rewardPerSecond?.eq(0)) return; //No earnings
      const rewardPerDay = rewardPerSecond.mul(86400);
      if (tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name: BURN_POOLS?.[index].rewardAssetName,
          rewardPerDay: rewardPerDay
        }
        if (BURN_POOLS?.[index].rewardAssetName == "CZR") { //CZR must be first
          dailyTokensList.unshift(tokenWei);
        } else {
          dailyTokensList.push(tokenWei);
        }
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    })
    /*tribePoolAccountInfo.forEach((pool, index) => {
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
    });*/
  } catch (e) { console.log(e) }
  return dailyTokensList;
}