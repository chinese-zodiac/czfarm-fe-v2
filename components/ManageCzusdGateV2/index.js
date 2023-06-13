import { useCall, useContractFunction, useTokenAllowance, useTokenBalance } from '@usedapp/core';
import { BigNumber, Contract, constants, utils } from 'ethers';
import React, { useState } from 'react';
import CzusdGateAbi from "../../abi/CzusdGateV2.json";
import ierc20Abi from "../../abi/IERC20.json";
import ConnectOrLearn from '../../components/ConnectOrLearn';
import InputTokenEther from '../../components/InputTokenEther';
import QuickInputEther from '../../components/QuickInputEther';
import { ADDRESS_CZUSDGATE_V2, ADDRESS_USDT } from '../../constants/addresses';


const { parseEther } = utils;
const { MaxUint256 } = constants;

export default function ManageCzusdGateV2({
    account, library, currentEpoch, czusdBal
}) {
    const [inputEtherUsdt, setInputEtherUsdt] = useState(0);
    const [inputEtherCzusd, setInputEtherCzusd] = useState(0);

    const usdtBal = useTokenBalance(ADDRESS_USDT, account);
    const usdtAllowance = useTokenAllowance(ADDRESS_USDT, account, ADDRESS_CZUSDGATE_V2);

    const { value: sellFeeBasisResult, error: sellFeeBasisError } = useCall({
        contract: new Contract(ADDRESS_CZUSDGATE_V2, CzusdGateAbi),
        method: 'sellFeeBasis',
        args: []
    }) ?? {}

    const { state: stateUsdtIn, send: sendUsdtIn } = useContractFunction(
        new Contract(ADDRESS_CZUSDGATE_V2, CzusdGateAbi, library),
        'usdtIn');

    const { state: stateUsdtOut, send: sendUsdtOut } = useContractFunction(
        new Contract(ADDRESS_CZUSDGATE_V2, CzusdGateAbi, library),
        'usdtOut');

    const { state: stateApproveUsdt, send: sendApproveUsdt } = useContractFunction(
        new Contract(ADDRESS_USDT, ierc20Abi, library),
        'approve');

    console.log(sellFeeBasisResult);

    return (<>
        {!account && (<>
            <ConnectOrLearn />
        </>)}
        {!!account && (<>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                {usdtAllowance?.lt(usdtBal ?? 0) ? (
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <div className='mb-5'>
                            <h3 className="is-size-4">USDT to CZUSD</h3>
                            <p className='mb-2'>To use the USDT to CZUSD portion of CzusdGate, you need to approve the CzusdGate address <code>{ADDRESS_CZUSDGATE_V2}</code> to use your USDT. You can use the button below.</p>
                            <button onClick={() => sendApproveUsdt(ADDRESS_CZUSDGATE_V2, MaxUint256)} className='button has-background-grey-lighter is-fullwidth'>Approve</button>
                        </div>
                    </div>
                ) : (<>
                    <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                        <h3 className="is-size-4">USDT to CZUSD</h3>
                        <p>Swap your USDT and receive CZUSD. No daily limit. Max is CZUSD balance of contract. No fee.</p>
                        <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
                            style={{ maxWidth: "10em", width: "100%" }}
                            step="1"
                            precision={1}
                            label="USDT"
                            minWadBn={BigNumber.from(0)} maxWadBn={usdtBal}
                            setInputEther={setInputEtherUsdt}
                            inputEther={inputEtherUsdt}
                        />
                        <QuickInputEther setInputEther={setInputEtherUsdt} maxTokenWad={usdtBal} />
                        <button onClick={() => sendUsdtIn(parseEther(inputEtherUsdt.toString()), account)} className='button has-background-grey-lighter is-fullwidth'>Swap</button>
                        <p>You will get {(BigNumber.from(inputEtherUsdt ?? 0).mul(100).toNumber() / 100).toFixed(2)} CZUSD immediately.</p>
                    </div>
                </>)
                }
                <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
                    <h3 className="is-size-4">CZUSD to USDT</h3>
                    <p>Swap your CZUSD and receive USDT. {(sellFeeBasisResult?.[0].toNumber() / 100).toFixed(2)}% fee.</p>
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
                    <button onClick={() => sendUsdtOut(parseEther(inputEtherCzusd.toString()), account)} className='button has-background-grey-lighter is-fullwidth'>Swap</button>
                    <p>You will get {(BigNumber.from(inputEtherCzusd ?? 0).mul(BigNumber.from(10000).sub(sellFeeBasisResult?.[0] ?? 10000)).div(100).toNumber() / 100).toFixed(2)} USDT immediately.</p>

                </div>

            </div>
        </>)}



    </>)
}