import { BigNumber } from 'ethers';
import { BANDIT_FARMS, BANDIT_FARMS_SINGLES } from '../constants/banditfarms';
import { CZB_FARMS, CZB_FARMS_SINGLES } from '../constants/czbfarms';
import { TRIBE_POOLS } from "../constants/tribepools";


export const getCzrHarvestableBurnPools = (burnPoolsAccountInfo) => {
  return BigNumber.from(0);
  //return burnPoolsAccountInfo.reduce((acc, curr) => acc.add(curr?.pendingReward ?? BigNumber.from(0)), BigNumber.from(0)) ?? BigNumber.from(0);
}

export const getSingleV2FarmCzfPerSecondWei = (v2FarmsSettings, singleV2FarmsLpBal, singleV2FarmsPoolInfo, singleV2FarmsUserInfo) => {
  if (!singleV2FarmsLpBal?.lpBal || singleV2FarmsLpBal.lpBal.eq(0)) {
    return BigNumber.from(0)
  }
  const v2CzfPerSecondPerAllocPoint = v2FarmsSettings?.czfPerBlock?.div(3).div(v2FarmsSettings?.totalAllocPoint) ?? BigNumber.from(0); //3 seconds per block
  return v2CzfPerSecondPerAllocPoint?.mul(singleV2FarmsPoolInfo?.allocPoint ?? BigNumber.from(0)).mul(singleV2FarmsUserInfo?.amount ?? BigNumber.from(0)).div(singleV2FarmsLpBal?.lpBal ?? BigNumber.from(1));
}

export const getSingleXxxFarmXxxPerSecondWei = (xxxFarmsSettings, totalDeposit, singleXxxFarmsPoolInfo, singleXxxFarmsUserInfo) => {
  if (!totalDeposit || (!!totalDeposit && totalDeposit?.eq(0))) {
    return BigNumber.from(0)
  }
  const xxxPerSecondPerAllocPoint = xxxFarmsSettings?.xxxPerSecond?.div(xxxFarmsSettings?.totalAllocPoint) ?? BigNumber.from(0);
  return xxxPerSecondPerAllocPoint?.mul(singleXxxFarmsPoolInfo?.allocPoint ?? BigNumber.from(0)).mul(singleXxxFarmsUserInfo?.amount ?? BigNumber.from(0)).div(totalDeposit ?? BigNumber.from(1));
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

export const getDailyAccountTokensWei = (tribePoolInfo, tribePoolAccountInfo, czusdNotesAccountInfo, czbFarmsUserInfo, banditFarmsUserInfo,
  czbFarmsSettings, czbFarmsPoolInfo, banditFarmsSettings, banditFarmsPoolInfo,
  v2FarmsUserInfo, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, nftPoolCzrPerSecond) => {
  let dailyTokensList = []
  const currentEpoch = Math.floor(Date.now() / 1000);
  try {//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    if (czusdNotesAccountInfo.currYieldPerSecond_.gt(0)) {
      dailyTokensList.push({
        name: "CZUSD",
        rewardPerDay: czusdNotesAccountInfo.currYieldPerSecond_.mul(86400)
      });
    }
    if (nftPoolCzrPerSecond.gt(0)) {
      dailyTokensList.push({
        name: "CZR",
        rewardPerDay: nftPoolCzrPerSecond.mul(86400)
      });
    }
  } catch (e) { console.log("getDailyAccountTokensWei err") }
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
        dailyTokensList.push(tokenWei);
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    });

    [...CZB_FARMS_SINGLES, ...CZB_FARMS].forEach((farm, index) => {
      const rewardPerDay = getSingleXxxFarmXxxPerSecondWei(czbFarmsSettings, czbFarmsPoolInfo?.[index]?.totalDeposit, czbFarmsPoolInfo?.[index], czbFarmsUserInfo?.[index]).mul(86400);

      if (rewardPerDay.eq(0)) return; //No earnings
      const tokenIndex = dailyTokensList.findIndex((elem) => elem.name == 'CZB');
      if (tokenIndex == -1) {
        //Token not in array yet
        dailyTokensList.push({
          name: "CZB",
          rewardPerDay: rewardPerDay
        });
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    });

    [...BANDIT_FARMS_SINGLES, ...BANDIT_FARMS].forEach((farm, index) => {
      const rewardPerDay = getSingleXxxFarmXxxPerSecondWei(banditFarmsSettings, banditFarmsPoolInfo?.[index]?.totalDeposit, banditFarmsPoolInfo?.[index], banditFarmsUserInfo?.[index]).mul(86400);

      if (rewardPerDay.eq(0)) return; //No earnings
      const tokenIndex = dailyTokensList.findIndex((elem) => elem.name == '🎭🔫');
      if (tokenIndex == -1) {
        //Token not in array yet
        dailyTokensList.push({
          name: "🎭🔫",
          rewardPerDay: rewardPerDay
        });
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    })

    const v2FarmsRps = v2FarmsUserInfo.reduce(
      (acc, curr, index) => getSingleV2FarmCzfPerSecondWei(v2FarmsSettings, v2FarmsLpBal?.[index], v2FarmsPoolInfo?.[index], curr).add(acc)
      , BigNumber.from(0)) ?? BigNumber.from(0);
    const tokenIndex = dailyTokensList.findIndex((elem) => elem.name == 'CZF');
    if (tokenIndex == -1) {
      //Token not in array yet
      dailyTokensList.push({
        name: "CZF",
        rewardPerDay: v2FarmsRps
      });
    } else {
      dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(v2FarmsRps);
    }

  } catch (e) { console.log("getDailyAccountTokensWei err") }


  return dailyTokensList;
}