import { useCalls, useEthers } from "@usedapp/core";
import { Contract, BigNumber } from 'ethers';
import ChronoVesting from "../abi/ChronoVesting.json";
import {CHRONO_POOL} from "../constants/chronoPool";
import {EXOTIC_FARMS} from "../constants/exoticFarms";

//TODO: accept list of chrono vesting addresses

function useChronoVestingsTotalVesting(library) {
  const chronoVestingAddresses = [
    ...CHRONO_POOL.map((pool)=>pool.chronoVesting),
    ...EXOTIC_FARMS.flatMap((farmSet)=>farmSet.farms.map(farm=>farm.chronoVesting))
  ]
  const calls = chronoVestingAddresses.flatMap(chronoVestingAddress=>{
    const chronoVestingSc = new Contract(chronoVestingAddress,ChronoVesting,library);
    return [
      {
        contract:chronoVestingSc,
        method:'totalRewardsWad',
        args:[]
      },
      {
        contract:chronoVestingSc,
        method:'totalClaimedWad',
        args:[]
      }
    ]
  })
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      //console.error(`ERROR calling 'balanceOf' on ${calls[idx]?.contract.address}`);
    }
  });
  let chronoVestingsTotalVesting = {}
  chronoVestingAddresses.forEach((chronoVestingAddress,index)=>{
    const totalRewardsWad = results?.[index*2]?.value?.[0] ?? BigNumber.from(0);
    const totalClaimedWad = results?.[index*2+1]?.value?.[0] ?? BigNumber.from(0);
    chronoVestingsTotalVesting[chronoVestingAddress] = totalRewardsWad.sub(totalClaimedWad);
  });
  return chronoVestingsTotalVesting
}


export default useChronoVestingsTotalVesting;