import { BigNumber } from 'ethers';

export const getHarvestablePidsChrono = (chronoPoolAccountInfo) => {
  let pidList = [];
  const currentEpoch = BigNumber.from(Math.floor(Date.now()/1000));
  try{//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    chronoPoolAccountInfo.forEach((pool)=>{
      if(pool?.emissionRate?.mul(currentEpoch.sub(pool?.updateEpoch))?.gt(0)) pidList.push(pool?.pid);
    });
  } catch(e){}
  return pidList
}

export const getHarvestablePidsExotic = (exoticFarmAccountInfo) => {
  let pidList = [];
  const currentEpoch = BigNumber.from(Math.floor(Date.now()/1000));
  try{//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    exoticFarmAccountInfo.forEach((farm)=>{
      if(farm?.emissionRate?.mul(currentEpoch.sub(farm?.updateEpoch))?.gt(0)) pidList.push(farm?.pid);
    });
  } catch(e){}
  return pidList
}

export const getHarvestablePidsV2Farms = (v2FarmsPendingCzf) => {
  let pidList = [];
  try{//Since bignumbers from contracts are often undefined, the shortest way to handle all cases is to return 0 if below code crashes. WARNING! This may cause errors to fail silently here.
    v2FarmsPendingCzf.forEach((farm)=>{
      if(farm?.pendingCzf?.gt(0)) pidList.push(farm?.pid);
    });
  } catch(e){}
  return pidList
}