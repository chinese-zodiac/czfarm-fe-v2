import { BigNumber } from 'ethers';
import {FARM_V2} from "../constants/famsv2";
import {POOLS_V1} from "../constants/poolsv1";

export const getCzfHarvestable = (v2FarmsPendingCzf, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1AccountInfo) => {
  try{//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    const currentEpoch = BigNumber.from(Math.floor(Date.now()/1000));
    const czfFromV2Farms = v2FarmsPendingCzf.reduce((acc,curr)=>acc.add(curr?.pendingCzf),BigNumber.from(0));
    const czfFromChrono = chronoPoolAccountInfo.reduce((acc,curr)=>curr?.emissionRate?.mul(currentEpoch.sub(curr?.updateEpoch)).add(acc),BigNumber.from(0));
    const czfFromExotic = exoticFarmAccountInfo.reduce((acc,curr)=>curr?.emissionRate?.mul(currentEpoch.sub(curr?.updateEpoch)).add(acc),BigNumber.from(0));
    //TODO: add czf from pools
    const czfFromPoolsV1 = poolsV1AccountInfo.reduce(
      (acc,curr,index)=>{
        if(POOLS_V1?.[index].rewardAssetName != "CZF") return acc; //Only acc CZF harvest
        return curr?.pendingReward?.add(acc);
      }
      ,BigNumber.from(0)) ?? BigNumber.from(0);
    return czfFromV2Farms.add(czfFromChrono).add(czfFromExotic).add(czfFromPoolsV1);
  } catch(e) { console.log(e);return BigNumber.from(0)}
}

export const getDailyCzfWei = (v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo) => {
  try{//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
   
    const v2CzfPerSecondPerAllocPoint = v2FarmsSettings?.czfPerBlock?.div(3).div(v2FarmsSettings?.totalAllocPoint) ?? BigNumber.from(0); //3 seconds per block
    const v2FarmsRps = v2FarmsUserInfo.reduce(
      (acc,curr,index)=>v2CzfPerSecondPerAllocPoint?.mul(v2FarmsPoolInfo?.[index]?.allocPoint).mul(curr?.amount).div(v2FarmsLpBal?.[index]?.lpBal).add(acc)
      ,BigNumber.from(0)) ?? BigNumber.from(0);

    const currentEpoch = Math.floor(Date.now()/1000);
    const poolsV1Rps = poolsV1AccountInfo.reduce(
      (acc,curr,index)=>{
        let poolInfo = poolsV1Info?.[index];
        if(POOLS_V1?.[index].rewardAssetName != "CZF") return acc; //Only acc CZF rewards
        let totalStaked = poolsV1TokenBalance?.[index]?.tokenBal ?? BigNumber.from(0);
        if(poolInfo?.timestampStart > currentEpoch || poolInfo?.timestampEnd < currentEpoch || totalStaked.eq(0)) return acc; //Do not acc inactive pools
        return curr?.amount?.mul(poolInfo.rewardPerSecond).div(totalStaked).add(acc);
      }
      ,BigNumber.from(0)) ?? BigNumber.from(0);

    const chronoRps = chronoPoolAccountInfo.reduce((acc,curr)=>curr?.emissionRate?.add(acc),BigNumber.from(0)) ?? BigNumber.from(0);
    const exoticRps = exoticFarmAccountInfo.reduce((acc,curr)=>curr?.emissionRate?.add(acc),BigNumber.from(0)) ?? BigNumber.from(0);

    return chronoRps.add(exoticRps).add(v2FarmsRps).add(poolsV1Rps).mul(86400); //86400 seconds per day
  } catch(e) {
    return BigNumber.from(0)
  }
}

export const getTokensHarvestable = (poolsV1AccountInfo) => {
  let tokensHarvestableList = [];
  try{//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    poolsV1AccountInfo.forEach((pool,index)=>{
      if(POOLS_V1?.[index].rewardAssetName == "CZF") return; //dont need CZF
      const tokenIndex = tokensHarvestableList.findIndex((elem)=>elem.name == POOLS_V1?.[index].rewardAssetName);
      const tokenHarvestable = pool?.pendingReward ?? BigNumber.from(0);
      if(tokenHarvestable.eq(0)) return; //No harvest
      if(tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name:POOLS_V1?.[index].rewardAssetName,
          tokenHarvestable: tokenHarvestable
        }
        if(POOLS_V1?.[index].rewardAssetName == "CZUSD") { //CZUSD must be first
          tokensHarvestableList.unshift(tokenWei);
        } else {
          tokensHarvestableList.push(tokenWei);
        }
      } else {
        tokensHarvestableList[tokenIndex].tokenHarvestable = tokensHarvestableList[tokenIndex].tokenHarvestable.add(tokenHarvestable);
      }

    });
  } catch(e) {}
  return tokensHarvestableList;
}

export const getDailyAccountTokensWei = (poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo) => {
  let dailyTokensList = []
  const currentEpoch = Math.floor(Date.now()/1000);
  try{//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    poolsV1AccountInfo.forEach((pool,index)=>{
      if(POOLS_V1?.[index].rewardAssetName == "CZF") return; //dont need CZF
      const poolInfo = poolsV1Info?.[index];
      const tokenIndex = dailyTokensList.findIndex((elem)=>elem.name == POOLS_V1?.[index].rewardAssetName);
      const totalStaked = poolsV1TokenBalance?.[index]?.tokenBal ?? BigNumber.from(0);
      if(poolInfo?.timestampStart > currentEpoch || poolInfo?.timestampEnd < currentEpoch || totalStaked.eq(0)) return; //inactive
      const rewardPerSecond = pool?.amount?.mul(poolInfo.rewardPerSecond).div(totalStaked);
      if(rewardPerSecond.eq(0)) return; //No earnings
      const rewardPerDay = rewardPerSecond.mul(86400);
      if(tokenIndex == -1) {
        //Token not in array yet
        let tokenWei = {
          name:POOLS_V1?.[index].rewardAssetName,
          rewardPerDay: rewardPerDay
        }
        if(POOLS_V1?.[index].rewardAssetName == "CZUSD") { //CZUSD must be first
          dailyTokensList.unshift(tokenWei);
        } else {
          dailyTokensList.push(tokenWei);
        }
      } else {
        dailyTokensList[tokenIndex].rewardPerDay = dailyTokensList[tokenIndex].rewardPerDay.add(rewardPerDay);
      }
    });
  } catch(e) {}
  return dailyTokensList;
}