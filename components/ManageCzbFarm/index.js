
import { useContractFunction, useTokenAllowance } from '@usedapp/core';
import { BigNumber, Contract, constants, utils } from 'ethers';
import React, { useEffect, useState } from 'react';
import CZBFarmMaster from "../../abi/CZBFarmMaster.json";
import ierc20Abi from "../../abi/IERC20.json";
import CollapsibleCard from '../../components/CollapsibleCard';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import InputTokenEther from '../../components/InputTokenEther';
import QuickInputEther from '../../components/QuickInputEther';
import { ADDRESS_CZBMASTER } from '../../constants/addresses';
import CZBLogo from "../../public/static/assets/images/tokens/CZB.png";
import { tokenAmtToShortString, weiToShortString, weiToUsdWeiVal } from '../../utils/bnDisplay';
import { dexAddLink } from '../../utils/dexBuyLink';
import { getSingleCzbFarmCzbPerSecondWei } from '../../utils/getAccountStats';
import { getLpTokenValueUsdWad } from '../../utils/getLpTokenValueUsdWad';
import CollapsibleCardTitleItem from '../CollapsibleCardTitleItem';
const { parseEther } = utils;
const { MaxUint256 } = constants;

export default function ManageCzbFarm({ account, library, farm, czbFarmsSettings, czbFarmsLpBal, czbFarmsPoolInfo, czbFarmsPendingCzb, czbFarmsUserInfo, lpInfo, accountLpBal, czbPrice, czusdPrice }) {
  const [apr, setApr] = useState(0);
  const [inputEther, setInputEther] = useState(0);
  const [outputEther, setOutputEther] = useState(0);

  const isSwap = (farm?.tokens?.[1]?.symbol == "CZF") ? true : false;

  const { state: stateClaim, send: sendClaim } = useContractFunction(
    new Contract(ADDRESS_CZBMASTER, CZBFarmMaster, library),
    'claim');
  const { state: stateWithdraw, send: sendWithdraw } = useContractFunction(
    new Contract(ADDRESS_CZBMASTER, CZBFarmMaster, library),
    'withdraw');
  const { state: stateDeposit, send: sendDeposit } = useContractFunction(
    new Contract(ADDRESS_CZBMASTER, CZBFarmMaster, library),
    'deposit');

  const lpAllowance = useTokenAllowance(farm.lp, account, ADDRESS_CZBMASTER);
  const { state: stateApprove, send: sendApprove } = useContractFunction(
    new Contract(farm.lp, ierc20Abi, library),
    'approve');

  useEffect(() => {
    if (!czbFarmsSettings?.czbPerSecond || !czbFarmsSettings?.totalAllocPoint || !lpInfo?.totalSupply || !lpInfo?.tokens[0] || !czbFarmsPoolInfo?.allocPoint || !czbFarmsLpBal?.lpBal || !czbPrice || !czusdPrice) {
      setApr("0.00");
      return;
    }
    let usdPerYear = weiToUsdWeiVal(czbFarmsSettings.czbPerSecond.mul(10519200).mul(czbFarmsPoolInfo.allocPoint).div(czbFarmsSettings.totalAllocPoint), czbPrice);
    let usdStaked = getLpTokenValueUsdWad(farm.tokens[0].symbol, lpInfo, czbFarmsLpBal.lpBal, czbPrice, czusdPrice, isSwap);
    if (usdStaked.eq(0)) {
      usdStaked = BigNumber.from(1);
    }
    setApr(tokenAmtToShortString(BigNumber.from(1000000).mul(usdPerYear).div(usdStaked), 4, 2));
  }, [!czbFarmsSettings?.czbPerSecond || !czbFarmsSettings?.totalAllocPoint, lpInfo?.totalSupply, lpInfo?.tokens[0], czbFarmsPoolInfo?.allocPoint, czbFarmsLpBal?.lpBal, czbPrice, czusdPrice])

  return (<>
    <CollapsibleCard className="mb-3"
      title={(<div className='has-text-white pb-2 pt-2 '>
        <div className="is-inline-block is-narrow is-mobile m-0 p-0 pt-1 mr-2" style={{ position: "relative" }}>
          <figure className="image is-32x32 is-inline-block m-0 p-0">
            <img className="has-background-special is-rounded" src={`./static/assets/images/tokens/${farm?.tokens?.[0]?.symbol}.png`} />
          </figure>
          <figure className="image is-32x32 is-inline-block ml-0 mt-0 mb-0 p-0" style={{ position: "relative", top: "0.5em", left: "-1em", marginRight: "-1em" }}>
            <img className="has-background-special is-rounded" src={`./static/assets/images/tokens/${farm?.tokens?.[1]?.symbol}.png`} />
          </figure>
          <span className='icon m-0 p-0 ' style={{ width: "0.6em", position: "relative", top: "-0.6em" }}><i className="fa-solid fa-angle-right"></i></span>
          <figure className="image is-32x32 is-inline-block m-0 p-0 ">
            <img className="has-background-special is-rounded" src={CZBLogo} />
          </figure>
        </div>
        <CollapsibleCardTitleItem title="TYPE" width="6.5em">
          <span className='is-size-6'>{farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="DEX" width="3em">
          <span className='is-size-6'>{farm?.dex?.shortName}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="APR" width="4.5em">
          <span className='is-size-6'>{(apr)}%</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="TVL" width="4.5em">
          <span className='is-size-6'>${weiToShortString(getLpTokenValueUsdWad(farm?.tokens?.[0]?.symbol ?? "CZB", lpInfo, czbFarmsLpBal?.lpBal, czbPrice, czusdPrice, isSwap), 1)}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="STAKE" width="4.5em">
          <span className='is-size-6'>${weiToShortString(getLpTokenValueUsdWad(farm?.tokens?.[0]?.symbol ?? "CZB", lpInfo, czbFarmsUserInfo?.amount, czbPrice, czusdPrice, isSwap), 1)}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="CZB/DAY" width="4em">
          <span className='is-size-6'>{weiToShortString(getSingleCzbFarmCzbPerSecondWei(czbFarmsSettings, czbFarmsLpBal, czbFarmsPoolInfo, czbFarmsUserInfo).mul(86400), 1)}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="EST CLAIM" width="4em">
          <span className='is-size-6'>{weiToShortString(czbFarmsPendingCzb?.pendingCzb, 2)}</span>
        </CollapsibleCardTitleItem>
      </div>)}>
      {!account && (<>
        <ConnectOrLearn />
      </>)}
      {(!!account && lpAllowance?.lte(accountLpBal ?? 0)) && (
        <div>
          <p className='mb-2'>To use this {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} Farms V2, you need to approve the Exotic Master address <code>{ADDRESS_CZBMASTER}</code> to use your {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} LP tokens. You can use the button below.</p>
          <button onClick={() => sendApprove(ADDRESS_CZBMASTER, MaxUint256)} className='button has-background-grey-lighter is-fullwidth'>Approve</button>
        </div>
      )}
      {(!!account && lpAllowance?.gt(accountLpBal ?? 0)) && (<>
        <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
          <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Stake {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} LP For CZB/Second</h3>
            <p>Stake your ${farm?.tokens?.[0]?.symbol}/${farm?.tokens?.[1]?.symbol} LP and get CZB every second. 1% fee.</p>
            <a className="has-text-primary" style={{ textDecoration: "underline" }}
              href={dexAddLink(farm?.tokens?.[0]?.address, farm?.tokens?.[1]?.address, farm?.dex)} target="_blank">
              Mint {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} on CZ.Cash <span className="icon"><i className="fa-solid fa-up-right-from-square"></i></span>
            </a>
            <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
              style={{ maxWidth: "10em", width: "100%" }}
              step="any"
              precision={0.01}
              label={`${farm?.tokens?.[0]?.symbol}/${farm?.tokens?.[1]?.symbol}`}
              minWadBn={BigNumber.from(0)} maxWadBn={accountLpBal}
              {...{ setInputEther, inputEther }}
            />
            <p className='is-size-7 mt-0 mb-1 ml-2' >(${weiToShortString(getLpTokenValueUsdWad(farm?.tokens?.[0]?.symbol, lpInfo, parseEther(inputEther.toString()), czbPrice, czusdPrice, isSwap), 2)})</p>
            <QuickInputEther {...{ setInputEther }} maxTokenWad={accountLpBal} />
            <button onClick={() => sendDeposit(farm?.pid, parseEther(inputEther.toString()), true)} className='button has-background-grey-lighter is-fullwidth'>Stake {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} LP</button>
          </div>
          <div className="is-inline-block p-3 m-3 is-align-self-stretch " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Unstake your {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} LP</h3>
            <p>Unstake your ${farm?.tokens?.[0]?.symbol}/${farm?.tokens?.[1]?.symbol} LP. 1% fee. Rewards are claimed.</p>
            <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
              style={{ maxWidth: "10em", width: "100%" }}
              step="any"
              precision={0.01}
              label={`${farm?.tokens?.[0]?.symbol}/${farm?.tokens?.[1]?.symbol}`}
              minWadBn={BigNumber.from(0)} maxWadBn={czbFarmsUserInfo?.amount ?? BigNumber.from(0)}
              inputEther={outputEther} setInputEther={setOutputEther}
            />
            <p className='is-size-7 mt-0 mb-1 ml-2' >(${weiToShortString(getLpTokenValueUsdWad(farm?.tokens?.[0]?.symbol, lpInfo, parseEther(outputEther.toString()), czbPrice, czusdPrice, isSwap), 2)})</p>
            <QuickInputEther setInputEther={setOutputEther} maxTokenWad={czbFarmsUserInfo?.amount ?? BigNumber.from(0)} />
            <button onClick={() => sendWithdraw(farm?.pid, parseEther(outputEther.toString()), true)} className='button has-background-grey-lighter is-fullwidth'>Unstake {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} LP</button>
          </div>
          <div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Claim Your CZB</h3>
            <p>Harvests your CZB for this farm only and transfers it to your wallet.</p><br />
            <button onClick={() => sendClaim(farm?.pid)} className='button has-background-grey-lighter is-fullwidth'>Harvest</button>
            <p>You will get {weiToShortString(czbFarmsPendingCzb?.pendingCzb, 3)} CZB.</p>
          </div>
        </div>
      </>)}
    </CollapsibleCard>

  </>);
}