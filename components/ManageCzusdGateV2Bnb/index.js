import {
  useCall,
  useContractFunction,
  useTokenAllowance,
  useTokenBalance,
} from '@usedapp/core';
import { BigNumber, Contract, constants, utils } from 'ethers';
import React, { useState } from 'react';
import CzusdGateAbi from '../../abi/CzusdGateV2Bnb.json';
import ierc20Abi from '../../abi/IERC20.json';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import InputTokenEther from '../../components/InputTokenEther';
import QuickInputEther from '../../components/QuickInputEther';
import {
  ADDRESS_CZUSD,
  ADDRESS_CZUSDGATE_V2_BNB,
  ADDRESS_USDT,
  ADDRESS_WBNB,
} from '../../constants/addresses';
import { formatEther } from '@ethersproject/units';
import { weiToShortString } from '../../utils/bnDisplay';

const { parseEther } = utils;
const { MaxUint256 } = constants;

export default function ManageCzusdGateV2Bnb({
  account,
  library,
  currentEpoch,
  czusdBal,
}) {
  const [inputEtherBnb, setInputEtherBnb] = useState(0);
  const [inputEtherCzusd, setInputEtherCzusd] = useState(0);

  const wbnbBal = useTokenBalance(ADDRESS_WBNB, account) ?? BigNumber.from(0);
  const wbnbAllowance =
    useTokenAllowance(ADDRESS_WBNB, account, ADDRESS_CZUSDGATE_V2_BNB) ??
    BigNumber.from(0);
  const czusdAllowance =
    useTokenAllowance(ADDRESS_CZUSD, account, ADDRESS_CZUSDGATE_V2_BNB) ??
    BigNumber.from(0);

  const { value: getCzusdInResult, error: getCzusdInError } =
    useCall({
      contract: new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi),
      method: 'getCzusdIn',
      args: [parseEther(inputEtherBnb?.toString() ?? '0')],
    }) ?? {};
  const { value: getCzusdOutResult, error: getCzusdOutError } =
    useCall({
      contract: new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi),
      method: 'getCzusdOut',
      args: [parseEther(inputEtherBnb?.toString() ?? '0')],
    }) ?? {};
  const { value: getBnbInResult, error: getBnbInError } =
    useCall({
      contract: new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi),
      method: 'getBnbIn',
      args: [parseEther(inputEtherCzusd?.toString() ?? '0')],
    }) ?? {};
  const { value: getBnbOutResult, error: getBnbOutError } =
    useCall({
      contract: new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi),
      method: 'getBnbOut',
      args: [parseEther(inputEtherCzusd?.toString() ?? '0')],
    }) ?? {};

  const { state: stateBuyBnbWithCzusd, send: sendBuyBnbWithCzusd } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'buyBnbWithCzusd'
    );
  const { state: stateBuyWbnbWithCzusd, send: sendBuyWbnbWithCzusd } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'buyWbnbWithCzusd'
    );
  const { state: stateBuyCzusdWithBnb, send: sendBuyCzusdWithBnb } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'buyCzusdWithBnb'
    );
  const { state: stateBuyCzusdWithWbnb, send: sendBuyCzusdWithWbnb } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'buyCzusdWithBnb'
    );

  const { state: stateSellBnbForCzusd, send: sendSellBnbForCzusd } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'sellBnbForCzusd'
    );
  const { state: stateSellWbnbForCzusd, send: sendSellWbnbForCzusd } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'sellWbnbForCzusd'
    );
  const { state: stateSellCzusdForBnb, send: sendSellCzusdForBnb } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'sellCzusdForBnb'
    );
  const { state: stateSellCzusdForWbnb, send: sendSellCzusdForWbnb } =
    useContractFunction(
      new Contract(ADDRESS_CZUSDGATE_V2_BNB, CzusdGateAbi, library),
      'sellCzusdForWbnb'
    );

  const { state: stateApproveWbnb, send: sendApproveWbnb } =
    useContractFunction(
      new Contract(ADDRESS_WBNB, ierc20Abi, library),
      'approve'
    );
  const { state: stateApproveCzusd, send: sendApproveCzusd } =
    useContractFunction(
      new Contract(ADDRESS_CZUSD, ierc20Abi, library),
      'approve'
    );

  return (
    <>
      {!account && (
        <>
          <ConnectOrLearn />
        </>
      )}
      {!!account && (
        <>
          <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
            {wbnbAllowance?.lt(wbnbBal ?? 0) ? (
              <div
                className="is-inline-block p-3 m-3 is-align-self-flex-start "
                style={{ border: 'solid 1px #dbdbdb', maxWidth: '25em' }}
              >
                <div className="mb-5">
                  <h3 className="is-size-4">WBNB to CZUSD</h3>
                  <p className="mb-2">
                    To use the WBNB to CZUSD portion of CzusdGate, you need to
                    approve the CzusdGate address{' '}
                    <code>{ADDRESS_CZUSDGATE_V2_BNB}</code> to use your WBNB.
                    You can use the button below.
                  </p>
                  <button
                    onClick={() =>
                      sendApproveWbnb(ADDRESS_CZUSDGATE_V2_BNB, MaxUint256)
                    }
                    className="button has-background-grey-lighter is-fullwidth"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="is-inline-block p-3 m-3 is-align-self-flex-start "
                  style={{ border: 'solid 1px #dbdbdb', maxWidth: '25em' }}
                >
                  <h3 className="is-size-4">WBNB to CZUSD</h3>
                  <p>
                    Swap your WBNB and receive CZUSD. No daily limit or maximum.
                    0.49% slippage. You can swap BNB to WBNB for zero slippage
                    on cz.cash.
                    <br />
                    Your WBNB: {weiToShortString(wbnbBal, 3)}
                    <br />
                    Your CZUSD: {weiToShortString(czusdBal, 3)}
                  </p>
                  <InputTokenEther
                    className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                    style={{ maxWidth: '10em', width: '100%' }}
                    step="1"
                    precision={0}
                    label="WBNB"
                    minWadBn={BigNumber.from(0)}
                    maxWadBn={wbnbBal}
                    setInputEther={setInputEtherBnb}
                    inputEther={inputEtherBnb}
                  />
                  <QuickInputEther
                    setInputEther={setInputEtherBnb}
                    maxTokenWad={wbnbBal}
                  />
                  <button
                    onClick={() =>
                      sendSellWbnbForCzusd(
                        parseEther(inputEtherBnb.toString()),
                        account
                      )
                    }
                    className="button has-background-grey-lighter is-fullwidth"
                  >
                    Swap
                  </button>
                  <p>
                    You will get {weiToShortString(getCzusdOutResult?.[0], 3)}{' '}
                    CZUSD immediately.
                  </p>
                </div>
              </>
            )}
            {czusdAllowance?.lt(czusdBal ?? 0) ? (
              <div
                className="is-inline-block p-3 m-3 is-align-self-flex-start "
                style={{ border: 'solid 1px #dbdbdb', maxWidth: '25em' }}
              >
                <div className="mb-5">
                  <h3 className="is-size-4">CZUSD to WBNB</h3>
                  <p className="mb-2">
                    To use the CZUSD to WBNB portion of CzusdGate, you need to
                    approve the CzusdGate address{' '}
                    <code>{ADDRESS_CZUSDGATE_V2_BNB}</code> to use your CZUSD.
                    You can use the button below.
                  </p>
                  <button
                    onClick={() =>
                      sendApproveCzusd(ADDRESS_CZUSDGATE_V2_BNB, MaxUint256)
                    }
                    className="button has-background-grey-lighter is-fullwidth"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="is-inline-block p-3 m-3 is-align-self-flex-start "
                  style={{ border: 'solid 1px #dbdbdb', maxWidth: '25em' }}
                >
                  <h3 className="is-size-4">CZUSD to WBNB</h3>
                  <p>
                    Swap your CZUSD and receive WBNB. No daily limit or maximum.
                    Slippage adjusts based on gate volume and assets. You can
                    swap WBNB to BNB for zero slippage on cz.cash.
                    <br />
                    Your CZUSD: {weiToShortString(czusdBal, 3)}
                    <br />
                    Your WBNB: {weiToShortString(wbnbBal, 3)}
                  </p>
                  <InputTokenEther
                    className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                    style={{ maxWidth: '10em', width: '100%' }}
                    step="1"
                    precision={0}
                    label="CZUSD"
                    minWadBn={BigNumber.from(0)}
                    maxWadBn={czusdBal}
                    setInputEther={setInputEtherCzusd}
                    inputEther={inputEtherCzusd}
                  />
                  <QuickInputEther
                    setInputEther={setInputEtherCzusd}
                    maxTokenWad={czusdBal}
                  />
                  <button
                    onClick={() =>
                      sendSellCzusdForWbnb(
                        parseEther(inputEtherCzusd.toString()),
                        account
                      )
                    }
                    className="button has-background-grey-lighter is-fullwidth"
                  >
                    Swap
                  </button>
                  <p>
                    You will get {weiToShortString(getBnbOutResult?.[0], 3)}{' '}
                    WBNB immediately.
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
