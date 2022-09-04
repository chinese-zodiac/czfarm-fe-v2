import React, { Component, useState } from 'react';
import { useEthers, useCall, useEtherBalance, useTokenBalance  } from '@usedapp/core';


export default function BadRabbits({czfPrice,czusdPrice,chronoVestingsTotalVesting,poolsV1TokenBalance,v2FarmsLpBal,lpInfos,accountEtherBalance}) {
  const {account,library,chainId} = useEthers();
  return(<>
    <p>BadRabbits</p>
  </>)
    

}