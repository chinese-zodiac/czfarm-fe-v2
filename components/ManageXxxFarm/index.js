import { useContractFunction, useTokenAllowance } from '@usedapp/core';
import { BigNumber, Contract, constants, utils } from 'ethers';
import React, { useEffect, useState } from 'react';
import CZBFarmMaster from '../../abi/CZBFarmMaster.json';
import ierc20Abi from '../../abi/IERC20.json';
import CollapsibleCard from '../../components/CollapsibleCard';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import InputTokenEther from '../../components/InputTokenEther';
import QuickInputEther from '../../components/QuickInputEther';
import {
  tokenAmtToShortString,
  weiToShortString,
  weiToUsdWeiVal,
} from '../../utils/bnDisplay';
import { dexAddLink } from '../../utils/dexBuyLink';
import { getSingleXxxFarmXxxPerSecondWei } from '../../utils/getAccountStats';
import { getLpTokenValueUsdWad } from '../../utils/getLpTokenValueUsdWad';
import CollapsibleCardTitleItem from '../CollapsibleCardTitleItem';
const { parseEther } = utils;
const { MaxUint256 } = constants;

export default function ManageXxxFarm({
  account,
  library,
  farm,
  xxxFarmsSettings,
  xxxFarmsPoolInfo,
  xxxFarmsPendingXxx,
  xxxFarmsUserInfo,
  lpInfo,
  accountLpBal,
  xxxPrice,
  czusdPrice,
  address_xxx_master,
  xxx_Symbol,
  xxxLogo,
}) {
  const [apr, setApr] = useState(0);
  const [inputEther, setInputEther] = useState(0);
  const [outputEther, setOutputEther] = useState(0);

  const isSwap =
    (farm?.tokens?.[0]?.symbol == 'CZB' &&
      farm?.tokens?.[1]?.symbol == 'CZF') ||
    (farm?.tokens?.[0]?.symbol == 'BANDIT' &&
      farm?.tokens?.[1]?.symbol == 'CZB') ||
    (farm?.tokens?.[0]?.symbol == 'BANDIT' &&
      farm?.tokens?.[1]?.symbol == 'CZUSD');

  const { state: stateClaim, send: sendClaim } = useContractFunction(
    new Contract(address_xxx_master, CZBFarmMaster, library),
    'claim'
  );
  const { state: stateWithdraw, send: sendWithdraw } = useContractFunction(
    new Contract(address_xxx_master, CZBFarmMaster, library),
    'withdraw'
  );
  const { state: stateDeposit, send: sendDeposit } = useContractFunction(
    new Contract(address_xxx_master, CZBFarmMaster, library),
    'deposit'
  );

  const lpAllowance = useTokenAllowance(farm.lp, account, address_xxx_master);
  const { state: stateApprove, send: sendApprove } = useContractFunction(
    new Contract(farm.lp, ierc20Abi, library),
    'approve'
  );

  useEffect(() => {
    if (
      !xxxFarmsSettings?.xxxPerSecond ||
      !xxxFarmsSettings?.totalAllocPoint ||
      !lpInfo?.totalSupply ||
      !lpInfo?.tokens[0] ||
      !xxxFarmsPoolInfo?.allocPoint ||
      !xxxFarmsPoolInfo?.totalDeposit ||
      !xxxPrice ||
      !czusdPrice
    ) {
      setApr('0.00');
      return;
    }
    let usdPerYear = weiToUsdWeiVal(
      xxxFarmsSettings.xxxPerSecond
        .mul(31557601)
        .mul(xxxFarmsPoolInfo.allocPoint)
        .div(xxxFarmsSettings.totalAllocPoint),
      xxxPrice
    );
    let usdStaked = getLpTokenValueUsdWad(
      farm.tokens[0].symbol,
      lpInfo,
      xxxFarmsPoolInfo?.totalDeposit,
      xxxPrice,
      czusdPrice,
      isSwap
    );
    if (usdStaked.eq(0)) {
      usdStaked = BigNumber.from(1);
    }
    setApr(
      tokenAmtToShortString(
        BigNumber.from(1000000).mul(usdPerYear).div(usdStaked),
        4,
        2
      )
    );
  }, [
    !xxxFarmsSettings?.xxxPerSecond || !xxxFarmsSettings?.totalAllocPoint,
    lpInfo?.totalSupply,
    lpInfo?.tokens[0],
    xxxFarmsPoolInfo?.allocPoint,
    xxxFarmsPoolInfo?.totalDeposit,
    xxxPrice,
    czusdPrice,
  ]);

  return (
    <>
      <CollapsibleCard
        className="mb-3"
        title={
          <div className="has-text-white pb-2 pt-2 ">
            <div
              className="is-inline-block is-narrow is-mobile m-0 p-0 pt-1 mr-2"
              style={{ position: 'relative' }}
            >
              <figure className="image is-32x32 is-inline-block m-0 p-0">
                <img
                  className="has-background-special is-rounded"
                  src={`./static/assets/images/tokens/${farm?.tokens?.[0]?.symbol}.png`}
                />
              </figure>
              <figure
                className="image is-32x32 is-inline-block ml-0 mt-0 mb-0 p-0"
                style={{
                  position: 'relative',
                  top: '0.5em',
                  left: '-1em',
                  marginRight: '-1em',
                }}
              >
                <img
                  className="has-background-special is-rounded"
                  src={`./static/assets/images/tokens/${farm?.tokens?.[1]?.symbol}.png`}
                />
              </figure>
              <span
                className="icon m-0 p-0 "
                style={{ width: '0.6em', position: 'relative', top: '-0.6em' }}
              >
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <figure className="image is-32x32 is-inline-block m-0 p-0 ">
                <img
                  className="has-background-special is-rounded"
                  src={xxxLogo}
                />
              </figure>
            </div>
            <CollapsibleCardTitleItem title="TYPE" width="6.5em">
              <span className="is-size-6">
                {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol}
              </span>
            </CollapsibleCardTitleItem>
            <CollapsibleCardTitleItem title="DEX" width="3em">
              <span className="is-size-6">{farm?.dex?.shortName}</span>
            </CollapsibleCardTitleItem>
            <CollapsibleCardTitleItem title="APR" width="4.5em">
              <span className="is-size-6">{apr}%</span>
            </CollapsibleCardTitleItem>
            <CollapsibleCardTitleItem title="TVL" width="4.5em">
              <span className="is-size-6">
                $
                {weiToShortString(
                  getLpTokenValueUsdWad(
                    farm?.tokens?.[0]?.symbol ?? xxx_Symbol,
                    lpInfo,
                    xxxFarmsPoolInfo?.totalDeposit,
                    xxxPrice,
                    czusdPrice,
                    isSwap
                  ),
                  1
                )}
              </span>
            </CollapsibleCardTitleItem>
            <CollapsibleCardTitleItem title="STAKE" width="4.5em">
              <span className="is-size-6">
                $
                {weiToShortString(
                  getLpTokenValueUsdWad(
                    farm?.tokens?.[0]?.symbol ?? xxx_Symbol,
                    lpInfo,
                    xxxFarmsUserInfo?.amount,
                    xxxPrice,
                    czusdPrice,
                    isSwap
                  ),
                  1
                )}
              </span>
            </CollapsibleCardTitleItem>
            <CollapsibleCardTitleItem title={`${xxx_Symbol}/DAY`} width="4em">
              <span className="is-size-6">
                {weiToShortString(
                  getSingleXxxFarmXxxPerSecondWei(
                    xxxFarmsSettings,
                    xxxFarmsPoolInfo?.totalDeposit,
                    xxxFarmsPoolInfo,
                    xxxFarmsUserInfo
                  ).mul(86400),
                  1
                )}
              </span>
            </CollapsibleCardTitleItem>
            <CollapsibleCardTitleItem title="EST CLAIM" width="4em">
              <span className="is-size-6">
                {weiToShortString(xxxFarmsPendingXxx?.pendingXxx, 2)}
              </span>
            </CollapsibleCardTitleItem>
          </div>
        }
      >
        {!account && (
          <>
            <ConnectOrLearn />
          </>
        )}
        {!!account && lpAllowance?.lt(accountLpBal ?? 0) && (
          <div>
            <p className="mb-2">
              To use this {farm?.tokens?.[0]?.symbol}/
              {farm?.tokens?.[1]?.symbol} Farms V2, you need to approve the
              Exotic Master address <code>{address_xxx_master}</code> to use
              your {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol} LP
              tokens. You can use the button below.
            </p>
            <button
              onClick={() => sendApprove(address_xxx_master, MaxUint256)}
              className="button has-background-grey-lighter is-fullwidth"
            >
              Approve
            </button>
          </div>
        )}
        {!!account && lpAllowance?.gte(accountLpBal ?? 0) && (
          <>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
              <div
                className="is-inline-block p-3 m-3 is-align-self-flex-start "
                style={{ border: 'solid 1px #dbdbdb', maxWidth: '25em' }}
              >
                <h3 className="is-size-4">
                  Stake {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol}{' '}
                  LP For {xxx_Symbol}/Second
                </h3>
                <p>
                  Stake your ${farm?.tokens?.[0]?.symbol}/$
                  {farm?.tokens?.[1]?.symbol} LP and get {xxx_Symbol} every
                  second. 1% fee.
                </p>
                <a
                  className="has-text-primary"
                  style={{ textDecoration: 'underline' }}
                  href={dexAddLink(
                    farm?.tokens?.[0]?.address,
                    farm?.tokens?.[1]?.address,
                    farm?.dex
                  )}
                  target="_blank"
                >
                  Mint {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol}{' '}
                  on CZ.Cash{' '}
                  <span className="icon">
                    <i className="fa-solid fa-up-right-from-square"></i>
                  </span>
                </a>
                <InputTokenEther
                  className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                  style={{ maxWidth: '10em', width: '100%' }}
                  step="any"
                  precision={0.01}
                  label={`${farm?.tokens?.[0]?.symbol}/${farm?.tokens?.[1]?.symbol}`}
                  minWadBn={BigNumber.from(0)}
                  maxWadBn={accountLpBal}
                  {...{ setInputEther, inputEther }}
                />
                <p className="is-size-7 mt-0 mb-1 ml-2">
                  ($
                  {weiToShortString(
                    getLpTokenValueUsdWad(
                      farm?.tokens?.[0]?.symbol,
                      lpInfo,
                      (inputEther > 10e-10) ? parseEther(inputEther.toString()) : parseEther("0"),
                      xxxPrice,
                      czusdPrice,
                      isSwap
                    ),
                    2
                  )}
                  )
                </p>
                <QuickInputEther
                  {...{ setInputEther }}
                  maxTokenWad={accountLpBal}
                />
                <button
                  onClick={() =>
                    sendDeposit(
                      farm?.pid,
                      parseEther(inputEther.toString()),
                      true
                    )
                  }
                  className="button has-background-grey-lighter is-fullwidth"
                >
                  Stake {farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol}{' '}
                  LP
                </button>
              </div>
              <div
                className="is-inline-block p-3 m-3 is-align-self-stretch "
                style={{ border: 'solid 1px #dbdbdb', maxWidth: '25em' }}
              >
                <h3 className="is-size-4">
                  Unstake your {farm?.tokens?.[0]?.symbol}/
                  {farm?.tokens?.[1]?.symbol} LP
                </h3>
                <p>
                  Unstake your ${farm?.tokens?.[0]?.symbol}/$
                  {farm?.tokens?.[1]?.symbol} LP. 1% fee. Rewards are claimed.
                </p>
                <InputTokenEther
                  className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                  style={{ maxWidth: '10em', width: '100%' }}
                  step="any"
                  precision={0.0001}
                  label={`${farm?.tokens?.[0]?.symbol}/${farm?.tokens?.[1]?.symbol}`}
                  minWadBn={BigNumber.from(0)}
                  maxWadBn={xxxFarmsUserInfo?.amount ?? BigNumber.from(0)}
                  inputEther={outputEther}
                  setInputEther={setOutputEther}
                />
                <p className="is-size-7 mt-0 mb-1 ml-2">
                  ($
                  {weiToShortString(
                    getLpTokenValueUsdWad(
                      farm?.tokens?.[0]?.symbol,
                      lpInfo,
                      parseEther(outputEther.toString()),
                      xxxPrice,
                      czusdPrice,
                      isSwap
                    ),
                    2
                  )}
                  )
                </p>
                <QuickInputEther
                  setInputEther={setOutputEther}
                  maxTokenWad={xxxFarmsUserInfo?.amount ?? BigNumber.from(0)}
                />
                <button
                  onClick={() =>
                    sendWithdraw(
                      farm?.pid,
                      parseEther(outputEther.toString()),
                      true
                    )
                  }
                  className="button has-background-grey-lighter is-fullwidth"
                >
                  Unstake {farm?.tokens?.[0]?.symbol}/
                  {farm?.tokens?.[1]?.symbol} LP
                </button>
              </div>
              <div
                className="is-inline-block p-3 m-3 is-align-self-stretch"
                style={{ border: 'solid 1px #dbdbdb', maxWidth: '25em' }}
              >
                <h3 className="is-size-4">Claim Your {xxx_Symbol}</h3>
                <p>
                  Harvests your {xxx_Symbol} for this farm only and transfers it
                  to your wallet.
                </p>
                <br />
                <button
                  onClick={() => sendClaim(farm?.pid)}
                  className="button has-background-grey-lighter is-fullwidth"
                >
                  Harvest
                </button>
                <p>
                  You will get{' '}
                  {weiToShortString(xxxFarmsPendingXxx?.pendingXxx, 3)}{' '}
                  {xxx_Symbol}.
                </p>
              </div>
            </div>
          </>
        )}
      </CollapsibleCard>
    </>
  );
}
