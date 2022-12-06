import React, { useEffect, useState } from 'react';
import InputTokenEther from '../../components/InputTokenEther';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import CollapsibleCard from '../../components/CollapsibleCard';
import QuickInputEther from '../../components/QuickInputEther';
import CZUSDLogo from "../../public/static/assets/images/tokens/CZUSD.png";
import { ADDRESS_CZUSDGATE, ADDRESS_ISBOOSTELIGIBLE, ADDRESS_BUSD, ADDRESS_CZUSD } from '../../constants/addresses';
import CzusdGateAbi from "../../abi/CzusdGate.json";
import IBoostEligibleAbi from "../../abi/IBoostEligible.json";
import ierc20Abi from "../../abi/IERC20.json";
import { utils, Contract, BigNumber, constants } from 'ethers'
import { weiToShortString, weiToUsdWeiVal } from '../../utils/bnDisplay';
import { useContractFunction, useCall, useTokenBalance, useTokenAllowance } from '@usedapp/core';


const { parseEther } = utils;
const { MaxUint256 } = constants;

export default function ManageCzusdGate({
    account, library, currentEpoch, czusdBal
}) {
    const [inputEtherBusd, setInputEtherBusd] = useState(0);
    const [inputEtherCzusd, setInputEtherCzusd] = useState(0);
    const [epochDelta, setEpochDelta] = useState(0);

    const busdBal = useTokenBalance(ADDRESS_BUSD, account);
    const busdAllowance = useTokenAllowance(ADDRESS_BUSD, account, ADDRESS_CZUSDGATE);

    const { value: isBoostEligibleResult, error: isBoostEligibleError } = useCall(ADDRESS_ISBOOSTELIGIBLE && {
        contract: new Contract(ADDRESS_ISBOOSTELIGIBLE, IBoostEligibleAbi),
        method: 'isBoostEligible',
        args: [account]
    }) ?? {}

    const { value: dailyOutCurrentResult, error: dailyOutCurrentError } = useCall(ADDRESS_ISBOOSTELIGIBLE && {
        contract: new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi),
        method: 'dailyOutCurrent',
        args: []
    }) ?? {}

    const { value: dailyOutLimitBoostResult, error: dailyOutLimitBoostError } = useCall(ADDRESS_ISBOOSTELIGIBLE && {
        contract: new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi),
        method: 'dailyOutLimitBoost',
        args: []
    }) ?? {}

    const { value: dailyOutLimitPublicResult, error: dailyOutLimitPublicError } = useCall(ADDRESS_ISBOOSTELIGIBLE && {
        contract: new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi),
        method: 'dailyOutLimitPublic',
        args: []
    }) ?? {}

    const { value: feePublicBpsResult, error: feePublicBpsError } = useCall(ADDRESS_ISBOOSTELIGIBLE && {
        contract: new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi),
        method: 'feePublicBps',
        args: []
    }) ?? {}

    const { value: feeBoostBpsResult, error: feeBoostBpsError } = useCall(ADDRESS_ISBOOSTELIGIBLE && {
        contract: new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi),
        method: 'feeBoostBps',
        args: []
    }) ?? {}

    const { value: dailyOutResetTimestampResult, error: dailyOutResetTimestampError } = useCall(ADDRESS_ISBOOSTELIGIBLE && {
        contract: new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi),
        method: 'dailyOutResetTimestamp',
        args: []
    }) ?? {}

    const { state: stateBusdIn, send: sendBusdIn } = useContractFunction(
        new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi, library),
        'busdIn');

    const { state: stateBusdOut, send: sendBusdOut } = useContractFunction(
        new Contract(ADDRESS_CZUSDGATE, CzusdGateAbi, library),
        'busdOut');

    const { state: stateApproveBusd, send: sendApproveBusd } = useContractFunction(
        new Contract(ADDRESS_BUSD, ierc20Abi, library),
        'approve');

    useEffect(() => {
        if (!dailyOutResetTimestampResult?.[0] || !currentEpoch) {
            setEpochDelta(0);
            return
        }
        setEpochDelta(currentEpoch - dailyOutResetTimestampResult?.[0]?.updateEpoch?.toNumber());
    }, [dailyOutResetTimestampResult?.[0]?.toString(), currentEpoch]);

    return (<>
        {!account && (<>
            <ConnectOrLearn />
        </>)}
        {!!account && (<>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                {busdAllowance?.lte(busdBal ?? 0) ? (
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <div className='mb-5'>
                            <h3 className="is-size-4">BUSD to CZUSD</h3>
                            <p className='mb-2'>To use the BUSD to CZUSD portion of CzusdGate, you need to approve the CzusdGate address <code>{ADDRESS_CZUSDGATE}</code> to use your BUSD. You can use the button below.</p>
                            <button onClick={() => sendApproveBusd(ADDRESS_CZUSDGATE, MaxUint256)} className='button has-background-grey-lighter is-fullwidth'>Approve</button>
                        </div>
                    </div>
                ) : (<>
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <h3 className="is-size-4">BUSD to CZUSD</h3>
                        <p>Swap your BUSD and receive CZUSD. No daily limit. Max is CZUSD balance of contract. Slippage is {(feeBoostBpsResult?.[0].toNumber() / 100).toFixed(2)}% with Good Rep, {(feePublicBpsResult?.[0].toNumber() / 100).toFixed(2)}% for public.</p>
                        <p>Wallet has Good Rep: {!!isBoostEligibleResult?.[0] ? "YES" : "NO"}</p>
                        <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                            style={{ maxWidth: "10em", width: "100%" }}
                            step="1"
                            precision={1}
                            label="BUSD"
                            minWadBn={BigNumber.from(0)} maxWadBn={busdBal}
                            setInputEther={setInputEtherBusd}
                            inputEther={inputEtherBusd}
                        />
                        <QuickInputEther setInputEther={setInputEtherBusd} maxTokenWad={busdBal} />
                        <button onClick={() => sendBusdIn(parseEther(inputEtherBusd.toString()), account)} className='button has-background-grey-lighter is-fullwidth'>Swap</button>
                        <p>You will get {(BigNumber.from(inputEtherBusd ?? 0).mul(BigNumber.from(10000).sub(!!isBoostEligibleResult?.[0] ? (feeBoostBpsResult?.[0] ?? 10000) : (feePublicBpsResult?.[0] ?? 10000))).div(100).toNumber() / 100).toFixed(2)} CZUSD immediately.</p>
                    </div>
                </>)
                }
                <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                    <h3 className="is-size-4">CZUSD to BUSD</h3>
                    <p>Swap your CZUSD and receive BUSD. Daily limits are set on global net flows (busd out minus busd in) and are higher for Good Rep. Max is BUSD balance of contract. Slippage is {(feeBoostBpsResult?.[0].toNumber() / 100).toFixed(2)}% with Good Rep, {(feePublicBpsResult?.[0].toNumber() / 100).toFixed(2)}% for public.</p>
                    <p>Wallet has Good Rep: {!!isBoostEligibleResult?.[0] ? "YES" : "NO"}</p>
                    <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                        style={{ maxWidth: "10em", width: "100%" }}
                        step="1"
                        precision={1}
                        label="CZUSD"
                        minWadBn={BigNumber.from(0)} maxWadBn={czusdBal}
                        setInputEther={setInputEtherCzusd}
                        inputEther={inputEtherCzusd}
                    />
                    <QuickInputEther setInputEther={setInputEtherCzusd} maxTokenWad={czusdBal} />
                    <button onClick={() => sendBusdOut(parseEther(inputEtherCzusd.toString()), account)} className='button has-background-grey-lighter is-fullwidth'>Swap</button>
                    <p>You will get {(BigNumber.from(inputEtherCzusd ?? 0).mul(BigNumber.from(10000).sub(!!isBoostEligibleResult?.[0] ? (feeBoostBpsResult?.[0] ?? 10000) : (feePublicBpsResult?.[0] ?? 10000))).div(100).toNumber() / 100).toFixed(2)} BUSD immediately.</p>
                    <p>Global Daily Limit: TBD</p>
                </div>

            </div>
        </>)}



    </>)
}